import Configuracion from '../models/Configuracion';
import {request, Request, Response} from 'express'; 



//Create
export async function addConfiguracion(req: Request, res: Response){
    
    const {uname,notificaciones, privacidad, seguridad} = req.body;
    console.log("new user creation petition for user ", uname);
    console.log("searching...");
    //comprobar que exista
    const usr_compare = await Configuracion.findOne({'uname': uname});
    //si no existe
    if(!usr_compare){   
        const new_configuracion = new Configuracion({
            uname: uname,
            notificaciones: notificaciones,
            seguridad: seguridad,
            privacidad: privacidad
        });
        await new_configuracion.save();
        res.status(201);
        return res.json(new_configuracion.toJSON());
    }else{
        return res.status(400);
    }
}
