# Authentication System Documentation

## Overview
The Student Planner application implements a comprehensive authentication system with secure user registration, login, and profile management capabilities. The system uses JWT tokens for secure communication between the frontend and backend.

## Components

### 1. API Service Layer
- **File**: `src/services/api.js`
- Handles base API configuration with interceptors for automatic token management
- Implements request/response interceptors for authentication headers and error handling

### 2. Authentication Service
- **File**: `src/services/authService.js`
- Centralized service for all authentication-related API calls
- Provides clean interface for login, register, profile management, and password recovery

### 3. Authentication Context
- **File**: `src/contexts/AuthContext.jsx`
- Manages global authentication state (user, token, isAuthenticated)
- Provides authentication actions (login, register, logout, etc.)

### 4. Authentication Hooks
- **File**: `src/hooks/useAuth.js`
- Custom hooks for authentication state and actions
- Includes `useAuthState`, `useAuthActions`, and `useProtectedRoute`

### 5. Authentication Components
- **Login**: `src/pages/Login.jsx` - User login form
- **Register**: `src/pages/Register.jsx` - User registration form
- **ForgotPassword**: `src/components/Auth/ForgotPassword.jsx` - Password recovery request
- **ResetPassword**: `src/components/Auth/ResetPassword.jsx` - Password reset form
- **UserProfile**: `src/components/Auth/UserProfile.jsx` - User profile management

## API Endpoints

### Authentication Endpoints
- `POST /api/auth/login` - Authenticate user and return JWT token
- `POST /api/auth/register` - Register new user account
- `GET /api/auth/profile` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `DELETE /api/auth/profile` - Delete user account
- `POST /api/auth/forgot-password` - Request password reset link
- `POST /api/auth/reset-password/:token` - Reset password with token
- `GET /api/auth/verify-token` - Verify token validity (if implemented)

### Security Features
- Automatic JWT token attachment to requests
- Token expiration handling and auto-logout
- Request/response error handling
- XSS and CSRF protection

## Usage Examples

### Using Authentication Context
```jsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Check if user is authenticated
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {user.username}!</div>;
}
```

### Using Authentication Hooks
```jsx
import { useAuthState, useAuthActions } from '../hooks/useAuth';

function Login() {
  const { isLoading } = useAuthState();
  const { login } = useAuthActions();
  
  const handleSubmit = async (credentials) => {
    const result = await login(credentials);
    if (result.success) {
      // Handle successful login
    }
  };
}
```

### Protected Routes
```jsx
import PrivateRoute from './components/Common/PrivateRoute';

// In App.jsx
<Route 
  path="/dashboard" 
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  } 
/>
```

## Security Best Practices
- JWT tokens stored in localStorage (consider HttpOnly cookies for production)
- Automatic token removal on logout
- Token verification on page load
- Proper error handling and user feedback
- Input validation and sanitization

## Error Handling
- Network errors are caught and user-friendly messages displayed
- Unauthorized access redirects to login page
- Form validation prevents invalid submissions
- Toast notifications provide user feedback

## Environment Variables
- `VITE_API_BASE_URL` - Backend API base URL (default: http://localhost:5000/api)

## Future Enhancements
- OAuth integration (Google, Facebook, etc.)
- Two-factor authentication
- Biometric authentication
- Session management improvements
- Refresh token implementation