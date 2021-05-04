const express = require('express');
const router = express.Router();
const { userValidationRules, validate } = require('../utils/userValidation')
const { User } = require('../models/index')
const bcrypt = require('bcryptjs');
const roleIdMiddleware = require("../middleware/roleId.js");
const users = require("../controllers/users.js");

router.post('/auth/register', userValidationRules(), validate, async (req, res, next) => {
  const newUser = req.body
  const data = await User.create({
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    password: bcrypt.hashSync(newUser.password, 8),
    createdAt: new Date(),
    updatedAt: new Date()
  })
  res.json(data)
})

router.get("/:id", roleIdMiddleware, users.findOne);

router.get("/", users.findAll);

router.put('/:id', userValidationPutRules(), validate, async (req, res, next) => {
  try {
    const newUser = req.body;
    if (newUser.password) {
      newUser.password = bcrypt.hashSync(newUser.password, 8);
    }
    const data = await User.update(newUser, {
      where: {
        id: req.params.id
      }
    });
    data[0] === 1 ? res.json({
      ok: true,
      msj: 'user updated successfully'
    }) : res.status(400).json({
      ok: false,
      msj: 'failed to update user'
    });
  } catch (e) {
    res.status(400).json({
      ok: false,
      msj: 'failed to update user'
    });
  }
})

module.exports = router;
