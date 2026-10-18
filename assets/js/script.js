/**
 * DevSutra - Interactive Features & Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize features
  initThemeToggle();
  initSearchShortcut();
  initLiveSearch();
  initGlossaryPills();
  initHeaderScrollEffect();
});

/* ==========================================================================
   1. LIGHT / DARK THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  if (!themeToggleBtn) return;

  // SVG icons for Theme Button
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

  // Check saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('devsutra-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.innerHTML = sunIcon;
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleBtn.innerHTML = moonIcon;
  }

  // Toggle Theme Event
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
   2. KEYBOARD SHORTCUT (Ctrl + K / Cmd + K) TO FOCUS SEARCH
   ========================================================================== */
function initSearchShortcut() {
  const searchInput = document.getElementById('site-search');
  if (!searchInput) return;

  document.addEventListener('keydown', (e) => {
    // Check for Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault(); // Prevent default browser search focus if any
      searchInput.focus();
      searchInput.select();
    }

    // Press Escape to blur search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.blur();
    }
  });
}

/* ==========================================================================
   3. LIVE SEARCH FILTERING (Roadmaps & Glossary Terms)
   ========================================================================== */
function initLiveSearch() {
  const searchInput = document.getElementById('site-search');
  const roadmapCards = document.querySelectorAll('.roadmap-card');
  const glossaryPills = document.querySelectorAll('.pill');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();

    // Filter Roadmap Cards
    roadmapCards.forEach((card) => {
      const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
      const text = card.querySelector('.card-text')?.textContent.toLowerCase() || '';

      if (title.includes(query) || text.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    // Highlight / Filter Glossary Pills
    glossaryPills.forEach((pill) => {
      const term = pill.textContent.toLowerCase();
      if (query && term.includes(query)) {
        pill.style.background = 'var(--accent)';
        pill.style.color = '#ffffff';
      } else {
        pill.style.background = '';
        pill.style.color = '';
      }
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE GLOSSARY PILLS
   ========================================================================== */
function initGlossaryPills() {
  const pills = document.querySelectorAll('.pill');
  const searchInput = document.getElementById('site-search');

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const term = pill.textContent.trim();
      if (searchInput) {
        searchInput.value = term;
        // Trigger live search event
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      }
    });
  });
}

/* ==========================================================================
   5. HEADER SCROLL SHADOW EFFECT
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