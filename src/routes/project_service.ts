import {Router} from 'express';
import {returnProjects, addProject, deleteProject} from '../controllers/project.controller'
import {authenticateToken} from '../middleware/auth';

const project_router = Router();

project_router.route('/projects/')
.get(authenticateToken, returnProjects)
    
project_router.route('/projects/:name')
.delete(authenticateToken, deleteProject)

project_router.route('/projects/add').post(authenticateToken, addProject)

export default project_router;