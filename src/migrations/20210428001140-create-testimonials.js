'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Testimonials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
        /*validate: {
          notNull: {
            args: true,
            msg: 'Name is required'
          }
        }*/
      },
      image: {
        type: Sequelize.STRING
        /*isUrl: {msg : 'You must enter a valid url'}
        validate:{
          is:{
            args: ["/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i"],
            msg: "You must enter an image url"
          }
        }*/
      },
      content: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt:{
        type: Sequelize.DATE
      },
      deletedAt:{
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Testimonials');
  }
};