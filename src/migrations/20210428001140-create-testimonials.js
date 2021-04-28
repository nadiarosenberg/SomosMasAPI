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
        //allowNull: false
      },
      image: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt:{
        type: Sequelize.DATE,
      },
      deletedAt:{
        type: Sequelize.DATE,
      }
      /*timestamps:{
        type: Sequelize.INTEGER
      }*/
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Testimonials');
  }
};