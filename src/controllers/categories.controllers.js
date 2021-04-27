// Requires
const db = require("../models");
const path = require('path');

const Category = db.categories;
const Op = db.Sequelize.Op;


// Create and Save a new Category
exports.create = (req, res) => {
  // Create a Category

  const category = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image ? req.body.image : 'randomimage.png',
    timestamps: Date.now(),
    isDeleted: false,
  };
  
  // Extensions URL
  const extensionsAvailable = ['png', 'jpg', 'jpeg' ]
  const ext = path.extname(category.image||'').split('.');
  if ( extensionsAvailable.indexOf( ext[ext.length - 1] ) < 0 ) {
    return res.status(400).json({
      ok: false,
      message: 'Invalid url',
      errors: { message: 'You must select a url with extension: ' + extensionsAvailable.join(', ' ) }
    })
  }
  
  // Save Category in the database
  Category.create(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {

  Category.findAll({paranoid: false})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
};

// Find a single Category with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Category.findByPk(id, )
    .then(data => {
      if ( data === null ) {
        res.status(404).send({
          message: `Cannot find Category with id = ${id}`
        })
        return;
      }
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving Category with id = " + id
      });
    });
};

// Update a Category by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Category.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Category with id = ${id}. Category was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category with id = " + id
      });
    });
};

// Delete a Category with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Category.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Category with id = ${id}. Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id = " + id
      });
    });
};
