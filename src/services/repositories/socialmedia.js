const db = require("./../../models");
const SocialMedia = db.socialmedia;

const getAll = async () => {
    const result = await SocialMedia.findAll();
    return result;
}

const getOne = async (id) => {
    const result = await SocialMedia.findByPk(id, {paranoid: false});
    return result;
}

const create = async (socialmedia) => {
    const result = await SocialMedia.create(socialmedia);
    return result;
}

const update = async (socialmedia, id) => {
    const result = await SocialMedia.update(socialmedia, {
        where: { id: id }
      });
    return result;
}

const deleteOne = async (id) => {
    const result = await SocialMedia.destroy({
        where: { id: id }
      });
    return result;
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne
}