'use strict';
const express = require('express');
const router = express.Router();
const {userValidationRules, validate, userValidationPutRules} = require('./middlewares/users');
const handler = require('./../handlers/users');
const jwt = require('jsonwebtoken');
const allowAdmins = require('./middlewares/auth');
const app = express();
const key = require('../utils/key');
const sendWelcomEmail = require('../utils/welcomEmail');
app.set('key', key.key);
const createToken = require('../utils/createToken');

const wasUpdated = (result, req, res) => {
  result[0] === 1
    ? res.json({
        ok: true,
        msj: 'user updated successfully',
      })
    : res.status(400).json({
        ok: false,
        msj: 'failed to update user',
      });
};

router.post('/auth/register', allowAdmins, userValidationRules(), validate, async (req, res, next) => {
  try {
    const user = req.body;
    const result = await handler.createUser(user);
    console.log('cree el usuario');
    sendWelcomEmail(result.email, result.firstName, result.lastName);
    console.log('envie el mail');
    if (result) {
      const token = await createToken(result);
      res.json(token);
    } else {
      res.status(500).json('Error creating token');
    }
  } catch (e) {
    res.status(400).json({
      ok: false,
      msj: 'failed to create user',
    });
  }
});

router.put('/:id', allowAdmins, userValidationPutRules(), validate, async (req, res, next) => {
  try {
    const user = req.body;
    const id = req.params.id;
    const result = await handler.updateUser(id, user);
    wasUpdated(result, req, res);
  } catch (e) {
    res.status(400).json({
      ok: false,
      msj: 'failed to update user',
    });
  }
});

router.get('/', allowAdmins, async (req, res, next) => {
  try {
    const results = await handler.getAllUsers();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json('Error getting users');
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const user = await handler.getUserById(id);

    if (!user) {
      console.log('User not found');
      res.status(404).json({message: 'User not found'});
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

router.delete('/:id', allowAdmins, async (req, res, next) => {
  try {
    const {id} = req.params;

    let user = await handler.getUserById(id);

    if (!user) {
      console.log('User not found');
      res.status(404).json({message: 'User not found'});
      return;
    }

    await handler.deleteUser(id);

    console.log('User deleted successfully');
    res.status(200).json({message: 'User deleted successfully'});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

router.get('/auth/me', async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.send({message: 'widthout headers authorization'});
    }

    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, app.get('key'), async (err, decoded) => {
      if (err) {
        return res.json({mensaje: 'invalid Token  or without token'});
      }

      const id = decoded.id;

      const results = await handler.getById(id);
      res.status(200).json(results);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json('Error getting auht me');
  }
});

module.exports = router;
