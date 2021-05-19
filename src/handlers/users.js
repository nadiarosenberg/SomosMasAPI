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

const getUserById = async (id) => {
  const user = await repository.getOne(id);
  return user;
};

const deleteUser = async (id) => {
  const user = await repository.destroy(id);
  return user;
};

const getById = async (id) => {
    const me = await repository.getById(id);
    return me;
};


module.exports = {
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
    getById



};
