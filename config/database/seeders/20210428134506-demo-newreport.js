'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('NewReports', [{
      name: 'Esta es la noticia 1',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esto esta es la noticia 2',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esta es la noticia 3',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esta es la noticia 4',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esta es la noticia 5',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esta es la noticia 6',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esto esta es la noticia 7',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esta es la noticia 8',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esta es la noticia 9',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esta es la noticia 10',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esta es la noticia 11',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esto esta es la noticia 12',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esta es la noticia 13',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esta es la noticia 14',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Esta es la noticia 15',
      content: 'Blablabla los rollings blablabla van al luna park',
      image: 'lengua.jpg',
      timestamps: Date.now(),
      type: 'news',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  }, 
  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('NewReports', null, {});
  }
};