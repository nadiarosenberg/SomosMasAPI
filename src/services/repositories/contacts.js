const {Contact} = require('../../models');
const pagination = require('../../utils/pagination');

const persist = async contactToPersist => await Contact.create(contactToPersist);

const getAll = async paginationInfo => await Contact.findAndCountAll({
      ...pagination.getPaginationParams(paginationInfo, 'id'),
      attributes: ['id', 'name', 'phone', 'email', 'message', 'createdAt'],
    });

module.exports = {
  persist,
  getAll,
};
