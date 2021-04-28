const newreports = require("../controllers/newreports.controllers.js");
const express = require('express');
const router = express.Router();

// Get all News
router.get("/", newreports.findAll);

// Get a single New with id
router.get("/:id", newreports.findOne);

// Create a new New
router.post("/", newreports.create);

// Update a New with id
router.put("/:id", newreports.update);

// Delete a New with id
router.delete("/:id", newreports.delete);

module.exports = router;
