from django.contrib import admin

from users.models import NewUser

# Register your models here.
class NewUserAdmin(admin.ModelAdmin):
    list_display = ("email", "user_name", "first_name")

admin.site.register(NewUser ,NewUserAdmin)