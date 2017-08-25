angular.module('sparrowFit')
.controller('WorkoutCtrl', function WorkoutCtrl(httpService, timerService, userDataService, store) {
  this.timer = timerService;
  this.userData = {};
  this.workoutData = '';
  this.workout = '';
  this.url = '/api/workout/';

  this.name = function(name) {
    this.workoutData = userDataService.getWorkout(this.userData, name);
    this.workout = this.workoutData.template;
    this.timed = this.workoutData.timed;
    if(this.timed===false){
      this.untimed = true;
    } else {
      this.untimed = false;
    }
  };

  httpService.getData(this.url, (returnValue) => {
    this.userData = returnValue;

    this.myTimedTemplates = this.userData
    .filter((a) => {
      return a.timed;
    })
    .map((a) => {
      return a.templateName;
    })
    this.myUntimedTemplates = this.userData
    .filter((b) => {
      return b.timed === false;
    })
    .map((b) => {
      return b.templateName;
    })
  });

  this.getTimedTemps = function getTimedTemps() {
    this.showTimed = this.myTimedTemplates;
  };

  this.getUntimedTemps = function getUntimedTemps() {
    this.showUntimed = this.myUntimedTemplates;
  };

})

.component('workout', {
  controller: 'WorkoutCtrl',
  templateUrl: 'client/components/workout-component/workout.html'
});
