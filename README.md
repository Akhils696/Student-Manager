# Student Planner Application

A comprehensive student planner application that allows authenticated users to manage student details and tasks with advanced features like notifications, calendar view, and progress tracking.

## Features

- User authentication (register/login)
- Student management (CRUD operations)
- Task management (CRUD operations)
- Task assignment to specific students
- Priority and status tracking for tasks
- Responsive design for desktop and mobile

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
5. Create a `.env` file in the backend directory with the following:
   ```
   NODE_ENV = development
   PORT = 5000
   MONGODB_URI = mongodb://localhost:27017/student-planner
   JWT_SECRET = your_secret_key_here
   ```

## Running the Application

To run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/students` - Get all students for logged-in user
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/tasks` - Get all tasks for logged-in user
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/student/:studentId` - Get tasks for specific student