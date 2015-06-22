/**
 * @module Environment
 * @submodule Environment
 * @for p5
 * @requires core
 * @requires constants
 */
define(function(require) {

  'use strict';

  var p5 = require('core');
  var C = require('constants');

  var standardCursors = [C.ARROW, C.CROSS, C.HAND, C.MOVE, C.TEXT, C.WAIT];

  p5.prototype._frameRate = 0;
  p5.prototype._lastFrameTime = new Date().getTime();
  p5.prototype._targetFrameRate = 60;

  /**
   * The system variable frameCount contains the number of frames that have
   * been displayed since the program started. Inside setup() the value is 0,
   * after the first iteration of draw it is 1, etc.
   *
   * @property frameCount
   * @example
   *   <div><code>
   *     function setup() {
   *       frameRate(30);
   *     }
   *
   *     function draw() {
   *       line(0, 0, width, height);
   *       print(frameCount);
   *     }
   *   </code></div>
   */
  p5.prototype.frameCount = 0;

  /**
   * Confirms if a p5.js program is "focused," meaning that it is active and
   * will accept mouse or keyboard input. This variable is "true" if it is
   * focused and "false" if not.
   *
   * @property focused
   * @example
   *   <div><code>
   *     if (focused) {  // or "if (focused === true)"
   *       ellipse(25, 25, 50, 50);
   *     } else {
   *       line(0, 0, 100, 100);
   *       line(100, 0, 0, 100);
   *     }
   *   </code></div>
   */
  p5.prototype.focused = true;

  /**
   * Sets the cursor to a predefined symbol or an image, or makes it visible
   * if already hidden. If you are trying to set an image as the cursor, the
   * recommended size is 16x16 or 32x32 pixels. It is not possible to load an
   * image as the cursor if you are exporting your program for the Web, and not
   * all MODES work with all browsers. The values for parameters x and y must
   * be less than the dimensions of the image.
   *
   * @method cursor
   * @param {Number/Constant} type either ARROW, CROSS, HAND, MOVE, TEXT, or
   *                               WAIT, or path for image
   * @param {Number}          [x]  the horizontal active spot of the cursor
   * @param {Number}          [y]  the vertical active spot of the cursor
   * @example
   * <div><code>
   * // Move the mouse left and right across the image
   * // to see the cursor change from a cross to a hand
   * function draw() {
   *   line(width/2, 0, width/2, height);
   *   if (mouseX < 50) {
   *     cursor(CROSS);
   *   } else {
   *     cursor(HAND);
   *   }
   * }
   * </code></div>
   */
  p5.prototype.cursor = function(type, x, y) {
    var cursor = 'auto';
    var canvas = this._curElement.elt;
    if (standardCursors.indexOf(type) > -1) {
      // Standard css cursor
      cursor = type;
    } else if (typeof type === 'string') {
      var coords = '';
      if (x && y && (typeof x === 'number' && typeof y === 'number')) {
        // Note that x and y values must be unit-less positive integers < 32
        // https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
        coords = x + ' ' + y;
      }
      if (type.substring(0, 6) !== 'http://') {
        // Image (absolute url)
        cursor = 'url(' + type + ') ' + coords + ', auto';
      } else if (/\.(cur|jpg|jpeg|gif|png|CUR|JPG|JPEG|GIF|PNG)$/.test(type)) {
        // Image file (relative path) - Separated for performance reasons
        cursor = 'url(' + type + ') ' + coords + ', auto';
      } else {
        // Any valid string for the css cursor property
        cursor = type;
      }
    }
    canvas.style.cursor = cursor;
  };

  /**
   * Specifies the number of frames to be displayed every second. For example,
   * the function call frameRate(30) will attempt to refresh 30 times a second.
   * If the processor is not fast enough to maintain the specified rate, the
   * frame rate will not be achieved. Setting the frame rate within setup() is
   * recommended. The default rate is 60 frames per second. This is the same as
   * setFrameRate(val).
   *
   * Calling frameRate() with no arguments returns the current framerate. This
   * is the same as getFrameRate().
   *
   * @method frameRate
   * @param  {Number} [fps] number of frames to be displayed every second
   * @return {Number}       current frameRate
   */
  p5.prototype.frameRate = function(fps) {
    if (typeof fps === 'undefined') {
      return this._frameRate;
    } else {
      this._setProperty('_targetFrameRate', fps);
      this._runFrames();
      return this;
    }
  };
  /**
   * Returns the current framerate.
   *
   * @return {Number} current frameRate
   */
  p5.prototype.getFrameRate = function() {
    return this.frameRate();
  };

  /**
   * Specifies the number of frames to be displayed every second. For example,
   * the function call frameRate(30) will attempt to refresh 30 times a second.
   * If the processor is not fast enough to maintain the specified rate, the
   * frame rate will not be achieved. Setting the frame rate within setup() is
   * recommended. The default rate is 60 frames per second.
   *
   * Calling frameRate() with no arguments returns the current framerate.
   *
   * @param {Number} [fps] number of frames to be displayed every second
   */
  p5.prototype.setFrameRate = function(fps) {
    return this.frameRate(fps);
  };

  /**
   * Hides the cursor from view.
   *
   * @method noCursor
   * @example
   * <div><code>
   * function setup() {
   *   noCursor();
   * }
   *
   * function draw() {
   *   background(200);
   *   ellipse(mouseX, mouseY, 10, 10);
   * }
   * </code></div>
   */
  p5.prototype.noCursor = function() {
    this._curElement.elt.style.cursor = 'none';
  };


  /**
   * System variable that stores the width of the entire screen display. This
   * is used to run a full-screen program on any display size.
   *
   * @property displayWidth
   * @example
   * <div class="norender"><code>
   * createCanvas(displayWidth, displayHeight);
   * </code></div>
   */
  p5.prototype.displayWidth = screen.width;

  /**
   * System variable that stores the height of the entire screen display. This
   * is used to run a full-screen program on any display size.
   *
   * @property displayHeight
   * @example
   * <div class="norender"><code>
   * createCanvas(displayWidth, displayHeight);
   * </code></div>
   */
  p5.prototype.displayHeight = screen.height;

  /**
   * System variable that stores the width of the inner window, it maps to
   * window.innerWidth.
   *
   * @property windowWidth
   * @example
   * <div class="norender"><code>
   * createCanvas(windowWidth, windowHeight);
   * </code></div>
   */
  p5.prototype.windowWidth = window.innerWidth;
  /**
   * System variable that stores the height of the inner window, it maps to
   * window.innerHeight.
   *
   * @property windowHeight
   * @example
   * <div class="norender"><code>
   * createCanvas(windowWidth, windowHeight);
   * </code></div>
   */
  p5.prototype.windowHeight = window.innerHeight;

  /**
   * The windowResized() function is called once every time the browser window
   * is resized. This is a good place to resize the canvas or do any other 
   * adjustements to accomodate the new window size.
   *
   * @property windowResized
   * @example
   * <div class="norender"><code>
   * function setup() {
   *   createCanvas(windowWidth, windowHeight);
   * }
   *
   * function draw() {
   *  background(0, 100, 200);
   * }
   *
   * function windowResized() {
   *   resizeCanvas(windowWidth, windowHeight);
   * }
   * </code></div>
   */
  p5.prototype.onresize = function(e){
    this._setProperty('windowWidth', window.innerWidth);
    this._setProperty('windowHeight', window.innerHeight);
    var context = this._isGlobal ? window : this;
    var executeDefault;
    if (typeof context.windowResized === 'function') {
      executeDefault = context.windowResized(e);
      if (executeDefault !== undefined && !executeDefault) {
        e.preventDefault();
      }
    }
  };

  /**
   * System variable that stores the width of the drawing canvas. This value
   * is set by the first parameter of the createCanvas() function.
   * For example, the function call createCanvas(320, 240) sets the width
   * variable to the value 320. The value of width defaults to 100 if
   * createCanvas() is not used in a program.
   *
   * @property width
   */
  p5.prototype.width = 0;

  /**
   * System variable that stores the height of the drawing canvas. This value
   * is set by the second parameter of the createCanvas() function. For
   * example, the function call createCanvas(320, 240) sets the height
   * variable to the value 240. The value of height defaults to 100 if
   * createCanvas() is not used in a program.
   *
   * @property height
   */
  p5.prototype.height = 0;

  /**
   * If argument is given, sets the sketch to fullscreen or not based on the
   * value of the argument. If no argument is given, returns the current
   * fullscreen state. Note that due to browser restrictions this can only
   * be called on user input, for example, on mouse press like the example
   * below.
   *
   * @method fullscreen
   * @param  {Boolean} [val] whether the sketch should be fullscreened or not
   * @return {Boolean} current fullscreen state
   * @example
   * <div>
   * <code>
   * // Clicking in the box toggles fullscreen on and off.
   * function setup() {
   *   background(200);
   * }
   * function mousePressed() {
   *   if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
   *     var fs = fullscreen();
   *     fullscreen(!fs);
   *   }
   * }
   * </code>
   * </div>
   */
  p5.prototype.fullscreen = function(val) {
    // no arguments, return fullscreen or not
    if (typeof val === 'undefined') {
      return document.fullscreenElement ||
             document.webkitFullscreenElement ||
             document.mozFullScreenElement ||
             document.msFullscreenElement;
    } else { // otherwise set to fullscreen or not
      if (val) {
        launchFullscreen(document.documentElement);
      } else {
        exitFullscreen();
      }
    }
  };

  /**
   * Toggles pixel scaling for high pixel density displays. By default
   * pixel scaling is on, call devicePixelScaling(false) to turn it off.
   * This devicePixelScaling() function must be the first line of code
   * inside setup().
   *
   * @method devicePixelScaling
   * @example
   * <div>
   * <code>
   * function setup() {
   *   devicePixelScaling(false);
   *   createCanvas(100, 100);
   *   background(200);
   *   ellipse(width/2, height/2, 50, 50);
   * }
   * </code>
   * </div>
   */
  p5.prototype.devicePixelScaling = function(val) {
    if (val) {
      this._pixelDensity = window.devicePixelRatio || 1;
    } else {
      this._pixelDensity = 1;
    }
    this.resizeCanvas(this.width, this.height, true);
  };

  function launchFullscreen(element) {
    var enabled = document.fullscreenEnabled ||
                  document.webkitFullscreenEnabled ||
                  document.mozFullScreenEnabled ||
                  document.msFullscreenEnabled;
    if (!enabled) {
      throw new Error('Fullscreen not enabled in this browser.');
    }
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }


  /**
   * Gets the current URL.
   * @method getURL
   * @return {String} url
   * @example
   * <div>
   * <code>
   * var url;
   * var x = 100;    
   * 
   * function setup() {
   *   fill(0);
   *   noStroke();
   *   url = getURL();    
   * }    
   * 
   * function draw() {
   *   background(200);
   *   text(url, x, height/2);
   *   x--;
   * }
   * </code>
   * </div>
   */
  p5.prototype.getURL = function() {
    return location.href;
  };
  /**
   * Gets the current URL path as an array.
   * @method getURLPath
   * @return {Array} path components
   * @example
   * <div class='norender'><code>
   * function setup() {
   *   var urlPath = getURLPath();
   *   for (var i=0; i&lt;urlPath.length; i++) {
   *     text(urlPath[i], 10, i*20+20);
   *   }
   * }
   * </code></div>
   */
  p5.prototype.getURLPath = function() {
    return location.pathname.split('/').filter(function(v){return v!=='';});
  };
  /**
   * Gets the current URL params as an Object.
   * @method getURLParams
   * @return {Object} URL params
   * @example
   * <div class='norender'>
   * <code>
   * // Example: http://p5js.org?year=2014&month=May&day=15
   * 
   * function setup() {
   *   var params = getURLParams();  
   *   text(params.day, 10, 20);
   *   text(params.month, 10, 40);
   *   text(params.year, 10, 60);  
   * }    
   * </code>
   * </div>
   */
  p5.prototype.getURLParams = function() {
    var re = /[?&]([^&=]+)(?:[&=])([^&=]+)/gim;
    var m;
    var v={};
    while ((m = re.exec(location.search)) != null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      v[m[1]]=m[2];
    }
    return v;
  };

  return p5;

});
