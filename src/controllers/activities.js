const expressRouter = require('express').Router();
const path = require('path');
const handler = require('../handlers/activity');
const logger = require('../utils/pinoLogger');

// borrar
// const Activity = db.activity;
// const Op = db.Sequelize.Op;

expressRouter.post('/', async (req, res) => {
  try {
    const activity = {
      name: req.body.name ? req.body.name : 'pepe',
      content: req.body.content ? req.body.content : 'Loren',
      image: req.body.image ? req.body.image : 'randomimage.png'
    };
  
    const extensionsAvailable = ['png', 'jpg', 'jpeg'];
    const ext = path.extname(activity.image || '').split('.');
    if (extensionsAvailable.indexOf(ext[ext.length - 1]) < 0) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid url',
        errors: { message: 'You must select a url with extension: ' + extensionsAvailable.join(', ') }
      })
    }

    const newActivity = await handler.createActivity(activity);
    logger.info({ id: newActivity.id }, 'Activity created successfully');
    res.status(201).json({
      id: newActivity.id,
      message: 'Activity created successfully'
    })
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message});
  }
})

// exports.create = (req, res) => {
  // Create a activity

  /*--------POST-------------------------------*/
  // Save Activity in the database
//   Activity.create(activity)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Activity."
//       });
//     });
// };

// exports.findAll = (req, res) => {

//   Activity.findAll({ paranoid: false })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Activity."
//       });
//     });
// };

// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Activity.findByPk(id,)
//     .then(data => {
//       if (data === null) {
//         res.status(404).send({
//           message: `Cannot find Activity with id = ${id}`
//         })
//         return;
//       }
//       res.send(data);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).send({
//         message: "Error retrieving Activity with id = " + id
//       });
//     });
// };

// exports.update = (req, res) => {
//   const id = req.params.id;
//   Activity.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Activity was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update Activity with id = ${id}. Activity was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Activity with id = " + id
//       });
//     });
// };

// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Activity.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Activity was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Activity with id = ${id}. Activity was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Activity with id = " + id
//       });
//     });
// };

module.exports = expressRouter;