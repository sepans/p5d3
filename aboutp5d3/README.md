
# About d3.js and p5.js

## p5.js
According to [p5.js website](http://p5js.org/):

> p5.js is a JavaScript library that starts with the original goal of Processing, to make coding accessible for artists, designers, educators, and beginners, and reintercodets this for today’s web.

p5.js provides syntax sugar and easy to use tools to create and draw on HTML5 Canvas. It follows [Processing](http://processing.org)'s syntex for drawing shapes: <code>ellipse</code>, <code>rect</code>, <code>line</code> and many [more](http://p5js.org/reference/). Drawing on canvas gives maximum flexibility of being able to access and modify any pixel of the canvas. 
Since shapes and other drawings are the trace of the virtual ink over the canvas, it is not possible to modify the shape or attach event listeners (such as on-click or on-mouseover) after they have been drawn.

Below is an example of simple bar chart based on data using p5.js:

<iframe height='400' scrolling='no' src='//codepen.io/sepans/embed/GJYwgr/?height=400&theme-id=17280&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/sepans/pen/GJYwgr/'>Very simple p5.js bar chart</a> by Sepand Ansari (<a href='http://codepen.io/sepans'>@sepans</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

## d3.js

> D3.js is a JavaScript library for manipulating documents based on data.

which means d3.js maps data to HTML elements (Usually SVG shape elements such as <code>&lt;rect&gt;</code> or <code>&lt;ellipse&gt;</code> but it could be any HTML element like <code>&lt;div&gt;</code>). 

```javascript
  var data.json = [
    { label: 'data1', value: '53' },
    { label: 'data2', value: '74' }
  ]
```

is mapped into this HTML block:

```html
  <div class="data-point">
    <div class="bar" style="height: 53px"></div>
    <div class="label"i> data1 </div>
  </div>
  <div class="data-point">
    <div class="bar" style="height: 74px"></div>
    <div class="label"> data2 </div>
  </div>

```
or this when using svg:


```html
  <svg> 
    <g class="data-point">
      <rect class="bar" height="53px"></rect>
      <text class="label"> data1 </text>
    </g>
    <g class="data-point">
      <rect class="bar" height="74px"></rect>
      <text class="label"> data2 </text>
    </g>
  <svg>
```

Note how 'label' and 'value' are mapped into the height of the rectangle and content of text element respectivly.

So d3.js is heavily tied to HTML document structure (or DOM) for accessing those elements and creating, removing or modifying them based on data. Getting deeper into how d3.js works is beyond the scope if this document but you can find out more about it in [this turorial](http://bost.ocks.org/mike/circles/).

Although mapping data to the HTML elements is central to the way d3.js works, the library comes with many utilities which could be used independently. From parsing dates to calculating geographical projections and bining data, d3.js has everything you need for data visualization.


The purpose of this tutorial is to show how those powerful utilities could be combined with the simplicity of drawing in p5.js
