document.addEventListener("DOMContentLoaded", () => {
  // Toggle password visibility
  const togglePasswordButtons = document.querySelectorAll(".toggle-password");
  togglePasswordButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.previousElementSibling;
      const icon = this.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  });

  // Password strength meter
  const passwordInput = document.getElementById("password");
  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      updatePasswordStrength(this.value);
    });
  }

  // Form validation
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      if (!validateLoginForm()) {
        e.preventDefault();
      } else {
        // For demo purposes, prevent form submission and show success message
        e.preventDefault();
        window.addFlashMessage("success", "Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    });
  }

  // const signupForm = document.getElementById("signup-form");
  // if (signupForm) {
  //   signupForm.addEventListener("submit", (e) => {
  //     if (!validateSignupForm()) {
  //       e.preventDefault();
  //     } else {
  //       // For demo purposes, prevent form submission and show success message
  //       e.preventDefault();
  //       window.addFlashMessage(
  //         "success",
  //         "Account created successfully! Redirecting..."
  //       );
  //       setTimeout(() => {
  //         window.location.href = "/";
  //       }, 2000);
  //     }
  //   });
  // }

  // Social login buttons
  const socialButtons = document.querySelectorAll(".social-button");
  socialButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const provider = this.classList.contains("google") ? "Google" : "GitHub";
      window.addFlashMessage("info", `${provider} authentication coming soon!`);
    });
  });
});

// Password strength calculation
function updatePasswordStrength(password) {
  const strengthMeter = document.querySelector(".strength-meter");
  const strengthText = document.querySelector(".strength-text");
  const segments = strengthMeter.querySelectorAll(".strength-segment");

  if (!password) {
    segments.forEach((segment) => {
      segment.className = "strength-segment";
    });
    strengthText.textContent = "Password strength";
    return;
  }

  // Calculate password strength
  let strength = 0;

  // Length check
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;

  // Complexity checks
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  // Update UI based on strength
  let strengthClass = "";
  let strengthLabel = "";

  if (strength < 3) {
    strengthClass = "weak";
    strengthLabel = "Weak";
  } else if (strength < 5) {
    strengthClass = "medium";
    strengthLabel = "Medium";
  } else {
    strengthClass = "strong";
    strengthLabel = "Strong";
  }

  // Update segments
  const activeSegments = Math.min(Math.ceil(strength / 1.5), 4);

  segments.forEach((segment, index) => {
    segment.className = "strength-segment";
    if (index < activeSegments) {
      segment.classList.add(strengthClass);
    }
  });

  strengthText.textContent = `${strengthLabel} password`;
}

// Form validation functions
function validateLoginForm() {
  let isValid = true;

  // Email validation
  const email = document.getElementById("email");
  const emailError = document.getElementById("email-error");

  if (!email.value) {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    emailError.textContent = "Please enter a valid email address";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // Password validation
  const password = document.getElementById("password");
  const passwordError = document.getElementById("password-error");

  if (!password.value) {
    passwordError.textContent = "Password is required";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  return isValid;
}

function validateSignupForm() {
  let isValid = true;

  // First name validation
  const firstName = document.getElementById("firstName");
  const firstNameError = document.getElementById("firstName-error");

  if (!firstName.value) {
    firstNameError.textContent = "First name is required";
    isValid = false;
  } else {
    firstNameError.textContent = "";
  }

  // Last name validation
  const lastName = document.getElementById("lastName");
  const lastNameError = document.getElementById("lastName-error");

  if (!lastName.value) {
    lastNameError.textContent = "Last name is required";
    isValid = false;
  } else {
    lastNameError.textContent = "";
  }

  // Email validation
  const email = document.getElementById("email");
  const emailError = document.getElementById("email-error");

  if (!email.value) {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    emailError.textContent = "Please enter a valid email address";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // Password validation
  const password = document.getElementById("password");
  const passwordError = document.getElementById("password-error");

  if (!password.value) {
    passwordError.textContent = "Password is required";
    isValid = false;
  } else if (password.value.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  // Confirm password validation
  const confirmPassword = document.getElementById("confirmPassword");
  const confirmPasswordError = document.getElementById("confirmPassword-error");

  if (!confirmPassword.value) {
    confirmPasswordError.textContent = "Please confirm your password";
    isValid = false;
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordError.textContent = "Passwords do not match";
    isValid = false;
  } else {
    confirmPasswordError.textContent = "";
  }

  // Terms checkbox validation
  const terms = document.getElementById("terms");
  const termsError = document.getElementById("terms-error");

  if (!terms.checked) {
    termsError.textContent =
      "You must agree to the Terms of Service and Privacy Policy";
    isValid = false;
  } else {
    termsError.textContent = "";
  }

  return isValid;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
