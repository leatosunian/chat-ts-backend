import { Router } from "express"
import { sendMessages, getMessages } from "../controllers/messageController"
const router = Router()

router.post('/messages/send', sendMessages)
router.get('/messages/get/:userID', getMessages)

export default router