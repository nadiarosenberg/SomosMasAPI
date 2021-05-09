const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
const key = require("../utils/key");
app.set('key', key.key);

const authenticateToken = (req, res, next) => {
    //const token = req.headers['access-token']
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjgwLCJyb2xlSWQiOiIxIiwiaWF0IjoxNjE5OTU2ODMxLCJleHAiOjEuNDRlKzI5fQ.Gh5xa30ZfWFjXgnalyB0ffBAdKiisAAtPwD-qaw7q3A";

    if (token) {
        jwt.verify(token, app.get('key'), (err, decoded) => {
            if (err) {
                return res.json({
                    mensaje: 'Invalid token'
                });
            } else {
                req.decoded = decoded;
                console.log(req.decoded)
                next();
            }
        });
    } else {
        res.send({
            mensaje: 'Token not provided.'
        });
    }

}

module.exports = authenticateToken;