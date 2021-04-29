const express = require('express');
const router = express.Router();
const members = require('../controllers/members.controllers');

router.post('/', members.create);



module.exports = router;