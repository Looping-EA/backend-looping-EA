import {Router} from 'express';
import {getFaqs} from '../controllers/faq.controller'
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const faq_router = Router();

faq_router.route('/faqs/')
    .get(authenticateToken, getFaqs)


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
export default faq_router;