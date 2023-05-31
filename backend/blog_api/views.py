from django.shortcuts import render
from rest_framework import generics
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import SAFE_METHODS, IsAdminUser, DjangoModelPermissions, BasePermission, IsAuthenticated
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


# custome permission
class PostUserWritePermission(BasePermission):
      message = 'Editing posts is restricted to the author only.'
      def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user



class PostList(viewsets.ModelViewSet):
      permission_classes = [IsAuthenticated]
      serializer_class = PostSerializer

      def get_object(self, **kwargs):
           item = self.kwargs.get('pk')
           return get_object_or_404(Post, slug=item)

      def get_queryset(self):
           return Post.objects.all()


# class PostList(viewsets.ViewSet):
#       permission_classes = [IsAuthenticated]
#       queryset = Post.postobjects.all()

#       def list(self,request):
#            serializer_class = PostSerializer(self.queryset ,many=True)
#            return Response(serializer_class.data)

#       def retrieve(self,request,pk=None):
#             data = get_object_or_404(self.queryset, pk=pk)
#             serializer_class =PostSerializer(data)
#             return Response(serializer_class.data)

