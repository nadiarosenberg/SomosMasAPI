const User = require('../../models/user');
const bcrypt = require('bcryptjs');

const persist = async (user) => {
    var aux = user
    if (aux.password) {
        aux.password = bcrypt.hashSync(aux.password, 8);
    }
    const result = await User.create(aux);
    return result;
};

const update = async (userId, propertiesToUpdate) => {
    const result = await User.update(userId, propertiesToUpdate, {
        deleteMissingProperties: false
    });
    return result;
};

module.exports = {
    persist,
    update
};