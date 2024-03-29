from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError


def validate_phone_number(phone):
    if phone[0] != '0' or len(phone) not in (8, 10, 11):
        raise ValidationError('incorrect phone number')

class Contact(models.Model):
    name = models.CharField(max_length=100, unique=True, null=False)
    email = models.EmailField(max_length=254, null=True, blank=True)
    phone = models.CharField(max_length=11, validators=[validate_phone_number], unique=True, null=False)
    created_by = models.ForeignKey(
        get_user_model(), on_delete=models.SET_NULL, related_name='created_contact',
        blank=True, null=True, db_column='created_by', to_field='email',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_by = models.ForeignKey(
        get_user_model(), on_delete=models.SET_NULL, related_name='updated_contact',
        blank=True, null=True, db_column='updated_by', to_field='email',
    )
    updated_at = models.DateTimeField(auto_now=True)
