'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Categories', [{
      name: 'Musica',
      description: 'Categoria de musica',
      image: 'imagendemusica.jpg',
      isDeleted: false,
      timestamp: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  }, 

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Categories', null, {});
  }
};
