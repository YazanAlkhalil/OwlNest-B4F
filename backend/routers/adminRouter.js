const express = require('express');
const router = express.Router()
const adminController = require('../controllers/adminConroller')
const protectRoute = require('../middlewares/protectRoute')

router.get('/courses/:companyId' , protectRoute.protectRoute , adminController.getCourses)
router.post('/courses/:companyId' , protectRoute.protectRoute ,adminController.createCourse)
router.get('/courses/:courseId/users' , protectRoute.protectRoute , adminController.getUsersByCourseId)
router.post('/courses/:courseId/users/:userId' , protectRoute.protectRoute , adminController.addUserToCourse)


module.exports = router