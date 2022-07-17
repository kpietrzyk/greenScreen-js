var fgImage = null;
var bgImage = null;
var canvFg = document.getElementById("foreground");
var canvBg = document.getElementById("background");


function uploadFgImage() {
  var fgfile = document.getElementById("fgfile");
  fgImage = new SimpleImage(fgfile);
  fgImage.drawTo(canvFg);
}


function uploadBgImage() {
  var bgfile = document.getElementById("bgfile");
  bgImage = new SimpleImage(bgfile);
  bgImage.drawTo(canvBg);
}

function clrCanvases() {
  doClear(canvFg);
  doClear(canvBg);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}

function createComposite() {
  if(fgImage == null || !fgImage.complete()) {
    alert("foreground not loaded!");
    return;
  }
  
  if(bgImage == null || !bgImage.complete()) {
    alert("background not loaded");
  }
  clrCanvases();
  var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  for (var pixel of fgImage.values()) {
    // Look at currentPixel and if it is green
    if (pixel.getGreen() > pixel.getRed() + pixel.getBlue()) {
        // Look at same positon in bgImage
        var x = pixel.getX();
        var y = pixel.getY();
        var bgPixel = bgImage.getPixel(x, y);
        // and set output's corresponding pixel to bgImage's pixel
        output.setPixel(x, y, bgPixel);
    } 
    // Otherwise: set output's corresponding pixel to currentPixel
    else {
        output.setPixel(pixel.getX(), pixel.getY(), pixel);
    }
}
// show out answer!
clrCanvases();
output.drawTo(canvFg);
}