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
    XHR.onload = function() {
      if (XHR.status >= 200 && XHR.status < 300) {
        console.log('success!', XHR);
      } else {
        console.log('request failed!')
      }
    }
  }
