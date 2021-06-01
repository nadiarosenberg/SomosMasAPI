const {User} = require('../../models/index');
const bcrypt = require('bcryptjs');
const key = require('../../utils/key');
const express = require('express');
const app = express();
app.set('key', key.key);

const persist = async user => {
  try {
    const result = await User.create(user);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const update = async (userId, user) => {
  var aux = user;
  if (aux.password) {
    aux.password = bcrypt.hashSync(aux.password, 8);
  }
  const result = await User.update(user, {
    where: {
      id: userId,
    },
  });
  return result;
};

const getAll = async () => {
  try {
    const result = await User.findAll({
      attributes: ['firstName', 'lastName', 'email', 'photo'],
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getOne = async id => {
  try {
    const result = await Organization.findOne({
      where: {id},
    });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const destroy = async id => {
  try {
    const result = await User.destroy({
      where: {id},
    });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const getById = async id => {
  try {
    const data = await User.findByPk(id, {raw: true});
    if (data === null) {
      let message = `Cannot find User with id = ${id}`;
      return message;
    }
    delete data.password;
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where:{
        email
      }
    })
    return user;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  persist,
  update,
  getAll,
  getOne,
  destroy,
  getById,
  getByEmail
};
