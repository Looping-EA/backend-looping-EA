import {Request, Response} from 'express';
import Faq from '../models/Faq';

export async function getFaqs(req: Request, res: Response) {
    //Hacemos una lista de los usuarios
    let faqs = await Faq.find();
    console.log("faqs returned");
    res.status(201).json(faqs);
}