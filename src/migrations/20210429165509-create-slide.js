'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Slides', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageUrl:{
        type: Sequelize.STRING,
        validate:{
          is:{
            args: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g,
            msg: "You must enter an image url"
          }
        }
      },
      text: {
        type: Sequelize.STRING
      },
      order: {
        type: Sequelize.INTEGER
      },
      organizationId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Slides');
  }
};