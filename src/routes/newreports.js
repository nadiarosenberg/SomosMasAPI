const newreports = require("../controllers/newreports.js");
const express = require('express');
const router = express.Router();

router.get("/", newreports.findAll);

router.get("/:id", newreports.findOne);

router.post("/", newreports.create);

router.put("/:id", newreports.update);

router.delete("/:id", newreports.delete);

module.exports = router;
