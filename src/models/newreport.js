'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewReport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NewReport.hasOne(models.Category, {as: 'category'});
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