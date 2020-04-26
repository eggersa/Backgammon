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
