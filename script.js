/**
 * draw a rectangle and neck
 */
function drawHeadRect() {
  const canvas = document.getElementById("headCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // body
  ctx.fillStyle = '#4088ee';
  ctx.beginPath();
  ctx.moveTo(128, 128);
  ctx.lineTo(168, 256);
  ctx.lineTo(88, 256);
  ctx.fill();
  // head
  ctx.fillStyle = "#F8AA8F";
  ctx.fillRect(32, 32, 192, 192);
}

/**
 * draw a circle and a neck
 */
function drawHeadCircle() {
  const canvas = document.getElementById("headCanvas");
  const ctx = canvas.getContext("2d");
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 108;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // body
  ctx.fillStyle = '#33BB55';
  ctx.beginPath();
  ctx.moveTo(128, 128);
  ctx.lineTo(168, 256);
  ctx.lineTo(88, 256);
  ctx.fill();
  // head
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#F8AA8F';
  ctx.fill();
}

/**
 * draw a diamond shaped head
 */
function drawHeadDiamond() {
  const canvas = document.getElementById("headCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // body
  ctx.fillStyle = '#FF3333';
  ctx.beginPath();
  ctx.moveTo(128, 128);
  ctx.lineTo(168, 256);
  ctx.lineTo(88, 256);
  ctx.closePath();
  ctx.fill();
  // head
  ctx.fillStyle = '#F8AA8F';
  ctx.beginPath();
  ctx.moveTo(128, 4);
  ctx.lineTo(252, 128);
  ctx.lineTo(128, 252);
  ctx.lineTo(4, 128);
  ctx.fill();
}

/**
 * draw a double-ellipse shaped head
 */
function drawHeadDoubleEllipse() {
  const canvas = document.getElementById("headCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // body
  ctx.fillStyle = '#ffdd00';
  ctx.beginPath();
  ctx.moveTo(128, 128);
  ctx.lineTo(168, 256);
  ctx.lineTo(88, 256);
  ctx.closePath();
  ctx.fill();
  // head
  ctx.fillStyle = '#F8AA8F';
  ctx.beginPath();
  // ctx.ellipse(128, 128, 120, 96, 0, 0, 90);
  ctx.ellipse(128, 84, 100, 72, 0, 0, 90);
  ctx.ellipse(128, 172, 100, 72, 0, 0, 90);
  ctx.closePath();
  ctx.fill();
}

/**
 * add eyes to eyes canvas, remove previous eyes
 */
function addEyes() {
  const img = new Image();
  img.src = event.target.src;
  headFile = img.src;
  img.onload = function() {
    const canvas = document.getElementById("eyesCanvas");
    const ctx = canvas.getContext("2d");
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 256, 256);
  }
}

/**
 * add mouth to mouth canvas, remove previous mouth
 */
 function addMouth() {
  const img = new Image();
  img.src = event.target.src;
  headFile = img.src;
  img.onload = function() {
    const canvas = document.getElementById("mouthCanvas");
    const ctx = canvas.getContext("2d");
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 256, 256);
  }
}

/**
 * add nose to nose canvas, remove previous nose
 */
function addNose() {
  const img = new Image();
  img.src = event.target.src;
  headFile = img.src;
  img.onload = function() {
    const canvas = document.getElementById("noseCanvas");
    const ctx = canvas.getContext("2d");
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 256, 256);
  }
}

/**
 * merge all canvases into one, ready for downloading
 */
function mergeCanvases(){
  var headC = document.getElementById('headCanvas');
  var eyesC = document.getElementById('eyesCanvas');
  var noseC = document.getElementById('noseCanvas');
  var mouthC = document.getElementById('mouthCanvas');

  var canvas = document.getElementById('mergedCanvas');
  var ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(headC, 0, 0);
  ctx.drawImage(eyesC, 0, 0);
  ctx.drawImage(noseC, 0, 0);
  ctx.drawImage(mouthC, 0, 0);
}
