const router = require('express').Router();
const handler = require('./../handlers/categories');
const {validate} = require('../controllers/middlewares/categories');
const {getPaginationInfo, getPaginationResult} = require('../utils/pagination');
const allowAdmins = require('./middlewares/auth');

router.get('/', async (req, res, next) => {
  try {
    const paginationInfo = getPaginationInfo(req.query);
    const results = await handler.getAllCategories(paginationInfo);
    const route = '/categories';
    const paginationResult = await getPaginationResult(paginationInfo, route, results);
    res.status(200).json(paginationResult);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await handler.getOneCategory(id);
    if (!result) {
      return res.status(404).json({
        ok: false,
        message: `Cannot find Category with id = ${id}`,
      });
    }
    res.status(200).json({
      ok: true,
      result: result,
    });
  } catch (e) {
    console.log(e);
  }
});

router.post('/', allowAdmins, [validate], async (req, res, next) => {
  const category = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image ? req.body.image : 'default-image.png',
    timestamps: Date.now(),
  };

  try {
    const result = await handler.postCategory(category);
    res.status(200).json({
      ok: true,
      result: result,
    });
  } catch (e) {
    if (e.errors[0].validatorKey === 'is_null') {
      return res.status(400).json({
        ok: false,
        error: e.errors[0].message,
      });
    }
  }
});

router.put('/:id', allowAdmins, async (req, res, next) => {
  const id = req.params.id;
  const category = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  };

  try {
    const result = await handler.putCategory(category, id);
    if (result == 1) {
      res.status(200).json({
        ok: true,
        message: 'Category was updated successfully.',
        result: category,
      });
    } else {
      res.send({
        message: `Cannot update Category with id = ${id}. Category was not found or req.body is empty!`,
      });
    }
  } catch (e) {
    res.status(500).send({
      message: 'Error updating Category with id = ' + id,
    });
  }
});

router.delete('/:id', allowAdmins, async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await handler.deleteCategory(id);
    if (result == 1) {
      res.json({
        ok: true,
        message: 'Category was deleted successfully!',
      });
    } else {
      res.json({
        ok: false,
        message: `Cannot delete Category with id = ${id}. Category was not found!`,
      });
    }
  } catch (e) {
    res.status(500).send({
      message: 'Could not delete Category with id = ' + id,
    });
  }
});

module.exports = router;
