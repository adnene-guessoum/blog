""" Serializers for django rest framework
"""
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Blogpost


User = get_user_model()


# Definir la representation d'un utilisateur
class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    User serializer
    """

    class Meta:
        model = User
        fields = ["url", "username", "email"]


class BlogPostSerializer(serializers.ModelSerializer):
    """
    Blog posts serializer
    """

    class Meta:
        model = Blogpost
        fields = "__all__"
        lookup_field = "slug"
