const router = require('express').Router()
const courseController = require('../controllers/course-controller')
const uploads = require('../middleware/uploads').upload
const getter = require('../service/getters')

router.get('/getAllCourse', getter.verifyToken, courseController.getAllCourse)
router.get('/getCourse/:name', getter.verifyToken, courseController.getAllTopics)

router.post('/getTopic', getter.verifyToken, courseController.getParticularTopic)
router.put('/updateTopic', getter.verifyToken, courseController.updateTopic)
router.post('/picture', [uploads.single('avator'), getter.verifyToken], courseController.picUpload)
router.post('/uploadCourse', getter.verifyToken, courseController.uploadCourse)


router.delete('/deleteTopic', getter.verifyToken,  courseController.deleteTopic)
router.delete('/deleteCourse', getter.verifyToken, courseController.deleteCourse)

module.exports = router;