const router = require('express').Router()
//const router = express.Router;
const courseController = require('../controllers/course-controller')
const uploads = require('../middleware/uploads').upload

router.get('/getAllCourse', courseController.getAllCourse)
router.get('/getCourse/:name', courseController.getCourse)
router.post('/topic', courseController.topic)
router.post('/picture', uploads.single('avator'), courseController.picUpload)
router.post('/uploadCourse', courseController.uploadCourse)

module.exports = router;