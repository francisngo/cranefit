const { User, Template, History, Goal } = require('../db');

/*
 *  API endpoints
 */

// API request helper function
const sendResults = function sendResults(resultsPromise, res) {
  resultsPromise
    .then(results => res.json(results))
    .catch((err) => {
      res.statusCode = 500;
      res.end('DB error');
    });
};

// POST request handlers
exports.post = {
  users: function(req, res) {
    sendResults(User.create(Object.assign({}, req.body, { user_id: req.user.sub }), res));
  },
  workout: function(req, res) {
    sendResults(Template.create(Object.assign({}, req.body, { user_id: req.user.sub }), res));
  },
  goals: function(req, res) {
    sendResults(Goal.create(Object.assign({}, req.body, { user_id: req.user.sub }), res));
  },
  histories: function(req, res) {
    sendResults(History.create(Object.assign({}, req.body, { user_id: req.user.sub }), res));
  }
};

// GET request helper function
const getDocumentsByUserId = function getDocumentsByUserId(Model, userId) {
  return new Promise((resolve, reject) => {
    Model.find({user_id: userId }, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    })
  })
};

// GET request handlers
exports.get = {
  // This function seems not to be used
  users: function(req, res) {
    var user = null;
    User.find({id: req.user.sub }, function(err, target) {
      if (err) console.log(err);
      user = target;
    })
    .then(function() {
      res.send(user);
    });
  },
  templates: function(req, res) {
    sendResults(getDocumentsById(Template, req.user.sub), res);
  },
  workout: function(req, res) {
    sendResults(getDocumentsByUserId(Template, req.user.sub), res);
  },
  histories: function(req, res) {
    sendResults(getDocumentsByUserId(History, req.user.sub), res);
  },
  goals: function(req, res) {
    sendResults(getDocumentsByUserId(Goal, req.user.sub), res);
  }
}
