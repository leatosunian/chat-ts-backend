import { Router } from "express"
import { checkAuth } from "../middlewares/authMiddleware"
import { createUser, editUser, getUserAndChats, loginUser, uploadProfileImage } from "../controllers/userController"
import multerMiddleware from "../middlewares/multerMiddleware"

const router = Router()

router.post('/user/create', createUser)
router.post('/user/login', loginUser)
router.get('/user/get/:user', checkAuth, getUserAndChats)
router.post('/user/update/profile-pic', checkAuth, multerMiddleware.single('profile-image'), uploadProfileImage)

export default router