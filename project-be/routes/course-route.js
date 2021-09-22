import { Router } from 'express'
import {
    getAvailableCourse,
    getAllTopics,
    getParticularTopic,
    uploadCourse,
    updateParticularTopic,
    picUpload,
    deleteEntireCourse,
    deleteParticularTopic
} from '../controllers/course-controller.js'
import * as upload from '../middleware/uploads.js'
import{
    verifyToken,
    isProfessor,
    isAdmin
} from '../middleware/verifyToken.js'

const uploads = upload.upload

const router = Router()
router.get('/course', verifyToken, getAvailableCourse)
router.get('/course-topic/:name', verifyToken, getAllTopics)

router.post('/topics', verifyToken, getParticularTopic)
router.put('/update-topic', [verifyToken, isProfessor], updateParticularTopic)
router.post('/picture', [uploads.single('avator'), verifyToken], picUpload)
router.post('/upload-course', [verifyToken, isProfessor], uploadCourse)

router.delete('/delete-topic', [verifyToken, isAdmin], deleteParticularTopic)
router.delete('/delete-course', [verifyToken, isAdmin], deleteEntireCourse)

export default router