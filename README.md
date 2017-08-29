# Crane-Fit

## Introduction

Crane-Fit is a web based application that allows a user to create workout plans and use their created templates during their workout with a timer to help through each exercise.

Crane0Fit is forked (with gratitude) from _Team Sparrow's_ [Sparrow Fit](https://github.com/TeamSparrows/sparrow). The unique features of Crane-Fit are time series forecasting (with fbprophet) and data visualization (with D3).

# How to Use
This will guide you through installing and opening the app, creating a workout and starting the workout assistant tool.

### Step One: Install Dependencies
#### JavaScript and node
Running `npm install` from the root directory should satisfy all dependencies. __N.B.__ You will need bower installed (`npm install -g bower`) for this to work correctly.

#### Python
##### fbprophet
Crane-Fit depends on [fbprophet](https://github.com/facebookincubator/prophet) for its time-series forecasting. This is quite a new library which can perform relatively sophisticated analysis with simple parameters, highly accessible to the mathematically naive (such as ourselves). Being new, it has a couple of downsides: notably that it can be a little difficult to install.

Installation __should__ be relatively painless with `pip`:
```shell
pip install fbprophet
```

Sometimes, however, it struggles to resolve all the dependencies correctly. In particular, you will need numpy>=1.10.0, which on certain platforms pip will not install by default. Crane-Fit is designed to be stable and should forecasting fail (e.g. if an older version of numpy is present), it will silently abandon forecasting. If you find you have no errors, but also no predictions, an old version of numpy or no installation fbprophet are likely the cause.

Those struggling to resolve all the dependencies may find it easiest to use [Anaconda](https://www.anaconda.com/download/) which will provide a workable environment with a recent version of numpy and Cython installed. Running the above `pip install` from within a conda shell should make fbprophet available to you. __N.B__ In this case, you will also need to run `npm start` from within a conda shell to ensure that you use the correct Python distribution.

##### Python version
Crane-Fit is designed for Python 3.*, but there's not reason that it shouldn't work on 2.7.

### Step Two: Start the Server
Next, run `npm start`, which will start the server on `localhost:3002`

### Step Three: Authenticate
Our authentication system uses Auth0. Sign up for an account with Auth0 and create a client with which you will have access to a clientID (Auth0's way of idenfiying you) and domain. These will have to be added to the .env file as environment variables.

You can list the callback url in your Auth0 settings.
Checkout the .env.example file and fill in the following sections to get it running.
`DOMAIN =`
`CLIENT_ID =`
`AUDIENCE =`
`SECRET =`

Note: DOMAIN and CLIENT_ID are passed from server to client via get request in *src/app.js*.

### Step Four: Create Your First Workout
After logging in, a new bar should display in the top left corner.
Click on `Create Workout` to get to the Create Workout page. Here, you can set a new workout with a name, default value for logging your workouts and unit by which to measure them.

You can log individual workouts in the `Log Workouts` section which saves records of individual sessions.

Finally, you can set a goal (perhaps you want to run a faster mile or squat a few extra kg) and track your progress in the `Goals` section. After a few workouts, you will start to see predictions of future performance and a notification of your likelihood of meeting your goal. These become more accurate the more information you give them, so remember to log every workout!

# Program Structure
Crane-Fit is built using the MEAN stack along with some help for Auth0 and Bootstrap.

## The Database
Crane-Fit's Mongo Database uses Mongoose as an ORM. It's code is built in the `db` folder containing two files.
First, mongoose-schemas.js creates schemas for four different Database tables.

*User* stores information on individual users to the app.
*Template* stores the workouts that are created a user.
*History* stores the previous activity of a user.
*Goals* stores information on goals the user sets for themselves.

*/db* also contains *seed.js* which clears and adds fake data to the database when run.
Running `node db/seed.js` will drop and repopulate the database.

We have used mLab for our cloud database system which makes the following environment variable automagically available to node when working with some platforms (Such as Heroku):
`MONGO_DB_URI =`
If you are not using such a platform (or perhaps working locally), you should set this variable manually to `mongodb://<username>:<password>@<host>:<port>/<db_name>`.

## The Server
The server's code is stored in */server/index.js*, which creates an Express server
to serve up the client-side code, check that a user is logged in, and make database queries when endpoints are reached.

The code in this file will show all of the possible GET and POST requests that can be made to the server and is where new ones can be added.

We are using *morgan* express middleware in *server/index.js* to log all incoming requests to the server. It logs the req.method, endpoint and a timestamp in your terminal.

## The Client
Lastly, the *src* folder handles the client side code, containing the necessary dependencies, html, css and relevant javascript.

Along with more modularized folders, */src* contains *index.html*, which is the main html file which the client will be loaded into, and which will load app.js to help with state-based routing. The other folders contain specific code for the different sections of the app to be loaded, most of which are contaiined inside of */src/client*.

Inside of */src/client*, */components* contains the different aspects for the program, creating the view and code to create workouts, goals, and load and navigating through a workout. Each of these is taken care in its corresponding folder.

The other folder inside of client is *services*, which contains Angular services used throughout the program.
