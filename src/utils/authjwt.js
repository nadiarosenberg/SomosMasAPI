const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const key = require('../utils/key');
app.set('key', key.key);

const authenticateToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    if (token) {
      jwt.verify(token, app.get('key'), (err, decoded) => {
        if (err) {
          return res.json({
            mensaje: 'Invalid token',
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.send({
        mensaje: 'Token not provided.',
      });
    }
  } else {
    return res.status(403);
  }
};

module.exports = authenticateToken;
