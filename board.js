class Board {
    constructor(canvas) {
        this._canvas = canvas;

        // Each side of the board has a track of 12 long triangles, called points.
        this._points = [];

        // Holds the checker that is being dragged.
        this._checkerDrag = null;

        // Holds the point from which the checker is being dragged away.
        this._dragSource = null;

        // Reference instance inside event handlers.
        var instance = this;

        this._canvas.addEventListener("mousedown", function (evt) {
            const pos = instance._getCursorPosition(evt);
            instance._mousedown(pos);
        }, false);

        this._canvas.addEventListener("mouseup", function (evt) {
            const pos = instance._getCursorPosition(evt);
            instance._mouseup(pos);
        }, false);

        this._canvas.addEventListener("mousemove", function (evt) {
            const pos = instance._getCursorPosition(evt);
            instance._mousemove(pos);
        }, false);

        // Setup initial board state.
        this._setup();
    }

    show() {
        this._update();
        this._draw();
    }

    /**
     * In the most commonly used setup, each player begins with fifteen chips, 
     * two are placed on their 24-point, three on their 8-point,
     * and five each on their 13-point and their 6-point.
     */
    _setup() {
        var y = 40; // y coordinate of points
        var x = 40; // x coordinate of current point
        var width = 50; // width of points
        var height = 250; // height of points
        var space = 4; // space between points

        // Helper function to push n checkers on the given point.
        const pushscheckers = (point, player, n) => {
            for (; n > 0; n--) {
                point.checkers.push(new Checker(player));
            }
        }

        // top row
        var pos = 13;
        for (var i = 0; i < 12; i++) {
            var point = new Point(x, y, width, height, true, pos);
            this._points.unshift(point);
            x += (width + space);
            if (i == 5) {
                x += 25;
            }
            pos++;
        }

        // bottom row
        pos = 12;
        x = 40;
        y = y + height + 40;
        for (var i = 0; i < 12; i++) {
            var point = new Point(x, y, width, height, false, pos);
            this._points.push(point);
            x += (width + space);
            if (i == 5) {
                x += 25;
            }
            pos--;
        }

        // set checkers
        for(const point of this._points){
            var p = point.position;
            if (25 - p == 6 || 25 - p == 13) {
                pushscheckers(point, false, 5); // white
            } else if (p == 6 || p == 13) {
                pushscheckers(point, true, 5); // black
            } else if (25 - p == 24) {
                pushscheckers(point, false, 2); // white
            } else if (p == 24) {
                pushscheckers(point, true, 2); // black
            } else if (25 - p == 8) {
                pushscheckers(point, false, 3); // white
            } else if (p == 8) {
                pushscheckers(point, true, 3); // black
            }
        }
    }

    _mousedown(pos) {
        // Reset checker being dragged.
        this._checkerDrag = null;
        this._dragSource = null;

        // Find point at the cursors position.
        for (var i = 0; i < this._points.length; i++) {
            if (this._points[i].hittest(pos.x, pos.y)) {
                this._dragSource = this._points[i];
                break;
            }
        }

        // Find checker at the cursors position.
        if (this._dragSource !== null) {
            for (var i = 0; i < this._dragSource._checkers.length; i++) {
                if (this._dragSource.checkers[i].hittest(pos.x, pos.y)) {
                    // Reference the checker to be dragged.
                    this._checkerDrag = this._dragSource.checkers[i];
                    // Remove checker from drag source.
                    this._dragSource.checkers.splice(i, 1);
                    break;
                }
            }
        }
    }

    _mousemove(pos) {
        if (this._checkerDrag !== null) {
            this._checkerDrag._x = pos.x;
            this._checkerDrag._y = pos.y;
            this._draw();
        }
    }

    _mouseup(pos) {
        if (this._checkerDrag !== null) {
            // Find point at the cursors position.
            var point = null;
            for (var i = 0; i < this._points.length; i++) {
                if (this._points[i].hittest(pos.x, pos.y)) {
                    point = this._points[i];
                    break;
                }
            }

            if (point !== null) {
                point.checkers.push(this._checkerDrag);
                point.update();
            } else { // If point is being dropped outside a point.
                this._dragSource.checkers.push(this._checkerDrag);
            }
            this._dragSource.update();

            // For simplicity, just redraw the entire board.
            this._draw();

            // Reset drag operation.
            this._checkerDrag = null;
            this._dragSource = null;
        }
    }

    /**
     * Updates the boards visual state.
     */
    _update() {
        for (var i = 0; i < this._points.length; i++) {
            this._points[i].update();
        }
    }

    /**
     * Draws the boards visual state.
     */
    _draw() {
        const context2d = this._canvas.getContext("2d");
        context2d.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < this._points.length; i++) {
            this._points[i].draw(context2d)
        }

        if (this._checkerDrag !== null) {
            this._checkerDrag.draw(context2d);
        }
    }

    /**
     * Returns the absolute cursor position from a mouse event.
     * @param {*} evt The mouse event.
     */
    _getCursorPosition(evt) {
        var rect = this._canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
}