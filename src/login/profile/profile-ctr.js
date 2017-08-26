angular.module('sparrowFit')
  .controller('profileController', profileController)

function profileController($http, store, $location) {
  this.profile = store.get('profile');
}
