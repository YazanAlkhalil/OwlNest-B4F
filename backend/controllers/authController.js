const User = require('../models/usersModel')
const bcryptjs = require('bcryptjs')
const generateTokenAndSetCookie = require('../utils/generateToken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const signUpUser = async (req , res) => {
    try{
        const {username,email,password,confirmPassword,phoneNumber,birthDate,gender,country,city} = req.body;
        if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}
        const emailUser = await User.findOne({email})
        
        if(emailUser) {
            return res.status(400).json("User already exists")
        }
        const hashPassword = await bcryptjs.hash(password,10)
        
        const otp1 = Math.floor(Math.random()*10)
        const otp2 = Math.floor(Math.random()*10)
        const otp3 = Math.floor(Math.random()*10)
        const otp4 = Math.floor(Math.random()*10)
        
        const otp = `${otp1}${otp2}${otp3}${otp4}`
        const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000)

        const newUser = new User ({
            username,
            email,
            password : hashPassword,
            confirmPassword : hashPassword,
            phoneNumber,
            birthDate,
            gender,
            country,
            city,
            otp,
            verificationCodeExpires
        })

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP Code is ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email: ' + error.message);
            }else {
                console.log("Send Otp Successfully");
            }
        });


        if(newUser){
            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                username : newUser.username
            })
        }else { 
            res.status(400).json({message : "Invalid user data"})
        }
    }
    catch(err){
        res.status(500).json({msg: err.message});
    }
}

const loginUser = async (req , res) => {
    try{
        const {email , password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password || "")
        
        if(!isPasswordCorrect){
            return res.status(404).json({message : "Invalid email or password"})
        }

        const isVerified = user.isVerified

        if(!isVerified){
            return res.status(404).json({msg : "Please verify your email"})
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

const verifyEmail = async (req,res) => {
    try {
        const {email , otp} = req.body

        const user = await User.findOne({
            email,
            otp: otp,
            verificationCodeExpires: { $gt: Date.now()}
        });

        if(!user){
            return res.status(404).json({message: "'Invalid or expired OTP"})
        }

        user.isVerified = true
        generateTokenAndSetCookie(user._id, res)

        await user.save()

        res.status(200).json({
            _id : user._id,
            username : user.username
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const resendOtp = async (req,res) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({message : "User not found"})
        }

        const otp1 = Math.floor(Math.random()*10)
        const otp2 = Math.floor(Math.random()*10)
        const otp3 = Math.floor(Math.random()*10)
        const otp4 = Math.floor(Math.random()*10)
        
        user.otp = `${otp1}${otp2}${otp3}${otp4}`
        user.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000)

        await user.save()

        res.status(200).json({
            message : "reset successfully"
        })



    } catch (error) {
        res.status(500).json({message: error.message})
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
    logOutUser,
    verifyEmail,
    resendOtp
}