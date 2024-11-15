document.addEventListener("DOMContentLoaded", () => {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  const signUpForm = document.querySelector(".sign-up-container form");
  const signInForm = document.querySelector(".sign-in-container form");

  signUpForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      
      const name = signUpForm.querySelector("input[placeholder='Name']").value;
      const email = signUpForm.querySelector("input[placeholder='Email']").value;
      const password = signUpForm.querySelector("input[placeholder='Password']").value;

      try {
          const response = await fetch("/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, password }),
          });
          const data = await response.json();
          if (response.ok) {
              alert(data.message);
          } else {
              alert(data.message || "Registration failed");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
      }
  });

  signInForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      console.log("Lagi signin")

      const email = signInForm.querySelector("input[placeholder='Email']").value;
      const password = signInForm.querySelector("input[placeholder='Password']").value;

      try {
          const response = await fetch("/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (response.ok) {
              alert(data.message);
              window.location.href = "/"; // Redirect to dashboard on successful login
          } else {
              alert(data.message || "Login failed");
          }
      } catch (error) {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
      }
  });
});
