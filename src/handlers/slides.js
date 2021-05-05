const repository = require('../services/repositories/slides');

const createSlide = async (slide) => {
    const createdSlide = await repository.persist(slide);
    return createdSlide;
};

const updateSlide = async (id, slide) => {
    const updatedSlide = await repository.update(id, slide);
    return updatedSlide;
};

const deleteSlide = async (id) => {
    const deletedSlide = await repository.destroy(id);
    return deletedSlide;
};

const getSlide = async (id) => {
    const getOneSlide = await repository.findOne(id);
    return getOneSlide;
};

const getSlides = async () => {
    const getAllSlides = await repository.findAll();
    return getAllSlides;
};

module.exports = {
    createSlide,
    updateSlide,
    deleteSlide,
    getSlide,
    getSlides
};