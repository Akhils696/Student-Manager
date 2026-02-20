const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('../models/User');
const Student = require('../models/Student');
const Task = require('../models/Task');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student-planner-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for testing'))
.catch(err => console.error('MongoDB connection error:', err));

// Test data creation
const testData = async () => {
  try {
    console.log('Starting database tests...');
    
    // Clear collections first
    await User.deleteMany({});
    await Student.deleteMany({});
    await Task.deleteMany({});
    
    // Create a test user
    const testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: '$2a$10$examplehashedpassword', // This is a dummy hash for testing
    });
    
    const savedUser = await testUser.save();
    console.log('✓ Test user created:', savedUser.username);
    
    // Create a test student
    const testStudent = new Student({
      userId: savedUser._id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gradeLevel: '10th Grade',
      subjects: ['Mathematics', 'Science'],
    });
    
    const savedStudent = await testStudent.save();
    console.log('✓ Test student created:', savedStudent.firstName, savedStudent.lastName);
    
    // Create a test task
    const testTask = new Task({
      userId: savedUser._id,
      studentId: savedStudent._id,
      title: 'Complete Math Homework',
      description: 'Finish exercises 1-20 in chapter 5',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      priority: 'high',
      category: 'homework',
    });
    
    const savedTask = await testTask.save();
    console.log('✓ Test task created:', savedTask.title);
    
    // Fetch and display all records
    const users = await User.find({});
    const students = await Student.find({});
    const tasks = await Task.find({});
    
    console.log('\n--- Database Test Results ---');
    console.log('Total Users:', users.length);
    console.log('Total Students:', students.length);
    console.log('Total Tasks:', tasks.length);
    
    console.log('\n✓ All database tests passed!');
    
    // Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error('✗ Database test failed:', error.message);
    mongoose.connection.close();
  }
};

// Run the test
testData();