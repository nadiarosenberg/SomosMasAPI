'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SocialMedia', [
      {
        facebook: 'facebook.com',
        instagram: 'instagram.com',
        linkedin: 'linkedin.com',
        organizationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SocialMedia', null, {});
  },
};
