function clickHead() {
  document.getElementById("demo").innerHTML = "head clicked";
}
function clickNose() {
  document.getElementById("demo").innerHTML = "nose clicked";
}
function addFoo() {
  var canvas = document.getElementById("headCanvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 256, 256);
}

function addBar() {
  var canvas = document.getElementById("headCanvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "#00FF00";
  ctx.fillRect(128, 128, 64, 64);
}

function addHeadElement() {
  const img = new Image();
  img.src = event.target.src;
  img.onload = function() {
    const canvas = document.getElementById("headCanvas");
    const ctx = canvas.getContext("2d");
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, 256, 256);
  }
}

function addNoseElement() {
  const img = new Image();
  img.src = event.target.src;
  img.onload = function() {
    const canvas = document.getElementById("noseCanvas");
    const ctx = canvas.getContext("2d");
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, 256, 256);
  }
}
