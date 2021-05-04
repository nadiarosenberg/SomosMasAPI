const activities = require("../controllers/activities.js");
const express = require('express');
const router = express.Router();

router.get("/", activities.findAll);
router.get("/:id", activities.findOne);
router.post("/", activities.create);
router.put("/:id", activities.update);
router.delete("/:id", activities.delete);

module.exports = router;

