const router = require('express').Router()
//const router = express.Router;
const courseController = require('../controllers/course-controller')

router.get('/getAllCourse', courseController.getAllCourse)
router.get('/getCourse/:name', courseController.getCourse)

module.exports = router;