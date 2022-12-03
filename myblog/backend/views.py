"""
    Views used by blog django app
"""
# from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from .serializers import UserSerializer


User = get_user_model()


# Create your views here.

# Disabling 7 ancestor limit for view inheritance
class UserViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """
    User viewset for serializer
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
