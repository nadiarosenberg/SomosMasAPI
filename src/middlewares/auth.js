const { body, check } = require("express-validator");
const db = require("../models");

module.exports = [
  body("email").isEmail().withMessage("Must be valide E-mail format").bail(),

  body("password").notEmpty().withMessage("Password cannot be Empty").bail(),

  body("email")
    .custom((value, { req }) => {
      return db.User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((userEmail) => {
        if (!userEmail) {
          throw new Error("E-mail not found");
        } else {
          if (userEmail.password == req.body.password) {
            return true;
          } else {
            throw new Error("Password does not match");
          }
        }
      });
    })
    .bail(),
];
