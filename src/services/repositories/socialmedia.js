const db = require("./../../models");
const SocialMedia = db.socialMedia;

const getOne = async (id) => await SocialMedia.findByPk(id, {paranoid: false});

const create = async (socialmedia) => await SocialMedia.create(socialmedia);

const update = async (socialmedia, id) => await SocialMedia.update(socialmedia, {where: { id: id }});

const deleteOne = async (id) => await SocialMedia.destroy({where: { id: id }});

module.exports = {
    getOne,
    create,
    update,
    deleteOne
}