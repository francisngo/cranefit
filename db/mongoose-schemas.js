require('dotenv').config({ silent: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

// Error Handling
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//CREATING THE SCHEMA
const userSchema = new Schema({
  partner_user_id: String,
  name: String,
  email: String,
  goal: String
});

const User = mongoose.model('User', userSchema);

const templateSchema = new Schema({
  user_id: String,
  templateName: String,
  workout: Object,
  timed: Boolean,
  date: String
});

const Template = mongoose.model('Template', templateSchema);

const historySchema = new Schema({
  completed: Boolean,
  user_id: String,
  workout_id: String,
  date: Date
});

const History = mongoose.model('History', historySchema);

const goalSchema = new Schema ({
  user_id: String,
  number: Number,
  timeFrame: String,
  creationDate: Date,
  name: String,
  emailAlert: Boolean
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = {
  User: User,
  Template: Template,
  History: History,
  Goal: Goal
}
