from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    return Response({
        'message': 'Welcome to Django REST API',
        'endpoints': {
            'auth': {
                'login': '/api/token/',
                'refresh': '/api/token/refresh/',
                'register': '/api/users/register/',
            },
            'docs': {
                'swagger': '/api/docs/',
                'redoc': '/api/redoc/',
            },
            'health': '/api/health/',
        }
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    return Response({
        'status': 'healthy',
        'message': 'API is running'
    }, status=status.HTTP_200_OK)
