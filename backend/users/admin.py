from django.contrib import admin

# Register your models here.
from .models import Configuration


@admin.register(Configuration)
class ConfigurationAdmin(admin.ModelAdmin):
    list_display = ("key", "value")
    search_fields = ("key", "value")
    list_per_page = 20
