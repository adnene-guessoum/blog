""" Blog backend configuration
"""
from django.apps import AppConfig


class BackendConfig(AppConfig):
    """Backend configuration"""

    default_auto_field = "django.db.models.BigAutoField"
    name = "backend"
