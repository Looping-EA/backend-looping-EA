import Post from '../models/Post';
import { Request, Response } from 'express';

export async function addPost(req: Request, res: Response) {

    const { uname, msg, fecha } = req.body;
    console.log("adding a new post", uname);

    //Se añade a la base de datos
    const new_post = new Post({
        uname: uname,
        msg: msg,
        fecha: fecha
    });
    await new_post.save();
    res.status(201);
    return res.json(new_post.toJSON());
}

export async function getPosts(req: Request, res: Response) {

    let post = await Post.find();
    post.forEach((post) => post.populate('uname').populate('msg').populate('fecha'));
    res.status(201).json(post);
}

export async function removePost(req: Request, res: Response) {

    const { uname } = req.body;
    const check = await Post.findOne({ 'uname': uname });

    if (!check) {
        return res.status(404).json({
            message: 'this user do not have a post',
        });
    }
    else {
        await Post.deleteOne({ 'uname': uname });
        return res.status(201).json(check.toJSON());
    }
}