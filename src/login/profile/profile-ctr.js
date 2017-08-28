angular.module('sparrowFit')
  .controller('profileController', function(store, httpService) {

    this.profile = store.get('profile');
    this.joinedDate = this.profile.created_at.substring(0, 10);
    this.workoutData = [10,10,40];
    this.testMessage = 'Hello World';
    this.workouts = [
          {name: "", unitValue: 30},
          {name: "", unitValue: 20}
        ];

    httpService.getData('/api/workouts', function(workouts) {
      this.workouts = workouts;
      console.log('profile controller called', this.workouts);
    });
  })
  .component('profile', {
    controller: 'profileController',
    templateUrl: 'login/profile/profile-tpl.html'
  });

