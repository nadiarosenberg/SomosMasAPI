var express = require('express');
var router = express.Router();
const {userValidationRules, validate} = require('../utils/userValidation');
const {User} = require('../models/index');
const bcrypt = require('bcryptjs');
const roleIdMiddleware = require('../controllers/middlewares/roleId.js');
const users = require('../controllers/users.js');

router.post('/auth/register', userValidationRules(), validate, async (req, res, next) => {
  const newUser = req.body;
  const data = await User.create({
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    password: bcrypt.hashSync(newUser.password, 8),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.json(data);
});

router.get('/:id', roleIdMiddleware, users.findOne);

router.get('/', users.findAll);

module.exports = router;
