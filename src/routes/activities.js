const activities = require("../controllers/activities.js");
const express = require('express');
const router = express.Router();

// Get all Posts
router.get("/", activities.findAll);

// Get a single Post with id
router.get("/:id", activities.findOne);

// Create a new Post
router.post("/", activities.create);

// Update a Post with id
router.put("/:id", activities.update);

// Delete a Post with id
router.delete("/:id", activities.delete);
module.exports = router;


/*var express = require('express');
var router = express.Router();
const {Activities} = require('../models');


router.post('/', async(req, res, next) => {
  const body_data = req.body;
  
  try{
	  
      const activities = await Activities.create({
        name: body_data.name,
        image: body_data.image,
        content: body_data.content
      })
      res.json(activities);
  }catch (err){
      console.log(err);
      res.send('Error in post from activites')
  }
});


router.get('/', async(req, res, next) => {

  try{
      const activities = await Activities.findAll();
      res.json(activities);
  }catch (err){
      console.log(err);
      res.send('Error in get activities')
  }
});


router.get('/:id', async(req, res, next) => {
  try{
      const activities = await Activities.findOne(req.body, {
        where: {id: req.params.id}
      })
      res.json(activities);
  }catch (err){
      console.log(err);
      res.send('Error in get by id activities')
  }
});


router.put('/:id', async(req, res, next) => {
  try{
      const activities = await Activities.update(req.body, {
        where: {id: req.params.id}
      })
      res.json(activities);
  }catch(err){
      console.log(err);
      res.send('Error in update activities')
  }
});


router.delete('/:id', async(req, res, next) => {
  try{
      const activities = await Activities.destroy({
        where: {id: req.params.id}
      })
      res.json(activities);
  }catch(err){
    console.log(err);
    res.send('Error in delete activities')
  }
});

module.exports = router;*/