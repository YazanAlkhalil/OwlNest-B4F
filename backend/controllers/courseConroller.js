const Course = require('../models/coursesModel')
const Contract = require('../models/contractModel');
const Users = require('../models/usersModel');

const getCourses = async (req, res) => {
    try {
        const { companyId } = req.params;
        const companyCourses = await Course.find({ companyId }).select("courseName image");
        if (companyCourses) {
            return res.status(200).json(companyCourses);
        }else {
            return res.status(404).json({
                msg: "No courses found for this company"
            });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const createCourse = async (req , res) => {
    try {
        const {courseName , descreption} = req.body
        const { companyId } = req.params

        const coursesName = await Course.findOne({courseName})

        if(coursesName){
            return res.status(400).json({msg : "Course already exist"});
        }

        const newCourse = new Course({
            companyId,
            courseName,
            descreption,
        });
        if(newCourse){
            newCourse.save();
            return res.status(201).json({msg : "Course created successfully"});
        }
    } catch (error) {
        return res.status(500).json({msg : error.message});
    }
}

const addUserToCourse = async (req, res) => {
    try {
        const { courseId, userId } = req.params;
        const { role } = req.body; 

        const course = await Course.findById(courseId);
        const user = await Users.findById(userId);
        if (!course) {
            return res.status(404).json({ msg: "Course not found"});
        }

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (role === 'trainer') {
            course.trainers.push(user._id);
        }else {
            const newContract = new Contract({
                companyId: course.companyId,
                userId: user._id,
                role: role,
                joinDate: new Date()
            });

            await newContract.save();
        }

        await course.save();

        return res.status(200).json({ msg: "User added to course successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};



const getUsersByCourseId = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId)
        
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }


        return res.status(200).json();
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    getCourses,
    createCourse,
    getUsersByCourseId,
    addUserToCourse
}