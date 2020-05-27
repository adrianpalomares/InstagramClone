from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework import permissions
from django.contrib.auth.models import User

from .serializers import UserSerializer, MyTokenObtainPairSerializer

# Route to create a user (register)
class CreateUserView(CreateAPIView):
    model = User
    permission_classes = [permissions.AllowAny,]
    serializer_class = UserSerializer

# JWT

# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer