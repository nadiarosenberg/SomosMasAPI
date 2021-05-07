const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
const key = require("../../utils/key");
app.set('key', key.key);
const roleId = express.Router();
roleId.use((req, res, next) => {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgwLCJyb2xlSWQiOjEsImlhdCI6MTYxOTk1NjgzMSwiZXhwIjoxLjQ0ZSsyOX0.Oht8VcnFbVPqWajVdKlXrj_fWP3De3o6ullPwbZ9_kw";

  const ROLE_ID = '1' || 1;

  if (token) {
    jwt.verify(token, app.get('key'), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: 'invalid Token ' });
      } else {
        console.log(decoded);
        if (decoded.roleId === ROLE_ID) {

          req.decoded = decoded;
          next();
        }
        else {
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

module.exports = roleId;