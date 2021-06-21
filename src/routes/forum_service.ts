import { Router } from 'express';
import { addForum, getForums, updateForum, deleteForum } from '../controllers/forum.controller'

const forum_router = Router();

forum_router.route('/forum/add')
    .post(addForum)

forum_router.route('/forum/')
    .get(getForums)

forum_router.route('/forum/update')
    .put(updateForum)

forum_router.route('/forum/delete')
    .delete(deleteForum)

export default forum_router;