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
    const{uname, projectName}=req.body;
    const project_compr = await Project.findOne({'name':projectName});
    //to do
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