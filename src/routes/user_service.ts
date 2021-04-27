// user_service.ts
// entry point for user related stuff

import {Router} from 'express';
import { createUser, deleteUser, getUser, logIn, getAllUsers } from '../controllers/user.controller';

// Accomodate the routes at user_routes
const user_router = Router();

user_router.route('/users/login') //API Endpoint for Login a user
    .get(logIn) // Log in the user. READ functions.

user_router.route('/users/register') //API Endpoint for Registering a user
    .post(createUser) // CREATE the user JSON object

user_router.route('/users/:uname') //API Endpoint for existen users
    .get(getUser) // GET the user with username = uname
    .delete(deleteUser) // DELETE the user with username = uname

user_router.route('/users')
    .get(getAllUsers) //Returns all users (JSON)

export default user_router; // EXPORT THE ROUTES