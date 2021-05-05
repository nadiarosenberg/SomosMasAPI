const repository = require('../services/repositories/slides');

const createSlide = async (slide) => {
    const createdSlide = await repository.persist(slide);
    return createdSlide;
};

const updateSlide = async (slideId, slide) => {
    const updatedSlide = await repository.update(slideId, slide);
    return updatedSlide;
};

const deleteSlide = async (slideId) => {
    const deletedSlide = await repository.destroy(slideId);
    return deletedSlide;
};

const getSlide = async (slideId) => {
    const getOneSlide = await repository.findOne(slideId);
    return getOneSlide;
};

const getSlides = async (slideId) => {
    const getAllSlides = await repository.findAll(slideId);
    return getAllSlides;
};

module.exports = {
    createSlide,
    updateSlide,
    deleteSlide,
    getSlide,
    getSlides
};