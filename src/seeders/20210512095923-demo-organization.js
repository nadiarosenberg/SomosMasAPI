'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Organizations', [{
      name: 'organizacion nombre',
      image: 'unaimagenaleatoria.jpg',
      email: 'organizacion@email.com',
      welcomeText: 'mensaje de bienvenida',
      socialMediaId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  }, 
  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Organizations', null, {});
  }
};
