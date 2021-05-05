const express = require("express");
const router = express.Router();
const slidesCtrl = require("../controllers/slides");
const isAdmin = require("../middleware/roleId.js");

router.post("/", isAdmin, slidesCtrl.create);
router.get("/", isAdmin, slidesCtrl.findAll);
router.get("/:id", isAdmin, slidesCtrl.findOne);
router.put("/:id", isAdmin, slidesCtrl.update);
router.delete("/:id", isAdmin, slidesCtrl.destroy);

module.exports = router;
