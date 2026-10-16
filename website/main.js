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

  // ===== DOWNLOAD DATASET (Contoh CSV dibangkitkan di browser) =====
  window.downloadSampleCsv = function() {
    const header = 'order_id,user_id,order_timestamp,gross_amount,status\n';
    const names = ['usr_88120', 'usr_88121', 'usr_88122', 'usr_88123', 'usr_88124'];
    const statuses = ['COMPLETED', 'COMPLETED', 'CANCELLED', 'COMPLETED', 'REFUNDED'];
    const rows = [];
    for (let i = 0; i < 50; i++) {
      const d = new Date(2024, 0, 1 + (i % 28), 9 + (i % 9), (i * 7) % 60);
      const amount = (120000 + ((i * 37000) % 880000)).toFixed(2);
      const ts = d.toISOString().slice(0, 19).replace('T', ' ');
      rows.push([
        'ord_' + (990200 + i),
        names[i % names.length],
        ts,
        amount,
        statuses[i % statuses.length]
      ].join(','));
    }
    const blob = new Blob([header + rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dataset_ecommerce_contoh.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Contoh dataset (50 baris) diunduh sebagai CSV.');
  };

  // ===== CETAK / SIMPAN PDF =====
  window.printCheatsheet = function() {
    window.print();
  };

  // ===== TAMPATKAN / SEMBUNYIKAN SOLUSI (studi kasus) =====
  window.toggleSolution = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const btn = document.querySelector('[onclick="toggleSolution(\'' + id + '\')"]');
    const label = btn ? btn.querySelector('span:last-child') : null;
    if (label && !el.dataset.showLabel) el.dataset.showLabel = label.textContent;
    const willShow = !el.classList.contains('show');
    el.classList.toggle('show', willShow);
    if (label) label.textContent = willShow ? 'Sembunyikan Solusi' : el.dataset.showLabel;
  };

  // ===== CHEATSHEET SEARCH & FILTER =====
  const searchInput = document.getElementById('cheatsheet-search');
  const filterPills = document.querySelectorAll('.category-pill');
  const categorySections = document.querySelectorAll('.category-section');
  const noResults = document.getElementById('no-results-state');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  let activeFilter = 'all';

  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        activeFilter = pill.getAttribute('data-filter');
        filterPills.forEach(p => p.classList.toggle('active', p === pill));
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

  if (searchInput) {
    const initialQuery = new URLSearchParams(window.location.search).get('q');
    if (initialQuery) {
      searchInput.value = initialQuery;
      if (clearSearchBtn) clearSearchBtn.style.display = 'flex';
      applyFilters();
    }
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
    filterPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-filter') === 'all'));
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

  // ===== SANDBOX: TAMPILKAN CONTOH HASIL =====
  const sandboxOutputs = new WeakMap();

  document.querySelectorAll('.code-sandbox__output').forEach(output => {
    sandboxOutputs.set(output, output.innerHTML);
  });

  window.runSandboxCode = function(sandboxId) {
    const sandbox = document.getElementById(sandboxId);
    if (!sandbox) return;
    const output = sandbox.querySelector('.code-sandbox__output');
    if (!output || !sandboxOutputs.has(output)) return;

    output.innerHTML = '<div style="display:flex;align-items:center;gap:0.5rem;color:var(--primary);font-weight:600"><span class="material-symbols-outlined" style="font-size:18px;animation:spin 1s linear infinite">autorenew</span> Menampilkan contoh hasil...</div>';

    setTimeout(() => {
      output.innerHTML =
        '<div style="margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;font-weight:600;color:var(--primary)">' +
        '<span class="material-symbols-outlined" style="font-size:16px">check_circle</span>' +
        'Contoh hasil pada data latihan (bukan eksekusi sungguhan)' +
        '</div>' + sandboxOutputs.get(output);
    }, 600);
  };

  window.resetSandbox = function(sandboxId) {
    const sandbox = document.getElementById(sandboxId);
    if (!sandbox) return;
    const output = sandbox.querySelector('.code-sandbox__output');
    if (!output || !sandboxOutputs.has(output)) return;
    output.innerHTML = sandboxOutputs.get(output);
    showToast('Hasil sandbox dikembalikan ke contoh bawaan.');
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

  // ===== TOC SCROLLSPY =====
  const tocItems = Array.from(document.querySelectorAll('.toc-rail__item[href^="#"]'));
  if (tocItems.length > 1) {
    const targets = tocItems
      .map(item => ({ item, el: document.getElementById(item.getAttribute('href').slice(1)) }))
      .filter(entry => entry.el);

    const updateToc = () => {
      const offset = window.innerHeight * 0.35;
      let current = targets[0];
      for (const entry of targets) {
        if (entry.el.getBoundingClientRect().top <= offset) current = entry;
      }
      targets.forEach(entry => entry.item.classList.toggle('active', entry === current));
    };

    let tocTicking = false;
    window.addEventListener('scroll', () => {
      if (tocTicking) return;
      tocTicking = true;
      window.requestAnimationFrame(() => {
        updateToc();
        tocTicking = false;
      });
    }, { passive: true });

    updateToc();
  }

  // ===== TUGAS PRAKTIK: SIMPAN PROGRES DI BROWSER =====
  const taskBoxes = document.querySelectorAll('.task-check input[type="checkbox"]');
  if (taskBoxes.length) {
    const progressBar = document.getElementById('task-progress-bar');
    const progressText = document.getElementById('task-progress-text');

    const readStore = (key) => {
      try { return window.localStorage.getItem(key); } catch (e) { return null; }
    };
    const writeStore = (key, value) => {
      try { window.localStorage.setItem(key, value); } catch (e) { /* penyimpanan tidak tersedia */ }
    };

    const updateTaskProgress = () => {
      let done = 0;
      taskBoxes.forEach(box => { if (box.checked) done++; });
      if (progressBar) progressBar.style.width = ((done / taskBoxes.length) * 100) + '%';
      if (progressText) progressText.textContent = done + ' dari ' + taskBoxes.length + ' tugas selesai';
      return done;
    };

    taskBoxes.forEach(box => {
      const key = 'dataschool-task:' + box.dataset.task;
      const card = box.closest('.task-card');
      const saved = readStore(key) === '1';

      box.checked = saved;
      if (card) card.classList.toggle('is-done', saved);

      box.addEventListener('change', () => {
        writeStore(key, box.checked ? '1' : '0');
        if (card) card.classList.toggle('is-done', box.checked);
        const done = updateTaskProgress();
        if (box.checked) {
          showToast(done === taskBoxes.length
            ? 'Semua tugas sesi ini selesai. Lanjut ke sesi berikutnya!'
            : 'Tugas ditandai selesai. Progres tersimpan di browser ini.');
        }
      });
    });

    updateTaskProgress();
  }
});
