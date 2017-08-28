angular.module('sparrowFit')
  .controller('profileController', function(store, httpService) {

    this.profile = store.get('profile');
    this.joinedDate = this.profile.created_at.substring(0, 10);
    this.workoutData = [10,10,40];
    this.testMessage = 'Hello World';
    this.workouts = [
          {name: "fake 1", unitValue: 8},
          {name: "fake 2", unitValue: 12}
        ];

    this.exercises = [
          {name: "Pull Ups", unitValue: 8},
          {name: "Deadlifts", unitValue: 12}
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

