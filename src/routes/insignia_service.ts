// insignia_service.ts
// entry point for insignia related stuff

import {Router} from 'express';
import {getInsignia, getInsignias, createInsignia} from '../controllers/insignia.controller';

// Accomodate the routes at insignia_routes
const insignia_routes = Router();

// START
insignia_routes.route('/insignia/addInsignia')
.post(createInsignia)

// GET ALL INSIGNIA
insignia_routes.route('/insignia/getInsignias')
.get(getInsignias)

// GET AN INSIGNIA
insignia_routes.route('/insignia/getInsignia/:insigniaName')
.get(getInsignia)

export default insignia_routes;