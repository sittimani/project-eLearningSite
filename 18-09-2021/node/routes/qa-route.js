const router = require('express').Router()
const qaController = require('../controllers/qa-controller')
const getter = require('../middleware/verifyToken')

router.post('/upload-question', getter.verifyToken, qaController.uploadQuestion)
router.get('/my-questions/:id', getter.verifyToken, qaController.getMyQuestions)
router.get('/all-questions', getter.verifyToken, qaController.getAllQuestions)
router.get('/answered-question/:id', getter.verifyToken, qaController.getDataForEdit)

router.put('/answer', getter.verifyToken, qaController.submitQuestion)

module.exports = router