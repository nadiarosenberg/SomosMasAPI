'use strict';
const jwt = require('jsonwebtoken');
const key = require('../utils/key');

function createToken(user) {
  const payload = {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    photo: user.photo,
    email: user.email,
    roleId: user.roleId,
  };
  const secret = key.key;
  const options = {};
  return jwt.sign(payload, secret, options);
}

module.exports = createToken;
