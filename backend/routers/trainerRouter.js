const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController')
const trainerAuth = require('../middlewares/trainerAuth')

router.get('/courses/:companyId' , trainerController.getCourses)
router.post('/courses/:courseId' ,trainerAuth.trainerAuth, trainerController.addUnit)
router.get('/courses/:courseId/content' , trainerAuth.trainerAuth, trainerController.getUnits)
router.delete('/courses/:courseId/units/:unitId', trainerAuth.trainerAuth, trainerController.removeUnits)
router.post('/courses/:courseId/units/:unitId/lessons/pdf' ,trainerAuth.trainerAuth, trainerController.addPdf)
router.post('/courses/:courseId/units/:unitId/lessons/video' ,trainerAuth.trainerAuth, trainerController.addVideo)
router.post('/courses/:courseId/units/:unitId/lessons/quiz' ,trainerAuth.trainerAuth, trainerController.addQuiz)
router.delete('/courses/:courseId/lessons/:lessonId' , trainerAuth.trainerAuth, trainerController.removeLessons)
router.put('/courses/:courseId/reorder', trainerAuth.trainerAuth, trainerController.updateContent)

module.exports = router