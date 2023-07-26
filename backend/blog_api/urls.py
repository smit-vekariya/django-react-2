from .views  import PostList, CreatePost, EditPost, DeletePost, AdminPostDetails
from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views
app_name="blog_api"
urlpatterns = [
    path('', PostList.as_view({'get': 'list'}), name="listpost"),
    path('admin/edit/postdetails/<int:pk>/', AdminPostDetails.as_view(), name="createpost"),
    path('admin/create/', CreatePost.as_view(), name="createpost"),
    path('admin/edit/<int:pk>/', EditPost.as_view(), name="editpost"),
    path('admin/delete/<int:pk>/', DeletePost.as_view(), name="deletepost"),
    path("post_data/",views.post_data, name="post_data"), #for testing only
    path("get_data/",views.get_data, name="get_data") #for testing only
]
