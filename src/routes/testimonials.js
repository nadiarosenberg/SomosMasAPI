const express = require('express');
const router = express.Router();
const testimonials = require('../controllers/testimonials');

router.post('/', testimonials.create);
router.get('/', testimonials.findAll);
router.get('/:id', testimonials.findOne);
router.put('/:id', testimonials.update)
router.delete('/:id', testimonials.destroy)

module.exports = router;