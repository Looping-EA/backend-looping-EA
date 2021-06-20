import {Router} from 'express';
import {addContacto, getContacto} from '../controllers/contacto.controller'

const contacto_router = Router();

contacto_router.route('/contacto/add') //API Endpoint for Registering a user
    .post(addContacto) // CREATE the user JSON object

contacto_router.route('/contacto/')
    .get(getContacto)

export default contacto_router;