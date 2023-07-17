import ChatModel from "../models/chat";
import MessageModel from "../models/message";
import { Chat } from "../interfaces/chat.interface";
import { Request, Response } from 'express'

const createUserService = async (chat: Chat) => {
    const createdChat = await ChatModel.create(chat);
    return createdChat;
}

const getUserAndChatsService = async ({params}:Request) => {
    const user = await ChatModel.find({_id: params.userID});
    if(user.length >= 1){
        const user_chats = await ChatModel.find({
            $or:[
                {userOne: params.userID},
                {userTwo: params.userID}
            ]}
        );
        return user;
    } else {
        return "No user found.";
    }
}


export {
    createUserService,
    getUserAndChatsService,
}