'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewReport extends Model {
    static associate(models) {
      NewReport.hasOne(models.Category, {
        as: 'category',
        foreingKey: 'categoryId',
      });
    }
  }
  NewReport.init(
    {
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
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'content is required',
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'type is required',
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
      timestamps: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: 'NewReport',
    }
  );
  return NewReport;
};
