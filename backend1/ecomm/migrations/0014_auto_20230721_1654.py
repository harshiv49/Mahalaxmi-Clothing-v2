# Generated by Django 3.2.3 on 2023-07-21 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecomm', '0013_razorpaypayment'),
    ]

    operations = [
        migrations.DeleteModel(
            name='RazorpayPayment',
        ),
        migrations.AddField(
            model_name='user',
            name='auth_provider',
            field=models.CharField(blank=True, default='email', max_length=50),
        ),
    ]
