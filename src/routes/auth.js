var express = require("express");
var router = express.Router();
const authentication = require("../utils/auth");
const { validationResult } = require("express-validator");
const createToken = require('../utils/createToken');
const db = require("../models");
const bcrypt = require('bcryptjs');

router.post("/login", async (req, res, next) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, errors });
    }

    db.User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        res.json({ ok: false, errors: 'El email no coincide' });
      } else {
        if(bcrypt.compareSync(req.body.password, user.password)) {

          const authedUser = {
            email: user.dataValues.email,
            firstName: user.dataValues.firstName,
            lastName: user.dataValues.lastName,
            photo: user.dataValues.photo,
            roleId: user.dataValues.roleId,
          };

          const token = createToken(authedUser);
          res.json({ email: authedUser.email, token });

        } else {

          res.json({ ok: false, errors: 'La contraseña no coincide' });

        }
      }
    });

  } catch(e) {
  console.log(e)
  }

});

module.exports = router;
