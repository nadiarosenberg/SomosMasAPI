const repository = require('../services/repositories/activity');

const createActivity = async (activity) => {
  {
    const createdActivity = await repository.persist(activity);
    return createdActivity;
  }
};

module.exports = {
  createActivity
}