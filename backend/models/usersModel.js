const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true
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
    birthday : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true,
        enum : ['male', 'female']
    },
    city : {
        type : String,
        required : true
    },
    isOwner : {
        type : Boolean
    },
    isAdmin : {
        type : Boolean
    },
    isTrainer : {
        type : Boolean
    },
    isTrainee : {
        type : Boolean
    }
},{
    timestamps : true
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;