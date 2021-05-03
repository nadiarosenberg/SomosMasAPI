var express = require('express');
var router = express.Router();
const {Testimonial} = require('../models');

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

router.get('/', async(req, res, next) => {
  try{
      const testimonial = await Testimonial.findAll();
      res.json(testimonial);
  }catch (err){
      console.log(err);
      res.send('Error getting testimonials')
  }
});

router.get('/:id', async(req, res, next) => {
  const id_body = req.params.id;
  try{
      const testimonial = await Testimonial.findOne({
        where: {id: id_body}
      })
      res.json(testimonial);
  }catch (err){
      console.log(err);
      res.send('Error getting testimonial')
  }
});

router.put('/:id', async(req, res, next) => {
  const testimonial_id = req.params.id;
  try{
      const testimonial = await Testimonial.update(req.body, {
        where: {id: testimonial_id}
      })
      res.json(testimonial);
  }catch(err){
      console.log(err);
      res.send('Error updating testimonial')
  }
});

router.delete('/:id', async(req, res, next) => {
  const testimonial_id = req.params.id;
  try{
      const testimonial = await Testimonial.destroy({
        where: {id: testimonial_id}
      })
      res.json(testimonial);
  }catch(err){
    console.log(err);
    res.send('Error deleting testimonial')
  }
});

module.exports = router;