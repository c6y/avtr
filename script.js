const avatarW = 512; // avatar width
const avatarH = 512; // avatar height

/**
 * add head to head canvas, remove previous head
 */
function addHead() {
  const img = new Image();
  img.src = event.target.src;
  headFile = img.src;
  img.onload = function() {
    const canvas = document.getElementById("headCanvas");
    const ctx = canvas.getContext("2d");
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, avatarW, avatarH);
    ctx.drawImage(img, 0, 0, avatarW, avatarH);
    mergeCanvases();
  }
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
    ctx.clearRect(0, 0, avatarW, avatarH);
    ctx.drawImage(img, 0, 0, avatarW, avatarH);
    mergeCanvases();
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
    ctx.clearRect(0, 0, avatarW, avatarH);
    ctx.drawImage(img, 0, 0, avatarW, avatarH);
    mergeCanvases();
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
    ctx.clearRect(0, 0, avatarW, avatarH);
    ctx.drawImage(img, 0, 0, avatarW, avatarH);
    mergeCanvases();
  }
}

/**
 * merge all canvases into one, ready for downloading
 */
function mergeCanvases(){
  const headC = document.getElementById('headCanvas');
  const eyesC = document.getElementById('eyesCanvas');
  const noseC = document.getElementById('noseCanvas');
  const mouthC = document.getElementById('mouthCanvas');

  const canvas = document.getElementById('mergedCanvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(headC, 0, 0);
  ctx.drawImage(eyesC, 0, 0);
  ctx.drawImage(noseC, 0, 0);
  ctx.drawImage(mouthC, 0, 0);
}

/**
 * download png of merged canvas
 */
function download(){
  const download = document.getElementById("download");
  const canvas = document.getElementById('mergedCanvas');
  const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
}
