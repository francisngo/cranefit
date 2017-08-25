angular.module('sparrowFit')
  .controller('panelCtrl', function(goalService) {
  })
  .component('panel', {
    bindings : { resolvePanel :'<'},
    controller: 'panelCtrl',
    templateUrl: 'client/components/goal-component/panel/panel.html'
  });
