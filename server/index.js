// node libraries
const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const logger = require('morgan');
const cors = require('cors');
// crane-fit modules
const api = require('./api');
// JWT setup
const jwt = require('express-jwt');
const jwtSecret = require('jwks-rsa').expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://thecranebaes.auth0.com/.well-known/jwks.json`
  });
// env variables
require('dotenv').config({ silent: true });
const PORT = process.env.PORT || 3002;

// Start server
app.listen(PORT, function() {
  console.log(`Node app is running on http://localhost:${PORT}`);
});

// Non-request handler middleware (e.g. parsing and logging)
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files and requests for auth0 info
app.use(express.static(path.join(__dirname, '../src')));
app.get('/config', (req, res) => {
  var data = {
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID
  }
  res.send(data)
})

// Prevent unauthorised access to API endpoints
app.use(jwt({ secret: jwtSecret, audience: process.env.AUDIENCE, credentialsRequired: true }));

/*
 *  API endpoints
 */
// POST request handlers
app.post('/api/users', api.post.users);
app.post('/api/workouts', api.post.workouts);
app.post('/api/workouts/:workoutId/logs', api.post.workoutsLogs);
app.post('/api/goals', api.post.goals);
// GET request handlers
app.get('/api/workouts/', api.get.workouts);
app.get('/api/goals/', api.get.goals);
app.get('/api/users/', api.get.users);
