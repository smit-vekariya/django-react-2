from django.contrib import admin
from .models import Category, Post


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name"]


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ["category", "title", "author", "slug", "status"]
    prepopulated_fields = { 'slug': ['title'] }
    # list_display = [field.name for field in Post._meta.get_fields()]
