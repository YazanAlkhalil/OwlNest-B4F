const express = require('express');
const router = express.Router()
const adminController = require('../controllers/courseConroller')

router.get('/:companyId' , adminController.getCourses)
router.post('/:companyId' , adminController.createCourse)
router.delete('/:courseId' , adminController.removeCourse)

router.get('/:courseId/users' , adminController.getUsersByCourseId)
router.post('/:courseId/users/:userId' , adminController.addUserToCourse)
router.put('/:courseId/users/:userId' , adminController.updateRoleInCourse)
router.delete('/:courseId/users/:userId' , adminController.removeUserFromCourse)


module.exports = router