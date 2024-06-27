const Course = require('../models/coursesModel')
const Contract = require('../models/contractModel');
const Users = require('../models/usersModel');
const Company = require('../models/companyModel');
const Trainee = require('../models/traineeModel')

const getCourses = async (req, res) => {
    try {
        const { companyId } = req.params;
        const loggedInUserId = req.user._id
        let loggedInUserRole;

        const company = await Company.findById(companyId)

        if(company.ownerId.toString() === loggedInUserId.toString()) {
            loggedInUserRole === "owner"
        }else if(company.admins.find(adminId => adminId.toString() === loggedInUserId.toString())){
            loggedInUserRole === "admin"
        }else{
            return res.status(401).json({ msg: "Un-Authorized"})
        }

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
        const {courseName , description} = req.body
        const { companyId } = req.params

        const loggedInUserId = req.user._id
        let loggedInUserRole;

        const company = await Company.findById(companyId)

        if(!company) {
            return res.status(404).json({ msg: "No company found"})
        }

        if(company.ownerId.toString() === loggedInUserId.toString()) {
            loggedInUserRole === "owner"
        }else if(company.admins.find(adminId => adminId.toString() === loggedInUserId.toString())){
            loggedInUserRole === "admin"
        }else{
            return res.status(401).json({ msg: "Un-Authorized"})
        }

        const coursesName = await Course.findOne({companyId , courseName})

        if(coursesName){
            return res.status(400).json({msg : "Course already exist"});
        }

        const newCourse = new Course({
            companyId,
            courseName,
            description,
            admin : loggedInUserId
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
        const loggedInUserId = req.user._id;

        const course = await Course.findById(courseId).populate("companyId");
        const user = await Users.findById(userId);
        const company = course.companyId
        const trainee = await Trainee.findOne({userId , courseId : course._id})

        if (!course) {
            return res.status(404).json({ msg: "Course not found"});
        }

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if(company.ownerId.toString() !== loggedInUserId.toString() && !company.admins.find(admin => admin.toString() === loggedInUserId.toString())){
            return res.status(401).json({message: 'Unauthorized'})
        }
        if(trainee){
            return res.status(400).json({msg : "User Already Exists in course"})
        }


        if (role === 'trainer') {
            course.trainers.push(user._id);
            await course.save();
        }else {
            const newTrainee = new Trainee({
                courseId,
                userId
            });
            if(newTrainee){
                await newTrainee.save();
            }
        }

        res.status(200).json({ msg: "User added to course successfully" });

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};



const getUsersByCourseId = async (req, res) => {
    try {
        const { courseId } = req.params;
        const loggedInUserId = req.user._id;

        const course = await Course.findById(courseId).populate("companyId").populate('trainers', 'username');
        const company = await Company.findById(course.companyId).populate('admins', 'username');

        let trainees = await Trainee.find({courseId}).populate('userId','username')
        const contracts = await Contract.find({companyId:company._id}).populate('userId','username')
        
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }
        
        if(company.ownerId.toString() !== loggedInUserId.toString() && !company.admins.find(admin => admin._id.toString() === loggedInUserId.toString())){
            return res.status(401).json({message: 'Unauthorized'})
        }
        const trainers = course.trainers.map(trainer => ({
            name: trainer.username,
            role: 'trainer',
            isParticipant : true
        }))
        trainees = trainees.map(trainee => ({
            name : trainee.userId.username,
            role : 'trainee',
            isParticipant:true,
            completionDate: trainee.completionDate
        }))

        const participants = [...trainers,...trainees]

        const adminUsernames = company.admins.map(admin => ({
            name : admin.username,
            role : "admin",
            isParticipant : false
        }));
        const users = contracts.map(contract => ({
            name: contract.userId.username,
            role: contract.role,
            isParticipant : false
        }));
        adminUsernames.forEach(admin => {
            if(!participants.find(participant => participant.name === admin.name)){
                participants.push(admin)
            }
        })
        users.forEach(user => {
            if(!participants.find(participant => participant.name === user.name)){
                participants.push(user)
            }
        })
        return res.status(200).json(participants);
        
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