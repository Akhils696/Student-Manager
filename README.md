# Student Planner Application

A comprehensive, production-ready student management application built with the MERN stack. The Student Planner helps educational institutions and students efficiently manage academic tasks, assignments, deadlines, and student information through an intuitive, responsive interface.

## Key Features

### Core Functionality
- **Authentication & Authorization**: Secure JWT-based authentication with registration, login, password reset, and profile management
- **Student Management**: Comprehensive CRUD operations with grid/table views, advanced search, and filtering capabilities
- **Task Management**: Full-featured task assignment system with priority levels, status tracking, and deadline monitoring
- **Interactive Dashboard**: Real-time statistics, performance metrics, and recent activity overview
- **Calendar Integration**: Visual task scheduling with monthly view and deadline visualization
- **Notification System**: Real-time alerts for upcoming deadlines (24-hour and 7-day warnings) and overdue tasks
- **Responsive Design**: Mobile-first architecture ensuring seamless experience across all devices
- **Dark Mode**: Complete theme support with automatic system preference detection

## Tech Stack

### Frontend
- **React 18**: Modern UI library with hooks and functional components
- **Redux Toolkit**: Centralized state management
- **React Router**: Client-side routing and navigation
- **Tailwind CSS**: Utility-first styling with responsive breakpoints
- **Axios**: HTTP client for API communication
- **Vite**: Next-generation build tool for fast development

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing and security

### Testing & Quality
- **Jest**: JavaScript testing framework
- **Supertest**: HTTP assertion testing
- **React Testing Library**: Component testing utilities

### DevOps & Deployment
- **Docker**: Containerization support
- **Git**: Version control
- **Automated Deployment Scripts**: Linux/Windows deployment automation

## System Architecture

The application follows a client-server architecture with RESTful API design and modern best practices.

### Backend Architecture
- **Controllers**: Business logic for authentication, students, tasks, and notifications
- **Middleware**: JWT verification, error handling, input validation, CORS configuration
- **Models**: Mongoose schemas for User, Student, Task entities with validation
- **Routes**: RESTful API endpoints following HTTP method conventions
- **Security**: Rate limiting, input sanitization, secure password hashing

### Frontend Architecture
- **Component Library**: Modular, reusable React components organized by feature
- **State Management**: Redux Toolkit for global state with custom hooks and contexts
- **Context API**: Authentication context for user session management
- **Service Layer**: Centralized API service with interceptors and error handling
- **Routing**: Protected routes based on authentication status
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd student-planner/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/student-planner
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd student-planner/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:5173` in your browser

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-planner
JWT_SECRET=your_jwt_secret_key_here
```

For production, update the `MONGODB_URI` to point to your MongoDB Atlas cluster.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login existing user
- `POST /api/auth/forgot-password` - Request password reset email
- `POST /api/auth/reset-password/:token` - Reset password with token
- `GET /api/auth/profile` - Get current user profile

### Students
- `GET /api/students` - Get all students for authenticated user
- `GET /api/students/:id` - Get a specific student by ID
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get a specific task by ID
- `GET /api/tasks/student/:studentId` - Get tasks for a specific student
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Utilities
- `GET /api/utils/stats` - Get dashboard statistics

## Testing

### Backend Tests

To run backend tests:

```bash
cd student-planner/backend
npm test
```

### Frontend Tests

To run frontend tests:

```bash
cd student-planner/frontend
npm test
```

## Deployment

### Heroku Deployment

1. Prepare your app for deployment by ensuring dependencies are properly configured
2. Connect your GitHub repository to Heroku
3. Set environment variables in Heroku dashboard
4. Deploy the app

### Docker Deployment

A Dockerfile is provided in the root directory. To build and run:

```bash
# Build the image
docker build -t student-planner .

# Run the container
docker run -p 5000:5000 -e MONGODB_URI=your_mongo_uri -e JWT_SECRET=your_jwt_secret student-planner
```

## Project Structure

```
student-planner/
├── backend/
│   ├── controllers/     # Request handlers for auth, students, tasks
│   ├── middleware/      # Authentication and error handling middleware
│   ├── models/          # Mongoose models (User, Student, Task)
│   ├── routes/          # API route definitions
│   ├── test/            # Backend unit and integration tests
│   ├── config/          # Database connection and configuration
│   ├── utils/           # Utility functions and helpers
│   ├── server.js        # Main server entry point
│   └── package.json
├── frontend/
│   ├── public/          # Public assets
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   │   ├── Auth/    # Authentication components (Login, Register, etc.)
│   │   │   └── Students/# Student management components
│   │   ├── pages/       # Page-level components
│   │   ├── store/       # Redux store and slices
│   │   ├── contexts/    # React contexts (AuthContext)
│   │   ├── hooks/       # Custom React hooks
│   │   ├── services/    # API service layer
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Main application component
│   │   └── index.css    # Global styles
│   └── package.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Security Features

- JWT-based authentication with secure token storage in localStorage
- Password hashing using bcrypt with salt rounds
- Input validation and sanitization on both client and server
- Protection against common vulnerabilities (XSS, CSRF, injection attacks)
- Proper error handling without exposing sensitive information
- Rate limiting and CORS configuration
- Environment variable protection for sensitive data

## Key Components

### Authentication System (6 components)
- **LoginForm**: Reusable login form with validation and error handling
- **RegisterForm**: Registration interface with password confirmation
- **PasswordResetRequest**: Password reset request workflow
- **UserProfile**: User profile management and settings
- **AuthContext**: Global authentication state provider
- **useAuth Hooks**: Custom hooks for authentication logic

### Student Management (6 components)
- **StudentCard**: Card component for grid view display
- **StudentTable**: Table component for list view with sorting
- **StudentForm**: Comprehensive form for adding/editing students
- **StudentDetails**: Detailed student profile view with statistics
- **StudentSearchFilter**: Advanced search and filter controls
- **DeleteConfirmation**: Confirmation modal for safe deletions

### Task Management (5 components)
- **TaskCard**: Card component with priority and status indicators
- **TaskTable**: Table component for task list display
- **TaskForm**: Form for creating and editing assignments
- **TaskDetails**: Detailed task information view
- **TaskSearchFilter**: Multi-criteria search and filtering

### Calendar & Notifications (3 components + utilities)
- **Calendar**: Interactive monthly calendar with task visualization
- **NotificationBell**: Real-time notification dropdown with unread counter
- **notificationUtils**: Deadline tracking and notification management utilities

### Dashboard & Layout (5 components)
- **DashboardOverview**: Main dashboard with statistics and recent activity
- **StatCard**: Reusable statistics card component
- **Navbar**: Responsive navigation bar with user authentication
- **Footer**: Site footer with links and information
- **MobileNav**: Mobile-optimized hamburger menu navigation

### Styling & Accessibility (2 CSS files + utilities)
- **responsive.css**: Comprehensive responsive design utilities
- **darkMode.css**: Complete dark mode theme implementation
- **accessibility.js**: WCAG 2.1 compliance utilities and hooks

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.