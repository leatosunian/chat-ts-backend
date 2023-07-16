import { Router } from "express"
import { createChat, getChat, deleteChat } from "../controllers/chatController"
const router = Router()

router.post('/chats/create', createChat)
router.get('/chats/get/:userOne/:userTwo', getChat)
router.delete('/chats/delete/:chatID', deleteChat)


export default router