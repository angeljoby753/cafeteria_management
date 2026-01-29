from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

from .models import Profile


@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    data = request.data

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "customer")

    if not username or not password or not email:
        return Response({"error": "username, email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=username, email=email, password=password)
    # create profile
    Profile.objects.create(user=user, role=role)

    token, _ = Token.objects.get_or_create(user=user)
    user_data = {"id": user.id, "username": user.username,
                 "email": user.email, "role": role}

    return Response({"message": "User created successfully", "token": token.key, "user": user_data}, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    data = request.data
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return Response({"error": "username and password required"}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)
    if not user:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

    token, _ = Token.objects.get_or_create(user=user)
    profile = getattr(user, "profile", None)
    role = profile.role if profile else ""
    user_data = {"id": user.id, "username": user.username,
                 "email": user.email, "role": role}

    return Response({"token": token.key, "user": user_data}, status=status.HTTP_200_OK)
