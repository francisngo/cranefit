angular.module('sparrowFit')
  .controller('profileController', function($scope, store, httpService) {

    this.profile = store.get('profile');
    this.joinedDate = this.profile.created_at.substring(0, 10);
    this.workoutData = [10,10,40];
    $scope.workouts = [
          {name: "", unitValue: 0},
          {name: "", unitValue: 0}
        ];

    httpService.getData('/api/workouts', function(workouts) {
      $scope.workouts = formatWorkoutData(workouts);
    });

    function formatWorkoutData(workouts) {
      var stats = [];

      workouts.forEach(function(workout) {
        stats.push({
          name: workout.name,
          unitValue: workout.workoutHistory.length
        })
      })
      return stats;
    }
  })
  .component('profile', {
    controller: 'profileController',
    templateUrl: 'login/profile/profile-tpl.html'
  });

