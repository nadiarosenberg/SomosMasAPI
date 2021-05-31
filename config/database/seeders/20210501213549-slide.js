'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Slides',
      [
        {
          imageUrl: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          text: 'text1',
          order: 2,
          organizationId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageUrl: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          text: 'text2',
          order: 3,
          organizationId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageUrl: 'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
          text: 'text3',
          order: 1,
          organizationId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
  },
};
