//endpoits to make changes to ur db
const express = require('express');
const router = express.Router();

const authenticateToken = require('../routes/authenticationToken');
const taskController = require('../controllers/tasksControllers');
const userController = require('../controllers/usersControllers');

router.post('/register',userController.registerUser);
router.post('/login', userController.loginUser);
//router.post('/logout',authenticateToken,userController.logoutUser);

router.post('/tasks',authenticateToken, taskController.createTask);
router.get('/tasks',authenticateToken, taskController.retriveTasks);
router.get('/tasks/:taskid',authenticateToken, taskController.retriveTask);
router.put('/tasks/:taskid',authenticateToken,taskController.editTask);
router.delete('/tasks/:taskid',authenticateToken,taskController.deleteTask);
router.patch('/tasks/:taskid/complete',authenticateToken,taskController.markTaskComplete);

//TODO: 

module.exports = router;