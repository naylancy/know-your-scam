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

  init() {
    this.initTheme();
    this.bindDOMEvents();
    this.trySyncInitDatabase();
    window.authManager?.updateHUD();
    this.checkAdminAccess();
    this.handleRoute();
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('popstate', () => this.handleRoute());

    // Asynchronously load database if not already loaded from inline data
    if (!this.db) {
      this.loadDatabase().then(() => {
        window.authManager?.updateHUD();
        this.checkAdminAccess();
      });
    }
  }

  trySyncInitDatabase() {
    if (window.__LARAVEL_INITIAL_DATA__ && window.__LARAVEL_INITIAL_DATA__.users) {
      this.db = window.__LARAVEL_INITIAL_DATA__;
      this.initModulesWithData();
      return true;
    }
    return false;
  }

  initModulesWithData() {
    if (!this.db) return;
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
      this.initModulesWithData();
    }
  }

  bindDOMEvents() {
    // Intercept ALL internal hash links to guarantee immediate 0ms navigation without needing page refresh
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = href.replace('#', '').trim();
          if (target) {
            e.preventDefault();
            this.navigateTo(target);
          }
        }
      }
    });

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
    const target = (route || 'welcome').replace('#', '').trim();
    const targetHash = '#' + target;
    if (window.location.hash !== targetHash) {
      try {
        history.pushState(null, '', targetHash);
      } catch (e) {
        window.location.hash = targetHash;
      }
    }
    this.handleRoute(target);
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

  handleRoute(explicitRoute = null) {
    this.toggleMobileSidebar(true);
    const rawHash = (explicitRoute || window.location.hash.replace('#', '') || 'welcome').trim();

    // Route Guard: Only Admin role can access admin panel
    if (rawHash === 'admin' && !window.authManager?.isAdmin()) {
      window.cyberAudio?.playGlitch?.();
      this.showToast('Akses Terbatas: Hanya Administrator yang diizinkan mengakses panel kontrol.', 'error');
      this.navigateTo('welcome');
      return;
    }

    this.currentRoute = rawHash;
    window.cyberAudio?.playWhoosh?.();

    // Hide all pages immediately (0ms)
    const pages = document.querySelectorAll('.page-view');
    for (let i = 0; i < pages.length; i++) {
      pages[i].classList.remove('active');
    }

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

    // Show active page instantly with 0ms delay
    const activePage = document.getElementById(`page-${rawHash}`);
    if (activePage) {
      activePage.classList.add('active');
    }

    // Update Live In-Game Score HUD
    window.authManager?.updateInGameScoreHUD?.(rawHash);

    // Specific route initializations
    if (rawHash === 'kasus') {
      window.moduleKasus?.render();
    } else if (rawHash === 'diff') {
      window.moduleDiff?.render();
    } else if (rawHash === 'criminal') {
      window.moduleCriminal?.render();
    } else if (rawHash === 'deeplearn') {
      window.moduleDeepLearning?.render();
    } else if (rawHash === 'scanner') {
      window.moduleScanner?.render();
    } else if (rawHash === 'checker') {
      window.moduleChecker?.render();
    } else if (rawHash === 'edukasi') {
      window.edukasiManager?.renderLayoutIfEmpty();
    } else if (rawHash === 'leaderboard') {
      window.leaderboardManager?.render(true);
      window.leaderboardManager?.fetchLive(true);
    } else if (rawHash === 'admin') {
      window.adminManager?.render();
    }

    // Instant scroll to top without smooth scroll lag
    window.scrollTo(0, 0);
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
    if (typeof window.showCyberToast === 'function') {
      window.showCyberToast(message, type);
    }
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

/**
 * Global Bulletproof Toast Notification System
 * Guaranteed to display fixed at bottom-right corner above all layers
 */
window.showCyberToast = function(message, type = 'cyan') {
  let container = document.getElementById('cyber-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'cyber-toast-container';
    document.body.appendChild(container);
  }

  // Force position at bottom-right with maximum integer z-index
  container.style.cssText = 'position:fixed !important; bottom:24px !important; right:24px !important; z-index:2147483647 !important; display:flex !important; flex-direction:column !important; gap:10px !important; pointer-events:none !important; max-width:440px !important; width:calc(100vw - 48px) !important;';

  if (type === 'error') {
    window.cyberAudio?.playError?.();
  } else if (type === 'success') {
    window.cyberAudio?.playSuccess?.();
  } else {
    window.cyberAudio?.playNotification?.();
  }

  const isError = type === 'error';
  const isSuccess = type === 'success';
  const isMagenta = type === 'magenta';
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';

  let borderColor = isError ? '#ff0055' : isSuccess ? '#00ff88' : isMagenta ? '#ff00ea' : '#00f3ff';
  let bgColor = isLight ? (isError ? '#FEF2F2' : isSuccess ? '#F0FDF4' : '#FFFFFF') : (isError ? 'rgba(30, 10, 20, 0.98)' : 'rgba(15, 23, 42, 0.98)');
  let textColor = isLight ? (isError ? '#991B1B' : isSuccess ? '#166534' : '#0F172A') : '#ffffff';
  let titleColor = isLight ? (isError ? '#DC2626' : isSuccess ? '#16A34A' : '#0284C7') : borderColor;
  let glowColor = isError ? 'rgba(255,0,85,0.45)' : isSuccess ? 'rgba(0,255,136,0.35)' : 'rgba(0,243,255,0.35)';
  const icon = isError ? '🚨' : isSuccess ? '✅' : isMagenta ? '⚡' : '🛡️';
  const title = isError ? 'GAGAL OTENTIKASI' : isSuccess ? 'SUKSES' : 'PEMBERITAHUAN';

  const toast = document.createElement('div');
  toast.className = `cyber-toast ${isError ? 'toast-error' : isSuccess ? 'toast-success' : ''}`;
  toast.style.cssText = `
    pointer-events: auto !important;
    background: ${bgColor} !important;
    border-left: 5px solid ${borderColor} !important;
    border-top: 1px solid ${isLight ? '#E2E8F0' : 'rgba(255,255,255,0.18)'} !important;
    border-right: 1px solid ${isLight ? '#E2E8F0' : 'rgba(255,255,255,0.18)'} !important;
    border-bottom: 1px solid ${isLight ? '#CBD5E1' : 'rgba(255,255,255,0.18)'} !important;
    padding: 14px 18px !important;
    border-radius: 6px !important;
    box-shadow: 0 12px 35px rgba(0,0,0,0.85), 0 0 25px ${glowColor} !important;
    color: ${textColor} !important;
    min-width: 300px !important;
    max-width: 440px !important;
    display: flex !important;
    align-items: flex-start !important;
    gap: 12px !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
    font-size: 0.92rem !important;
    opacity: 1 !important;
    transform: none !important;
    transition: all 0.35s ease !important;
    margin-left: auto !important;
  `;

  toast.innerHTML = `
    <div style="font-size: 1.6rem; line-height: 1; flex-shrink: 0; margin-top: 2px;">${icon}</div>
    <div style="flex: 1; line-height: 1.4;">
      <div style="font-size: 0.72rem; font-weight: 700; color: ${titleColor}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 2px; font-family: monospace;">
        ${title}
      </div>
      <div style="color: ${textColor}; font-size: 0.88rem; font-weight: 500;">${message}</div>
    </div>
    <button type="button" style="background:none; border:none; color:${isLight ? '#64748B' : '#94a3b8'}; font-size:1.1rem; cursor:pointer; padding:0 4px; line-height:1;" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    setTimeout(() => {
      if (typeof toast.remove === 'function') {
        toast.remove();
      } else if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 350);
  }, 4500);
};

// Safely instantiate GuardianApp whether DOMContentLoaded has fired or not
function initGuardianApp() {
  if (!window.app) {
    window.app = new GuardianApp();
  }
}
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initGuardianApp);
} else {
  initGuardianApp();
}

