const db = require("../../models");
const NewReport = db.newreports;
const errorHandler = require("../../utils/errorHandler");
const sendEmail = require("../../utils/emailSender");
const emailsSource = require("../../utils/fakeEmailSource");
const userData = require("../../utils/fakeData");
const { logger } = require("handlebars");

const emailSource = emailsSource("newReport");

const getAll = async () => {
  try {
    const result = await NewReport.findAll({
      attributes: ['id', 'name', 'content', 'image', 'categoryId']
    })
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

const getOne = async (id) => {
  try {
    const result = await NewReport.findOne({
      where: { id },
      attributes: ['id', 'name', 'content', 'image', 'categoryId']
    });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const update = async(id, properties) => {
  try {
    const result = await NewReport.update(properties, { 
      where: { id } 
    });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const destroy = async (id) => {
  try {
    const result = await NewReport.destroy({
      where: {
        id: id
      },
    });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const persist = async (newreport) => {
  try {
    const result = await NewReport.create(newreport);
    const message = {
      from: emailSource.email,
      to: userData.email,
      subject: "Your new report was created successfully",
      text: `${userData.firstName} your new report called ${result.name} was created without a problem.`,
    };
    sendEmail(emailSource, message);
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  getAll,
  getOne,
  update,
  destroy,
  persist
};
