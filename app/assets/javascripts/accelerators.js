$(function() {
  w = ($('#container').width() * 0.73);
  h = (w/1.66);

  map();
  setTimeout(function() {showComp();},2550);
  $('#comp').on('click', showComp);
  $('#avg').on('click', showAvg);
  $('#fnd').on('click', showFnd);
  $('#ext').on('click', showExt);
  $('svg').css('cursor', 'pointer');
  $('#about_link').css('cursor', 'pointer').on('click', about);
});

function map() {
  svg = d3.select("#map").append("svg").attr("width", w).attr("height", h);
  //Define map projection
  projection = d3.geo.albersUsa()
    .scale((w/h)*w*0.70)
    .translate([w/1.85,h/2]);

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
      .transition()
      .duration(2500)
      .attr("d", path)
      .style('stroke', '#eee')
      .style('stroke-width', '0.5')
      .style("fill", "rgb(83,83,83)");
  });
}

function showComp() {
  $('.btn').attr("disabled", false);
  $('#comp').attr("disabled", true);
  $('#chart').slideUp(1000);
  setTimeout(function() {$('#chart svg').remove();},1025);
  setTimeout(function() {chartComp();},1050);
  $('#chart').slideDown(1200);

  d3.selectAll($('circle')).transition().duration(350)
  .attr("cx",w/1.75).attr("cy",h/2).transition().duration(350).delay(350).attr("r","5");
  setTimeout(function() {$('circle').remove();},1150);

  var rscale = d3.scale.linear().domain([0,750]).range([5,125]);
  setTimeout(function() {
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
        .attr("cx",w/1.75).attr("cy",h/2)
        .attr("r","5")
        .style("fill", "hsla(170, 45%, 65%,0.35)")
        .style("stroke", "white")
        .style("stroke-width", "2")
        .transition().duration(350).attr("r", function(d) {return rscale(d.comp);})
        .transition()
        .duration(350)
        .delay(350)
        .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
        .attr("cy", function(d) {return projection([d.lon, d.lat])[1];});
    });
  },1150);
}

function showAvg() {
  $('.btn').attr("disabled", false);
  $('#avg').attr("disabled", true);
  $('#chart').slideUp(1000);
  setTimeout(function() {$('#chart svg').remove();},1025);
  setTimeout(function() {chartAvg();},1050);
  $('#chart').slideDown(1200);

  d3.selectAll($('circle')).transition().duration(350)
  .attr("cx",w/1.75).attr("cy",h/2).transition().duration(350).delay(350).attr("r","5");
  setTimeout(function() {$('circle').remove();},1150);
  setTimeout(function() {
  var rscale = d3.scale.linear().domain([30803,2813855]).range([5,40]);
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
        .attr("cx",w/1.75).attr("cy",h/2)
        .attr("r","5")
        .style("fill", "hsla(170, 45%, 65%,0.35)")
        .style("stroke", "white")
        .style("stroke-width", "2")
        .transition().duration(350).attr("r", function(d) {return rscale(d.avg);})
        .transition()
        .duration(350)
        .delay(350)
        .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
        .attr("cy", function(d) {return projection([d.lon, d.lat])[1];});
  });
  },1150);
}

function showFnd() {
  $('.btn').attr("disabled", false);
  $('#fnd').attr("disabled", true);
  $('#chart').slideUp(1000);
  setTimeout(function() {$('#chart svg').remove();},1025);
  setTimeout(function() {chartFnd();},1050);
  $('#chart').slideDown(1200);

  d3.selectAll($('circle')).transition().duration(350)
  .attr("cx",w/1.75).attr("cy",h/2).transition().duration(350).delay(350).attr("r","5");
  setTimeout(function() {$('circle').remove();},1150);

  setTimeout(function() {
    var rscale = d3.scale.linear().domain([750000,1592642241]).range([10,125]);
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
        .attr("cx",w/1.75).attr("cy",h/2)
        .attr("r","5")
        .style("fill", "hsla(170, 45%, 65%,0.35)")
        .style("stroke", "white")
        .style("stroke-width", "2")
        .transition().duration(350).attr("r", function(d) {return rscale(d.fnd);})
        .transition()
        .duration(350)
        .delay(350)
        .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
        .attr("cy", function(d) {return projection([d.lon, d.lat])[1];});
    });
  },1150);
}

function showExt() {
  $('.btn').attr("disabled", false);
  $('#ext').attr("disabled", true);
  $('#chart').slideUp(1000);
  setTimeout(function() {$('#chart svg').remove();},1025);
  setTimeout(function() {chartExt();},1050);
  $('#chart').slideDown(1200);

  d3.selectAll($('circle')).transition().duration(350)
  .attr("cx",w/1.75).attr("cy",h/2).transition().duration(350).delay(350).attr("r","5");
  setTimeout(function() {$('circle').remove();},1150);

  var rscale = d3.scale.linear().domain([500000,1245658100]).range([10,110]);
  setTimeout(function() {
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
        .attr("cx",w/1.75).attr("cy",h/2)
        .attr("r","5")
        .style("fill", "hsla(170, 45%, 65%,0.35)")
        .style("stroke", "white")
        .style("stroke-width", "2")
        .transition().duration(350).attr("r", function(d) {return rscale(d.ext);})
        .transition()
        .duration(350)
        .delay(350)
        .attr("cx", function(d) {return projection([d.lon, d.lat])[0];})
        .attr("cy", function(d) {return projection([d.lon, d.lat])[1];});
    });
  },1150);
}

function chartComp() {
  $.ajax({
    url: '/',
    method: 'GET',
    dataType: 'json'
  })
  .done(function(data){
    var w = ($('body').width() * 0.25),
          h = ($('body').width() * 0.25),
          r = ($('body').width() * 0.10),
          color = d3.scale.ordinal()
            .range(["rgba(241,242,242,1)","rgba(125,205,192,1)","rgb(83,83,83)","rgba(180,253,240,1)"]);

    var chart = d3.select("#chart")
      .append("svg:svg")
      .data([data])
          .attr("width", w)
          .attr("height", h)
      .append("svg:g")
          .attr("transform", "translate("+w/2+","+h/2+")");

    var arc = d3.svg.arc()
        .innerRadius(120)
        .outerRadius(r+20);

    var arcOver = d3.svg.arc()
        .innerRadius(122)
        .outerRadius(r + 30);

    var pie = d3.layout.pie().value(function(d) {return d.companies;});

    var arcs = chart.selectAll("g.slice")
        .data(pie)
        .enter()
            .append("svg:g")
                .attr("class", "slice")
                .on("mouseover", function(d) {
                    d3.select(this).select("path").transition().duration(500).attr("d", arcOver);
                    centerText.text( d3.select(this).datum().data.name);
                    centerText2.text( d3.select(this).datum().data.companies);
                })
                .on("mouseout", function(d) {
                    d3.select(this).select("path").transition().duration(500).attr("d", arc);
                });

    var centerText = chart.append("text")
        .attr("dy", "1%")
        .attr("fill","white")
        .attr("font-weight", "bold")
        .style("text-anchor", "middle");

    var centerText2 = chart.append("text")
        .attr("dy", "10%")
        .attr("fill","white")
        .style("text-anchor", "middle");


    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } )
        .attr("d", arc);
  });
}

function chartAvg() {
  $.ajax({
    url: '/',
    method: 'GET',
    dataType: 'json'
  })
  .done(function(data){

    var w = ($('body').width() * 0.25),
          h = ($('body').width() * 0.25),
          r = ($('body').width() * 0.10),
          color = d3.scale.ordinal()
            .range(["rgba(241,242,242,1)","rgba(125,205,192,1)","rgb(83,83,83)","rgba(180,253,240,1)"]);

    var chart = d3.select("#chart")
      .append("svg:svg")
      .data([data])
          .attr("width", w)
          .attr("height", h)
      .append("svg:g")
          .attr("transform", "translate("+w/2+","+h/2+")");

    var arc = d3.svg.arc()
        .innerRadius(120)
        .outerRadius(r+20);

    var arcOver = d3.svg.arc()
        .innerRadius(122)
        .outerRadius(r + 30);

    var pie = d3.layout.pie().value(function(d) {return d.average;});

    var arcs = chart.selectAll("g.slice")
        .data(pie)
        .enter()
            .append("svg:g")
                .attr("class", "slice")
                .on("mouseover", function(d) {
                    d3.select(this).select("path").transition().duration(200).attr("d", arcOver);
                    centerText.text( d3.select(this).datum().data.name);
                    centerText2.text( d3.select(this).datum().data.average);
                })
                .on("mouseout", function(d) {
                    d3.select(this).select("path").transition().duration(200).attr("d", arc);
                    centerText.text("");
                    centerText2.text("");
                });

    var centerText = chart.append("text")
        .attr("dy", "1%")
        .attr("fill","white")
        .style("text-anchor", "middle");

    var centerText2 = chart.append("text")
        .attr("dy", "10%")
        .attr("fill","white")
        .style("text-anchor", "middle");


    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } )
        .attr("d", arc);
  });
}

function chartFnd() {
  $.ajax({
    url: '/',
    method: 'GET',
    dataType: 'json'
  })
  .done(function(data){

    var w = ($('body').width() * 0.25),
          h = ($('body').width() * 0.25),
          r = ($('body').width() * 0.10),
          color = d3.scale.ordinal()
            .range(["rgba(241,242,242,1)","rgba(125,205,192,1)","rgb(83,83,83)","rgba(180,253,240,1)"]);

    var chart = d3.select("#chart")
      .append("svg:svg")
      .data([data])
          .attr("width", w)
          .attr("height", h)
      .append("svg:g")
          .attr("transform", "translate("+w/2+","+h/2+")");

    var arc = d3.svg.arc()
        .innerRadius(120)
        .outerRadius(r+20);

    var arcOver = d3.svg.arc()
        .innerRadius(122)
        .outerRadius(r + 30);

    var pie = d3.layout.pie().value(function(d) {return d.funding;});

    var arcs = chart.selectAll("g.slice")
        .data(pie)
        .enter()
            .append("svg:g")
                .attr("class", "slice")
                .on("mouseover", function(d) {
                    d3.select(this).select("path").transition().duration(200).attr("d", arcOver);
                    centerText.text( d3.select(this).datum().data.name);
                    centerText2.text( d3.select(this).datum().data.funding);
                })
                .on("mouseout", function(d) {
                    d3.select(this).select("path").transition().duration(200).attr("d", arc);
                    centerText.text("");
                    centerText2.text("");
                });

    var centerText = chart.append("text")
        .attr("dy", "1%")
        .attr("fill","white")
        .style("text-anchor", "middle");

    var centerText2 = chart.append("text")
        .attr("dy", "10%")
        .attr("fill","white")
        .style("text-anchor", "middle");


    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } )
        .attr("d", arc);
  });
}

function chartExt() {
  $.ajax({
    url: '/',
    method: 'GET',
    dataType: 'json'
  })
  .done(function(data){

    var w = ($('body').width() * 0.25),
          h = ($('body').width() * 0.25),
          r = ($('body').width() * 0.10),
          color = d3.scale.ordinal()
            .range(["rgba(241,242,242,1)","rgba(125,205,192,1)","rgb(83,83,83)","rgba(180,253,240,1)"]);

    var chart = d3.select("#chart")
      .append("svg:svg")
      .data([data])
          .attr("width", w)
          .attr("height", h)
      .append("svg:g")
          .attr("transform", "translate("+w/2+","+h/2+")");

    var arc = d3.svg.arc()
        .innerRadius(120)
        .outerRadius(r+20);

    var arcOver = d3.svg.arc()
        .innerRadius(122)
        .outerRadius(r + 30);

    var pie = d3.layout.pie().value(function(d) {return d.exits;});

    var arcs = chart.selectAll("g.slice")
        .data(pie)
        .enter()
            .append("svg:g")
                .attr("class", "slice")
                .on("mouseover", function(d) {
                    d3.select(this).select("path").transition().duration(200).attr("d", arcOver);
                    centerText.text( d3.select(this).datum().data.name);
                    centerText2.text( d3.select(this).datum().data.exits);
                })
                .on("mouseout", function(d) {
                    d3.select(this).select("path").transition().duration(200).attr("d", arc);
                    centerText.text("");
                    centerText2.text("");
                });

    var centerText = chart.append("text")
        .attr("dy", "1%")
        .attr("fill","white")
        .style("text-anchor", "middle");

    var centerText2 = chart.append("text")
        .attr("dy", "10%")
        .attr("fill","white")
        .style("text-anchor", "middle");


    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } )
        .attr("d", arc);
  });
}

function about() {
  alert("hello");
}
