const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User Schema
const userSchema = new Schema({
    email: { 
        type: String, 
        validate: {
            validator: value => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: "Please enter a valid email address"
        },
        required: [true, "Email is required"],  
        unique: true
    },
    password: { 
        type: String, 
        required: [true, "Password is required"],
        validator: value=>{
            if(value.length < 6)
            return false
            else if (value.length >10){
                return false
            }
            return true
        },
        message: ({value}) => {
            if(value.length < 6)
            return `Password length must be min 6 , got only ${value.length} char`;
            else if (value.length >10){
                return `Password length must be max 10, got ${value.length} char`;
            }
        }
    },
    tasks: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Task' 
    }]
}); 


const User = mongoose.model('User', userSchema);
module.exports = User;
