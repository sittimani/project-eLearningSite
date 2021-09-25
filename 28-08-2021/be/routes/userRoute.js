const router = require('express').Router()
const userController = require('../controllers/user-controller')

router.post('/update', (request, response) => {
})

router.get('/getStudentData/:id', userController.getStudentUser)
router.get('/getProfessorData/:id', userController.getProfessorUser)

router.put('/updateStudent/:id', userController.updateStudentUser)
router.put('/updateProfessor/:id', userController.updateProfessorUser)

router.get('/getPendingProfessor', userController.getPendingProfessor)
router.post('/userPermission', userController.userPermission)

module.exports = router