// Requires
const db = require("../models");
const path = require('path');
const jwt = require('jsonwebtoken');
const clave= require ("../clave/clave.js");
const Users = db.users;
const Op = db.Sequelize.Op;
const express=require("express");
const app=express();
//const roleIdMid=require("../middleware/roleId.js");
app.set('llave',clave.llave);


// Create and Save a new user
exports.create = (req, res) => {

  const user = {
    firstName: req.body.name ? req.body.name:'pepe',
	lastName: req.body.lastname ? req.body.lastname:'Fernandez',
	email:req.body.email ? req.body.email:'pp@hotmail.com',
    content: req.body.content ? req.body.content:'esto es el contenido',
    image: req.body.image ? req.body.image : 'randomimage.png',
	password: req.body.password ? req.body.password:'1234ABC',
	roleId: req.body.roleId ? req.body.roleId:'1',
	timestamps: Date.now(),
    isDeleted: false,
  };
  
  // Extensions URL
  const extensionsAvailable = ['png', 'jpg', 'jpeg' ]
  const ext = path.extname(user.image||'').split('.');
  if ( extensionsAvailable.indexOf( ext[ext.length - 1] ) < 0 ) {
    return res.status(400).json({
      ok: false,
      message: 'Invalid url',
      errors: { message: 'You must select a url with extension: ' + extensionsAvailable.join(', ' ) }
    })
  }
  /*--------POST-------------------------------*/
  // Save User in the database
  Users.create(user)
    .then(data => {
		//token info contens roleId
		const payload = {
                            sub:data.id,
							roleId: data.roleId
                          };
						  
        //create token
		const token = jwt.sign(payload, app.get('llave'), {
                                 expiresIn: 144000000000000000000000000000
                                                            });
															
      res.json(
	        {
	           data:data,
			   token:token,
			   message:"Token realizado"
	        }	   
			   );
	  //res.cookie("auth",token);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};




/*-----------------GET ALL---------------------------*/
exports.findAll = (req, res) => {

  Users.findAll({paranoid: false})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// *-------------GET User by id---------*
exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findByPk(id, )
    .then(data => {
      if ( data === null ) {
        res.status(404).send({
          message: `Cannot find User with id = ${id}`
        })
        return;
      }
	   //muestro el idrol
	 // console.log(data.roleId);
	  
	  /*if (data.roleId===1)
	  {
		  console.log("administrador");
		
		
	  }*/
	   
	  
	  res.send(data);
	 
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({
        message: "Error retrieving User with id = " + id
      });
    });
};

