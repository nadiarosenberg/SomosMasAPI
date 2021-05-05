const db = require("../models");
const Slide = db.Slide;

const create = async (req, res) => {
  const body_data = req.body;
  try {
    const slide = await Slide.create({
      imageUrl: body_data.imageUrl,
      text: body_data.text,
      order: body_data.order,
      organizationId: body_data.organizationId,
    });
    res.json(slide);
  } catch (err) {
    console.log(err);
    res.send("Error posting slide");
  }
};

const findAll = async (req, res) => {
  try {
    const slide = await Slide.findAll({
      order: [["order", "ASC"]],
    });
    res.json(slide);
  } catch (err) {
    console.log(err);
    res.send("Error getting slides");
  }
};

const findOne = async (req, res) => {
  const id_body = req.params.id;
  try {
    const slide = await Slide.findOne({
      where: { id: id_body },
    });
    if (slide) {
      res.json(slide);
    } else {
      res.status(404).json("Slide not found");
    }
  } catch (err) {
    console.log(err);
    res.send("Error getting slide");
  }
};

const update = async (req, res) => {
  const id_body = req.params.id;
  try {
    const slide = await Slide.findOne({
      where: { id: id_body },
    });
    if (slide) {
      const slide = await Slide.update(req.body, {
        where: { id: req.params.id },
      });
      res.status(200).json("Slide updated successfully");
    } else {
      res.status(404).json("Slide does not exist");
    }
  } catch (err) {
    console.log(err);
    res.send("Error updating slide");
  }
};

const destroy = async (req, res) => {
  const id_body = req.params.id;
  try {
    const slide = await Slide.findOne({
      where: { id: id_body },
    });
    if (slide) {
      const slide = await Slide.destroy({
        where: { id: id_body },
      });
      res.status(200).json("Slide deleted successfully");
    } else {
      res.status(404).json("Slide does not exist");
    }
  } catch (err) {
    console.log(err);
    res.send("Error deleting slide");
  }
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  destroy,
};
