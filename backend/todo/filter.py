
import django_filters
from .models import Todo
from rest_framework import pagination
from rest_framework.response import Response


class TodoFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(field_name="title", lookup_expr='icontains')
    description = django_filters.CharFilter(field_name="description", lookup_expr='icontains')
    is_complete = django_filters.BooleanFilter(field_name="is_complete")

    class Meta:
        model = Todo
        fields = ["title", "description", "is_complete"]


class TodoPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    page_query_param = "page"
    max_page_size = 1000

    # def get_paginated_response(self, data):
    #     return Response({"totalRecords": self.page.paginator.count, "data": data})


