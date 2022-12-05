"""myblog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include  # , re_path

# from django.views.generic import TemplateView

# summernotes for debug=True
from django.conf import settings
from django.conf.urls.static import static

# Routers provide an easy way of automatically determining the URL conf.
from rest_framework import routers

# import view for user routing (TODO: check mypy issue)
from backend.views import UserViewSet  # type: ignore

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("summernote/", include("django_summernote.urls")),
    path("api/blog/", include("backend.urls")),
    path("admin/", admin.site.urls),
]

# path for React frontend eventually
# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )  # type: ignore
