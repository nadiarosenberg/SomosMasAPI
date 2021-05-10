const jwt = require('jsonwebtoken');
const express = require("express");
const app = express();
const key = require("../utils/key");
app.set('key', key.key);

const authenticateToken = (req, res, next) => {
    const token = createToken(req.body);

    if (token) {
        jwt.verify(token, app.get('key'), (err, decoded) => {
            if (err) {
                return res.json({
                    mensaje: 'Invalid token'
                });
            } else {
                req.decoded = decoded;
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