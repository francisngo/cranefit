angular.module('sparrowFit')
.controller('CreateWorkoutCtrl', function(httpService,  store) {
  // object to store data to be sent to sever
  this.data= {};

  //addWorkout() create a template of named workout
  this.addWorkout = function() {
    this.data.name = this.name;
    this.data.unitName = this.unitName;
    this.data.unitValue = this.unitValue;

    console.log('object to be sent to server: ', this.data);

    // make POST request to server
    httpService.sendData('/api/workout', this.data);
  };
})
.component('createWorkout', {
  controller: 'CreateWorkoutCtrl',
  templateUrl: 'client/components/create-workout-component/createWorkout/createWorkout.html'
});
