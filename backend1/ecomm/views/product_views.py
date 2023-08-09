from django.shortcuts import render

# Create your views here.
from ecomm.models import User
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from ecomm.serializers import ProductSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated

from rest_framework import status
from ecomm.models import Product, Review
from rest_framework.generics import RetrieveAPIView, ListAPIView


# multiple prooducts
@api_view(['GET'])
def getProducts(request):
    # access the params passed in the get request
    query = request.query_params.get('keyword')
    print('query:', query)
    if query == None:
        query = ''
    # So what it does is it takes our query search and then depending on the page that we have, it's going
    # The icontains lookup is used to get records that contains a specified value.
    products = Product.objects.filter(name__icontains=query)
    # this filtered data is what we want to paginate

    # get the page number from the query params we want to return the number of products we want to return with each query set so we can do
    page = request.query_params.get('page')

    # function takes in the query set ,
    paginator = Paginator(products, 4)
    try:
        products = paginator.page(page)
    # if the page entered is not an integer that is intially or otherwise return the first page
    except PageNotAnInteger:
        products = paginator.page(1)
    # if user enters a undefined number of the page return the last page
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    page = int(page)
    serializer = ProductSerializer(products, many=True)
    # previously our api call or our view only returned the product related fields  as Json now we send the products page and the pages field so we have to change our reducer accordingly
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


class ProductsDetailView(RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

# single prooduct


@api_view(['GET'])
def getProduct(request, pk):
    productRequired = Product.objects.get(_id=pk)
    serializer = ProductSerializer(productRequired, many=False)
    return Response(serializer.data)


class ProductsTopReviewedView(ListAPIView):
    queryset = Product.objects.filter(rating__gte=0).order_by('rating')
    serializer_class = ProductSerializer


# products based on rating
@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=0).order_by('rating')
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


# create prooduct
@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample category',
        description='Sample description'
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

# update product


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    productToUpdate = Product.objects.get(_id=pk)
    productToUpdate.name = data['name']
    productToUpdate.price = data['price']
    productToUpdate.brand = data['brand']
    productToUpdate.countInStock = data['countInStock']
    productToUpdate.category = data['category']
    productToUpdate.description = data['description']

    productToUpdate.save()
    serializer = ProductSerializer(productToUpdate, many=False)
    return Response(serializer.data)


# delete prooduct
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    productRequiredToDelete = Product.objects.get(_id=pk)
    productRequiredToDelete.delete()
    return Response('Product Deleted')


# delete prooduct
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    print(data)
    # 1 Review already exists
    # get the reviews of this product and check wether our current user has that
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Review already exists '}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 No Rating or 0

    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating '}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # create Review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']
        )
        # take the count of gthe items in Review queryset
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        # getting the stars totalrating/total number of reviews
        total = 0
        for i in reviews:
            total += i.rating
        product.rating = total/len(reviews)
        product.save()

    return Response('Review added')


@api_view(['POST'])
def uploadImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('images')
    product.save()
    return Response('Image was uploaded')
