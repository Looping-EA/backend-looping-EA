import {Router} from 'express';
import {returnProjects} from '../controllers/project.controller'

const project_router = Router();

project_router.route('/projects/')
    .post(returnProjects)

export default project_router;