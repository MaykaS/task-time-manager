const request = require('supertest');
const app = require('../index'); 
const mongoose = require('mongoose');
const User = require('../models/users'); 
const Task = require('../models/tasks'); 

describe('Test tasks API',()=>{
    let token;
    let userId;
    let taskId;
    let taskId2;
    let completedTaskId;
    let invalidToken;

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

         // Create a task to use for editing tests
         const taskResponse = await request(app)
         .post('/tasks')
         .set('Authorization', `Bearer ${token}`)
         .send({
           title: "Initial Task",
           dueDate: "2024-12-31", // Future date
           time: "12:00"
         });
         taskId = taskResponse.body.task._id; // Save task ID for editing tests

         // Create a task for deleting later
         const taskResponse2 = await request(app)
         .post('/tasks')
         .set('Authorization', `Bearer ${token}`)
         .send({
           title: "Bla Task",
           dueDate: "2024-12-31", // Future date
           time: "12:00"
         });
         taskId2=taskResponse2.body.task._id;

         // Create a complete task to use for markAsComplete tests
         const completedTaskResponse = await request(app)
         .post('/tasks')
         .set('Authorization', `Bearer ${token}`)
         .send({
            title: "Completed Task",
            dueDate: "2024-12-31", // Future date
            time: "12:00",
            completed: true // Set as completed initially
         });
         completedTaskId = completedTaskResponse.body.task._id; // Save task ID for marking tests

         // Create an invalid token for testing
        invalidToken = token + 'invalid';

      });
    
      afterAll(async () => {
        // Clean up and close the connection after tests
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
      });
      
      //Task Creation 
      //FIXME: see if task created indeed with this userid 
      it('Test Case 1: Task creation succeeds when all required fields', async()=>{
        const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: "Test Task",
            dueDate: "2024-12-31", // Future date
            time: "12:00"
        });
        
        expect(response.status).toBe(201); // Created
        expect(response.body).toHaveProperty('message', 'Task created successfully');
        expect(response.body).toHaveProperty('task');
      });

      it('Test Case 2: Task creation fails when the title is missing', async()=>{
        const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
            dueDate: '2024-12-31', // Future date
            time: '13:00',
            userId: userId
        });
        
        expect(response.status).toBe(400); // Not created
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
        
        expect(response.status).toBe(400); // Not created
        expect(response.body).toHaveProperty('message', 'Due date cannot be in the past');
      });

      // Getting Tasks
      //FIXME: test that it cannot acees task with diferent userid
      it('Test Case 1: All tasks associated with a user are returned when the user is authenticated', async () => {
        const initialTaskCount = await Task.countDocuments({ userId }); //Existing tasks
        //One more
        await request(app)
          .post('/tasks')
          .set('Authorization', `Bearer ${token}`)
          .send({
            title: 'New Task',
            dueDate: '2024-12-31', // Future date
            time: '12:00'
          });

        const response = await request(app)
          .get('/tasks')
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200); // OK
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(initialTaskCount + 1); // One more than before
      });
    
      it('Test Case 2: An empty array is returned if the user has no tasks', async () => {
        // Delete existing task
        await request(app)
          .delete(`/tasks/${taskId2}`)
          .set('Authorization', `Bearer ${token}`);
    
        const response = await request(app)
          .get('/tasks')
          .set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(200); // OK
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBe(0); // No tasks
      });
    
      it('Test Case 3: A 401 error is returned if the request is made without an authentication token', async () => {
        const response = await request(app)
          .get('/tasks');
    
        expect(response.status).toBe(401); // Unauthorized
        expect(response.body).toHaveProperty('message', 'Authentication required');
      });
    
      it('Test Case 4: A 403 error is returned if the JWT token is invalid or expired', async () => {
        const response = await request(app)
          .get('/tasks')
          .set('Authorization', `Bearer ${invalidToken}`);
    
        expect(response.status).toBe(403); // Forbidden
        expect(response.body).toHaveProperty('message', 'Invalid or expired token');
      });

      // Getting Task
      it('Test Case 1: The correct task is returned when a valid taskId is provided',async()=>{
        const response = await request(app)
          .get(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200); // OK
        expect(response.body).toHaveProperty('task');
        expect(response.body.task._id).toBe(taskId); // Check ID
        expect(response.body.task.title).toBe('Test Task');
        expect(response.body.task.dueDate).toBe('2024-12-31');
        expect(response.body.task.time).toBe('12:00');
      });

      it('Test Case 2: A 404 error is returned when the taskId does not exis',async()=>{
        const invalidId = new mongoose.Types.ObjectId; // Get random invalid objectId
        const response = await request(app)
          .get(`/tasks/${invalidId}`)
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404); 
        expect(reposonse.body).toHaveProperty('message', 'Task not found');
      });

      //Task Editing
      //FIXME: test that it cannot acees task with diferent userid
      //FIXME: A 401 error is returned if the request is made without an authentication token
      //FIXME: A 403 error is returned if the JWT token is invalid or expired
      it('Test Case 1: Existing task details can be successfully modified', async () => {
        const newDetails = {
          title: 'Updated Title',
          category: 'Personal', // Ensure API supports category
          description: 'Updated Description',
          dueDate: '2024-12-31', // Future date
          priority: 'High' // Ensure API supports priority
        };

        const response = await request(app)
          .put(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(newDetails);

        expect(response.status).toBe(200); // OK
        expect(response.body).toHaveProperty('message', 'Task updated successfully');
        expect(response.body.task.title).toBe(newDetails.title);
        expect(response.body.task.category).toBe(newDetails.category);
        expect(response.body.task.description).toBe(newDetails.description);
        expect(new Date(response.body.task.dueDate)).toEqual(new Date(newDetails.dueDate));
        expect(response.body.task.priority).toBe(newDetails.priority);
      });

      it('Test Case 2: Editing fails if the new due date is in the past', async () => {
        const newDetails = {
          title: 'Updated Title',
          dueDate: '2022-01-01', // Past date
          priority: 'High'
        };

        const response = await request(app)
          .put(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(newDetails);

        expect(response.status).toBe(400); // Bad Request
        expect(response.body).toHaveProperty('message', 'Due date cannot be in the past');
      });
      
      // Task MarkAsComplete
      //FIXME: test that it cannot acees task with diferent userid
      //FIXME: A 401 error is returned if the request is made without an authentication token
      //FIXME: A 403 error is returned if the JWT token is invalid or expired
      it('Test Case 1: A task can be marked as completed', async()=>{
        const response = await request(app)
        .patch(`/tasks/${taskId}/complete`)
        .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200); // OK
        expect(response.body).toHaveProperty('message', 'Task marked as completed');

        //Verify its indid completed
        const updatedTask = await Task.findById(taskId);
        expect(updatedTask.completed).toBe(true);
      });

      it('Test Case 2: Marking an already completed task does not alter its state', async()=>{
        const response = await request(app)
        .patch(`/tasks/${completedTaskId}/complete`)
        .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200); // OK
        expect(response.body).toHaveProperty('message', 'Task is already completed');

        //Verify its still completed
        const updatedTask = await Task.findById(taskId);
        expect(updatedTask.completed).toBe(true);
      });

      //Task Deleting
      //FIXME: test that it cannot acees task with diferent userid
      //FIXME: A 401 error is returned if the request is made without an authentication token
      //FIXME: A 403 error is returned if the JWT token is invalid or expired
      it('Test Case 1: A task can be successfully deleted', async () => {
        const response = await request(app)
          .delete(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(200); // Deleted OK
        expect(response.body).toHaveProperty('message', 'Task deleted successfully');
      });
    
      it('Test Case 2: Deletion fails when attempting to delete a task that does not exist', async () => {
        const invalidId = new mongoose.Types.ObjectId(); // Get random invalid objectId
        const response = await request(app)
          .delete(`/tasks/${invalidId}`)
          .set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(404); // Not found
        expect(response.body).toHaveProperty('message', 'Task not found');
      });


})