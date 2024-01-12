from django.urls import path
from .views import *

urlpatterns = [
    path('', UserView.as_view(), name='user-create-view'),
    path('login/', login_view, name='login-view'),
    path('token/refresh/', refresh_token, name='token-refresh'),
    path('update/', update_user, name='user-update'),
    path('delete/', delete_user, name='user-delete'),
    path('get/', get_user_details, name='user-detail'),
]
