import { Router } from 'express'
import Token from '../middleware/verifyToken.js'
import QaController from '../controllers/qa-controller.js'
import { use } from '../service/response.js'
const router = Router()

const qaController = new QaController()
const tokenService = new Token()

router.post('/upload-question',
    [tokenService.verifyToken], use(qaController.uploadQuestion))
router.get('/my-questions/:id',
    [tokenService.verifyToken], use(qaController.getMyQuestions))
router.get('/all-questions',
    [tokenService.verifyToken, tokenService.isProfessor], use(qaController.getAllQuestions))
router.get('/answered-question/:id',
    [tokenService.verifyToken, tokenService.isProfessor], use(qaController.getDataForEdit))

router.put('/answer',
    [tokenService.verifyToken], use(qaController.submitAnswer))

export default router