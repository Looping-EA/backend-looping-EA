import Configuracion from '../models/Configuracion';
import {request, Request, Response} from 'express'; 



//Create
export async function add(req: Request, res: Response){
    
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


export async function getConfiguracions(req: Request, res: Response){

    let configuracion = await Configuracion.find();
    configuracion.forEach((configuracion)=>configuracion.populate('uname').populate('notificaciones').populate('seguridad').populate('privacidad'));
    console.log("locations returned");
    res.status(201).json(configuracion);

}

export async function updateConfiguracion(req: Request, res: Response){

    const{uname,notificaciones,seguridad,privacidad} = req.body;
    
    //Encontramos al reloj existente segun la brand
    const configuracion_compare = await Configuracion.findOne({'uname': uname});
    console.log(configuracion_compare);

    //Cuando encontramos ese reloj lo actualizamos
    await Configuracion.findOneAndUpdate(
        { uname: uname },
        {
            uname: uname,
            notificaciones: notificaciones,
            seguridad: seguridad,
            privacidad: privacidad
        },
        { new: true}
    )

    const updatedConfiguracion = new Configuracion({
        uname: uname,
        notificaciones: notificaciones,
        seguridad: seguridad,
        privacidad: privacidad
    });

    res.status(201);
    return res.json(updatedConfiguracion.toJSON());
}


