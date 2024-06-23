const User = require('../models/usersModel')
const bcryptjs = require('bcryptjs')
const generateTokenAndSetCookie = require('../utils/generateToken')


const signUpUser = async (req , res) => {
    try{
        const {username,email,password,confirmPassword,phoneNumber,birthday,gender,city} = req.body;
        if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}
        const user = await User.findOne({username})
        const emailUser = await User.findOne({email})
        
        if(user || emailUser) {
            return res.status(400).json("User already exists")
        }
        
        const hashPassword = await bcryptjs.hash(password,10)
        
        const newUser = new User ({
            username,
            email,
            password : hashPassword,
            confirmPassword : hashPassword,
            phoneNumber,
            birthday,
            gender,
            city
        })
        
        if(newUser){
            generateTokenAndSetCookie(newUser._id , res)
            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                username : newUser.username,
                password : newUser.password,
            })
        }else { 
            res.status(400).json({message : "Invalid user data"})
        }
    }
    catch(err){
        res.status(500).json({message: "Error in server"});
    }
}

const loginUser = async (req , res) => {
    try{
        const {username , password} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcryptjs.compare(password, user.password || "")
        
        if(!user || !isPasswordCorrect){
            return res.status(404).json({message : "Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id , res);

        res.status(200).json({
            _id : user._id,
            username : user.username,
        })
    }
    catch(err){
        res.status(500).json({message: "Error in server"});
    }
}
const logOutUser = async (req , res) => {
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message : "User logged out"})
    }
    catch(err){
        res.status(500).json({message: "Error in server"});
    }
}



module.exports = { 
    signUpUser,
    loginUser,
    logOutUser
}