const repository = require('../services/repositories/users');

const createUser = async (user) => {
    const createdUser = await repository.persist(user);
    return createdUser;
};

const updateUser = async (userId, user) => {
    const updatedUser = await repository.update(userId, user);
    return updatedUser;
};

const getAllUsers = async () => await repository.getAll();

module.exports = {
    createUser,
    updateUser,
    getAllUsers
};
