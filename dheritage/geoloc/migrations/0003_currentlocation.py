# Generated by Django 4.1.3 on 2022-11-30 04:05

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('geoloc', '0002_location_x_location_y_location_yaw'),
    ]

    operations = [
        migrations.CreateModel(
            name='CurrentLocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('x', models.FloatField(default=0.0)),
                ('y', models.FloatField(default=0.0)),
                ('yaw', models.FloatField(default=0.0, validators=[django.core.validators.MinValueValidator(-180.0), django.core.validators.MaxValueValidator(180.0)])),
            ],
        ),
    ]
