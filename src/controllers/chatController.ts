import { Request, Response } from 'express'
import { handleError } from '../utils/error.handle'
import { createChatService, getChatService, deleteChatService } from '../services/chatServices'

const createChat = async ({body}: Request, res: Response) => {
    try {
        const chat = await createChatService(body);
        res.send({chat, msg: 'CHAT_CREATED_SUCCESSFULLY'}) ;
    } catch (error) {
        handleError(res, 'ERROR_CHAT_CREATION');
    }
}

const getChat = async (req: Request, res: Response) => {
    try {
        const chat_messages = await getChatService(req);
        res.send({chat_messages, msg: 'CHAT_GET_SUCCESSFULLY'}); 
    } catch (error) {
        handleError(res, 'ERROR_GET_CHAT');
    }
}

const deleteChat = async ({params}: Request, res: Response) => {
    try {
        const chat = await deleteChatService(params.chatID);
        res.send({msg: 'CHAT_DELETED_SUCCESSFULLY'}); 
    } catch (error) {
        handleError(res, 'ERROR_DELETE_CHAT');
    }
}

export {
    createChat,
    getChat,
    deleteChat
}