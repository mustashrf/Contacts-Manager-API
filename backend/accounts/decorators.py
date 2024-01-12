from rest_framework.response import Response
from rest_framework import status
from functools import wraps

def validate_user_identity(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):

        request_email = request.user.email
        user_email = request.data.get('email')

        if request_email == user_email:
            return view_func(request, *args, **kwargs)
        else:
            return Response("You are not authorized to perform this action", status=status.HTTP_403_FORBIDDEN)

    return wrapper