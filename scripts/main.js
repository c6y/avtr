/* eslint-disable no-unused-vars*/

const avatarW = 1024; // avatar width
const avatarH = 1024; // avatar height
const unit = 16;

let isHead = null;
let isEyes = null;
let isNose = null;
let isMouth = null;

let colorIndex = 0;

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

window.onload = function() {
  document.getElementById('eyes').innerHTML = imgElementEye;
  document.getElementById('noses').innerHTML = imgElementNose;
  document.getElementById('mouths').innerHTML = imgElementMouth;
};

/**
 * add head to head canvas, remove previous head
 */
function addHead() {
  const colorSetACount = colors.length;

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

    // set next color
    colorIndex++;
    // set index back to 0 if above count
    if (colorIndex >= colorSetACount) {
      colorIndex = 0;
    }
  };
  switchParentClass('headThumbOff', 'headThumbOn');

  isHead = this.event.target.id;
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

  const eyesIndex = Number(idx);

  if (isEyes === eyesIndex) {
    // remove eyes if same eyes is on canvas
    const canvas = document.getElementById('eyesCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, avatarW, avatarH);
    mergeCanvases();
    isEyes = null;
    this.event.currentTarget.parentNode.setAttribute('class', 'eyeThumbOff');
  } else {
    // draw eyes if there's no or different eyes
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
      isEyes = Number(idx);
    };

    // set parent class to active
    switchParentClass('eyeThumbOff', 'eyeThumbOn');
  }
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

  const noseFile = Number(idx);

  if (isNose === noseFile) {
    // remove nose if same nose is on canvas
    const canvas = document.getElementById('noseCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, avatarW, avatarH);
    mergeCanvases();
    isNose = null;
    this.event.currentTarget.parentNode.setAttribute('class', 'noseThumbOff');
  } else {
    // draw nose if there's no or different nose
    img.onload = function() {
      const canvas = document.getElementById('noseCanvas');
      const ctx = canvas.getContext('2d');
      ctx.mozImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, avatarW, avatarH);
      ctx.drawImage(img, iX * unit, iY * unit, iW * unit, iH * unit);

      mergeCanvases();
      isNose = Number(idx);
    };
    switchParentClass('noseThumbOff', 'noseThumbOn');
  }
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

  const mouthFile = Number(idx);

  if (isMouth === mouthFile) {
    // remove mouth if same mouth is on canvas
    const canvas = document.getElementById('mouthCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, avatarW, avatarH);
    mergeCanvases();
    isMouth = null;
    this.event.currentTarget.parentNode.setAttribute('class', 'mouthThumbOff');
  } else {
    // draw mouth if there's no or different mouth
    img.onload = function() {
      const canvas = document.getElementById('mouthCanvas');
      const ctx = canvas.getContext('2d');
      ctx.mozImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, avatarW, avatarH);
      ctx.drawImage(img, iX * unit, iY * unit, iW * unit, iH * unit);

      mergeCanvases();
      isMouth = Number(idx);
    };
    switchParentClass('mouthThumbOff', 'mouthThumbOn');
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
  const download = document.getElementById('download');
  const canvas = document.getElementById('mergedCanvas');
  const imagepng = canvas.toDataURL('image/png');
  const imagestream = imagepng.replace('image/png', 'image/octet-stream');

  const eyesyl = partSyllable(eyes, isEyes);
  const nosesyl = partSyllable(noses, isNose);
  const mouthsyl = partSyllable(mouths, isMouth);

  const imageName =
  'eboy-avtr-' +
  isHead +
  eyesyl +
  nosesyl +
  mouthsyl +
  '.png';
  console.log('imageName: ' + imageName);
  this.event.currentTarget.parentNode.setAttribute('href', imagestream);
  this.event.currentTarget.parentNode.setAttribute('download', imageName);
}

/**
 * remove eyes from canvas
 */
function removeHead() {
  const canvas = document.getElementById('headCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, avatarW, avatarH);
  mergeCanvases();
  this.event.target.setAttribute('class', 'headElement');
}

/**
 * remove eyes from canvas
 */
function removeEyes() {
  const canvas = document.getElementById('eyesCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, avatarW, avatarH);
  mergeCanvases();
}

/**
 * remove nose from canvas
 */
function removeNose() {
  const canvas = document.getElementById('noseCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, avatarW, avatarH);
  mergeCanvases();
}

/**
 * remove mouth from canvas
 */
function removeMouth() {
  const canvas = document.getElementById('mouthCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, avatarW, avatarH);
  mergeCanvases();
}

// DELETE FUNCTION?
/**
 * assign activeClass to clicked element
 * assign inactiveClass to other element
 * @param {string} inactiveClass inactive class name
 * @param {string} activeClass active class name
 */
function setThisToActiveClass(inactiveClass, activeClass) {
  // remove active class from other active element
  const elements = document.getElementsByClassName(activeClass);
  // only take the first element in array (there should only be one)
  const requiredElement = elements[0];
  if (requiredElement) {
    requiredElement.setAttribute('class', inactiveClass);
  }
  // set active class to this element
  this.event.target.setAttribute('class', activeClass);
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
 * @param {string} classFrom class to be replaced
 * @param {string} classTo new class
 */
function replaceClass(classFrom, classTo) {
  // find all elements with class
  const elements = document.getElementsByClassName(classFrom);
  // only take the first element in array (there should only be one)
  const requiredElement = elements[0];
  if (requiredElement) {
    requiredElement.removeAttribute('class', classFrom);
    requiredElement.setAttribute('class', classTo);
  }
}

/**
 * click on tab makes it active, and shows tab content
 */
function setActiveTab() {
  // turn other tabs off, current tab to on
  setThisToActiveClass('tabOff', 'tabOn');
  const setActive = this.event.target.id;
  if (setActive === 'eyetab') {
    // remove showLib class from other element
    replaceClass('showLib', 'hideLib');
    // set showLib class to element 'eyes'
    const setActiveElement = document.getElementById('eyes');
    setActiveElement.setAttribute('class', 'showLib');
  } else if (setActive === 'nosetab') {
    // remove showLib class from other element
    replaceClass('showLib', 'hideLib');
    // set showLib class to element 'noses'
    const setActiveElement = document.getElementById('noses');
    setActiveElement.setAttribute('class', 'showLib');
  } else if (setActive === 'mouthtab') {
    // remove showLib class from other element
    replaceClass('showLib', 'hideLib');
    // set showLib class to element 'mouths'
    const setActiveElement = document.getElementById('mouths');
    setActiveElement.setAttribute('class', 'showLib');
  } else if (setActive === 'shapetab') {
    // remove active class from other element
    replaceClass('showLib', 'hideLib');
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
 * return syllable of array part
 * @param {string} array parts array to choose syllable from
 * @param {number} index index of chosen element
 * @return {string} syllable
 */
function partSyllable(array, index) {
  const s = array[index].s;
  console.log('s: ' + s);
  return s;
}
