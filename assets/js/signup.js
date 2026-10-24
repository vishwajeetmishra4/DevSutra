/**
 * DevSutra - Sign Up Page Interactivity & Input Validation
 * Validates Email or Phone Number and handles OTP Verification step
 */

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const contactInput = document.getElementById("contactInput");
  const passwordInput = document.getElementById("password");
  const termsCheckbox = document.getElementById("terms");

  const signupStep1 = document.getElementById("signupStep1");
  const signupStep2 = document.getElementById("signupStep2");
  const userTargetDisplay = document.getElementById("userTargetDisplay");
  const backToStep1 = document.getElementById("backToStep1");

  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");

  // Regex Patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  // 1. Real-time Password Strength Check
  passwordInput.addEventListener("input", () => {
    const val = passwordInput.value;
    let score = 0;

    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    if (val.length === 0) {
      strengthBar.style.width = "0%";
      strengthText.textContent = "Password must be at least 8 characters";
    } else if (score <= 1) {
      strengthBar.style.width = "25%";
      strengthBar.style.backgroundColor = "#ef4444";
      strengthText.textContent = "Weak password";
    } else if (score === 2 || score === 3) {
      strengthBar.style.width = "65%";
      strengthBar.style.backgroundColor = "#eab308";
      strengthText.textContent = "Medium strength";
    } else {
      strengthBar.style.width = "100%";
      strengthBar.style.backgroundColor = "#22c55e";
      strengthText.textContent = "Strong password";
    }
  });

  // 2. Validate Contact Input (Email OR Phone)
  function validateContact(value) {
    const cleanValue = value.trim();
    if (emailRegex.test(cleanValue)) {
      return { valid: true, type: "email", value: cleanValue };
    }
    if (phoneRegex.test(cleanValue)) {
      return { valid: true, type: "phone", value: cleanValue };
    }
    return { valid: false };
  }

  // 3. Step 1 Submit Handler
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const nameVal = document.getElementById("fullName").value.trim();
    const contactVal = contactInput.value.trim();
    const passVal = passwordInput.value;

    // Reset error messages
    document.querySelectorAll(".field-error").forEach((el) => (el.textContent = ""));
    document.querySelectorAll(".form-input").forEach((el) => el.classList.remove("invalid"));

    // Name Validation
    if (!nameVal) {
      document.getElementById("nameError").textContent = "Please enter your full name.";
      document.getElementById("fullName").classList.add("invalid");
      isValid = false;
    }

    // Email/Phone Validation
    const contactCheck = validateContact(contactVal);
    if (!contactCheck.valid) {
      document.getElementById("contactError").textContent = "Please enter a valid email address or phone number.";
      contactInput.classList.add("invalid");
      isValid = false;
    }

    // Password Validation
    if (passVal.length < 8) {
      document.getElementById("passwordError").textContent = "Password must be at least 8 characters long.";
      passwordInput.classList.add("invalid");
      isValid = false;
    }

    // Terms Validation
    if (!termsCheckbox.checked) {
      document.getElementById("termsError").textContent = "You must accept the terms to continue.";
      isValid = false;
    }

    //Originally, the code below was commented out, but now it's active to allow progression to OTP verification if inputs are valid.
    // if (isValid) {
    //   // Proceed to Step 2 OTP Verification
    //   userTargetDisplay.textContent = contactCheck.value;
    //   signupStep1.classList.add("hidden-step");
    //   signupStep2.classList.remove("hidden-step");
      
    //   // Focus first OTP field
    //   document.querySelector(".otp-input").focus();
    // }


    //Testing: For local testing, we can simulate the OTP verification step even if the inputs are valid. This is useful for development purposes to avoid waiting for actual OTP delivery.
    if (isValid) {
      // Proceed to Step 2 OTP Verification
      userTargetDisplay.textContent = contactCheck.value;
      signupStep1.classList.add("hidden-step");
      signupStep2.classList.remove("hidden-step");
      
      // FOR LOCAL TESTING: Log the test code to console or show a notice
      console.log("DEV NOTE: Your verification code is 1234");
      alert("Dev Simulation: Your verification code is 1234");

      // Focus first OTP field
      document.querySelector(".otp-input").focus();
    }


  });

  // 4. Step 2 OTP Field Auto-Focus & Navigation
  const otpInputs = document.querySelectorAll(".otp-input");
  
  otpInputs.forEach((input, idx) => {
    input.addEventListener("input", (e) => {
      if (e.target.value.length === 1 && idx < otpInputs.length - 1) {
        otpInputs[idx + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !e.target.value && idx > 0) {
        otpInputs[idx - 1].focus();
      }
    });
  });

  // 5. Verify OTP Button Handler
//   document.getElementById("verifyOtpBtn").addEventListener("click", () => {
//     let otpCode = "";
//     otpInputs.forEach((input) => (otpCode += input.value));

//     const otpError = document.getElementById("otpError");

//     if (otpCode.length < 4) {
//       otpError.textContent = "Please enter the full 4-digit code.";
//       return;
//     }

//     // Simulate OTP Verification Success
//     otpError.textContent = "";
//     const verifyBtn = document.getElementById("verifyOtpBtn");
//     verifyBtn.disabled = true;
//     verifyBtn.textContent = "Creating Account...";

//     setTimeout(() => {
//       // Save simulation flag & redirect to home/dashboard
//       localStorage.setItem("devsutra-authenticated", "true");
//       window.location.href = "index.html";
//     }, 1200);
//   });

  // Back Button Link
//   backToStep1.addEventListener("click", (e) => {
//     e.preventDefault();
//     signupStep2.classList.add("hidden-step");
//     signupStep1.classList.remove("hidden-step");
//   });




// =================================================
// Testing 
// ================================================

document.getElementById("verifyOtpBtn").addEventListener("click", () => {
    let otpCode = "";
    otpInputs.forEach((input) => (otpCode += input.value));

    const otpError = document.getElementById("otpError");

    // Accept "1234" as the correct test code during development
    if (otpCode !== "1234") {
      otpError.textContent = "Invalid code. (Hint: use 1234 for testing)";
      return;
    }

    // Success state
    otpError.textContent = "";
    const verifyBtn = document.getElementById("verifyOtpBtn");
    verifyBtn.disabled = true;
    verifyBtn.textContent = "Creating Account...";

    setTimeout(() => {
      localStorage.setItem("devsutra-authenticated", "true");
      window.location.href = "index.html";
    }, 1200);
  });


});