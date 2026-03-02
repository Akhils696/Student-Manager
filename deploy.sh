#!/bin/bash

# Deployment script for Student Planner Application

echo "Starting deployment of Student Planner Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js before proceeding."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm before proceeding."
    exit 1
fi

# Navigate to the project directory
cd "$(dirname "$0")"

echo "Installing backend dependencies..."
cd backend
npm install --production

echo "Building frontend..."
cd ../frontend
npm install
npm run build

echo "Returning to project root..."
cd ..

echo "Deployment completed successfully!"
echo ""
echo "To start the application:"
echo "1. Make sure MongoDB is running"
echo "2. Set your environment variables in a .env file in the backend directory"
echo "3. Run 'cd backend && npm start' to start the server"
echo "4. The application will be available on http://localhost:5000"
echo "5. The frontend build is ready in the frontend/dist directory"