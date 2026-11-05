/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * Main Application Orchestrator, Router & Theme Manager
 */

class GuardianApp {
  constructor() {
    this.currentRoute = 'welcome';
    this.db = null;
    this.init();
  }

  async init() {
    this.initTheme();
    this.bindDOMEvents();
    await this.loadDatabase();
    window.authManager?.updateHUD();
    this.checkAdminAccess();
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  initTheme() {
    const savedTheme = localStorage.getItem('knowyourscam_theme') || localStorage.getItem('guardianspace_theme') || 'dark';
    this.applyTheme(savedTheme, false);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next, true);
  }

  applyTheme(theme, notify = true) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('knowyourscam_theme', theme);

    const btn = document.getElementById('btn-toggle-theme');
    if (btn) {
      btn.innerHTML = theme === 'light' ? '☀️ <span>LIGHT</span>' : '🌙 <span>DARK</span>';
    }

    if (window.particleEngine) {
      window.particleEngine.init();
    }

    if (notify) {
      window.cyberAudio?.playClick();
      this.showToast(`Tema Aktif: Mode ${theme === 'light' ? 'Putih / Light Cyber' : 'Gelap / Dark Obsidian'}`, 'cyan');
    }
  }

  async loadDatabase() {
    // 1. Instant Laravel Blade Injected Data
    if (window.__LARAVEL_INITIAL_DATA__ && window.__LARAVEL_INITIAL_DATA__.users) {
      this.db = window.__LARAVEL_INITIAL_DATA__;
    }

    // 2. Laravel REST API /api/get_all
    if (!this.db) {
      try {
        const res = await fetch('/api/get_all');
        const json = await res.json();
        if (json && json.data) {
          this.db = json.data;
        }
      } catch (e) {}
    }

    // 3. Standalone api.php fallback
    if (!this.db) {
      try {
        const res = await fetch('api.php?action=get_all');
        const json = await res.json();
        if (json && json.data) {
          this.db = json.data;
        }
      } catch (e) {}
    }

    // 4. Local JSON Fallback
    if (!this.db) {
      try {
        const res2 = await fetch('data/database.json');
        this.db = await res2.json();
      } catch (err) {}
    }

    // Initialize modules with loaded data
    if (this.db) {
      window.moduleKasus?.init(this.db.cases_kasus);
      window.moduleDiff?.init(this.db.cases_diff);
      window.moduleCriminal?.init(this.db.cases_criminal);
      window.moduleDeepLearning?.init(this.db.cases_deeplearn);
      window.moduleScanner?.init(this.db.cases_scanner);
      window.moduleChecker?.init(this.db.cases_checker);
      window.edukasiManager?.init();
      window.leaderboardManager?.init(this.db.users);
      window.adminManager?.init();
    }
  }

  bindDOMEvents() {
    // Theme toggle button
    const themeBtn = document.getElementById('btn-toggle-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    // Soundboard controls
    const sfxBtn = document.getElementById('btn-toggle-sfx');
    const droneBtn = document.getElementById('btn-toggle-drone');
    const volSlider = document.getElementById('audio-volume-slider');

    if (sfxBtn) {
      sfxBtn.addEventListener('click', () => {
        const enabled = window.cyberAudio?.toggleSFX();
        sfxBtn.classList.toggle('active', enabled);
        this.showToast(`Efek Suara Sci-Fi: ${enabled ? 'AKTIF' : 'NONAKTIF'}`, 'success');
      });
    }

    if (droneBtn) {
      droneBtn.addEventListener('click', () => {
        const enabled = window.cyberAudio?.toggleAmbientDrone();
        droneBtn.classList.toggle('active', enabled);
        this.showToast(`Ambient Cyber Drone: ${enabled ? 'AKTIF' : 'NONAKTIF'}`, 'magenta');
      });
    }

    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        window.cyberAudio?.setVolume(e.target.value);
      });
    }

    // Global sound click listener on cyber buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.cyber-btn, .nav-link, .pov-pill-btn, .scanner-sample-pill, .btn-intel-hint');
      if (btn && !btn.hasAttribute('onclick')) {
        window.cyberAudio?.playClick();
      }
    });

    // Close modals on backdrop click
    document.querySelectorAll('.cyber-modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          window.cyberAudio?.playClick();
        }
      });
    });
  }

  navigateTo(route) {
    this.toggleMobileSidebar(true);
    window.location.hash = '#' + route;
  }

  toggleMobileSidebar(forceClose = false) {
    const drawer = document.getElementById('mobile-sidebar-drawer');
    const backdrop = document.getElementById('mobile-sidebar-backdrop');
    if (!drawer || !backdrop) return;

    if (forceClose) {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      return;
    }

    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
    } else {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      window.cyberAudio?.playClick();
      this.syncMobileSidebarProfile();
    }
  }

  syncMobileSidebarProfile() {
    const user = window.authManager?.currentUser;
    const banner = document.getElementById('mobile-user-profile-banner');
    const guestActions = document.getElementById('mobile-guest-actions');
    const authActions = document.getElementById('mobile-auth-actions');
    const adminLi = document.getElementById('mobile-admin-link-li');

    if (user) {
      if (banner) banner.style.display = 'flex';
      const nameEl = document.getElementById('mobile-user-name');
      const scoreEl = document.getElementById('mobile-user-score');
      const vulnEl = document.getElementById('mobile-user-vuln');
      if (nameEl) nameEl.textContent = user.name;
      if (scoreEl) scoreEl.textContent = `${user.score} XP`;
      if (vulnEl) vulnEl.textContent = `VULN: ${parseFloat(user.vulnerability || 5.0).toFixed(1)}/10`;
      if (guestActions) guestActions.style.display = 'none';
      if (authActions) authActions.style.display = 'block';
      if (adminLi) adminLi.style.display = user.role === 'admin' ? 'block' : 'none';
    } else {
      if (banner) banner.style.display = 'none';
      if (guestActions) guestActions.style.display = 'block';
      if (authActions) authActions.style.display = 'none';
      if (adminLi) adminLi.style.display = 'none';
    }
  }

  handleRoute() {
    this.toggleMobileSidebar(true);
    const rawHash = window.location.hash.replace('#', '') || 'welcome';

    // Route Guard 1: Guests cannot access game modules or admin
    if (!window.authManager?.isLoggedIn() && rawHash !== 'welcome') {
      window.cyberAudio?.playGlitch();
      this.showToast('Akses Ditolak: Anda belum login. Silakan gunakan akun uji coba untuk masuk.', 'error');
      window.location.hash = '#welcome';
      window.authManager?.openLoginModal();
      return;
    }

    // Route Guard 2: Only Admin role can access admin panel
    if (rawHash === 'admin' && !window.authManager?.isAdmin()) {
      window.cyberAudio?.playGlitch();
      this.showToast('Akses Terbatas: Hanya Administrator (Commander Vektor) yang diizinkan mengakses panel kontrol.', 'error');
      window.location.hash = '#welcome';
      return;
    }

    this.currentRoute = rawHash;
    window.cyberAudio?.playWhoosh();

    // Hide all pages
    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));

    // Highlight nav
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('active', href === '#' + rawHash);
    });

    // Highlight mobile sidebar links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      link.classList.toggle('active', href === '#' + rawHash);
    });

    // Parent Dropdown Highlighting
    const gamesSubroutes = ['games', 'kasus', 'diff', 'criminal', 'deeplearn'];
    const detectorSubroutes = ['scanner', 'checker'];
    const gamesNav = document.getElementById('nav-games-link');
    const detectorNav = document.getElementById('nav-detector-link');
    const edukasiNav = document.getElementById('nav-edukasi-link');

    if (gamesNav) gamesNav.classList.toggle('active', gamesSubroutes.includes(rawHash));
    if (detectorNav) detectorNav.classList.toggle('active', detectorSubroutes.includes(rawHash));
    if (edukasiNav) edukasiNav.classList.toggle('active', rawHash === 'edukasi');

    // Show active page
    const activePage = document.getElementById(`page-${rawHash}`);
    if (activePage) {
      activePage.classList.add('active');
      activePage.classList.remove('holo-enter');
      void activePage.offsetWidth; // trigger reflow
      activePage.classList.add('holo-enter');
    }

    // Update Live In-Game Score HUD
    window.authManager?.updateInGameScoreHUD(rawHash);

    // Ensure Criminal Case timer only runs while inside #criminal
    if (rawHash === 'criminal') {
      window.moduleCriminal?.onEnterRoute();
    } else {
      window.moduleCriminal?.onLeaveRoute();
    }

    // Specific route initializations
    if (rawHash === 'kasus') {
      window.moduleKasus?.render();
    } else if (rawHash === 'diff') {
      window.moduleDiff?.render();
    } else if (rawHash === 'criminal') {
      // onEnterRoute handled above
    } else if (rawHash === 'deeplearn') {
      window.moduleDeepLearning?.render();
    } else if (rawHash === 'scanner') {
      window.moduleScanner?.render();
    } else if (rawHash === 'checker') {
      window.moduleChecker?.render();
    } else if (rawHash === 'edukasi') {
      window.edukasiManager?.init();
    } else if (rawHash === 'leaderboard') {
      window.leaderboardManager?.fetchLive();
    } else if (rawHash === 'admin') {
      if (!window.authManager?.isAdmin()) {
        this.navigateTo('welcome');
        this.showToast('Akses Ditolak: Panel Admin hanya dapat diakses oleh Administrator.', 'error');
        return;
      }
      window.adminManager?.render();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  checkAdminAccess() {
    const adminNavLink = document.getElementById('nav-admin-link');
    const adminNavLi = document.getElementById('nav-admin-li') || adminNavLink?.closest('li');
    const mobileAdminLi = document.getElementById('mobile-admin-link-li');

    const isAdmin = !!window.authManager?.isAdmin();

    if (adminNavLink) {
      adminNavLink.style.display = isAdmin ? 'flex' : 'none';
      if (isAdmin) adminNavLink.style.color = 'var(--neon-magenta)';
    }
    if (adminNavLi) {
      adminNavLi.style.display = isAdmin ? 'list-item' : 'none';
    }
    if (mobileAdminLi) {
      mobileAdminLi.style.display = isAdmin ? 'block' : 'none';
    }
  }

  showToast(message, type = 'cyan') {
    const container = document.getElementById('cyber-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `cyber-toast ${type === 'magenta' ? 'toast-magenta' : type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : ''}`;
    toast.innerHTML = `
      <div style="font-size: 1.2rem;">${type === 'error' ? '🚨' : type === 'magenta' ? '⚡' : '🛡️'}</div>
      <div style="font-size: 0.9rem; line-height: 1.4;">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  showVulnerabilityScreen(data) {
    const modalBox = document.getElementById('modal-vuln-box');
    const modalContent = document.getElementById('modal-vuln-content');
    if (!modalBox || !modalContent) return;

    window.cyberAudio?.playSuccess();

    const vulnVal = parseFloat(data.scoreValue || 3.0).toFixed(1);
    const isSafe = vulnVal <= 3.0;
    const isModerate = vulnVal > 3.0 && vulnVal <= 6.5;

    const metricsHtml = (data.metrics || []).map(m => `
      <div style="background: rgba(5,5,10,0.7); border: 1px solid rgba(255,255,255,0.1); padding: 10px 14px; border-radius: 4px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size: 0.85rem; color: var(--text-muted);">${m.label}</span>
        <strong style="color: var(--neon-cyan); font-family: var(--font-mono); font-size: 0.95rem;">${m.score}</strong>
      </div>
    `).join('');

    modalContent.innerHTML = `
      <div style="text-align: center; padding: 10px;">
        <span class="cyber-tag tag-magenta">${data.moduleTitle || 'MISI SELESAI'}</span>
        <h3 style="font-size: 1.4rem; color: var(--text-highlight); margin: 8px 0 16px 0;">
          ${data.scoreTitle || 'INDIKATOR KERENTANAN SIBER'}
        </h3>

        <!-- Circle Gauge -->
        <div class="score-circle-display" style="border-color: ${isSafe ? 'var(--neon-green)' : isModerate ? 'var(--neon-amber)' : 'var(--neon-red)'};">
          <div class="score-num" style="color: ${isSafe ? 'var(--neon-green)' : isModerate ? 'var(--neon-amber)' : 'var(--neon-red)'};">
            ${vulnVal}
          </div>
          <div class="score-max">SKALA 1 - 10</div>
        </div>

        <!-- Neon Bar Fill Animation -->
        <div style="margin-bottom: 20px;">
          <div style="display:flex; justify-content:space-between; font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 6px;">
            <span>STATUS TINGKAT KERENTANAN:</span>
            <strong style="color: ${isSafe ? 'var(--neon-green)' : isModerate ? 'var(--neon-amber)' : 'var(--neon-red)'};">
              ${isSafe ? '🛡️ SANGAT KUAT (RESILIENT)' : isModerate ? '⚠️ KERENTANAN SEDANG' : '🚨 KERENTANAN TINGGI'}
            </strong>
          </div>
          <div class="vuln-bar-wrapper">
            <div id="modal-vuln-bar-fill" class="vuln-bar-fill ${isSafe ? 'safe' : isModerate ? 'moderate' : 'high-risk'}" style="width: 0%;"></div>
          </div>
        </div>

        <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.6; margin-bottom: 20px;">
          ${data.analysis}
        </p>

        <!-- Metrics Grid -->
        <div style="display:flex; flex-direction:column; gap: 8px; margin-bottom: 24px; text-align: left;">
          ${metricsHtml}
        </div>

        <div style="display:flex; justify-content:center; gap: 14px; flex-wrap: wrap;">
          ${data.hasNextCase ? `
            <button class="cyber-btn" onclick="window.app.closeVulnerabilityModal(); window.moduleKasus.startScenario(${data.nextIndex});">
              ⚡ LANJUT KE SKENARIO ${data.nextIndex + 1} ➔
            </button>
            <button class="cyber-btn btn-ghost" onclick="window.app.closeVulnerabilityModal(); window.gameBriefing.returnToBriefing('kasus');">
              📂 KATALOG SKENARIO
            </button>
          ` : `
            <button class="cyber-btn" onclick="window.app.closeVulnerabilityModal(); window.app.navigateTo('leaderboard');">
              🏆 LIHAT PAPAN PERINGKAT
            </button>
            <button class="cyber-btn btn-ghost" onclick="window.app.closeVulnerabilityModal(); window.gameBriefing.returnToBriefing('kasus');">
              📂 KATALOG SKENARIO
            </button>
          `}
        </div>
      </div>
    `;

    modalBox.classList.add('active');

    // Trigger smooth filling bar animation after render
    setTimeout(() => {
      const fillBar = document.getElementById('modal-vuln-bar-fill');
      if (fillBar) {
        fillBar.style.width = `${Math.min(100, vulnVal * 10)}%`;
      }
    }, 150);
  }

  closeVulnerabilityModal() {
    const modalBox = document.getElementById('modal-vuln-box');
    if (modalBox) modalBox.classList.remove('active');
  }

  openTransparencyModal() {
    window.cyberAudio?.playClick();
    const modal = document.getElementById('modal-transparency-box');
    if (modal) modal.classList.add('active');
  }

  closeTransparencyModal() {
    window.cyberAudio?.playClick();
    const modal = document.getElementById('modal-transparency-box');
    if (modal) modal.classList.remove('active');
  }
}

// Instantiate App
window.addEventListener('DOMContentLoaded', () => {
  window.app = new GuardianApp();
});

