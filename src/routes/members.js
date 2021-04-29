const express = require('express');
const router = express.Router();
const members = require('../controllers/members.controllers');

router.post('/', members.create);
router.get('/', members.findAll);
router.get('/:id', members.findOne);

module.exports = router;