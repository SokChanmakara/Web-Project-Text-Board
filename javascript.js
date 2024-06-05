const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight * 0.69;  

document.addEventListener("DOMContentLoaded", function () {
  const navButton = document.getElementById('nav-button');
  const sidebar = document.getElementById('sidebar');

  navButton.addEventListener('click', function () {
      sidebar.classList.toggle('show');
      navButton.classList.toggle('click');
  });

  document.querySelectorAll('.feat-btn').forEach(btn => {
      btn.addEventListener('click', function () {
          this.nextElementSibling.classList.toggle('show');
          this.querySelector('i').classList.toggle('rotate');
      });
  });

  document.querySelectorAll('#fontSelector a').forEach(function(fontLink) {
      fontLink.addEventListener('click', function(event) {
          event.preventDefault();
          var selectedFont = this.getAttribute('data-value');
          document.getElementById('textInput').style.fontFamily = selectedFont;
          updateCanvasFont(selectedFont);
      });
  });

  document.querySelectorAll('#sizeSelector a').forEach(function(sizeLink) {
      sizeLink.addEventListener('click', function(event) {
          event.preventDefault();
          var selectedSize = this.getAttribute('data-size');
          updateCanvasFontSize(selectedSize);
      });
  });

  document.querySelectorAll('#speedSelector a').forEach(function(speedLink) {
      speedLink.addEventListener('click', function(event) {
          event.preventDefault();
          var selectedSpeed = this.getAttribute('data-speed');
          updateCanvasSpeed(selectedSpeed);
      });
  });

  document.getElementById('backgroundColorPicker').addEventListener('input', function() {
      const canvas = document.getElementById("textCanvas");
      const color = this.value;
      canvas.style.backgroundColor = color;
  });

  document.getElementById('colorPicker').addEventListener('input', function() {
      let selectedColor = this.value;
      updateCanvasTextColor(selectedColor);
  });

  const backgroundImageButton = document.getElementById('backgroundImageButton');
  const backgroundImagePicker = document.getElementById('backgroundImagePicker');

  backgroundImageButton.addEventListener('click', function() {
      backgroundImagePicker.click();
  });

  backgroundImagePicker.addEventListener('change', function(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              const img = new Image();
              img.onload = function() {
                  setBackgroundAndAnimate(img);
              };
              img.src = e.target.result;
          };
          reader.readAsDataURL(file);
      }
  });

  document.getElementById("animationSelector").addEventListener('click', (event)=>{
    if(event.target.tagName === 'A'){
        currentAnimation = event.target.getAttribute("data-animation");
        startAnimation();
    }
  })

});


let xPos;
let animationId;
let text = "";
let textSize = 100;
let textColor = "black";
let textSpeed = 1;
let currentFont = "Arial";
let backgroundImage = null;
let currentAnimation = 'default';

function adjustCanvasResolution(canvas) {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  const context = canvas.getContext('2d');
  context.scale(ratio, ratio);
}

//function update
function updateCanvasFont(font) {
    currentFont = font;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
        startAnimation();
    }
  }
  
  function openFullscreen() {
    const elem = document.getElementById("textCanvas");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
  }
  
  function updateCanvasFontSize(size) {
    textSize = size;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
        startAnimation();
    }
  }
  
  function updateCanvasSpeed(speed) {
    textSpeed = speed;
    if (animationId = requestAnimationFrame(animateText)) {
        animationId = null;
        startAnimation();
    }else if(animationId = requestAnimationFrame(animateBounceText)){
        animationId = null;
        animateBounceText();
    }else if (animationId = requestAnimationFrame(animateWaveText)){
        animationId = null;
        animateWaveText();
    }
  }
  
  function updateCanvasTextColor(color) {
    textColor = color;
    if (animationId) {
        startAnimation();
    }
  }
  
  function filterFunction() {
    const searchInput = document.getElementById("myInput");
    const filter = searchInput.value.toUpperCase();
    const myDropdown = document.getElementById("fontSelector");
    const a = myDropdown.getElementsByTagName("a");
  
    for (let i = 0; i < a.length; i++) {
        const txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
  }
  

//set background

function setBackgroundAndAnimate(img) {
  backgroundImage = img;
  if (animationId) {
      cancelAnimationFrame(animationId);
  }
  startAnimation();
}
//draw background
function drawBackground(context, canvas) {
  if (backgroundImage) {
      context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  }
}

function startAnimation() {
    text = document.getElementById("textInput").value;
    cancelAnimationFrame(animationId);
    xPos = document.getElementById("textCanvas").width;
    if(currentAnimation === 'default'){
        animateText();
    }else if(currentAnimation === 'bounce'){
        animateBounceText();
    }else if(currentAnimation === 'wave'){
        animateWaveText();
    }else if(currentAnimation === 'neon'){
        animateNeonText();
    }else if(currentAnimation === 'fade'){
        animateFadeText();
    }
  }
  
function animateText() {
  const canvas = document.getElementById("textCanvas");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(context, canvas);
  context.font = `${textSize}px ${currentFont}`;
  context.fillStyle = textColor;
  context.textAlign = "left";
  context.fillText(text, xPos, canvas.height / 2 / (window.devicePixelRatio || 1));
  xPos -= textSpeed;
  if (xPos + context.measureText(text).width < 0) {
      xPos = canvas.width / (window.devicePixelRatio || 1);
  }
  animationId = requestAnimationFrame(animateText);
}


function animateBounceText() {
  const canvas = document.getElementById("textCanvas");
  const context = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();

  let x = rect.width / 2;
  let y = rect.height / 2;
  let dx = textSpeed;
  let dy = textSpeed;

  function drawText() {
      context.clearRect(0, 0, rect.width, rect.height);
      drawBackground(context, canvas);
      context.font = `${textSize}px ${currentFont}`;
      context.fillStyle = textColor;
      context.textAlign = "center";
      context.fillText(text, x, y);

      if (x + context.measureText(text).width / 2 > rect.width || x - context.measureText(text).width / 2 < 0) {
          dx = -dx;
      }
      if (y + textSize/2 > rect.height || y - textSize < 0) {
          dy = -dy;
      }

      x += dx*textSpeed;
      y += dy*textSpeed;

      animationId = requestAnimationFrame(drawText);
  }

  drawText();
}

function animateWaveText() {
  const canvas = document.getElementById("textCanvas");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground(context, canvas);
  context.font = `${textSize}px ${currentFont}`;
  context.fillStyle = textColor;
  context.textAlign = "left";

  const waveOffset = Math.sin(Date.now() / 100) * (canvas.height / 4);

  context.fillText(
      text,
      xPos,
      canvas.height / 2 / (window.devicePixelRatio || 1) + waveOffset
  );

  xPos -= textSpeed;
  if (xPos + context.measureText(text).width < 0) {
      xPos = canvas.width / (window.devicePixelRatio || 1);
  }

  animationId = requestAnimationFrame(animateWaveText);
}
function animateNeonText() {
  const canvas = document.getElementById("textCanvas");
  const context = canvas.getContext("2d");
  drawBackground(context, canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = `${textSize}px ${currentFont}`;

  // Create a gradient for neon effect with multiple colors
  const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0", "blue");
  gradient.addColorStop("0.3", "lime");
  gradient.addColorStop("0.5", "magenta");
  gradient.addColorStop("0.7", "orange");
  gradient.addColorStop("1.0", "purple");

  // Apply the gradient as the fill style
  context.fillStyle = gradient;
  context.textAlign = "left";

  context.fillText(text, xPos, canvas.height / 2 / (window.devicePixelRatio || 1));

  xPos -= textSpeed;
  if (xPos + context.measureText(text).width < 0) {
    xPos = canvas.width / (window.devicePixelRatio || 1);
  }

  animationId = requestAnimationFrame(animateNeonText);
}

function animateFadeText() {
  const canvas = document.getElementById("textCanvas");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = `${textSize}px ${currentFont}`;
  context.fillStyle = textColor;
  context.textAlign = "left";

  const opacity = Math.abs(Math.sin(Date.now() * 0.001));

  context.globalAlpha = opacity;
  context.fillText(text, xPos, canvas.height / 2 / (window.devicePixelRatio || 1));
  context.globalAlpha = 1;

  xPos -= textSpeed;
  if (xPos + context.measureText(text).width < 0) {
    xPos = canvas.width / (window.devicePixelRatio || 1);
  }

  animationId = requestAnimationFrame(animateFadeText);
}

function animateFadeText() {
    const canvas = document.getElementById("textCanvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${textSize}px ${currentFont}`;
    context.fillStyle = textColor;
    context.textAlign = "left";
  
    const opacity = Math.abs(Math.sin(Date.now() * 0.001));
  
    context.globalAlpha = opacity;
    context.fillText(text, xPos, canvas.height / 2 / (window.devicePixelRatio || 1));
    context.globalAlpha = 1;
  
    xPos -= textSpeed;
    if (xPos + context.measureText(text).width < 0) {
      xPos = canvas.width / (window.devicePixelRatio || 1);
    }
  
    animationId = requestAnimationFrame(animateFadeText);
  }
