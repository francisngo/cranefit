const moment = require('moment');
const db = require('../db');
const { User } = db;

exports.predictUserGoal = function predictUserGoal(user, goal) {
  // Get user's workout history
  const workoutHistory = user.workouts.id(goal.workoutId).workoutHistory;
  const length = workoutHistory.length;
  const dates = Array(length);
  const nums = Array(length);
  workoutHistory.forEach((log, index) => {
    dates[index] = moment(log.date).format('YYYY-MM-DD');
    nums[index] = log.number || NaN;
  });
  console.log(dates, nums);
}
