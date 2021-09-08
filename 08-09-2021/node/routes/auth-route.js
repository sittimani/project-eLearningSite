const router = require('express').Router()
const authController = require('../controllers/auth-controller')
const jwt = require('jsonwebtoken')
const getter = require('../service/getters')

router.post('/login', authController.Login)
router.post('/updatePassword', getter.verifyToken, authController.updatePassword)

router.get('/verifyUser/:id', authController.verifyUser)
router.post('/forgotPassword', authController.forgotPassword)

module.exports = router