# Generated by Django 4.2.4 on 2023-08-22 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quiz_api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quiz',
            name='number_of_questions',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
