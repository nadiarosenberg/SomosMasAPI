'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewReport extends Model {
    static associate(models) {
      NewReport.hasOne(models.Category, {
        as: 'category',
        foreingKey: 'categoryId'
      });
    }
  };
  NewReport.init({
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    timestamps: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    modelName: 'NewReport',
  });
  return NewReport;
};