'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    static associate(models) {
      // define association here
    }
  }
  Contacts.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'name is required',
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'email is required',
          },
        },
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Contact',
      timestamps: true,
      paranoid: true,
    }
  );
  return Contacts;
};
