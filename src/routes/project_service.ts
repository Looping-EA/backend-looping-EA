import {Router} from 'express';
import {returnProjects, addProject, deleteProject} from '../controllers/project.controller'
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const project_router = Router();

project_router.route('/projects/')
.get(authenticateToken, returnProjects)
    
project_router.route('/projects/:name')
.delete(authenticateToken, deleteProject)

project_router.route('/projects/add').post(authenticateToken, addProject)

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