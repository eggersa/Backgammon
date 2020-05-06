class Point {
    static EVEN_COLOR = "#A93226";
    static UNEVEN_COLOR = "#F5CBA7";


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
            yIncrement = 2 * radius + 4;
        } else {
            y = this._y + this._height - 3 - radius;
            yIncrement = -2 * radius - 4;
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

        // determine alternating color
        var color = this._pos % 2 == 0 ? Point.EVEN_COLOR : Point.UNEVEN_COLOR;

        // draw point
        // canvasUtils.rect(context2d, this._x, this._y, this._width, this._height, color);

        context2d.fillStyle = color;
        context2d.strokeStyle = "black";
        context2d.lineWidth = 2;
        context2d.beginPath();

        let center = this._x + this._width / 2;
        let y1 = this._y;
        let y2 = this._y + this._height;
        if(this._orientation){
            [y1, y2] = [y2, y1]; // swap
        }

        context2d.moveTo(center, y1);
        context2d.lineTo(this._x + this._width, y2);
        context2d.lineTo(this._x, y2);
        context2d.lineTo(center, y1);
        context2d.fill();
        context2d.stroke();


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