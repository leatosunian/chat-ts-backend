import { Request, Response } from 'express'
import { handleError } from '../utils/error.handle'
import { createUserService, getUserAndChatsService, editUserService, loginUserService, uploadProfileImageService } from '../services/userServices'
import { ProfileImage } from '../interfaces/profile_image.interface';
import { RequestExtended } from '../interfaces/reqExtended.interface';

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
    } catch (error) {
        handleError(res, 'ERROR_CHAT_CREATION');
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

export {
    createUser,
    getUserAndChats,
    editUser,
    loginUser,
    uploadProfileImage
}