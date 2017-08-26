angular.module('sparrowFit')
.controller('editWorkoutCtrl', function(httpService) {

  // To-Do: save workout selection to edit/update

  // object to store data to be sent to server
  this.data = {};

  // new workout template with new values
  this.editWorkout = function() {
    this.data.name = this.newName;
    this.data.unitValue = this.newUnitValue;
    this.data.unitName = this.newUnitName;
  };

  console.log('object to be sent: ', this.data);

  // httpService.updateData???('/api/workouts', this.data);

})
.component('editWorkout', {
  controller: 'editWorkoutCtrl',
  templateUrl: 'client/components/workout-component/editWorkout/editWorkout.html'
});
