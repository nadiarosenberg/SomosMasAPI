'use strict'
var express = require('express');
var Router = express.Router();

Router.post('/', async (req, res, next)=>{
  try {
    const slide = req.body;
    const result = await handler.createSlide(slide);
    res.status(200).json(result);
  }catch (err) {
    console.log(err);
    res.send("Error posting slide");
  }
});

Router.get('/', async(req, res, next)=>{
    try {
      const result = await handler.getSlides(slide);
      res.json(slide);
    } catch (err) {
      console.log(err);
      res.send("Error getting slides");
    }
});

Router.get('/:id', async (req, res, next) => {
  try {
    const slideId = req.params.id;
    const slide = await handler.getSlide(slideId);
    if (slide) {
      res.json(slide);
    } else {
      res.status(404).json("Slide not found");
    }
  }catch (err) {
    console.log(err);
    res.send("Error getting slide");
  }
});

Router.put('/:id', async (req, res) => {
    const slideId = req.params.id;
    const slide = req.body;
    try {
      const result = await handler.updateSlide(slideId, slide);
      if (slide) {
        res.status(200).json("Slide updated successfully");
      } else {
        res.status(404).json("Slide does not exist");
      }
    } catch (err) {
      console.log(err);
      res.send("Error updating slide");
    }
});

Router.delete('/:id', async (req, res) => {
    const slideId = req.params.id;
    try {
      const slide = await hadler.deleteSlide(slideId);
      if (slide) {
        res.status(200).json("Slide deleted successfully");
      } else {
        res.status(404).json("Slide does not exist");
      }
    } catch (err) {
      console.log(err);
      res.send("Error deleting slide");
    }
});

module.exports = Router;
