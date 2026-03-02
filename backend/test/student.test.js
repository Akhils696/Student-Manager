const request = require('supertest');
const app = require('../server');
const { connectTestDB, disconnectTestDB, clearTestDB } = require('../config/testDB');

describe('Student Management API Tests', () => {
  let server;
  let authToken;
  let testUserId;
  let testStudentId;

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
    
    // Register and login a user for testing
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

    authToken = registerResponse.body.token;
    testUserId = registerResponse.body._id;
  });

  describe('POST /api/students', () => {
    test('should create a new student successfully', async () => {
      const studentData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        gradeLevel: '10th Grade',
        subjects: ['Mathematics', 'Science']
      };

      const response = await request(app)
        .post('/api/students')
        .set('Authorization', `Bearer ${authToken}`)
        .send(studentData);

      expect(response.status).toBe(201);
      expect(response.body.firstName).toBe(studentData.firstName);
      expect(response.body.lastName).toBe(studentData.lastName);
      expect(response.body.email).toBe(studentData.email);
      expect(response.body.gradeLevel).toBe(studentData.gradeLevel);
      expect(response.body.subjects).toEqual(studentData.subjects);
      expect(response.body.userId.toString()).toBe(testUserId);
      
      testStudentId = response.body._id;
    });

    test('should fail to create student without authentication', async () => {
      const studentData = {
        firstName: 'John',
        lastName: 'Doe'
      };

      const response = await request(app)
        .post('/api/students')
        .send(studentData);

      expect(response.status).toBe(401);
    });

    test('should fail to create student with missing required fields', async () => {
      const response = await request(app)
        .post('/api/students')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ email: 'test@example.com' }); // Missing firstName and lastName

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('first name and last name');
    });

    test('should handle invalid authentication token', async () => {
      const studentData = {
        firstName: 'John',
        lastName: 'Doe'
      };

      const response = await request(app)
        .post('/api/students')
        .set('Authorization', 'Bearer invalid-token')
        .send(studentData);

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/students', () => {
    beforeEach(async () => {
      // Create a test student
      const studentData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      };

      await request(app)
        .post('/api/students')
        .set('Authorization', `Bearer ${authToken}`)
        .send(studentData);
    });

    test('should get all students for authenticated user', async () => {
      const response = await request(app)
        .get('/api/students')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].firstName).toBe('John');
    });

    test('should fail to get students without authentication', async () => {
      const response = await request(app)
        .get('/api/students');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/students/:id', () => {
    beforeEach(async () => {
      // Create a test student
      const studentData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      };

      const response = await request(app)
        .post('/api/students')
        .set('Authorization', `Bearer ${authToken}`)
        .send(studentData);

      testStudentId = response.body._id;
    });

    test('should get student by ID successfully', async () => {
      const response = await request(app)
        .get(`/api/students/${testStudentId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(testStudentId);
      expect(response.body.firstName).toBe('John');
    });

    test('should fail to get non-existent student', async () => {
      const fakeId = '507f1f77bcf86cd799439011'; // Valid ObjectId format
      
      const response = await request(app)
        .get(`/api/students/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('Student not found');
    });

    test('should fail to get student with invalid ID format', async () => {
      const response = await request(app)
        .get('/api/students/invalid-id')
        .set('Authorization', `Bearer ${authToken}`);

      expect([400, 404]).toContain(response.status);
    });
  });

  describe('PUT /api/students/:id', () => {
    beforeEach(async () => {
      // Create a test student
      const studentData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      };

      const response = await request(app)
        .post('/api/students')
        .set('Authorization', `Bearer ${authToken}`)
        .send(studentData);

      testStudentId = response.body._id;
    });

    test('should update student successfully', async () => {
      const updateData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        gradeLevel: '11th Grade'
      };

      const response = await request(app)
        .put(`/api/students/${testStudentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.firstName).toBe(updateData.firstName);
      expect(response.body.lastName).toBe(updateData.lastName);
      expect(response.body.email).toBe(updateData.email);
      expect(response.body.gradeLevel).toBe(updateData.gradeLevel);
    });

    test('should fail to update student owned by different user', async () => {
      // Create another user
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'otheruser',
          email: 'other@example.com',
          password: 'password123'
        });

      const otherUserToken = registerResponse.body.token;

      const updateData = {
        firstName: 'Hacker',
        lastName: 'Attempt'
      };

      const response = await request(app)
        .put(`/api/students/${testStudentId}`)
        .set('Authorization', `Bearer ${otherUserToken}`)
        .send(updateData);

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('Not authorized');
    });
  });

  describe('DELETE /api/students/:id', () => {
    beforeEach(async () => {
      // Create a test student
      const studentData = {
        firstName: 'John',
        lastName: 'Doe'
      };

      const response = await request(app)
        .post('/api/students')
        .set('Authorization', `Bearer ${authToken}`)
        .send(studentData);

      testStudentId = response.body._id;
    });

    test('should delete student successfully', async () => {
      const response = await request(app)
        .delete(`/api/students/${testStudentId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('Student removed');

      // Verify student is deleted
      const getResponse = await request(app)
        .get(`/api/students/${testStudentId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(getResponse.status).toBe(404);
    });

    test('should fail to delete non-existent student', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      
      const response = await request(app)
        .delete(`/api/students/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(404);
    });
  });
});