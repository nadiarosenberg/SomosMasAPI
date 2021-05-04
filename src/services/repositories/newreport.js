const db = require("../../models");
const NewReport = db.newreports;

const destroy = async (id) => {
  const result = await NewReport.destroy({
    where: { id: id },
  });
  return result;
};

module.exports = {
  destroy,
};
