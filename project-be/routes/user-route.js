
import { Router } from 'express'
import Token from '../middleware/verifyToken.js'
import UserController from '../controllers/user-controller.js'
import { use } from '../service/response.js'

const router = Router()

const userController = new UserController()
const tokenService = new Token()

router.get('/my-details/:id',
    [tokenService.verifyToken], use(userController.getUserData))
router.put('/update-profile/:id',
    [tokenService.verifyToken], use(userController.updateUser))
router.get('/pending-professor',
    [tokenService.verifyToken, tokenService.isAdmin], use(userController.getPendingProfessor))
router.put('/update-permission',
    [tokenService.verifyToken, tokenService.isAdmin], use(userController.userPermission))

export default router