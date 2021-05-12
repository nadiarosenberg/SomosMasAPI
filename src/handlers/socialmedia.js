const repository = require('./../services/repositories/socialmedia');

const getAllSocialMedia = async () => {
    const socialmedia = await repository.getAll();
    return socialmedia;
}

const getOneSocialMedia = async (id) => {
    const socialmedia = await repository.getOne(id);
    return socialmedia;
}

const postSocialMedia = async (newSocialMedia) => {
    const socialmedia = await repository.create(newSocialMedia);
    return socialmedia;
}

const putSocialMedia = async (editedSocialMedia, id) => {
    const socialmedia = await repository.update(editedSocialMedia, id);
    return socialmedia;
}

const deleteSocialMedia = async (id) => {
    const socialmedia = await repository.deleteOne(id);
    return socialmedia;
}

module.exports = {
    getAllSocialMedia,
    getOneSocialMedia,
    postSocialMedia,
    putSocialMedia,
    deleteSocialMedia
}