import {Router} from 'express';
import {deleteNotif} from '../controllers/user.controller'
const jwt = require('jsonwebtoken');

const notification_router = Router();

notification_router.route('/notification/delete').delete(authenticateToken, deleteNotif)


function authenticateToken (req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    console.log("received token "+token);
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    })
  }

export default notification_router;