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
require('dotenv').config({ silent: true });


const PORT = process.env.PORT || 3002
app.listen(PORT, function() {
  console.log(`Node app is running on http://localhost:${PORT}`);
});


app.use(cors());
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

//HANDLE GET REQUESTS
const authCheck = jwt({ secret: jwtSecret, audience: process.env.AUDIENCE, credentialsRequired: true });
// SET UP A PUBLIC AND PRIVATE ENDPOINT
app.get('/api/public', (req, res) => {
  
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." })
});

// to protect this endpoint pass our middleware as second arg
// will require an auth header to be present for user to go through to this endpoint
app.get('/api/private', authCheck, (req, res) => {
  console.log(req.user.sub);
  res.json({ message: "Hello from a private endpoint! You DO need to be authenticated to see this." })
});

// Prevent unauthorised access to API endpoints
app.use(authCheck);

/*
 *  API endpoints
 */

// POST request handlers

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

// GET request handlers

app.get('/api/workout/', function(req, res) {
  const templates = [];

  Template.find({user_id: req.user.sub}, function(err, template) {
    if (err) console.log(err);
    else templates.push(template);
  })
  .then(function() {
    res.send(templates);
  });
});

app.get('/api/histories/', function(req, res) {
  const histories = [];

  History.find({user_id: req.user.sub}, function(err, history) {
    if (err) console.log(err);
    else histories.push(history);
  })
  .then(function() {
    res.send(histories);
  });
});

app.get('/api/goals/', function(req, res) {
  var goals = [];

  Goal.find({user_id: req.user.sub}, function(err, goal) {
    if (err) console.log(err);
    else goals.push(goal);
  })
  .then(function() {
    res.send(goals);
  });
});
