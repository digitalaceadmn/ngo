from pyclbr import Class
from django.db import models


# Create your models here.
class Configuration(models.Model):
    key = models.CharField(max_length=100, null=False)
    value = models.CharField(max_length=255, null=False)

    def __str__(self):
        return f"{self.key} → {self.value}"
