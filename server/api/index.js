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
  users: function(req, res) {
    User.findOrCreate({ user_id: req.user.sub }, (err, result) => {
      if (err) {
        res.statusCode = 500;
        res.end('DB error');
      } else {
        res.json(result);
      }
    });
  },
  workout: function(req, res) {
    sendResults(postUserSubDoc(req.user.sub, 'workouts', req.body), res);
  },
  goals: function(req, res) {
    sendResults(postUserSubDoc(req.user.sub, 'goals', req.body), res);
  },
  // See note on corresponding GET endpoint below
  // histories: function(req, res) {
  //   sendResults(History.create(Object.assign({}, req.body, { user_id: req.user.sub })), res);
  // }
};

// GET request handlers
exports.get = {
  // This function seems not to be used
  users: function(req, res) {
    sendResults(retrieveUser(req.user.sub), res);
  },
  workout: function(req, res) {
    sendResults(retrieveUserSubDocs(req.user.sub, 'workouts'), res);
  },
  // The function of this endpoint needs reviewing -- e.g. do we send an id of a workout to get the history?
  // histories: function(req, res) {
  //   sendResults(getDocumentsByUserId(History, req.user.sub), res);
  // },
  goals: function(req, res) {
    sendResults(retrieveUserSubDocs(req.user.sub, 'goals'), res);
  }
}
