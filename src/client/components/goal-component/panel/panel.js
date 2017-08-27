angular.module('sparrowFit')
  .controller('panelCtrl', function($scope, httpService) {
    // add workout data to scope
    console.log($scope.selectedGoal)
    this.workoutData = [10,10,10];
  })
  .component('panel', {
    controller: 'panelCtrl',
    templateUrl: 'client/components/goal-component/panel/panel.html'
});
