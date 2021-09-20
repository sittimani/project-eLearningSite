
import { Router } from "express"
import {
    verifyToken,
    isAdmin
}from "../middleware/verifyToken.js"
import {
    getUserData,
    updateUser,
    getPendingProfessor,
    userPermission
} from "../controllers/user-controller.js"

const router = Router()
router.get('/my-details/:id', verifyToken, getUserData)
router.put('/update-profile/:id', verifyToken, updateUser)
router.get('/pending-professor', verifyToken, getPendingProfessor)
router.post('/update-permission', [verifyToken, isAdmin], userPermission)

export default router