const request = require('supertest');
const app = require('../index'); 
const mongoose = require('mongoose');
const User = require('../models/users'); 

describe('Test the authentication', () => {
  beforeAll(async () => {
    // Connect to the test database before running tests
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    // Clean up and close the connection after tests
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('Test Case 1: User registration works with a valid email and password.', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User created successfully');
  });


  it('Test Case 3: User login returns a JWT token for valid credentials.', async () => {
    // First, register a user
    await request(app)
      .post('/register')
      .send({
        email: 'login@example.com',
        password: 'password123'
      });

    // Then, attempt to login
    const response = await request(app)
      .post('/login')
      .send({
        email: 'login@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token'); //login returns a token
  });

  it('Test Case 4: should not login with incorrect credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('Test Case 4: should not login with empty email', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        password: 'wrongpassword'
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('Test Case 4: should not login with empty password', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'nonexistent@example.com',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

  //TODO: Test Case 1: The user is logged out successfully.

  //TODO: Test Case 2: The JWT token is invalidated after logout.
});
