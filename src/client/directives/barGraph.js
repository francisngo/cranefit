angular.module('sparrowFit')
  .directive('barGraph', function() {
    return {
      restrict: "EA",
      template: '<div id="chart"></div>',
			scope: {
				data: "="
			},
      link: function(scope, element, attrs) {
        var barData = scope.data;
        var width = 1000;
        var height = 400;

        var scaling = d3.scaleLinear()
          .domain([0, 100]) //how big the area where data is
          .range([0, width]); //the size of data area

        var canvas = d3.select('#chart')
          .append('svg')
          .attr('width', width)
          .attr('height', height)

        var dataBars = canvas.selectAll('rect')
          .data(barData)
          .enter()
          .append('rect')
          .attr('fill', 'pink')
          .attr('width', (data) => { return scaling(data); })
          .attr('height', 20)
          .attr('y', (data, index) => { return index * 25; })
      }
    }
  })
