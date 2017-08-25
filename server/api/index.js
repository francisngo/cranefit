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
exports.get = {
  users: function(req, res) {
    var ident = req.params.id;
    var user = null;
    User.find({id: ident }, function(err, target) {
      if (err) console.log(err);
      user = target;
    })
    .then(function() {
      res.send(user);
    });
  },
  templates: function(req, res) {
    const templates = [];

    Template.find({user_id: req.user.sub}, function(err, template) {
      if (err) console.log(err);
      else templates.push(template);
    })
    .then(function() {
      res.send(templates);
    });
  },
  workout: function(req, res) {
    const templates = [];

    Template.find({user_id: req.user.sub}, function(err, template) {
      if (err) console.log(err);
      else templates.push(template);
    })
    .then(function() {
      res.send(templates);
    });
  },
  histories: function(req, res) {
    const histories = [];

    History.find({user_id: req.user.sub}, function(err, history) {
      if (err) console.log(err);
      else histories.push(history);
    })
    .then(function() {
      res.send(histories);
    });
  },
  goals: function(req, res) {
    var goals = [];

    Goal.find({user_id: req.user.sub}, function(err, goal) {
      if (err) console.log(err);
      else goals.push(goal);
    })
    .then(function() {
      res.send(goals);
    });
  }
}
