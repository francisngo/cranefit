angular.module('sparrowFit')
.controller('WorkoutCtrl', function WorkoutCtrl() {
})
.component('workout', {
  controller: 'WorkoutCtrl',
  templateUrl: 'client/components/workout-component/workout.html'
});
