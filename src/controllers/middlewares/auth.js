const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const key = require('../../utils/key');
const router = express.Router();

const ADMIN_ROLE_ID = 1;
const API_TOKEN = 'API-TOKEN';

const isPublicEndpoint = request => request.originalUrl.split('/').includes('public');
const authorizeAccess = next => next();
const rejectAcces = response => response.status(403).json({mensaje: 'Invalid or missing API-TOKEN header'});
const isAdminRole = decoded => decoded.roleId === ADMIN_ROLE_ID;
const getRequestToken = request => request.get(API_TOKEN);

router.use((req, res, next) => {
  if (isPublicEndpoint(req)) authorizeAccess(next);

  const receivedToken = getRequestToken(req);

  if (!receivedToken) rejectAcces(res);

  jwt.verify(receivedToken, app.get(key.secretName), (err, decoded) => {
    if (err || !isAdminRole) rejectAcces(res);

    req.decoded = decoded;
    authorizeAccess(next);
  });
});

module.exports = router;
