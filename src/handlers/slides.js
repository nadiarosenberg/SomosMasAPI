const repository = require('../services/repositories/slides');

const createSlide = async (slide) => await repository.persist(slide);

const updateSlide = async (slide, id) => await repository.update(slide, id);

const deleteSlide = async (id) => await repository.destroy(id);

const getSlide = async (id) => await repository.findOne(id);

const getSlides = async () => await repository.findAll();

module.exports = {
    createSlide,
    updateSlide,
    deleteSlide,
    getSlide,
    getSlides
};