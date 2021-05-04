const repository = require('../services/repositories/users');

const createUser = async (user) => {
    const createdUser = await repository.persist(user);
    return createdUser;
};


module.exports = {
    createUser
};