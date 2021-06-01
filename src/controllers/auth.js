'use strict';
const express = require('express');
const app = express();
const key = require('../utils/key');
app.set('key', key.key);
const router = express.Router();
const handler = require('./../handlers/users');
const logger = require('./../utils/pinoLogger');
const verifyToken = require('./../../src/controllers/middlewares/auth');
const sendWelcomEmail = require('../utils/welcomEmail');
const {
  userValidationRules,
  loginValidateRules,
  validate
} = require('./middlewares/users');
const createToken = require('../utils/createToken');
router.post('/register', userValidationRules(), validate, async (req, res, next) => {
  try {
    const user = req.body;
    const result = await handler.createUser(user);
    sendWelcomEmail(result.email, result.firstName, result.lastName);
    const token = await createToken(result);
    res.status(201).json({token, msg: 'User created successfully'});
  } catch (e) {
    logger.error(e.message);
    res.status(500).json({msg: 'Internal Error'});
  }
});

router.post('/login', loginValidateRules(), validate, async (req, res, next) => {
  try {
      const user = await handler.getUserByEmail(req.body.email, req.body.password);
      if(!user){
        return res.status(400).json({msg: 'Email or password incorrect'});
      }
      const token = createToken(user);
      res.status(200).json({token});
  } catch (e) {
    logger.error(e.message);
    res.status(500).json({msg: 'Internal Error'})
  }
});

router.get('/me', verifyToken, async (req, res, next) => {
  try {
      const user = await handler.getById(req.decoded.userId);
      res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: 'Error getting auht me'});
  }
});

module.exports = router;
