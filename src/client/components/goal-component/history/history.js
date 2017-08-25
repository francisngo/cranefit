angular.module('sparrowFit')
  .controller('historyCtrl', function(goalService) {
  })
  .component('history', {
    bindings : { resolveHistory :'<'},
    controller: 'historyCtrl',
    templateUrl: 'client/components/goal-component/history/history.html'
  });
