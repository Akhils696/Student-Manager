# Student Planner Application

A comprehensive student management application built with the MERN stack that helps educators and students manage academic tasks, assignments, and student information.

## Features

- **Authentication System**: Secure JWT-based authentication with registration and login
- **Student Management**: Add, edit, and track student information
- **Task Management**: Create, update, and track academic tasks and assignments
- **Dashboard**: Overview of students and tasks with statistics
- **Calendar View**: Visual representation of upcoming tasks and deadlines
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React, Redux Toolkit, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Testing**: Jest, Supertest, React Testing Library

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

### Students
- `GET /api/students` - Get all students for authenticated user
- `GET /api/students/:id` - Get a specific student
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user
- `GET /api/tasks/:id` - Get a specific task
- `GET /api/tasks/student/:studentId` - Get tasks for a specific student
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

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
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication and other middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API route definitions
│   ├── test/            # Backend tests
│   ├── config/          # Database and configuration files
│   ├── server.js        # Main server file
│   └── package.json
├── frontend/
│   ├── public/          # Public assets
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── store/       # Redux store configuration
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Main app component
│   │   └── index.css    # Global styles
│   └── package.json
├── Dockerfile
└── README.md
```

## Security Features

- JWT-based authentication with secure token storage
- Input validation and sanitization
- Protection against common vulnerabilities
- Proper error handling without exposing sensitive information

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.