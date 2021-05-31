const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

module.exports = dbMock.define('Organization', {
    id: 2,
    name: 'test',
    image: 'test.png',
    address: 'testaddress',
    phone: '12345',
    email: 'test@gmail.com',
    welcomeText: 'Welcome test',
    aboutUsText: 'AboutUs text'
});