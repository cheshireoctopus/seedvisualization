$(function() {
  w = 960;
  h = 530;
  color = d3.scale.ordinal().range(["rgba(241,242,242,1)","rgba(125,205,192,1)","rgb(83,83,83)","rgba(180,253,240,1)","rgb(230,92,40)"]);
  map();
  setTimeout(function() {mapComp();},1000);
  $('#chart').hide().fadeIn(2000);
  $('#comp').on('click', mapComp);
  $('#avg').on('click', mapAvg);
  $('#fnd').on('click', mapFnd);
  $('#ext').on('click', mapExt);
  $('svg, #about_link, #chart').css('cursor', 'pointer');
  $('footer').hover(function() {$(this).stop().animate({bottom: '0%'},350,'easeInQuart');},
   function() {$(this).stop().animate({bottom: '-14%'},1250,'easeOutBounce');});
  //Resize svg_map
  var svg_map = $("#svg_map"),
        aspect = svg_map.width() / svg_map.height(),
        container = svg_map.parent();
  $(window).on("resize", function() {
    var targetWidth = container.width();
    svg_map.attr("width", targetWidth);
    svg_map.attr("height", Math.round(targetWidth/aspect));
  }).trigger("resize");
  });

function map() {
  svg = d3.select("#map").append("svg").attr("viewBox", "0 0 960 530").attr("width", w).attr("height", h).attr("id","svg_map");
  //Define map projection
  projection = d3.geo.albersUsa()
    .translate([550,300]);

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

//////////////////////////
//BEGIN:MAP FUNCTIONS//
//////////////////////////
function mapComp() {
  $('.btn').attr("disabled", false);
  $('#comp').attr("disabled", true);
  $('#chart').slideUp(1000);
  setTimeout(function() {$('#chart svg').remove();},1025);
  setTimeout(function() {chartComp();},1050);
  $('#chart').slideDown(1200);

  $('.stats').fadeOut();
  setTimeout(function() {
    $('#stats_title').html("Number of Companies");
    $('#stat1').html("Total: 1932");
    $('#stat2').html("Y Combinator's Percentage: 29%");
    $('.stats').fadeIn();},2500);

  d3.selectAll($('circle')).transition().duration(350)
  .attr("cx",w/1.75).attr("cy",h/2).transition().duration(350).delay(350).attr("r","5");
  setTimeout(function() {$('circle').remove();},1150);

  var rscale = d3.scale.linear().domain([0,750]).range([5,125]);
  setTimeout(function() {
    d3.csv("map.csv", function(data) {
        svg.selectAll("circle").data(data).enter().append("circle")
        .on("mouseover", function(d) {
          d3.select(this).style("stroke", "rgba(125,205,192,1)");
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
function mapAvg() {
  $('.btn').attr("disabled", false);
  $('#avg').attr("disabled", true);
  $('#chart').slideUp(1000);
  setTimeout(function() {$('#chart svg').remove();},1025);
  setTimeout(function() {chartAvg();},1050);
  $('#chart').slideDown({duration:1200,easing:'easeOutSine'});

  $('.stats').fadeOut();
  setTimeout(function() {
    $('#stats_title').html("Number of Companies");
    $('#stat1').html("Average Funding: $824,761");
    $('#stat2').html("Y Combinator Avg: $2,813,855");
    $('.stats').fadeIn();},2500);

  d3.selectAll($('circle')).transition().duration(350)
  .attr("cx",w/1.75).attr("cy",h/2).transition().duration(350).delay(350).attr("r","5");
  setTimeout(function() {$('circle').remove();},1150);
  setTimeout(function() {
  var rscale = d3.scale.linear().domain([30803,2813855]).range([5,40]);
  d3.csv("map.csv", function(data) {
      svg.selectAll("circle").data(data).enter().append("circle")
      .on("mouseover", function(d) {
          d3.select(this).style("stroke", "rgba(125,205,192,1)");
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
function mapFnd() {
  $('.btn').attr("disabled", false);
  $('#fnd').attr("disabled", true);
  $('#chart').slideUp(1000);
  setTimeout(function() {$('#chart svg').remove();},1025);
  setTimeout(function() {chartFnd();},1050);
  $('#chart').slideDown(1200);

  $('.stats').fadeOut();
  setTimeout(function() {
    $('#stats_title').html("Total Funding");
    $('#stat1').html("Total:  $2,729,339,599");
    $('#stat2').html("Y Combinator's Percentage: 58%");
    $('.stats').fadeIn();},2500);

  d3.selectAll($('circle')).transition().duration(350)
  .attr("cx",w/1.75).attr("cy",h/2).transition().duration(350).delay(350).attr("r","5");
  setTimeout(function() {$('circle').remove();},1150);

  setTimeout(function() {
    var rscale = d3.scale.linear().domain([750000,1592642241]).range([10,125]);
    d3.csv("map.csv", function(data) {
      svg.selectAll("circle").data(data).enter().append("circle")
        .on("mouseover", function(d) {
          d3.select(this).style("stroke", "rgba(125,205,192,1)");
          d3.select("#map_info")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px");
          d3.select("#map_info").html("<strong>"+d.city+", "+d.state+"</strong></br>Total Funding: "+d.fndc).classed("hidden", false);
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
function mapExt() {
  $('.btn').attr("disabled", false);
  $('#ext').attr("disabled", true);
  $('#chart').slideUp(1000);
  setTimeout(function() {$('#chart svg').remove();},1025);
  setTimeout(function() {chartExt();},1050);
  $('#chart').slideDown(1200);

  $('.stats').fadeOut();
   setTimeout(function() {
    $('#stats_title').html("Exit Valuations");
    $('#stat1').html("Total: $1,723,558,100");
    $('#stat2').html("Y Combinator's Percentage: 72%");
    $('.stats').fadeIn();},2500);

  d3.selectAll($('circle')).transition().duration(350)
  .attr("cx",w/1.75).attr("cy",h/2).transition().duration(350).delay(350).attr("r","5");
  setTimeout(function() {$('circle').remove();},1150);

  var rscale = d3.scale.linear().domain([0,1620558100]).range([5,150]);
  setTimeout(function() {
    d3.csv("map.csv", function(data) {
      svg.selectAll("circle").data(data).enter().append("circle")
        .on("mouseover", function(d) {
          d3.select(this).style("stroke", "rgba(125,205,192,1)");
          d3.select("#map_info").style("left", (d3.event.pageX) + "px").style("top", (d3.event.pageY) + "px");
          d3.select("#map_info").html("<strong>"+d.city+", "+d.state+"</strong></br>Exit Value: "+d.extc).classed("hidden", false);
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

////////////////////////////
//BEGIN:CHART FUNCTIONS//
////////////////////////////
function chartComp() {
  $.ajax({
    url: '/',
    method: 'GET',
    dataType: 'json'
  })
  .done(function(data){
    var w = ($('body').width() * 0.25),
          h = ($('body').width() * 0.25),
          r = ($('body').width() * 0.10);

    var chart = d3.select("#chart")
      .append("svg:svg")
      .data([data])
          .attr("width", w)
          .attr("height", h)
      .append("svg:g")
          .attr("transform", "translate("+w/2.1+","+h/2+")");

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
          r = ($('body').width() * 0.10);

    var chart = d3.select("#chart")
      .append("svg:svg")
      .data([data])
          .attr("width", w)
          .attr("height", h)
      .append("svg:g")
          .attr("transform", "translate("+w/2.1+","+h/2+")");

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
                    centerText.text(d3.select(this).datum().data.name);
                    centerText2.text("$"+d3.select(this).datum().data.average);
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
          r = ($('body').width() * 0.10);

    var chart = d3.select("#chart")
      .append("svg:svg")
      .data([data])
          .attr("width", w)
          .attr("height", h)
      .append("svg:g")
          .attr("transform", "translate("+w/2.1+","+h/2+")");

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
                    centerText.text(d3.select(this).datum().data.name);
                    centerText2.text("$"+d3.select(this).datum().data.funding);
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
          r = ($('body').width() * 0.10);

    var chart = d3.select("#chart")
      .append("svg:svg")
      .data([data])
          .attr("width", w)
          .attr("height", h)
      .append("svg:g")
          .attr("transform", "translate("+w/2.1+","+h/2+")");

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
                    centerText.text(d3.select(this).datum().data.name);
                    centerText2.text("$"+d3.select(this).datum().data.exits);
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


