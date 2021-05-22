// user_service.ts
// entry point for user related stuff

import {Router} from 'express';
import { createUser, deleteUser, getUser, logIn, getUsers, findUsersById } from '../controllers/user.controller';
import {authenticateToken} from '../middleware/auth';
// Accomodate the routes at user_routes
const user_router = Router();

user_router.route('/users/login') //API Endpoint for Login a user
    .post(logIn) // Log in the user. READ functions.

user_router.route('/users/register') //API Endpoint for Registering a user
    .post(createUser) // CREATE the user JSON object

user_router.get('/users/:uname', authenticateToken, (req,res)=>{
    res.json(getUser);
}) //API Endpoint for existen users
  // GET the user with username = uname

user_router.post('/users/delete', authenticateToken, (req,res)=>{
    res.json(deleteUser);
}) //API Endpoint for existen users
 // DELETE the user with username = uname

user_router.post('/users/',authenticateToken, (req, res)=>{
    res.json(getUsers);
}) //API Endpoint for Registering a user
     // CREATE the user JSON object

user_router.post('/users/ids', authenticateToken, (req,res)=>{
    res.json(findUsersById);
})

export default user_router; // EXPORT THE ROUTES