const avatarW = 720; // avatar width
const avatarH = 720; // avatar height
const offsetV = 0;

let isHead = null;
let isEyes = null;
let isNose = null;
let isMouth = null;

/**
 * add head to head canvas, remove previous head
 */
function addHead() {
  const img = new Image();
  img.src = event.target.src;
  headFile = img.src;
  if (isHead != headFile) {
    // draw head if there's no or different head
    img.onload = function() {
      const canvas = document.getElementById("headCanvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, avatarW, avatarH);
      ctx.drawImage(img, 0, 0, avatarW, avatarH);
      mergeCanvases();
      isHead = headFile;
    }
    setActiveClass('headElement', 'headElementActive');
  } else {
    // remove head if same head is on canvas
    const canvas = document.getElementById("headCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, avatarW, avatarH);
    mergeCanvases();
    isHead = null;
    event.target.setAttribute("class", "headElement");
  }
}

/**
 * add eyes to eyes canvas, remove previous eyes
 */
function addEyes() {
  const img = new Image();
  img.src = event.target.src;
  eyesFile = img.src;
  if (isEyes != eyesFile) {
    // draw eyes if there's no or different eyes
    img.onload = function() {
      const canvas = document.getElementById("eyesCanvas");
      const ctx = canvas.getContext("2d");
      ctx.mozImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, avatarW, avatarH);
      ctx.drawImage(img, 0, offsetV, avatarW, avatarH);
      mergeCanvases();
      isEyes = eyesFile;
    }
    setActiveClass('eyesElement', 'eyesElementActive');
  } else {
    // remove eyes if same eyes is on canvas
    const canvas = document.getElementById("eyesCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, avatarW, avatarH);
    mergeCanvases();
    isEyes = null;
    event.target.setAttribute("class", "eyesElement");
  }
}

/**
 * add mouth to mouth canvas, remove previous mouth
 */
function addMouth() {
  const img = new Image();
  img.src = event.target.src;
  mouthFile = img.src;
  if (isMouth != mouthFile) {
    // draw mouth if there's no or different mouth
    img.onload = function() {
      const canvas = document.getElementById("mouthCanvas");
      const ctx = canvas.getContext("2d");
      ctx.mozImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, avatarW, avatarH);
      ctx.drawImage(img, 0, offsetV, avatarW, avatarH);
      mergeCanvases();
      isMouth = mouthFile;
    }
    setActiveClass('mouthElement', 'mouthElementActive');
  } else {
    // remove mouth if same mouth is on canvas
    const canvas = document.getElementById("mouthCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, avatarW, avatarH);
    mergeCanvases();
    isMouth = null;
    event.target.setAttribute("class", "mouthElement");
  }
}

/**
 * merge all canvases into one, ready for downloading
 */
function mergeCanvases(){
  const headC = document.getElementById('headCanvas');
  const eyesC = document.getElementById('eyesCanvas');
  const mouthC = document.getElementById('mouthCanvas');

  const canvas = document.getElementById('mergedCanvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#eee';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(headC, 0, 0);
  ctx.drawImage(eyesC, 0, 0);
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

/**
 * remove eyes from canvas
 */
function removeHead() {
  const canvas = document.getElementById("headCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, avatarW, avatarH);
  mergeCanvases();
  event.target.setAttribute("class", "headElement");
}

/**
 * remove eyes from canvas
 */
function removeEyes() {
  const canvas = document.getElementById("eyesCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, avatarW, avatarH);
  mergeCanvases();
}

/**
 * remove mouth from canvas
 */
function removeMouth() {
  const canvas = document.getElementById("mouthCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, avatarW, avatarH);
  mergeCanvases();
}

/**
 * set active class and remove it from previous element
 */
function setActiveClass(inactiveClass, activeClass) {
  // remove active class from other active element
  const elements = document.getElementsByClassName(activeClass);
  const requiredElement = elements[0];
  if(requiredElement) {
    requiredElement.setAttribute("class", inactiveClass);
  }
  // set active class
  event.target.setAttribute("class", activeClass);
}
