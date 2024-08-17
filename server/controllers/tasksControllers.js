const jwt = require('jsonwebtoken');
const Task = require('../models/tasks');

exports.createTask = async (req, res) => {
    try {
        const { title, category, description, dueDate, time, priority } = req.body;

        // Extract user ID from the token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decoded.userId;

        // Validate title
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        if (title.length < 4 || title.length > 15) {
            return res.status(400).json({ message: 'Title length must be between 4 and 15 characters' });
        }

        // Validate dueDate
        if (!dueDate) {
            return res.status(400).json({ message: 'Due date is required' });
        }
        const dueDateParsed = new Date(dueDate);
        if (isNaN(dueDateParsed.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }
        if (dueDateParsed < new Date()) {
            return res.status(400).json({ message: 'Due date cannot be in the past' });
        }

        // Validate time
        if (!time) {
            return res.status(400).json({ message: 'Time is required' });
        }

        // Create a new task with the user ID
        const task = new Task({
            title,
            category,
            description,
            dueDate,
            time,
            priority,
            userId
        });

        await task.save();
        res.status(201).json({
            message: 'Task created successfully',
            task
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating task',
            error: error.message
        });
    }
};
