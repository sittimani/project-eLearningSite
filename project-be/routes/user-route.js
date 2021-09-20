const router = require('express').Router()
const userController = require('../controllers/user-controller')
const getter = require('../middleware/verifyToken')

router.get('/my-details/:id', getter.verifyToken, userController.getUserData)
router.put('/update-profile/:id', getter.verifyToken, userController.updateUser)
router.get('/pending-professor', getter.verifyToken, userController.getPendingProfessor)
router.post('/update-permission', getter.verifyToken, userController.userPermission)

module.exports = router