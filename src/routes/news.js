const news = require("../controllers/news.controllers.js");
const express = require('express');
const router = express.Router();

// Get all News
router.get("/", news.findAll);

// Get a single New with id
router.get("/:id", news.findOne);

// Create a new New
router.post("/", news.create);

// Update a New with id
router.put("/:id", news.update);

// Delete a New with id
router.delete("/:id", news.delete);
module.exports = router;
