// check contact form inputs for validity

window.onload = function() {
var name = document.querySelector("#contact-name")
    name.addEventListener('input',() => {
      name.setCustomValidity('');
      name.checkValidity();
    });
    name.addEventListener('invalid', () => {
      name.setCustomValidity('Please enter your name.');
    })
}


// Add contact form message success/error to dom after server response