$(function() {
  w = ($('body').width() * 0.75);
  h = 600;
  svg = d3.select("#map").append("svg").attr("width", w).attr("height", h);
  map();
  chart();
  setTimeout(function() {showComp();},1);
  $('#comp').on('click', showComp);
  $('#avg').on('click', showAvg);
  $('#fnd').on('click', showFnd);
  $('#ext').on('click', showExt);
  $('svg').css('cursor', 'pointer');

});

function map() {
      //Define map projection
      projection = d3.geo.albersUsa()
      .scale(1100)
      .translate([550,310]);

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
        .style('stroke', '#eee')
        .style('stroke-width', '0.5')
        .style("fill", "rgb(83,83,83)");
      });
}

function showComp() {
  var rscale = d3.scale.linear().domain([0,750]).range([5,150]);
  var cfscale = d3.scale.linear().domain([4,566]).range([10,360]);
  $('circle').remove();
  d3.csv("data.csv", function(data) {
      svg.selectAll("circle").data(data).enter().append("circle")
      .on("mouseover", function(d) {
        d3.select(this).style("stroke", "rgb(71,158,123)");
        d3.select("#map_info").style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY) + "px");
        d3.select("#map_info").html("<strong>"+d.city+", "+d.state+"</strong></br>Total Companies: "+d.comp).classed("hidden", false);
      })
      .on("mouseout", function() {
        d3.select(this).style("stroke", "white");
        d3.select("#map_info").classed("hidden", true);
      })
      .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
      .attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
      .style("fill", "hsla(170, 45%, 65%,0.35)")
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
        d3.select(this).style("stroke", "rgb(71,158,123)");
        d3.select("#map_info")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) + "px");
        d3.select("#map_info").html("<strong>"+d.city+", "+d.state+"</strong></br>Average Funding: "+d.avgc).classed("hidden", false);
      })
      .on("mouseout", function() {
        d3.select(this).style("stroke", "white");
        d3.select("#map_info").classed("hidden", true);
      })
    .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
    .attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
    .style("fill", "hsla(170, 45%, 65%,0.35)")
    .style("stroke", "white")
    .style("stroke-width", "2")
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
        d3.select(this).style("stroke", "rgb(71,158,123)");
        d3.select("#map_info")
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) + "px");
        d3.select("#map_info").html("<strong>"+d.city+", "+d.state+"</strong></br>Total Funding: "+"$"+d.fnd).classed("hidden", false);
      })
      .on("mouseout", function() {
        d3.select(this).style("stroke", "white");
        d3.select("#map_info").classed("hidden", true);
      })
    .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
    .attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
    .style("fill", "hsla(170, 45%, 65%,0.35)")
    .style("stroke", "white")
    .style("stroke-width", "2")
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
        d3.select(this).style("stroke", "rgb(71,158,123)");
        d3.select("#map_info").style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY) + "px");
        d3.select("#map_info").html("<strong>"+d.city+", "+d.state+"</strong></br>Exit Value: "+"$"+d.ext).classed("hidden", false);
      })
    .on("mouseout", function() {
        d3.select(this).style("stroke", "white");
        d3.select("#map_info").classed("hidden", true);
      })
    .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
    .attr("cy", function(d) {return projection([d.lon, d.lat])[1];})
    .attr("transform", "translate(0,0)")
    .style("fill", "hsla(170, 45%, 65%,0.35)")
    .style("stroke", "white")
    .style("stroke-width", "2")
    .transition().duration(1500)
    .attr("r", function(d) {return rscale(d.fnd);});
  });
  $('.btn').attr("disabled", false);
  $('#ext').attr("disabled", true);
}

function chart() {
  $.ajax({
    url: '/',
    method: 'GET',
    dataType: 'json'
  })
  .done(function(data){

    var w = ($('body').width() * 0.25),
          h = ($('body').width() * 0.25),
          r = ($('body').width() * 0.10),
          // color = d3.scale.category20c();
          color = d3.scale.ordinal()
            .range(["rgba(241,242,242,1)","rgba(180,253,240,1)","rgba(130,251,231,1)","rgba(116,214,198,1)",
              "rgba(31,249,212,1)","rgba(5,223,187,1)","rgba(40,138,121,1)","rgba(3,124,104,1)","rgba(161,170,168,1)",
              "rgba(60,66,65,1)"]);

    var vis = d3.select("#chart")
      .append("svg:svg")
      .data([data])
          .attr("width", w)
          .attr("height", h)
      .append("svg:g")
          .attr("transform", "translate("+w/1.90+","+h/2+")");

    var arc = d3.svg.arc()
        .innerRadius(90)
        .outerRadius(r);

    var arcOver = d3.svg.arc()
        .innerRadius(95)
        .outerRadius(r + 25);

    var pie = d3.layout.pie().value(function(d) {return d.companies;});

    var arcs = vis.selectAll("g.slice")
        .data(pie)
        .enter()
            .append("svg:g")
                .attr("class", "slice")
                .on("mouseover", function(d) {
                    d3.select(this).select("path").transition()
                       .duration(200)
                       .attr("d", arcOver);

                    centerText.text( d3.select(this).datum().data.name);
                    centerText2.text( d3.select(this).datum().data.companies);
                })
                .on("mouseout", function(d) {
                    d3.select(this).select("path").transition()
                       .duration(200)
                       .attr("d", arc);

                    centerText.text( "" );
                    centerText2.text("");
                });

    var centerText = vis.append("text")
        .attr("dy", "1%")
        .attr("fill","white")
        .style("text-anchor", "middle");

    var centerText2 = vis.append("text")
        .attr("dy", "10%")
        .attr("fill","white")
        .style("text-anchor", "middle");


    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } )
        .attr("d", arc);
  });
}
