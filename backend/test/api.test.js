const request = require('supertest');
const app = require('../server'); // Import the express app

describe('Student Planner API', () => {
  // Test the root endpoint
  test('should respond to root endpoint', async () => {
    const response = await request(app)
      .get('/');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Student Planner API is running...' });
  });

  // Test the auth register route exists
  test('should return 400 for invalid registration', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({});
    
    // Expect 400 because required fields are missing
    expect(response.status).toBe(400);
  });

  // Test the students route requires authentication
  test('should return 401 for unauthorized students access', async () => {
    const response = await request(app)
      .get('/api/students');
    
    // Expect 401 because authentication is required
    expect(response.status).toBe(401);
  });

  // Test the tasks route requires authentication
  test('should return 401 for unauthorized tasks access', async () => {
    const response = await request(app)
      .get('/api/tasks');
    
    // Expect 401 because authentication is required
    expect(response.status).toBe(401);
  });
});