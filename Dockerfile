# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY backend/ ./backend/

# Expose port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]