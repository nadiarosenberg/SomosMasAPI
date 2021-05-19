const repository = require('../services/repositories/users');

const createUser = async (user) => {
	user.roleId=2;
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
const getFindMe = async (id) => {
    const me = await repository.FindMe(id);
    return me;
};


module.exports = {
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
    getFindMe

};
