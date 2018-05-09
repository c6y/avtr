/* eslint-disable no-unused-vars*/

const avatarW = 1024; // avatar width
const avatarH = 1024; // avatar height
const unit = 16;

let isHead = null;
let isEyes = null;
let isNose = null;
let isMouth = null;

let colorIndex = null;

let showSafezones = true; // [dev] toggle safezones, default is false;

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
  '/media/neck/neck-001.svg', // neck
  '/media/head/head-001.svg',
  '/media/head/head-002.svg',
  '/media/head/head-003.svg',
  '/media/head/head-004.svg',
  '/media/head/head-005.svg',
  '/media/head/head-006.svg',
  '/media/head/head-007.svg',
  '/media/head/head-008.svg',
  '/media/safezones.png'
);

// render eyes library thumbnails to html thumbs
const eyesCount = eyes.length;
let imgElementEye = '';
let i;
for (i = 0; i < eyesCount; i++) {
  imgElementEye +=
    '<span class="eyeThumbOff"><img alt="' +
    i +
    '" onclick="addEyes()" src="media/eyes/' +
    eyes[i].filename +
    '" /></span>';
}

// render noses library thumbnails to html thumbs
const nosesCount = noses.length;
let imgElementNose = '';
let n;
for (n = 0; n < nosesCount; n++) {
  imgElementNose +=
    '<span class="noseThumbOff"><img alt="' +
    n +
    '" onclick="addNose()" src="media/nose/' +
    noses[n].filename +
    '" /></span>';
}

// render noses library thumbnails to html thumbs
const mouthsCount = mouths.length;
let imgElementMouth = '';
let m;
for (m = 0; m < mouthsCount; m++) {
  imgElementMouth +=
    '<span class="mouthThumbOff"><img alt="' +
    m +
    '" onclick="addMouth()" src="media/mouth/' +
    mouths[m].filename +
    '" /></span>';
}

/**
 * draw an initial grey head to canvas
 */
function defaultHead() {
  // get default head shape
  const img = new Image();
  img.src = 'media/head/head-001.svg';

  // get default neck shape
  const imgNeck = new Image();
  imgNeck.src = dir + '/media/neck/neck-001.svg';

  img.onload = function() {
    const canvas = document.getElementById('headCanvas');
    const ctx = canvas.getContext('2d');

    // draw head
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(img, 0, 0, avatarW, avatarH);

    // draw neck
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(imgNeck, 0, 0, avatarW, avatarH);

    // color head and neck
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, avatarW, avatarH);

    mergeCanvases();
  };
}

window.onload = function() {
  document.getElementById('eyes').innerHTML = imgElementEye;
  document.getElementById('noses').innerHTML = imgElementNose;
  document.getElementById('mouths').innerHTML = imgElementMouth;
  defaultHead();
};

/**
 * add head to head canvas, remove previous head
 */
function addHead() {
  const colorSetACount = colors.length;

  // calculate color but start at 0 if not defined
  if (colorIndex === null) {
    colorIndex = 0;
  } else {
    // set next color
    colorIndex++;
    // set index back to 0 if above count
    if (colorIndex >= colorSetACount) {
      colorIndex = 0;
    }
  }

  // get head shape that is clicked on
  const img = new Image();
  img.src = this.event.target.src;

  // get default neck shape
  const imgNeck = new Image();
  imgNeck.src = dir + '/media/neck/neck-001.svg';

  img.onload = function() {
    const canvas = document.getElementById('headCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, avatarW, avatarH);

    // draw head
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(img, 0, 0, avatarW, avatarH);

    // color head
    ctx.globalCompositeOperation = 'source-atop';
    const newColor = colors[colorIndex];
    ctx.fillStyle = newColor;
    ctx.fillRect(0, 0, avatarW, avatarH);

    // draw neck
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(imgNeck, 0, 0, avatarW, avatarH);

    mergeCanvases();
  };
  isHead = this.event.target.id;
  // composeName();
  setAvtrName();
  toggleShowDownload();
  // set parent class to active
  switchParentClass('headThumbOff', 'headThumbOn');
  removeClass('tabUndef', 'eyetab');
}

/**
 * add eyes to eyes canvas, remove previous eyes
 */
function addEyes() {
  const img = new Image();

  img.src = this.event.target.src;

  // get eye properties
  const idx = this.event.target.alt;

  const iW = eyes[idx].w;
  const iH = eyes[idx].h;
  const iX = eyes[idx].x + eyeCenter.x - Math.floor(iW / 2);
  const iY = eyes[idx].y + eyeCenter.y - Math.floor(iH / 2);

  // part number starts at 1, not at zero
  const eyesNameNumber = Number(idx) + 1;

  // draw eyes
  img.onload = function() {
    const canvas = document.getElementById('eyesCanvas');
    const ctx = canvas.getContext('2d');
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, avatarW, avatarH);
    // draw first (left) eye
    ctx.drawImage(img, iX * unit, iY * unit, iW * unit, iH * unit);
    // mirror and draw second (right) eye
    ctx.save();
    ctx.translate(64 * unit, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(img, iX * unit, iY * unit, iW * unit, iH * unit);
    ctx.restore();

    mergeCanvases();
  };
  isEyes = eyesNameNumber;
  setAvtrName();
  toggleShowDownload();
  // set parent class to active
  switchParentClass('eyeThumbOff', 'eyeThumbOn');
  removeClass('tabUndef', 'nosetab');
}

/**
 * add nose to nose canvas, remove previous nose
 */
function addNose() {
  const img = new Image();
  img.src = this.event.target.src;

  // get nose properties
  const idx = this.event.target.alt;
  const iW = noses[idx].w;
  const iH = noses[idx].h;
  const iX = noses[idx].x + noseCenter.x - Math.floor(iW / 2);
  const iY = noses[idx].y + noseCenter.y - Math.floor(iH / 2);

  // part number
  const noseNameNumber = Number(idx) + 1;

  // draw nose
  img.onload = function() {
    const canvas = document.getElementById('noseCanvas');
    const ctx = canvas.getContext('2d');
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, avatarW, avatarH);
    ctx.drawImage(img, iX * unit, iY * unit, iW * unit, iH * unit);

    mergeCanvases();
  };
  isNose = noseNameNumber;
  setAvtrName();
  toggleShowDownload();
  // set parent class to active
  switchParentClass('noseThumbOff', 'noseThumbOn');
  removeClass('tabUndef', 'mouthtab');
}

/**
 * add mouth to mouth canvas, remove previous mouth
 */
function addMouth() {
  const img = new Image();
  img.src = this.event.target.src;

  // get nose properties
  const idx = this.event.target.alt;
  const iW = mouths[idx].w;
  const iH = mouths[idx].h;
  const iX = mouths[idx].x + mouthCenter.x - Math.floor(iW / 2);
  const iY = mouths[idx].y + mouthCenter.y - Math.floor(iH / 2);

  // part number starts at 1, not at zero
  const mouthNameNumber = Number(idx) + 1;

  // draw mouth
  img.onload = function() {
    const canvas = document.getElementById('mouthCanvas');
    const ctx = canvas.getContext('2d');
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, avatarW, avatarH);
    ctx.drawImage(img, iX * unit, iY * unit, iW * unit, iH * unit);

    mergeCanvases();
  };
  isMouth = mouthNameNumber;
  setAvtrName();
  toggleShowDownload();
  // set parent class to active
  switchParentClass('mouthThumbOff', 'mouthThumbOn');
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
  const download = document.getElementById('download');
  const canvas = document.getElementById('mergedCanvas');
  const imagepng = canvas.toDataURL('image/png');
  const imagestream = imagepng.replace('image/png', 'image/octet-stream');

  // compose name for file
  const name = composeName();
  const imageName =
  'eboy-avtr-' +
  name +
  '.png';

  this.event.currentTarget.parentNode.setAttribute('href', imagestream);
  this.event.currentTarget.parentNode.setAttribute('download', imageName);
}

/**
 * remove a specifc class from element with id
 * (but keeps other classes of element intact)
 * @param {string} cl class name to be removed
 * @param {string} id of element
 */
function removeClass(cl, id) {
  const element = document.getElementById(id);
  element.classList.remove(cl);
}

/**
 * assign activeClass to clicked element
 * assign inactiveClass to other element
 * @param {string} fromClass inactive class name
 * @param {string} toClass active class name
 */
function switchThisClass(fromClass, toClass) {
  // remove active class from other active element
  const elements = document.getElementsByClassName(toClass);
  // only take the first element in array (there should only be one)
  const requiredElement = elements[0];
  if (requiredElement) {
    requiredElement.setAttribute('class', fromClass);
  }
  // set active class to this element
  this.event.target.setAttribute('class', toClass);
}

/**
 * find element with toClass and replace it with fromClass
 * assign toClass to parent of target element
 * @param {string} fromClass inactive class name
 * @param {string} toClass active class name
 */
function switchParentClass(fromClass, toClass) {
  // remove toClass from other element
  const elements = document.getElementsByClassName(toClass);
  // only take the first element in array (there should only be one)
  const requiredElement = elements[0];
  if (requiredElement) {
    requiredElement.setAttribute('class', fromClass);
  }
  // set toClass to parent of this element
  this.event.currentTarget.parentNode.setAttribute('class', toClass);
}

/**
 * find first element with class and replace it with new class
 * @param {string} fromClass class to be replaced
 * @param {string} toClass new class
 */
function replaceClass(fromClass, toClass) {
  // find all elements with class
  const elements = document.getElementsByClassName(fromClass);
  // only take the first element in array (there should only be one)
  const requiredElement = elements[0];
  if (requiredElement) {
    requiredElement.removeAttribute('class', fromClass);
    requiredElement.setAttribute('class', toClass);
  }
}

/**
 * click on tab makes it active, and shows tab content
 */
function setActiveTab() {
  // turn other tabs off, current tab to on
  switchThisClass('tabOff', 'tabOn');
  const setActive = this.event.target.id;
  // remove showLib class from other element
  replaceClass('showLib', 'hideLib');
  if (setActive === 'eyetab') {
    // set showLib class to element 'eyes'
    const setActiveElement = document.getElementById('eyes');
    setActiveElement.setAttribute('class', 'showLib');
  } else if (setActive === 'nosetab') {
    // set showLib class to element 'noses'
    const setActiveElement = document.getElementById('noses');
    setActiveElement.setAttribute('class', 'showLib');
  } else if (setActive === 'mouthtab') {
    // set showLib class to element 'mouths'
    const setActiveElement = document.getElementById('mouths');
    setActiveElement.setAttribute('class', 'showLib');
  } else if (setActive === 'shapetab') {
    // set showLib class to element 'shapes'
    const setActiveElement = document.getElementById('shapes');
    setActiveElement.setAttribute('class', 'showLib');
  }
}

/**
 * toggle safezone display for dev
 */
function toggleSafezone() {
  const setSafezoneElement = document.getElementById('safezone');
  if (showSafezones) {
    setSafezoneElement.setAttribute('class', 'hideSafezone');
    showSafezones = false;
  } else {
    setSafezoneElement.setAttribute('class', 'showSafezone');
    showSafezones = true;
  }
}

/**
 * return avtr name based on part of array used
 * @return {string} the name of the avatar
 */
function composeName() {
  if (isHead && isEyes && isNose && isMouth) {
    const colorDigit = format2Digits(Number(colorIndex) + 1);
    const eyeDigit = format2Digits(isEyes);
    const noseDigit = format2Digits(isNose);
    const mouthDigit = format2Digits(isMouth);

    const name =
    isHead +
    colorDigit +
    eyeDigit +
    noseDigit +
    mouthDigit;
    return name;
  }
}

/**
 * update name of download button
 */
function setAvtrName() {
  if (isHead && isEyes && isNose && isMouth) {
    const name = composeName();
    document.getElementById('avtrName').innerHTML = name;
  }
}

/**
 * format any number to two last positive integers
 * and preface with 0 if lower than 10
 * @param {number} number any number
 * @return {string} two digit number
 */
function format2Digits(number) {
  let formattedNumber = ('0' + number).slice(-2);
  return formattedNumber;
}

/**
 * show download button, only if head, eyes, nose and mouth are set
 */
function toggleShowDownload() {
  if (isHead && isEyes && isNose && isMouth) {
    replaceClass('hideDownload', 'showDownload');
  }
}
