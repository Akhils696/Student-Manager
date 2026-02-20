const express = require('express');
const request = require('supertest');
const app = express();

// Middleware
app.use(express.json());

// Mock route to test if server starts properly
app.get('/', (req, res) => {
  res.json({ message: 'Student Planner API is running...' });
});

// Test the server
describe('Student Planner API', () => {
  it('should start the server and return welcome message', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).toBe('Student Planner API is running...');
        done();
      });
  });
});

console.log('API Test file created. To run tests:');
console.log('1. Install Jest: npm install --save-dev jest supertest');
console.log('2. Run: npx jest apiTest.js');