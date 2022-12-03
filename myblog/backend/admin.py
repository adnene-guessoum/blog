"""
    Module admin:
        Représentation des modèles de l'interface d'administration
"""
from django.contrib import admin

# Summernotes
from django_summernote.admin import SummernoteModelAdmin  # type: ignore
from .models import Blogpost


# Use summernotes for all TextFields
class BlogPostAdmin(SummernoteModelAdmin):
    """
    Django-summernotes pour la création de contenu des postes sur le blog
    (WYSIWYG plug-in)
    """

    # pas besoin du slug sur panel admin:
    exclude = ("slug",)
    list_display = ("author", "id", "title", "category", "date_created")
    list_display_links = ("id", "title")
    search_fields = ("title",)
    list_per_page = 25
    summernote_fields = ("content",)


admin.site.register(Blogpost, BlogPostAdmin)
