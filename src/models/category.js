'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.NewReport, {
        as: 'newreport',
      });
    }
  }
  Category.init(
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
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      timestamps: DataTypes.STRING,
    },
    {
      sequelize,
      paranoid: true,
      timestamps: true,
      modelName: 'Category',
    }
  );
  return Category;
};
