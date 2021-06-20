//app.ts
//express and middlewares
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import user_router from './routes/user_service';
import project_router from './routes/project_service';
import configuracion_router from './routes/configuracion_service';
import contacto_router from './routes/contacto_service'
import location_router from './routes/location_service';
import faq_router from './routes/faq_service';
import notification_router from './routes/notification_service';
import photo_router from './routes/photo_service';

const app = express();

// middlewares
app.use(express.json());    // To patch JSON body.
app.use(morgan('dev'));     // As a logger, like log4j.
app.use(cors());            // To connect Front and Back servers.


// set environmental variables (app.get('name of the variable'))
app.set('PORT', process.env.PORT || 8080); // then perform app.get('PORT')
// if(process.env.PORT exists) --> PORT = process.env.PORT; IF NOT: PORT = 8080.

// routes. EntryPoint @ip/api/{whatever}
app.use('/api', user_router);
app.use('/api', project_router );
app.use('/api', configuracion_router );
app.use('/api', contacto_router);
app.use('/api', location_router);
app.use('/api', faq_router);
app.use('/api',notification_router);
app.use('/api', photo_router);

export default app; // EXPORT APP 