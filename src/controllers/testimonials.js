const router = require('express').Router();
const handler = require('./../handlers/testimonials');
const logger = require('../utils/pinoLogger');
const {testimonialValidationPutRules, testimonialValidationPostRules, validate} = require('./middlewares/testimonials');
const isAdmin = require('./middlewares/auth');
const pagination = require('../utils/pagination');

const wasUpdated = result => {
  var bool;
  result[0] === 1 ? (bool = true) : (bool = false);
  return bool;
};

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const paginationInfo = pagination.getPaginationInfo(req.query);
    const results = await handler.getAllTestimonials(paginationInfo);
    const route = '/testimonials';
    const paginationResult = await pagination.getPaginationResult(paginationInfo, route, results);
    res.status(200).json(result);
  } catch (e) {
    console.log('\n\n H');
    logger.error(e.message);
    res.send({
      message: 'Error posting testimonial',
    });
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await handler.getOneTestimonial(id);
    if (result) {
      res.json(result);
    } else {
      logger.warn('Testimonial not found');
      res.status(404).json({
        message: 'Testimonial not found',
      });
    }
  } catch (error) {
    logger.error(error.message);
    res.status(500).send('Error getting testimonial');
  }
});

router.post('/', isAdmin, testimonialValidationPostRules(), validate, async (req, res, next) => {
  const testimonial = {
    name: req.body.name,
    image: req.body.image,
    content: req.body.content,
  };

  try {
    const result = await handler.postTestimonial(testimonial);
    logger.info(
      {
        id: result.id,
      },
      'Testimonial created successfully'
    );
    res.json(result);
  } catch (e) {
    logger.error(e.message);
    res.send({
      message: 'Error posting testimonial',
    });
  }
});

router.put('/:id', /*isAdmin,*/ testimonialValidationPutRules(), validate, async (req, res, next) => {
  const id = req.params.id;
  const testimonial = req.body;
  try {
    const result = await handler.getOneTestimonial(id);

    if (result) {
      const testimonialUpdated = await handler.putTestimonial(testimonial, id);
      if (wasUpdated(testimonialUpdated)) {
        logger.info('Testimonial updated successfully');
        res.status(200).json({
          message: 'Testimonial updated successfully',
        });
      }
      logger.info('Testimonial updated failed');
      res.status(404).json({
        message: 'Testimonial updated failed',
      });
    } else {
      logger.warn('Testimonial not found');
      res.status(404).json({
        message: 'Testimonial not found',
      });
    }
  } catch (e) {
    logger.error(e.message);
    res.send({
      message: 'Error updating testimonial',
    });
  }
});

router.delete('/:id', isAdmin, async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await handler.getOneTestimonial(id);

    if (result) {
      const testimonialDeleted = await handler.deleteTestimonial(id);
      logger.info('Testimonial deleted successfully');
      res.status(200).json({
        message: 'Testimonial deleted successfully',
      });
    } else {
      logger.warn('Testimonial not found');
      res.status(404).json({
        message: 'Testimonial not found',
      });
    }
  } catch (e) {
    logger.error(e.message);
    res.send({
      message: 'Error deleted testimonial',
    });
  }
});

module.exports = router;
