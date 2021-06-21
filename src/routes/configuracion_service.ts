import {Router} from 'express';
import {addConfiguracion} from '../controllers/configuracion.controller';

const configuracion_router = Router();

configuracion_router.route('/configuracions/add') //API Endpoint for Registering a user
    .post(addConfiguracion) // CREATE the user JSON object


export default configuracion_router;