const request = require('supertest');
const app = require('../index'); 
const mongoose = require('mongoose');
const User = require('../models/users'); 
const Task = require('../models/tasks'); 

describe('Test tasks API',()=>{
    let token;
    let userId;

    beforeAll(async () => {
        // Connect to the test database
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
    
        // Register and log in a user to get a token
        const userResponse = await request(app)
          .post('/register')
          .send({
            email: 'testuser@example.com',
            password: 'password123'
          });
    
        const loginResponse = await request(app)
          .post('/login')
          .send({
            email: 'testuser@example.com',
            password: 'password123'
          });
    
        token = loginResponse.body.token;
        userId = loginResponse.body.userId;
      });
    
      afterAll(async () => {
        // Clean up and close the connection after tests
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
      });
      
      //Task Creation
      it('Test Case 1: Task creation succeeds when all required fields', async()=>{
        const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Test Task',
            dueDate: '2024-12-31', // Future date
            time: '12:00',
            userId: userId
        });
        
        expect(response.status).toBe(201); //created
        expect(response.body).toHaveProperty('message', 'Task created successfully');
        expect(response.body).toHaveProperty('task');
      });

      it('Test Case 2: Task creation fails when the title is missing', async()=>{
        const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
            dueDate: '2024-12-31', // Past date
            time: '13:00',
            userId: userId
        });
        
        expect(response.status).toBe(400); //Not created
        expect(response.body).toHaveProperty('message', 'Title is required');
      });

      it('Test Case 3: Task creation fails when the due date is in the past', async()=>{
        const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Test Task',
            dueDate: '2024-05-31', // Past date
            time: '12:00',
            userId: userId
        });
        
        expect(response.status).toBe(400); //Not created
        expect(response.body).toHaveProperty('message', 'Due date cannot be in the past');
      });
    
})