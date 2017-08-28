
angular.module('sparrowFit')
.controller('logWorkoutCtrl', function($scope, $http) {
  $scope.workouts = {};

  // make GET request to populate drop-down list
  $http.get('/api/workouts')
    .then(function(res) {
      $scope.workouts = res.data;
      $scope.selectedWorkout = $scope.workouts[0];
    });

  this.workoutHistory = {};

  this.logWorkout = function() {
    if (this.date) {
      // assign primitive value of specified date
      this.workoutHistory.date = this.date.valueOf();
    } else {
      // show danger alert if date is not specified
      $scope.onFailure = true;
      return;
    }
    this.workoutHistory.number = this.value;

    console.log('object to be sent to server: ', this.workoutHistory);

    // reset alert
    $scope.onSuccess = false;
    $scope.onFailure = false;

    // make POST request to server
    $http.post(`/api/workouts/${$scope.selectedWorkout._id}/logs`, this.workoutHistory)
      .then(function(res) {
        // on success, show success alert
        $scope.onSuccess = res.data.name;
      }, function() {
        // on failure, show danger alert
        $scope.onFailure = true;
      });
  };
})
.component('logWorkout', {
  controller: 'logWorkoutCtrl',
  templateUrl: 'client/components/workout-component/logWorkout/logWorkout.html'
});
