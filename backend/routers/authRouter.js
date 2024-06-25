const express = require('express')
const router = express.Router()
const auth = require('../controllers/authController')

router.post("/register/user",auth.signUpUser)
router.post('/login', auth.loginUser)
router.post('/logout', auth.logOutUser)
router.post('/verification',auth.verifyEmail)
router.post('/reset', auth.resendOtp)
router.post('/register/company', auth.createCompany)

module.exports = router