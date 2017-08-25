const { User, Template, History, Goal } = require('../db');

/*
 *  API endpoints
 */

// POST request handlers
exports.post = {
  users: function(req, res) {
    User.create(req.body);
    res.send('Posted User');
  },
  workout: function(req, res) {
    Template.create(req.body);
    res.send('Posted Template');
  },
  goals: function(req, res) {
    Goal.create(req.body);
    res.send('Posted Goal');
  },
  histories: function(req, res) {
    History.create(req.body);
    res.send('Posted History');
  }
};

// GET request handlers
const getModelsByUserId = function getModelsByUserId(Model, userId) {
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

const sendResults = function sendResults(resultsPromise, res) {
  resultsPromise
    .then(results => res.json(results))
    .catch((err) => {
      res.statusCode = 500;
      res.end(err);
    });
};

exports.get = {
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
    sendResults(getModelsById(Template, req.user.sub), res);
  },
  workout: function(req, res) {
    sendResults(getModelsByUserId(Template, req.user.sub), res);
  },
  histories: function(req, res) {
    sendResults(getModelsByUserId(History, req.user.sub), res);
  },
  goals: function(req, res) {
    sendResults(getModelsByUserId(Goal, req.user.sub), res);
  }
}
