from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),
    path('health/', views.health_check, name='health-check'),
    path('doctor-application/', views.DoctorApplicationView.as_view(), name='doctor_application'),
    path('ngo-application/', views.NGOApplicationView.as_view(), name='ngo_application'),
    path('support-application/', views.SupportApplicationView.as_view(), name='support_application'),
    path('test-api/', views.testAPI, name='test_api'),
    path('student-application/', views.StudentView.as_view(), name='student_application'),  # New endpoint for Student application
]