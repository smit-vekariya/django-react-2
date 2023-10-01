from django.shortcuts import render
from rest_framework import generics
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import SAFE_METHODS, IsAdminUser, DjangoModelPermissions, BasePermission, IsAuthenticated
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt


# custome permission
class PostUserWritePermission(BasePermission):
      message = 'Editing posts is restricted to the author only.'
      def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user



class PostList(viewsets.ModelViewSet):
     #  permission_classes = [IsAuthenticated]
      serializer_class = PostSerializer

      def get_object(self, **kwargs):
           item = self.kwargs.get('pk')
           return get_object_or_404(Post, slug=item)

      def get_queryset(self):
           return Post.objects.all()


class AdminPostDetails(generics.RetrieveAPIView):
     permission_classes = [IsAuthenticated]
     queryset = Post.objects.all()
     serializer_class = PostSerializer

class CreatePost(generics.CreateAPIView):
     permission_classes = [IsAuthenticated]
     queryset = Post.objects.all()
     serializer_class = PostSerializer

class EditPost(generics.UpdateAPIView):
     permission_classes = [IsAuthenticated]
     queryset = Post.objects.all()
     serializer_class = PostSerializer

class DeletePost(generics.RetrieveDestroyAPIView):
     permission_classes = [IsAuthenticated]
     queryset = Post.objects.all()
     serializer_class = PostSerializer

class GetBlog(viewsets.ModelViewSet):
     serializer_class = PostSerializer
     queryset = Post.objects.all()

     def get_queryset(self):
          queryset = Post.objects.filter(pk=self.kwargs['pk'])
          return queryset
