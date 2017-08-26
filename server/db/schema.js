require('dotenv').config({ silent: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

// Error Handling
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//CREATING THE SCHEMA
const goalSchema = new Schema({
  workoutId: String,
  goalNumber: Number,
  endDate: Date
});

const workoutHistorySchema = new Schema({
  date: Date,
  number: Number
});

const workoutSchema = new Schema({
  name: String,
  unitName: String,
  unitValue: Number,
  workoutHistory: [workoutHistorySchema]
});

const userSchema = new Schema({
  user_id: String,
  name: String,
  email: String,
  goals: [goalSchema],
  workouts: [workoutSchema]
});

userSchema.plugin(require('mongoose-find-or-create'));
const User = mongoose.model('User', userSchema);

module.exports = {
  User: User,
};
