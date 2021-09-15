const router = require('express').Router()
const authController = require('../controllers/auth-controller')
const getter = require('../service/verification')

router.post('/login', authController.userLogin)
router.post('/update-password', getter.verifyToken, authController.updatePassword)

router.get('/verifyUser/:id', authController.verifyUser)
router.post('/forgot-password', authController.forgotPassword)

module.exports = router