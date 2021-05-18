'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [{
      userId: 1,
      body: 'Blablabla texto super largo para probar el body blablablabla',
      newReportId: 1,
      createdAt: new Date(),
      timestamps: Date.now(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
