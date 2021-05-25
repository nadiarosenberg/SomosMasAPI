'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NewReports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'name is required',
          },
        },
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'content is required',
          },
        },
        type: Sequelize.TEXT,
      },
      image: {
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'image is required',
          },
        },
        type: Sequelize.STRING,
      },
      type: {
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'image is required',
          },
        },
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        validate: {
          notNull: {
            args: true,
            msg: 'image is required',
          },
        },
        references: {
          model: 'Categories',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      timestamps: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('NewReports');
  },
};
