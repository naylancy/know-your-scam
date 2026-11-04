/**
 * GUARDIANSPACE: ANTI-GRAVITY DEFENSE
 * Cyber Authentication & User Session Manager
 */

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    // Check saved user session
    const saved = localStorage.getItem('guardianspace_active_user');
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

  togglePasswordVisibility() {
    window.cyberAudio?.playClick();
    const passInput = document.getElementById('auth-input-password');
    if (passInput) {
      passInput.type = passInput.type === 'password' ? 'text' : 'password';
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

    await this.loginWithCredentials(username, password);
  }

  showLoginError(msg) {
    window.cyberAudio?.playGlitch();
    const errBox = document.getElementById('auth-form-error');
    if (errBox) {
      errBox.textContent = msg;
      errBox.style.display = 'block';
      errBox.classList.remove('shake');
      void errBox.offsetWidth;
      errBox.classList.add('shake');
    }
  }

  // Authenticate with Backend API
  async loginWithCredentials(username, password) {
    const btnSubmit = document.getElementById('btn-submit-login');
    const originalText = btnSubmit ? btnSubmit.innerHTML : '';
    if (btnSubmit) {
      btnSubmit.innerHTML = '<span>⚡</span> MEMVERIFIKASI...';
      btnSubmit.disabled = true;
    }

    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
      const apiEndpoint = window.__LARAVEL_INITIAL_DATA__ ? '/api/login' : 'api.php?action=login';

      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await res.json();

      if (res.ok && data.status === 'success' && data.user) {
        // Success
        await this.setUser(data.user);
        this.closeLoginModal();
        window.cyberAudio?.playSuccess();
        window.app?.showToast(`Otentikasi Berhasil: Selamat bertugas, ${data.user.name}!`, data.user.role === 'admin' ? 'magenta' : 'success');

        // Update welcome page console state if currently on welcome
        if (window.welcomeInteractive) {
          window.welcomeInteractive.updateTestedPod(data.user.role);
        }

        // Navigate to mission or show unlocked routes
        if (window.location.hash === '#welcome' || !window.location.hash) {
          // Keep on welcome or offer launcher
        }
      } else {
        const errMsg = data.message || 'Otentikasi gagal. Periksa username dan sandi Anda.';
        this.showLoginError(errMsg);
      }
    } catch (err) {
      // Local fallback for offline mode
      console.warn('API login request error, using fallback:', err);
      if (username === 'admin' && (password === 'admin123' || password === 'password123' || !password)) {
        await this.loginDemoAdmin();
        this.closeLoginModal();
      } else if (username === 'cadet' && (password === 'cadet123' || password === 'password123' || !password)) {
        await this.loginDemoUser();
        this.closeLoginModal();
      } else {
        this.showLoginError('Sandi tidak valid. Gunakan "cadet123" untuk cadet atau "admin123" untuk admin.');
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
    window.app?.showToast('Otentikasi Berhasil: Masuk sebagai Cadet Aris', 'success');
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
    window.app?.showToast('Otentikasi Berhasil: Hak Akses Administrator Aktif', 'magenta');
  }

  async setUser(userData) {
    this.currentUser = userData;
    localStorage.setItem('guardianspace_active_user', JSON.stringify(userData));

    this.updateHUD();
    window.cyberAudio?.playSuccess();

    if (window.app) {
      window.app.checkAdminAccess();
    }
  }

  // Logout & Return to Guest State
  logout() {
    window.cyberAudio?.playAlert();
    this.currentUser = null;
    localStorage.removeItem('guardianspace_active_user');

    this.updateHUD();

    if (window.welcomeInteractive) {
      window.welcomeInteractive.resetTestedPod();
    }

    window.app?.navigateTo('welcome');
    window.app?.showToast('Anda telah keluar dari sistem pertahanan siber.', 'cyan');
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

      // Admin link rule
      if (adminNavLink) {
        const parentLi = adminNavLink.closest('li');
        if (this.isAdmin()) {
          if (parentLi) parentLi.style.display = 'list-item';
          adminNavLink.style.display = 'flex';
        } else {
          if (parentLi) parentLi.style.display = 'none';
          adminNavLink.style.display = 'none';
        }
      }
    } else {
      // Guest Mode: Hide game menus, show Guest actions
      if (header) header.classList.add('guest-mode');
      if (guestActions) guestActions.style.display = 'flex';
      if (authActions) authActions.style.display = 'none';
      if (adminNavLink) {
        const parentLi = adminNavLink.closest('li');
        if (parentLi) parentLi.style.display = 'none';
        adminNavLink.style.display = 'none';
      }
    }
  }

  // Update score & vulnerability after completing a game module
  async recordResult(scoreDelta, vulnDelta, moduleName, decisionSummary, status = 'SECURED') {
    if (!this.currentUser) return;

    this.currentUser.score = Math.max(0, this.currentUser.score + scoreDelta);
    this.currentUser.vulnerability = Math.max(1.0, Math.min(10.0, +(this.currentUser.vulnerability + vulnDelta).toFixed(1)));
    this.currentUser.modules_completed = (this.currentUser.modules_completed || 0) + 1;

    // Recalculate rank
    if (this.currentUser.vulnerability <= 2.0 && this.currentUser.score >= 1000) {
      this.currentUser.rank = 'Grand Cyber Sentinel';
    } else if (this.currentUser.vulnerability <= 3.5 && this.currentUser.score >= 800) {
      this.currentUser.rank = 'Elite Vanguard';
    } else if (this.currentUser.vulnerability <= 5.5) {
      this.currentUser.rank = 'Threat Analyst';
    } else {
      this.currentUser.rank = 'Security Cadet';
    }

    localStorage.setItem('guardianspace_active_user', JSON.stringify(this.currentUser));
    this.updateHUD();

    // Send to backend API (Laravel /api or api.php)
    try {
      const updateScoreUrl = window.__LARAVEL_INITIAL_DATA__ ? '/api/update_score' : 'api.php?action=update_score';
      const logActivityUrl = window.__LARAVEL_INITIAL_DATA__ ? '/api/log_activity' : 'api.php?action=log_activity';
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';

      fetch(updateScoreUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({
          user_id: this.currentUser.id || this.currentUser.user_code || 'USR-002',
          score_delta: scoreDelta,
          vulnerability_delta: vulnDelta,
          module: moduleName
        })
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

    // Also update in-memory database in app if present
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
