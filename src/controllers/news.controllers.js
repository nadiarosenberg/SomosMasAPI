// Requires
const db = require("../models");
const path = require('path');

const New = db.news;
const Op = db.Sequelize.Op;


// Create and Save a New
exports.create = (req, res) => {
  // Create a New

  const newObj = {
    name: req.body.name,
    content: req.body.description,
    image: req.body.image,
    categoryId: req.body.categoryId,
    timestamps: Date.now()
  };
  
  // Extensions URL
  const extensionsAvailable = ['png', 'jpg', 'jpeg' ]
  const ext = path.extname(newObj.image||'').split('.');
  if ( extensionsAvailable.indexOf( ext[ext.length - 1] ) < 0 ) {
    return res.status(400).json({
      ok: false,
      message: 'Invalid url',
      errors: { message: 'You must select a url with extension: ' + extensionsAvailable.join(', ' ) }
    })
  }
  
  // Save New in the database
  New.create(newObj)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the New."
      });
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {

  New.findAll({paranoid: false})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving news."
      });
    });
};

// Find a single New with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  New.findByPk(id, )
    .then(data => {
      if ( data === null ) {
        res.status(404).send({
          message: `Cannot find New with id = ${id}`
        })
        return;
      }
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving New with id = " + id
      });
    });
};

// Update a New by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  New.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "New was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update New with id = ${id}. New was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating New with id = " + id
      });
    });
};

// Delete a New with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  New.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "New was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete New with id = ${id}. New was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete New with id = " + id
      });
    });
};
