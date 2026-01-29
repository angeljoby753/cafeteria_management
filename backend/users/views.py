from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@api_view(["POST"])
def signup(request):
    data = request.data

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if not username or not password or not email or not role:
        return Response(
            {"error": "All fields are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Create the user
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    # Save role in profile table
    user.profile.role = role
    user.profile.save()

    return Response(
        {"message": "User created successfully"},
        status=status.HTTP_201_CREATED
    )
