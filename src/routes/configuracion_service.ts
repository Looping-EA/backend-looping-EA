import { Router } from 'express';
import { add, updateConfiguracion, getConfiguracions } from '../controllers/configuracion.controller';

const configuracion_router = Router();

configuracion_router.route('/configuracion/add') //API Endpoint for Registering a user
    .post(add) // CREATE the user JSON object

configuracion_router.route('/configuracion/')
    .get(getConfiguracions)

configuracion_router.route('/configuracion/update')
    .put(updateConfiguracion)

export default configuracion_router;