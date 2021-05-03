const db = require('../models');
const Testimonial = db.Testimonial;

const create = async (req, res) => {
  const body_data = req.body;
  try{
      const testimonial = await Testimonial.create({
        name: body_data.name,
        image: body_data.image,
        content: body_data.content
      })
      res.json(testimonial);
  }catch (err){
      console.log(err);
      res.send('Error posting testimonial')
  }
}
        
      
const findAll = async (req, res) => {
  try{
      const testimonial = await Testimonial.findAll();
      res.json(testimonial);
  }catch (err){
      console.log(err);
      res.send('Error getting testimonials')
  }
};

const findOne = async (req, res) => {
  const id_body = req.params.id;
  try{
      const testimonial = await Testimonial.findOne({
        where: {id: id_body}
      })
      if(testimonial){
        res.json(testimonial);
      }else{
        res.status(404).json('Testimonial not found')
      }
  }catch (err){
      console.log(err);
      res.send('Error getting testimonial')
      
  }
}

const update = async (req, res) => {
  const id_body = req.params.id;
  try{
      const testimonial = await Testimonial.findOne({
          where: {id: id_body}
      });
      if(testimonial){
          const testimonial = await Testimonial.update(req.body,{
            where: {id: req.params.id}
      })
          res.status(200).json('Testimonial updated successfully')
      }else{
          res.status(404).json('Testimonial does not exist')
      }
  }catch(err){
      console.log(err);
      res.send('Error updating testimonial')
  }
}

const destroy = async (req, res) => {
  const id_body = req.params.id;
  try{
      const testimonial = await Testimonial.findOne({
          where: {id: id_body}
      });
      if(testimonial){
          const testimonial = await Testimonial.destroy({
            where: {id: id_body}
          })
          res.status(200).json('Testimonial deleted successfully')
      }else{
          res.status(404).json('Testimonial does not exist')
      }
  }catch(err){
      console.log(err);
      res.send('Error deleting testimonial')
  }
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    destroy
}