import { Request, Response } from 'express';
import Forum from '../models/Forum';

export async function addForum(req: Request, res: Response) {

    const { name, description, post } = req.body;
    const forum_compr = await Forum.findOne({ 'name': name });
    if (!forum_compr) {
        const newForum = {
            name: name,
            description: description,
            post: post
        }
        const forum = new Forum(newForum);
        await forum.save();
        res.status(201);

    }
    else return res.status(401).json({ message: 'The forum already exists' });
}

export async function getForums(req: Request, res: Response) {
    let forums = await Forum.find(); //Lista
    res.status(201).json(forums);
}

export async function updateForum(req: Request, res: Response) {

    const { name, description, post } = req.body;
    console.log("Se esta editando el sigiente foro: ", name);

    const forum_compare = await Forum.findOne({ 'name': name });

    await Forum.findOneAndUpdate(
        { name: name },
        {
            name: name,
            description: description,
            post: post
        },
        { new: true }
    )
    const updatedForum = new Forum({
        name: name,
        description: description,
        post: post
    });

    res.status(201);
    return res.json(updatedForum.toJSON());
}

export async function deleteForum(req: Request, res: Response): Promise<Response> {
    const forumtName = req.params.name;
    const forum_compr = await Forum.deleteOne({ 'name': forumtName });

    if (forum_compr.ok == 1) {
        return res.status(201).json();
    } else {
        return res.status(404).json();
    }
}