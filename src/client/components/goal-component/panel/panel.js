angular.module('sparrowFit')
  .directive('d3Test', function() {
    return {
      restrict: "EA",
      template: '<div id="chart">Chart goes here</div>',
      link: function(scope, element, attrs) {
        console.log('this is d3', d3);
        var workoutData = [10, 45, 25, 15, 50];
        var width = 1000;
        var height = 500;

        var scaling = d3.scaleLinear()
          .domain([0, 100]) //how big the area where data is
          .range([0, width]); //the size of data area

        var canvas = d3.select('#chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)

        var dataBars = canvas.selectAll('rect')
          .data(workoutData)
          .enter()
          .append('rect')
          .attr('fill', 'pink')
          .attr('width', (data) => { return scaling(data); })
          .attr('height', 20)
          .attr('y', (data, index) => { return index * 25; })

        console.log('this is dataBars', dataBars);
      }
    }
  })



  // .controller('panelCtrl', function() {
  //   workoutData = [45, 45, 45, 45, 45];
  // })

  //   .component('panel', {
  //   controller: 'panelCtrl',
  //   templateUrl: 'client/components/goal-component/panel/panel.html'
  // });
