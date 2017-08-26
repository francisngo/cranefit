angular.module('sparrowFit')
.controller('logWorkoutCtrl', function($scope, httpService) {
  $scope.workouts = {};

  httpService.getData('/api/workouts', function(workouts) {
    $scope.workouts = workouts;
    $scope.selectedWorkout = $scope.workouts[0];
  });

  this.workoutHistory = {};

  this.logWorkout = function() {
    this.workoutHistory.date = this.date.valueOf();
    this.workoutHistory.number = this.value;

    httpService.sendData(`/api/workouts/${$scope.selectedWorkout._id}/logs`, this.workoutHistory);
  };
})
.component('logWorkout', {
  controller: 'logWorkoutCtrl',
  templateUrl: 'client/components/workout-component/logWorkout/logWorkout.html'
});
