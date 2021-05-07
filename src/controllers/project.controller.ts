import {Request, Response} from 'express';
import Project from '../models/Project';

export async function returnProjects(req:Request, res:Response){
    let projects = await Project.find();
    projects.forEach((project)=>project.populate('chats').populate('teams').populate('tasks').populate('collaboration').populate('owners'));
    res.status(201).json(projects);
}