/**
 * draw a circle and a neck
 */
function addHeadCircle() {
  const canvas = document.getElementById("headCanvas");
  const ctx = canvas.getContext("2d");

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 108;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#FFA080';
  ctx.fillRect(96, 192, 64, 64);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = '#F8AA8F';
  ctx.fill();
}

/**
 * draw a rectangle and neck
 */
function addHeadRect() {
  const canvas = document.getElementById("headCanvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // neck
  ctx.fillStyle = '#FFA080';
  ctx.fillRect(96, 192, 64, 64);
  // head
  ctx.fillStyle = "#F8AA8F";
  ctx.fillRect(32, 32, 192, 192);
}

/**
 * draw a diamond shaped head
 */
function addHeadDiamond() {
  const canvas = document.getElementById("headCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // neck
  ctx.fillStyle = '#FFA080';
  ctx.fillRect(96, 192, 64, 64);
  // head
  ctx.fillStyle = '#F8AA8F';
  ctx.beginPath();
  ctx.moveTo(128, 4);
  ctx.lineTo(252, 128);
  ctx.lineTo(128, 252);
  ctx.lineTo(4, 128);
  ctx.fill();
}

let headFile;

function addHeadElement() {
  const img = new Image();
  img.src = event.target.src;
  headFile = img.src;
  img.onload = function() {
    const canvas = document.getElementById("headCanvas");
    const ctx = canvas.getContext("2d");
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, 256, 256);
  }
}

function addEyesElement() {
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

function addMouthElement() {
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

function addNoseElement() {
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

function showHeadFileSrc() {
  console.log('headFile: ' + headFile);
}
