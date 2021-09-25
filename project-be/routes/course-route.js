import { Router } from 'express'
import CourseController from '../controllers/course-controller.js'
import { upload as uploads } from '../middleware/uploads.js'
import Token from '../middleware/verifyToken.js'
import { use } from "../service/response.js"

const router = Router()
const courseController = new CourseController()
const tokenService = new Token()

router.get('/course',
    [tokenService.verifyToken], use(courseController.getAvailableCourse))
router.get('/course-topic/:name',
    [tokenService.verifyToken], use(courseController.getAllTopics))

router.put('/update-topic',
    [tokenService.verifyToken, tokenService.isProfessor], use(courseController.updateParticularTopic))
router.post('/picture',
    [uploads.single('avator'), tokenService.verifyToken], use(courseController.picUpload))
router.post('/upload-course',
    [tokenService.verifyToken, tokenService.isProfessor], use(courseController.uploadCourse))

router.delete('/delete-topic',
    [tokenService.verifyToken, tokenService.isAdmin], use(courseController.deleteParticularTopic))
router.delete('/delete-course',
    [tokenService.verifyToken, tokenService.isAdmin], use(courseController.deleteEntireCourse))

export default router