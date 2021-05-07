import {Request, Response} from 'express';
import Project from '../models/Project';

export async function returnProjects(req:Request, res:Response){
    let projects = await Project.find();
    res.status(201).json(projects);
}