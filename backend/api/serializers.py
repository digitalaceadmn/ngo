from rest_framework import serializers
from .models import DoctorApplication, NGOApplication, SupportApplication, Student


class DoctorApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorApplication
        fields = "__all__"


class NGOApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = NGOApplication
        fields = "__all__"


class SupportApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportApplication
        fields = "__all__"


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"

