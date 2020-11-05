var cpflag = 0
var spflag = 0
var color = 'black';
var lineWidth = 2;
var stillDrawing = false;
function draw(prevX, prevY, currX, currY, c = null, flag = 1) {
    if (cpflag) {
        cpflag = 0;
        closeColorPicker()
    };
    if (spflag) {
        spflag = 0
        closeSizePicker();
    }
    if (!c) c = color
    var data = {
        px: prevX,
        py: prevY,
        cx: currX,
        cy: currY,
        c: c
    };
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = c;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
    if (flag) {
        socket.emit('mouse', data);
    }
}

function startDrawing(e = null) {
    stillDrawing = true;
    if (e) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(currX, currY, 2, 2);
        ctx.closePath();
    }
}

function stopDrawing() {
    stillDrawing = false;
}

function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}