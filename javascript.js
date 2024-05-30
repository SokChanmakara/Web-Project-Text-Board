document.addEventListener("DOMContentLoaded", function () {
  const navButton = document.getElementById('nav-button');
  const sidebar = document.getElementById('sidebar');
  
  navButton.addEventListener('click', function () {
      sidebar.classList.toggle('show');
      navButton.classList.toggle('click');
  });

  document.querySelectorAll('.feat-btn, .serv-btn').forEach(btn => {
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
  document.getElementById('colorPicker').addEventListener('input', function () {
    var selectedColor = this.value;
    updateCanvasTextColor(selectedColor);
  });
});

/* Declare variable in global scope */
let xPos;
let animationId;
let text = "";
let textSize = 100;
let textColor ="black";
let textSpeed = 1;
let currentFont = "Arial"; // Default font

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

function startAnimation() {
  const canvas = document.getElementById("textCanvas");
  adjustCanvasResolution(canvas);
  text = document.getElementById("textInput").value;
  if (!animationId) {
      xPos = canvas.width / (window.devicePixelRatio || 1); 
      animateText();
  }
}

function animateText() {
  const canvas = document.getElementById("textCanvas");
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
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

// document.getElementById("textCanvas").addEventListener("fullscreenchange", () => {
//   if (!document.fullscreenElement) {
//       cancelAnimationFrame(animationId);
//       animationId = null;
//   } else {
//       startAnimation();
//   }
// });

// function to change size
document.querySelectorAll('#sizeSelector a').forEach(function(sizeLink){
  sizeLink.addEventListener('click', function(event){
    event.preventDefault();
    const selectedSize = this.getAttribute('data-size');
    updateCanvasFontSize(selectedSize);
  })
})

// update the canvas 
function updateCanvasFontSize(size){
  textSize = size;
  if(animationId){
    cancelAnimationFrame(animationId);
    animationId = null;
    startAnimation();
  }
}

// function to change speed
document.querySelectorAll('#speedSelector a').forEach(function(speedLink){
  speedLink.addEventListener('click',function(event){
    event.preventDefault();
    const selectedSpeed = this.getAttribute('data-speed');
    updateCanvasSpeed(selectedSpeed);
  })
})

// update the canvas to adapted with selected speed
function updateCanvasSpeed(speed){
  textSpeed = speed;
  if(animationId){
    animationId = null;
    startAnimation();
  }
}
function updateCanvasTextColor(color) {
  textColor = color; 
  if (animationId) {
      cancelAnimationFrame(animationId); 
      animationId = null;
      startAnimation();   
  }
}
// add background color picker function
document.getElementById('backgroundColorPicker').addEventListener('input',function(){
  const canvas = document.getElementById("textCanvas");
  const color = this.value;
  canvas.style.backgroundColor = color;
})

document.getElementById('colorPicker').addEventListener('input',function(){
  const tColor = this.value;
  updateCanvasTextColor(tColor);
})

function updateCanvasTextColor(color){
  textColor = color;
  if(animationId){
    startAnimation();
  }
}
