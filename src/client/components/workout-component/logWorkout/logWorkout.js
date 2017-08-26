angular.module('sparrowFit')
.controller('logWorkoutCtrl', function($scope, httpService) {
  $scope.workouts = {};

  httpService.getData('/api/workouts', function(workouts) {
    $scope.workouts = workouts;
    $scope.selectedWorkout = $scope.workouts[0];
  });

  this.workoutHistory = {};

  this.logWorkout = function() {
    this.workoutHistory.WorkoutID = $scope.selectedWorkout._id;
    this.workoutHistory.Date = this.date.valueOf();
    this.workoutHistory.Number = this.value;

    httpService.sendData(`/api/workouts/${this.workoutHistory.WorkoutID}/logs`, this.workoutHistory);
  };
})
.component('logWorkout', {
  controller: 'logWorkoutCtrl',
  templateUrl: 'client/components/workout-component/logWorkout/logWorkout.html'
});
