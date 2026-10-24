/**
 * DevSutra - Interactive Features & Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSearchShortcut();
  initLiveSearch();
  initAccordions();
  initGlossaryInteractivity();
  initHeaderScrollEffect();
  initHeaderAuthStatus();
});

/* ==========================================================================
   1. LIGHT / DARK THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  if (!themeToggleBtn) return;

  const sunIcon = `
    <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>`;

  const moonIcon = `
    <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>`;

  const savedTheme = localStorage.getItem('devsutra-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.innerHTML = sunIcon;
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleBtn.innerHTML = moonIcon;
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = 'light';

    if (currentTheme === 'light') {
      targetTheme = 'dark';
      themeToggleBtn.innerHTML = sunIcon;
    } else {
      themeToggleBtn.innerHTML = moonIcon;
    }

    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('devsutra-theme', targetTheme);
  });
}

/* ==========================================================================
   2. KEYBOARD SHORTCUT (Ctrl + K) TO FOCUS SEARCH
   ========================================================================== */
function initSearchShortcut() {
  const searchInput = document.getElementById('site-search');
  if (!searchInput) return;

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }

    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.blur();
    }
  });
}

/* ==========================================================================
   3. LIVE SEARCH FILTERING (Roadmap Cards)
   ========================================================================== */
function initLiveSearch() {
  const searchInput = document.getElementById('site-search');
  const roadmapCards = document.querySelectorAll('.roadmap-card');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();

    roadmapCards.forEach((card) => {
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const text = card.querySelector('.card-text')?.textContent.toLowerCase() || '';

      if (title.includes(query) || text.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   4. INTERVIEW PREP ACCORDIONS
   ========================================================================== */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const accordionItem = header.parentElement;
      const isActive = accordionItem.classList.contains('active');

      // Close other accordions in the group if desired (optional accordion behavior)
      const group = accordionItem.closest('.accordion-group');
      if (group) {
        group.querySelectorAll('.accordion-item').forEach((item) => {
          item.classList.remove('active');
        });
      }

      // Toggle current
      if (!isActive) {
        accordionItem.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE GLOSSARY PILLS & DEFINITIONS
   ========================================================================== */
function initGlossaryInteractivity() {
  const pills = document.querySelectorAll('.pill');
  const termTitle = document.getElementById('termTitle');
  const termDesc = document.getElementById('termDesc');

  // Dictionary mock data for pills
  const glossaryData = {
    "idempotency": {
      title: "Idempotency",
      desc: "An operation is idempotent if executing it multiple times produces the exact same result as executing it once. Essential for safe API design (e.g., HTTP PUT/DELETE requests)."
    },
    "cap theorem": {
      title: "CAP Theorem",
      desc: "States that a distributed data store can simultaneously provide at most two of the following three guarantees: Consistency, Availability, and Partition tolerance."
    },
    "cors": {
      title: "CORS (Cross-Origin Resource Sharing)",
      desc: "An HTTP-header based mechanism that allows a server to indicate any origins other than its own from which a browser should permit loading resources."
    },
    "rate limiting": {
      title: "Rate Limiting",
      desc: "A strategy used to control the amount of incoming traffic to a service, preventing server overload, DDoS attacks, and ensuring fair usage."
    },
    "sharding": {
      title: "Sharding",
      desc: "A database architecture pattern that splits large databases into smaller, faster, more easily managed pieces called data shards across multiple servers."
    },
    "load balancing": {
      title: "Load Balancing",
      desc: "Efficiently distributing incoming network traffic across a backend cluster of servers to guarantee high availability and reliability."
    }
  };

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      // Remove active class from all pills
      pills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const key = pill.textContent.trim().toLowerCase();
      if (glossaryData[key] && termTitle && termDesc) {
        termTitle.textContent = glossaryData[key].title;
        termDesc.textContent = glossaryData[key].desc;
      }
    });
  });
}

/* ==========================================================================
   6. HEADER SCROLL SHADOW EFFECT
   ========================================================================== */
function initHeaderScrollEffect() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
      header.style.padding = '0.75rem 0';
    } else {
      header.style.boxShadow = '';
      header.style.padding = '1rem 0';
    }
  });
}

// ==========================================================================
// Explore More Roles Handler (Loads 6 cards per click)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const exploreBtn = document.getElementById("explore-more-roles-btn");
  const noMoreMsg = document.getElementById("no-more-roles-msg");

  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      // Find all hidden role cards
      const hiddenCards = document.querySelectorAll("#role-cards-grid .roadmap-card.hidden-card");
      
      // Reveal up to 6 cards per click
      const batchSize = 6;
      let count = 0;

      hiddenCards.forEach((card) => {
        if (count < batchSize) {
          card.classList.remove("hidden-card");
          card.classList.add("fade-in"); // Apply subtle entrance animation
          count++;
        }
      });

      // Check remaining hidden cards after reveal
      const remainingHidden = document.querySelectorAll("#role-cards-grid .roadmap-card.hidden-card");

      // If no more hidden cards exist, replace button with end message
      if (remainingHidden.length === 0) {
        exploreBtn.style.display = "none";
        if (noMoreMsg) {
          noMoreMsg.classList.remove("hidden-card");
        }
      }
    });
  }
});


// ==========================================================================
// Explore More Handlers (Loads 6 cards per click for Roles & Skills)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  
  // Generic function to initialize explore buttons
  function setupExploreMore(buttonId, msgId, gridId) {
    const exploreBtn = document.getElementById(buttonId);
    const noMoreMsg = document.getElementById(msgId);

    if (exploreBtn) {
      exploreBtn.addEventListener("click", () => {
        // Find all hidden cards in the target grid
        const hiddenCards = document.querySelectorAll(`#${gridId} .roadmap-card.hidden-card`);
        
        // Reveal up to 6 cards per click
        const batchSize = 6;
        let count = 0;

        hiddenCards.forEach((card) => {
          if (count < batchSize) {
            card.classList.remove("hidden-card");
            card.classList.add("fade-in"); // Apply subtle entrance animation
            count++;
          }
        });

        // Check remaining hidden cards in target grid
        const remainingHidden = document.querySelectorAll(`#${gridId} .roadmap-card.hidden-card`);

        // If no more hidden cards exist, hide button and show completion message
        if (remainingHidden.length === 0) {
          exploreBtn.style.display = "none";
          if (noMoreMsg) {
            noMoreMsg.classList.remove("hidden-card");
          }
        }
      });
    }
  }

  // Initialize both Role-Based and Skill-Based sections
  setupExploreMore("explore-more-roles-btn", "no-more-roles-msg", "role-cards-grid");
  setupExploreMore("explore-more-skills-btn", "no-more-skills-msg", "skill-cards-grid");
  
});

/* ==========================================================================
   HEADER AUTHENTICATION STATUS & PROFILE BADGE
   ========================================================================== */
function initHeaderAuthStatus() {
  const headerAuth = document.querySelector('.header-auth');
  if (!headerAuth) return;

  const isAuthenticated = localStorage.getItem('devsutra-authenticated') === 'true';
  const username = localStorage.getItem('devsutra-username') || 'Developer';
  const isDashboardPage = window.location.pathname.includes('dashboard.html');

  if (isAuthenticated) {
    if (isDashboardPage) {
      // ON DASHBOARD: Show ONLY the Log Out button in the header
      headerAuth.innerHTML = `
        <button id="logoutBtn" class="btn btn-outline btn-auth" title="Log Out" aria-label="Log Out">
          Log Out
        </button>
      `;
    } else {
      // ON OTHER PAGES: Show full profile badge linked to Dashboard
      headerAuth.innerHTML = `
        <div class="user-profile-badge">
          <a href="../user/dashboard.html" class="user-badge-link" title="Go to Dashboard">
            <div class="user-avatar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <span class="user-name">${username}</span>
          </a>
          <button id="logoutBtn" class="logout-btn" title="Log Out" aria-label="Log Out">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      `;
    }

    // Handle Logout action
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('devsutra-authenticated');
        localStorage.removeItem('devsutra-username');
        window.location.href = "../../index.html"; // Redirect home on logout
      });
    }
  }
}
