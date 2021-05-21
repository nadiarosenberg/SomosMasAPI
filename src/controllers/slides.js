'use strict';
const express = require('express');
const Router = express.Router();
const handler = require('../handlers/slides');
const isAdmin = require('./middlewares/auth');

const wasUpdated = (result, req, res) => result[0]===1;

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

Router.get('/:id', isAdmin, async (req, res, next) => {
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
    const data = req.body;
    try {
      const slide = await handler.getSlide(id);
      if (!slide) {
        res.status(404).json('Slide not found');
      }else{
      const slideUpdated = await handler.updateSlide(data, id);
        if(wasUpdated(slideUpdated)){
          res.status(200).json("Slide updated successfully");
        }else{
          res.status(404).json('Error updating slide')
        }
      }
    }catch (err) {
      console.log(err);
      res.send("Error updating slide");
    }
});

Router.delete('/:id', isAdmin, async (req, res) => {
    const {id} = req.params;
    try {
      const slide = await handler.getSlide(id);
      if (!slide) {
        res.status(404).json('Slide not found');
      }else{
        const slideDeleted = await handler.deleteSlide(id);
        res.status(200).json('Slide deleted successfully');
      }
    }catch (err) {
      console.log(err);
      res.send('Error deleting slide');
    }
});

module.exports = Router;
