from ecomm.views import product_views as views
from  django.urls import path


urlpatterns = [
    path('',views.getProducts,name='products'),
    path('top/',views.ProductsTopReviewedView.as_view(),name='top-products'),
     path('create/',views.createProduct,name='create'),
     path('upload/',views.uploadImage,name='image-upload'),
     path('delete/<str:pk>/',views.deleteProduct,name='delete'),
     path('update/<str:pk>/',views.updateProduct,name='update'),
     path('<str:pk>/reviews/',views.createProductReview,name='create-review'),
     path('<str:pk>/',views.ProductsDetailView.as_view(),name='product'),
      
]







