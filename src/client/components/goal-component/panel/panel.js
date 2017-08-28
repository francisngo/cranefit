angular.module('sparrowFit')
  .controller('panelCtrl', function($scope, httpService) {

    //this is only here to render bar graph
    this.barGraphData = [10, 10, 10];

    // ==== delete this after successfully grabbing selectedGoal data from database with getData ==== //
    //implement static data to line graph
    this.workoutLogRun = {
       "workoutName": "string",
    	 "goalDate": "date",
    	 "goalNumber": "number",
       "workoutHistory": [
          {
             "Date": "08-10",
             "Number": 0
          },
          {
             "Date": "08-11",
             "Number": 45
          },
          {
             "Date": "08-12",
             "Number": 30
          }
       ],
       "workoutPredictions": [
         {
            "Date": "08-13",
            "Number": 20
         }
       ]
    }

    this.workoutLogSoccer = {
       "workoutName": "string",
    	 "goalDate": "date",
    	 "goalNumber": "number",
       "workoutHistory": [
          {
             "Date": "08-10",
             "Number": 50
          },
          {
             "Date": "08-11",
             "Number": 20
          },
          {
             "Date": "08-12",
             "Number": 40
          }
       ],
       "workoutPredictions": [
         {
            "Date": "08-13",
            "Number": 10
         },
         {
            "Date": "08-14",
            "Number": 40
         }
       ]
    }

    
    // console.log('workout log: ', this.workoutLog);
    // ============================================================================================== //

    /*
    NOTE:
    Data is now displaying inside the panel.
    Moved httpService from goals.js to panel.js.

    TODO:
    By default, its an empty graph
    User select a goal from the "View progress for" drop down menu
    User clicks "View Progress" button
    Panel dynamically displays the selectGoal data in line graph
    Follow this.workoutLog as an example of how to pull data
    */
    this.showProgress = false;
    $scope.selectedGoal;
    this.selectedData = this.workoutLogRun;
    $scope.goals = {};

    httpService.getData('/api/goals', function(goals) {
      // console.log('goals: ', goals);
      $scope.goals = goals;
      $scope.selectedGoal = $scope.goals[0];
    });

    this.handleViewProgressClick = function(e){
      this.showProgress = false;
      if($scope.selectedGoal.workoutName === 'Soccer') {
        this.selectedData = this.workoutLogSoccer;
      }

      if($scope.selectedGoal.workoutName === 'Running') {
        this.selectedData = this.workoutLogRun;
      }
      // console.log('selected goal: ', $scope.selectedGoal);
      // console.log('selected data: ', this.selectedData);
      this.showProgress = true;
    }
  })
  .component('panel', {
    controller: 'panelCtrl',
    templateUrl: 'client/components/goal-component/panel/panel.html'
});
