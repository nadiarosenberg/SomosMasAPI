'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    static associate(models) {
      SocialMedia.belongsTo(models.Organization, {
        as: 'organization',
        foreignKey: 'organizationId',
      });
    }
  }
  SocialMedia.init(
    {
      facebook: DataTypes.STRING,
      instagram: DataTypes.STRING,
      linkedin: DataTypes.STRING,
      organizationId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'SocialMedia',
      timestamps: true,
      paranoid: true
    }
  );
  return SocialMedia;
};
