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
});

/* The remaining code for the text animation and canvas functionality */
let xPos;
let animationId;
let text = "";
let textSize = 100;
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
  context.fillStyle = "black";
  context.textAlign = "left";
  context.fillText(text, xPos, canvas.height / 2 / (window.devicePixelRatio || 1));
  xPos -= 3;
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

document.getElementById("textCanvas").addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
      cancelAnimationFrame(animationId);
      animationId = null;
  } else {
      startAnimation();
  }
});

document.querySelectorAll('#sizeSelector a').forEach(function(sizeLink){
  sizeLink.addEventListener('click', function(event){
    event.preventDefault();
    const selectedSize = this.getAttribute('data-size');
    updateCanvasFontSize(selectedSize);
  })
})

function updateCanvasFontSize(size){
  textSize = size;
  if(animationId){
    cancelAnimationFrame(animationId);
    animationId = null;
    startAnimation();
  }
}