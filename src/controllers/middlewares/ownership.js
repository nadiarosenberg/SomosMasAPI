/*Buenas, modifiquemos el middleware para que quede simil a este que refactorizamos entre todos: src\controllers\middlewares\auth.js

Los puntos a contemplar son:

    Remover los comentarios

    Utilizar un token que venga en el header

    Utilizar el User ID del token des-serializado

    Llamar a next() en vez de devolver la respuesta al endpoint directamente desde el middleware

    El middleware debe quedar dentro de la carpeta controllers/middlewares (esta carpeta aparecio luego de nuestro refactor pero ya que pedimos los otros cambios podemos hacerlo)

    Rebasear la branch contra DEV
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
        console.log(decoded.id);
		console.log(id);
        if ((decoded.role === "1") || (decoded.id===id)) {

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