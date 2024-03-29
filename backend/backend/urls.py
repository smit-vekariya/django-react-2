"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.urls import path , include
from rest_framework import routers
from todo import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'tasks', views.TodoView, 'task')

urlpatterns = [
    path('blog_api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('blog_api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('',include('blog.urls', namespace="blog")),
    path('blog_api/',include('blog_api.urls', namespace="blog_api")),
    path('api/', include(router.urls)),
    path('blog_api/user/', include("users.urls", namespace="users")),
    path('blog-api-auth/', include('rest_framework.urls', namespace="blog_api_auth")),
    path('schema', get_schema_view(title="Blog",description="API for blog",version="1.0.0"), name="openapi-schema"),
    path('docs',include_docs_urls(title="blogApi"))

]