from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from ecomm.models import User
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

def register_social_user(provider, user_id, email, name):
    filtered_user_by_email = User.objects.filter(email=email)
    
    if filtered_user_by_email.exists():
        if provider == filtered_user_by_email[0].auth_provider:
            new_user = User.objects.get(email=email)
            registered_user = User.objects.get(email=email)
            registered_user.check_password(settings.SOCIAL_SECRET)
            token=RefreshToken.for_user(new_user)   
            # Token.objects.filter(user=registered_user).delete()
            # Token.objects.create(user=registered_user)
            # new_token = list(Token.objects.filter(user_id=registered_user).values("key"))
            print("yaha",registered_user)
            return {
                '_id':registered_user.id,
                'id':registered_user.id,
                'name': registered_user.username,
                'email': registered_user.email,
                'token': str(token.access_token),
                'access': str(token.access_token),
                'refresh':str(token),
            }
        else:
            raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

    else:
        user = {
            'username': email, 'email': email,
            'password': settings.SOCIAL_SECRET
        }
        user = User.objects.create_user(**user)
        user.is_active = True
        user.auth_provider = provider
        user.save()
        new_user = User.objects.get(email=email)
        new_user.check_password(settings.SOCIAL_SECRET)
        token=RefreshToken.for_user(new_user)
        # Token.objects.create(user=new_user)
        # new_token = list(Token.objects.filter(user_id=new_user).values("key"))
        return {
                '_id':new_user.id,
                'id':new_user.id,
                'name': new_user.email,
                'email': new_user.email,
                'token': str(token.access_token),
                'access': str(token.access_token),
                'refresh':str(token),
            }