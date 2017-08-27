angular.module('sparrowFit')
  .controller('profileController', function(store, httpService) {

    this.testMessage = 'Hello World';
    this.workouts = {};
    this.profile = store.get('profile');

    httpService.getData('/api/workouts', function(workouts) {
      this.workouts = workouts;
      console.log('profile controller called', this.workouts);
    });  
  })
  .component('profile', {
    controller: 'profileController',
    templateUrl: 'login/profile/profile-tpl.html'
  });

