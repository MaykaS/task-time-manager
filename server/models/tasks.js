const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Task Schema
const taskSchema = new Schema({
    title: { 
        type: String,
        required:[true,"Title is required"],
        validate:{
            validator: value=>{
                if(value.length < 4)
                return false
                else if (value.length >15){
                    return false
                }
                return true
            },
            message: ({value}) => {
                if(value.length < 4)
                return `Title length must be atleast 4 , got only ${value.length} char`;
                else if (value.length >15){
                    return `Title length must be max 15, got ${value.length} char`;
                }
            },
        } 
    },
    category: { 
        type: String 
    },
    description: { 
        type: String 
    },
    dueDate: { 
        type: String,
        validate:{
            validator: value=> value == "dd-mm-yyyy"?false:true,
            message: () => "Date is required",
        },
        required: true
    },
    time: {
        type: String,
        validate:{
            validator: value=> value == ":"?false:true,
            message: () => "Time is required",
        },
        required:true
    },
    priority: { 
        type: String, 
        enum: ['Low', 'Medium', 'High'], 
        default: 'Low' 
    },
    completed: { 
        type: Boolean,
        default: false, 
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;