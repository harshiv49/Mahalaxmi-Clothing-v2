from rest_framework import serializers
from ecomm.models import User,Product,Order,OrderItem,ShippingAddress,Review
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response

class UserSerializer(serializers.ModelSerializer):
    #this is the way is to add the fields in our serialization 
    name=serializers.SerializerMethodField(read_only=True)
    _id=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields=['id','_id','username','email','name','isAdmin']
    
    def get__id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff

    #this is the way is to add the fields in our serialization 
    def get_name(self,obj):
        #creating a custom name sort a field 
        #obj will have the user itself 
        name=obj.first_name
        
        if name=='':
            name=obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model =User
        fields=['id','_id','username','email','name','isAdmin','token']

    def get_token(self,obj):
         #obj will have the user itself   
        token=RefreshToken.for_user(obj)
        return str(token.access_token)


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Review
        fields='__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews=serializers.SerializerMethodField(read_only=True)

    class Meta:
        model=Product
        fields='__all__'
    #this is done to nest all the reviews of the product
    def get_reviews(self,obj):
        reviews=obj.review_set.all()
        serializer=ReviewSerializer(reviews,many=True)
        return serializer.data


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=ShippingAddress
        fields='__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderItem
        fields='__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems=serializers.SerializerMethodField(read_only=True)
    shippingAddress=serializers.SerializerMethodField(read_only=True)
    user=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Order
        fields='__all__'
#this is done to nest all the orderItems of the order
    def get_orderItems(self,obj):
        #obj is the model itself of our class Meta
        items=obj.orderitem_set.all()
        serializer=OrderItemSerializer(items,many=True)
        return serializer.data
#this is done to nest  the shippingAddress of the order
    def get_shippingAddress(self,obj):
        try:
            address=ShippingAddressSerializer(obj.shippingaddress,many=False).data
        except:
            address=False
        return address
#this is done to nest  the userInfo of the order
    def get_user(self,obj):
        user=obj.user
        serializer=UserSerializer(user,many=False)
        return serializer.data
