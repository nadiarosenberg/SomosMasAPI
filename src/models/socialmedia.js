'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    static associate(models) {
      SocialMedia.hasMany(models.Organization, {
        as: 'organization'
      });
    }
  };
  SocialMedia.init({
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    linkedin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SocialMedia',
    timestamps: true,
    paranoid: true
  });
  return SocialMedia;
};