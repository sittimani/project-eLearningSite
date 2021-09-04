const router = require('express').Router()
const qaController = require('../controllers/qa-controller')

router.post('/uploadQuestion', qaController.uploadQuestion)
router.get('/getMyQuestions/:id', qaController.getMyQuestions)
router.get('/getAllQuestions', qaController.getAllQuestions)
router.get('/getDataForEdit/:id', qaController.getDataForEdit)

router.put('/submitAnswer', qaController.submitQuestion)

module.exports = router