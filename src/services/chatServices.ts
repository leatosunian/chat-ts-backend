import ChatModel from "../models/chat";
import MessageModel from "../models/message";
import { Chat } from "../interfaces/chat.interface";
import { Request, Response } from 'express'

const createChatService = async (chat: Chat) => {
    const createdChat = await ChatModel.create(chat);
    return createdChat;
}

const getChatService = async ({params}:Request) => {
    const chat = await ChatModel.find({
        $and:[
            {userOne: params.userOne},
            {userTwo: params.userTwo}]}
        );
    if(chat.length >= 1){
        const messages = await MessageModel.find({
            $or:[
                {sentBy: params.userOne},
                {sentBy: params.userTwo},
                {sentTo: params.userOne},
                {sentTo: params.userTwo}
            ]}
        );
        return messages;
    } else {
        return "No chat found.";
    }
}

const deleteChatService  = async (params:string) => {
    const chat = await ChatModel.deleteOne({_id:params});
    return "Chat deleted."
}

export {
    createChatService,
    getChatService,
    deleteChatService
}