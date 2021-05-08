const db = require("../../models");
const NewReport = db.newreports;
const errorHandler = require("../../utils/errorHandler");
const sendEmail = require("../../utils/emailSender");
const emailsSource = require("../../utils/fakeEmailSource");
const userData = require("../../utils/fakeData");
const path = require('path')

const emailSource = emailsSource("newReport");

const destroy = async (id) => {
  const result = await NewReport.destroy({
    where: {
      id: id
    },
  });
  return result;
};

const persist = async (newreport) => {
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
  const result = await NewReport.create(newreport)
  const message = {
    from: emailSource.email,
    to: userData.email,
    subject: "Your new report was created successfully",
    text: `${userData.firstName} your new report called ${result.name} was created without a problem.`,
  };
  sendEmail(emailSource, message);
  console.log(result)
  return result;
};

module.exports = {
  destroy,
  persist
};