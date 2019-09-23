// Check contact form inputs for validity
window.onload = function() {
  var name = document.querySelector("#contact-name")
  name.addEventListener('input', function () {
    name.setCustomValidity('');
    name.checkValidity();
  });
  name.addEventListener('invalid', function() {
    name.setCustomValidity('Please enter your name.');
  })

  // Send form data
var form = document.getElementById("contact-form");
form.addEventListener("submit", function(evt) {
  evt.preventDefault();
  sendData(form)
})
}

function sendData(form) {
    var XHR = new XMLHttpRequest();
    var formData = new FormData(form);
 
    // Request - Endpoint needs to be set up
    XHR.open("POST", "http://localhost:8888/contact-us.html", true);
    
    // Send data
    XHR.send(formData)
    loadingAnimation()
    XHR.onload = function() {
      if (XHR.status >= 200 && XHR.status < 300) {
        successResponse()
      } else {
        errorResponse()
      }
    }
  }

function loadingAnimation() {
  var loader = document.querySelector("#loading-gif")
  loader.classList.remove("hidden")
}

function successResponse() {
  var elem = document.querySelector("#contact-response-success");
  var loader = document.querySelector("#loading-gif")
  clearInputs();
  elem.className = "contact-success";
  loader.className = "hidden";
}

function errorResponse() {
  var elem = document.querySelector("#contact-response-error");
  var loader = document.querySelector("#loading-gif")
  clearInputs();
  elem.className = "contact-error";
  loader.className = "hidden";
}

function clearInputs() {
  var allInputs = [];
  allInputs.push(document.getElementById("contact-name"), document.getElementById("contact-email"), document.getElementById("contact-job"), document.getElementById("contact-location"), document.getElementById("contact-company"))
  for (var i = 0; i < allInputs.length; i++) {
    allInputs[i].value = ""
  }
}