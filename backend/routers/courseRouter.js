const express = require('express');
const router = express.Router()
const adminController = require('../controllers/courseConroller')

router.get('/courses/:companyId' , adminController.getCourses)
router.post('/courses/:companyId' , adminController.createCourse)
router.delete('/courses/:courseId' , adminController.removeCourse)

router.get('/courses/:courseId/users' , adminController.getUsersByCourseId)
router.post('/courses/:courseId/users/:userId' , adminController.addUserToCourse)
router.put('/courses/:courseId/users/:userId' , adminController.updateRoleInCourse)
router.delete('/courses/:courseId/users/:userId' , adminController.removeUserFromCourse)


module.exports = router