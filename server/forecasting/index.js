// Libraries
const moment = require('moment');
// crane-fit modules
const db = require('../db');
const { User } = db;
const runProphet = require('./runProphet');

exports.predictUserGoal = function predictUserGoal(user, goal) {
  const workoutHistory = user.workouts.id(goal.workoutId).workoutHistory;
  const length = workoutHistory.length;
  const dates = Array(length);
  const nums = Array(length);
  const goalDate = moment(goal.endDate);
  let latest = moment(0);
  let difference;
  workoutHistory.forEach((log, index) => {
    const logDate = moment(log.date);
    if (logDate.isAfter(latest)) {
      latest = logDate;
    }
    dates[index] = logDate.format('YYYY-MM-DD');
    nums[index] = log.number || NaN;
  });
  if (goalDate.isAfter(latest)) {
    difference = goalDate.diff(latest, 'day');
  };
  runProphet(dates, nums, difference);
}
