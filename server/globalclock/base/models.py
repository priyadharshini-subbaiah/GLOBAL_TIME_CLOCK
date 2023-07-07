from django.db import models
import uuid

# Create your models here.

class CustomTime(models.Model):
    hours = models.IntegerField()
    minutes = models.IntegerField()
    seconds = models.IntegerField()
    am_pm = models.CharField(max_length=5)
    refid = models.UUIDField(default=uuid.uuid4, editable=False)

    def __str__(self):
        return f"{self.hours}:{self.minutes}:{self.seconds} {self.am_pm}"