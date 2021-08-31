const router = require('express').Router()
const authController = require('../controllers/auth-controller')
const jwt = require('jsonwebtoken')
const getter = require('../service/getters')

router.post('/login', authController.Login)
router.get('/verifyToken', getter.verifyToken)
router.post('/updatePassword', authController.updatePassword)

module.exports = router