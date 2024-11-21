from rest_framework import serializers, exceptions
from django.contrib.auth import get_user_model, authenticate


class UserRegistrationSerializer(serializers.ModelSerializer):
	password = serializers.CharField(max_length=65, min_length=8, style={'input_type': 'password'})
	class Meta:
		model = get_user_model()
		fields = ['email', 'username', 'first_name', 'last_name', 'password']

	def create(self, validated_data):
		user_password = validated_data.get('password', None)
		db_instance = self.Meta.model(email=validated_data.get('email'), username=validated_data.get('username'), first_name=validated_data.get('first_name'), last_name=validated_data.get('last_name'))
		db_instance.set_password(user_password)
		db_instance.save()
		return db_instance



class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=100, min_length=8, style={'input_type': 'password'})
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        username = data.get('username', '')
        password = data.get('password', '')

        if username and password:
            user = authenticate(request=self.context.get('request'), username=username, password=password)
            print(user)

            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    msg = 'User is deactivated.'
                    raise exceptions.ValidationError(msg)
            else:
                msg = 'Unable to log in with provided credentials.'
                raise exceptions.ValidationError(msg)
        else:
            msg = 'Must include "email" and "password".'
            raise exceptions.ValidationError(msg)

        return data