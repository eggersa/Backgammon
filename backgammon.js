window.onload = function () {
    var canvas = document.getElementById("canvas");

    var board = new Board(canvas);
    board.show();

    window.onresize = function () {
        board.show();
    };
}
