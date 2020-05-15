class Checker {
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