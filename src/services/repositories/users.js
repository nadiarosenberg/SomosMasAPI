const {
    User
} = require('../../models/index');
const bcrypt = require('bcryptjs');

const persist = async (user) => {
    var aux = user
    aux.password = bcrypt.hashSync(aux.password, 8);
    const result = await User.create(aux);
    return result;
};

const update = async (userId, user) => {
    var aux = user
    if (aux.password) {
        aux.password = bcrypt.hashSync(aux.password, 8);
    }
    const result = await User.update(user, {
        where: {
            id: userId
        }
    });
    return result;
};

const getAll = async () => {
    try {
        const result = await User.findAll({
            attributes: ["firstName", "lastName", "email", "photo"],
        });
        return result;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    persist,
    update,
    getAll
};
