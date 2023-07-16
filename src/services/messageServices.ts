import MessageModel from "../models/message";
import { Message } from "../interfaces/message.interface";

const sendMessageService = async (message: Message) => {
    const sentMessage = await MessageModel.create(message);
    return sentMessage;
}


const getMessagesService = async (userID: string) => {
    const messages = await MessageModel.find({sentBy: userID});
    return messages;
}

export {
    sendMessageService,
    getMessagesService
}