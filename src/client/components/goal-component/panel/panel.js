angular.module('sparrowFit')
  .controller('panelCtrl', function() {
    // add workout data to scope
    this.workoutData = [10,10,10];
  })
  .component('panel', {
  controller: 'panelCtrl',
  templateUrl: 'client/components/goal-component/panel/panel.html'
});
