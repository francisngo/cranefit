angular.module('sparrowFit')
  .controller('panelCtrl', function($scope, httpService) {

    //this is only here to render bar graph
    this.workoutData = [10, 10, 10];

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

    $scope.goals = {};

    httpService.getData('/api/goals', function(goals) {
      // console.log('goals: ', goals);
      $scope.goals = goals;
      $scope.selectedGoal = $scope.goals[0];
    })

    this.handleClick = function(e){
      console.log('button clicked');
    }
  })
  .component('panel', {
    controller: 'panelCtrl',
    templateUrl: 'client/components/goal-component/panel/panel.html'
});
