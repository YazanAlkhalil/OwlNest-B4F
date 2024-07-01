const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    companyId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    courseName : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String
    },
    trainers : {
        type : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Users"
        }]
    },
    admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    content : [{
        type : Object
    }],
    lessonsCount : {
        type: Number,
    }
})

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;
