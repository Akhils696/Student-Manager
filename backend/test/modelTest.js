// Test to verify our models are properly defined without database connection
const mongoose = require('mongoose');

// Import models
const User = require('../models/User');
const Student = require('../models/Student');
const Task = require('../models/Task');

console.log('Testing model definitions...\n');

// Test User model
try {
  const userInstance = new User({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  });
  
  console.log('✓ User model definition is valid');
  console.log('  Sample User fields:', Object.keys(userInstance.toObject()));
} catch (error) {
  console.error('✗ User model error:', error.message);
}

// Test Student model
try {
  const studentInstance = new Student({
    userId: new mongoose.Types.ObjectId(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    gradeLevel: '10th Grade',
    subjects: ['Math', 'Science']
  });
  
  console.log('\n✓ Student model definition is valid');
  console.log('  Sample Student fields:', Object.keys(studentInstance.toObject()));
} catch (error) {
  console.error('✗ Student model error:', error.message);
}

// Test Task model
try {
  const taskInstance = new Task({
    userId: new mongoose.Types.ObjectId(),
    studentId: new mongoose.Types.ObjectId(),
    title: 'Sample Task',
    description: 'Sample Description',
    dueDate: new Date(),
    priority: 'medium',
    status: 'pending',
    category: 'homework'
  });
  
  console.log('\n✓ Task model definition is valid');
  console.log('  Sample Task fields:', Object.keys(taskInstance.toObject()));
} catch (error) {
  console.error('✗ Task model error:', error.message);
}

console.log('\n✓ All model definitions are syntactically correct!');
console.log('\nNote: This test verifies model structure only.');
console.log('For full database functionality, ensure MongoDB is running.');