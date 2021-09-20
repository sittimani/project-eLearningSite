import { Router } from "express"
import { userLogin, forgotPassword, updatePassword, verifyUser } from "../controllers/auth-controller.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = Router()

router.post('/login', userLogin)
router.post('/update-password', verifyToken, updatePassword)

router.get('/verifyUser/:id', verifyUser)
router.post('/forgot-password', forgotPassword)

export default router 