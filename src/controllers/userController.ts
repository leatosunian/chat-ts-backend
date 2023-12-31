import { Request, Response } from 'express'
import { handleError } from '../utils/error.handle'
import { createUserService, getUserAndChatsService, editUserService, loginUserService, uploadProfileImageService, getUserService, getUserByPhoneService, } from '../services/userServices'
import { ProfileImage } from '../interfaces/profile_image.interface';
import { RequestExtended } from '../interfaces/reqExtended.interface';
import { User } from '../interfaces/user.interface';

const createUser = async ({body}: Request, res: Response) => {
    try {
        const response_data = await createUserService(body);
        res.send({response_data, msg: 'CHAT_CREATED_SUCCESSFULLY'}) ;
    } catch (error) {
        handleError(res, 'ERROR_CHAT_CREATION');
    }
}

const editUser = async ({body}: Request, res: Response) => {
    try {
        const response_data = await editUserService(body);
        res.send({response_data, msg: 'USER_EDIT_SUCCESFULLY'})
    } catch (error) {
        handleError(res, 'ERROR_EDIT_USER');
    }
}

const getUserAndChats = async (req: Request, res: Response) => {
    try {
        const response_data = await getUserAndChatsService(req);        
        res.send({response_data, msg: 'CHAT_GET_SUCCESSFULLY'}); 
    } catch (error) {
        handleError(res, 'ERROR_GET_CHAT');
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const response_data = await getUserService(req); 
        res.send({response_data, msg: 'USER_GET_SUCCESSFULLY'}); 
    } catch (error) {
        handleError(res, 'ERROR_GET_USER');
    }
}

const getUserByPhone = async (req: Request, res: Response) => {
    try {
        const response_data = await getUserByPhoneService(req); 
        res.send({response_data, msg: 'USER_GET_SUCCESSFULLY'}); 
    } catch (error) {
        handleError(res, 'ERROR_GET_USER');
    }
}


const loginUser = async ({body}: Request, res: Response) => {
    try {
        const {email, password} = body;
        const response_data = await loginUserService({ email, password });
        res.send({response_data});
    } catch (error) {
        handleError(res, 'ERROR_LOGIN');
    }
}

const uploadProfileImage = async (req : RequestExtended, res: Response) => {
    try {
        const {user, file} = req
        const path: string = `${file?.path}`.split('\\')[4]
        
        const data: ProfileImage = {
            file_name: `${file?.filename}`,
            path,
            userId: `${user?.userId}`
        }
        const response_data = await uploadProfileImageService(data)
        res.send(response_data)
    } catch (error) {
        handleError(res, 'ERROR_UPLOAD_PROFILEPIC');
    }
}

/*const updateUserData = async (req : RequestExtended, res: Response) => {
    try {
        const {userId} = req.params
        const response_data = await updateUserDataService(userId)
    } catch (error) {
        handleError(res, 'ERROR_UPDATE_USER_DATA');
    }
}*/

export {
    createUser,
    getUserAndChats,
    editUser,
    loginUser,
    uploadProfileImage,
    getUser,
    getUserByPhone
}