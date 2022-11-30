"""
    Modèles pour le blog
"""
import datetime
from django.db import models
from django.contrib.auth import get_user_model

# built-in function to standardize strings
from django.template.defaultfilters import slugify

# Create your models here.

User = get_user_model()


class Categories(models.TextChoices):
    """
    Categories des différents articles selon thème

    Attributs:
        tech:           développement, programmation, tech
        society:       société, économie, politique, monde
        lect:           analyses et résumés de lectures et textes
        entertainment: films, séries, jeux vidéo, musique
        opinion:       actualités, op-ed de visiteurs, etc.
    """

    TECH = "technologie"
    SOCIETY = "société"
    LECT = "lectures"
    ENTERTAINMENT = "divers(tissement)"
    OPINION = "opinion"


class Blogpost(models.Model):
    """
    une publication sur le blog

    Attributs:
        title:          le titre de la publication
        slug:          label pour url de la pub.
        category:      categorie thématique de la pub.
        thumbnail:      image d'illustration de la pub.
        excerpt:      extrait du contenu de la pub.
        month / day:  date de la pub.
        content:      contenu de la pub.
        featured:      si publication épinglée page d'accueil.
        date_created: date création publication

    Méthodes:

    """

    title = models.CharField(max_length=255, unique=True, verbose_name="Titre")
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    category = models.CharField(
        max_length=50, choices=Categories.choices, default=Categories.OPINION
    )

    thumbnail = models.ImageField(upload_to="photos/%Y/%m/%d")
    # définir une image par défaut pour opinions ?

    excerpt = models.CharField(max_length=150)
    month = models.CharField(max_length=4)
    day = models.CharField(max_length=2)
    date_created = models.DateField(default=datetime.date.today(), blank=True)
    last_updated = models.DateTimeField(auto_now=True)
    featured = models.BooleanField(default=False)
    published = models.BooleanField(default=False, verbose_name="Publié")
    content = models.TextField(verbose_name="Corps")

    def __str__(self):
        """Représentation de la publication en string"""
        return self.title

    def save(self, *args, **kwargs):
        """sauvegarder un article à partir d'un slug unique"""
        original_slug = slugify(self.title)

        # check if slug exists already in db and modify consequently
        db_slugcheck = Blogpost.objects.all().filter(slug__iexact=original_slug).count()
        count = 1
        slug = original_slug
        while db_slugcheck:
            slug = original_slug + "-" + str(count)
            count += 1
            db_slugcheck = Blogpost.objects.all().filter(slug__iexact=slug).count()

        self.slug = slug

        # update featured publication if necessary (self.featured = True)
        if self.featured:
            try:
                # check if blog post currently featured and unpin it
                current_feat = Blogpost.objects.get(featured=True)
                if self != current_feat:
                    current_feat.featured = False
                    current_feat.save()

            except Blogpost.DoesNotExist:
                # if no currently featured blog post everything is fine
                pass

        # super : look into self.__class__.mro() for next class (X) listed after Blogpost
        # returns super object -> proxy for X.

        # Here: super(Blogpost, self).save() calls save method of next class after
        # Blogpost in self's MRO ( maybe ?)

        # equivalent to: models.Model.save(self, ...) except what if we add a class
        # in between model and blogposts ? here, no need to change with
        # automatic MRO search/lookup.
        super().save(*args, **kwargs)
