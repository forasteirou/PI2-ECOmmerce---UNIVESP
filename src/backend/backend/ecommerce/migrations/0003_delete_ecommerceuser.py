# Generated by Django 4.2.5 on 2023-11-07 16:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0002_remove_ecommerceuser_password'),
    ]

    operations = [
        migrations.DeleteModel(
            name='EcommerceUser',
        ),
    ]
