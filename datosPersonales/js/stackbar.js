    var timeout = 2000;

    var dataset = [];

    var time_total = [];
    var run_time_total = [];
    var walk_time_total = [];
    var elip_time_total = [];
    var ab_time_total = [];
    var leg_time_total = [];

    var km_total = [];
    var run_km_total = [];
    var walk_km_total = [];
    var elip_km_total = [];

    var n, m, stack, layers, yGroupMax, yStackMax;
    var margin, width, height;
    var x, y, color;
    var xAxis;
    var svg;
    var layer;
    var rect;

    // Correr, Caminar, Abdominales, Piernas, Eliptico
    //Enero
    //Febrero
    //Marzo
    //Abril
    var dataset_time = [
      [312, 824, 113, 231, 40],
      [92, 901, 104, 345, 153],
      [80, 1520, 58, 49, 0],
      [64, 1347, 30, 30, 21]
    ];

    // Correr, Caminar, Eliptico
    var dataset_km = [
      ['Enero', 29.8, 42.4, 3.2],
      ['Febrero', 10.9, 47.3, 9.4],
      ['Marzo', 9.9, 88.3, 0],
      ['Abril', 9.51, 119.08, 1.76]
    ];

    //Enero,Feb,Marzo,Abril
    var total_time = [1520, 1595, 1707, 1492];
    var total_km = [75.4, 67.61, 98.2, 130.35];


$(document).ready(function() {
  init_csv();
  init_vars();
  display_by_stackbar();
});

function init_vars() {
  n = 5; // number of layers - actividades(abs-correr-etc)
  m = 4; // number of samples per layer(meses)
  stack = d3.layout.stack();
  layers = stack(d3.range(n).map(function() { return bumpLayer(m, .1); }));
  yGroupMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y; }); });
  yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

  margin = {top: 40, right: 10, bottom: 20, left: 10};
  width = 960 - margin.left - margin.right;
  height = 500 - margin.top - margin.bottom;

  x = d3.scale.ordinal()
        .domain(d3.range(m))
        .rangeRoundBands([0, width], .08);

  y = d3.scale.linear()
        .domain([0, yStackMax])
        .range([height, 0]);

    // var color = d3.scale.linear()
    //     .domain([0, n - 1])
    //     .range(["#ff8c66", "#b3ff66", "#66d9ff", "#b366ff", "#ff66ff"]);

  color = d3.scale.ordinal()
    .domain(["Correr", "Eliptico", "Caminar", "Abdominales", "Piernas"])
    .range(["#ff8c66", "#b3ff66", "#66d9ff", "#b366ff", "#ff66ff"]);

  xAxis = d3.svg.axis()                       
        .scale(x)
        .tickSize(0)
        .tickPadding(6)
        .orient("bottom");

  svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  layer = svg.selectAll(".layer")
        .data(layers)
      .enter().append("g")
        .attr("class", "layer")
        .style("fill", function(d, i) { return color(i); });

  rect = layer.selectAll("rect")
        .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", height)
        .attr("width", x.rangeBand())
        .attr("height", 0);
}

function init_csv() {
  var i =0;
    d3.csv("/data/activity.csv", function(data) {
      dataset = data;
      for(i=0; i<4; i++) {
        time_total[i] = 0;
        km_total[i] = 0;
        run_time_total[i]=0;
        walk_time_total[i]=0;
        elip_time_total[i]=0;
        ab_time_total[i]=0;
        leg_time_total[i]=0;
        run_km_total[i]=0;
        walk_km_total[i]=0;
        elip_km_total[i]=0;
      }
      data.forEach(function(d) {
        time_total[(d.month_number)-1] = time_total[(d.month_number)-1] + +d.duration;
        km_total[(d.month_number)-1] = km_total[(d.month_number)-1] + +d.km;
        if (d.group === "Correr") {
          run_time_total[(d.month_number)-1] = run_time_total[(d.month_number)-1] + +d.duration;
          run_km_total[(d.month_number)-1] = run_km_total[(d.month_number)-1] + +d.km;
        } else if (d.group === "Caminar") {
          walk_time_total[(d.month_number)-1] = walk_time_total[(d.month_number)-1] + +d.duration;
          walk_km_total[(d.month_number)-1] = walk_km_total[(d.month_number)-1] + +d.km;
        } else if (d.group === "Eliptico") {
          elip_time_total[(d.month_number)-1] = elip_time_total[(d.month_number)-1] + +d.duration;
          elip_km_total[(d.month_number)-1] = elip_km_total[(d.month_number)-1] + +d.km;
        } else if (d.group === "Piernas") {
          leg_time_total[(d.month_number)-1] = leg_time_total[(d.month_number)-1] + +d.duration;
        } else if (d.group === "Abdominales") {
          ab_time_total[(d.month_number)-1] = ab_time_total[(d.month_number)-1] + +d.duration;
        }
      });
    });
}

function display_by_stackbar() {
    rect.transition()
        .delay(function(d, i) { return i * 10; })
        .attr("y", function(d) { return y(d.y0 + d.y); })
        .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    d3.selectAll("input").on("change", change());
}

function change() {
  clearTimeout(timeout);
  var groupedSelected = d3.select("input[value=\"grouped\"]").property("checked");
  var stackSelected = d3.select("input[value=\"stacked\"]").property("checked");
  if (groupedSelected == true) {
    transitionGrouped();
  }else if (stackSelected == true) {
    transitionStacked();
  } 
}

function transitionGrouped() {
  y.domain([0, yGroupMax]);

  rect.transition()
      .duration(500)
      .delay(function(d, i) { return i * 10; })
      .attr("x", function(d, i, j) { return x(d.x) + x.rangeBand() / n * j; })
      .attr("width", x.rangeBand() / n)
    .transition()
      .attr("y", function(d) { return y(d.y); })
      .attr("height", function(d) { return height - y(d.y); });
}

function transitionStacked() {
  y.domain([0, yStackMax]);

  rect.transition()
      .duration(500)
      .delay(function(d, i) { return i * 10; })
      .attr("y", function(d) { return y(d.y0 + d.y); })
      .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
    .transition()
      .attr("x", function(d) { return x(d.x); })
      .attr("width", x.rangeBand());
}

// Inspired by Lee Byron's test data generator.
//n cantidad de meses
function bumpLayer(n, o) {

  //a es un array
  function bump(a) {
    var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
    //de 0 a cantidad de meses
    for (var i = 0; i < n; i++) {
      var w = (i / n - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }

  var a = [], i;
  //de 0 a 4, cantidad de meses
  for (i = 0; i < n; ++i) {
    a[i] = o + o * Math.random();
  }
  // de 0 a cantidad de actividades
  for (i = 0; i < 5; ++i) {
    bump(a);
  } 
  return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
}