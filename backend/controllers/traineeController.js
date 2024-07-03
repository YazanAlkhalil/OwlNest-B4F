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
        }).select("courseName content type");

        if (!course) {
        return res.status(404).json({ message: "Course or lesson not found" });
        }

        const lesson = course.content.find((contentItem) => contentItem.lessonid.equals(lessonObjectId));
        if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
        }

        if(course.type == "quiz"){
        const { name ,grade, questions } = lesson;
        return res.status(200).json({ courseName: course.courseName, name, grade, questions });
        }

        if(course.type == "video"){
          const { name, content, description } = lesson;
          return res.status(200).json({ courseName: course.courseName, name, content, description });
        }

        if(course.type == "pdf"){
          const { name, content } = lesson;
          return res.status(200).json({ courseName: course.courseName, name, content });
        }
        
    } catch (error){
        res.status(500).json({msg : error.message})
    }
}

const getQuizSolution = async (req,res) => {
    try{
      let {questions} = getlesson(req,res);
      const {traineeAnswer}= req.body
      const loggedInUserId = req.user._id;
  
      let grade = []
      let result = []
  
      for(let i = 0; i<traineeAnswer.length; i++){
        let answers = questions[i].answers
        answers = answers.map(a=> a.isCorrect)
        let TAnaswer = traineeAnswer[i].map(a=> a.isCorrect)

        if(JSON.stringify(TAnaswer)==JSON.stringify(answers)){
          grade.push(questions[i].grade);
        }
        result.push({
          id:traineeAnswer[i],
          grade:grade[i]
        })
      }
  
      let totalgrade = 0
      totalgrade = grade.map(g => {
      totalgrade = totalgrade + g.grade
      })
      let updateGrade = await Trainees.findOne({userId:loggedInUserId,courseId:req.params.courseId})
      updateGrade.grade.push({
        _id: req.params.lessonId,
        grade: totalgrade
      })
      await updateGrade.save()

      let updateXP = await Trainees.findOne({userId:loggedInUserId,courseId:req.params.courseId})
      updateXP.XP += (10*totalgrade)
      await updateXP.save()

      
      let updateCompletionProgress = await Trainees.findOne({userId:loggedInUserId,courseId:req.params.courseId})
      updateCompletionProgress.completionProgress.push(req.params.lessonId)
      await updateCompletionProgress.save()


      res.status(200).send({result,totalgrade})
    } catch (error){
      res.status(500).send({Msg: error.message})
    } 
}

const lessonDone = async (req,res) => {

  try{
    const loggedInUserId = req.user._id
    const courseId  = req.params.courseId
    const lessonId = req.params.lessonId

    let updateCompletionProgress = await Trainees.findOne({userId:loggedInUserId,courseId:courseId})
      updateCompletionProgress.completionProgress.push(lessonId)
      await updateCompletionProgress.save()

      let updateXP = await Trainees.findOne({userId:loggedInUserId,courseId:courseId})
      updateXP.XP += 10
      await updateXP.save()

      res.status(200).send("done")
    }catch (error){
      res.status(500).send({Msg: error.message})
    }
}

const progress = async (req,res) => {
  try{
    
    const loggedInUserId = req.user._id
    const courseId  = req.params.courseId

    let updateCompletionProgress = await Trainees.findOne({userId:loggedInUserId,courseId:courseId})
    let completionProgress = updateCompletionProgress.completionProgress.length()
    let lessonsCount = await Course.findOne({courseId})
    lessonsCount = lessonsCount.lessonsCount
    completionProgress = completionProgress/lessonsCount

    let updateXP = await Trainees.findOne({userId:loggedInUserId,courseId:courseId})
    const XP = updateXP.XP

    let finalGrade = 0
    let gradeArray = await Trainees.findOne({userId:loggedInUserId,courseId:courseId})
    let grade = gradeArray.grade.map(grade => finalGrade += grade.grade ) 
    grade = (grade/gradeArray.grade.length())
    
    //just add the % in the front 
    res.status(200).send({completionProgress,XP,grade})
  }catch (error){
    res.status(500).send({Msg: error.message})
  }
}


module.exports = {
getCompanyCources,
getcourseinfo,
getlesson,
getQuizSolution,
lessonDone,
progress
}