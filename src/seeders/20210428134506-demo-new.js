'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('News', [{
      name: 'The Rolling Stones se presentan en en Luna Park',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  }, 
  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('News', null, {});
  }
};