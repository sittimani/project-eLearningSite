const router = require('express').Router()
const registerController = require('../controllers/register-controller')

router.post('/studentRegister', registerController.studentRegister)
router.post('/professorRegister', registerController.professorRegister)


module.exports = router;