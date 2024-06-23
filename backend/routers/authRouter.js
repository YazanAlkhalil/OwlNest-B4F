const express = require('express')
const router = express.Router()
const auth = require('../controllers/authController')

router.post("/signup",auth.signUpUser)
router.post('/login', auth.loginUser)
router.post('/logout', auth.logOutUser)

module.exports = router