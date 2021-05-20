const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
const key = require("../utils/key");
app.set('key', key.key);
const authorizeAccess = (next) => next();
const ownerShip = express.Router();

ownerShip.use((req, res, next) => {
    if (!req.headers.authorization)
		 {
			res.send({message:"widthout headers authorization"});
		 }
	     var token=req.headers.authorization.split(" ")[1];
		 jwt.verify(token, app.get('key'), async (err, decoded) =>
		 {
         if (err) {
             return res.json({ mensaje: 'invalid Token  or without token' });
                  }
				  
			
			if ((decoded.role === "1") || (decoded.id===req.body.id)) 
			{
              const authorizeAccess = (next) => next();
			}
            else 
			{
              return res.json({ mensaje: 'error 403' });
            }
		  
		 });	 
	 
});

module.exports = ownerShip;