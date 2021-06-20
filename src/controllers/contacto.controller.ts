import Contacto from '../models/Contacto';
import {request, Request, Response} from 'express'; 

export async function addContacto(req: Request, res: Response){
    
    const {uname, date, message} = req.body;
    console.log("new suggestion by user ", uname);
    console.log("searching...");

    //Se añade a la base de datos
    const new_contacto = new Contacto({
        uname: uname,
        date: date,
        message: message
    });
    await new_contacto.save();
    res.status(201);
    return res.json(new_contacto.toJSON());

}

export async function getContacto(req: Request, res: Response){

    let contacto = await Contacto.find();
    contacto.forEach((contacto)=>contacto.populate('uname').populate('date').populate('message'));
    console.log("contactos returned");
    res.status(201).json(contacto);

}