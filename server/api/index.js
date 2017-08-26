const { User } = require('../db');

/*
 *  API endpoints
 */

// API request helper functions
const sendResults = function sendResults(resultsPromise, res) {
  resultsPromise
    .then(results => res.json(results))
    .catch(results => {
      res.statusCode = 500;
      res.end('DB error');
    });
};

const retrieveUser = function retrieveUser(user_id) {
  return User.find({ user_id }).exec()
    .then(results => results[0]);
};

// POST request helper function
const postUserSubDoc = function postUserSubDoc(userId, subDocName, body, res, isArray = true) {
  let index = 0;
    return retrieveUser(userId)
      .then((user) => {
        if (isArray) {
          index = user[subDocName].push(body) - 1;
        } else {
          user[subDocName] = body;
        }
        return user.save();
      })
      .then(user => isArray ? user[subDocName][index] : user[subDocName]); 
};


// GET request helper function
const retrieveUserSubDocs = function retrieveUserSubDocs(userId, subDocName) {
  return retrieveUser(userId)
    .then(result => subDocName ? result[subDocName] : result)
}

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
    sendResults(postUserSubDoc(req.user.sub, 'workouts', req.body), res);
  },
  workoutsLogs: function postWorkoutLogs(req, res) {
    retrieveUserSubDocs(req.user.sub, 'workouts')
      .then(result => res.json(result.id(req.params.workoutId)));
  },
  goals: function postGoals(req, res) {
    sendResults(postUserSubDoc(req.user.sub, 'goals', req.body), res);
  }
};

// GET request handlers
exports.get = {
  // This function seems not to be used
  users: function getUsers(req, res) {
    sendResults(retrieveUser(req.user.sub), res);
  },
  workouts: function getWorkouts(req, res) {
    sendResults(retrieveUserSubDocs(req.user.sub, 'workouts'), res);
  },
  goals: function getGoals(req, res) {
    sendResults(retrieveUserSubDocs(req.user.sub, 'goals'), res);
  }
}
