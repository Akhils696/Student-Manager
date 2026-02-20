const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Import the express app
const User = require('../models/User');
const Student = require('../models/Student');
const Task = require('../models/Task');
require('dotenv').config();

describe('Student Planner API Integration Tests', () => {
  let authToken;
  let testUserId;
  let testStudentId;
  let testTaskId;

  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student-planner-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Clean up test data
    await User.deleteMany({});
    await Student.deleteMany({});
    await Task.deleteMany({});
    await mongoose.connection.close();
  });

  // Test 1: User Registration
  test('Should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.username).toBe('testuser');
    expect(res.body.email).toBe('test@example.com');
    expect(res.body).toHaveProperty('token');
    
    // Store the token and user ID for subsequent tests
    authToken = res.body.token;
    testUserId = res.body._id;
  });

  // Test 2: User Login
  test('Should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.email).toBe('test@example.com');
    expect(res.body).toHaveProperty('token');
  });

  // Test 3: Create a student
  test('Should create a new student', async () => {
    const res = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        gradeLevel: '10th Grade',
        subjects: ['Mathematics', 'Science']
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.firstName).toBe('John');
    expect(res.body.lastName).toBe('Doe');
    expect(res.body.gradeLevel).toBe('10th Grade');
    
    testStudentId = res.body._id;
  });

  // Test 4: Get all students
  test('Should get all students for the user', async () => {
    const res = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test 5: Create a task
  test('Should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        studentId: testStudentId,
        title: 'Complete Math Homework',
        description: 'Finish exercises 1-20 in chapter 5',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        priority: 'high',
        category: 'homework'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Complete Math Homework');
    expect(res.body.priority).toBe('high');
    
    testTaskId = res.body._id;
  });

  // Test 6: Get all tasks
  test('Should get all tasks for the user', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test 7: Update a task
  test('Should update a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${testTaskId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Complete Math Homework - Updated',
        status: 'in-progress'
      });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Complete Math Homework - Updated');
    expect(res.body.status).toBe('in-progress');
  });

  // Test 8: Get tasks by student
  test('Should get tasks for a specific student', async () => {
    const res = await request(app)
      .get(`/api/tasks/student/${testStudentId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

console.log('Integration test file created. To run tests:');
console.log('1. Install testing dependencies: npm install --save-dev jest supertest');
console.log('2. Run: npx jest integrationTest.js');