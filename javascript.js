/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
  document.getElementById("main").style.marginLeft = "300px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
}

/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}

function drawText() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d");
  var text = document.getElementById("inputText").value;

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.font = "30px Arial"; // Set the font
  ctx.fillStyle = "black"; // Set the text color
  ctx.textAlign = "center"; // Center the text
  ctx.fillText(text, canvas.width / 2, canvas.height / 2); // Draw the text
}
