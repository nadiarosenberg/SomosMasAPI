const express = require('express');
const router = express.Router();
const slides = require('../controllers/slides');

router.post('/', slides.create);
router.get('/', slides.findAll);
router.get('/:id', slides.findOne);
router.put('/:id', slides.update);
router.delete('/:id', slides.destroy);

module.exports = router;