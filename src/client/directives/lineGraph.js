angular.module('sparrowFit')
  .directive('lineGraph', function() {
    return {
      restrict: 'EA',
      template: '<div id="chart"></div>',
      scope: {
        data: '='
      },
      link: function(scope, element, attrs) {

        scope.$watch('data', function() {
          //clear any existing markup inside chart div
          var svg = d3.select('#chart').selectAll("*").remove()

          var lineData = scope.data;

          var margin = { top: 20, right: 20, bottom: 30, left: 50 };
          var width = 850 - margin.left - margin.right;
          var height = 400 - margin.top - margin.bottom;

          var parseTime = d3.timeParse('%m-%d');

          var x = d3.scaleTime().range([0, width]);
          var y = d3.scaleLinear().range([height, 0]);

          var valueline = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.number); });

          var svg = d3.select('#chart')
              .append('svg')
              .attr('width', width + margin.left + margin.right)
              .attr('height', height + margin.top + margin.bottom)
            .append('g')
              .attr('transform',
                    'translate(' + margin.left + ',' + margin.top + ')');

          function make_y_gridlines() {
            return d3.axisLeft(y).ticks(10);
          }

          function draw(data, historyType, predictionType) {
            const logs = data[historyType];
            const futures = data[predictionType];

            // Scale the range of the data
            x.domain(d3.extent(logs.concat(futures), function(d) { return d.date; }));
            y.domain([0, d3.max(logs.concat(futures), function(d) { return d.number; })]);

            // Add the X gridlines
            svg.append('g')
              .attr('class', 'grid')
              .call(make_y_gridlines().tickSize(-width).tickFormat(''));

            // Add the valueline path.
            svg.append("path")
                .data([logs])
                .attr("class", "line")
                .attr("d", valueline);

            // Add the X Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add the Y Axis
            svg.append("g")
                .call(d3.axisLeft(y));
          }

          // draw(workout, 'workoutHistory');
          draw(lineData, 'workoutHistory', 'workoutPredictions');

        });
      }
    }
  });

        // var lineData = {
        //    "workoutName": "string",
        // 	 "goalDate": "date",
        // 	 "goalNumber": "number",
        //    "workoutHistory": [
        //       {
        //          "Date": "08-01" ,
        //          "Number": 15
        //       },
        //       {
        //          "Date": "08-02",
        //          "Number": 20
        //       },
        //       {
        //          "Date": "08-04",
        //          "Number": 30
        //       },
        //       {
        //          "Date": "08-05",
        //          "Number": 45
        //       },
        //       {
        //          "Date": "08-06",
        //          "Number": 30
        //       },
        //       {
        //          "Date": "08-07" ,
        //          "Number": 15
        //       },
        //       {
        //          "Date": "08-08",
        //          "Number": 20
        //       },
        //       {
        //          "Date": "08-09",
        //          "Number": 50
        //       },
        //       {
        //          "Date": "08-10",
        //          "Number": 30
        //       },
        //       {
        //          "Date": "08-11",
        //          "Number": 45
        //       },
        //       {
        //          "Date": "08-12",
        //          "Number": 30
        //       }
        //    ],
        //    "workoutPredictions": [
        //      {
        //         "Date": "08-13",
        //         "Number": 20
        //      },
        //      {
        //         "Date": "08-14",
        //         "Number": 50
        //      },
        //      {
        //         "Date": "08-15",
        //         "Number": 30
        //      },
        //      {
        //         "Date": "08-16",
        //         "Number": 45
        //      },
        //      {
        //         "Date": "08-17",
        //         "Number": 30
        //      }
        //    ]
        // }
        // console.log('lineData: ', lineData);
