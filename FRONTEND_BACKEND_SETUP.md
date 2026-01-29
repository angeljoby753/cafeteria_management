# Frontend-Backend Connection Summary

## What Has Been Done

### ✅ Frontend Updates

1. **Login.jsx** - Updated with:
   - State management for username and password
   - Form submission with API call to `http://127.0.0.1:8000/login/`
   - Token and user data storage in localStorage
   - Error message display
   - Loading state
   - Navigation to home page on successful login

2. **Signup.jsx** - Already had:
   - State management for form data
   - Password confirmation validation
   - API call to `http://127.0.0.1:8000/signup/`
   - Error handling for duplicate username/email
   - Navigation to login page on successful signup

3. **api.jsx** - Enhanced with:
   - Axios instance with base URL
   - Request interceptor for automatic token attachment
   - Error handling wrappers
   - Helper functions for signup, login, and getting user data

4. **AuthContext.jsx** - Created for:
   - Global authentication state management
   - Easy access to user info and token across components
   - Logout functionality

## Next Steps: Backend Setup

Your frontend is ready to connect! Now you need to set up the Django backend. Follow the detailed instructions in `BACKEND_SETUP.md`.

### Quick Backend Setup:

1. **Create backend folder** with Django project
2. **Install dependencies**: django, djangorestframework, django-cors-headers
3. **Create User model** with email and username fields
4. **Create 4 endpoints**:
   - `POST /signup/` - Create new user
   - `POST /login/` - Authenticate user and return token
   - `GET /user/` - Get current user (protected)
   - `POST /logout/` - Logout user

## API Endpoints Expected

The frontend will call these endpoints:

### Signup
```
POST http://127.0.0.1:8000/signup/
Body: { username, email, password }
Returns: { token, user: { id, username, email } }
```

### Login
```
POST http://127.0.0.1:8000/login/
Body: { username, password }
Returns: { token, user: { id, username, email } }
```

### Get Current User (with token)
```
GET http://127.0.0.1:8000/user/
Headers: Authorization: Bearer {token}
Returns: { id, username, email }
```

## How to Use in Components

### Without AuthContext (Simple approach):
```jsx
import axios from 'axios';

// In component:
const response = await axios.post('http://127.0.0.1:8000/login/', {
  username: username,
  password: password
});

localStorage.setItem('authToken', response.data.token);
```

### With AuthContext (Recommended):
```jsx
import { useAuth } from '../context/AuthContext';

export function MyComponent() {
  const { login, user, isAuthenticated } = useAuth();
  
  const handleLogin = async (username, password) => {
    const response = await axios.post('http://127.0.0.1:8000/login/', {
      username,
      password
    });
    login(response.data.token, response.data.user);
  };
  
  return (
    <>
      {isAuthenticated && <p>Welcome, {user.username}!</p>}
    </>
  );
}
```

## Important Configuration

### In App.jsx or main.jsx, wrap with AuthProvider:
```jsx
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Your routes */}
    </AuthProvider>
  );
}
```

## Testing Flow

1. **Start Backend**: `python manage.py runserver`
2. **Start Frontend**: `npm run dev`
3. **Visit**: `http://localhost:5173/signup`
4. **Create account** with test data
5. **Check database** - user should be created
6. **Login** with same credentials
7. **Verify** - token is stored, user is logged in

## Database

After backend setup and migrations, user data will be stored in:
- Default: SQLite database (`db.sqlite3`)
- Production: PostgreSQL recommended

## Security Checklist for Production

- [ ] Use HTTPS instead of HTTP
- [ ] Enable CSRF protection
- [ ] Use secure token storage
- [ ] Implement password reset
- [ ] Add rate limiting for login attempts
- [ ] Use JWT tokens instead of DRF tokens (optional, more secure)
- [ ] Add input validation and sanitization
- [ ] Set appropriate CORS origins
- [ ] Use environment variables for secrets

## Need Help?

Check `BACKEND_SETUP.md` for:
- Detailed step-by-step instructions
- Complete code samples
- Troubleshooting guide
