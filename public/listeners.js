var prevX = 0;
var currX = 0;
var prevY = 0;
var currY = 0;

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
