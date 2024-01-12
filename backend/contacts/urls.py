from django.urls import path
from .views import *

urlpatterns = [
    path('create/', create_contact, name='contact-create-view'),
    path('update/', update_contact, name='contact-update-view'),
    path('list/', list_contacts, name='contact-list-view'),
    path('get/', get_contact_by_name, name='contact-get-view'),
    path('delete/', delete_contact, name='contact-delete-view'),
    path('search/', search_contact, name='contact-search-view'),
]