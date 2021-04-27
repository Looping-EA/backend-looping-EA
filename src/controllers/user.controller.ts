// usercontroller.ts
// important functions for the user service
import {Request, Response} from 'express';
import User from '../models/User';

// CALL TO CREATE A USER
export async function createUser(req: Request, res: Response): Promise<Response> {
    const {uname, pswd, email, fullname} = req.body; // grab the fields from the POST request body

    console.log("new user creation petition for user ", uname);
    console.log("searching...");
    const user_compr = await User.findOne({'uname': uname});

    if(!user_compr){
        console.log("no coincidences found. Creating...");

        // new user.
        const newUser = {
            uname: uname,
            pswd: pswd,
            email: email,
            fullname: fullname
        }

        // create a user model and save it
        const user = new User (newUser);
        await user.save();
        
        res.status(201);
        return res.json(user.toJSON()); // Promises need to return something
    } else {
        console.log("user already exists");
        res.status(401);
        return res.json({
            message: 'Could not create user',
        });
    }
}
export async function logIn(req:Request, res:Response):Promise<Response>{
    const {uname, pswd} = req.body;
    console.log("log in petition for user ", uname);
    console.log("searching...");
    const user_compr=await User.findOne({'uname':uname});
    if(!user_compr){
        console.log("no coincidences found");
        res.status(404);
        return res.json({
            message:'User does not exist',
        });
    }
    else {
        if(user_compr.pswd===pswd){
            const newUser={
                uname:uname
            }
            const user = new User (newUser);
            res.status(201);
            return res.json(user.toJSON());
        }
         res.status(404);
         return res.json({
         message:'Password does not match',
       });
    }
}

// CALL TO GET A USER
export async function getUser(res: Response, req: Request) : Promise <Response>{
    // REQUEST user uname
    const uname = req.params.uname;

    console.log("new user search petition for user ", uname);
    console.log("searching...")
    const user = await User.findOne({'uname': uname}, '-pswd');

    if(!user){
        // user does NOT exist
        res.status(404);
        res.json({
            message: 'could not find user',
        });
    } else {
        // user does exist
        res.status(200);
        res.json(user.toJSON());
    }

    return res;
}
export async function getAllUsers(res:Response, req:Request):Promise <Response>{
    const users = await User.find({});
    if(!users){
        return res.status(404).json({
            message:'could not find users',
        });
    } else {
         return res.status(200).json(users);
    }
}
export async function deleteUser(req: Request, res:Response):Promise<Response>{
    const{uname}=req.body;
    const check = await User.findOne({'uname':uname});
    if(!check){
        console.log("user does not exist");
        return res.status(404).json({
            message:'user not deleted since it does not exist',
        });
    }
    else{
        await User.deleteOne({'uname':uname});
        console.log("user deleted");
        return res.status(201).json(check.toJSON());
    }
}

