export default class DicePair {
    static DICE_COLOR = "#D77";
    static DOT_COLOR = "#000";

    constructor(x, y, size, height) {
        this._x = x;
        this._y = y;
        this._size = size;
        this._height = height;
        this._value1 = 1;
        this._value2 = 1;
    }

    get value1() {
        return this._value2;
    }

    get value2() {
        return this._value2;
    }

    roll() {
        this.update(
            Math.floor(Math.random() * 6) + 1,
            Math.floor(Math.random() * 6) + 1
        );
    }

    update(value1, value2) {
        this._value1 = value1;
        this._value2 = value2;
    }

    draw(context2d) {
        this._drawDice(context2d, this._x, this._y, this._size, this._value1);
        this._drawDice(context2d, this._x, this._y + this._height - this._size, this._size, this._value2);
    }

    /**
     * This function draws a dice to the canvas. ctx is the canvas context
     * x, y are the coordinates of the top left corner of the dice
     * size is the length of the dice size in px value is the value of the dice.
     * It shall be between 1 and 6.
     * 
     * Source: https://codepen.io/dzsobacsi/pen/pjxEOK/
     */
    _drawDice(ctx, x, y, size, value) {
        let dots = [];
        ctx.save();
        ctx.fillStyle = DicePair.DICE_COLOR;
        ctx.translate(x, y);
        this._roundRect(ctx, 0, 0, size, size, size * 0.1, true, false);

        //define dot locations
        var padding = 0.25;
        var x, y;
        x = padding * size;
        y = padding * size;
        dots.push({ x: x, y: y });
        y = size * 0.5;
        dots.push({ x: x, y: y });
        y = size * (1 - padding);
        dots.push({ x: x, y: y });
        x = size * 0.5;
        y = size * 0.5;
        dots.push({ x: x, y: y });
        x = size * (1 - padding);
        y = padding * size;
        dots.push({ x: x, y: y });
        y = size * 0.5;
        dots.push({ x: x, y: y });
        y = size * (1 - padding);
        dots.push({ x: x, y: y });

        var dotsToDraw;
        if (value == 1) dotsToDraw = [3];
        else if (value == 2) dotsToDraw = [0, 6];
        else if (value == 3) dotsToDraw = [0, 3, 6];
        else if (value == 4) dotsToDraw = [0, 2, 4, 6];
        else if (value == 5) dotsToDraw = [0, 2, 3, 4, 6];
        else if (value == 6) dotsToDraw = [0, 1, 2, 4, 5, 6];
        else console.log("Dice value shall be between 1 and 6");

        ctx.fillStyle = DicePair.DOT_COLOR;;
        for (var i = 0; i < dotsToDraw.length; i++) {
            ctx.beginPath();
            var j = dotsToDraw[i];
            ctx.arc(dots[j].x, dots[j].y, size * 0.07, 0, 2 * Math.PI);
            ctx.fill();
        }

        ctx.restore();
    }

    /**
    * Draws a rounded rectangle using the current state of the canvas. If you omit
    * the last three params, it will draw a rectangle outline with a 5 pixel border radius.
    * 
    * Source: https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
    * 
    * @param {CanvasRenderingContext2D} ctx
    * @param {Number} x The top left x coordinate
    * @param {Number} y The top left y coordinate
    * @param {Number} width The width of the rectangle
    * @param {Number} height The height of the rectangle
    * @param {Number} [radius = 5] The corner radius; It can also be an object to specify different radii for corners
    * @param {Number} [radius.tl = 0] Top left
    * @param {Number} [radius.tr = 0] Top right
    * @param {Number} [radius.br = 0] Bottom right
    * @param {Number} [radius.bl = 0] Bottom left
    * @param {Boolean} [fill = false] Whether to fill the rectangle.
    * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
    */
    _roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke == 'undefined') {
            stroke = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
            var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }

        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();

        if (fill) {
            ctx.fill();
        }

        if (stroke) {
            ctx.stroke();
        }
    }
}