const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength: 6
    },
    confirmPassword : {
        type : String,
        required : true,
        minlength: 6
    },
    phoneNumber : {
        type : String,
        required : true,
        minlength: 10
    },
    birthDate : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true,
        enum : ['male', 'female']
    },
    country : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    isVerified: { 
        type: Boolean,
        default: false 
    },
    otp: { 
        type: String 
    },
    verificationCodeExpires: {
        type : Date
    }
},{
    timestamps : true
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;