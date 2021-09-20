const router = require('express').Router()
const courseController = require('../controllers/course-controller')
const uploads = require('../middleware/uploads').upload
const getter = require('../middleware/verifyToken')

router.get('/course', getter.verifyToken, courseController.getAvailableCourse)
router.get('/course-topic/:name', getter.verifyToken, courseController.getAllTopics)

router.post('/topics', getter.verifyToken, courseController.getParticularTopic)
router.put('/update-topic', getter.verifyToken, courseController.updateParticularTopic)
router.post('/picture', [uploads.single('avator'), getter.verifyToken], courseController.picUpload)
router.post('/upload-course', getter.verifyToken, courseController.uploadCourse)

router.delete('/delete-topic', getter.verifyToken, courseController.deleteParticularTopic)
router.delete('/delete-course', getter.verifyToken, courseController.deleteEntireCourse)

module.exports = router;