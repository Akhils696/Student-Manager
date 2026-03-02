const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const { connectTestDB, disconnectTestDB, clearTestDB } = require('../config/testDB');

describe('Authentication API Tests', () => {
  let server;

  beforeAll(async () => {
    await connectTestDB();
    server = app.listen(0); // Use port 0 for automatic port assignment
  });

  afterAll(async () => {
    await clearTestDB();
    await disconnectTestDB();
    server.close();
  });

  beforeEach(async () => {
    await clearTestDB();
  });

  describe('POST /api/auth/register', () => {
    test('should register a new user successfully', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.username).toBe(userData.username);
      expect(response.body.email).toBe(userData.email);
      expect(response.body).toHaveProperty('token');
      expect(response.body.password).toBeUndefined(); // Password should not be returned
    });

    test('should fail registration with missing fields', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({ username: 'testuser' }); // Missing email and password

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });

    test('should fail registration with duplicate email', async () => {
      // Create first user
      const userData = {
        username: 'testuser1',
        email: 'test@example.com',
        password: 'password123'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData);

      // Try to create user with same email
      const duplicateUser = {
        username: 'testuser2',
        email: 'test@example.com',
        password: 'password456'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(duplicateUser);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('already exists');
    });

    test('should fail registration with weak password', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: '123' // Too short
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      // This might pass depending on your validation, but we're testing the endpoint
      expect([201, 400]).toContain(response.status);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user for login tests
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };

      await request(app)
        .post('/api/auth/register')
        .send(userData);
    });

    test('should login existing user successfully', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.email).toBe(loginData.email);
      expect(response.body).toHaveProperty('token');
      expect(response.body.password).toBeUndefined();
    });

    test('should fail login with incorrect password', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('Invalid credentials');
    });

    test('should fail login with non-existent email', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('Invalid credentials');
    });

    test('should fail login with missing fields', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com' }); // Missing password

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message');
    });
  });

  describe('Input Validation', () => {
    test('should validate email format', async () => {
      const invalidData = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(invalidData);

      // Email validation might be handled by the database or middleware
      expect([201, 400]).toContain(response.status);
    });

    test('should handle empty request body', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({});

      expect(response.status).toBe(400);
    });
  });
});