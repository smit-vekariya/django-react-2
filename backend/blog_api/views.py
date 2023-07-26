from django.shortcuts import render
from rest_framework import generics
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import SAFE_METHODS, IsAdminUser, DjangoModelPermissions, BasePermission, IsAuthenticated
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
import json
from functools import lru_cache
from django.http import HttpResponse, JsonResponse


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
           print(item,"=========")
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


#This is for practice
@csrf_exempt
def post_data(request):
     response = "chale che ne?"
     return HttpResponse(json.dumps(response))


@csrf_exempt
def get_data(request):
     response = {
          "jswift@email.com": {
               "first_name": "Jane",
               "last_name": "Swift",
               "address": {
                    "city": "Boston",
                    "street": "25th Street",
                    "house_number": 25
               }
          },
          "pjohnson@email.com": {
               "first_name": "Patrick",
               "last_name": "Johnson",
               "address": {
                    "city": "Miami",
                    "street": "50th Street",
                    "house_number": 50
               }
          }
          }
     return HttpResponse(json.dumps(response))