const request = require('supertest');
const app = require('../index'); 
const mongoose = require('mongoose');
const User = require('../models/users'); 
const Task = require('../models/tasks'); 

describe('Test tasks API',()=>{
    let token;
    let userId;
    let taskId;
    let completedTaskId;

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

         //Create a complete task to use for markAsComplete tests
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
            title: "Test Task",
            dueDate: "2024-12-31", // Future date
            time: "12:00"
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
            dueDate: '2024-12-31', // Future date
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

      //TODO: Getting Tasks

      //TODO: Getting Task

      //Task Editing
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
      
      //TODO: Task MarkAsComplete
      it('Test Case 1: A task can be marked as completed', async()=>{
        const response = await request(app)
        .patch(`/tasks/${taskId}/complete`)
        .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200); //OK
        expect(response.body).toHaveProperty('message', 'Task marked as completed');

        //Verify its indid completed
        const updatedTask = await Task.findById(taskId);
        expect(updatedTask.completed).toBe(true);
      });

      it('Test Case 2: Marking an already completed task does not alter its state', async()=>{
        const response = await request(app)
        .patch(`/tasks/${completedTaskId}/complete`)
        .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200); //OK
        expect(response.body).toHaveProperty('message', 'Task marked as completed');

        //Verify its still completed
        const updatedTask = await Task.findById(taskId);
        expect(updatedTask.completed).toBe(true);
      });

      //Task Deleting
      it('Test Case 1: A task can be successfully deleted', async () => {
        const response = await request(app)
          .delete(`/tasks/${taskId}`)
          .set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(200); // Deleted OK
        expect(response.body).toHaveProperty('message', 'Task deleted successfully');
      });
    
      it('Test Case 2: Deletion fails when attempting to delete a task that does not exist', async () => {
        const invalidId = new mongoose.Types.ObjectId(); // Get random valid objectId
        const response = await request(app)
          .delete(`/tasks/${invalidId}`)
          .set('Authorization', `Bearer ${token}`);
    
        expect(response.status).toBe(404); // Not found
        expect(response.body).toHaveProperty('message', 'Task not found');
      });


})