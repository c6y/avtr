/* eslint-disable no-unused-vars*/

const avatarW = 1024; // avatar width
const avatarH = 1024; // avatar height

let isEyes = null;
let isNose = null;
let isMouth = null;

let colorIndex = 0;

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
  '/media/head/head-008.svg'
);

const colorSetA = [
  '#4088EE',
  '#33BB55',
  '#A3866A',
  '#FF3333',
  '#FFDD00',
  '#F8AA8F',
  '#B156C4',
  '#23D6C9',
  '#58423e',
  '#FF0088',
  '#ff8c00',
  '#c99789'
];

/**
 * add head to head canvas, remove previous head
 */
function addHead() {
  const colorSetACount = colorSetA.length;

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
    console.log('colorIndex: ' + colorIndex);
    const newColor = colorSetA[colorIndex];
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
  setThisToActiveClass('headElement', 'headElementActive');
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
    const canvas = document.getElementById('eyesCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, avatarW, avatarH);
    mergeCanvases();
    isEyes = null;
    this.event.target.setAttribute('class', 'eyesElement');
  } else {
    // draw eyes if there's no or different eyes
    img.onload = function() {
      const canvas = document.getElementById('eyesCanvas');
      const ctx = canvas.getContext('2d');
      ctx.mozImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, avatarW, avatarH);
      ctx.drawImage(img, 0, 0, avatarW, avatarH);
      mergeCanvases();
      isEyes = eyesFile;
    };
    setThisToActiveClass('eyesElement', 'eyesElementActive');
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
    const canvas = document.getElementById('noseCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, avatarW, avatarH);
    mergeCanvases();
    isNose = null;
    this.event.target.setAttribute('class', 'noseElement');
  } else {
    // draw nose if there's no or different nose
    img.onload = function() {
      const canvas = document.getElementById('noseCanvas');
      const ctx = canvas.getContext('2d');
      ctx.mozImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, avatarW, avatarH);
      ctx.drawImage(img, 0, 0, avatarW, avatarH);
      mergeCanvases();
      isNose = noseFile;
    };
    setThisToActiveClass('noseElement', 'noseElementActive');
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
    const canvas = document.getElementById('mouthCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, avatarW, avatarH);
    mergeCanvases();
    isMouth = null;
    this.event.target.setAttribute('class', 'mouthElement');
  } else {
    // draw mouth if there's no or different mouth
    img.onload = function() {
      const canvas = document.getElementById('mouthCanvas');
      const ctx = canvas.getContext('2d');
      ctx.mozImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, avatarW, avatarH);
      ctx.drawImage(img, 0, 0, avatarW, avatarH);
      mergeCanvases();
      isMouth = mouthFile;
    };
    setThisToActiveClass('mouthElement', 'mouthElementActive');
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
  download.setAttribute('href', imagestream);
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
