'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Activities.init({
    name: {
		   type: DataTypes.STRING,
		   allowNull: false,
		    validate: {
                       notNull: 
					   {
                         args: true,
                         msg: 'name is required'
                       }
      }
	},
    content: DataTypes.STRING,
    image: DataTypes.STRING,
	timestamps: DataTypes.STRING
  }, {
    sequelize,
	paranoid: true,
    timestamps: true,
    modelName: 'Activities',
  });
  return Activities;
};
