const router = require('express').Router()
//const router = express.Router;
const courseController = require('../controllers/course-controller')
const uploads = require('../middleware/uploads').upload

router.get('/getAllCourse', courseController.getAllCourse)
router.get('/getCourse/:name', courseController.getAllTopics)

router.post('/getTopic',courseController.getParticularTopic)
router.post('/updateTopic', courseController.updateTopic)
router.post('/picture', uploads.single('avator'), courseController.picUpload)
router.post('/uploadCourse', courseController.uploadCourse)


router.delete('/deleteTopic', courseController.deleteTopic)
router.delete('/deleteCourse', courseController.deleteCourse)

module.exports = router;