'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Organizations',
      [
        {
          name: 'name1',
          image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          address: 'address1',
          phone: '1234',
          email: 'email1@gmail.com',
          welcomeText: 'hola1',
          aboutUsText: 'nosotros1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'name2',
          image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
          address: 'address2',
          phone: '234',
          email: 'email2@gmail.com',
          welcomeText: 'hola2',
          aboutUsText: 'nosotros2',
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
