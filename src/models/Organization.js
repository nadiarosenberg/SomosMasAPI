'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Organization extends Model {
    static associate(models) {
      // define association here
    }
  };

  Organization.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    adress: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    welcomeText: DataTypes.TEXT,
    aboutUsText: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Organization', 
    timestamps: true,
    paranoid: true,
  });

  return Organization;
};