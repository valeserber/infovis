drawChart();

function drawChart() {
  var dataset = [
      ['I felt creative', 88, 8, 4],
      ['I felt an emotional reaction', 66, 22, 12],
      ['I learned something new about the text', 63, 24, 13],
      ['It confirmed my understanding of the text', 57, 33, 10],
      ['It jogged my memory', 50, 35, 15],
      ['The Wordle confused me', 5, 9, 86]
    ];

    

    //Width and height
    var width = 500;
    var height = 100;
    var barHeight = 20;
    var x = d3.scale.linear()
      .range([0, width]);

    //Create SVG element
    var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

      //agree
    svg.selectAll("rect1")
        .data(dataset)
        .enter()
        .append("rect")
          .attr("y", function(d, i) {
                      return i * 21;  //Bar width of 20 plus 1 for padding
              })
          .attr("x", 300)
          .style("height", "20px")
          .style("display", "inline-block")
          .style("width", function(d) { return d[1] + 'px';})
          .attr("fill", "teal")

          //neutral
    svg.selectAll('rect2')
          .data(dataset)
          .enter()
          .append('rect')
          .attr("fill", "#eeeeee")
          .attr("y", function(d,i) { return i*21})
          .attr("x", function(d) { return 300+d[1] })
          .style("height", "20px")
          .style("display", "inline-block")
          .style("width", function(d) { return d[2] + 'px'});

          //disagree
    svg.selectAll('rect3')
          .data(dataset)
          .enter()
          .append('rect')
          .attr("fill", "#ff7f7f")
          .attr("y", function(d,i) { return i*21})
          .attr("x", function(d) { return 300+d[1] + d[2] })
          .style("height", "20px")
          .style("display", "inline-block")
          .style("width", function(d) { return d[3] + 'px'});

    svg.selectAll('text')
          .data(dataset)
          .enter()
          .append('text')
          .text(function(d) { return d[0]; })
          .style("font-size", "14px")
          .style("display", "inline-block")
          .style("line-height", "20px")
          .attr("y", function(d,i) { return 18+i*25});

    // svg.selectAll("rect")
    //     .data(dataset)
    //     .enter()
    //     .append("text")   
    //     .attr("dy", ".35em")
    //     .text(function(d) { return d[1]; });


}
