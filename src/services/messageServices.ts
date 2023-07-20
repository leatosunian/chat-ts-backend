import FileMessageModel from "../models/fileMessage";
import MessageModel from "../models/message";
import { Message } from "../interfaces/message.interface";
import { SendFile } from "../interfaces/sendfile.interface";

const sendMessageService = async (message: Message) => {
    const sentMessage = await MessageModel.create(message);
    return sentMessage;
}


const getMessagesService = async (userID: string) => {
    const messages = await MessageModel.find({sentBy: userID});
    return messages;
}

const uploadMessageFileService = async ({file_name, path, userId, file_type} : SendFile) => {
    const imageExist = await FileMessageModel.findOne({userId});
    const file = await FileMessageModel.create({file_name, path, userId, file_type});
    return file;
}

export {
    sendMessageService,
    getMessagesService,
    uploadMessageFileService
}