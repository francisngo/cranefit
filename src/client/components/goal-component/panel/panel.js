angular.module('sparrowFit')
  .controller('panelCtrl', function($scope, httpService) {

    $scope.selectedData = this.mockLineChartData;
    $scope.selectedGoal;
    $scope.goals = [];

    //set to false to avoid rendering graph inititially with fake data
    this.showGraph = false;

    httpService.getData('/api/goals', function(goals) {
      // convert dates to string accepted by d3 / line chart directive
      formatDates(goals);
      $scope.goals = goals;
      $scope.selectedGoal = $scope.goals[0];
    });

    // update selectedData
    this.handleViewProgressClick = function(e){
      console.log($scope.selectedGoal)
      $scope.selectedData = $scope.selectedGoal;
      $scope.onFailure = true;
      $scope.selectedData.workoutPredictions.forEach(prediction => {
        if ($scope.onSuccess || prediction.number >= $scope.selectedData.goalNumber) {
          $scope.onFailure = false;
          $scope.onSuccess = true;
        }
      });
      this.showGraph = true;
    }

    function formatDates(goalsArray) {

      goalsArray.forEach(function(goal) {
        goal.workoutHistory.forEach(function(log) {
          log.date = new Date(log.date);
        });
        goal.workoutPredictions.forEach(function(log) {
          log.date = new Date(log.date);
        });
      });
    }

    //dummy data for bar graph
    this.barGraphData = [10, 10, 10];

    // dummy data to intitialize selected lineChartDate and cause line chart from erroring
    this.mockLineChartData = {
       "workoutName": "string",
    	 "goalDate": "date",
    	 "goalNumber": "number",
       "workoutHistory": [
          {
             "date": "8-10",
             "number": 0
          }
       ],
       "workoutPredictions": [
         {
            "date": "8-13",
            "number": 20
         }
       ]
    };

  })
  .component('panel', {
    controller: 'panelCtrl',
    templateUrl: 'client/components/goal-component/panel/panel.html'
});
