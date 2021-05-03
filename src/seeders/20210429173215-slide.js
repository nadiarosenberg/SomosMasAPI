'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Slides', [{
      imageUrl: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      text: 'text',
      order: 1,
      //organizationId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      imageUrl: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      text: 'text',
      order: 2,
      //organizationId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
