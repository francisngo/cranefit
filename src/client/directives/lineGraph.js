angular.module('sparrowFit')
  .directive('lineGraph'), function() {
    return {
      restrict: 'EA',
      template: '<div id="chart"></div>',
      link: function(scope, element, attrs) {
        var margin = { top: 20, right: 20, bottom: 30, left: 50 };
        var width = 960 - margin.left - margin.right;
        var height = 500 - margin.top - margin.bottom;

        var parseTime = d3.timeParse('%m-%d');

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        var valueline = d3.line()
          .x(function(d) { return x(d.workoutHistory.date); });
          .y(function(d) { return x(d.workoutHistory.number); });

        var svg = d3.select('#chart').
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        d3.json('../client-sample-data/workoutHistory.json', function(error, data) {
          if(error) throw error;

          console.log(data);
        })
      }
    }
  }
