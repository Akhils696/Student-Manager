const request = require('supertest');
const app = require('../server');
const { connectTestDB, disconnectTestDB, clearTestDB } = require('../config/testDB');

describe('Task Management API Tests', () => {
  let server;
  let authToken;
  let testUserId;
  let testStudentId;
  let testTaskId;

  beforeAll(async () => {
    await connectTestDB();
    server = app.listen(0);
  });

  afterAll(async () => {
    await clearTestDB();
    await disconnectTestDB();
    server.close();
  });

  beforeEach(async () => {
    await clearTestDB();
    
    // Register and login a user
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

    authToken = registerResponse.body.token;
    testUserId = registerResponse.body._id;

    // Create a test student
    const studentResponse = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      });

    testStudentId = studentResponse.body._id;
  });

  describe('POST /api/tasks', () => {
    test('should create a new task successfully', async () => {
      const taskData = {
        studentId: testStudentId,
        title: 'Complete Math Homework',
        description: 'Finish exercises 1-20 in chapter 5',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        priority: 'high',
        category: 'homework'
      };

      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(taskData);

      expect(response.status).toBe(201);
      expect(response.body.title).toBe(taskData.title);
      expect(response.body.description).toBe(taskData.description);
      expect(response.body.priority).toBe(taskData.priority);
      expect(response.body.category).toBe(taskData.category);
      expect(response.body.status).toBe('pending');
      expect(response.body.userId.toString()).toBe(testUserId);
      expect(response.body.studentId.toString()).toBe(testStudentId);
      
      testTaskId = response.body._id;
    });

    test('should fail to create task without required fields', async () => {
      const response = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Test Task' }); // Missing studentId and dueDate

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('student, title, and due date');
    });

    test('should fail to create task without authentication', async () => {
      const taskData = {
        studentId: testStudentId,
        title: 'Test Task',
        dueDate: new Date()
      };

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData);

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/tasks', () => {
    beforeEach(async () => {
      // Create test tasks
      await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          studentId: testStudentId,
          title: 'Task 1',
          description: 'First task',
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          priority: 'high'
        });

      await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          studentId: testStudentId,
          title: 'Task 2',
          description: 'Second task',
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          priority: 'medium'
        });
    });

    test('should get all tasks for authenticated user', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      
      // Tasks should be sorted by dueDate
      expect(new Date(response.body[0].dueDate).getTime())
        .toBeLessThanOrEqual(new Date(response.body[1].dueDate).getTime());
    });

    test('should fail to get tasks without authentication', async () => {
      const response = await request(app)
        .get('/api/tasks');

      expect(response.status).toBe(401);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    beforeEach(async () => {
      const taskResponse = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          studentId: testStudentId,
          title: 'Original Task',
          description: 'Original description',
          dueDate: new Date(),
          status: 'pending'
        });

      testTaskId = taskResponse.body._id;
    });

    test('should update task successfully', async () => {
      const updateData = {
        title: 'Updated Task',
        description: 'Updated description',
        status: 'in-progress',
        priority: 'low'
      };

      const response = await request(app)
        .put(`/api/tasks/${testTaskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updateData.title);
      expect(response.body.description).toBe(updateData.description);
      expect(response.body.status).toBe(updateData.status);
      expect(response.body.priority).toBe(updateData.priority);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    beforeEach(async () => {
      const taskResponse = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          studentId: testStudentId,
          title: 'Task to Delete',
          dueDate: new Date()
        });

      testTaskId = taskResponse.body._id;
    });

    test('should delete task successfully', async () => {
      const response = await request(app)
        .delete(`/api/tasks/${testTaskId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('Task removed');

      // Verify task is deleted
      const getResponse = await request(app)
        .get(`/api/tasks/${testTaskId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(getResponse.status).toBe(404);
    });
  });
});