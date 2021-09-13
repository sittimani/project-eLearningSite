const router = require('express').Router()
const qaController = require('../controllers/qa-controller')
const getter = require('../service/verification')

router.post('/uploadQuestion', getter.verifyToken, qaController.uploadQuestion)
router.get('/getMyQuestions/:id', getter.verifyToken, qaController.getMyQuestions)
router.get('/getAllQuestions', getter.verifyToken, qaController.getAllQuestions)
router.get('/getDataForEdit/:id',getter.verifyToken, qaController.getDataForEdit)

router.put('/submitAnswer', getter.verifyToken, qaController.submitQuestion)

module.exports = router