angular.module('sparrowFit')
.controller('AddGoalCtrl', function($scope, $http) {
  $scope.workouts = {};

  // make GET request to populate drop-down list
  $http.get('/api/workouts')
    .then(function(res) {
      $scope.workouts = res.data;
      $scope.selectedWorkout = $scope.workouts[0];
    })

  this.goal = {};

  this.addGoal = function() {
    this.goal.workoutId = $scope.selectedWorkout._id;
    this.goal.goalNumber = this.goalNumber;
    this.goal.startDate = Date.now().valueOf();

    if (this.goalEndDate) {
      // assign primitive value of specified date
      this.goal.endDate = this.goalEndDate.valueOf();
    } else {
      // show danger alert if end date is not specified
      $scope.onFailure = true;
      return;
    }

    console.log('object to be sent to server: ', this.goal);

    // reset alert
    $scope.onSuccess = false;
    $scope.onFailure = false;

    // make POST request to server
    $http.post('/api/goals', this.goal)
      .then(function(res) {
        // on success, show success alert
        $scope.onSuccess = true;
      }, function() {
        // on failure, show danger alert
        $scope.onFailure = true;
      });
  };
})
.component('addGoal', {
  controller: 'AddGoalCtrl',
  templateUrl: 'client/components/goal-component/addGoal/addGoal.html'
});
