const commentsRouter = require('express').Router();
const handler = require('./../handlers/comments');
const logger = require('../utils/pinoLogger');
const allowAdmins = require('./middlewares/auth');
const isAdminOrOwnsership = require('./middlewares/ownership');
const {commentValidationPost, validate} = require('./middlewares/comments');

commentsRouter.delete('/:id', allowAdmins, async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await handler.getCommentById(id);
    if (!comment) {
      res.status(404).send('Comment not found!');
    }
    const result = await handler.deleteComments(id);
    res.status(200).send('Comment was deleted successfully!');
  } catch (e) {
    res.status(400).send(e.messege);
  }
});

commentsRouter.get('/', allowAdmins, async (req, res, next) => {
  try {
    const result = await handler.getAllComments();
    res.json(result);
  } catch (e) {
    logger.error(e.message);
    res.send({
      message: 'Error getting Comments',
    });
  }
});

commentsRouter.post('/', commentValidationPost(), validate, async (req, res, next) => {
  const comment = {
    newReportId: req.body.newReportId,
    userId: req.body.userId,
    body: req.body.body,
    timestamps: Date.now(),
  };
  try {
    const result = await handler.postComment(comment);
    logger.info(
      {
        id: result.id,
      },
      'Comment created successfully'
    );
    res.json(result);
  } catch (e) {
    logger.error(e.message);
    res.send({
      message: 'Error posting Comment',
    });
  }
});

commentsRouter.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const results = await handler.getCommentById(id);
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(404).send('No comments for that id');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({message: error.message});
  }
});

commentsRouter.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const comment = req.body;
  try {
    const result = await handler.getCommentById(id);
    if (result) {
      logger.info('Comment updated successfully');
      res.status(200).json({
        message: 'Comment updated successfully',
      });
    } else {
      logger.warn('Comment not found');
      res.status(404).json({
        message: 'Comment not found',
      });
    }
  } catch (e) {
    logger.error(e.message);
    res.send({
      message: 'Error updating Comment',
    });
  }
});

module.exports = commentsRouter;
