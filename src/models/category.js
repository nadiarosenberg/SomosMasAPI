'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
     static associate(models) {
      Category.hasMany(models.NewReport, {
        as: 'newreport'
      });
    }
  };
  Category.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    timestamps: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'Category',
  });
  return Category;
};