const express = require('express')
const router = express.Router()
const auth = require('../controllers/authController')
const protectRoute = require('../middlewares/protectRoute');

router.post("/register/user",auth.signUpUser)
router.post('/login', auth.loginUser)
router.post('/logout', auth.logOutUser)
router.post('/verification',auth.verifyEmail)
router.post('/resend', auth.resendOtp)
router.post('/register/company',protectRoute.protectRoute, auth.createCompany)

module.exports = router