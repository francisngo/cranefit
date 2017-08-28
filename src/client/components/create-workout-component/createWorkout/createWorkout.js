angular.module('sparrowFit')
.controller('CreateWorkoutCtrl', function($scope, $http, store) {
  // object to store data to be sent to sever
  this.data = {};

  //addWorkout() create a template of named workout
  this.addWorkout = function() {
    this.data.name = this.name;
    this.data.unitValue = this.unitValue;
    this.data.unitName = this.unitName;

    console.log('object to be sent to server: ', this.data);

    // reset alert
    $scope.onSuccess = false;
    $scope.onFailure = false;

    // make POST request to server
    $http.post('/api/workouts', this.data)
      .then(function(res) {
        // on success, show success alert
        $scope.onSuccess = res.data.name;
      }, function() {
        // on failure, show danger alert
        $scope.onFailure = true;
      })
  };
})
.component('createWorkout', {
  controller: 'CreateWorkoutCtrl',
  templateUrl: 'client/components/create-workout-component/createWorkout/createWorkout.html'
});
