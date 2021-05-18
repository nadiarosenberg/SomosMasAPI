const repository = require("../services/repositories/newreport");
const path = require('path');

const getOffSet = (page, limit) => {
  return page * limit - limit;
};

const getNextPage = (page, limit, count) => {
  let rest = count - limit*page;
  if(rest >0){
    page = page+1;
    return ('/news?page='+page);
  }else{
    return null;
  }
}

const getPreviousPage = (page) => {
  if (page <= 1) {
    return null;
  }
  return ('/news?page='+(page - 1));
};

const getAllNewReports = async (page) => { 
    try {
      page = parseInt(page);
      const limit = 10;
      const offset = getOffSet(page,limit);

      const {count, rows} = await repository.getAll(limit, offset);
      return {
        previousPage: getPreviousPage(page),
        currentPage: page,
        nextPage: getNextPage(page, limit, count),
        total: count,
        limit: limit,
        data: rows,
      };
    } catch (error) {
      console.log(error);
    }
};

const getNewReportById = async (newReportId) => await repository.getOne(newReportId);

const updateNewReport = async (id, properties) => await repository.update(id, properties);

const deleteNewReport = async (id) => await repository.destroy(id);

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
  getAllNewReports,
  getNewReportById,
  updateNewReport,
  deleteNewReport,
  createNewReport
};
