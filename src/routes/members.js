const express = require('express');
const router = express.Router();
const members = require('../controllers/members');

router.post('/', members.create);
router.get('/', members.findAll);
router.get('/:id', members.findOne);
router.put('/:id', members.update)

module.exports = router;