from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    caption = models.CharField(max_length=250)
    img = models.ImageField(upload_to="pictures/", null=True, blank=True)
    date_posted = models.DateTimeField(auto_now_add=True, auto_now=False,)

    def __str__(self):
        return str(self.caption)
