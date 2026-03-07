# Student Planner Application

A comprehensive student management application built with the MERN stack that helps educators and students manage academic tasks, assignments, and student information.

## Features

- **Authentication System**: Secure JWT-based authentication with registration, login, password reset, and user profile management
- **Student Management**: Add, edit, delete, and track student information with grid/table views
- **Task Management**: Create, update, and track academic tasks and assignments with priority levels
- **Dashboard**: Interactive overview with statistics, recent activity, and performance metrics
- **Navigation**: Responsive navbar with user authentication state and routing
- **Calendar View**: Visual representation of upcoming tasks and deadlines
- **Advanced Filtering**: Search and filter students and tasks by multiple criteria
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18, Redux Toolkit, React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) with bcrypt password hashing
- **Testing**: Jest, Supertest, React Testing Library
- **State Management**: Redux Toolkit with custom hooks and contexts

## System Architecture

The application follows a client-server architecture with RESTful API design.

### Backend Architecture
- **Controllers**: Handle business logic for authentication, students, and tasks
- **Middleware**: Authentication verification, error handling, and request validation
- **Models**: Mongoose schemas for User, Student, and Task entities
- **Routes**: RESTful API endpoints with proper HTTP method usage

### Frontend Architecture
- **Component Library**: Modular React components organized by feature
- **State Management**: Redux Toolkit for global state with custom hooks
- **Context API**: Authentication context for user session management
- **Service Layer**: Centralized API service with interceptors and error handling

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

### Authentication System
- **LoginForm**: Reusable login form with validation
- **RegisterForm**: Registration form with password confirmation
- **PasswordResetRequest**: Password reset request component
- **UserProfile**: User profile management interface
- **AuthContext**: Global authentication state management
- **useAuth Hooks**: Custom hooks for authentication logic

### Student Management
- **StudentCard**: Card component for grid view display
- **StudentTable**: Table component for list view display
- **StudentForm**: Comprehensive form for adding/editing students
- **StudentDetails**: Detailed student profile view
- **StudentSearchFilter**: Search and filter controls
- **DeleteConfirmation**: Confirmation modal for deletions

### Task Management
- **TaskCard**: Card component with priority and status indicators
- **TaskTable**: Table component for task list display
- **TaskForm**: Form for creating and editing assignments
- **TaskDetails**: Detailed task information view
- **TaskSearchFilter**: Search and filter by priority, status, and student

### Dashboard and Layout
- **DashboardOverview**: Main dashboard with statistics and recent activity
- **StatCard**: Reusable statistics card component
- **Navbar**: Main navigation bar with user authentication
- **Footer**: Site footer with links and information

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.