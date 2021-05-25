module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Activities', [
      {
        name: 'John',
        content: 'Doe',
        image: 'example@example.com',

        createdAt: new Date(),

        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Activities', null, {});
  },
};
