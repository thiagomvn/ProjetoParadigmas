"""
URL configuration for aps project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.views import UserLoansView

from rest_framework import routers
from api import viewsets as vs

route = routers.DefaultRouter()

route.register(r'loan', vs.LoanViewset, basename="Loans")
route.register(r'book', vs.BookViewset, basename="Books")
route.register(r'author', vs.AuthorViewset, basename="Authors")
route.register(r'author-nested', vs.AuthorNestedViewset, basename="AuthorsNested")
route.register(r'comment', vs.CommentViewset, basename="Comments")
route.register(r'comment-content', vs.CommentContent, basename="CommentsContent")




urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('authentication.urls')),
    path('loans/user/<int:user_id>/', UserLoansView.as_view(), name='user_loans'),
    path('', include(route.urls))
]
