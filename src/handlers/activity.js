const repository = require('../services/repositories/activity');

const createActivity = async (activity) => {
  {
    const createdActivity = await repository.persist(activity);
    return createdActivity;
  }
};

const getAllActivities = async () => {
  const activities = await repository.getAll();
  return activities;
};

module.exports = {
  createActivity,
  getAllActivities
}