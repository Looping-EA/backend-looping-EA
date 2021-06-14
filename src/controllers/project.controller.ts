import {Request, Response} from 'express';
import Project from '../models/Project';
import User from '../models/User';

export async function returnProjects(req:Request, res:Response){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("received token "+token);
    let projects = await Project.find().populate('owner');
   // projects.forEach(async (project)=>await project.populate('chats').populate('teams').populate('tasks').populate('collaboration').populate('owner'));
    console.log(projects[0]?.owner + "the owner of the first project is");
    console.log("projects returned");
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

    const {name, chats, creationDate, teams, tasks, description, collaboration, owner}=req.body;
    const project_compr = await Project.findOne({'name': name});
    const ownerr = await User.findOne({'uname': owner});
    if (!project_compr){
        const newProject={
            name:name,
            chats:chats,
            creationDate:creationDate,
            teams:teams,
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