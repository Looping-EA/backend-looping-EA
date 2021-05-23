import {Router} from 'express';
import {returnProjects, addProject} from '../controllers/project.controller'
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const project_router = Router();

project_router.route('/projects/')
.get(authenticateToken, returnProjects)
    

project_router.post('/projects/add', auth, (req, res)=>{
    res.json(addProject);
})
function authenticateToken (req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    })
  }
export default project_router;