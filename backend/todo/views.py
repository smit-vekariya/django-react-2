from .serializers import TodoSerializer
from django.shortcuts import render
from .models import Todo
from rest_framework import viewsets
from .filter import TodoFilter, TodoPagination
# Create your views here.


class TodoView(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    pagination_class = TodoPagination
    filterset_class = TodoFilter

