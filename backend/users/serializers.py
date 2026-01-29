from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class SignupSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=["admin", "staff", "customer"])

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        UserProfile.objects.create(
            user=user,
            role=validated_data["role"]
        )

        return user
