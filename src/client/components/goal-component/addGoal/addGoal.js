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
    httpService.sendData('/api/goals', this.goal);
  };
})
.component('addGoal', {
  controller: 'AddGoalCtrl',
  templateUrl: 'client/components/goal-component/addGoal/addGoal.html'
});
