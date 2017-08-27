const moment = require('moment');
const db = require('../db');
const { User } = db;

exports.predictUserGoal = function predictUserGoal(user, goal) {
  // Get user's workout history
  const dates = {};
  user.workouts.id(goal.workoutId).workoutHistory.forEach((log) => {
    dates[moment(log.date).format('YYYY-MM-DD')] = log.number || NaN;
  });
  // Pad skipped days with NaN
  const startDate = moment(goal.startDate);
  const endDate = moment(goal.endDate);
  while (startDate.isSameOrBefore(endDate, 'day')) {
    const dateString = startDate.format('YYYY-MM-DD');
    if (!dates.hasOwnProperty(dateString)) {
      dates[dateString] = NaN;
    };
    startDate.add(1, 'day');
  }
  console.log(dates);
}
