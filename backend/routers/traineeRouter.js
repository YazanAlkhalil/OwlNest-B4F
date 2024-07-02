const express = require('express');
const router = express.Router();
const traineeController = require('../controllers/traineeController')

router.get('/:companyId/courses', traineeController.getCompanyCources)
router.get('/courses/:courseId', traineeController.getcourseinfo)
router.get('/courses/:courseId/lessons/:lessonId', traineeController.getlesson)
router.post('/courses/:courseId/lessons/:lessonId/quizSolution', traineeController.getQuizSolution)
router.post('/courses/:courseId/lessons/:lessonId/done', traineeController.lessonDone)
router.get('/courses/:courseId/progress', traineeController.progress)
module.exports = router