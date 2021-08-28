const router = require('express').Router()
const authController = require('../controllers/auth-controller')
const jwt = require('jsonwebtoken')
const getter = require('../service/getters')

router.post('/professorLogin', authController.professorLogin)
router.post('/studentLogin', authController.studentLogin)
router.get('/verifyToken', getter.verifyToken)
router.post('/adminLogin', authController.adminLogin)

router.post('/updatePassword', authController.updatePassword)

module.exports = router