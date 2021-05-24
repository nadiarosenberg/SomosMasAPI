const db = require("../../models");
const Comments = db.comments;

const destroy = async (id) => {
  try {
    const result = await Comments.destroy({
      where: { id },
    });
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const getOne = async (id) => {
  try {
    const result = await Comments.findOne({
      where: { id },
      attributes: ["id", "userId", "newReportId", "body"],
    });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const getAllByNewReportId = async (id) => {
  try {
    const result = await Comments.findAll({
      where: { newReportId: id },
      attributes: ["id", "userId", "newReportId", "body"],
    });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { destroy, getOne , getAllByNewReportId };
