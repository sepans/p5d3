/**
 * @module Shape
 * @submodule Vertex
 * @for p5
 * @requires core
 * @requires constants
 */
define(function (require) {

  'use strict';

  var p5 = require('core');
  var constants = require('constants');
  var shapeKind = null;
  var vertices = [];
  var contourVertices = [];
  var isBezier = false;
  var isCurve = false;
  var isQuadratic = false;
  var isContour = false;

  /* 
   * Helper method
   */
  p5.prototype._doFillStrokeClose = function() {
    if (this._doFill) {
      this.drawingContext.fill();
    }
    if (this._doStroke) {
      this.drawingContext.stroke();
    }
    this.drawingContext.closePath();
  };

  /**
   * Use the beginContour() and endContour() functions to create negative
   * shapes within shapes such as the center of the letter 'O'. beginContour()
   * begins recording vertices for the shape and endContour() stops recording.
   * The vertices that define a negative shape must "wind" in the opposite 
   * direction from the exterior shape. First draw vertices for the exterior
   * clockwise order, then for internal shapes, draw vertices 
   * shape in counter-clockwise.
   * <br><br>
   * These functions can only be used within a beginShape()/endShape() pair and
   * transformations such as translate(), rotate(), and scale() do not work 
   * within a beginContour()/endContour() pair. It is also not possible to use
   * other shapes, such as ellipse() or rect() within.
   *
   * @method beginContour
   * @return {Object} the p5 object
   * @example
   * <div>
   * <code>
   * translate(50, 50);
   * stroke(255, 0, 0);
   * beginShape();
   * // Exterior part of shape, clockwise winding
   * vertex(-40, -40);
   * vertex(40, -40);
   * vertex(40, 40);
   * vertex(-40, 40);
   * // Interior part of shape, counter-clockwise winding
   * beginContour();
   * vertex(-20, -20);
   * vertex(-20, 20);
   * vertex(20, 20);
   * vertex(20, -20);
   * endContour();
   * endShape(CLOSE);
   * </code>
   * </div>
   */
  p5.prototype.beginContour = function() {
    contourVertices = [];
    isContour = true;
    return this;
  };

  /**
   * Using the beginShape() and endShape() functions allow creating more
   * complex forms. beginShape() begins recording vertices for a shape and
   * endShape() stops recording. The value of the kind parameter tells it which
   * types of shapes to create from the provided vertices. With no mode
   * specified, the shape can be any irregular polygon. The parameters
   * available for beginShape() are POINTS, LINES, TRIANGLES, TRIANGLE_FAN,
   * TRIANGLE_STRIP, QUADS, and QUAD_STRIP. After calling the beginShape()
   * function, a series of vertex() commands must follow. To stop drawing the
   * shape, call endShape(). Each shape will be outlined with the current
   * stroke color and filled with the fill color.
   *
   * Transformations such as translate(), rotate(), and scale() do not work
   * within beginShape(). It is also not possible to use other shapes, such as
   * ellipse() or rect() within beginShape().
   *
   * @method beginShape
   * @param  {Number/Constant} kind either POINTS, LINES, TRIANGLES,
   *                                TRIANGLE_FAN, TRIANGLE_STRIP, QUADS,
   *                                or QUAD_STRIP
   * @return {Object}               the p5 object
   * @example
   * <div>
   * <code>
   * beginShape();
   * vertex(30, 20);
   * vertex(85, 20);
   * vertex(85, 75);
   * vertex(30, 75);
   * endShape(CLOSE);
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * // currently not working   
   * beginShape(POINTS);
   * vertex(30, 20);
   * vertex(85, 20);
   * vertex(85, 75);
   * vertex(30, 75);
   * endShape();
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * beginShape(LINES);
   * vertex(30, 20);
   * vertex(85, 20);
   * vertex(85, 75);
   * vertex(30, 75);
   * endShape();
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * noFill();
   * beginShape();
   * vertex(30, 20);
   * vertex(85, 20);
   * vertex(85, 75);
   * vertex(30, 75);
   * endShape();
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * noFill();
   * beginShape();
   * vertex(30, 20);
   * vertex(85, 20);
   * vertex(85, 75);
   * vertex(30, 75);
   * endShape(CLOSE);
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * beginShape(TRIANGLES);
   * vertex(30, 75);
   * vertex(40, 20);
   * vertex(50, 75);
   * vertex(60, 20);
   * vertex(70, 75);
   * vertex(80, 20);
   * endShape();
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * beginShape(TRIANGLE_STRIP);
   * vertex(30, 75);
   * vertex(40, 20);
   * vertex(50, 75);
   * vertex(60, 20);
   * vertex(70, 75);
   * vertex(80, 20);
   * vertex(90, 75);
   * endShape();
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * beginShape(TRIANGLE_FAN);
   * vertex(57.5, 50);
   * vertex(57.5, 15); 
   * vertex(92, 50); 
   * vertex(57.5, 85); 
   * vertex(22, 50); 
   * vertex(57.5, 15); 
   * endShape();
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * beginShape(QUADS);
   * vertex(30, 20);
   * vertex(30, 75);
   * vertex(50, 75);
   * vertex(50, 20);
   * vertex(65, 20);
   * vertex(65, 75);
   * vertex(85, 75);
   * vertex(85, 20);
   * endShape();
   * </code>
   * </div>
   *
   * <div>
   * <code>  
   * beginShape(QUAD_STRIP); 
   * vertex(30, 20); 
   * vertex(30, 75); 
   * vertex(50, 20);
   * vertex(50, 75);
   * vertex(65, 20); 
   * vertex(65, 75); 
   * vertex(85, 20);
   * vertex(85, 75); 
   * endShape();
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * beginShape();
   * vertex(20, 20);
   * vertex(40, 20);
   * vertex(40, 40);
   * vertex(60, 40);
   * vertex(60, 60);
   * vertex(20, 60);
   * endShape(CLOSE);
   * </code>
   * </div>
   */
  p5.prototype.beginShape = function(kind) {
    if (kind === constants.POINTS ||
      kind === constants.LINES ||
      kind === constants.TRIANGLES ||
      kind === constants.TRIANGLE_FAN ||
      kind === constants.TRIANGLE_STRIP ||
      kind === constants.QUADS ||
      kind === constants.QUAD_STRIP) {
      shapeKind = kind;
    } else {
      shapeKind = null;
    }
    vertices = [];
    contourVertices = [];
    return this;
  };

  /**
   * Specifies vertex coordinates for Bezier curves. Each call to
   * bezierVertex() defines the position of two control points and
   * one anchor point of a Bezier curve, adding a new segment to a
   * line or shape. The first time bezierVertex() is used within a
   * beginShape() call, it must be prefaced with a call to vertex()
   * to set the first anchor point. This function must be used between
   * beginShape() and endShape() and only when there is no MODE
   * parameter specified to beginShape().
   *
   * @method bezierVertex
   * @param  {Number} x2 x-coordinate for the first control point
   * @param  {Number} y2 y-coordinate for the first control point
   * @param  {Number} x3 x-coordinate for the second control point
   * @param  {Number} y3 y-coordinate for the second control point
   * @param  {Number} x4 x-coordinate for the anchor point
   * @param  {Number} y4 y-coordinate for the anchor point
   * @return {Object}    the p5 object
   * @example
   * <div>
   * <code>
   * noFill();
   * beginShape();
   * vertex(30, 20);
   * bezierVertex(80, 0, 80, 75, 30, 75);
   * endShape();
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * beginShape();
   * vertex(30, 20);
   * bezierVertex(80, 0, 80, 75, 30, 75);
   * bezierVertex(50, 80, 60, 25, 30, 20);
   * endShape();
   * </code>
   * </div>
   */
  p5.prototype.bezierVertex = function(x2, y2, x3, y3, x4, y4) {
    if (vertices.length === 0) {
      throw 'vertex() must be used once before calling bezierVertex()';
    } else {
      isBezier = true;
      var vert = [];
      for (var i = 0; i < arguments.length; i++) {
        vert[i] = arguments[i];
      }
      vert.isVert = false;
      if (isContour) {
        contourVertices.push(vert);
      } else {
        vertices.push(vert);
      }
    }
    return this;
  };

  /**
   * Specifies vertex coordinates for curves. This function may only
   * be used between beginShape() and endShape() and only when there
   * is no MODE parameter specified to beginShape(). The first and
   * last points in a series of curveVertex() lines will be used to
   * guide the beginning and end of a the curve. A minimum of four
   * points is required to draw a tiny curve between the second and
   * third points. Adding a fifth point with curveVertex() will draw
   * the curve between the second, third, and fourth points. The
   * curveVertex() function is an implementation of Catmull-Rom
   * splines.
   *
   * @method curveVertex
   * @param {Number} x x-coordinate of the vertex
   * @param {Number} y y-coordinate of the vertex
   * @return {Object} the p5 object
   * @example
   * <div>
   * <code>
   * noFill();
   * beginShape();
   * curveVertex(84,  91);
   * curveVertex(84,  91);
   * curveVertex(68,  19);
   * curveVertex(21,  17);
   * curveVertex(32, 100);
   * curveVertex(32, 100);
   * endShape();
   * </code>
   * </div>
   */
  p5.prototype.curveVertex = function(x,y) {
    isCurve = true;
    this.vertex(x, y);
    return this;
  };

  /**
   * Use the beginContour() and endContour() functions to create negative
   * shapes within shapes such as the center of the letter 'O'. beginContour()
   * begins recording vertices for the shape and endContour() stops recording.
   * The vertices that define a negative shape must "wind" in the opposite 
   * direction from the exterior shape. First draw vertices for the exterior
   * clockwise order, then for internal shapes, draw vertices 
   * shape in counter-clockwise.
   * <br><br>
   * These functions can only be used within a beginShape()/endShape() pair and
   * transformations such as translate(), rotate(), and scale() do not work 
   * within a beginContour()/endContour() pair. It is also not possible to use
   * other shapes, such as ellipse() or rect() within.
   *
   * @method endContour
   * @return {Object} the p5 object
   * @example
   * <div>
   * <code>
   * translate(50, 50);
   * stroke(255, 0, 0);
   * beginShape();
   * // Exterior part of shape, clockwise winding
   * vertex(-40, -40);
   * vertex(40, -40);
   * vertex(40, 40);
   * vertex(-40, 40);
   * // Interior part of shape, counter-clockwise winding
   * beginContour();
   * vertex(-20, -20);
   * vertex(-20, 20);
   * vertex(20, 20);
   * vertex(20, -20);
   * endContour();
   * endShape(CLOSE);
   * </code>
   * </div>
   */
  p5.prototype.endContour = function() {
    var vert = contourVertices[0].slice(); // copy all data
    vert.isVert = contourVertices[0].isVert;
    vert.moveTo = false;
    contourVertices.push(vert);

    vertices.push(vertices[0]);
    for (var i = 0; i < contourVertices.length; i++) {
      vertices.push(contourVertices[i]);
    }
    return this;
  };

  /**
   * The endShape() function is the companion to beginShape() and may only be
   * called after beginShape(). When endshape() is called, all of image data
   * defined since the previous call to beginShape() is written into the image
   * buffer. The constant CLOSE as the value for the MODE parameter to close
   * the shape (to connect the beginning and the end).
   *
   * @method endShape
   * @param  {Number/Constant} mode use CLOSE to close the shape
   * @return {Object}               the p5 object
   * @example
   * <div>
   * <code>
   * noFill();
   * 
   * beginShape();
   * vertex(20, 20);
   * vertex(45, 20);
   * vertex(45, 80);
   * endShape(CLOSE);
   * 
   * beginShape();
   * vertex(50, 20);
   * vertex(75, 20);
   * vertex(75, 80);
   * endShape();
   * </code>
   * </div>
   */
  p5.prototype.endShape = function(mode) {
    if (vertices.length === 0) { return this; }
    if (!this._doStroke && !this._doFill) { return this; }

    var closeShape = mode === constants.CLOSE;
    var v;

    // if the shape is closed, the first element is also the last element
    if (closeShape && !isContour) {
      vertices.push(vertices[0]);
    }

    var i, j;
    var numVerts = vertices.length;

    // curveVertex
    if ( isCurve && (shapeKind === constants.POLYGON || shapeKind === null) ) {
      if (numVerts > 3) {
        var b = [],
            s = 1 - this._curveTightness;
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(vertices[1][0], vertices[1][1]);
          /*
          * Matrix to convert from Catmull-Rom to cubic Bezier
          * where t = curTightness
          * |0         1          0         0       |
          * |(t-1)/6   1          (1-t)/6   0       |
          * |0         (1-t)/6    1         (t-1)/6 |
          * |0         0          0         0       |
          */
        for (i = 1; (i+2) < numVerts; i++) {
          v = vertices[i];
          b[0] = [v[0], v[1]];
          b[1] = [v[0] + (s * vertices[i+1][0] - s * vertices[i-1][0]) / 6,
                 v[1] + (s * vertices[i+1][1] - s * vertices[i-1][1]) / 6];
          b[2] = [vertices[i+1][0] + (s*vertices[i][0] - s*vertices[i+2][0])/6,
                 vertices[i+1][1] + (s*vertices[i][1] - s*vertices[i+2][1])/6];
          b[3] = [vertices[i+1][0], vertices[i+1][1]];
          this.drawingContext.bezierCurveTo(b[1][0], b[1][1],
            b[2][0], b[2][1], b[3][0], b[3][1]);
        }
        if (closeShape) {
          this.drawingContext.lineTo(vertices[i+1][0], vertices[i+1][1]);
        }
        this._doFillStrokeClose();
      }
    }

    // bezierVertex
    else if (isBezier &&
      (shapeKind === constants.POLYGON || shapeKind === null) ) {
      this.drawingContext.beginPath();
      for (i = 0; i < numVerts; i++) {
        if (vertices[i].isVert) { //if it is a vertex move to the position
          if (vertices[i].moveTo) {
            this.drawingContext.moveTo(vertices[i][0], vertices[i][1]);
          } else {
            this.drawingContext.lineTo(vertices[i][0], vertices[i][1]);
          }
        } else { //otherwise continue drawing bezier
          this.drawingContext.bezierCurveTo(vertices[i][0], vertices[i][1],
            vertices[i][2], vertices[i][3], vertices[i][4], vertices[i][5]);
        }
      }
      this._doFillStrokeClose();
    } else if (isQuadratic &&
      (shapeKind === constants.POLYGON || shapeKind === null)) {
      this.drawingContext.beginPath();
      for (i = 0; i < numVerts; i++) {
        if (vertices[i].isVert) {
          if (vertices[i].moveTo) {
            this.drawingContext.moveTo([0], vertices[i][1]);
          } else {
            this.drawingContext.lineTo(vertices[i][0], vertices[i][1]);
          }
        } else {
          this.drawingContext.quadraticCurveTo(vertices[i][0],
            vertices[i][1], vertices[i][2], vertices[i][3]);
        }
      }
      this._doFillStrokeClose();
    }
    // render the vertices provided
    else {
      if (shapeKind === constants.POINTS) {
        for (i = 0; i < numVerts; i++) {
          v = vertices[i];
          if (this._doStroke) {
            this.stroke(v[6]);
          }
          this.point(v[0], v[1]);
        }
      } else if (shapeKind === constants.LINES) {
        for (i = 0; (i + 1) < numVerts; i+=2) {
          v = vertices[i];
          if (this._doStroke) {
            this.stroke(vertices[i+1][6]);
          }
          this.line(v[0], v[1], vertices[i+1][0], vertices[i+1][1]);
        }
      } else if (shapeKind === constants.TRIANGLES) {
        for (i = 0; (i + 2) < numVerts; i+=3) {
          v = vertices[i];
          this.drawingContext.beginPath();
          this.drawingContext.moveTo(v[0], v[1]);
          this.drawingContext.lineTo(vertices[i+1][0], vertices[i+1][1]);
          this.drawingContext.lineTo(vertices[i+2][0], vertices[i+2][1]);
          this.drawingContext.lineTo(v[0], v[1]);

          if (this._doFill) {
            this.fill(vertices[i+2][5]);
            this.drawingContext.fill();
          }
          if (this._doStroke) {
            this.stroke(vertices[i+2][6]);
            this.drawingContext.stroke();
          }

          this.drawingContext.closePath();
        }
      } else if (shapeKind === constants.TRIANGLE_STRIP) {
        for (i = 0; (i+1) < numVerts; i++) {
          v = vertices[i];
          this.drawingContext.beginPath();
          this.drawingContext.moveTo(vertices[i+1][0], vertices[i+1][1]);
          this.drawingContext.lineTo(v[0], v[1]);

          if (this._doStroke) {
            this.stroke(vertices[i+1][6]);
          }
          if (this._doFill) {
            this.fill(vertices[i+1][5]);
          }

          if (i + 2 < numVerts) {
            this.drawingContext.lineTo(vertices[i+2][0], vertices[i+2][1]);
            if (this._doStroke) {
              this.stroke(vertices[i+2][6]);
            }
            if (this._doFill) {
              this.fill(vertices[i+2][5]);
            }
          }
          this._doFillStrokeClose();
        }
      } else if (shapeKind === constants.TRIANGLE_FAN) {
        if (numVerts > 2) {
          this.drawingContext.beginPath();
          this.drawingContext.moveTo(vertices[0][0], vertices[0][1]);
          this.drawingContext.lineTo(vertices[1][0], vertices[1][1]);
          this.drawingContext.lineTo(vertices[2][0], vertices[2][1]);

          if (this._doFill) {
            this.fill(vertices[2][5]);
          }
          if (this._doStroke) {
            this.stroke(vertices[2][6]);
          }
          this._doFillStrokeClose();

          for (i = 3; i < numVerts; i++) {
            v = vertices[i];
            this.drawingContext.beginPath();
            this.drawingContext.moveTo(vertices[0][0], vertices[0][1]);
            this.drawingContext.lineTo(vertices[i-1][0], vertices[i-1][1]);
            this.drawingContext.lineTo(v[0], v[1]);

            if (this._doFill) {
              this.fill(v[5]);
            }
            if (this._doStroke) {
              this.stroke(v[6]);
            }
            this._doFillStrokeClose();
          }
        }
      } else if (shapeKind === constants.QUADS) {
        for (i = 0; (i + 3) < numVerts; i+=4) {
          v = vertices[i];
          this.drawingContext.beginPath();
          this.drawingContext.moveTo(v[0], v[1]);
          for (j = 1; j < 4; j++) {
            this.drawingContext.lineTo(vertices[i+j][0], vertices[i+j][1]);
          }
          this.drawingContext.lineTo(v[0], v[1]);

          if (this._doFill) {
            this.fill(vertices[i+3][5]);
          }
          if (this._doStroke) {
            this.stroke(vertices[i+3][6]);
          }

          this._doFillStrokeClose();
        }
      } else if (shapeKind === constants.QUAD_STRIP) {
        if (numVerts > 3) {
          for (i = 0; (i+1) < numVerts; i+=2) {
            v = vertices[i];
            this.drawingContext.beginPath();
            if (i+3 < numVerts) {
              this.drawingContext.moveTo(vertices[i+2][0], vertices[i+2][1]);
              this.drawingContext.lineTo(v[0], v[1]);
              this.drawingContext.lineTo(vertices[i+1][0], vertices[i+1][1]);
              this.drawingContext.lineTo(vertices[i+3][0], vertices[i+3][1]);

              if (this._doFill) {
                this.fill(vertices[i+3][5]);
              }
              if (this._doStroke) {
                this.stroke(vertices[i+3][6]);
              }
            } else {
              this.drawingContext.moveTo(v[0], v[1]);
              this.drawingContext.lineTo(vertices[i+1][0], vertices[i+1][1]);
            }
            this._doFillStrokeClose();
          }
        }
      } else {
        this.drawingContext.beginPath();
        this.drawingContext.moveTo(vertices[0][0], vertices[0][1]);
        for (i = 1; i < numVerts; i++) {
          v = vertices[i];
          if (v.isVert) { //if it is a vertex move to the position
            if (v.moveTo) {
              this.drawingContext.moveTo(v[0], v[1]);
            } else {
              this.drawingContext.lineTo(v[0], v[1]);
            }
          }
        }
        this._doFillStrokeClose();
      }
    }

    // Reset some settings
    isCurve = false;
    isBezier = false;
    isQuadratic = false;
    isContour = false;

    // If the shape is closed, the first element was added as last element.
    // We must remove it again to prevent the list of vertices from growing
    // over successive calls to endShape(CLOSE)
    if (closeShape) {
      vertices.pop();
    }
    return this;
  };

  /**
   * Specifies vertex coordinates for quadratic Bezier curves. Each call to
   * quadraticVertex() defines the position of one control points and one
   * anchor point of a Bezier curve, adding a new segment to a line or shape.
   * The first time quadraticVertex() is used within a beginShape() call, it
   * must be prefaced with a call to vertex() to set the first anchor point.
   * This function must be used between beginShape() and endShape() and only
   * when there is no MODE parameter specified to beginShape().
   * 
   * @method quadraticVertex
   * @param  {Number} cx x-coordinate for the control point
   * @param  {Number} cy y-coordinate for the control point
   * @param  {Number} x3 x-coordinate for the anchor point
   * @param  {Number} y3 y-coordinate for the anchor point
   * @return {Object}    the p5 object
   * @example
   * <div>
   * <code>
   * noFill();
   * strokeWeight(4);
   * beginShape();
   * vertex(20, 20);
   * quadraticVertex(80, 20, 50, 50);
   * endShape();
   * </code>
   * </div>
   *
   * <div>
   * <code>
   * noFill();
   * strokeWeight(4);
   * beginShape();
   * vertex(20, 20);
   * quadraticVertex(80, 20, 50, 50);
   * quadraticVertex(20, 80, 80, 80);
   * vertex(80, 60);
   * endShape();
   * </code>
   * </div>
   */
  p5.prototype.quadraticVertex = function(cx, cy, x3, y3) {
    //if we're drawing a contour, put the points into an
    // array for inside drawing
    if(this._contourInited) {
      var pt = {};
      pt.x = cx;
      pt.y = cy;
      pt.x3 = x3;
      pt.y3 = y3;
      pt.type = constants.QUADRATIC;
      this._contourVertices.push(pt);

      return this;
    }
    if (vertices.length > 0) {
      isQuadratic = true;
      var vert = [];
      for (var i = 0; i < arguments.length; i++) {
        vert[i] = arguments[i];
      }
      vert.isVert = false;
      if (isContour) {
        contourVertices.push(vert);
      } else {
        vertices.push(vert);
      }
    } else {
      throw 'vertex() must be used once before calling quadraticVertex()';
    }
    return this;
  };

  /**
   * All shapes are constructed by connecting a series of vertices. vertex()
   * is used to specify the vertex coordinates for points, lines, triangles,
   * quads, and polygons. It is used exclusively within the beginShape() and
   * endShape() functions.
   *
   * @method vertex
   * @param  {Number} x x-coordinate of the vertex
   * @param  {Number} y y-coordinate of the vertex
   * @return {Object}   the p5 object
   * @example
   * <div>
   * <code>
   * beginShape(POINTS);
   * vertex(30, 20);
   * vertex(85, 20);
   * vertex(85, 75);
   * vertex(30, 75);
   * endShape();
   * </code>
   * </div>
   */
  p5.prototype.vertex = function(x, y, moveTo) {
    var vert = [];
    vert.isVert = true;
    vert[0] = x;
    vert[1] = y;
    vert[2] = 0;
    vert[3] = 0;
    vert[4] = 0;

    // fill and stroke color
    vert[5] = this.drawingContext.fillStyle;
    vert[6] = this.drawingContext.strokeStyle;

    if (moveTo) {
      vert.moveTo = moveTo;
    }
    if (isContour) {
      if (contourVertices.length === 0) {
        vert.moveTo = true;
      }
      contourVertices.push(vert);
    } else {
      vertices.push(vert);
    }
    return this;
  };

  return p5;

});