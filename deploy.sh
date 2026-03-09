#!/bin/bash

# Production Deployment Script for Student Planner
# This script automates the deployment process for both frontend and backend

echo "🚀 Starting Student Planner Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    log_error "Please do not run this script as root"
    exit 1
fi

# Step 1: Pull latest changes
log_info "Pulling latest changes from repository..."
git pull origin main

if [ $? -ne 0 ]; then
    log_error "Failed to pull latest changes"
    exit 1
fi

# Step 2: Install backend dependencies
log_info "Installing backend dependencies..."
cd backend
npm install --production

if [ $? -ne 0 ]; then
    log_error "Failed to install backend dependencies"
    exit 1
fi
cd ..

# Step 3: Install frontend dependencies
log_info "Installing frontend dependencies..."
cd frontend
npm install

if [ $? -ne 0 ]; then
    log_error "Failed to install frontend dependencies"
    exit 1
fi
cd ..

# Step 4: Build frontend
log_info "Building frontend for production..."
cd frontend
npm run build

if [ $? -ne 0 ]; then
    log_error "Failed to build frontend"
    exit 1
fi
cd ..

# Step 5: Run database migrations (if any)
log_info "Running database migrations..."
# Add migration commands here if needed

# Step 6: Restart services
log_info "Restarting services..."

# Stop existing processes
if [ -f backend.pid ]; then
    kill $(cat backend.pid) 2>/dev/null
    rm backend.pid
fi

if [ -f frontend.pid ]; then
    kill $(cat frontend.pid) 2>/dev/null
    rm frontend.pid
fi

# Start backend
log_info "Starting backend server..."
cd backend
nohup npm start > ../logs/backend.log 2>&1 &
echo $! > ../backend.pid
cd ..

# Start frontend (if using Vite preview)
log_info "Starting frontend server..."
cd frontend
nohup npm run preview -- --host 0.0.0.0 --port 5173 > ../logs/frontend.log 2>&1 &
echo $! > ../frontend.pid
cd ..

# Wait for services to start
sleep 5

# Step 7: Health check
log_info "Performing health check..."

# Check backend
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    log_info "Backend is running"
else
    log_warn "Backend health check failed"
fi

# Check frontend
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    log_info "Frontend is running"
else
    log_warn "Frontend health check failed"
fi

# Step 8: Cleanup
log_info "Cleaning up..."
npm cache clean --force

# Display deployment summary
echo ""
echo "====================================="
echo "✅ Deployment Complete!"
echo "====================================="
echo "Backend PID: $(cat backend.pid 2>/dev/null || echo 'N/A')"
echo "Frontend PID: $(cat frontend.pid 2>/dev/null || echo 'N/A')"
echo ""
echo "Logs:"
echo "  Backend: logs/backend.log"
echo "  Frontend: logs/frontend.log"
echo ""
echo "Access URLs:"
echo "  Frontend: http://localhost:5173"
echo "  Backend API: http://localhost:5000"
echo "====================================="
echo ""
log_info "Deployment finished successfully!"
