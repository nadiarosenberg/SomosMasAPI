const repository = require('../services/repositories/users');
const bcrypt = require('bcryptjs');

const createUser = async user => {
  let aux = user;
  aux.password = bcrypt.hashSync(aux.password, 8);
  let result = await repository.persist(aux);
  return result;
}

const updateUser = async (userId, user) => await repository.update(userId, user);

const getAllUsers = async () => await repository.getAll();

const getUserById = async id => {
  const user = await repository.getOne(id);
  return user;
};

const deleteUser = async id => {
  const user = await repository.destroy(id);
  return user;
};

const getById = async id => {
  const me = await repository.getById(id);
  return me;
};

const getUserByEmail = async (email, password) => {
    const user = await repository.getByEmail(email);
    if(user){
      const responseDict = {
        true: (user) => user,
        false: () => {}
      }
      const condition = bcrypt.compareSync(password, user.password);
      return responseDict[condition](user);
    }
    return user;
};

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUser,
  getById,
};
