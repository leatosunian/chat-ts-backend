import { Request, Response } from 'express'
import { handleError } from '../utils/error.handle'
import { createUserService, getUserAndChatsService } from '../services/userServices'

const createUser = async ({body}: Request, res: Response) => {
    try {
        const chat = await createUserService(body);
        res.send({chat, msg: 'CHAT_CREATED_SUCCESSFULLY'}) ;
    } catch (error) {
        handleError(res, 'ERROR_CHAT_CREATION');
    }
}

const getUserAndChats = async (req: Request, res: Response) => {
    try {
        const chat_messages = await getUserAndChatsService(req);
        res.send({chat_messages, msg: 'CHAT_GET_SUCCESSFULLY'}); 
    } catch (error) {
        handleError(res, 'ERROR_GET_CHAT');
    }
}

export {
    createUser,
    getUserAndChats
}