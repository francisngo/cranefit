angular.module('sparrowFit')
  .controller('panelCtrl', function($scope, httpService) {

    //this is only here to render bar graph
    this.workoutData = [10, 10, 10];

    // ==== delete this after successfully grabbing selectedGoal data from database with getData ==== //
    //implement static data to line graph
    this.workoutLog = {
       "workoutName": "string",
    	 "goalDate": "date",
    	 "goalNumber": "number",
       "workoutHistory": [
          {
             "Date": "08-01" ,
             "Number": 15
          },
          {
             "Date": "08-02",
             "Number": 20
          },
          {
             "Date": "08-04",
             "Number": 30
          },
          {
             "Date": "08-05",
             "Number": 45
          },
          {
             "Date": "08-06",
             "Number": 30
          },
          {
             "Date": "08-07" ,
             "Number": 15
          },
          {
             "Date": "08-08",
             "Number": 20
          },
          {
             "Date": "08-09",
             "Number": 50
          },
          {
             "Date": "08-10",
             "Number": 30
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
         },
         {
            "Date": "08-14",
            "Number": 50
         },
         {
            "Date": "08-15",
            "Number": 30
         },
         {
            "Date": "08-16",
            "Number": 45
         },
         {
            "Date": "08-17",
            "Number": 30
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

    $scope.goals = {};

    httpService.getData('/api/goals', function(goals) {
      // console.log('goals: ', goals);
      $scope.goals = goals;
      $scope.selectedGoal = $scope.goals[0];
    });

    console.log('$scope goals: ', $scope.goals);

    this.handleClick = function(e){
      console.log('button clicked');
    }
  })
  .component('panel', {
    controller: 'panelCtrl',
    templateUrl: 'client/components/goal-component/panel/panel.html'
});
