angular.module('sparrowFit')
  .controller('goalListCtrl', function(goalService) {
  })
  .component('goalList', {
    bindings : { resolveGoalList :'<'},
    controller: 'goalListCtrl',
    templateUrl: 'client/components/goal-component/goallist/goalList.html'
  });
