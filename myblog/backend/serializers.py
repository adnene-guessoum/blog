from django.contrib.auth.models import User
from rest_framework import serializers
from .models import BlogPost

# Definir la representation d'un utilisateur
class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ['url', 'username', 'email']
		

class BlogPostSerializer(serializers.ModelSerializer):
	class Meta:
		model = BlogPost
		fields = '__all__'
		lookup_field = 'slug'
