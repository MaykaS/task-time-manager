const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users.js');

//User registration
exports.registerUser = async(req,res)=>{
    const{email,password} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({email,password: hashedPassword});
        await user.save();
        res.status(201).json({message:"User created successfully"});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
};

//User Login
 exports.loginUser = async (req,res)=>{
    const{email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({id: user._id, email: user.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2h'});
        res.status(200).json({token});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
};

// TODO: User Logout
//exports.logoutUser =