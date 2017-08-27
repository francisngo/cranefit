angular.module('sparrowFit')
.controller('AddGoalCtrl', function($scope, httpService) {
  $scope.workouts = {};

  httpService.getData('/api/workouts', function(workouts) {
    $scope.workouts = workouts;
    $scope.selectedWorkout = $scope.workouts[0];
  });

  this.goal = {};

  this.addGoal = function() {
    this.goal.workoutId = $scope.selectedWorkout._id;
    this.goal.goalNumber = Number(this.goalNumber);
    this.goal.startDate = Date.now().valueOf();
    this.goal.endDate = this.goalEndDate.valueOf();
<<<<<<< 491d329000da68027877720f0bd38a259d4c8b44

    alert('Goal Added!');
    console.log('object to be sent to server: ', this.goal);

=======
>>>>>>> Send goalNumber as number
    httpService.sendData('/api/goals', this.goal);
  };
})
.component('addGoal', {
  controller: 'AddGoalCtrl',
  templateUrl: 'client/components/goal-component/addGoal/addGoal.html'
});
