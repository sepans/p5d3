
# Bar Chart 
###Using d3.js Linear and Ordinal Scales

“Scales are functions that map from an input domain to an output range.”. In other words scales are used to map data values to positions within the chart area. When dealing with simple numerical values, p5.js [`map`](http://p5js.org/reference/#/p5/map) function could also be used to do that calculation, but d3.js scales are easier to use and more importantly, it provides many other types of scales for date and time, logarithmic and exponential as well as non-numerical scales
(Ordinal scales).

Below code shows how d3 scales are defined:

```
var xScale = d3.scale.linear()
  .domain([0, 100])
  .range([0, width]);
```

xScale is a linear scale with its domain being from 0 to 100 (assuming 100 is the maximum x value) and its range from 0 to width. What <code>d3.scale.linear()</code> returns is itself a function so it could be called.

In order to convert a number to pixel position, you just need to call `xScale` function:

```
var actualData = 54;
var xValue = xScale(actualData);
```


<i>Ordinal scale</i> is a type of scale where its domain is discreet non-numeral (mostly) values. For exampe in a bar chart where the x-axis is state names and y-axis is population, ordinal scale is used for x-axis. Initializing Ordinal scales are similar to linear scale except that for the domain, instead of minimum and maximum value, all the values need to be passed to scale:

```
var states = ['Alabama','Alaska',...];
var xScale = d3.scale.ordinal()
  .domain(states)
  .range([0, width]);
```

Below is an example of using linear and ordinal Scales.

More in depth tutorials on d3 scales:
* [Interactive Data Visualization](http://alignedleft.com/tutorials/d3/scales) by Scott Murray
* [d3: scales and color](http://www.jeromecukier.net/blog/2011/08/11/d3-scales-and-color/) by Jerome Cukier
* [d3.js scales wiki page](https://github.com/mbostock/d3/wiki/Scales) 

<iframe height='600' scrolling='no' src='//codepen.io/sepans/embed/KpGrjj/?height=600&theme-id=17280&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/sepans/pen/KpGrjj/'>d3.js and p5.js - Scales - Bar Chart</a> by Sepand Ansari (<a href='http://codepen.io/sepans'>@sepans</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>
