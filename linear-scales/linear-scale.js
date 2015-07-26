  var width = 500,
    height = 400,
    margin = {top: 20, left: 35, right: 15, bottom: 35
    };

  // this part creates 50 random data points like [{x: 0.2, y: 0.4},...]
  var randomizer = d3.random.bates(10);
  var data = d3.range(50).map(function() {
    return {
      random1: randomizer() * 100,
      random2: randomizer() * 100
    };
  });

  // accessor functions which define how to get access to x and y values
  var xData = function(d) {
    return d.random1
  };
  var yData = function(d) {
    return d.random2
  };

  // x-scale
  var xScale = d3.scale.linear()
    .domain([d3.min(data, xData), d3.max(data, xData)])
    .range([0, width])
    .nice();

  // 8 ticks for x scale
  var xTicks = xScale.ticks(8);

  // same for y-scale
  var yScale = d3.scale.linear()
    .domain([d3.min(data, yData), d3.max(data, yData)])
    .range([height, 0])
    .nice();

  var yTicks = yScale.ticks(8);

  //at this point we have all we need to draw the chart using p5.js
  
  createCanvas(width + margin.left + margin.right, height + margin.top + margin.bottom);

  push();
  translate(margin.left, margin.top);

  //draw x-axis
  line(0, height - margin.bottom, width, height - margin.bottom);

  textAlign(CENTER);

  //draw ticks for x-axis
  for (var j = 1; j < xTicks.length; j++) {
    //get j-th tick
    var tick = xTicks[j];
    push();
    // translate
    translate(xScale(tick), height - margin.bottom);
    // draw little tick line
    line(0, 0, 0, 5);
    // write tick value
//    textSize(24);
    noStroke();
    fill(0);
    text(String(tick), 0, 15);
    pop();
  }

  // same for y-axis
  line(0, 0, 0, height - margin.bottom);

  for (var k = 1; k < yTicks.length; k++) {
    var tick = yTicks[k]
    push();
    translate(0, yScale(tick) );
    line(0, 0, 5, 0);

    noStroke();
    fill(0);
    text(String(tick), -15, 5);
    pop();
  }

  //
  for (var i = 0; i < data.length; i++) {

    var d = data[i];
    push();
    translate(xScale(d.random1), yScale(d.random2));
    /*
    A better way of writing above is by using accessor functions.
    translate(xScale(xData(d)), yScale(yData(d)));
    */

    fill(70, 130, 180);
    noStroke();
    ellipse(0, 0, 10, 10);

    /*
        fill(255);
        textAlign(CENTER);
        text(formatCount(d.y), x(data[0].dx) / 2, -2, x(data[0].dx), 20 );
    */
    pop();

  }
  pop();