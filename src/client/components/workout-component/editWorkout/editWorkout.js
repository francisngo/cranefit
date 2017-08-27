angular.module('sparrowFit')
.controller('editWorkoutCtrl', function($scope, httpService) {
  $scope.workouts = {};

  httpService.getData('/api/workouts', function(workouts) {
    $scope.workouts = workouts;
    $scope.selectedWorkout = $scope.workouts[0];
  });

  this.data = {};

  this.editWorkout = function() {
    this.data.workoutId = $scope.selectedWorkout._id;
    this.data.name = this.newName;
    this.data.unitValue = this.newUnitValue;
    this.data.unitName = this.newUnitName;

    httpService.sendData(`TBD`, this.data);
  };
})
.component('editWorkout', {
  controller: 'editWorkoutCtrl',
  templateUrl: 'client/components/workout-component/editWorkout/editWorkout.html'
});
