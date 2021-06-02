import {Router} from 'express';
import {add} from '../controllers/controler.controller';

const configuracion_router = Router();

configuracion_router.route('/configuracion/add') //API Endpoint for Registering a user
    .post(add) // CREATE the user JSON object


export default configuracion_router;