import { Router } from "express"
import { sendMessages, getMessages, uploadMessageFile } from "../controllers/messageController"
import { checkAuth } from "../middlewares/authMiddleware"
import multerMiddleware from "../middlewares/multerMiddleware"

const router = Router()

router.post('/messages/send', checkAuth, sendMessages)
router.get('/messages/get/:userID', checkAuth, getMessages)
router.post('/messages/upload-message-file', checkAuth, multerMiddleware.single('file'), uploadMessageFile)

export default router