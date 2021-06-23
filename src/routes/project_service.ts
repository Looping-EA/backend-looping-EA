import {Router} from 'express';
import {returnProjects, addProject, deleteProject, applyToProject, acceptMember, rejectMember} from '../controllers/project.controller'
const jwt = require('jsonwebtoken');

const project_router = Router();

project_router.route('/projects/')
.get(authenticateToken, returnProjects)
    
project_router.route('/projects/:name')
.delete(authenticateToken, deleteProject)

project_router.route('/projects/add').post(authenticateToken, addProject)

project_router.route('/projects/apply').post(authenticateToken, applyToProject)

project_router.route('/projects/acceptMember').post(authenticateToken, acceptMember)

project_router.route('/projects/rejectMember').post(authenticateToken, rejectMember)


function authenticateToken (req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    console.log("received token "+token);
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    })
  }

export default project_router;