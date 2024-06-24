const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    courseId : {
        type : mongoose.Schema.Types.ObjectId
    },
    companyId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    courseName : {
        type : String,
        required : true
    },
    descreption : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    trainers : {
        type : String
    },
    admin : {
        type : String,
        ref: "User"
    },
    content : {
        type : Object
    }
})

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;