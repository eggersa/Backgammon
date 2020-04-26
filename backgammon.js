class Stone {
    constructor(player) {
        this._x = 0;
        this._y = 0;
        this._radius = 0;

        if (player) {
            this._color = "#d1cb99";
        } else {
            this._color = "#6e4617";
        }
    }

    draw(context2d) {
        canvasUtils.circle(context2d, this._x, this._y, this._radius, this._color);
    }

    /**
     * Returns true if the specified position is within the stones circle; false otherwise.
     * @param {numer} x - The absolute x position.
     * @param {number} y - The absolute y position.
     */
    hittest(x, y) {
        // Checks whether the distance from the center to the specified position is smaller than the radius.
        return Math.pow(x - this._x, 2) + Math.pow(y - this._y, 2) < Math.pow(this._radius, 2);
    }
}

class Point {
    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._stones = [];
    }

    update() {
        var diameter = this._width - 6; // diameter of stone
        var radius = diameter / 2; // radius of stone
        var x = this._x + radius + 3; // x is the same for all stones within a point
        var bottom = this._y + this._height - 3; // bottom (y) of the rectangle

        for (var i = 0; i < this._stones.length; i++) {
            this._stones[i]._x = x;
            this._stones[i]._y = bottom - (i * diameter) - radius;
            this._stones[i]._radius = radius;
        }
    }

    draw(context2d) {
        canvasUtils.rect(context2d, this._x, this._y, this._width, this._height);
        // draw each stone
        for (var i = 0; i < this._stones.length; i++) {
            this._stones[i].draw(context2d);
        }
    }

    /**
     * Returns true if the specified position is within the points area; false otherwise.
     * @param {numer} x - The absolute x position.
     * @param {number} y - The absolute y position.
     */
    hittest(x, y) {
        return this._x < x && x < this._x + this._width &&
            this._y < y && y < this._y + this._height;
    }

    push(stone) {
        this._stones.push(stone);
    }

    pop() {
        return this._stones.pop();
    }
}

class Board {
    constructor(canvas) {
        this._canvas = canvas;

        // Each side of the board has a track of 12 long triangles, called points.
        this._points = [];

        // Holds the stone that is being dragged.
        this._stoneDrag = null;

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

    _mousedown(pos) {
        // Reset stone being dragged.
        this._stoneDrag = null;
        
        // Find point at the cursors position.
        var point = null;
        for (var i = 0; i < this._points.length; i++) {
            if(this._points[i].hittest(pos.x, pos.y)){
                point = this._points[i];
                break;
            }
        }

        // Find stone at the cursors position.
        if(point !== null) {
            for (var i = 0; i < point._stones.length; i++) {
                if (point._stones[i].hittest(pos.x, pos.y)) {
                    this._stoneDrag = point._stones[i];
                    break;
                }
            }
        }
    }

    _mousemove(pos){

    }

    _mouseup(pos) {
        if(this._stoneDrag !== null){
            this._stoneDrag = null;
        }
    }

    /**
     * In the most commonly used setup, each player begins with fifteen chips, 
     * two are placed on their 24-point, three on their 8-point,
     * and five each on their 13-point and their 6-point.
     */
    _setup() {
        var p1 = new Point(40, 40, 90, 360);
        p1.push(new Stone(true));
        p1.push(new Stone(true));
        this._points.push(p1);

        var p2 = new Point(170, 40, 90, 360);
        this._points.push(p2);
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



window.onload = function () {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var board = new Board(canvas);
    board.show();

    window.onresize = function () {
        board.show();
    };
}
