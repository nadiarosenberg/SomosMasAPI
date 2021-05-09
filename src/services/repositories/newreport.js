const db = require("../../models");
const NewReport = db.newreports;
const errorHandler = require("../../utils/errorHandler");
const sendEmail = require("../../utils/emailSender");
const emailsSource = require("../../utils/fakeEmailSource");
const userData = require("../../utils/fakeData");

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