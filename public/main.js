function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    socket = io.connect('http://localhost:3000');
    listener();
    socket.on('mouse',
        // When we receive data
        function (data) {
            flag = 0
            if (stillDrawing) {
                stopDrawing()
                flag = 1
            }
            console.log("Received: 'mouse' " + data.px + " " + data.py + " " + data.cx + " " + data.cy);
            draw(data.px, data.py, data.cx, data.cy, data.c)
            if (flag) startDrawing();
        }
    );
}

function changeColor(obj) {
    console.log(obj)
    switch (obj.id) {
        case "green":
            color = "green";
            break;
        case "blue":
            color = "blue";
            break;
        case "red":
            color = "red";
            break;
        case "yellow":
            color = "yellow";
            break;
        case "orange":
            color = "orange";
            break;
        case "black":
            color = "black";
            break;
        case "white":
            color = "white";
            break;
    }
    if (color == "white") lineWidth = 14;
    else lineWidth = 2;

}

function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

// function save() {
//     document.getElementById("canvasimg").style.border = "2px solid";
//     var dataURL = canvas.toDataURL();
//     document.getElementById("canvasimg").src = dataURL;
//     document.getElementById("canvasimg").style.display = "inline";
// }

