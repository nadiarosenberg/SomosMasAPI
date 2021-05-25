'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Testimonial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Testimonial.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Name is required',
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          is: {
            args: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g,
            msg: 'You must enter an image url',
          },
        },
      },
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Testimonial',
      tableName: 'Testimonials',
      timestamps: true,
      paranoid: true,
    }
  );
  return Testimonial;
};
