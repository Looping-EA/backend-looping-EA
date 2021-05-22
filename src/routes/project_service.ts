import {Router} from 'express';
import {returnProjects, addProject} from '../controllers/project.controller'
import {authenticateToken} from '../middleware/auth';

const project_router = Router();

project_router.post('/projects/', authenticateToken, (req, res)=>{
    res.json(returnProjects);
} )
    

project_router.post('/projects/add', authenticateToken, (req, res)=>{
    res.json(addProject);
})
export default project_router;