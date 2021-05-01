// Requires
const db = require("../models");
const path = require('path');
const errorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/emailSender');
const userData = require('../utils/fakeData');

const emailsSource = require('../utils/fakeEmailSource');

const NewReport = db.newreports;
const Op = db.Sequelize.Op;

// Var
const emailSource = emailsSource('newReport');

module.exports = {
  create: (req, res) => {
  
    const newreport = {
      name: req.body.name,
      content: req.body.content,
      image: req.body.image,
      categoryId: req.body.categoryId,
      timestamps: Date.now()
    };
    
    const extensionsAvailable = ['png', 'jpg', 'jpeg' ]
    const ext = path.extname(newreport.image||'').split('.');
    if ( extensionsAvailable.indexOf( ext[ext.length - 1] ) < 0 ) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid url',
        errors: { message: 'You must select a url with extension: ' + extensionsAvailable.join(', ' ) }
      })
    }
    
    NewReport.create(newreport)
      .then(data => {
        const message = {
          from: emailSource.email, 
          to: userData.email,
          subject: 'Your new report was created successfully',
          text: `${userData.firstName} your new report called ${data.name} was created without a problem.`
        };

        sendEmail(emailSource, message);
        res.send(data);
        
      })
      .catch(err => {
        console.log(err);
        // return res.status(500).send(err) // this code is for testing method
        const friendlyError = errorHandler(err);
        res.status(friendlyError.statusCode)
            .send(friendlyError.message);
      });
  },
  findAll: (req, res) => {
  
    NewReport.findAll({paranoid: false})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving new reports."
        });
      });
  },
  findOne: (req, res) => {
    const id = req.params.id;
  
    NewReport.findByPk(id, )
      .then(data => {
        if ( data === null ) {
          res.status(404).send({
            message: `Cannot find NewReport with id = ${id}`
          })
          return;
        }
        res.send(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          message: "Error retrieving NewReport with id = " + id
        });
      });
  },
  update: (req, res) => {
    const id = req.params.id;
    NewReport.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "NewReport was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update NewReport with id = ${id}. NewReport was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating NewReport with id = " + id
        });
      });
  },
  delete: (req, res) => {
    const id = req.params.id;
  
    NewReport.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "NewReport was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete NewReport with id = ${id}. NewReport was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete NewReport with id = " + id
        });
      });
  }

}

