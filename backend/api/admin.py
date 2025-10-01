from django.contrib import admin

# Register your models here.
from .models import DoctorApplication, NGOApplication, SupportApplication,Student

admin.site.register(DoctorApplication)
admin.site.register(NGOApplication)
admin.site.register(SupportApplication)
admin.site.register(Student)

