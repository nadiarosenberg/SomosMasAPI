const newreports = require("../controllers/newreports.js");
const express = require('express');
const router = express.Router();

router.get("/", newreports.findAll);

router.get("/:id", newreports.findOne);

router.put("/:id", newreports.update);

module.exports = router;
