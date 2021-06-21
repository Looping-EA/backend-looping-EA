import {Request, Response} from 'express'
import Photo from '../models/Photo'
import User from '../models/User'
import path from 'path'
//import fs from 'fs-extra'

export async function createPhoto(req: Request, res: Response): Promise<Response> {
    const{ user,imagePath} = req.body;
   //guardem la foto amb mongoose
    const user_check= await User.findOne({'uname':user});
    if (user_check){
        user_check.photo=imagePath;
        user_check.save();
        return res.status(201).json({
            message : 'Photo correctly uploaded'
        });
    }
    else return res.status(404).json({
        message:'not found'
    });
   
}


