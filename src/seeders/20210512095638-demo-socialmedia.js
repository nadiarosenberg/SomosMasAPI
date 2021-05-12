'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('SocialMedia', [{
      facebook: 'facebook.com',
      instagram: 'instagram.com',
      linkedin: 'linkedin.com',
      timestamps: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  }, 
  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('SocialMedia', null, {});
  }
};