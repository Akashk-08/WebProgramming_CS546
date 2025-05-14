// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
// /public/js/form_validate.js

(function () {
  const signupForm = document.getElementById("signup-form");
  const signinForm = document.getElementById("signin-form");

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      const firstName = document.getElementById("firstName");
      const lastName = document.getElementById("lastName");
      const userId = document.getElementById("userId");
      const password = document.getElementById("password");
      const confirmPassword = document.getElementById("confirmPassword");
      const favoriteQuote = document.getElementById("favoriteQuote");
      const backgroundColor = document.getElementById("backgroundColor");
      const fontColor = document.getElementById("fontColor");
      const role = document.getElementById("role");

      if (
        !firstName.value.trim() ||
        firstName.value.trim().length < 2 ||
        firstName.value.trim().length > 20 ||
        !/^[A-Za-z]+$/.test(firstName.value.trim())
      ) {
        e.preventDefault();
        alert("Invalid first name.");
        return;
      }

      if (
        !lastName.value.trim() ||
        lastName.value.trim().length < 2 ||
        lastName.value.trim().length > 20 ||
        !/^[A-Za-z]+$/.test(lastName.value.trim())
      ) {
        e.preventDefault();
        alert("Invalid last name.");
        return;
      }

      if (
        !userId.value.trim() ||
        userId.value.trim().length < 5 ||
        userId.value.trim().length > 10 ||
        !/^[A-Za-z0-9]+$/.test(userId.value.trim())
      ) {
        e.preventDefault();
        alert("Invalid userId.");
        return;
      }

      if (
        !password.value ||
        password.value.length < 8 ||
        /\s/.test(password.value) ||
        !/[A-Z]/.test(password.value) ||
        !/\d/.test(password.value) ||
        !/[^A-Za-z0-9]/.test(password.value)
      ) {
        e.preventDefault();
        alert("Invalid password.");
        return;
      }

      if (password.value !== confirmPassword.value) {
        e.preventDefault();
        alert("Passwords do not match.");
        return;
      }

      if (
        !favoriteQuote.value.trim() ||
        favoriteQuote.value.trim().length < 20 ||
        favoriteQuote.value.trim().length > 255
      ) {
        e.preventDefault();
        alert("Invalid favorite quote.");
        return;
      }

      if (!/^#[A-Fa-f0-9]{6}$/.test(backgroundColor.value)) {
        e.preventDefault();
        alert("Invalid background color.");
        return;
      }

      if (!/^#[A-Fa-f0-9]{6}$/.test(fontColor.value)) {
        e.preventDefault();
        alert("Invalid font color.");
        return;
      }

      if (backgroundColor.value === fontColor.value) {
        e.preventDefault();
        alert("Background and font colors cannot be the same.");
        return;
      }

      if (role.value !== "user" && role.value !== "superuser") {
        e.preventDefault();
        alert("Invalid role selection.");
        return;
      }
    });
  }

  if (signinForm) {
    signinForm.addEventListener("submit", (e) => {
      const userId = document.getElementById("userId");
      const password = document.getElementById("password");

      if (
        !userId.value.trim() ||
        userId.value.trim().length < 5 ||
        userId.value.trim().length > 10 ||
        !/^[A-Za-z0-9]+$/.test(userId.value.trim())
      ) {
        e.preventDefault();
        alert("Invalid userId.");
        return;
      }

      if (
        !password.value ||
        password.value.length < 8 ||
        /\s/.test(password.value) ||
        !/[A-Z]/.test(password.value) ||
        !/\d/.test(password.value) ||
        !/[^A-Za-z0-9]/.test(password.value)
      ) {
        e.preventDefault();
        alert("Invalid password.");
        return;
      }
    });
  }
})();
