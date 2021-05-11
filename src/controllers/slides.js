'use strict';
const express = require('express');
const Router = express.Router();
const handler = require('../handlers/slides');
const isAdmin = require('./middlewares/auth');

Router.post('/', isAdmin, async (req, res, next) => {
    try {
      const slide = req.body;
      const result = await handler.createSlide(slide);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.send('Error posting slide');
    }
  }
);

Router.get('/', isAdmin, async (req, res, next) => {
    try {
      const result = await handler.getSlides();
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.send('Error getting slides');
    }
  }
);

Router.get('/:id', async (req, res, next) => {
    try {
      const {id} = req.params;
      const slide = await handler.getSlide(id);
      if (slide) {
        res.json(slide);
      } else {
        res.status(404).json('Slide not found');
      }
    } catch (err) {
      console.log(err);
      res.send('Error getting slide');
    }
  }
);

Router.put('/:id', isAdmin, async (req, res) => {
    const {id} = req.params;
    const slide = req.body;
    console.log(slide);
    try {
      const slideToUpdate = await handler.getSlide(id);
    if (!slideToUpdate) {
      res.status(404).json('Slide not found');
    }else{
      const slideUpdated = await handler.updateSlide(slide, id);
      console.log(slideUpdated);
      res.status(200).json("Slide updated successfully");
    }
    }catch (err) {
      console.log(err);
      res.send("Error updating slide");
  }
});

Router.delete('/:id', isAdmin, async (req, res) => {
    const {id} = req.params;
    try {
      const slide = await handler.deleteSlide(id);
      if (slide) {
        res.status(200).json('Slide deleted successfully');
      } else {
        res.status(404).json('Slide does not exist');
      }
    } catch (err) {
      console.log(err);
      res.send('Error deleting slide');
    }
  }
);

module.exports = Router;
