class canvasUtils {
    static line(context2d, x0, y0, x1, y1, strokeStyle = "black", lineWidth = 2) {
        var restoreLineWidth = context2d.lineWidth,
            restoreStrokeStyle = context2d.strokeStyle;
        
        context2d.beginPath();
        context2d.moveTo(x0, y0);
        context2d.lineTo(x1, y1);
        context2d.lineWidth = lineWidth;
        context2d.strokeStyle = strokeStyle;
        context2d.stroke();

        context2d.lineWidth = restoreLineWidth;
        context2d.strokeStyle = restoreStrokeStyle;
    }

    static rect(context2d, x, y, width, height, strokeStyle = "black", lineWidth = 1) {
        var restoreLineWidth = context2d.lineWidth,
            restoreStrokeStyle = context2d.strokeStyle;

        context2d.beginPath();
        context2d.rect(x, y, width, height);
        context2d.lineWidth = lineWidth;
        context2d.strokeStyle = strokeStyle;
        context2d.stroke();
        context2d.setLineDash([]);

        context2d.lineWidth = restoreLineWidth;
        context2d.strokeStyle = restoreStrokeStyle;
    }

    static text(context2d, text, x, y, font, strokeStyle = "black") {
        var restoreFont = context2d.font,
            restoreTextAlign = context2d.textAlign,
            restoreTextBaseline = context2d.textBaseline,
            restoreFillStyle = context2d.fillStyle;
        
        context2d.font = font;
        context2d.textAlign = "center";
        context2d.textBaseline = "middle";
        context2d.fillStyle = strokeStyle;
        context2d.fillText(text, x, y);

        context2d.font = restoreFont;
        context2d.textAlign = restoreTextAlign;
        context2d.restoreTextBaseline = restoreTextBaseline;
        context2d.fillStyle = restoreFillStyle;
    }

    static circle(context2d, centerX, centerY, radius, fillStyle, strokeStyle = "black", lineWidth = 4) {
        var restoreLineWidth = context2d.lineWidth,
            restoreStrokeStyle = context2d.strokeStyle,
            restoreFillStyle  = context2d.fillStyle;

        context2d.lineWidth = lineWidth;
        context2d.strokeStyle = strokeStyle;
        context2d.fillStyle = fillStyle;
        context2d.beginPath();
        context2d.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        context2d.stroke();
        context2d.fill();

        context2d.lineWidth = restoreLineWidth;
        context2d.strokeStyle = restoreStrokeStyle;
        context2d.fillStyle = restoreFillStyle;
    }
};

