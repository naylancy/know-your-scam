/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * Cyber Authentication & User Session Manager
 */

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    // Check saved user session
    const saved = localStorage.getItem('knowyourscam_active_user') || localStorage.getItem('guardianspace_active_user');
    if (saved) {
      try {
        this.currentUser = JSON.parse(saved);
      } catch (e) {
        this.currentUser = null;
      }
    }

    // Initialize HUD state based on whether user is logged in
    this.updateHUD();
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  isAdmin() {
    return this.currentUser !== null && this.currentUser.role === 'admin';
  }

  // Open Modal Login & Credential Cheat Sheet
  openLoginModal(prefillUsername = '', prefillPassword = '') {
    window.cyberAudio?.playClick();
    const modal = document.getElementById('modal-auth-box');
    if (!modal) return;

    this.switchTab('login');

    const userInput = document.getElementById('auth-input-username');
    const passInput = document.getElementById('auth-input-password');
    const errBox = document.getElementById('auth-form-error');

    if (userInput) userInput.value = prefillUsername;
    if (passInput) passInput.value = prefillPassword;
    if (errBox) {
      errBox.style.display = 'none';
      errBox.textContent = '';
    }

    modal.classList.add('active');
  }

  closeLoginModal() {
    window.cyberAudio?.playClick();
    const modal = document.getElementById('modal-auth-box');
    if (modal) modal.classList.remove('active');
  }

  switchTab(tab) {
    window.cyberAudio?.playSelect?.() || window.cyberAudio?.playClick();
    const loginTabBtn = document.getElementById('tab-btn-login');
    const regTabBtn = document.getElementById('tab-btn-register');
    const loginForm = document.getElementById('auth-manual-form');
    const regForm = document.getElementById('auth-register-form');
    const errBox = document.getElementById('auth-form-error');
    const succBox = document.getElementById('auth-form-success');

    if (errBox) {
      errBox.style.display = 'none';
      errBox.textContent = '';
    }
    if (succBox) {
      succBox.style.display = 'none';
      succBox.textContent = '';
    }

    if (tab === 'register') {
      if (loginTabBtn) {
        loginTabBtn.classList.remove('active');
        loginTabBtn.classList.add('btn-ghost');
      }
      if (regTabBtn) {
        regTabBtn.classList.add('active');
        regTabBtn.classList.remove('btn-ghost');
      }
      if (loginForm) loginForm.style.display = 'none';
      if (regForm) regForm.style.display = 'block';
    } else {
      if (loginTabBtn) {
        loginTabBtn.classList.add('active');
        loginTabBtn.classList.remove('btn-ghost');
      }
      if (regTabBtn) {
        regTabBtn.classList.remove('active');
        regTabBtn.classList.add('btn-ghost');
      }
      if (loginForm) loginForm.style.display = 'block';
      if (regForm) regForm.style.display = 'none';
    }
  }

  togglePasswordVisibility(targetId = 'auth-input-password') {
    window.cyberAudio?.playClick();
    const passInput = document.getElementById(targetId);
    if (passInput) {
      passInput.type = passInput.type === 'password' ? 'text' : 'password';
    }
  }

  // Universal Toast Notification Handler
  notify(message, type = 'cyan') {
    if (typeof window.showCyberToast === 'function') {
      window.showCyberToast(message, type);
    } else if (window.app && typeof window.app.showToast === 'function') {
      window.app.showToast(message, type);
    } else {
      this.displayToastFallback(message, type);
    }
  }

  // Standalone Bulletproof Toast Fallback
  displayToastFallback(message, type = 'error') {
    let container = document.getElementById('cyber-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cyber-toast-container';
      document.body.appendChild(container);
    }

    container.style.cssText = 'position:fixed !important; bottom:24px !important; right:24px !important; z-index:2147483647 !important; display:flex !important; flex-direction:column !important; gap:10px !important; pointer-events:none !important; max-width:440px !important; width:calc(100vw - 48px) !important;';

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
  }

  // Handle User Self-Registration
  async handleRegisterSubmit(e) {
    if (e) e.preventDefault();
    const nameInput = document.getElementById('reg-input-name');
    const userInput = document.getElementById('reg-input-username');
    const emailInput = document.getElementById('reg-input-email');
    const passInput = document.getElementById('reg-input-password');
    const passConfirm = document.getElementById('reg-input-password-confirm');
    const btnSubmit = document.getElementById('btn-submit-register');

    const name = nameInput ? nameInput.value.trim() : '';
    const username = userInput ? userInput.value.trim().toLowerCase() : '';
    const email = emailInput ? emailInput.value.trim().toLowerCase() : '';
    const password = passInput ? passInput.value.trim() : '';
    const passwordConfirm = passConfirm ? passConfirm.value.trim() : '';

    if (!name) {
      this.showLoginError('Nama lengkap profil wajib diisi.');
      return;
    }
    if (!username || username.length < 3) {
      this.showLoginError('Username minimal 3 karakter (huruf, angka, atau underscore).');
      return;
    }
    if (!password || password.length < 6) {
      this.showLoginError('Sandi siber minimal 6 karakter.');
      return;
    }
    if (password !== passwordConfirm) {
      this.showLoginError('Konfirmasi sandi tidak cocok. Periksa kembali sandi Anda.');
      return;
    }

    const originalText = btnSubmit ? btnSubmit.innerHTML : '';
    if (btnSubmit) {
      btnSubmit.innerHTML = '<span>⚡</span> MENDAFTARKAN AKUN...';
      btnSubmit.disabled = true;
    }

    const path = window.location.pathname;
    const isSubfolder = path.includes('/KnowYourScam');
    const basePath = isSubfolder ? path.substring(0, path.indexOf('/KnowYourScam') + '/KnowYourScam'.length) : '';

    const endpoints = [];
    if (isSubfolder) {
      endpoints.push(`${basePath}/api.php?action=register`);
      endpoints.push(`${basePath}/public/api/register`);
    } else {
      endpoints.push('/api/register');
      endpoints.push('api.php?action=register');
    }

    const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
    const payload = JSON.stringify({ name, username, email, password });
    let registered = false;

    try {
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': csrf,
              'Accept': 'application/json'
            },
            body: payload
          });

          const contentType = res.headers.get('content-type') || '';
          if (res.status === 404 && !contentType.includes('json')) continue;

          let data = null;
          try {
            data = await res.json();
          } catch (jsonErr) {
            continue;
          }

          if (res.ok && data.status === 'success') {
            registered = true;
            window.cyberAudio?.playSuccess?.();
            this.notify(`Pendaftaran Berhasil! Selamat datang, ${name}.`, 'success');

            // Auto-login directly without manual form filling
            await this.loginWithCredentials(username, password);
            this.closeLoginModal();
            window.app?.navigateTo('welcome');
            break;
          } else {
            const errMsg = data.message || 'Pendaftaran gagal. Silakan coba kembali.';
            this.showLoginError(errMsg);
            return;
          }
        } catch (netErr) {}
      }

      if (!registered) {
        this.showLoginError('Terjadi kendala jaringan saat mendaftar. Silakan coba kembali.');
      }
    } finally {
      if (btnSubmit) {
        btnSubmit.innerHTML = originalText;
        btnSubmit.disabled = false;
      }
    }
  }

  // 1-Click Quick Fill & Login
  async quickFillAndLogin(username, password) {
    const userInput = document.getElementById('auth-input-username');
    const passInput = document.getElementById('auth-input-password');
    if (userInput) userInput.value = username;
    if (passInput) passInput.value = password;

    await this.loginWithCredentials(username, password);
  }

  // Form submit handler
  async handleFormSubmit(e) {
    if (e) e.preventDefault();
    const userInput = document.getElementById('auth-input-username');
    const passInput = document.getElementById('auth-input-password');

    const username = userInput ? userInput.value.trim() : '';
    const password = passInput ? passInput.value.trim() : '';

    if (!username) {
      this.showLoginError('Silakan masukkan username siber Anda.');
      return;
    }

    if (!password) {
      this.showLoginError('Kata sandi siber wajib diisi.');
      return;
    }

    await this.loginWithCredentials(username, password);
  }

  showLoginError(msg) {
    const errorText = msg || 'Gagal Masuk: Username atau kata sandi siber salah!';

    try {
      window.cyberAudio?.playError?.();
      window.cyberAudio?.playGlitch?.();
    } catch (e) {}

    const errBox = document.getElementById('auth-form-error');
    if (errBox) {
      errBox.textContent = errorText;
      errBox.style.display = 'block';
      errBox.classList.remove('shake');
      void errBox.offsetWidth;
      errBox.classList.add('shake');
    }

    // High-priority toast notification at bottom-right
    this.notify(errorText, 'error');
  }

  // Authenticate with Backend API
  async loginWithCredentials(username, password) {
    const btnSubmit = document.getElementById('btn-submit-login');
    const originalText = btnSubmit ? btnSubmit.innerHTML : '';
    if (btnSubmit) {
      btnSubmit.innerHTML = '<span>⚡</span> MEMVERIFIKASI...';
      btnSubmit.disabled = true;
    }

    const path = window.location.pathname;
    const isSubfolder = path.includes('/KnowYourScam');
    const basePath = isSubfolder ? path.substring(0, path.indexOf('/KnowYourScam') + '/KnowYourScam'.length) : '';

    const endpoints = [];
    if (isSubfolder) {
      endpoints.push(`${basePath}/api.php?action=login`);
      endpoints.push(`${basePath}/public/api/login`);
      endpoints.push(`${basePath}/public/index.php/api/login`);
    } else {
      endpoints.push('/api/login');
      endpoints.push('api.php?action=login');
    }

    const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
    const payload = JSON.stringify({ username, password });

    let authSuccess = false;
    let handledError = false;

    try {
      for (const endpoint of endpoints) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRF-TOKEN': csrf,
              'Accept': 'application/json'
            },
            body: payload
          });

          const contentType = res.headers.get('content-type') || '';
          if (res.status === 404 && !contentType.includes('json')) {
            continue;
          }

          let data = null;
          try {
            data = await res.json();
          } catch (jsonErr) {
            continue;
          }

          handledError = true;

          if (res.ok && data && data.status === 'success' && data.user) {
            authSuccess = true;
            await this.setUser(data.user);
            this.closeLoginModal();
            window.cyberAudio?.playSuccess?.();
            this.notify(`Otentikasi Berhasil: Selamat bertugas, ${data.user.name}!`, data.user.role === 'admin' ? 'magenta' : 'success');

            if (window.welcomeInteractive) {
              window.welcomeInteractive.updateTestedPod(data.user.role);
            }
            break;
          } else {
            const errMsg = (data && data.message) ? data.message : 'Username atau password salah! Otentikasi gagal.';
            this.showLoginError(errMsg);
            break;
          }
        } catch (netErr) {}
      }

      if (!authSuccess && !handledError) {
        console.warn('API login request error, using fallback');
        if (username === 'admin' && (password === 'admin123' || password === 'password123')) {
          await this.loginDemoAdmin();
          this.closeLoginModal();
        } else if (username === 'cadet' && (password === 'cadet123' || password === 'password123')) {
          await this.loginDemoUser();
          this.closeLoginModal();
        } else {
          this.showLoginError('Username atau password salah! Otentikasi gagal.');
        }
      }
    } finally {
      if (btnSubmit) {
        btnSubmit.innerHTML = originalText;
        btnSubmit.disabled = false;
      }
    }
  }

  // Quick Demo Login: User (Cadet)
  async loginDemoUser() {
    const userPayload = {
      username: 'cadet',
      name: 'Cadet Aris',
      role: 'user',
      score: 680,
      vulnerability: 4.5,
      rank: 'Security Cadet',
      modules_completed: 5
    };
    await this.setUser(userPayload);
    this.notify('Otentikasi Berhasil: Masuk sebagai Cadet Aris', 'success');
  }

  // Quick Demo Login: Admin (Commander)
  async loginDemoAdmin() {
    const adminPayload = {
      username: 'admin',
      name: 'Commander Vektor',
      role: 'admin',
      score: 1250,
      vulnerability: 1.2,
      rank: 'Grand Cyber Sentinel',
      modules_completed: 15
    };
    await this.setUser(adminPayload);
    this.notify('Otentikasi Berhasil: Hak Akses Administrator Aktif', 'magenta');
  }

  async setUser(userData) {
    this.currentUser = userData;
    this.ensureGameScores(this.currentUser);
    localStorage.setItem('knowyourscam_active_user', JSON.stringify(this.currentUser));

    this.updateHUD();
    window.cyberAudio?.playSuccess();

    if (window.app) {
      window.app.checkAdminAccess();
      if (typeof window.app.handleRoute === 'function') {
        window.app.handleRoute();
      }
    }
  }

  // Ensure game_scores structure exists for per-game tracking (4 core games only)
  ensureGameScores(user) {
    if (!user) return;
    const raw = user.game_scores || {};
    const total = parseInt(user.score) || 500;
    if (!user.game_scores || typeof user.game_scores !== 'object' || Object.keys(user.game_scores).length === 0) {
      user.game_scores = {
        kasus: Math.round(total * 0.35),
        diff: Math.round(total * 0.25),
        criminal: Math.round(total * 0.25),
        deeplearn: Math.round(total * 0.15)
      };
    } else {
      user.game_scores = {
        kasus: parseInt(raw.kasus) || 0,
        diff: parseInt(raw.diff) || 0,
        criminal: parseInt(raw.criminal) || 0,
        deeplearn: parseInt(raw.deeplearn) || 0
      };
    }
    // Recompute total score strictly from sum of 4 core game scores
    user.score = user.game_scores.kasus + user.game_scores.diff + user.game_scores.criminal + user.game_scores.deeplearn;
  }

  // Recalculate rank tier
  recalculateRank(user) {
    if (!user) return;
    if (user.vulnerability <= 2.0 && user.score >= 1000) {
      user.rank = 'Grand Cyber Sentinel';
    } else if (user.vulnerability <= 3.5 && user.score >= 800) {
      user.rank = 'Elite Vanguard';
    } else if (user.vulnerability <= 5.5) {
      user.rank = 'Threat Analyst';
    } else {
      user.rank = 'Security Cadet';
    }
  }

  // Logout & Return to Guest State
  logout() {
    window.cyberAudio?.playAlert();
    this.currentUser = null;
    localStorage.removeItem('knowyourscam_active_user');
    localStorage.removeItem('guardianspace_active_user');

    this.updateHUD();

    if (window.welcomeInteractive) {
      window.welcomeInteractive.resetTestedPod();
    }

    window.app?.navigateTo('welcome');
    this.notify('Anda telah keluar dari sistem pertahanan siber.', 'cyan');
  }

  updateHUD() {
    const header = document.querySelector('.hud-header');
    const guestActions = document.getElementById('hud-guest-actions');
    const authActions = document.getElementById('hud-auth-actions');
    const adminNavLink = document.getElementById('nav-admin-link');

    if (this.isLoggedIn()) {
      // Authenticated Mode: Show menus and user capsule
      if (header) header.classList.remove('guest-mode');
      if (guestActions) guestActions.style.display = 'none';
      if (authActions) authActions.style.display = 'flex';

      const nameEl = document.getElementById('hud-user-name');
      const scoreEl = document.getElementById('hud-user-score');
      const vulnEl = document.getElementById('hud-user-vuln');
      const avatarEl = document.getElementById('hud-user-avatar');

      if (nameEl) nameEl.textContent = this.currentUser.name;
      if (scoreEl) scoreEl.textContent = `${this.currentUser.score} XP`;

      if (vulnEl) {
        const v = parseFloat(this.currentUser.vulnerability || 5.0).toFixed(1);
        vulnEl.textContent = `VULN: ${v}/10`;
        vulnEl.className = 'vuln-badge-mini ' + (v <= 3.0 ? 'safe' : v <= 6.5 ? 'safe' : 'danger');
        if (v > 6.0) vulnEl.className = 'vuln-badge-mini danger';
      }

      if (avatarEl) {
        avatarEl.textContent = this.currentUser.role === 'admin' ? '🛡️' : '⚡';
      }

      // Admin link rule (Strict Role Enforcement)
      const adminNavLi = document.getElementById('nav-admin-li') || adminNavLink?.closest('li');
      const mobileAdminLi = document.getElementById('mobile-admin-link-li');
      const summaryAdminCard = document.getElementById('summary-card-admin');

      if (this.isAdmin()) {
        if (adminNavLi) adminNavLi.style.display = 'list-item';
        if (adminNavLink) {
          adminNavLink.style.display = 'flex';
          adminNavLink.style.color = 'var(--neon-magenta)';
        }
        if (mobileAdminLi) mobileAdminLi.style.display = 'block';
        if (summaryAdminCard) summaryAdminCard.style.display = 'block';
      } else {
        if (adminNavLi) adminNavLi.style.display = 'none';
        if (adminNavLink) adminNavLink.style.display = 'none';
        if (mobileAdminLi) mobileAdminLi.style.display = 'none';
        if (summaryAdminCard) summaryAdminCard.style.display = 'none';
      }

      // Welcome Dashboard State: Hide login option when logged in
      const heroGuestCta = document.getElementById('hero-guest-cta');
      const heroAuthCta = document.getElementById('hero-auth-cta');
      const heroAuthCard = document.getElementById('hero-auth-status-card');

      if (heroGuestCta) heroGuestCta.style.display = 'none';
      if (heroAuthCta) heroAuthCta.style.display = 'flex';
      if (heroAuthCard) {
        heroAuthCard.style.display = 'block';
        const bName = document.getElementById('hero-auth-username');
        const bScore = document.getElementById('hero-auth-score');
        const bVuln = document.getElementById('hero-auth-vuln');
        const bTag = document.getElementById('hero-auth-role-tag');
        const bAvatar = document.getElementById('hero-auth-avatar');

        if (bName) bName.textContent = this.currentUser.name;
        if (bScore) bScore.textContent = `${this.currentUser.score} XP`;
        if (bVuln) bVuln.textContent = `${parseFloat(this.currentUser.vulnerability || 5.0).toFixed(1)}/10`;
        if (bTag) {
          bTag.textContent = this.currentUser.role === 'admin' ? 'ADMINISTRATOR' : 'OPERATOR SIBER';
          bTag.className = 'cyber-tag ' + (this.currentUser.role === 'admin' ? 'tag-magenta' : 'tag-green');
        }
        if (bAvatar) bAvatar.textContent = this.currentUser.role === 'admin' ? '🛡️' : '⚡';
      }

    } else {
      // Guest Mode: Hide game menus, show Guest actions
      if (header) header.classList.add('guest-mode');
      if (guestActions) guestActions.style.display = 'flex';
      if (authActions) authActions.style.display = 'none';
      
      const adminNavLi = document.getElementById('nav-admin-li') || adminNavLink?.closest('li');
      const mobileAdminLi = document.getElementById('mobile-admin-link-li');
      const summaryAdminCard = document.getElementById('summary-card-admin');

      if (adminNavLi) adminNavLi.style.display = 'none';
      if (adminNavLink) adminNavLink.style.display = 'none';
      if (mobileAdminLi) mobileAdminLi.style.display = 'none';
      if (summaryAdminCard) summaryAdminCard.style.display = 'none';

      // Welcome Dashboard State: Show login option for guests
      const heroGuestCta = document.getElementById('hero-guest-cta');
      const heroAuthCta = document.getElementById('hero-auth-cta');
      const heroAuthCard = document.getElementById('hero-auth-status-card');

      if (heroGuestCta) heroGuestCta.style.display = 'flex';
      if (heroAuthCta) heroAuthCta.style.display = 'none';
      if (heroAuthCard) heroAuthCard.style.display = 'none';
    }

    // Always sync mobile sidebar profile
    if (window.app?.syncMobileSidebarProfile) {
      window.app.syncMobileSidebarProfile();
    }
  }

  // Real-time update for in-game score badges across all active games (4 core games)
  updateInGameScoreHUD(gameKey = null) {
    if (!this.currentUser) return;
    this.ensureGameScores(this.currentUser);
    const keys = gameKey ? [gameKey] : ['kasus', 'diff', 'criminal', 'deeplearn'];
    
    keys.forEach(k => {
      const gScore = this.currentUser.game_scores?.[k] || 0;
      const tScore = this.currentUser.score || 0;

      const gEl = document.getElementById(`live-score-${k}`);
      const tEl = document.getElementById(`live-total-score-${k}`);

      if (gEl) {
        gEl.textContent = `${gScore} XP`;
        gEl.classList.remove('pulse-score');
        void gEl.offsetWidth;
        gEl.classList.add('pulse-score');
      }
      if (tEl) {
        tEl.textContent = `${tScore} XP`;
      }
    });
  }

  // Update score & vulnerability after completing a game module (Per-game score & Real-time Live Sync)
  async recordResult(scoreDelta, vulnDelta, moduleName, decisionSummary, status = 'SECURED', gameKey = null) {
    if (!this.currentUser) return;

    this.ensureGameScores(this.currentUser);

    // Identify target game category (4 core games only)
    const modLower = (moduleName || '').toLowerCase();
    let targetGame = gameKey;
    if (!targetGame) {
      if (modLower.includes('kasus') || modLower.includes('case')) targetGame = 'kasus';
      else if (modLower.includes('diff')) targetGame = 'diff';
      else if (modLower.includes('criminal')) targetGame = 'criminal';
      else if (modLower.includes('deep') || modLower.includes('analyz')) targetGame = 'deeplearn';
      else targetGame = null;
    }

    // 1. Update score for the specific game if valid
    if (targetGame && this.currentUser.game_scores[targetGame] !== undefined) {
      const previousGameScore = this.currentUser.game_scores[targetGame] || 0;
      this.currentUser.game_scores[targetGame] = Math.max(0, previousGameScore + scoreDelta);
    }

    // 2. Total score is strictly the exact sum of the 4 core game scores
    const gs = this.currentUser.game_scores;
    this.currentUser.score = (parseInt(gs.kasus) || 0) + (parseInt(gs.diff) || 0) + (parseInt(gs.criminal) || 0) + (parseInt(gs.deeplearn) || 0);

    // 3. Update vulnerability & rank
    this.currentUser.vulnerability = Math.max(1.0, Math.min(10.0, +(this.currentUser.vulnerability + vulnDelta).toFixed(1)));
    this.currentUser.modules_completed = (this.currentUser.modules_completed || 0) + 1;
    this.recalculateRank(this.currentUser);

    // 4. Save to Local Storage & Update Header HUD in Real Time
    localStorage.setItem('knowyourscam_active_user', JSON.stringify(this.currentUser));
    this.updateHUD();
    this.updateInGameScoreHUD(targetGame);

    // 5. Broadcast real-time score update event
    window.dispatchEvent(new CustomEvent('cyber:score-updated', {
      detail: {
        user: this.currentUser,
        game: targetGame,
        gameScore: this.currentUser.game_scores[targetGame],
        scoreDelta: scoreDelta,
        totalScore: this.currentUser.score,
        gameScores: this.currentUser.game_scores,
        vulnerability: this.currentUser.vulnerability
      }
    }));

    // 6. Update in-memory user list in app.db for instant leaderboard reflection
    if (window.app?.db?.users) {
      const idx = window.app.db.users.findIndex(u => (u.id === this.currentUser.id || u.username === this.currentUser.username));
      if (idx !== -1) {
        window.app.db.users[idx] = {
          ...window.app.db.users[idx],
          score: this.currentUser.score,
          game_scores: { ...this.currentUser.game_scores },
          vulnerability: this.currentUser.vulnerability,
          modules_completed: this.currentUser.modules_completed,
          rank: this.currentUser.rank
        };
      }
    }

    // 7. Push live score directly to LeaderboardManager without waiting for page refresh
    if (window.leaderboardManager) {
      window.leaderboardManager.updateLiveScore(this.currentUser);
    }

    // 8. Persist to Backend API in Background
    try {
      const updateScoreUrl = window.__LARAVEL_INITIAL_DATA__ ? '/api/update_score' : 'api.php?action=update_score';
      const logActivityUrl = window.__LARAVEL_INITIAL_DATA__ ? '/api/log_activity' : 'api.php?action=log_activity';
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';

      fetch(updateScoreUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({
          user_id: this.currentUser.id || this.currentUser.user_code || 'USR-002',
          game: targetGame,
          score_delta: scoreDelta,
          vulnerability_delta: vulnDelta,
          module: moduleName
        })
      }).then(r => r.json()).then(res => {
        if (res && res.user && window.leaderboardManager) {
          window.leaderboardManager.fetchLive();
        }
      }).catch(() => {});

      // Send activity log
      fetch(logActivityUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({
          user_id: this.currentUser.id || this.currentUser.user_code || 'USR-002',
          user_name: this.currentUser.name,
          module: moduleName,
          decision: decisionSummary,
          vulnerability_score: this.currentUser.vulnerability,
          status: status
        })
      }).catch(() => {});
    } catch (e) {}

    // 9. Also update in-memory database logs
    if (window.app?.db) {
      const newLog = {
        id: 'LOG-' + Math.floor(Math.random() * 8999 + 1000),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        user_id: this.currentUser.id || 'USR-002',
        user_name: this.currentUser.name,
        module: moduleName,
        decision: decisionSummary,
        vulnerability_score: this.currentUser.vulnerability,
        status: status
      };
      if (window.app.db.activity_logs) {
        window.app.db.activity_logs.unshift(newLog);
      }
    }
  }
}

window.authManager = new AuthManager();

// Guarantee window.showCyberToast exists globally
if (typeof window.showCyberToast !== 'function') {
  window.showCyberToast = function(message, type = 'cyan') {
    window.authManager?.displayToastFallback(message, type);
  };
}

/**
 * Universal Guest Leaderboard Banner for 4 Core Games
 * Informs guest users to login to record scores onto leaderboard, keeping login 100% optional.
 */
window.renderGuestLeaderboardBanner = function(options = {}) {
  if (window.authManager && window.authManager.isLoggedIn()) {
    return '';
  }

  const margin = options.margin || '0 0 18px 0';
  const isCompact = !!options.compact;

  if (isCompact) {
    return `
      <div class="guest-leaderboard-banner guest-compact holo-enter" style="margin: ${margin};">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 1.1rem; line-height: 1;">🏆</span>
          <span class="guest-title" style="font-weight: 600; font-size: 0.86rem;">Login untuk lihat progressmu di leaderboard</span>
          <span class="guest-sub" style="font-size: 0.74rem; opacity: 0.8; font-family: var(--font-mono);">(Opsional — Anda tetap dapat bermain)</span>
        </div>
        <button type="button" class="cyber-btn" style="padding: 4px 14px; font-size: 0.74rem;" onclick="window.authManager.openLoginModal()">
          <span>⚡</span> MASUK
        </button>
      </div>
    `;
  }

  return `
    <div class="guest-leaderboard-banner holo-enter" style="margin: ${margin};">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="font-size: 1.7rem; line-height: 1;">🏆</div>
        <div>
          <div class="guest-title" style="font-size: 0.96rem; font-weight: 700; color: var(--text-highlight); letter-spacing: 0.3px;">
            Login untuk lihat progressmu di leaderboard
          </div>
          <div class="guest-sub" style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-top: 2px;">
            Mode Tamu aktif &bull; Login bersifat opsional (Anda tetap dapat memainkan seluruh skenario simulasi)
          </div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <button type="button" class="cyber-btn" style="padding: 8px 20px; font-size: 0.85rem; box-shadow: 0 0 15px var(--neon-cyan-dim);" onclick="window.authManager.openLoginModal()">
          <span>⚡</span> MASUK / LOGIN
        </button>
      </div>
    </div>
  `;
};
