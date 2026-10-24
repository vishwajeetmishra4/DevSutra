/**
 * DevSutra - Dashboard Page Script (dashboard.js)
 * Handles session protection, dynamic username population, and logout functionality.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Guard check: Redirect to login if not authenticated
  const isAuthenticated = localStorage.getItem("devsutra-authenticated") === "true";
  if (!isAuthenticated) {
    window.location.href = "../pages/auth/login.html";
    return;
  }

  // 2. Populate User Name in Banner & Account Card
  const username = localStorage.getItem("devsutra-username") || "Developer";
  
  const dashboardUsername = document.getElementById("dashboardUsername");
  const profileNameDisplay = document.getElementById("profileNameDisplay");

  if (dashboardUsername) dashboardUsername.textContent = username;
  if (profileNameDisplay) profileNameDisplay.textContent = username;

  // 3. Handle Dashboard Logout Button
  const dashboardLogoutBtn = document.getElementById("dashboardLogoutBtn");
  if (dashboardLogoutBtn) {
    dashboardLogoutBtn.addEventListener("click", () => {
      localStorage.removeItem("devsutra-authenticated");
      localStorage.removeItem("devsutra-username");
      window.location.href = "../../index.html";
    });
  }
});