// usercontroller.ts
// important functions for the user service
import {Request, Response} from 'express';
import User from '../models/User';
import Notification from '../models/Notification';
import Photo from '../models/Photo';
const jwt = require('jsonwebtoken');
require('dotenv').config();

// CALL TO CREATE A USER
export async function createUser(req: Request, res: Response): Promise<Response> {
    const {uname, pswd, email, fullname} = req.body; // grab the fields from the POST request body

    console.log("new user creation petition for user ", uname);
    console.log("searching...");
    const user_compr = await User.findOne({'uname': uname}).populate('projectsOwned');
    if(!user_compr){
        console.log("no coincidences found. Creating...");
        // new user.
        const newUser = {
            uname: uname,
            pswd: pswd,
            email: email,
            fullname: fullname,
            isAdmin: false,
            photo:""
        }
        

        // create a user model and save it
        const user = new User (newUser);
        await user.save();
    
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET);
        return res.status(201).json({accessToken: accessToken});
        // Promises need to return something
    } else {
        console.log("user already exists");
        return res.status(404).json({
            message: 'Could not create user',
        });
    }
}
export async function deleteNotif(req:Request, res:Response):Promise<Response>{
    const{notification, user}=req.body;
    const user_check = await User.findOne({'uname':user}).populate('notifications');
    if(user_check){
        let i:number = 0;
        console.log(notification);
        for(i;i<user_check.notifications.length;i++){
            if(user_check.notifications[i].message==notification){
                await Notification.deleteOne({'_id':user_check.notifications[i]._id});
                return res.status(201).json({
                    message:"deleted"
                });
            }
        }
    }
    return res.status(403).json({
        message:"not found"
    });
}
export async function recommend(req:Request, res:Response):Promise<Response>{
    const{user, userRecommended} = req.body;
    const userRecommended_check = await User.findOne({'uname':userRecommended}).populate('recomendations');
    const user_check = await User.findOne({'uname':user});
    if(user_check && userRecommended_check){
        let i:number = 0;
        for(i;i<userRecommended_check.recomendations.length;i++){
            if(userRecommended_check.recomendations[i].uname==user_check.uname){
                return res.status(403).json({
                    message:"you already recommended this user"
                });
            }
        }
        userRecommended_check.recomendations.push(user_check);
           const notification = new Notification();
           let notif: string = user+" has recommended you. Congratulations!";
           notification.message = notif;
           notification.save();
           userRecommended_check.notifications.push(notification);
           userRecommended_check.save();
        const userRecom_check = await User.findOne({'uname':userRecommended});
        if(userRecom_check){
            return res.status(201).json(userRecom_check);
        }

    }
    return res.status(404).json({
        message: "not found"
    })
}
export async function logIn(req:Request, res:Response):Promise<Response>{
    const {uname, pswd} = req.body;
    console.log("log in petition for user ", uname);
    console.log("searching...");
    const user_compr=await User.findOne({'uname':uname}).populate('projectsOwned').populate('notifications').populate('recomendations');
    if(!user_compr){
        console.log("no coincidences found");
        res.status(404);
        return res.json({
            message:'User does not exist',
        });
    }
    else {
        if(user_compr.pswd===pswd){
            const accessToken = jwt.sign(user_compr.toJSON(), process.env.ACCESS_TOKEN_SECRET);
            res.status(201);
            return res.json({accessToken: accessToken});
        }
         res.status(404);
         return res.json({
         message:'Password does not match',
       });
    }
}

// CALL TO GET A USER
export async function getUser(req: Request, res: Response) : Promise <Response>{
    // REQUEST user uname
    const uname = req.params.uname;

    console.log("new user search petition for user ", uname);
    console.log("searching...")
    const user = await User.findOne({'uname': uname}, '-pswd').populate('projectsOwned').populate('notifications').populate('recomendations');

    if(!user){
        // user does NOT exist
        return res.json({
            message: 'could not find user',
        }).status(404);
    } else {
        // user does exist
        return res.json(user.toJSON()).status(200);
    }
}
export async function getUsers(req: Request, res: Response) {
    //Hacemos una lista de los usuarios
    let users = await User.find();
    res.status(201).json(users);
}

export async function deleteUser(req: Request, res:Response):Promise<Response>{
    const{uname}=req.body;
    console.log(uname);
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
export async function updateAboutMe(req:Request, res:Response):Promise<Response>{
    const{uname, aboutMe}=req.body;
    const user = await User.findOne({'uname':uname});
    if (!user){
        console.log("user not found");
        return res.status(404).json({
            message:'user not found',
        });
    }
    else{
        user.aboutMe=aboutMe;
        user.save();
        return res.status(201).json({
            message:aboutMe, 
        });
    }
}

export async function updateSkills(req:Request, res:Response):Promise<Response>{
    const{uname, skills}=req.body;
    const user = await User.findOne({'uname':uname});
    if (!user){
        console.log("user not found");
        return res.status(404).json({
            message:'user not found',
        });
    }
    else{
        user.skills=skills;
        user.save();
        return res.status(201).json({
            message:skills, 
        });
    }
}

export async function updateProjects(req:Request, res:Response):Promise<Response>{
    const{uname, projects}=req.body;;
    const user = await User.findOne({'uname':uname});
    if (!user){
        console.log("user not found");
        return res.status(404).json({
            message:'user not found',
        });
    }
    else{
        user.projects=projects;
        user.save();
        return res.status(201).json({
            message:projects, 
        });
    }
}

export async function findUsersById(req:Request, res:Response):Promise<Response>{
    let{ids}=req.body;
    let users = new Array();
    ids.forEach (async (element: any) => users.push(await User.findById(element)));
    return res.status(201).json(users);

}
  
export async function makeAdmin(req: Request, res:Response): Promise<Response>{
    const {uname} = req.body;
    const userToAdmin = req.params.uname;
    if(await User.findOne({'uname': userToAdmin})){
        const userAdmin = await User.findOne({'uname': uname});
        if(userAdmin){
            if(userAdmin.isAdmin){
                const userIsNowAdmin = await User.updateOne({'uname': userToAdmin}, {'isAdmin': true});
                return res.status(201).json();
            } else {
                return res.status(401).json();
            }
        } else {
            return res.status(404).json();
        }
    } else {
        return res.status(404).json();
    }
}    
