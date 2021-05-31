'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
    }
  }
  Organization.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'name is required',
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'image is required',
          },
        },
      },
      address: DataTypes.STRING,
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'email is required',
          },
          isEmail: true,
        },
      },
      welcomeText: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'welcomeText is required',
          },
        },
      },
      aboutUsText: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Organization',
      tableName: 'Organizations',
      timestamps: true,
      paranoid: true,
    }
  );

  return Organization;
};
