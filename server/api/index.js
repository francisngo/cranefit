// crane-fit modules
const forecasting = require('../forecasting');
const db = require('../db');
const { User } = db // node LTS doesn't have object rest...

/*
 *  API endpoints
 */

// API request helper functions
const sendResults = function sendResults(resultsPromise, res) {
  resultsPromise
    .then(results => res.json(results))
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.end('DB error');
    });
};

// POST request handlers
exports.post = {
  users: function postUsers(req, res) {
    User.findOrCreate({ user_id: req.user.sub }, (err, result) => {
      if (err) {
        res.statusCode = 500;
        res.end('DB error');
      } else {
        res.json(result);
      }
    });
  },
  workouts: function postWorkouts(req, res) {
    sendResults(db.postUserSubDoc(req.user.sub, 'workouts', req.body), res);
  },
  workoutsLogs: function postWorkoutLogs(req, res) {
    const workoutId = req.params.workoutId;
    const body = Object.assign({}, req.body, new Date(req.body.date));
    let index;
    sendResults(
      db.retrieveUser(req.user.sub)
        .then(user => {
          index = user.workouts.id(workoutId).workoutHistory.push(body) - 1;
          const workoutGoals = user.goals.filter(goal => goal.workoutId === workoutId);
          workoutGoals.forEach(goal => forecasting.predictUserGoal(user, goal));
          return user.save();
        })
        .then(user => user.workouts.id(workoutId).workoutHistory[index])
    , res);
  },
  goals: function postGoals(req, res) {
    sendResults(db.postUserSubDoc(req.user.sub, 'goals', req.body), res);
  }
};

// GET request handlers
exports.get = {
  // This function seems not to be used
  users: function getUsers(req, res) {
    sendResults(db.retrieveUser(req.user.sub), res);
  },
  workouts: function getWorkouts(req, res) {
    sendResults(db.retrieveUserSubDocs(req.user.sub, 'workouts'), res);
  },
  goals: function getGoals(req, res) {
    sendResults(
      db.retrieveUser(req.user.sub)
        .then(user => user.goals.map((goal) => {
            const { name, workoutHistory } = user.workouts.id(goal.workoutId);
            return {
              goalDate: goal.endDate,
              goalNumber: goal.goalNumber,
              workoutName: name,
              workoutHistory,
              workoutPredictions: goal.workoutPredictions
            }
          }
        ))
    , res)
  }
}
