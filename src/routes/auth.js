var express = require("express");
var router = express.Router();
const authentication = require("../middlewares/auth");
const { validationResult } = require("express-validator");


router.post("/login", authentication, (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ ok: false });
  }

  //db Create Procedure here

  res.json({ email: req.body.email });
});

module.exports = router;
