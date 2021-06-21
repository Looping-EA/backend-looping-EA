import { Router } from 'express';
import { addPost, getPosts, removePost } from '../controllers/post.controller'

const post_router = Router();

post_router.route('/post/add') //API Endpoint for Registering a user
    .post(addPost) // CREATE the user JSON object

post_router.route('/post/')
    .get(getPosts)

post_router.route('/post/delete')
    .delete(removePost)

export default post_router;