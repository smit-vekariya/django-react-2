from .views  import PostList, CreatePost, EditPost, DeletePost, AdminPostDetails, GetBlog
from rest_framework.routers import DefaultRouter
from django.urls import path
from django.urls import re_path
from revproxy.views import ProxyView
app_name="blog_api"

urlpatterns = [
    path('', PostList.as_view({'get': 'list'}), name="listpost"),
    path('get_blog/<int:pk>', GetBlog.as_view({'get': 'list'}), name="getblog"),
    path('admin/edit/postdetails/<int:pk>/', AdminPostDetails.as_view(), name="createpost"),
    path('admin/create/', CreatePost.as_view(), name="createpost"),
    path('admin/edit/<int:pk>/', EditPost.as_view(), name="editpost"),
    path('admin/delete/<int:pk>/', DeletePost.as_view(), name="deletepost"),

]


