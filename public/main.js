function closeColorPicker() {
    color = document.getElementById("color-p").value
    console.log(color)
    cpflag = 0
    snu.style.display = "none";
    snu.innerHTML = '<div id = "close-btn" class="btn" style="float: right;"> &#10003;	 </div>'
    cp.style.color = color;
}
function closeSizePicker() {
    lineWidth = document.getElementById("size-p").value
    console.log(lineWidth)
    spflag = 0
    snu.style.display = "none";
    snu.innerHTML = '<div id = "close-btn" class="btn" style="float: right;"> &#10003;	 </div>'
}

function init() {
    eraser = document.getElementById("eraser")
    eraser.onclick = (e) => {
        color = 'white';
    }
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    dpr = window.devicePixelRatio;
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 60;
    w = canvas.width;
    h = canvas.height;
    socket = io.connect('http://localhost:3000');
    listener();
    cp = document.getElementById("color-picker")
    clear = document.getElementById("clear")
    sp = document.getElementById("size-picker")
    clear.onclick = erase
    snu = document.getElementById("sidenav-utl")
    cp.onclick = (e) => {
        if (color == 'white') {
            color = 'black';
        }
        console.log(cpflag)
        if (spflag) {
            closeSizePicker()
            spflag = 0;
        }
        snu.style.display = "inline-block"
        if (!cpflag) {
            snu.innerHTML += '<input id="color-p" type="color" value="'+color+'">'
        }
        cpflag = 1
        cross = document.getElementById("close-btn")
        cross.onclick = closeColorPicker
    }
    sp.onclick = (e) => {
        if (cpflag) {
            closeColorPicker()
            cpflag = 0;
        }
        snu.style.display = "inline-block"
        if (!spflag) {
            snu.innerHTML += '<input id="size-p" type="range" min = "1" max = "40" value = "'+lineWidth+'">'
        }
        spflag = 1
        cross = document.getElementById("close-btn")
        cross.onclick = closeSizePicker
    }
    socket.on('mouse',
        // When we receive data
        function (data) {
            flag = 0
            if (stillDrawing) {
                stopDrawing()
                flag = 1
            }
            console.log("Received: 'mouse' " + data.px + " " + data.py + " " + data.cx + " " + data.cy);
            draw(data.px, data.py, data.cx, data.cy, data.c, 0)
            if (flag) startDrawing();
        }
    );
}

// function save() {
//     document.getElementById("canvasimg").style.border = "2px solid";
//     var dataURL = canvas.toDataURL();
//     document.getElementById("canvasimg").src = dataURL;
//     document.getElementById("canvasimg").style.display = "inline";
// }
