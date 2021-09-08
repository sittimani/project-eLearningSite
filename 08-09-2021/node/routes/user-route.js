const router = require('express').Router()
const userController = require('../controllers/user-controller')
const getter = require('../service/getters')

router.get('/getData/:id', getter.verifyToken, userController.getUserData)
router.put('/update/:id', getter.verifyToken, userController.updateUser)
router.get('/getPendingProfessor', getter.verifyToken, userController.getPendingProfessor)
router.post('/userPermission', getter.verifyToken, userController.userPermission)

module.exports = router