import FileMessageModel from "../models/fileMessage";
import MessageModel from "../models/message";
import { Message } from "../interfaces/message.interface";
import { SendFile } from "../interfaces/sendfile.interface";
import { Request, Response } from 'express'

const sendMessageService = async (message: Message) => {
    const sentMessage = await MessageModel.create(message);
    return sentMessage;
}


const getMessagesService = async (userID: string) => {
    const messages = await MessageModel.find({sentBy: userID});
    return messages;
}

const uploadMessageFileService = async (body: SendFile) => {
    const {file_name, path, userId, file_type, sentBy, sentTo, chatID, msgType} = body
    body.text = 'filemessage'
    const text = body.text
    const file = await FileMessageModel.create({file_name, path, userId, file_type, chatID});
    const storeMessage = await MessageModel.create({
        text, 
        sentBy, 
        sentTo, 
        chatID,
        msgType
    })
    return [storeMessage, file];
}

export {
    sendMessageService,
    getMessagesService,
    uploadMessageFileService
}