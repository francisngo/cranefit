const userData = require('./mockdata/exampleUsers');
const templateData = require('./mockdata/exampleTemplate');
const activityData = require('./mockdata/exampleActivity');
const historyData = require('./mockdata/exampleHistory');
const goalData = require('./mockdata/exampleGoal');
const { User, Template, History, Goal } = require('./schema')


//MAKE SURE TABLES ARE CLEAR
User.remove({}, function(err) {
  if (err) console.log(err);
  console.log('User Table Cleared');
})

Template.remove({}, function(err) {
  if (err) console.log(err);
  console.log('Template Table Cleared');
})

History.remove({}, function(err) {
  if (err) console.log(err);
  console.log('History Table Cleared');
})

Goal.remove({}, function(err) {
  if (err) console.log(err);
  console.log('Goal Table Cleared');
})
//ADD DATA

userData.forEach(function(element) {
  User.create(element);
  console.log('User: ', element);
});
templateData.forEach(function(element) {
  Template.create(element);
  console.log('Template: ', element);
});
historyData.forEach(function(element) {
  History.create(element);
  console.log('History: ', element);
});
goalData.forEach(function(element) {
  Goal.create(element);
  console.log('Goal: ', element);
});
