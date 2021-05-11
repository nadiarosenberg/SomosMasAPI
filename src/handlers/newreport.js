const repository = require("../services/repositories/newreport");
const path = require('path')

const getAllNewReport = async () => {
  const results = await repository.getAll();
  return results;
};

const getNewReportById = async (newReportId) => {
  const result = await repository.getOne(newReportId);
  return result;
};

const updateNewReport = async (id, properties) => {
  const result = await repository.update(id, properties);
  return result;
};

const deleteNewReport = async (id) => {
  const result = await repository.destroy(id);
  return result;
};

const createNewReport = async (newreport) => {
  newreport.type = 'news'
  newreport.timestamps = Date.now()
  const extensionsAvailable = ["png", "jpg", "jpeg"];
  const ext = path.extname(newreport.image || "").split(".");
  if (extensionsAvailable.indexOf(ext[ext.length - 1]) < 0) {
    return res.status(400).json({
      ok: false,
      message: "Invalid url",
      errors: {
        message: "You must select a url with extension: " +
          extensionsAvailable.join(", "),
      },
    });
  }
  const result = await repository.persist(newreport);
  return result;
};


module.exports = {
  getAllNewReport,
  getNewReportById,
  deleteNewReport,
  createNewReport
};
