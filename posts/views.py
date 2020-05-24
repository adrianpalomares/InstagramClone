from django.shortcuts import render
from posts.models import Post
from rest_framework import viewsets
from posts.serializers import PostSerializer
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import permissions

class PostViewSet(viewsets.ModelViewSet):
    parser_classes = [MultiPartParser, FormParser,]
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = "id"


class LatestPostList(generics.ListAPIView):
    queryset = Post.objects.order_by('-date_posted')
    serializer_class = PostSerializer
