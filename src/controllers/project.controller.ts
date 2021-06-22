import {Request, Response} from 'express';
import Project from '../models/Project';
import User from '../models/User';
import Notification from '../models/Notification';

export async function returnProjects(req:Request, res:Response){
    let projects = await Project.find().populate('owner').populate('collaboration').populate('entries');
    res.status(201).json(projects);
}

export async function deleteProject(req: Request, res: Response): Promise<Response>{
    const projectName = req.params.name;
    const project_compr = await Project.deleteOne({'name': projectName});

    if(project_compr.ok == 1){
        return res.status(201).json();
    } else {
        return res.status(404).json();
    }
}

export async function applyToProject(req:Request, res:Response){
    const{uname, owner, projectName}=req.body;
    const project_compr = await Project.findOne({'name':projectName});
    if(project_compr){
     const find_owner = await User.findOne({'uname': owner});
     const find_uname = await User.findOne({'uname': uname});
     if (find_owner&&find_uname){
         const find_notif = await Notification.findOne({'message':uname+" wants to apply to the project: "+projectName});
         if(find_notif != null){
             return res.status(409).json({
                 message:"You have already applied",
             });
         }
         else{
        const notification = new Notification();
        let notif: string = uname+" wants to apply to the project: "+projectName;
        notification.message = notif;
        notification.user=find_uname.uname;
        notification.project=project_compr.name;
        find_owner.notifications.push(notification);
        notification.save();
        find_owner.save();
        return res.status(201).json({
            message: "notification sent",
         });
         }
        
     }
     return res.status(404).json({
        message:"The owner does not exist. Wtf?"
    
    });
}
return res.status(404).json({
    message:"The project does not exist. Wtf?"
});
}


export async function acceptMember(req:Request, res:Response){
    const{projectName, userAccepted, uname}=req.body;
    const project_compr = await Project.findOne({'name':projectName});
    if(project_compr){
        const user_check = await User.findOne({'uname':userAccepted});
        const owner_check = await User.findOne({'uname':uname});
        if (user_check&&owner_check){
            project_compr.collaboration.push(user_check);
            project_compr.save();
            let notif : string = "Congratulations, you have been accepted at "+projectName;
            const notification = new Notification();
            notification.message=notif;
            notification.save();
            const del_notif = await Notification.deleteOne({'message':user_check.uname+" wants to apply to the project: "+projectName});
            user_check.notifications.push(notification);
            user_check.save();
            return res.status(201).json({
                message:"user accepted"
            });
        }
        return res.status(404).json({
            message:"user not found"
        });
    }
    return res.status(404).json({
        message:"project not found"
    });
}

export async function rejectMember(req:Request, res:Response){
    const{projectName, userRejected, uname}=req.body;
    const project_compr = await Project.findOne({'name':projectName});
    if(project_compr){
        const user_check = await User.findOne({'uname':userRejected});
        const owner_check = await User.findOne({'uname':uname});
        if (user_check&&owner_check){
            let i: number = 0;
            for (i=0;i<project_compr.collaboration.length;i++){
                if(project_compr.collaboration[i].uname == user_check.uname){
                    return res.status(409).json({
                        message:"The user is already in the project"
                    });
                }
            }
            let notif : string = "We are sorry, you have been rejected at "+projectName;
            const notification = new Notification();
            notification.message=notif;
            notification.save();
            const del_notif = await Notification.deleteOne({'message':user_check.uname+" wants to apply to the project: "+projectName});
            user_check.notifications.push(notification);
            user_check.save();
            return res.status(201).json({
                message:"user rejected"
            });
        }
        return res.status(404).json({
            message:"user not found"
        });
    }
    return res.status(404).json({
        message:"project not found"
    });
}
export async function addProject(req:Request, res:Response){

    const {name, chats, creationDate, description, collaboration, owner, entry}=req.body;
    const project_compr = await Project.findOne({'name': name});
    const ownerr = await User.findOne({'uname': owner});
    if (!project_compr){
        
        const newProject={
            name:name,
            chats:chats,
            creationDate:creationDate,
            description:description,
            collaboration:collaboration,
            owner:ownerr?.id,
            entry:entry
        }
        const project = new Project(newProject);
        await project.save();
        const project_send = await Project.findOne({'name':project.name}).populate('owner');
        console.log(project_send?.owner.uname);
        if (ownerr){
            ownerr.projectsOwned.push(project);
            ownerr.save();
        }
       if(project_send){
        return res.status(201).json(project_send);
       }
       else return res.status(403).json({message: 'Error'});
    }
    else return res.status(401).json({message: 'The name already exists'});

}
