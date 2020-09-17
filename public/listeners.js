var color = 'black';
var lineWidth = 2;
var stillDrawing = false;
var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;


function startDrawing(e) {
    stillDrawing = true;
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(currX, currY, 2, 2);
    ctx.closePath();
}

function draw(prevX, prevY, currX, currY, c = null) {
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
    socket.emit('mouse', data);
}

function stopDrawing() {
    stillDrawing = false;
}

function listener(){
    canvas.addEventListener('mousedown', (e) => {
        startDrawing(e)
    }, false)

    canvas.addEventListener('mousemove', (e) => {
        if (stillDrawing) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw(prevX,prevY,currX,currY)
            // console.log(rect,e)
        }
    }, false),

    canvas.addEventListener('mouseup', (e) => {
        stopDrawing()
    }, false);
    canvas.addEventListener('mouseout', (e) => {
        stopDrawing()
    }, false);
}
