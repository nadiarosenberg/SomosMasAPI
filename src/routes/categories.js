const categories = require("../controllers/categories.js");
const express = require('express');
const router = express.Router();

router.get("/", categories.findAll);

router.get("/:id", categories.findOne);

router.post("/", categories.create);

router.put("/:id", categories.update);

router.delete("/:id", categories.delete);

module.exports = router;
