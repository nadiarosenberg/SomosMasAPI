'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SocialMedia.init({
    facebook: DataTypes.STRING,
    instagram: DataTypes.STRING,
    linkedin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SocialMedia',
  });
  return SocialMedia;
};