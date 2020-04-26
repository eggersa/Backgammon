class Point {
    /**
     * @param {*} x - The absoulte x-coordinate of the point.
     * @param {*} y - The absoulte y-coordinate of the point.
     * @param {*} width - The width of the point.
     * @param {*} height - The height of the point.
     * @param {*} orientation - true = top, false = bottom 
     */
    constructor(x, y, width, height, orientation, pos) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._stones = [];
        this._orientation = orientation;
        this._pos = pos;
    }

    get stones() {
        return this._stones;
    }

    get position() {
        return this._pos;
    }

    /**
     * Updates the absolute position of each stone.
     */
    update() {
        var radius = (this._width - 6) / 2, // radius of stone
            x = this._x + radius + 3, // x is the same for all stones within a point
            y = 0,
            yIncrement = 0;

        if (this._orientation) {
            y = this._y + 3 + radius;
            yIncrement = 2 * radius;
        } else {
            y = this._y + this._height - 3 - radius;
            yIncrement = -2 * radius;
        }

        for (var i = 0; i < this._stones.length; i++) {
            this._stones[i]._x = x;
            this._stones[i]._y = y + (i * yIncrement);
            this._stones[i]._radius = radius;
        }
    }

    /**
     * Draws the point and its stones.
     * @param {*} context2d - A 2d context from a canvas.
     */
    draw(context2d) {
        // draw position number
        var font = context2d.font = "13px Arial",
            textX = this._x + ((this._width) / 2),
            textY = this._orientation ? (this._y - 14) : (this._y + this._height + 17);
        canvasUtils.text(context2d, this._pos, textX, textY, font);

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