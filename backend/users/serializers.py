from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


class SignupSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(
        choices=["admin", "staff", "customer"], required=False)

    def create(self, validated_data):
        role = validated_data.get("role", "customer")
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        Profile.objects.create(
            user=user,
            role=role
        )

        return user
