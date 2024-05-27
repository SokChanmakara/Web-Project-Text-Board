/* Set the width of the side navigation to 300px */
function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("main").style.marginLeft = "300px";
  // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  // document.body.style.backgroundColor = "white";
}

/* Toggle dropdown content visibility */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}

// Below code is to take input from textField and display in canvas
let xPos;
let animationId;
let text = "";

// Function to start the animation
function startAnimation() {
  text = document.getElementById("textInput").value;
  if (!animationId) {
      xPos = document.getElementById("textCanvas").width;
      animateText();
  }
}

// Function to animate the text
function animateText() {
  const canvas = document.getElementById("textCanvas");
  const context = canvas.getContext("2d");

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Set the properties
  context.font = "30px Arial";
  context.fillStyle = "black";
  context.textAlign = "left";

  // Draw the text at the current position
  context.fillText(text, xPos, canvas.height / 2);

  // Update the position
  xPos -= 2;

  // Reset position if the text has moved off the left edge
  if (xPos + context.measureText(text).width < 0) {
      xPos = canvas.width;
  }

  // Request the next animation frame
  animationId = requestAnimationFrame(animateText);
}

// Add the fullscreen functionality to the canvas element
function openFullscreen() {
  const elem = document.getElementById("textCanvas");
  if (elem.requestFullscreen) {
      elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
  }
}

// Event listener for fullscreen change
document.getElementById("textCanvas").addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
      cancelAnimationFrame(animationId);
      animationId = null;
  } else {
      startAnimation();
  }
});

// Ensure input starts animation
document.getElementById("textInput").addEventListener("input", startAnimation);
