from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class EcommerceUser(models.Model): 
    
    nome_e_sobrenome = models.CharField(max_length=100)
    email = models.CharField(max_length=50)
    login_name = models.CharField(max_length=20)
    #password = models.CharField(max_length=20)
    token = models.CharField(max_length=500)