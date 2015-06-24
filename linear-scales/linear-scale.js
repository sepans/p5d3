
  /* 
   This section of code is the exact copy of d3.js example
  */

  // Generate a Bates distribution of 10 random variables.
  var width = 500,
      height = 400,
      margin = {top: 10, left: 10, right: 10, bottom: 10};
  
  /*
  var randomizer = d3.random.bates(10);
  var data = d3.range(50).map(function() {
    return {x: randomizer(), y: randomizer()};
  });
  */
 
   var data = [{x: 10, y: 6}, {x: 18, y: 15}, {x: 8, y: 25}, {x: 13, y: 8} ];
                                 
  //console.log('data ',data);
  
  var xData = function(d) { return d.x};
  var yData = function(d) { return d.y};


  var x = d3.scale.linear()
      .domain([0, d3.max(data, xData)])
      .range([0, width]);



  var y = d3.scale.linear()
      .domain([0, d3.max(data, yData)])
      .range([height, 0]);

  

  createCanvas(width, height);


  translate(margin.left, margin.top); 

  for(var i = 0; i< data.length; i++) {
    
    var d = data[i];
    push();
    translate(x(xData(d)), y(yData(d)));

   
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