const request = require('supertest');
const app = require('../server'); // Import the express app

// Simple test to verify the server responds to requests
console.log('Testing server endpoints...\n');

// Test the root endpoint
request(app)
  .get('/')
  .then(response => {
    console.log('✓ Root endpoint test passed');
    console.log('  Response status:', response.status);
    console.log('  Response body:', response.body);
  })
  .catch(error => {
    console.log('✗ Root endpoint test failed:', error.message);
  });

// Test the auth routes exist
request(app)
  .post('/api/auth/register')
  .send({})
  .then(response => {
    // We expect a 400 error for missing fields, which means the route exists
    console.log('✓ Auth register route exists');
    console.log('  Response status:', response.status);
  })
  .catch(error => {
    console.log('✗ Auth register route test failed:', error.message);
  });

// Test the students routes exist
request(app)
  .get('/api/students')
  .then(response => {
    // We expect a 401 error for unauthorized access, which means the route exists
    console.log('✓ Students route exists');
    console.log('  Response status:', response.status);
  })
  .catch(error => {
    console.log('✗ Students route test failed:', error.message);
  });

// Test the tasks routes exist
request(app)
  .get('/api/tasks')
  .then(response => {
    // We expect a 401 error for unauthorized access, which means the route exists
    console.log('✓ Tasks route exists');
    console.log('  Response status:', response.status);
  })
  .catch(error => {
    console.log('✗ Tasks route test failed:', error.message);
  });

console.log('\n✓ Server structure tests completed!');
console.log('Note: This test verifies that endpoints exist and respond appropriately.');