'use strict';
var bcrypt = require('bcryptjs');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Usuario',
      lastName: 'Demo',
      email: 'test@test.com',
      // Important: Password not encrypted yet! 
      password: bcrypt.hashSync("1234", 8),
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
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
