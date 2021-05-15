const repository = require('./../services/repositories/testimonials');

const getAllTestimonials = async () => {
    const testimonials = await repository.getAll();
    return testimonials;
}

const getOneTestimonial = async (id) => {
    const testimonial = await repository.getOne(id);
    return testimonial;
}

const postTestimonial = async (newTestimonial) => {
    const testimonial = await repository.create(newTestimonial);
    return testimonial;
}

const putTestimonial = async (editedTestimonial, id) => {
    const testimonial = await repository.update(editedTestimonial, id);
    return testimonial;
}

const deleteTestimonial = async (id) => {
    const testimonial = await repository.deleteOne(id);
    return testimonial;
}

module.exports = {
    getAllTestimonials,
    getOneTestimonial,
    postTestimonial,
    putTestimonial,
    deleteTestimonial
}
