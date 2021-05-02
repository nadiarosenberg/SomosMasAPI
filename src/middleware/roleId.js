const jwt = require('jsonwebtoken');
const express=require("express");
const app=express();
const clave= require ("../clave/clave.js");
app.set('llave',clave.llave);
const roleId = express.Router(); 
roleId.use((req, res, next) => {
	
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgwLCJyb2xlSWQiOiIxIiwiaWF0IjoxNjE5OTU2ODMxLCJleHAiOjEuNDRlKzI5fQ.Gh5xa30ZfWFjXgnalyB0ffBAdKiisAAtPwD-qaw7q3A";
   
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'invalid Token ' });    
        } else {
			console.log(decoded);
			if (decoded.roleId === "1")
			{
				
                req.decoded = decoded; 
				 return res.json({ mensaje: 'access granted' }); 
              
			    next();
			}
			else
			{
				 return res.json({ mensaje: 'forbidden access' });    
			}
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token not provided.' 
      });
    }
 });
 
 module.exports=roleId;