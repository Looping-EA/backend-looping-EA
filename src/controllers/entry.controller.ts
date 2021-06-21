import { Request, Response } from 'express';
import Entry from '../models/Entry';

export async function addEntry(req: Request, res: Response) {

    const { name, description, post } = req.body;
    const entry_compr = await Entry.findOne({ 'name': name });
    if (!entry_compr) {
        const newEntry = {
            name: name,
            description: description,
            post: post
        }
        const entry = new Entry(newEntry);
        await entry.save();
        res.status(201);

    }
    else return res.status(401).json({ message: 'The entry already exists' });
}

export async function getEntrys(req: Request, res: Response) {
    let entrys = await Entry.find(); //Lista
    res.status(201).json(entrys);
}

export async function updateEntry(req: Request, res: Response) {

    const { name, description, post } = req.body;
    console.log("Se esta editando la siguiente entrada: ", name);

    const entry_compare = await Entry.findOne({ 'name': name });

    await Entry.findOneAndUpdate(
        { name: name },
        {
            name: name,
            description: description,
            post: post
        },
        { new: true }
    )
    const updatedEntry = new Entry({
        name: name,
        description: description,
        post: post
    });

    res.status(201);
    return res.json(updatedEntry.toJSON());
}

export async function deleteEntry(req: Request, res: Response): Promise<Response> {
    const entrytName = req.params.name;
    const entry_compr = await Entry.deleteOne({ 'name': entrytName });

    if (entry_compr.ok == 1) {
        return res.status(201).json();
    } else {
        return res.status(404).json();
    }
}