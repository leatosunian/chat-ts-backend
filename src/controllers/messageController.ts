import { Request, Response } from 'express'
import { handleError } from '../utils/error.handle'
import {getMessagesService, sendMessageService} from '../services/messageServices'

const sendMessages = async ({body}: Request, res: Response) => {
    try {
        const response = await sendMessageService(body)
        res.send({response, msg: 'MESSAGE_SENT_SUCCESSFULLY'}) 
    } catch (error) {
        handleError(res, 'ERROR_SEND_MESSAGE')
    }
}

const getMessages = async ({params}: Request, res: Response) => {
    try {
        const messages = await getMessagesService(params.userID)
        res.send({messages, msg: 'MESSAGES_GET_SUCCESSFULLY'}) 
    } catch (error) {
        handleError(res, 'ERROR_GET_MESSAGES')
    }
}

export {
    sendMessages,
    getMessages
}