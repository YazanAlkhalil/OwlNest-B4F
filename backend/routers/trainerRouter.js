const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController')
const trainerAuth = require('../middlewares/trainerAuth')
const {upload} = require('../middlewares/fileUpload');

router.get('/courses/:companyId' , trainerController.getCourses)
router.post('/courses/:courseId/units' ,trainerAuth.trainerAuth, trainerController.addUnit)
router.get('/courses/:courseId/content' , trainerAuth.trainerAuth, trainerController.getUnits)
router.delete('/courses/:courseId/units/:unitId', trainerAuth.trainerAuth, trainerController.removeUnits)
router.post('/courses/:courseId/units/:unitId/lessons/pdf' ,trainerAuth.trainerAuth,upload.single('pdf'), trainerController.addPdf)
router.post('/courses/:courseId/units/:unitId/lessons/video' ,trainerAuth.trainerAuth,upload.single('video'), trainerController.addVideo)
router.post('/courses/:courseId/units/:unitId/lessons/quiz' ,trainerAuth.trainerAuth, trainerController.addQuiz)
router.delete('/courses/:courseId/lessons/:lessonId' , trainerAuth.trainerAuth, trainerController.removeLessons)
router.put('/courses/:courseId/reorder', trainerAuth.trainerAuth, trainerController.updateContent)

module.exports = router