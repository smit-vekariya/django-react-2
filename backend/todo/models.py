from statistics import mode
from turtle import title
from django.db import models

# Create your models here.
class Todo(models.Model):
    title = models.CharField(max_length=100)
    description =  models.CharField(max_length=100)
    is_complete = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    