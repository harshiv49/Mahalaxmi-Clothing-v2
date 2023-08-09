from  django.urls import path

from ecomm.views import user_views as views
urlpatterns = [
    path('login/',views.MyTokenObtainPairView.as_view(),name='token-obtain-pair'),
    path('profile/',views.UsersProfileView.as_view(),name='users-profile'),
    path('profile/update/',views.UsersUpdateProfile.as_view(),name='user-profile-update'),
    path('register/',views.UsersRegisterView.as_view(),name='register'),
    path('',views.UsersListView.as_view(),name='users'),
    #place this one down in hierarachy because if we for example right profile it is going to think profile is our passed in id 
    path('<int:pk>/',views.UsersDetailView.as_view(),name='user'),
    path('delete/<str:pk>/',views.UsersDestroyView.as_view(),name='user-delete'),
    path('update/<str:pk>/',views.UsersUpdateAdminView.as_view(),name='user-admin-update'),

]