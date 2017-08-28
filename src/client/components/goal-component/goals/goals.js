angular.module('sparrowFit')
  .controller('GoalsCtrl', function($scope, httpService) {
    // $scope.goals = {};
    //
    // httpService.getData('/api/goals', function(goals) {
    //   $scope.goals = goals;
    //   $scope.selectedGoal = $scope.goals[0];
    //   console.log($scope.goals);
    // });
    //
    // this.handleClick = function() {
    //   console.log('button clicked!');
    // }
  })
  .component('goals', {
    controller: 'GoalsCtrl',
    templateUrl: 'client/components/goal-component/goals/goals.html'
  });
