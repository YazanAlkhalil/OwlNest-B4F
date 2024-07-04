const mongoose = require('mongoose')

const traineeSchema = mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    grade: [{
        _id: mongoose.Schema.Types.ObjectId,
        grade: Number,
        Date: {
            type: Date,
            default: Date.now
        }
    }],
    completionProgress: {
        type: [
            {
                type: String
            }
        ],
        default:[]
    },
    completionDate: {
        type: Date
    },
    XP: {
        type: Number
    }
})

const Trainee = mongoose.model('Trainee', traineeSchema);

module.exports = Trainee;