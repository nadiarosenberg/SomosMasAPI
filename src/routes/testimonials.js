var express = require('express');
var router = express.Router();
const {Testimonial} = require('../models');

/*---------------------- POST -------------------------------*/
router.post('/', async(req, res, next) => {
  const body_data = req.body;
  try{
      const testimonial = await Testimonial.create({
        name: body_data.name,
        image: body_data.image,
        content: body_data.content
      })
      res.json(testimonial);
  }catch (err){
      console.log(err);
      res.send('Error posting testimonial')
  }
});

/* ----------------- GET list -----------------------*/
router.get('/', async(req, res, next) => {
  try{
      const testimonial = await Testimonial.findAll();
      res.json(testimonial);
  }catch (err){
      console.log(err);
      res.send('Error getting testimonials')
  }
});

/* ------------------GET by ID ---------------------*/
router.get('/:id', async(req, res, next) => {
  try{
      const testimonial = await Testimonial.findOne(req.body, {
        where: {id: req.params.id}
      })
      res.json(testimonial);
  }catch (err){
      console.log(err);
      res.send('Error getting testimonial')
  }
});

/* -------------------- UPDATE -------------------------- */
router.put('/:id', async(req, res, next) => {
  try{
      const testimonial = await Testimonial.update(req.body, {
        where: {id: req.params.id}
      })
      res.json(testimonial);
  }catch(err){
      console.log(err);
      res.send('Error updating testimonial')
  }
});

/* ---------------- DELETE -------------------- */
router.delete('/:id', async(req, res, next) => {
  try{
      const testimonial = await Testimonial.destroy({
        where: {id: req.params.id}
      })
      res.json(testimonial);
  }catch(err){
    console.log(err);
    res.send('Error deleting testimonial')
  }
});

module.exports = router;