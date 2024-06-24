const mongoose = require('mongoose')

const traineeSchema = mongoose.Schema({
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    grade : {
        type : mongoose.Schema.Types.Double,
        required : true
    },
    completionProgress : {
        type : Object
    },
    completionDate : {
        type : Date
    }
})

const Trainee = mongoose.model('Trainee',traineeSchema);

module.exports = Trainee;