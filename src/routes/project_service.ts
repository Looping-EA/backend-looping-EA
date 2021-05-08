import {Router} from 'express';
import {returnProjects, addProject} from '../controllers/project.controller'

const project_router = Router();

project_router.route('/projects/')
    .post(returnProjects)

project_router.route('/projects/add')
    .post(addProject)
export default project_router;