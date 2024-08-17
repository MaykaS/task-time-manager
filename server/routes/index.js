//endpoits to make changes to ur db
const express = require('express');
const router = express.Router();

const authenticateToken = require('../routes/authenticationToken');
const taskController = require('../controllers/tasksControllers');
const userController = require('../controllers/usersControllers');

router.post('/register',userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;