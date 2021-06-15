import {Request, Response} from 'express';
import Project from '../models/Project';
import User from '../models/User';

export async function returnProjects(req:Request, res:Response){
    let projects = await Project.find().populate('owner');
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
     let notif: string = uname+ " wants to apply to the project: "+projectName;
     const find_owner = await User.findOne({'uname': owner});
     if (find_owner){
         find_owner.notifications.push(notif);
         find_owner.save();
         return res.status(201).json({
            message: "notification sent",
         });
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
    const{uname, projectName}=req.body;
    const project_compr = await Project.findOne({'name':projectName});
    if(project_compr){
        const user_check = await User.findOne({'uname':uname});
        if (user_check){
            project_compr.members.push(user_check);
            project_compr.save();
            let notif : string = "Congratulations, you have been accepted at "+projectName;
            user_check.notifications.push(notif);
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
    const{uname, projectName} = req.body;
    const user_check = await User.findOne({'uname':uname});
    if(user_check){
        let notif: string = "We are sorry. You have been rejected at "+projectName;
        user_check.notifications.push(notif);
        return res.status(201).json({
            message:"user rejected"
        });
    }
    return res.status(404).json({
        message:"user not found"
    });
}
export async function addProject(req:Request, res:Response){

    const {name, chats, creationDate, tasks, description, collaboration, owner}=req.body;
    const project_compr = await Project.findOne({'name': name});
    const ownerr = await User.findOne({'uname': owner});
    if (!project_compr){
        const newProject={
            name:name,
            chats:chats,
            creationDate:creationDate,
            tasks:tasks,
            description:description,
            collaboration:collaboration,
            owner:ownerr?.id
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