/**
 * Created by liujianyang on 2016/3/29.
 */
var canvaswidth = window.innerWidth;
var canvasheight = window.innerHeight;

var canvas = document.getElementById("canvas")
var context = canvas.getContext("2d")

canvas.width = canvaswidth
canvas.height = canvasheight

var image = new Image();
var radus = 50;
var clippingReign = {x:200,y:100,r:radus};
var leftmargin=0,topmargin=0;
image.src = "file/blur.jpg";
image.onload = function(e){
    $("#blur-div").css("width",canvaswidth+"px");
    $("#blur-div").css("height",canvasheight+"px");

    $("#blur-image").css("width",image.width+"px");
    $("#blur-image").css("height",image.height+"px");

    leftmargin=(image.width-canvas.width)/2;
    topmargin=(image.height-canvas.height)/2;

    $("#blur-image").css("left",String(-leftmargin)+"px");
    $("#blur-image").css("top",String(-topmargin)+"px");
    initcanvas();
}

document.onkeyup = function(event){
    event = event||window.event;
    /*console.log(event.keyCode);*/
    if(event.keyCode==32){
        reset();
    }
    if(event.keyCode==13){
        show();
    }
}
function initcanvas() {
    canvas.theAnimotion=null;
    var theleft = leftmargin<0?-leftmargin:0;
    var thetop = topmargin<0?-topmargin:0;
    clippingReign = {x:Math.random()*(canvas.width-2*radus-2*theleft)+radus+theleft,
                        y:Math.random()*(canvas.height-2*radus-2*thetop)+radus+thetop,r:radus};
    draw(image, clippingReign);
}
function setclippingReign(clippingReign) {
    context.beginPath();
    context.arc(clippingReign.x, clippingReign.y, clippingReign.r, 0, Math.PI * 2, false);
    context.clip();
}

function draw(image, clippingReign) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    setclippingReign(clippingReign);
    context.drawImage(image,
                        Math.max(leftmargin,0),Math.max(topmargin,0),
                        Math.min(image.width,canvas.width),Math.min(image.height,canvas.height),
                        leftmargin<0?-leftmargin:0,topmargin<0?-topmargin:0,
                        Math.min(image.width,canvas.width),Math.min(image.height,canvas.height)
                        );
    context.restore();
}

function reset(){
    if(canvas.theAnimotion) {
        clearInterval(canvas.theAnimotion);
    }
    initcanvas();
}

function show(){
 /*   clippingReign.r = 1000;
    draw(image,clippingReign);
*/
    clearInterval(canvas.theAnimotion);
    canvas.theAnimotion = setInterval(
        function(){
            clippingReign.r += 15;
            if(clippingReign.r>(canvas.width+canvas.height)){
                clearInterval(canvas.theAnimotion)
            }
            draw(image,clippingReign);
        },
        30
    );
}

canvas.addEventListener("touchstart",function(e){
    e.preventDefault();
})

/*document.getElementById("#blur-image").onload=*/

