const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const key = require('../utils/key');
app.set('key', key.key);

const authenticateToken = (req, res, next) => {
  const bearerHeader = req.headers['Authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    if (token) {
      jwt.verify(token, app.get('key'), (err, decoded) => {
        if (err) {
          return res.status(400).json({ msg: 'Invalid token'});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).json({ msg: 'Token not provided' });
    }
  } else {
    res.status(403).json({msg: 'Token not provided'});
  }
};

module.exports = authenticateToken;
