import Location from '../models/Location';
import {request, Request, Response} from 'express'; 

export async function addLocation(req: Request, res: Response){
    
    const {uname, latitude, longitude} = req.body;
    console.log("adding a new location", uname);

    //Se añade a la base de datos
    const new_location = new Location({
        uname: uname,
        latitude: latitude,
        longitude: longitude
    });
    await new_location.save();
    res.status(201);
    return res.json(new_location.toJSON());

}

export async function getLocations(req: Request, res: Response){

    let location = await Location.find();
    location.forEach((location)=>location.populate('uname').populate('latitude').populate('longitude'));
    console.log("locations returned");
    res.status(201).json(location);

}

export async function updateLocation(req: Request, res: Response){

    const{uname,latitude,longitude} = req.body;
    console.log("Se quiere modificar a ",uname);
    
    //Encontramos al reloj existente segun la brand
    const location_compare = await Location.findOne({'uname': uname});
    console.log(location_compare);

    //Cuando encontramos ese reloj lo actualizamos
    await Location.findOneAndUpdate(
        { uname: uname },
        {
            uname: uname,
            latitude: latitude,
            longitude: longitude
        },
        { new: true}
    )

    const updatedLocation = new Location({
        uname: uname,
        latitude: latitude,
        longitude: longitude
    });

    res.status(201);
    return res.json(updatedLocation.toJSON());
}


export async function removeLocation(req: Request, res: Response){

    const{uname}=req.body;
    const check = await Location.findOne({'uname':uname});

    if(!check){
        return res.status(404).json({
            message:'this user do not have a location',
        });
    }
    else{
        await Location.deleteOne({'uname':uname});
        return res.status(201).json(check.toJSON());
    }


}