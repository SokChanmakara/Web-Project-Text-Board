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
  
});

let xPos;
let animationId;
let text = "";
let textSize = 100;
let textColor = "black";
let textSpeed = 1;
let currentFont = "Arial";

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
  if (animationId) {
      animationId = null;
      startAnimation();
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

//function bouncing text

var x = 100;
var y = 200;
var dx = 5;
var dy = 5;
window.onload = function(){
  c = document.getElementById("canvas");
  ctx = c.getContext("2d");
}
function animateBounceText(){
  ctx.clearRect(0,0, innerWidth*0.95, 450);
  ctx.font = `${textSize}px ${currentFont}`;
  ctx.fillStyle = textColor;
  ctx.fillText(text, x, y);
  textWidth = ctx.measureText(text).width;
  textHeight = textSize;

  if(x<textSize || x>innerWidth*0.95){
    dx = -dx;
  }
  if(y<textSize || y>450){
    dy = -dy;
  }
  animateBounceText();
  updateCanvasFontSize();
}
