from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from ecomm.models import User,Product,Order,OrderItem,ShippingAddress
from rest_framework import status
from ecomm.serializers import OrderSerializer
from datetime import datetime
from django.db import transaction
from django.db.utils import IntegrityError
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user=request.user
    print(user)
    data=request.data
    orderItems=data['orderItems']
    if orderItems and len(orderItems)==0:
        return Response({'detail':'No order Items'},status=status.HTTP_400_BAD_REQUEST)
    else:
        #(1)  Create Order
        with transaction.atomic():
            order=Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            totalPrice=data['priceToPay'],
            shippingPrice=data['shippingPrice'],
            taxPrice=data['taxPrice'],
            )

            #(2) Create Shipping address
            shipping=ShippingAddress.objects.create(
                order=order,
                address=data['shippingAddress']['address'],
                city=data['shippingAddress']['city'],
                postalCode=data['shippingAddress']['postalCode'],
                country=data['shippingAddress']['country'],
                state=data['shippingAddress']['state'],
            )   

            #(3) Create order to orderItem relationship 
            for i in orderItems:
                # this is what needs to be locked 
                product=Product.objects.select_for_update(nowait=True).filter(_id=i['_id']).first()
                item=OrderItem.objects.create(
                    product=product, 
                    order=order,
                    name=product.name,
                    price=i['price'],
                    quantity=i['quantity'],
                    image=product.image.url
                )
            #(4) update Stock
                if product.countInStock >= item.quantity:
                    product.countInStock -= item.quantity
                    product.save()
                else:
                    raise IntegrityError("Insufficient stock")
                
# we are only using our parent serializer that is OrderSerializer and when we call this it calls for its subsequent serializers like orderItem which is its child and User and for shippingAddress 
    serializer=OrderSerializer(order,many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user=request.user
    order=Order.objects.get(_id=pk)
    orderItems=order.orderitem_set.all()
    print(order.user)
    print(user)
    try:
        if user.is_staff or order.user==user:
            serializer=OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            return Response({'detail':'Not authorised to view this page'},status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail','Order does not match'},status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):
    order=Order.objects.get(_id=pk)
    order.isPaid=True
    order.paidAt=datetime.now()
    order.isDelivered=False
    order.save()
    return Response('order is paid')


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request,pk):
    order=Order.objects.get(_id=pk)
    order.isDelivered=True
    order.deliveredAt=datetime.now()
    order.save()
    return Response('Order was Delivered')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):
    orders=Order.objects.all()
    serializer=OrderSerializer(orders,many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user=request.user
    orders=user.order_set.all()
    serializer=OrderSerializer(orders,many=True)
    return Response(serializer.data)
