const loginForm = document.forms[0];
const username = loginForm.elements["username"];
const password = loginForm.elements["password"];

console.log(username);
console.log(password);

loginForm.onsubmit = function(event) {
  //push as key value pair
  console.log (username, password);
}