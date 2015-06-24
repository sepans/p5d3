
# Using d3.js Linear Scales

Scales in d3.js are used to map data values to positions within the chart area. In many cases, p5.js [<code>map</code>](http://p5js.org/reference/#/p5/map) function could also be used to do that calculation, but d3.js scales are easier to use and more importantly, d3.js provides many other types of scales for dates, logarithmic and exponential charts and much more.

<pre>
var xScale = d3.scale.linear()
  .domain([0, d3.max(data, xData)])
  .range([0, width]);
</pre>

defines the x scale with its domain being from 0 to maximum x value and its range being from 0 to width. What <code>d3.scale.linear()</code> returns is itself a function so it could be called.

In order to convert a number to you just need to call <code>x</code> function:
<pre>
var actualData = 54;
var xValue = xScale(actualData);
</pre>

<div class="live-coding" src="linear-scale.js"></div>

