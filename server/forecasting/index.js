const moment = require('moment');
const { User } = require('../db');

exports.predictUserGoal(user_id, workoutId) {
  User.find({ user_id }).exec()
    .then()
}
