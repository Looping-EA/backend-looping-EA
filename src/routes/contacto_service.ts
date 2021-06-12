import {Router} from 'express';
import {addContacto} from '../controllers/contacto.controller'

const contacto_router = Router();

contacto_router.route('/contacto/add') //API Endpoint for Registering a user
    .post(addContacto) // CREATE the user JSON object

export default contacto_router;