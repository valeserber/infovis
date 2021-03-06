var a = [ 
["visual", 9], 
["understanding", 2], 
["deals", 2], 
["science", 3], 
["much", 2], 
["be", 5], 
["datasets", 2], 
["how", 2], 
["information", 29], 
["visualization", 28], 
["sometimes", 3], 
["graphics", 4], 
["do", 3], 
["which", 3], 
["image", 3], 
["typically", 3], 
["patterns", 2], 
["users", 2], 
["external", 2], 
["human", 3], 
["visualizations", 3], 
["modify", 2], 
["form", 2], 
["taking", 2], 
["called", 4], 
["spatial", 2], 
["large", 3], 
["contrast", 2], 
["other", 2], 
["focuses", 2], 
["representations", 6], 
["amplify", 4], 
["world", 2], 
["have", 2], 
["map", 2], 
["attributes", 3], 
["nonspatial", 2], 
["use", 5], 
["screen", 3], 
["geographic", 2], 
["pages", 2], 
["interactivity", 2], 
["different", 3], 
["new", 2], 
["mapped", 2], 
["unstructured", 3], 
["make", 2], 
["structure", 2], 
["sensory", 2], 
["forms", 2], 
["properties", 2], 
["defined", 2], 
["temporal", 2], 
["models", 2], 
["using", 2], 
["each", 3], 
["cognitive", 2], 
["items", 3], 
["structured", 2], 
["variables", 2], 
["makes", 3], 
["coordinates", 3], 
["such", 3], 
["fish", 2], 
["relations", 2], 
["charts", 2], 
["3d", 2], 
["has", 5], 
["results", 2], 
["involves", 2], 
["records", 5], 
["show", 2], 
["way", 2], 
["what", 2], 
["criteria", 4], 
["graphical", 6], 
["interactive", 4], 
["work", 2], 
["examples", 3], 
["computer", 7], 
["more", 3], 
["display", 2], 
["abstract", 11], 
["dimensions", 2], 
["data", 34], 
["used", 2], 
["space", 8], 
["describing", 2], 
["should", 2], 
["create", 2], 
["individual", 2], 
["kind", 3], 
["important", 4], 
["techniques", 4], 
["scientific", 3], 
["cognition", 5], 
["advantage", 2], 
["interaction", 4], 
["user", 3] 
];


a.sort(function(a, b){
    return b[1]-a[1];
});

var b = d3.scale
  .linear()
  .domain([2,34])
  .range([15,80]);

var colors = d3.scale.category10();

d3.select("span#viz")
  .select("span")
  .data(a)
  .enter()
  .append("span")
  .style("font-size", function(d) { return b(d[1]) + "px"; })
  .style("color", function(d){ return colors(d[1]); })
  .style("font-family", "monospace")
  .text( function(d, i) { return d[0]; })
  .append("span")
  .text(" ");


