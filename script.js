/* eslint-disable no-unused-vars*/

const avatarW = 512; // avatar width
const avatarH = 512; // avatar height
const offsetV = -8;

let isEyes = null;
let isNose = null;
let isMouth = null;

let pImages = [];

// to preload the images, get current directory's path
const loc = window.location.pathname;
const dir = loc.substring(0, loc.lastIndexOf('/'));

/**
 * preload neck images into array
 */
function preloadimages() {
  let i = 0;
  for (i = 0; i < preloadimages.arguments.length; i++) {
    pImages[i] = new Image();
    pImages[i].src = dir + preloadimages.arguments[i];
  }
}

// preload neck and head shape images
preloadimages(
  "/media/neck/neck-001.svg", // neck
  "/media/head/head-001.svg",
  "/media/head/head-002.svg",
  "/media/head/head-003.svg",
  "/media/head/head-004.svg",
  "/media/head/head-005.svg",
  "/media/head/head-006.svg",
  "/media/head/head-007.svg",
  "/media/head/head-008.svg"
);

const colorSetA = [
  '#4088EE',
  '#33BB55',
  '#FF3333',
  '#FFDD00',
  '#B156C4',
  '#23D6C9',
  '#FF0088',
  '#BBEE33'
];
// const colorsSkin = [
//   '#F8AA8F',
//   '#e0a899',
//   '#c99789'
// ];

/**
 * add head to head canvas, remove previous head
 */
function addHead() {
  const colorSetACount = colorSetA.length;
  const randomColorA = Math.floor(Math.random() * colorSetACount);

  // get head shape that is clicked on
  const img = new Image();
  img.src = this.event.target.src;

  // get default neck shape
  const imgNeck = new Image();
  imgNeck.src = dir + '/media/neck/neck-001.svg';

  img.onload = function() {
    const canvas = document.getElementById("headCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, avatarW, avatarH);

    // draw head
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(img, 0, 0, avatarW, avatarH);

    // color head
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = colorSetA[randomColorA];
    ctx.fillRect(0, 0, avatarW, avatarH);

    // draw neck
    ctx.globalCompositeOperation = "destination-over";
    ctx.drawImage(imgNeck, 0, 0, avatarW, avatarH);

    mergeCanvases();
  };
  setActiveClass('headElement', 'headElementActive');
}

/**
 * add eyes to eyes canvas, remove previous eyes
 */
function addEyes() {
  const img = new Image();
  img.src = this.event.target.src;
  const eyesFile = img.src;
  if (isEyes === eyesFile) {
    // remove eyes if same eyes is on canvas
    const canvas = document.getElementById("eyesCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, avatarW, avatarH);
    mergeCanvases();
    isEyes = null;
    this.event.target.setAttribute("class", "eyesElement");
  } else {
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
    };
    setActiveClass('eyesElement', 'eyesElementActive');
  }
}

/**
 * add nose to nose canvas, remove previous nose
 */
function addNose() {
  const img = new Image();
  img.src = this.event.target.src;
  const noseFile = img.src;
  if (isNose === noseFile) {
    // remove nose if same nose is on canvas
    const canvas = document.getElementById("noseCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, avatarW, avatarH);
    mergeCanvases();
    isNose = null;
    this.event.target.setAttribute("class", "noseElement");
  } else {
    // draw nose if there's no or different nose
    img.onload = function() {
      const canvas = document.getElementById("noseCanvas");
      const ctx = canvas.getContext("2d");
      ctx.mozImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, avatarW, avatarH);
      ctx.drawImage(img, 0, offsetV, avatarW, avatarH);
      mergeCanvases();
      isNose = noseFile;
    };
    setActiveClass('noseElement', 'noseElementActive');
  }
}

/**
 * add mouth to mouth canvas, remove previous mouth
 */
function addMouth() {
  const img = new Image();
  img.src = this.event.target.src;
  const mouthFile = img.src;
  if (isMouth === mouthFile) {
    // remove mouth if same mouth is on canvas
    const canvas = document.getElementById("mouthCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, avatarW, avatarH);
    mergeCanvases();
    isMouth = null;
    this.event.target.setAttribute("class", "mouthElement");
  } else {
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
    };
    setActiveClass('mouthElement', 'mouthElementActive');
  }
}

/**
 * merge all canvases into one, ready for downloading
 */
function mergeCanvases() {
  const headC = document.getElementById('headCanvas');
  const eyesC = document.getElementById('eyesCanvas');
  const noseC = document.getElementById('noseCanvas');
  const mouthC = document.getElementById('mouthCanvas');

  const canvas = document.getElementById('mergedCanvas');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(headC, 0, 0);
  ctx.drawImage(eyesC, 0, 0);
  ctx.drawImage(noseC, 0, 0);
  ctx.drawImage(mouthC, 0, 0);
}

/**
 * download png of merged canvas
 */
function download() {
  const download = document.getElementById("download");
  const canvas = document.getElementById('mergedCanvas');
  const imagepng = canvas.toDataURL("image/png");
  const imagestream = imagepng.replace("image/png", "image/octet-stream");
  download.setAttribute("href", imagestream);
}

/**
 * remove eyes from canvas
 */
function removeHead() {
  const canvas = document.getElementById("headCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, avatarW, avatarH);
  mergeCanvases();
  this.event.target.setAttribute("class", "headElement");
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
 * remove nose from canvas
 */
function removeNose() {
  const canvas = document.getElementById("noseCanvas");
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
 * @param {string} inactiveClass inactive class name
 * @param {string} activeClass active class name
 */
function setActiveClass(inactiveClass, activeClass) {
  // remove active class from other active element
  const elements = document.getElementsByClassName(activeClass);
  const requiredElement = elements[0];
  if (requiredElement) {
    requiredElement.setAttribute("class", inactiveClass);
  }
  // set active class
  this.event.target.setAttribute("class", activeClass);
}
