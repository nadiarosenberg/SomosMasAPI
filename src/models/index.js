'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../../config/config.js').development;
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.testimonials = require("./testimonial")(sequelize, Sequelize);
db.categories = require("./category")(sequelize, Sequelize);
db.newreports = require("./newreport")(sequelize, Sequelize);
db.users = require("./user")(sequelize, Sequelize);
db.activities = require("./activities")(sequelize, Sequelize);
db.slides = require("./slide.js")(sequelize, Sequelize);

module.exports = db;
