/**
 * DevSutra - Login Page Specific JavaScript (login.js)
 * Supports Email/Password, GitHub OAuth, and Google OAuth
 */

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const githubAuthBtn = document.getElementById("githubAuthBtn");
  const googleAuthBtn = document.getElementById("googleAuthBtn");

  // OAuth Config Placeholders (Replace with your OAuth provider details)
  const OAUTH_CONFIG = {
    github: {
      clientId: "YOUR_GITHUB_CLIENT_ID",
      redirectUri: window.location.origin + "/index.html",
      scope: "user:email"
    },
    google: {
      clientId: "YOUR_GOOGLE_CLIENT_ID",
      redirectUri: window.location.origin + "/index.html",
      scope: "email profile"
    }
  };

  // 1. Standard Email/Password Form Submission
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");
      const rememberInput = document.getElementById("remember");

      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const remember = rememberInput ? rememberInput.checked : false;

      if (!email || !password) {
        showAuthMessage("Please fill in both email and password.", "error");
        return;
      }

      // Simulate loading state
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      setButtonLoading(submitBtn, "Logging in...");

      // Simulate Authentication API Call
      setTimeout(() => {
        if (remember) {
          localStorage.setItem("devsutra-user-email", email);
        }
        
        console.log("Logged in with Email:", { email, remember });
        window.location.href = "index.html";
      }, 1000);
    });
  }

  // 2. GitHub Login Handler
  if (githubAuthBtn) {
    githubAuthBtn.addEventListener("click", () => {
      setButtonLoading(githubAuthBtn, "Connecting GitHub...");
      handleOAuthLogin("github");
    });
  }

  // 3. Google Login Handler
  if (googleAuthBtn) {
    googleAuthBtn.addEventListener("click", () => {
      setButtonLoading(googleAuthBtn, "Connecting Google...");
      handleOAuthLogin("google");
    });
  }

  /**
   * Triggers OAuth Login Flow
   * @param {'github' | 'google'} provider 
   */
  function handleOAuthLogin(provider) {
    if (provider === "github") {
      const githubUrl = `https://github.com/login/oauth/authorize?client_id=${OAUTH_CONFIG.github.clientId}&redirect_uri=${encodeURIComponent(OAUTH_CONFIG.github.redirectUri)}&scope=${OAUTH_CONFIG.github.scope}`;
      
      // Simulated redirect (Replace with window.location.href = githubUrl in production)
      console.log("Redirecting to GitHub OAuth:", githubUrl);
      simulateOAuthRedirect("GitHub");

    } else if (provider === "google") {
      const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${OAUTH_CONFIG.google.clientId}&redirect_uri=${encodeURIComponent(OAUTH_CONFIG.google.redirectUri)}&response_type=token&scope=${encodeURIComponent(OAUTH_CONFIG.google.scope)}`;
      
      // Simulated redirect (Replace with window.location.href = googleUrl in production)
      console.log("Redirecting to Google OAuth:", googleUrl);
      simulateOAuthRedirect("Google");
    }
  }

  /**
   * Helper to simulate login success during development
   */
  function simulateOAuthRedirect(providerName) {
    setTimeout(() => {
      localStorage.setItem("devsutra-auth-provider", providerName.toLowerCase());
      window.location.href = "index.html";
    }, 1200);
  }

  /**
   * Helper to show button loading state
   */
  function setButtonLoading(button, text) {
    if (!button) return;
    button.disabled = true;
    button.style.opacity = "0.75";
    button.textContent = text;
  }

  /**
   * Helper to display form error messages
   */
  function showAuthMessage(message, type = "error") {
    let msgBox = document.getElementById("auth-status-msg");
    if (!msgBox) {
      msgBox = document.createElement("div");
      msgBox.id = "auth-status-msg";
      msgBox.style.cssText = "padding: 0.75rem; margin-bottom: 1rem; border-radius: 8px; font-size: 0.85rem; text-align: center;";
      loginForm.prepend(msgBox);
    }

    if (type === "error") {
      msgBox.style.background = "rgba(239, 68, 68, 0.15)";
      msgBox.style.color = "#ef4444";
      msgBox.style.border = "1px solid rgba(239, 68, 68, 0.3)";
    } else {
      msgBox.style.background = "rgba(34, 197, 94, 0.15)";
      msgBox.style.color = "#22c55e";
      msgBox.style.border = "1px solid rgba(34, 197, 94, 0.3)";
    }

    msgBox.textContent = message;
  }
});