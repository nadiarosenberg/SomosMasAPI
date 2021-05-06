
/*
Se utilizará para proteger endpoints que son solo para el usuario actual. 
Deberá verificar el parámetro id 
y compararlo con el ID del usuario enviado en el token JWT, 
caso contrario, devolver error 403. 
Sin embargo, si el usuario que es enviado en el token es administrador, 
si le permitirá continuar.

*/
const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
const key = require("../utils/key");
app.set('key', key.key);
const ownerShip = express.Router();

ownerShip.use((req, res, next) => {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgwLCJyb2xlSWQiOiIxIiwiaWF0IjoxNjE5OTU2ODMxLCJleHAiOjEuNDRlKzI5fQ.Gh5xa30ZfWFjXgnalyB0ffBAdKiisAAtPwD-qaw7q3A";
  const id=1;
  if (token) {
    jwt.verify(token, app.get('key'), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: 'invalid Token ' });
      } else {
        console.log(decoded.sub);
		console.log(id);
        if ((decoded.role === "1") || (decoded.sub===id)) {

          req.decoded = decoded;
          return res.json({ mensaje: 'endpoints allowed' });

          next();
        }
        else {
          return res.json({ mensaje: 'error 403' });
        }
      }
    });
  } else {
    res.send({
      mensaje: 'Token not provided.'
    });
  }
});

module.exports = ownerShip;