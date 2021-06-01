const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const key = require('../../utils/key');
const router = express.Router();

const ADMIN_ROLE_ID = 1;
const API_TOKEN = 'Authorization';

const rejectAcces = response => response.status(403).json({mensaje: 'Invalid or missing API-TOKEN header'});
const isAdminRole = decoded => decoded.roleId === ADMIN_ROLE_ID;
const getRequestToken = request => request.get(API_TOKEN);

router.use((req, res, next) => {
  const receivedToken = getRequestToken(req);

  if (!receivedToken) rejectAcces(res);

  const receivedTokenWithoutPreffix = receivedToken.split(' ')[1];
  jwt.verify(receivedTokenWithoutPreffix, key.key, (err, decoded) => {
    if (err || !isAdminRole(decoded)) {
      return rejectAcces(res);
    }
    
    req.decoded = decoded;
    next();
  });
});

module.exports = router;
