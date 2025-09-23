from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from . models import DoctorApplication
from . serializers import DoctorApplicationSerializer, NGOApplicationSerializer,SupportApplicationSerializer
from .emails import send_admin_email, send_user_email
from .utils import run_in_background
from django.http import HttpResponse

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
            print("Serializer data:", serializer.data)
            try:
                run_in_background(send_admin_email, "Doctor", serializer.data)
            except Exception as e:
                print(f"Error sending admin email: {e}")
            try:
                run_in_background(
                    send_user_email,
                    serializer.data.get("contact_email"),
                    "NGO",
                    serializer.data
                )
            except Exception as e:
                print(f"Error sending user email: {e}")
            return Response(
                {"message": "Doctor application submitted successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class DoctorApplicationView(APIView):
    
#     def get(self, request, *args, **kwargs):
#         return Response({"message": "Doctor application endpoint"}, status=status.HTTP_200_OK)

#     def post(self, request, *args, **kwargs):
#         serializer = DoctorApplicationSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
            
#             errors = {}  

#             try:
#                 run_in_background(send_admin_email, "Doctor", serializer.data)
#             except Exception as e:
#                 errors["admin_email"] = str(e)

#             try:
#                 run_in_background(
#                     send_user_email,
#                     serializer.data.get("contact_email"),
#                     "NGO",
#                     serializer.data
#                 )
#             except Exception as e:
#                 errors["user_email"] = str(e)

#             response_data = {
#                 "message": "Doctor application submitted successfully",
#                 "data": serializer.data,
#             }
#             if errors:
#                 response_data["mail_errors"] = errors  

#             return Response(response_data, status=status.HTTP_201_CREATED)

#         return Response(
#             {"errors": serializer.errors},
#             status=status.HTTP_400_BAD_REQUEST
#         )


class NGOApplicationView(APIView):

    def get(self, request, *args, **kwargs):
        
        return Response({"message": "NGO application endpoint"}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        print("Received data:", request.data)
        serializer = NGOApplicationSerializer(data=request.data)
        
        if serializer.is_valid():
            instance = serializer.save()
            
            # Send emails in background after saving
            run_in_background(send_admin_email, "NGO", serializer.data)
            run_in_background(
                send_user_email,
                serializer.data.get("contact_email"),  # correct field
                "NGO",
                serializer.data
            )
            
            return Response(
                {"message": "NGO application submitted successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        
        print("Serializer errors:", serializer.errors)  
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SupportApplicationView(APIView):
    
    def get(self, request, *args, **kwargs):
        return Response({"message": "Support application endpoint"}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        print("Received data:", request.data)
        
        serializer = SupportApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            run_in_background(send_admin_email, "Support", serializer.data)
            run_in_background(send_user_email, serializer.data.get("email"), "Support", serializer.data)
            return Response(
                {"message": "Support application submitted successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        print("Serializer errors:", serializer.errors) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def testAPI(request):
    return HttpResponse("Test API is working!")