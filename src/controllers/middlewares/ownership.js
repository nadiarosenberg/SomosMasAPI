const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

const API_TOKEN = 'API-TOKEN';
const authorizeAccess = next => next();
const ownerShip = express.Router();
const getRequestToken = req => req.get(API_TOKEN);
const rejectAcces = response => response.status(403).json({mensaje: 'Invalid or missing API-TOKEN header'});
ownerShip.use((req, res, next) => {
  const receivedToken = getRequestToken(req);
  if (!receivedToken) rejectAcces(res);

  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, app.get(key.secretName), async (err, decoded) => {
    if (err) {
      return res.json({mensaje: 'invalid Token  or without token'});
    }
    if (decoded.role === '1' || decoded.id === req.body.id) {
      const authorizeAccess = next => next();
    } else {
      return res.json({mensaje: 'error 403'});
    }
  });
});
module.exports = ownerShip;
