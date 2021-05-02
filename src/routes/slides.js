var express = require('express');
var router = express.Router();
const {Slide} = require('../models');

router.post('/', async(req, res, next) => {
  const body_data = req.body;
  try{
      const slide = await Slide.create({
        imageUrl: body_data.imageUrl,
        text: body_data.text,
        order: body_data.order,
        organizationId: body_data.organizationId
      })
      res.json(slide);
  }catch (err){
      console.log(err);
      res.send('Error posting slide')
  }
});

router.get('/', async(req, res, next) => {
  try{
      const slide = await Slide.findAll();
      res.json(slide);
  }catch (err){
      console.log(err);
      res.send('Error getting slides')
  }
});

router.get('/:id', async(req, res, next) => {
  try{
      const slide = await Slide.findOne(req.body, {
        where: {id: req.params.id}
      })
      res.json(slide);
  }catch (err){
      console.log(err);
      res.send('Error getting slide')
  }
});

router.put('/:id', async(req, res, next) => {
  try{
      const slide = await Slide.update(req.body, {
        where: {id: req.params.id}
      })
      res.json(slide);
  }catch(err){
      console.log(err);
      res.send('Error updating slide')
  }
});

router.delete('/:id', async(req, res, next) => {
  try{
      const slide = await Slide.destroy({
        where: {id: req.params.id}
      })
      res.json(slide);
  }catch(err){
    console.log(err);
    res.send('Error deleting slide')
  }
});

module.exports = router;