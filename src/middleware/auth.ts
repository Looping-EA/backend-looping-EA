const jwt = require('jsonwebtoken');
const User = require ('../models/User');
require('dotenv').config()

 module.exports=(req, res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    console.log("received "+token);
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
      console.log(err);
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    })
  }

