// Requires
const newReportRouter = require("express").Router();
const handler = require("../handlers/newreport");
const { checkIdInPath } = require("./middlewares/common");
const db = require("../models");
const path = require("path");
const errorHandler = require("../utils/errorHandler");
const sendEmail = require("../utils/emailSender");
const userData = require("../utils/fakeData");
const isAdmin = require('./middlewares/auth');
const emailsSource = require("../utils/fakeEmailSource");

const NewReport = db.newreports;
const Op = db.Sequelize.Op;

// Var
const emailSource = emailsSource("newReport");

newReportRouter.delete(
  "/:id",
  checkIdInPath,
  async (req, res) => {
    try {
      const id = req.params.id;
      const result = await handler.deleteNewReport(id);
      if (!result)
        throw new Error(
          `Cannot delete NewReport with id = ${id}. NewReport was not found!`
        );
      res.status(200).send("NewReport was deleted successfully!");
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

newReportRouter.post("/",/*isAdmin,*/async (req, res) => {
  try {
    const newreport = req.body;
    const result = await handler.createNewReport(newreport);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      ok: false,
      msj: 'failed to create news'
    });
  }
})

module.exports = {
  newReportRouter,
  findAll: (req, res) => {
    NewReport.findAll({ paranoid: false })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving new reports.",
        });
      });
  },
  findOne: (req, res) => {
    const id = req.params.id;

    NewReport.findByPk(id)
      .then((data) => {
        if (data === null) {
          res.status(404).send({
            message: `Cannot find NewReport with id = ${id}`,
          });
          return;
        }
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "Error retrieving NewReport with id = " + id,
        });
      });
  },
  update: (req, res) => {
    const id = req.params.id;
    NewReport.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "NewReport was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update NewReport with id = ${id}. NewReport was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating NewReport with id = " + id,
        });
      });
  },
};
