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

const getActivityById = async (activityId) => {
  const anActivity = await repository.getOne(activityId);
  return anActivity;
};

const updateActivity = async (id, properties) => {
  const activity = await repository.update(id, properties);
  return activity;
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity
}