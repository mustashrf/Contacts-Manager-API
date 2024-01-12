from .serializer import UserSerializer
from .models import CustomUser
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from .decorators import validate_user_identity
from django.db import transaction

class UserView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@validate_user_identity
@transaction.atomic
def update_user(request):

    instance = CustomUser.objects.get(email=request.user.email)
    serializer = UserSerializer(instance=instance, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@validate_user_identity
def delete_user(request):
    instance = CustomUser.objects.get(email=request.user.email)
    instance.delete()
    return Response("Successfully deleted", status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@validate_user_identity
def get_user_details(request):
    try:
        instance = CustomUser.objects.get(email=request.user.email)
        serializer = UserSerializer(instance=instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except:
        return Response('Contact could not be found', status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    user = authenticate(email=email, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)
        
        return Response({
            'access_token': access_token,
            'refresh_token': refresh_token
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def refresh_token(request):
    refresh_token = request.data.get('refresh_token')

    if refresh_token:
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            return Response({'access_token': access_token}, status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': 'Invalid refresh token'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Refresh token not provided'}, status=status.HTTP_400_BAD_REQUEST)