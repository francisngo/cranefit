angular.module('sparrowFit')
.controller('CreateWorkoutCtrl', function(httpService, store) {
  // object to store data to be sent to sever
  this.data = {};

  //addWorkout() create a template of named workout
  this.addWorkout = function() {
    this.data.name = this.name;
    this.data.unitValue = this.unitValue;
    this.data.unitName = this.unitName;

    console.log('object to be sent to server: ', this.data);

    // make POST request to server
    httpService.sendData('/api/workouts', this.data);
  };
})
.component('createWorkout', {
  controller: 'CreateWorkoutCtrl',
  templateUrl: 'client/components/create-workout-component/createWorkout/createWorkout.html'
});
