angular.module('sparrowFit')
  .controller('profileController', function($scope, store, httpService) {

    this.profile = store.get('profile');
    this.joinedDate = this.profile.created_at.substring(0, 10);
    this.workoutData = [10,10,40];
    this.testMessage = 'Hello World';
    $scope.workouts = [
          {name: "", unitValue: 0},
          {name: "", unitValue: 0}
        ];

    httpService.getData('/api/workouts', function(workouts) {
      $scope.workouts = workouts;
      console.log('profile controller called', this.workouts);
    });
  })
  .component('profile', {
    controller: 'profileController',
    templateUrl: 'login/profile/profile-tpl.html'
  });

