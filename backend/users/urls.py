from re import template
from django.urls import path
from django.views.generic import TemplateView
from .views import CustomUserCreate, TokenBlacklistView

app_name="users"

urlpatterns = [
    path("register/", CustomUserCreate.as_view(), name="create_user"),
    # path("login", )
    path('logout/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),

]
