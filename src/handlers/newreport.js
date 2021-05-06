const repository = require("../services/repositories/newreport");

const deleteNewReport = async (id) => {
  const result = await repository.destroy(id);
  return result;
};

module.exports = {
  deleteNewReport,
};
