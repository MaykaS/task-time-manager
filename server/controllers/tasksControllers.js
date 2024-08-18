const jwt = require('jsonwebtoken');
const Task = require('../models/tasks');

//Task Creation
exports.createTask = async (req, res) => {
    try {
        const { title, category, description, dueDate, time, priority, completed } = req.body;

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
            completed : completed?completed:false,
            userId
        });

        await task.save();
        res.status(201).json({
            message: 'Task created successfully',
            task
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//TODO: exports.retriveTasks

//TODO: exports.retriveTask

//Task Edition
exports.editTask = async(req,res)=>{
    try {
        const id  = req.params.taskid;
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

        // Validate the new due date
        if (new Date(dueDate) < new Date()) {
            return res.status(400).json({ message: 'Due date cannot be in the past' });
        }

        //find task and update
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {title, category, description, dueDate, priority },
            {new: true, runValidators: true} //return updated
        );

        if(!updatedTask) return res.status(404).json({message: "Task not found"});
        res.status(200).json({message: "Task updated successfully", task: updatedTask});

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

//Task  Deletion
exports.deleteTask = async(req,res)=>{
    try{
        const id  = req.params.taskid;
        const deletedTask = await Task.findByIdAndDelete(id);
        if(!deletedTask) return res.status(404).json({message: "Task not found"});
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

//Task Completion
exports.markTaskComplete = async(req,res)=>{
    try{
        const id = req.params.taskid;
        const task = await Task.findById(id);

        if(!task) return res.status(404).json({message: "Task not found"});
        if (task.completed) return res.status(200).json({ message: 'Task is already completed' });

        task.completed=true;
        await task.save();
        return res.status(200).json({ message: 'Task marked as completed',task});
    }
    catch(error){
        res.status(500).json({ message: "Server error", error: error.message });
    }
}



