// Check contact form inputs for validity
window.onload = function() {
  var name = document.querySelector("#contact-name")
  name.addEventListener('input',() => {
    name.setCustomValidity('');
    name.checkValidity();
  });
  name.addEventListener('invalid', () => {
    name.setCustomValidity('Please enter your name.');
  })

  // Send form data
var form = document.querySelector("#contact-form");
form.addEventListener("submit", function(evt) {
  evt.preventDefault();
  sendData(form)
})
}





function sendData(form) {
    var XHR = new XMLHttpRequest();
    var formData = new FormData(form);
    console.log('formData', formData)
    if (XHR.status >= 200 && XHR.status < 300) {
      console.log('success!', xhr);
    } else {
      console.log('request failed!')
    }

      // Request - Endpoint needs to be set up
      XHR.open("POST", "https://jsonplacehoder.typicode.com/posts", true);

      // Send data
      XHR.send(formData)

    return false
  }

// function sendData() {
 
  
  
   // define what happens on successful data submission - add success response to dom
  // XHR.addEventListener("load", function(evt) {
  //   alert(evt.target.responseText);
  // });

  // // Define what happens in case of error
  // XHR.addEventListener("error", function(evt) {
  //   alert('Ooops! Something went wrong');
  // });

  

 
// }

