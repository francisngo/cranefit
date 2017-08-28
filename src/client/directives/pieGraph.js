angular.module('sparrowFit')
  .directive('pieGraph', function() {
    return {
      restrict: "EA",
      template: '<div id="chart"></div>',
      scope: {
        data: "="
      },
      link: function(scope, element, attrs) {

        scope.$watch('data', function() {
          var svg = d3.select('#chart').selectAll("*").remove()

          var exercises = scope.data;

          var radius = 200;
          var color = d3.scaleOrdinal()
            .range(['#673AB7', '#00BCD4', '#4CAF50', '#4CAF50', '#E91E63', '#FFEB3B', '#9E9E9E']);

          var canvas = d3.select('#chart')
            .append('svg')
            .attr('width', '100%')
            .attr('height', 600);

          var group = canvas.append('g')
            .attr('transform', 'translate(500, 350)');

          var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

          var pie = d3.pie()
            .value((d) => { return d.unitValue; }); //use unitValue as data value

          var theArc = group.selectAll('.arc')
            .data(pie(exercises))
            .enter()
            .append('g')
            .attr('class', 'arc');

          theArc.append('path')
            .attr('d', arc)
            .attr('fill', (d) => {
              //fill in the rep data with color from range
              return color (d.data.unitValue);
            });

          theArc.append('text')
            .attr('transform', (d) => {
              //take text and put it in center
              return 'translate(' + arc.centroid(d) + ')';
            })
            .attr('dy', '0.15em')
            .text((d) => {
              return d.data.name;
            });

            // window.onresize = function() {
            //   scope.$apply();
            // };
        });
      }
    }
  });
