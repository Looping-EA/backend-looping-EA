import {Router} from 'express';
import {addLocation, getLocations, updateLocation, removeLocation} from '../controllers/location.controller'

const location_router = Router();

location_router.route('/location/add') //API Endpoint for Registering a user
    .post(addLocation) // CREATE the user JSON object

location_router.route('/location/')
    .get(getLocations)

location_router.route('/location/update')
    .put(updateLocation)

location_router.route('/location/delete')
    .delete(removeLocation)

export default location_router;