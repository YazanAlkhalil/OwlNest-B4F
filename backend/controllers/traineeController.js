const Company = require('../models/companyModel')
const Trainees = require('../models/traineeModel')
const Course = require('../models/coursesModel')
const crypto = require('crypto')
const mongoose = require('mongoose');


const getCompanyCources = async (req, res) => {
    const companyId = new mongoose.Types.ObjectId(req.params.companyId);
    const loggedInUserId = req.user._id;
  
    try {
      const courses = await Course.find({ companyId: companyId }).select("courseName image");
      console.log(`Courses found: ${courses.length}`);
      if (!courses.length) {
        return res.status(404).json({ message: "No courses found" });
      }
  
      const result = await Promise.all(courses.map(async (course) => {
        const completionProgressDoc = await Trainees.find({ courseId: course._id, userId: loggedInUserId }).select("completionProgress");
        const completionProgress = completionProgressDoc ? completionProgressDoc.completionProgress : 0;
        return {
            id: course._id,
          courseName: course.courseName,
          image: course.image,
          completionProgress,
        };
      }));
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
}

const getcourseinfo = async (req,res) => {
    try{
        const courseId = req.params.courseId
        let courseObjectId = new mongoose.Types.ObjectId(courseId)
        let course = await Course.findById(courseObjectId).select("courseName content")
        res.status(200).send(course)
    } catch (error){
        res.status(500).json({msg : error.message})
    }
}
const getlesson = async (req,res) => {
    try{
        const courseId = req.params.courseId;
        const lessonId = req.params.lessonId;
        let courseObjectId = new mongoose.Types.ObjectId(courseId)
        let lessonObjectId = new mongoose.Types.ObjectId(lessonId)

        let course = await Course.findOne({
            _id: courseObjectId,
            content: { $elemMatch: { lessonid: lessonObjectId } }
        }).select("courseName content");

        if (!course) {
        return res.status(404).json({ message: "Course or lesson not found" });
        }

        const lesson = course.content.find((contentItem) => contentItem.lessonid.equals(lessonObjectId));
        if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
        }

        const { name ,grade, questions } = lesson;
        
        return res.status(200).json({ courseName: course.courseName,name, grade, questions });
    } catch (error){
        res.status(500).json({msg : error.message})
    }
}

const getQuizSolution = async (req,res) => {
    let {answers} = getlesson(req,res)
    const {traineeAnswer}= req.body
     answers = questions.flatMap((question) => question.answers);

    // let grade = traineeAnswer.map(a=>{
    //   if(a.id == ) 
    // })
}
module.exports = {
getCompanyCources,
getcourseinfo,
getlesson,
getQuizSolution
}