const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const { User, Template, History, Goal } = require('../db/mongoose-schemas.js');
const app = express();
const logger = require('morgan');
const cors = require('cors'); // allow cors headers
const jwt = require('express-jwt');
const jwtSecret = require('jwks-rsa').expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://thecranebaes.auth0.com/.well-known/jwks.json`
  });
// allows you to use .env file
require('dotenv').config({ silent: true });

app.use(cors());

app.set('port', (process.env.PORT || 3002));
const PORT = app.get('port');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/config', (req, res) => {
  var data = {
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID
  }
  res.send(data)
})

// AUTH0
app.use(express.static(path.join(__dirname, '../src')));
// app.use('/application', express.static(path.join(__dirname, '../client')));

app.get('/api/application', (req, res) => {
  console.log(req.headers);
  res.end('whatevs'); 
});

//HANDLE GET REQUESTS
const authCheck = jwt({ secret: jwtSecret, audience: process.env.AUDIENCE, credentialsRequired: true });
// SET UP A PUBLIC AND PRIVATE ENDPOINT
app.get('/api/public', (req, res) => {
  
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." })
});

// to protect this endpoint pass our middleware as second arg
// will require an auth header to be present for user to go through to this endpoint
app.get('/api/private', authCheck, (req, res) => {
  console.log(req.user);
  res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." })
});


app.get('/api/users', function(req, res) {
  var users = [];
  User.find({}, function(err, user) {
    if (err) console.log(err);
    console.log(user);
    users.push(user);
  })
  .then(function() {
    console.log(users);
    res.send(users);
  });
});

app.get('/api/workout', function(req, res) {
  var templates = [];

  Template.find({}, function(err, template) {
    if (err) console.log(err);
    templates.push(template);
  })
  .then(function() {
    console.log(templates);
    res.send(templates);
  });
});


app.get('/api/goals', function(req, res) {
  var goals = [];

  Goal.find({}, function(err, goal) {
    if (err) console.log(err);
    goals.push(goal);
  })
  .then(function() {
    console.log(goals);
    res.send(goals);
  });
});

app.get('/api/histories', function(req, res) {
  var histories = [];

  History.find({}, function(err, history) {
    if (err) console.log(err);
    histories.push(history);
  })
  .then(function() {
    console.log(histories);
    res.send(histories);
  });
});


//HANDLE POST REQUESTS

app.post('/api/users', function(req, res) {
  User.create(req.body);
  res.send('Posted User');
});

app.post('/api/workout', function(req, res) {
  Template.create(req.body);
  res.send('Posted Template');
});

app.post('/api/goals', function(req, res) {
  Goal.create(req.body);
  res.send('Posted Goal');
});

app.post('/api/histories', function(req, res) {
  History.create(req.body);
  res.send('Posted History');
});

//HANDLES SPECIFIC QUERIES

//GET USER BY USER_ID
app.get('/api/users/:id', function(req, res) {
  var ident = req.params.id;
  var user = null;
  User.find({id: ident }, function(err, target) {
    if (err) console.log(err);
    user = target;
  })
  .then(function() {
    res.send(user);
  });
});

//GET TEMPLATES BY USER_ID
app.get('/api/workout/:user', function(req, res) {
  var user = req.params.user;
  var templates = [];

  Template.find({user_id: user}, function(err, template) {
    if (err) console.log(err);
    templates.push(template);
  })
  .then(function() {
    res.send(templates);
  });
});

app.get('/api/histories/:user', function(req, res) {
  var user = req.params.user;
  var histories = [];

  History.find({user_id: user}, function(err, history) {
    if (err) console.log(err);
    histories.push(history);
  })
  .then(function() {
    res.send(histories);
  });
});

app.get('/api/goals/:user', function(req, res) {
  var user = req.params.user;
  var goals = [];

  Goal.find({user_id: user}, function(err, goal) {
    if (err) console.log(err);
    goals.push(goal);
  })
  .then(function() {
    res.send(goals);
  });
});

//END HANDLE SPECIFIC QUERIES

app.listen(PORT, function() {
  console.log(`Node app is running on http://localhost:${PORT}`);
});
console.log();
