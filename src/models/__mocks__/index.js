'use strict'
const Sequelize = require('sequelize-mock');
const db={};
const sequelize = new Sequelize;

db.organizations = require('../__mocks__/organization.js');
db.Organization = db.organizations;

module.exports = db;