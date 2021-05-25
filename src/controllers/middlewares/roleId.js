const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const key = require('../../utils/key');
app.set('key', key.key);
const roleId = express.Router();
roleId.use((req, res, next) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgwLCJyb2xlSWQiOiIxIiwiaWF0IjoxNjE5OTU2ODMxLCJleHAiOjEuNDRlKzI5fQ.Gh5xa30ZfWFjXgnalyB0ffBAdKiisAAtPwD-qaw7q3A';

  const ROLE_ID = 1;

  if (token) {
    jwt.verify(token, app.get('key'), (err, decoded) => {
      if (err) {
        return res.json({mensaje: 'invalid Token '});
      } else {
        console.log(decoded);
        if (decoded.roleId === ROLE_ID) {
          req.decoded = decoded;
          next();
        } else {
          return res.json({mensaje: 'forbidden access'});
        }
      }
    });
  } else {
    res.send({
      mensaje: 'Token not provided.',
    });
  }
});

module.exports = roleId;
