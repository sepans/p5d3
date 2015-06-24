
# About d3.js and p5.js

## p5.js
According to [p5.js website](http://p5js.org/):

> p5.js is a JavaScript library that starts with the original goal of Processing, to make coding accessible for artists, designers, educators, and beginners, and reintercodets this for today’s web.

p5.js provides syntax sugar and easy to use tools to create and draw on HTML5 Canvas. It follows [Processing](http://processing.org)'s syntex for drawing shapes: <code>ellipse</code>, <code>rect</code>, <code>line</code> and many [more](http://p5js.org/reference/). Drawing on canvas gives maximum flexibility of being able to access and modify any pixel of the canvas. 
Every drawing function affects certein pixels on the HTML canvas element so it is not possible to access the shape or attach event listeners (such as on-click or on-mouseover) after they have been drawn.

## d3.js

> D3.js is a JavaScript library for manipulating documents based on data.

which means d3.js maps data to HTML elements (Usually SVG shape elements such as <code>&lt;rect&gt;</code> or <code>&lt;ellipse&gt;</code> but it could be any HTML element like <code>&lt;div&gt;</code>). 
So d3.js is heavily tied to HTML document structure (or DOM) for accessing those elements and creating, removing or modifying them based on data.

