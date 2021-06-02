import {Request, Response} from 'express';
import Insignia from '../models/Insignia';

// CALL TO CREATE AN INSIGNIA
export async function createInsignia(req: Request, res: Response): Promise<Response> {
    const {name, desc} = req.body;

    console.log('new insignia insert..... name=' + name);
    console.log('Searching.....')
    const insignia_compr = await Insignia.findOne({'name': name});

    if(!insignia_compr){
        console.log("NO MATCHES FOUND. may proceed");

        const new_insignia = {
            name: name,
            desc: desc
        }

        const insignia = new Insignia(new_insignia);
        await insignia.save();
        return res.status(201).json(insignia.toJSON());
    } else {
        console.log("MATCHES FOUND. 400");
        return res.status(400).json();
    }
}


// CALL TO GET AN INSIGNIA
export async function getInsignia(req: Request, res: Response) : Promise <Response>{
    // REQUEST user uname
    const name = req.params.name;

    console.log("new user search petition for insignia ", name);
    console.log("searching...")
    const insignia = await Insignia.findOne({'name': name});

    if(!insignia){
        // user does NOT exist
        return res.json({
            message: 'could not find user',
        }).status(404);
    } else {
        // user does exist
        return res.json(insignia.toJSON()).status(200);
    }
}

// CALL TO GET INSIGNIAS
export async function getInsignias(req: Request, res: Response) {
    //Hacemos una lista de los usuarios
    let insignias = await Insignia.find();
    res.status(201).json(insignias);
}