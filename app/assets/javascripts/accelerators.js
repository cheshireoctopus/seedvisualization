$(function() {
  w = 1200;
  h = 600;
  svg = d3.select("#map").append("svg").attr("width", w).attr("height", h);
  cscale = d3.scale.linear().domain([30803,222813855]).range([0,360]);
  map();
  setTimeout(function() {showExt();},2000);
  $('#comp').on('click', showComp);
  $('#avg').on('click', showAvg);
  $('#fnd').on('click', showFnd);
  $('#ext').on('click', showExt);
  $('svg').css('cursor', 'pointer');
});

function map() {
      //Define map projection
      projection = d3.geo.albersUsa()
      .scale(1300)
      .translate([625,310]);

      //Define path generator
      path = d3.geo.path()
        .projection(projection);

      //Load in GeoJSON data
      d3.json("us-states.json", function(json) {

        //Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style('stroke', 'white')
        .style('stroke-width', '1.5')
        .style("fill", "#black");
      });
}

function showComp() {
  var rscale = d3.scale.linear().domain([0,750]).range([5,150]);
  var cfscale = d3.scale.linear().domain([4,566]).range([10,360]);
  $('circle').remove();
  d3.csv("data.csv", function(data) {
      svg.selectAll("circle").data(data).enter().append("circle")
      .on("mouseover", function(d) {
        d3.select("#map_info").style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY) + "px");
        d3.select("#map_info").html(d.city+"<br> Total Companies: "+d.comp).classed("hidden", false);
      })
      .on("mouseout", function() {
        d3.select("#map_info").classed("hidden", true);
      })
      .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
      .attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
      .style("fill", function(d) {return "hsla("+cfscale(d.comp)*Math.random()*10+",50%,50%,0.95)";})
      .style("stroke", "white")
      .style("stroke-width", "2")
      .transition()
      .duration(1500)
      .attr("r", function(d) {return rscale(d.comp);});
  });
  $('.btn').attr("disabled", false);
  $('#comp').attr("disabled", true);
}

function showAvg() {
  var rscale = d3.scale.linear().domain([30803,2813855]).range([5,40]);
  $('circle').remove();
  d3.csv("data.csv", function(data) {
    svg.selectAll("circle").data(data).enter().append("circle")
    .on("mouseover", function(d) {
        d3.select("#map_info")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) + "px");
        d3.select("#map_info").html(d.city+"<br> Average Funding: "+d.avgc).classed("hidden", false);
      })
      .on("mouseout", function() {
        d3.select("#map_info").classed("hidden", true);
      })
    .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
    .attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
    .style("fill", function(d) {return "hsla("+cscale(d.avg)*100+",50%,50%,0.95)";})
    .transition()
    .duration(1500)
    .attr("r", function(d) {return rscale(d.avg);});
  });
  $('.btn').attr("disabled", false);
  $('#avg').attr("disabled", true);
}

function showFnd() {
  var rscale = d3.scale.linear().domain([750000,1592642241]).range([15,150]);
  $('circle').remove();
  d3.csv("data.csv", function(data) {
    svg.selectAll("circle").data(data).enter().append("circle")
    .on("mouseover", function(d) {
        d3.select("#map_info")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) + "px");
        d3.select("#map_info").html(d.city+"<br> Total Funding: "+"$"+d.fnd).classed("hidden", false);
      })
      .on("mouseout", function() {
        d3.select("#map_info").classed("hidden", true);
      })
    .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
    .attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
    .style("fill", function(d) {return "hsla("+cscale(d.fnd)*100+",50%,50%,0.95)";})
    .transition().duration(1500)
    .attr("r", function(d) {return rscale(d.fnd);});
  });
  $('.btn').attr("disabled", false);
  $('#fnd').attr("disabled", true);
}

function showExt() {
  var rscale = d3.scale.linear().domain([500000,1245658100]).range([15,150]);
  $('circle').remove();
  d3.csv("../data.csv", function(data) {
    svg.selectAll("circle").data(data).enter().append("circle")
    .on("mouseover", function(d) {
        d3.select(this).style("fill", "white").style("stroke", "hsla(225,50%%,50%,0.95)");
        d3.select("#map_info").style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY) + "px");
        d3.select("#map_info").html(d.city+"<br> Exit Valuations: "+"$"+d.ext).classed("hidden", false);
      })
    .on("mouseout", function() {
        d3.select(this).style("fill","hsla(225,50%%,50%,0.95)").style("stroke", "white");
        d3.select("#map_info").classed("hidden", true);
      })
    .on("click", function(d, i, a) {
        d3.select(this).transition().duration(1500).style("transform","rotate(-60)");
      })
    .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
    .attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
    .attr("transform", "translate(0,0)")
    .style("fill","hsla(225,50%%,50%,0.95)")
    .style("stroke", "white")
    .style("stroke-width", "3")
    .transition().duration(1500)
    .attr("r", function(d) {return rscale(d.fnd);});
  });
  $('.btn').attr("disabled", false);
  $('#ext').attr("disabled", true);
}
