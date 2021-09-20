import { Router } from "express"
import { verifyToken, isProfessor, isAdmin } from "../middleware/verifyToken.js"
import {
    uploadQuestion,
    getMyQuestions,
    getAllQuestions,
    getDataForEdit,
    submitAnswer
} from "../controllers/qa-controller.js"

const router = Router()

router.post('/upload-question', verifyToken, uploadQuestion)
router.get('/my-questions/:id', verifyToken, getMyQuestions)
router.get('/all-questions', [verifyToken, isProfessor], getAllQuestions)
router.get('/answered-question/:id', [verifyToken, isProfessor], getDataForEdit)

router.put('/answer', verifyToken, submitAnswer)

export default router