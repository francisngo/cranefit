angular.module('sparrowFit')
  .controller('panelCtrl', function() {
  })
  .component('panel', {
    bindings : { resolvePanel :'<'},
    controller: 'panelCtrl',
    templateUrl: 'client/components/goal-component/panel/panel.html'
  });
