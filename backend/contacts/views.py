from .serializer import ContactSerializer, ContactUpdateSerializer
from .models import Contact, get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.core.cache import cache
from django.db import transaction


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_contact(request):
    data = request.data.copy()
    user = get_user_model().objects.get(id=request.user.id)

    data.update({'created_by': user, 'updated_by': user})

    serializer = ContactSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@transaction.atomic
def update_contact(request):
    try:
        id = request.data.get('id')
        instance = Contact.objects.select_for_update().get(id=id)
        # import pdb; pdb.set_trace()
        data = request.data.copy()
        data.update({'updated_by': request.user})

        serializer = ContactUpdateSerializer(instance=instance, data=data, partial=True)
        
        if serializer.is_valid():
            # from time import sleep; sleep(30)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response(f'{e}', status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_contacts(request):
    instances = Contact.objects.all()
    serializer = ContactSerializer(instances, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_contact_by_name(request):
    try:
        name = request.data.get('name')
        instance = Contact.objects.get(name=name)
        serializer = ContactSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except:
        return Response('Contact could not be found', status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_contact(request):
    try:
        name = request.data.get('name')
        instance = Contact.objects.get(name=name)
        instance.delete()
        return Response('Successfully deleted', status=status.HTTP_204_NO_CONTENT)

    except:
        return Response('Contact could not be found', status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_contact(request):
    search_query = request.GET.get('query', '')

    result = cache.get(search_query)

    if not result:
        result = Contact.objects.filter(
            Q(name__icontains=search_query) |
            Q(phone__icontains=search_query) |
            Q(email__icontains=search_query)
        )

        cache.set(search_query, result)

    serializer = ContactSerializer(result, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)