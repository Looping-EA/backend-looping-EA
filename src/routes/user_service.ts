// user_service.ts
// entry point for user related stuff

import {Router} from 'express';
import { createUser, deleteUser, getUser, logIn, getUsers, findUsersById } from '../controllers/user.controller';

// Accomodate the routes at user_routes
const user_router = Router();

user_router.route('/users/login') //API Endpoint for Login a user
    .post(logIn) // Log in the user. READ functions.

user_router.route('/users/register') //API Endpoint for Registering a user
    .post(createUser) // CREATE the user JSON object

user_router.route('/users/:uname') //API Endpoint for existen users
    .get(getUser) // GET the user with username = uname

user_router.route('/users/delete') //API Endpoint for existen users
    .post(deleteUser) // DELETE the user with username = uname

user_router.route('/users/') //API Endpoint for Registering a user
    .post(getUsers) // CREATE the user JSON object

user_router.route('/users/ids')
    .post(findUsersById)
export default user_router; // EXPORT THE ROUTES