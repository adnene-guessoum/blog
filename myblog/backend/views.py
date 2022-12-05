"""
    Views used by blog django app
"""
# from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import viewsets

from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from backend.models import Blogpost
from backend.serializers import BlogPostSerializer
from .serializers import UserSerializer

User = get_user_model()


# Disabling 7 ancestor limit for view inheritance
class UserViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    """
    User viewset for serializer
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer


class BlogPostListView(ListAPIView):
    """Listing view of the different publications by date"""

    queryset = Blogpost.objects.order_by("-date_created")
    serializer_class = BlogPostSerializer
    lookup_field = "slug"
    permission_classes = (permissions.AllowAny,)


class BlogPostDetailView(RetrieveAPIView):
    """Detail View of the different publications by date"""

    queryset = Blogpost.objects.order_by("-date_created")
    serializer_class = BlogPostSerializer
    lookup_field = "slug"
    permission_classes = (permissions.AllowAny,)


class BlogPostFeaturedView(RetrieveAPIView):
    """View of the featured publication"""

    queryset = Blogpost.objects.all().filter(featured=True)
    serializer_class = BlogPostSerializer
    lookup_field = "slug"
    permission_classes = (permissions.AllowAny,)


class BlogPostCategoryView(APIView):
    """Categories view"""

    serializer_class = BlogPostSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        """post response on request"""
        data = self.request.data
        category = data("category")
        queryset = Blogpost.objects.order_by("-date_created").filter(
            category__iexact=category
        )
        serializer = BlogPostSerializer(queryset, any=True)

        return Response(serializer.data)
