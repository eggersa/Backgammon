class Point {
    constructor(x, y, width, height) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._stones = [];
    }

    get stones() {
        return this._stones;
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
        // draw point
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
}