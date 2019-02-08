
let drawSurface = document.querySelector("#drawSurface");
let context = drawSurface.getContext("2d");

//canvas fillStyle is black by default so we need to explictly set it white
context.fillStyle = "#ffffff";

let blnDrawing = false;

//start drawing
drawSurface.addEventListener("pointerdown", function (e) {
    let pointX = e.pageX - this.offsetLeft;
    let pointY = e.pageY - this.offsetTop;
    switch (e.pointerType) {
        case 'mouse':
            context.strokeStyle = "Red";
            context.lineJoin = "round";
            context.lineWidth = 2;
            break;
        case 'pen':
            context.strokeStyle = "black";
            context.lineJoin = "round";
            context.lineWidth = 2;
            break;
        case 'touch':
            context.strokeStyle = "blue";
            context.lineJoin = "round";
            context.lineWidth = 2;
            break;
        default:
            console.log(`pointerType ${event.pointerType} is not suported`);
    }
    blnDrawing = true;
    addClick(pointX, pointY);
    redraw();
});

//keep drawing
drawSurface.addEventListener("pointermove", function (e) {
    if (blnDrawing) {
        let pointX = e.pageX - this.offsetLeft;
        let pointY = e.pageY - this.offsetTop;
        addClick(pointX, pointY, true);
        redraw();
    }
});

//stop drawing in bounds
drawSurface.addEventListener("pointerup", function (e) {
    blnDrawing = false;
});

//stop drawing out of bounds
drawSurface.addEventListener("pointerleave", function (e) {
    blnDrawing = false;
});

let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw() {


    context.fillRect(0, 0, drawSurface.width, drawSurface.height);


    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}