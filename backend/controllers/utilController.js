const asyncHandler = require('express-async-handler');

// @desc    Get server statistics
// @route   GET /api/util/stats
// @access  Public
const getServerStats = asyncHandler(async (req, res) => {
  const stats = {
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage ? process.cpuUsage() : null,
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    platform: process.platform,
  };
  
  res.status(200).json(stats);
});

// @desc    Get API documentation
// @route   GET /api/util/docs
// @access  Public
const getApiDocs = asyncHandler(async (req, res) => {
  const endpoints = [
    { method: 'GET', path: '/api/auth/profile', description: 'Get authenticated user profile' },
    { method: 'POST', path: '/api/auth/login', description: 'Authenticate user' },
    { method: 'POST', path: '/api/auth/register', description: 'Register new user' },
    { method: 'GET', path: '/api/students', description: 'Get all students for authenticated user' },
    { method: 'POST', path: '/api/students', description: 'Create new student' },
    { method: 'GET', path: '/api/tasks', description: 'Get all tasks for authenticated user' },
    { method: 'POST', path: '/api/tasks', description: 'Create new task' },
    { method: 'GET', path: '/api/tasks/filter', description: 'Filter tasks by criteria' },
    { method: 'GET', path: '/api/tasks/stats', description: 'Get task statistics' },
    { method: 'POST', path: '/api/tasks/bulk', description: 'Bulk create tasks' },
    { method: 'PUT', path: '/api/tasks/bulk', description: 'Bulk update tasks' },
    { method: 'DELETE', path: '/api/tasks/bulk', description: 'Bulk delete tasks' },
    { method: 'GET', path: '/api/util/stats', description: 'Get server statistics' },
    { method: 'GET', path: '/api/util/docs', description: 'Get API documentation' },
    { method: 'GET', path: '/health', description: 'Health check endpoint' },
  ];
  
  res.status(200).json({ endpoints });
});

module.exports = {
  getServerStats,
  getApiDocs,
};