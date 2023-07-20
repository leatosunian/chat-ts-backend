import ChatModel from "../models/chat";
import UserModel from "../models/user";
import MessageModel from "../models/message";
import { Chat } from "../interfaces/chat.interface";
import { checkAuth } from "../middlewares/authMiddleware"
import { Request, Response } from 'express'
import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import { encrypt, verify } from "../utils/pwEncrypt.handle";
import { jwtGen } from "../utils/jwtGen.handle";
import { ProfileImage } from '../interfaces/profile_image.interface';
import ProfileImageModel from '../models/profileImage';


const createUserService = async (authBody: User) => {
    const userExists = await UserModel.find({
        $or:[
            {email: authBody.email},
            {phone: authBody.phone}
        ]}
    );    
    if(userExists.length > 0) {
        return "USER_EXISTS"
    }
    const pwEncrypted = await encrypt(authBody.password)
    authBody.password = pwEncrypted
    const createdUser = await UserModel.create(authBody);
    return createdUser;
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
        return "NO_USER_FOUND";
    }
}

const editUserService = async ({body}: Request) => {
    const editedUser = await UserModel.findOneAndUpdate({_id: body._id}, body, {
        new: true
    });
    return editedUser;
}

const loginUserService = async ({email, password}: Auth) => {
    const user = await UserModel.findOne({email});
    if(!user){
        return "USER_NOT_FOUND"
    };

    const pwHashed = user.password;
    const isCorrectPw = await verify(password, pwHashed);

    if(!isCorrectPw) {
        return "WRONG_PASSWORD";;
    };
    const loginToken = jwtGen(user._id.toString());
    const loginData = {
        userId: user._id.toString(),
        loginToken
    };
    
    return loginData;
}

const uploadProfileImageService = async ({file_name, path, userId} : ProfileImage) => {
    const imageExist = await ProfileImageModel.findOne({userId});
    if (imageExist === null) {
        const file = await ProfileImageModel.create({file_name, path, userId});
        
        return file;
    }
    const file = await ProfileImageModel.findOneAndUpdate({userId},{file_name, path});
    return file;
}

export {
    createUserService,
    getUserAndChatsService,
    editUserService,
    loginUserService,
    uploadProfileImageService
}