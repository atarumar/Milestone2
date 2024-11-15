const password = document.getElementById("password");
const box = document.querySelector(".bg-white");
const strengthText = document.createElement("p"); // Create a new element for password strength message
strengthText.style.marginTop = "10px";
box.appendChild(strengthText); // Add the text element to the box

password.addEventListener("input", (e) => {
  const input = e.target.value;
  const strength = checkPasswordStrength(input);

  // Set color and text based on strength
  if (strength === "very weak") {
    box.style.backgroundColor = "#ff4b4b"; // Red for very weak
    strengthText.innerText = "Very Weak";
  } else if (strength === "weak") {
    box.style.backgroundColor = "#ff7f7f"; // Lighter Red for weak
    strengthText.innerText = "Weak";
  } else if (strength === "medium") {
    box.style.backgroundColor = "#ffcc00"; // Yellow for medium
    strengthText.innerText = "Medium";
  } else if (strength === "strong") {
    box.style.backgroundColor = "#32cd32"; // Green for strong
    strengthText.innerText = "Strong";
  } else if (strength === "very strong") {
    box.style.backgroundColor = "#008000"; // Dark Green for very strong
    strengthText.innerText = "Very Strong";
    strengthText.style.color = "#008000";
  } else {
    box.style.backgroundColor = "#ffffff"; // White for no input
    strengthText.innerText = "";
  }
});

function checkPasswordStrength(password) {
  const strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");

  if (password.length < 4) {
    return "very weak";
  } else if (password.length < 6) {
    return "weak";
  } else if (password.length >= 6 && password.length < 8) {
    return "medium";
  } else if (password.length >= 8 && !strongPassword.test(password)) {
    return "strong"; 
  } else if (password.length >= 10 && strongPassword.test(password)) {
    return "very strong"; 
  }
}


