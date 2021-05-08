const repository = require("../services/repositories/newreport");

const deleteNewReport = async (id) => {
  const result = await repository.destroy(id);
  return result;
};

const createNewReport = async (newreport) => {
  const result = await repository.persist(newreport);
  return result;
};


module.exports = {
  deleteNewReport,
  createNewReport
};
