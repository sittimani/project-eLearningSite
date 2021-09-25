import { Router } from 'express'
import AuthController from '../controllers/auth-controller.js'
import Token from '../middleware/verifyToken.js'
import { use } from '../service/response.js'

const router = Router()

const tokenService = new Token()

const authController = new AuthController()

router.post('/login', use(authController.userLogin))
router.put('/update-password', tokenService.verifyToken, use(authController.updatePassword))

router.get('/verifyUser/:id', use(authController.verifyUser))
router.put('/forgot-password', use(authController.forgotPassword))

export default router