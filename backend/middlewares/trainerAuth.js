const Course = require("../models/coursesModel");

const trainerAuth = async (req , res , next) => {
    try {
        const loggedInUserId = req.user._id;
        const { courseId } = req.params
        

        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({msg : 'Course not found'})
        }

        if(course.trainers.includes(loggedInUserId)){
            req.course = course
            next()
        }else {
            return res.status(401).json({ msg : "Unauthorized" })
        }
    } catch (error) {
        res.status(500).json({ msg : error.message})
    }
}

module.exports = {
    trainerAuth
}