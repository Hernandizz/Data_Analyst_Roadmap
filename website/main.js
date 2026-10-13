/* ================================================================
   DataSchool — main.js
   Core interactivity: mobile drawer, search, scroll effects,
   intersection observer animations, and toast notifications.
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ===== HEADER SCROLL EFFECT =====
  const header = document.getElementById('main-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 10) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ===== MOBILE DRAWER =====
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const closeDrawer = document.getElementById('close-drawer');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawerFn() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawerFn);
  if (closeDrawer) closeDrawer.addEventListener('click', closeDrawerFn);

  // ===== KEYBOARD SHORTCUTS =====
  document.addEventListener('keydown', (e) => {
    // "/" to focus search
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
      const target = e.target;
      if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.focus();
      }
    }
    // Escape to close drawer
    if (e.key === 'Escape') {
      closeDrawerFn();
    }
  });

  // ===== THEME TOGGLE (DARK MODE) =====
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('dataschool_theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) {
      themeToggle.innerHTML = '<span class="material-symbols-outlined">light_mode</span>';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('dataschool_theme', newTheme);
      themeToggle.innerHTML = newTheme === 'dark' 
        ? '<span class="material-symbols-outlined">light_mode</span>'
        : '<span class="material-symbols-outlined">dark_mode</span>';
      if (typeof window.showToast === 'function') {
        window.showToast(newTheme === 'dark' ? 'Mode Gelap diaktifkan' : 'Mode Terang diaktifkan');
      }
    });
  }

  // ===== GLOBAL HEADER SEARCH =====
  const globalSearchInputs = document.querySelectorAll('.search-bar__input');
  globalSearchInputs.forEach(input => {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim();
        if (val) {
          window.location.href = `cheatsheets.html?q=${encodeURIComponent(val)}`;
        }
      }
    });
  });

  // ===== INTERSECTION OBSERVER FOR REVEAL ANIMATIONS (SAFE FALLBACK) =====
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // ===== ACTIVE NAV LINK =====
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ===== COPY CODE SNIPPET =====
  window.copySnippet = function(btn) {
    const code = btn.getAttribute('data-code');
    if (!code) return;

    navigator.clipboard.writeText(code).then(() => {
      showToast('Sintaks berhasil disalin ke clipboard!');
      const icon = btn.querySelector('.material-symbols-outlined');
      const originalIcon = icon ? icon.textContent : '';
      if (icon) icon.textContent = 'check';
      setTimeout(() => {
        if (icon) icon.textContent = originalIcon || 'content_copy';
      }, 2000);
    }).catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('Sintaks berhasil disalin!');
    });
  };

  // ===== TOAST NOTIFICATIONS =====
  window.showToast = function(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.className = 'toast';
      toast.innerHTML = `
        <span class="material-symbols-outlined">check_circle</span>
        <span id="toast-text"></span>
      `;
      document.body.appendChild(toast);
    }

    const toastText = toast.querySelector('#toast-text') || toast.querySelector('span:last-child');
    if (toastText) toastText.textContent = message;
    
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };

  // ===== DOWNLOAD ALERT =====
  window.triggerDownloadAlert = function(name) {
    showToast(`⬇️ Mengunduh "${name}"... (Demo — belum terhubung ke server)`);
  };

  // ===== CHEATSHEET SEARCH & FILTER =====
  const searchInput = document.getElementById('cheatsheet-search');
  const filterPills = document.querySelectorAll('.category-pill');
  const categorySections = document.querySelectorAll('.category-section');
  const snippetCards = document.querySelectorAll('.snippet-card');
  const noResults = document.getElementById('no-results-state');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  let activeFilter = 'all';

  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        activeFilter = pill.getAttribute('data-filter');
        filterPills.forEach(p => {
          p.classList.remove('bg-primary', 'text-on-primary');
          p.classList.add('bg-surface-container-high', 'text-on-surface');
        });
        pill.classList.remove('bg-surface-container-high', 'text-on-surface');
        pill.classList.add('bg-primary', 'text-on-primary');
        applyFilters();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      if (clearSearchBtn) {
        clearSearchBtn.style.display = searchInput.value ? 'flex' : 'none';
      }
      applyFilters();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      clearSearchBtn.style.display = 'none';
      applyFilters();
    });
  }

  function applyFilters() {
    if (!categorySections.length) return;
    
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let hasVisible = false;

    categorySections.forEach(section => {
      const sectionCategory = section.getAttribute('data-category');
      const matchesCategory = activeFilter === 'all' || sectionCategory === activeFilter;

      if (!matchesCategory) {
        section.style.display = 'none';
        return;
      }

      const cards = section.querySelectorAll('.snippet-card');
      let sectionHasVisible = false;

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const matchesQuery = !query || text.includes(query);
        card.style.display = matchesQuery ? '' : 'none';
        if (matchesQuery) {
          sectionHasVisible = true;
          hasVisible = true;
        }
      });

      section.style.display = sectionHasVisible ? '' : 'none';
    });

    if (noResults) {
      noResults.style.display = hasVisible ? 'none' : 'block';
    }
  }

  window.resetFilters = function() {
    activeFilter = 'all';
    if (searchInput) searchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
    filterPills.forEach((p, i) => {
      if (i === 0) {
        p.classList.add('bg-primary', 'text-on-primary');
        p.classList.remove('bg-surface-container-high', 'text-on-surface');
      } else {
        p.classList.remove('bg-primary', 'text-on-primary');
        p.classList.add('bg-surface-container-high', 'text-on-surface');
      }
    });
    applyFilters();
  };

  // Handle URL query parameter ?q=... on cheatsheets page
  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get('q');
  if (qParam && searchInput) {
    searchInput.value = qParam;
    if (clearSearchBtn) clearSearchBtn.style.display = 'flex';
    applyFilters();
  }

  // ===== SANDBOX RUN CODE (Demo) =====
  window.runSandboxCode = function(sandboxId) {
    const sandbox = document.getElementById(sandboxId);
    if (!sandbox) return;
    const output = sandbox.querySelector('.code-sandbox__output');
    if (!output) return;

    output.innerHTML = '<div style="display:flex;align-items:center;gap:0.5rem;color:var(--primary);font-weight:600"><span class="material-symbols-outlined" style="font-size:18px;animation:spin 1s linear infinite">autorenew</span> Menjalankan query...</div>';
    
    setTimeout(() => {
      output.innerHTML = `
        <div style="margin-bottom:0.5rem;display:flex;align-items:center;gap:0.5rem">
          <span class="material-symbols-outlined" style="font-size:16px;color:var(--primary)">check_circle</span>
          <span style="font-size:0.8125rem;font-weight:600;color:var(--primary)">5 baris dieksekusi dengan sukses</span>
          <span style="font-size:0.75rem;color:var(--text-secondary);margin-left:auto">Latensi: 0.04s</span>
        </div>
        <div class="data-table-wrap" style="margin:0">
          <table class="data-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>PELANGGAN</th>
                <th>KOTA</th>
                <th>NILAI TRANSAKSI (IDR)</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>XORD-9032</td><td>Budi Santosa</td><td>Surabaya</td><td class="numeric">Rp 750.000</td><td><span class="badge badge--completed">Completed</span></td></tr>
              <tr><td>XORD-9034</td><td>Siti Rahmawati</td><td>Jakarta</td><td class="numeric">Rp 1.250.000</td><td><span class="badge badge--completed">Completed</span></td></tr>
              <tr><td>XORD-9035</td><td>Ahmad Pratama</td><td>Bandung</td><td class="numeric">Rp 520.000</td><td><span class="badge badge--completed">Completed</span></td></tr>
              <tr><td>XORD-9038</td><td>Dewi Lestari</td><td>Surabaya</td><td class="numeric">Rp 890.000</td><td><span class="badge badge--completed">Completed</span></td></tr>
              <tr><td>XORD-9041</td><td>Farhan Siregar</td><td>Medan</td><td class="numeric">Rp 640.000</td><td><span class="badge badge--completed">Completed</span></td></tr>
            </tbody>
          </table>
        </div>
      `;
    }, 800);
  };

  // ===== QUIZ CHECK ANSWER =====
  window.checkQuizAnswer = function(quizId, correctIndex) {
    const quiz = document.getElementById(quizId);
    if (!quiz) return;
    const options = quiz.querySelectorAll('.quiz-option');
    const feedback = quiz.querySelector('.quiz-feedback');
    let selectedIndex = -1;

    options.forEach((opt, i) => {
      const radio = opt.querySelector('input[type="radio"]');
      if (radio && radio.checked) selectedIndex = i;
    });

    if (selectedIndex === -1) {
      showToast('Pilih salah satu jawaban terlebih dahulu.');
      return;
    }

    options.forEach((opt, i) => {
      opt.classList.remove('quiz-option--correct', 'quiz-option--wrong');
      if (i === correctIndex) {
        opt.classList.add('quiz-option--correct');
      } else if (i === selectedIndex && i !== correctIndex) {
        opt.classList.add('quiz-option--wrong');
      }
    });

    if (feedback) {
      if (selectedIndex === correctIndex) {
        feedback.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px;color:var(--primary)">check_circle</span> <strong>Benar!</strong> Jawaban Anda tepat.';
        feedback.style.color = 'var(--primary)';
        feedback.style.background = 'var(--primary-light)';
      } else {
        feedback.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px;color:var(--error)">cancel</span> <strong>Kurang tepat.</strong> Lihat jawaban yang benar (berwarna hijau).';
        feedback.style.color = 'var(--error)';
        feedback.style.background = 'var(--error-container)';
      }
      feedback.style.display = 'flex';
    }
  };

  // ===== CSS ANIMATION KEYFRAMES =====
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .quiz-option { 
      transition: all 0.2s ease; 
      cursor: pointer;
    }
    .quiz-option:hover { 
      background: var(--surface-container-low); 
    }
    .quiz-option--correct {
      background: var(--primary-light) !important;
      border-color: var(--primary) !important;
    }
    .quiz-option--wrong {
      background: var(--error-container) !important;
      border-color: var(--error) !important;
    }
    .quiz-feedback {
      display: none;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      font-weight: 500;
      margin-top: 0.75rem;
    }
  `;
  document.head.appendChild(styleSheet);
});
