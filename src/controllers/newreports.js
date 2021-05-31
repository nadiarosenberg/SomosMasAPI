const newReportsRouter = require('express').Router();
const handler = require('../handlers/newreports');
const {checkIdInPath} = require('./middlewares/common');
const db = require('../models');
const path = require('path');
const errorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/emailSender');
const userData = require('../utils/fakeData');
const allowAdmins = require('./middlewares/auth');
const emailsSource = require('../utils/fakeEmailSource');
const pagination = require('../utils/pagination');
const logger = require('../utils/pinoLogger');
const {paginationValidation, validate} = require('./middlewares/pagination');

const emailSource = emailsSource('newReport');

const isNotEmpty = result => {
  var bool;
  result.length === 0 ? (bool = null) : (bool = 1);
  return bool;
};

newReportsRouter.get('/', allowAdmins, paginationValidation(), async (req, res) => {
  try {
    const paginationInfo = pagination.getPaginationInfo(req.query);
    const results = await handler.getAllNewReports(paginationInfo);
    const route = '/news';
    const paginationResult = await pagination.getPaginationResult(paginationInfo, route, results);
    res.status(200).json(paginationResult);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({message: 'Error getting news'});
  }
});

newReportsRouter.get('/:id', allowAdmins, async (req, res) => {
  const {id} = req.params;
  try {
    let newReport = await handler.getNewReportById(id);

    if (!newReport) {
      res.status(404).json({
        message: `Cannot find NewReport with id = ${id}`,
      });
    }

    res.status(200).json(newReport);
  } catch (error) {
    res.status(500).json({
      message: `Error retrieving NewReport with id = ${id}`,
    });
  }
});

newReportsRouter.put('/:id', allowAdmins, async (req, res, next) => {
  try {
    const {id} = req.params;
    const updateValues = req.body;

    let newreport = await handler.getNewReportById(id);

    if (!newreport) {
      res.status(404).json({message: 'NewReport not found'});
      return;
    }

    await handler.updateNewReport(id, updateValues);
    res.status(200).json({message: 'NewReport updated successfully'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

newReportsRouter.delete('/:id', allowAdmins, checkIdInPath, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await handler.deleteNewReport(id);
    if (!result) throw new Error(`Cannot delete NewReport with id = ${id}. NewReport was not found!`);
    res.status(200).send('NewReport was deleted successfully!');
  } catch (e) {
    res.status(400).send(e.message);
  }
});

newReportsRouter.post('/', allowAdmins, async (req, res) => {
  try {
    const newreport = req.body;
    const result = await handler.createNewReport(newreport);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      ok: false,
      msj: 'failed to create news',
    });
  }
});

newReportsRouter.get('/:id/comments', async (req, res) => {
  try {
    const {id} = req.params;
    const results = await handler.getAllByNewReportId(id);
    if (isNotEmpty(results)) {
      res.status(200).json(results);
    } else {
      res.status(404).send('No comments for that id');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({message: error.message});
  }
});


module.exports = newReportsRouter;
