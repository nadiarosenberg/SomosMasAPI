'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    static associate(models) {
      Slide.belongsTo(models.Organization, {
        as: 'organization',
        foreignKey: 'organizationId',
      });
    }
  }
  Slide.init(
    {
      imageUrl: {
        type: DataTypes.STRING,
      },
      text: DataTypes.STRING,
      order: DataTypes.INTEGER,
      organizationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Slide',
      tableName: 'Slides',
      timestamps: true,
      paranoid: true,
    }
  );
  return Slide;
};
