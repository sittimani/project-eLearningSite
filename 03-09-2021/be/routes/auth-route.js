const router = require('express').Router()
const authController = require('../controllers/auth-controller')
const jwt = require('jsonwebtoken')
const getter = require('../service/getters')

router.post('/login', authController.Login)
router.post('/updatePassword', authController.updatePassword)

router.get('/verifyToken', getter.verifyToken)
router.get('/verifyUser/:id', authController.verifyUser)

router.post('/forgotPassword', authController.forgotPassword)
module.exports = router