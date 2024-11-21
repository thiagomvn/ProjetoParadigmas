from django.urls import path
from .views import UserViewAPI, UserRegistrationAPIView, UserLoginAPIView, UserLogoutViewAPI

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view()),
    path('login/', UserLoginAPIView.as_view()),
    path('user/', UserViewAPI.as_view()),
    path('logout/', UserLogoutViewAPI.as_view())
]

