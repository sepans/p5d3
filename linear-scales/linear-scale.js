function setup() {
  
  /* 
   This section of code is the exact copy of d3.js example
  */

  // Generate a Bates distribution of 10 random variables.
  var width = 500,
      height = 400,
      margin = {top: 10, left: 35, right: 15, bottom: 15};
  
  var randomizer = d3.random.bates(10);
  var data = d3.range(50).map(function() {
    return {x: randomizer(), y: randomizer()};
  });
                                 
  //console.log('data ',data);
  
  var xData = function(d) { return d.x};
  var yData = function(d) { return d.y};


  var xScale = d3.scale.linear()
      .domain([d3.min(data, xData), d3.max(data, xData)])
      .range([0, width])
      .nice();



  var yScale = d3.scale.linear()
      .domain([d3.min(data, yData), d3.max(data, yData)])
      .range([height, 0])
      .nice();

  

  createCanvas(width + margin.left + margin.right, height + margin.top + margin.bottom);


  translate(margin.left, margin.top);
  
  line(0, height-margin.bottom, width, height-margin.bottom);
  
  var xTicks = xScale.ticks(8);
  //console.log(xTicks);
  
  for(var j=0; j<xTicks.length; j++){
    push();
    translate(xScale(xTicks[j]), height - margin.bottom);
    line(0, 0 , 0, 5);
    textAlign(CENTER);
    
    text(xTicks[j], 0 , 15);
    pop();
  }
  
 line(0, 0, 0, height-margin.bottom);
  
  var yTicks = yScale.ticks(8);
  //console.log(xTicks);
  
  for(var j=1; j<yTicks.length; j++){
    push();
    translate(0, yScale(yTicks[j]));
    line(0, 0 , 5, 0);
    textAlign(CENTER);
    
    text(yTicks[j], -15 , 5);
    pop();
  }  

  for(var i = 0; i< data.length; i++) {
    
    var d = data[i];
    push();
    translate(xScale(xData(d)), yScale(yData(d)));

   
    fill(70, 130, 180);
    noStroke();
    ellipse(0,0, 10, 10);

  
/*
    fill(255);
    textAlign(CENTER);
    text(formatCount(d.y), x(data[0].dx) / 2, -2, x(data[0].dx), 20 );
*/
    pop();

    
  }
  
}

