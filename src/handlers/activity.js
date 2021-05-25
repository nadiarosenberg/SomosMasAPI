const repository = require('../services/repositories/activity');

const createActivity = async activity => {
  {
    const createdActivity = await repository.persist(activity);
    return createdActivity;
  }
};

const getAllActivities = async () => {
  const activities = await repository.getAll();
  return activities;
};

const getActivityById = async activityId => {
  const activity = await repository.getOne(activityId);
  return activity;
};

const updateActivity = async (id, properties) => {
  const activity = await repository.update(id, properties);
  return activity;
};

const deleteActivity = async id => {
  const activity = await repository.destroy(id);
  return activity;
};

const retoreActivity = async id => {
  const organization = await repository.restore(id);
  return organization;
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
  retoreActivity,
};
