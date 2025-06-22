angular.module("health", []).controller("healthCtrl", [
  "$scope",
  "$window",
  function ($scope, $window) {
    $scope.healthData = [
      { device: "07:00am", cpu: "95bpm", memory: "91 mmHg", throughput: "38.5°C" },
      { device: "09:00am", cpu: "94bpm", memory: "89 mmHg", throughput:  "37.5°C" },
      { device: "11:00am", cpu: "110bpm", memory: "100 mmHg", throughput:  "40.5°C" },
      { device: "13:00pm", cpu: "92bpm", memory: "92 mmHg", throughput:  "35.2°C" },
      { device: "15:00pm", cpu: "90bpm", memory: "91 mmHg", throughput:  "34.4°C" },
      { device: "17:00pm", cpu: "89bpm", memory: "87 mmHg", throughput:  "35.1°C" },
      { device: "19:00pm", cpu: "94bpm", memory: "90 mmHg", throughput:  "33.3°C" },
      { device: "21:00pm", cpu: "103bpm", memory: "102 mmHg", throughput:  "34.2°C" },
      { device: "23:00pm", cpu: "95bpm", memory: "91 mmHg", throughput:  "36.7°C" }
    ];

    win = angular.element($window);
    win.on("resize", function () {
      console.log("1");
    });
  }
]);
var colors = ["#d71e00", "#f6ae57", "#afd7e9", "#3f7ab9"];
var totalDevices = 60;
var data = [
  { critical: 10, unhealthy: 15, moderate: 20, good: 15 },
  { critical: 5, unhealthy: 20, moderate: 25, good: 10 },
  { critical: 20, unhealthy: 10, moderate: 10, good: 20 }
];

var chartHeight = 180;
var barWidth = 30;
var d3;
var xScale = d3.scale.linear().range([0, 200]).domain([0, totalDevices]);

var yAxis = d3.scale
  .ordinal()
  .domain(["CPU", "Memory", "Throughput"])
  .rangePoints([45, 130]);

// Create Health chart
var chart = d3.select(".health-chart");

// // Draw X-Axis ticks
chart
  .append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(50,180)")
  .call(
    d3.svg
      .axis()
      .scale(xScale)
      .orient("top")
      .tickSize(150)
      .tickValues(d3.range(0, totalDevices, totalDevices / 5))
  );

// Draw Y-Axis ticks
chart
  .append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(50,20)")
  .call(d3.svg.axis().scale(yAxis).orient("left").tickSize(0));

// Draw bars
var barsGroups = chart.selectAll("rect").data(data);

// for new
barsGroups
  //.data(data)
  .enter()
  .append("g");

barsGroups.attr("transform", function (d, i) {
  return "translate(" + [50, (i + 1) * 45] + ")";
});

// for all
var barItems = barsGroups.selectAll("rect").data(function (d) {
  var sum = 0;
  return Object.keys(d).map(function (key, i) {
    var temp = { width: xScale(d[key]), x: xScale(sum), color: colors[i] };
    sum += d[key];
    return temp;
  });
});

barItems.enter().append("rect");

barItems
  .attr("x", function (d, i) {
    return d.x;
  })
  .attr("width", function (d) {
    return d.width;
  })
  .attr("height", 30)
  .attr("fill", function (d) {
    return d.color;
  });
