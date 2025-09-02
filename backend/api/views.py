from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from . models import DoctorApplication
from . serializers import DoctorApplicationSerializer, NGOApplicationSerializer,SupportApplicationSerializer

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


class DoctorApplicationView(APIView):
    
    def get(self, request, *args, **kwargs):
        return Response({"message": "Doctor application endpoint"}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        print("Received data:", request.data)
        serializer = DoctorApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Doctor application submitted successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        print("Serializer errors:", serializer.errors)  # Add this line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NGOApplicationView(APIView):

    def get(self, request, *args, **kwargs):
        return Response({"message": "NGO application endpoint"}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        print("Received data:", request.data)
        serializer = NGOApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "NGO application submitted successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        print("Serializer errors:", serializer.errors)  # Add this line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SupportApplicationView(APIView):
    
    def get(self, request, *args, **kwargs):
        return Response({"message": "Support application endpoint"}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        print("Received data:", request.data)
        
        serializer = SupportApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Support application submitted successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        print("Serializer errors:", serializer.errors)  # Add this line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
