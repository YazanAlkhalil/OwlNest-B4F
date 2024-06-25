const jwt = require('jsonwebtoken')
const Users = require('../models/usersModel')

const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({message: "Unauthorized - No Token Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid JWT Token"})
        }

        const user = await Users.findById(decoded.userId).select("-password")
        
        if(!user){
            return res.status(404).json({message: "User Not Found"})
        }

        req.user = user;
        
        next();
    }
    catch(err){
        res.status(500).json({message: "Error in server"});
    }
}

module.exports = { protectRoute }