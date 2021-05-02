'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Slide.belongsTo(models.Organization, 
      {
        as: 'organization',
        foreignKey: 'organizationId'
      }
    );
    }
  };
  Slide.init({
    imageUrl:{
      type: DataTypes.STRING,
      validate:{
        is:{
          args: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g,
          msg: "You must enter an image url"
        }
      }
    },
    text: DataTypes.STRING,
    order: {
      type: DataTypes.INTEGER,
      unique: true
    },
    organizationId: DataTypes.INTEGER
    }, {
    sequelize,
    modelName: 'Slide',
    tableName: 'Slides',
    timestamps: true,
    paranoid: true
  });
  return Slide;
};