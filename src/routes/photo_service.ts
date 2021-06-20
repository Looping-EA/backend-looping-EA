import {Router} from 'express';
import {createPhoto} from '../controllers/photo.controller'
const jwt = require('jsonwebtoken');

const photo_router = Router();

photo_router.route('/photo/create').post(authenticateToken, createPhoto)


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

export default photo_router;