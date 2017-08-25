const express = require('express')
const bodyParser = require('body-parser');
const path = require('path');
const { User, Template, History, Goal } = require('./db');
const app = express();
const logger = require('morgan');
const cors = require('cors'); // allow cors headers
const jwt = require('express-jwt');
const api = require('./api');
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
 *  Set API endpoints
 */

// POST request handlers
app.post('/api/users', api.post.users);
app.post('/api/workout', api.post.workout);
app.post('/api/goals', api.post.goals);
app.post('/api/histories', api.post.histories);

// GET request handlers
app.get('/api/workout/', api.get.workout);
app.get('/api/histories/', api.get.histories);
app.get('/api/goals/', api.get.goals);
