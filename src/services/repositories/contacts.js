const logger = require('../../utils/pinoLogger');
const { Contact } = require("../../models");
const pagination = require("../../utils/pagination");
const errorHandler = require("../../utils/errorHandler");

const persist = async (contactToPersist) => {
  try {
    const result = await Contact.create(contactToPersist);
    console.log(contactToPersist);
  } catch (error) {
    console.error(error.message);
  }
};
const getAll = async (paginationInfo) => {
  try {
    const paginationData = pagination.getPaginationParams(paginationInfo, "id");
    const result = await Contact.findAndCountAll({
      ...paginationData,
      attributes: ["id", "name", "phone", "email", "message", "createdAt"],
    });
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  persist,
  getAll
}
