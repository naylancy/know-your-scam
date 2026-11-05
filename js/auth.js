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
    window.cyberAudio?.playClick();
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
      if (loginTabBtn) loginTabBtn.classList.remove('active');
      if (regTabBtn) regTabBtn.classList.add('active');
      if (loginForm) loginForm.style.display = 'none';
      if (regForm) regForm.style.display = 'block';
    } else {
      if (loginTabBtn) loginTabBtn.classList.add('active');
      if (regTabBtn) regTabBtn.classList.remove('active');
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

    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          username: username,
          email: email,
          password: password
        })
      });

      const data = await res.json();

      if (res.ok && data.status === 'success') {
        window.cyberAudio?.playSuccess();
        window.app?.showToast('Registrasi Berhasil! Silakan masuk dengan akun baru Anda.', 'success');
        
        // Auto-switch to login tab and prefill username
        this.switchTab('login');
        const loginUserInput = document.getElementById('auth-input-username');
        const loginPassInput = document.getElementById('auth-input-password');
        const succBox = document.getElementById('auth-form-success');

        if (loginUserInput) loginUserInput.value = username;
        if (loginPassInput) {
          loginPassInput.value = '';
          loginPassInput.focus();
        }
        if (succBox) {
          succBox.textContent = 'Pendaftaran berhasil! Masukkan sandi Anda untuk melanjutkan.';
          succBox.style.display = 'block';
        }
      } else {
        const errMsg = data.message || 'Pendaftaran gagal. Silakan coba kembali.';
        this.showLoginError(errMsg);
      }
    } catch (err) {
      console.error('Registration error:', err);
      this.showLoginError('Terjadi kendala jaringan saat mendaftar. Silakan coba kembali.');
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
      if (username === 'admin' && (password === 'admin123' || password === 'password123')) {
        await this.loginDemoAdmin();
        this.closeLoginModal();
      } else if (username === 'cadet' && (password === 'cadet123' || password === 'password123')) {
        await this.loginDemoUser();
        this.closeLoginModal();
      } else {
        this.showLoginError('Username atau sandi yang Anda masukkan tidak valid.');
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
    this.ensureGameScores(this.currentUser);
    localStorage.setItem('knowyourscam_active_user', JSON.stringify(this.currentUser));

    this.updateHUD();
    window.cyberAudio?.playSuccess();

    if (window.app) {
      window.app.checkAdminAccess();
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

      // Admin link rule (Strict Role Enforcement)
      const adminNavLi = document.getElementById('nav-admin-li') || adminNavLink?.closest('li');
      const mobileAdminLi = document.getElementById('mobile-admin-link-li');

      if (this.isAdmin()) {
        if (adminNavLi) adminNavLi.style.display = 'list-item';
        if (adminNavLink) {
          adminNavLink.style.display = 'flex';
          adminNavLink.style.color = 'var(--neon-magenta)';
        }
        if (mobileAdminLi) mobileAdminLi.style.display = 'block';
      } else {
        if (adminNavLi) adminNavLi.style.display = 'none';
        if (adminNavLink) adminNavLink.style.display = 'none';
        if (mobileAdminLi) mobileAdminLi.style.display = 'none';
      }
    } else {
      // Guest Mode: Hide game menus, show Guest actions
      if (header) header.classList.add('guest-mode');
      if (guestActions) guestActions.style.display = 'flex';
      if (authActions) authActions.style.display = 'none';
      
      const adminNavLi = document.getElementById('nav-admin-li') || adminNavLink?.closest('li');
      const mobileAdminLi = document.getElementById('mobile-admin-link-li');
      if (adminNavLi) adminNavLi.style.display = 'none';
      if (adminNavLink) adminNavLink.style.display = 'none';
      if (mobileAdminLi) mobileAdminLi.style.display = 'none';
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
