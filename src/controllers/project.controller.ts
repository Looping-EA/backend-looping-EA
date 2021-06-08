import {Request, Response} from 'express';
import Project from '../models/Project';

export async function returnProjects(req:Request, res:Response){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log("received token "+token);
    let projects = await Project.find();
    projects.forEach((project)=>project.populate('chats').populate('teams').populate('tasks').populate('collaboration').populate('owners'));
    console.log("projects returned");
    res.status(201).json(projects);
}
export async function applyToProject(req:Request, res:Response){
    const{uname, projectName}=req.body;
    const project_compr = await Project.findOne({'name':projectName});
    //to do
}
export async function addProject(req:Request, res:Response){
    const {name, chats, creationDate, teams, tasks, description, collaboration, owners}=req.body;
    const project_compr = await Project.findOne({'name': name});
    if (!project_compr){
        const newProject={
            name:name,
            chats:chats,
            creationDate:creationDate,
            teams:teams,
            tasks:tasks,
            description:description,
            collaboration:collaboration,
            owners:owners
        }
        const project = new Project(newProject);
        await project.save();
        return res.status(201).json(project.toJSON());
    }
    else return res.status(401).json({message: 'The name already exists'});

}