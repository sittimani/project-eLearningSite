const router = require('express').Router()
const userController = require('../controllers/user-controller')

router.get('/getData/:id', userController.getUserData)
router.put('/update/:id', userController.updateUser)
router.get('/getPendingProfessor', userController.getPendingProfessor)
router.post('/userPermission', userController.userPermission)

module.exports = router