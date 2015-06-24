<div class="header">
 <img src="http://d3js.org/preview.png" alt="image source: http://d3.org">
</div>

# Using d3.js utilities for data visualization in p5.js
<!--*by [Sepand Ansari](http://sepans.com/)-->


A series of examples for using d3.js utility functions minimally in p5.js without inter-mingling their different paradigms.

## Who is this tutorial for?
This tutorial doesn't intend to encourage using d3.js along with p5.js. These two libraries use different paradigms and ways of rendering, so mixing them without care will create cryptic and low performance code. 

Moreover d3.js is fast and very flexible, covering almost every data visualization use case, so there is no need to complement it with p5.js library. But the power of d3.js comes at a price: It requires somehow advanced familiarity 
with Javascript techniques and [DOM](https://en.wikipedia.org/wiki/Document_Object_Model) to completely understand how it works.

On the other hand p5.js (the new implementation of Processing framework in Javascript) is designed to be simple especially for non-proficient Javascript coders, making it very popular among artists and designers. 
Therefore taking advantage of d3.js utility functions for processing data along with p5.js for drawing, makes it possible to create non-trivial data visualizations with ease. 
This is also helps getting familiar with the world of d3 little by little, and be able to switch to d3.js for advanced data visualizations.

## Contents

* [About p5.js and d3.js](aboutp5d3/)

* Basics
    * “Hello world!”

* Scales
    * [Linear Scales](linear-scales)
    * Non-linear scales
    * Date/Time scales
    * Drawing Axis using scales


* Layouts:
    * Histogram
    * Voronoi

<!--
* [Examples](examples/)

* [Glossary](glossary/)

* [Appendix:](appendix/) Other ways to use this book
	* [How can I navigate this book offline?](appendix/)

-->
<!--
## About the Author
<p class="header"><a href="http://twitter.com/" target="_blank">Twitter</a> - <a href="https://github.com/sepans" target="_blank">GitHub</a> 
-->

## Acknowledgement
The structure of the framework that generates the tutorial is inspired from [The book of shaders](http://thebookofshaders.com) by [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com). Parts of the framework code and styles is from [The book of shaders](http://thebookofshaders.com) and [alignedleft.com](http://alignedleft.com) by Scott Murray.

