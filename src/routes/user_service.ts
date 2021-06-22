// user_service.ts
// entry point for user related stuff

import {Router} from 'express';
import { recommend, makeAdmin, createUser, deleteUser, getUser, logIn, getUsers, findUsersById, updateAboutMe, updateSkills, updateProjects } from '../controllers/user.controller';
const jwt = require('jsonwebtoken');
// Accomodate the routes at user_routes
const user_router = Router();

user_router.route('/users/login') //API Endpoint for Login a user
    .post(logIn) // Log in the user. READ functions.

user_router.route('/users/recommend').post(recommend)

user_router.route('/users/register') //API Endpoint for Registering a user
    .post(createUser) // CREATE the user JSON object

user_router.route('/users/:uname') //API Endpoint for existen users
    .get(authenticateToken, getUser)// GET the user with username = uname

user_router.route('/users/delete') 
.post(authenticateToken, deleteUser)
 //API Endpoint for existen users
 // DELETE the user with username = uname

 user_router.route('/users/makeAdmin/:uname')
 .post(authenticateToken, makeAdmin)

user_router.route('/users/updateAboutMe')
.post(authenticateToken, updateAboutMe)
//API endpoint to update the about me field

user_router.route('/users/updateSkills')
.post(authenticateToken, updateSkills)
//API endpoint to update the skills field

user_router.route('/users/updateProjects')
.post(authenticateToken, updateProjects)
//API endpoint to update the projects field

user_router.route('/users/')
    .get(authenticateToken, getUsers)
 //API Endpoint for Registering a user
     // CREATE the user JSON object

user_router.route('/users/ids')
    .post(authenticateToken, findUsersById)

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
export default user_router; // EXPORT THE ROUTES