angular.module('sparrowFit')
  .directive('pieGraph', function() {
    return {
      restrict: "EA",
      template: '<div id="chart"></div>',
      link: function(scope, element, attrs) {
        console.log('this is the piegraph');
        var exercises = [
          {"type": "Pull Ups", "sets": 4, "reps": 8},
          {"type": "Deadlifts", "sets": 4, "reps": 12},
          {"type": "Man Makers", "sets": 4, "reps": 15},
          {"type": "Box Jumps", "sets": 4, "reps": 20},
          {"type": "Man Makers", "sets": 4, "reps": 24},
          {"type": "Leg Press", "sets": 3, "reps": 16},
          {"type": "Bicep Curls", "sets": 4, "reps": 10}
        ];

        var radius = 200;
        var color = d3.scaleOrdinal()
          .range(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']);

        var canvas = d3.select('#chart')
          .append('svg')
          .attr('width', 1000)
          .attr('height', 1000);

        var group = canvas.append('g')
          .attr('transform', 'translate(500, 350)');

        var arc = d3.arc()
          .innerRadius(0)
          .outerRadius(radius);

        var pie = d3.pie()
          .value((d) => { return d.reps; }); //use reps as data value

        var theArc = group.selectAll('.arc')
          .data(pie(exercises))
          .enter()
          .append('g')
          .attr('class', 'arc');

        theArc.append('path')
          .attr('d', arc)
          .attr('fill', (d) => {
            //fill in the rep data with color from range
            return color (d.data.reps);
          });

        theArc.append('text')
          .attr('transform', (d) => {
            //take text and put it in center
            return 'translate(' + arc.centroid(d) + ')';
          })
          .attr('dy', '0.15em')
          .text((d) => {
            return d.data.type;
          });

        // d3.json(exercises, (data) => {
        //   var radius = 200;
        //   var color = d3.scaleOrdinal()
        //     .range(['red', 'orange', 'yellow', 'green' 'blue', 'indigo', 'violet']);
        //
        //   var canvas = d3.select('#pie')
        //     .append('svg')
        //     .attr('width', 1000)
        //     .attr('height', 1000);
        //
        //   var group = canvas.append('g')
        //     .attr('transform', 'translate(500, 350)');
        //
        //   var arc = d3.arc()
        //     .innerRadius(0)
        //     .outerRadius(radius);
        //
        //   var pie = d3.pie()
        //     .value((d) => { return d.reps; }); //use reps as data value
        //
        //   var theArc = group.selectAll('.arc')
        //     .data(pie(exercises))
        //     .enter()
        //     .append('g')
        //     .attr('class', 'arc');
        //
        //   theArc.append('path')
        //     .attr('d', arc)
        //     .attr('fill', (d) => {
        //       //fill in the rep data with color from range
        //       return color (d.data.reps);
        //     });
        //
        //   theArc.append('text')
        //     .attr('transform', (d) => {
        //       //take text and put it in center
        //       return 'translate(' + arc.centroid(d) + ')';
        //     })
        //     .attr('dy', '0.15em')
        //     .text((d) => {
        //       return d.data.type;
        //     });
        // });
      }
    }
  });
