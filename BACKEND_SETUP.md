# Backend Setup Guide for Cafeteria Management System

This guide will help you create a Django backend that connects with your React frontend for signup and login functionality.

## Prerequisites
- Python 3.9+
- pip (Python package manager)
- Django 4.0+

## Step 1: Create Backend Project Structure

```bash
# Navigate to your project root
cd f:\cafeteria_managementt

# Create backend folder
mkdir backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
```

## Step 2: Install Required Packages

```bash
pip install django
pip install djangorestframework
pip install django-cors-headers
pip install python-decouple
```

## Step 3: Create Django Project and App

```bash
django-admin startproject cafeteria_config .
python manage.py startapp users
```

## Step 4: Configure Django Settings

Update `cafeteria_config/settings.py`:

```python
# Add to INSTALLED_APPS
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'users',
]

# Add to MIDDLEWARE (near the top after SecurityMiddleware)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # ... rest of middleware
]

# Add CORS configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

CORS_ALLOW_CREDENTIALS = True

# Add REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# Database (default SQLite is fine for development)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Allow tokens for API authentication
INSTALLED_APPS += ['rest_framework.authtoken']
```

## Step 5: Create User Models

Update `users/models.py`:

```python
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    
    class Meta:
        db_table = 'users'
    
    def __str__(self):
        return self.username
```

## Step 6: Create Serializers

Create `users/serializers.py`:

```python
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True, min_length=6)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']
    
    def validate(self, data):
        if data['password'] != data.pop('confirm_password'):
            raise serializers.ValidationError("Passwords do not match!")
        return data
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
```

## Step 7: Create Views

Create `users/views.py`:

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_200_OK, HTTP_400_BAD_REQUEST
from django.contrib.auth import authenticate, get_user_model
from rest_framework.authtoken.models import Token

from .serializers import SignupSerializer, LoginSerializer, UserSerializer

User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    """Handle user signup"""
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.get(user=user)
        return Response({
            'message': 'Account created successfully!',
            'token': token.key,
            'user': UserSerializer(user).data
        }, status=HTTP_201_CREATED)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """Handle user login"""
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'Login successful!',
                'token': token.key,
                'user': UserSerializer(user).data
            }, status=HTTP_200_OK)
        else:
            return Response({
                'error': 'Invalid credentials'
            }, status=HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    """Get current logged-in user info"""
    user = request.user
    return Response(UserSerializer(user).data, status=HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """Handle user logout by deleting token"""
    request.user.auth_token.delete()
    return Response({'message': 'Logout successful!'}, status=HTTP_200_OK)
```

## Step 8: Create URL Routes

Create `users/urls.py`:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('user/', views.get_user, name='get_user'),
    path('logout/', views.logout, name='logout'),
]
```

Update `cafeteria_config/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.urls')),  # Include user routes
]
```

## Step 9: Create Database and Run Server

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser (optional, for admin access)
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

Your backend should now be running on `http://127.0.0.1:8000/`

## Step 10: Test the Endpoints

### Signup
```bash
POST http://127.0.0.1:8000/signup/
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "testpass123",
  "confirm_password": "testpass123"
}
```

### Login
```bash
POST http://127.0.0.1:8000/login/
Content-Type: application/json

{
  "username": "testuser",
  "password": "testpass123"
}
```

## Frontend Already Connected

Your React frontend (`Signup.jsx` and `Login.jsx`) is already configured to:
- Send requests to `http://127.0.0.1:8000/signup/` and `http://127.0.0.1:8000/login/`
- Store the authentication token in localStorage
- Display error messages from the backend
- Redirect to home page after successful login

## Important Notes

1. **CORS**: Make sure `corsheaders.middleware.CorsMiddleware` is added to MIDDLEWARE
2. **Token Authentication**: Tokens are stored in localStorage on the frontend
3. **Secure in Production**: 
   - Use HTTPS instead of HTTP
   - Set `DEBUG = False` in production
   - Use environment variables for sensitive data
   - Add proper validation and error handling
4. **Database**: SQLite is fine for development, use PostgreSQL for production

## Troubleshooting

### CORS Error
- Verify `CORS_ALLOWED_ORIGINS` in settings.py matches your frontend URL
- Check the origin of your frontend requests

### Port Already in Use
```bash
python manage.py runserver 8001
```

### Database Issues
```bash
python manage.py reset_db  # (requires django-extensions)
# Or delete db.sqlite3 and run migrations again
```
