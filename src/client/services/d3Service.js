//create factory which will enable us to inject the D3 module into custom directive
angular.module('d3')
  .factory('d3Service', [function() {
    var d3;
    // insert d3 code here
    return d3;
  }]);
