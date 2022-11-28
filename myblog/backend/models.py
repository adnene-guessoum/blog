from django.db import models
from datetime import datetime
# built-in function to standardize strings
from django.template.defaultFilters import slugify

# Create your models here.

class BlogPost(model.Model):
	title = models.CharField(max_length=255, unique=True, verbose_name="Titre")
	slug = models.SlugField(max_length=255, unique=True, blank=True)

