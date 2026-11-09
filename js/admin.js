/**
 * KNOW YOUR SCAM: ANTI-GRAVITY CYBER DEFENSE
 * Admin Panel & Real-Time Cyber Telemetry Manager
 * Centralized Management: Games (CRUD), Edukasi (CRUD), Log Detektor (CRUD), & Kelola User/Logs (CRUD)
 */

class AdminManager {
  constructor() {
    this.activeTab = 'games'; // 'games', 'edukasi', 'detector', 'users_logs'
    this.selectedGame = 'kasus'; // 'kasus', 'diff', 'criminal', 'deeplearn'
    this.userLogSubTab = 'users'; // 'users' or 'logs'
    
    // Filters & Search
    this.searchQuery = '';
    this.filterStatus = 'ALL';
    this.filterDetectorModel = 'ALL';
    this.filterDetectorStatus = 'ALL';
    this.searchUserQuery = '';
    this.searchDetectorQuery = '';
    this.searchGameQuery = '';
    this.filterEdukasiCategory = 'ALL';
    this.searchEdukasiQuery = '';
    
    this.realtimeTimer = null;
  }

  init() {
    this.startRealtimeSimulation();
    this.render();
  }

  setTab(tab) {
    this.activeTab = tab;
    window.cyberAudio?.playClick();
    this.render();
  }

  setGame(game) {
    this.selectedGame = game;
    window.cyberAudio?.playClick();
    this.render();
  }

  setUserLogSubTab(sub) {
    this.userLogSubTab = sub;
    window.cyberAudio?.playClick();
    this.render();
  }

  startRealtimeSimulation() {
    if (this.realtimeTimer) clearInterval(this.realtimeTimer);
    this.realtimeTimer = setInterval(() => {
      if (!window.app?.db?.activity_logs) return;
      if (Math.random() > 0.72) {
        const dummyUsers = ['Cadet Maya', 'Cadet Danial', 'Analyst Echo', 'Vanguard Ryan'];
        const dummyModules = ['SCAM SIMULATOR', 'FINDING DIFF', 'CRIMINAL CASE', 'ANALYZER'];
        const dummyDecisions = [
          'Memverifikasi integritas sertifikat SSL NeoArtha',
          'Mendeteksi domain palsu .xyz.fake',
          'Menerbitkan surat dakwaan dalam 48 detik',
          'Menolak transfer darurat Elena Voss'
        ];
        const dummyStatuses = ['SECURED', 'BREACH_PREVENTED', 'SECURED', 'COMPROMISED'];

        const pick = Math.floor(Math.random() * dummyUsers.length);
        const newLog = {
          id: 'LOG-' + Math.floor(Math.random() * 8999 + 1000),
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          user_id: 'USR-SIM',
          user_name: dummyUsers[pick],
          module: dummyModules[pick],
          decision: dummyDecisions[pick],
          vulnerability_score: +(Math.random() * 4 + 1.2).toFixed(1),
          status: dummyStatuses[pick]
        };

        window.app.db.activity_logs.unshift(newLog);
        if (window.app.db.activity_logs.length > 100) {
          window.app.db.activity_logs.pop();
        }

        if (this.activeTab === 'users_logs' && this.userLogSubTab === 'logs' && document.getElementById('admin-container')) {
          this.render();
        }
      }
    }, 12000);
  }

  render() {
    const container = document.getElementById('admin-container');
    if (!container) return;

    const isAdmin = window.authManager?.isAdmin();

    if (!isAdmin) {
      container.innerHTML = `
        <div class="hud-card" style="padding: 36px; text-align: center; max-width: 520px; margin: 40px auto;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔒</div>
          <h2 style="font-size: 1.3rem; color: var(--neon-magenta); margin-bottom: 8px;">
            AKSES TERBATAS: ADMINISTRATOR
          </h2>
          <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.6; margin-bottom: 20px;">
            Halaman ini khusus pengelola sistem untuk mengelola skenario game, materi edukasi, log detektor, dan akun pengguna.
          </p>
          <div style="display:flex; justify-content:center; gap: 12px;">
            <button class="cyber-btn btn-magenta" onclick="window.authManager.loginDemoAdmin(); window.adminManager.render();">
              🛡️ MASUK SEBAGAI ADMIN (DEMO)
            </button>
          </div>
        </div>
      `;
      return;
    }

    // Counts for executive stat strip
    const db = window.app?.db || {};
    const totalCases = (db.cases_kasus?.length || 0) + (db.cases_diff?.length || 0) + (db.cases_criminal?.length || 0) + (db.cases_deeplearn?.length || 0);
    const totalTopics = window.edukasiManager?.topics?.length || 0;
    const detectorLogs = (db.activity_logs || []).filter(l => {
      const mod = (l.module || '').toUpperCase();
      return mod.includes('SCANNER') || mod.includes('CHECKER') || mod.includes('DETEKTOR') || mod.includes('LINK');
    });
    const totalUsers = db.users?.length || 0;

    container.innerHTML = `
      <div class="holo-enter" style="max-width: 1100px; margin: 0 auto;">
        
        <!-- Top Console Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 18px;">
          <div>
            <h2 style="font-size: 1.35rem; color: var(--text-highlight); margin: 0 0 4px 0;">
              KONSOL ADMINISTRATOR
            </h2>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
              Pusat pengelolaan konten gim, edukasi, evaluasi detektor AI, dan akun pengguna
            </p>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="cyber-tag tag-magenta" style="font-size:0.75rem;">ROLE: ADMIN</span>
            <span class="cyber-tag tag-green" style="font-size:0.75rem;">● SYSTEM READY</span>
          </div>
        </div>

        <!-- Executive Stats Bar -->
        <div class="hud-card" style="padding: 12px 18px; margin-bottom: 18px; display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px; text-align:center;">
          <div style="border-right: 1px solid rgba(255,255,255,0.08); padding: 4px;">
            <div style="font-size: 0.72rem; color: var(--text-muted); font-family:var(--font-mono);">MODUL GIM (4 JENIS)</div>
            <div style="font-size: 1.25rem; font-weight:700; color: var(--neon-cyan);">${totalCases} Skenario</div>
          </div>
          <div style="border-right: 1px solid rgba(255,255,255,0.08); padding: 4px;">
            <div style="font-size: 0.72rem; color: var(--text-muted); font-family:var(--font-mono);">MATERI EDUKASI</div>
            <div style="font-size: 1.25rem; font-weight:700; color: var(--neon-green);">${totalTopics} Artikel</div>
          </div>
          <div style="border-right: 1px solid rgba(255,255,255,0.08); padding: 4px;">
            <div style="font-size: 0.72rem; color: var(--text-muted); font-family:var(--font-mono);">RIWAYAT DETEKTOR</div>
            <div style="font-size: 1.25rem; font-weight:700; color: var(--neon-amber);">${detectorLogs.length} Pemindaian</div>
          </div>
          <div style="padding: 4px;">
            <div style="font-size: 0.72rem; color: var(--text-muted); font-family:var(--font-mono);">PENGGUNA TERDAFTAR</div>
            <div style="font-size: 1.25rem; font-weight:700; color: var(--neon-magenta);">${totalUsers} Akun</div>
          </div>
        </div>

        <!-- 4 Centralized Navigation Tabs -->
        <div class="admin-tab-bar" style="display:flex; gap:8px; margin-bottom:18px; flex-wrap:wrap;">
          <button class="admin-tab-btn ${this.activeTab === 'games' ? 'active' : ''}" onclick="window.adminManager.setTab('games')">
            🎮 KELOLA GAMES
          </button>
          <button class="admin-tab-btn ${this.activeTab === 'edukasi' ? 'active' : ''}" onclick="window.adminManager.setTab('edukasi')">
            📚 KELOLA EDUKASI
          </button>
          <button class="admin-tab-btn ${this.activeTab === 'detector' ? 'active' : ''}" onclick="window.adminManager.setTab('detector')">
            🔍 LOG DETEKTOR
          </button>
          <button class="admin-tab-btn ${this.activeTab === 'users_logs' ? 'active' : ''}" onclick="window.adminManager.setTab('users_logs')">
            👥 KELOLA USER & LOGS
          </button>
        </div>

        <!-- Main Tab Content Area -->
        ${this.renderActiveTabContent()}
      </div>
    `;
  }

  renderActiveTabContent() {
    switch (this.activeTab) {
      case 'games':
        return this.renderGamesSection();
      case 'edukasi':
        return this.renderEdukasiSection();
      case 'detector':
        return this.renderDetectorSection();
      case 'users_logs':
        return this.renderUsersAndLogsSection();
      default:
        return this.renderGamesSection();
    }
  }

  /* =====================================================================
   * 1. MENU GAMES (4 Sub-games CRUD)
   * ===================================================================== */
  renderGamesSection() {
    const db = window.app?.db || {};
    const gameList = [
      { id: 'kasus', name: 'Scam Simulator', icon: '🎭', items: db.cases_kasus || [] },
      { id: 'diff', name: 'Finding Diff', icon: '⚖️', items: db.cases_diff || [] },
      { id: 'criminal', name: 'Criminal Case', icon: '🦉', items: db.cases_criminal || [] },
      { id: 'deeplearn', name: 'Analyzer', icon: '🧠', items: db.cases_deeplearn || [] }
    ];

    const currentCatObj = gameList.find(g => g.id === this.selectedGame) || gameList[0];
    let items = currentCatObj.items;

    if (this.searchGameQuery) {
      const q = this.searchGameQuery.toLowerCase();
      items = items.filter(it => 
        (it.title || '').toLowerCase().includes(q) ||
        (it.subtitle || '').toLowerCase().includes(q) ||
        (it.id || '').toLowerCase().includes(q) ||
        (it.scenario || '').toLowerCase().includes(q)
      );
    }

    const gameTabsHtml = gameList.map(g => `
      <button class="cyber-btn ${this.selectedGame === g.id ? '' : 'btn-ghost'}" style="font-size: 0.82rem; padding: 7px 14px;" onclick="window.adminManager.setGame('${g.id}')">
        ${g.icon} ${g.name} (${g.items.length})
      </button>
    `).join('');

    const itemsHtml = items.map((item, idx) => `
      <div class="hud-card" style="padding: 14px 18px; margin-bottom: 10px; display:flex; justify-content:space-between; align-items:center; gap: 14px; border-left: 3px solid ${item.is_custom ? 'var(--neon-magenta)' : 'var(--neon-cyan)'};">
        <div style="flex:1; min-width: 0;">
          <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 4px; flex-wrap:wrap;">
            <span class="cyber-tag ${item.is_custom ? 'tag-magenta' : 'tag-cyan'}" style="font-size:0.7rem;">${item.id || item.type || '#' + (idx + 1)}</span>
            ${item.is_custom ? '<span class="cyber-tag tag-magenta" style="font-size:0.65rem;">⭐ KUSTOM</span>' : '<span class="cyber-tag tag-green" style="font-size:0.65rem;">RESMI</span>'}
            <span class="cyber-tag" style="font-size:0.65rem;">${item.difficulty || 'Sedang'}</span>
            <strong style="color: var(--text-highlight); font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${item.title || item.target || item.victim || 'Skenario ' + (idx + 1)}
            </strong>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${item.subtitle || item.scenario || item.scenario_text?.substring(0, 90) || item.explanation?.substring(0, 90) || 'Deskripsi skenario terkonfigurasi'}
          </div>
        </div>
        <div style="display:flex; gap: 8px; flex-shrink: 0;">
          <button class="cyber-btn btn-ghost" style="padding: 5px 10px; font-size: 0.75rem;" onclick="window.adminManager.openCaseBuilderModal('${this.selectedGame}', '${item.id || idx}')" title="Edit Kasus">
            ✏️ Edit
          </button>
          <button class="cyber-btn btn-danger" style="padding: 5px 10px; font-size: 0.75rem;" onclick="window.adminManager.deleteCase('${this.selectedGame}', '${item.id || idx}')" title="Hapus Kasus">
            🗑️ Hapus
          </button>
        </div>
      </div>
    `).join('') || `<div class="hud-card" style="padding: 24px; text-align: center; color: var(--text-muted); font-size:0.88rem;">Tidak ada skenario kasus yang cocok.</div>`;

    return `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap: 10px; margin-bottom: 14px;">
          <div style="display:flex; gap: 6px; flex-wrap: wrap;">
            ${gameTabsHtml}
          </div>
          <button class="cyber-btn btn-magenta" style="font-size:0.82rem; padding:8px 16px;" onclick="window.adminManager.openCaseBuilderModal('${this.selectedGame}')">
            ➕ TAMBAH KASUS BARU
          </button>
        </div>

        <div class="hud-card" style="padding: 10px 16px; margin-bottom: 12px; display:flex; justify-content:space-between; align-items:center;">
          <input 
            type="text" 
            class="cyber-input" 
            style="padding: 6px 12px; font-size: 0.82rem; max-width: 320px;" 
            placeholder="Cari judul skenario atau kata kunci..."
            value="${this.searchGameQuery}"
            oninput="window.adminManager.searchGameQuery = this.value; window.adminManager.render();"
          />
          <span style="font-size:0.78rem; color:var(--text-muted); font-family:var(--font-mono);">
            Menampilkan ${items.length} skenario
          </span>
        </div>

        <div>
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  /* =====================================================================
   * 2. MENU EDUKASI (CRUD Materi & Kuis)
   * ===================================================================== */
  renderEdukasiSection() {
    let topics = window.edukasiManager?.topics || [];

    if (this.filterEdukasiCategory !== 'ALL') {
      topics = topics.filter(t => t.category === this.filterEdukasiCategory);
    }

    if (this.searchEdukasiQuery) {
      const q = this.searchEdukasiQuery.toLowerCase();
      topics = topics.filter(t => 
        (t.title || '').toLowerCase().includes(q) ||
        (t.id || '').toLowerCase().includes(q) ||
        (t.lead || '').toLowerCase().includes(q)
      );
    }

    const rowsHtml = topics.map((t, idx) => `
      <tr>
        <td style="color:var(--text-muted); font-size:0.75rem; font-family:var(--font-mono); white-space:nowrap;">
          ${idx + 1}
        </td>
        <td>
          <span class="cyber-tag tag-cyan" style="font-size:0.65rem;">${t.category}</span>
          <strong style="color:var(--text-highlight); font-size:0.88rem; display:block; margin-top:2px;">
            ${t.title}
          </strong>
        </td>
        <td>
          <span class="cyber-tag tag-amber" style="font-size:0.65rem;">⏱️ ${t.readingTime || '3 menit'}</span>
        </td>
        <td>
          <span class="cyber-tag ${t.is_custom ? 'tag-magenta' : 'tag-green'}" style="font-size:0.65rem;">
            ${t.is_custom ? '⭐ Kustom' : 'Resmi'}
          </span>
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            <button class="cyber-btn btn-ghost" style="padding: 4px 8px; font-size: 0.72rem;" onclick="window.adminManager.openEdukasiModal('${t.id}')">
              ✏️ Edit
            </button>
            <button class="cyber-btn btn-danger" style="padding: 4px 8px; font-size: 0.72rem;" onclick="window.adminManager.deleteEdukasiTopic('${t.id}')">
              🗑️
            </button>
          </div>
        </td>
      </tr>
    `).join('') || `<tr><td colspan="5" style="text-align:center; padding: 20px; color: var(--text-muted);">Tidak ada materi edukasi yang cocok.</td></tr>`;

    return `
      <div>
        <!-- Controls Bar -->
        <div class="hud-card" style="padding: 12px 18px; margin-bottom: 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap: 10px;">
          <div style="display:flex; align-items:center; gap: 10px; flex: 1; min-width: 260px;">
            <input 
              type="text" 
              class="cyber-input" 
              style="padding: 6px 12px; font-size: 0.82rem; flex:1;" 
              placeholder="Cari judul materi edukasi..."
              value="${this.searchEdukasiQuery}"
              oninput="window.adminManager.searchEdukasiQuery = this.value; window.adminManager.render();"
            />
            <select 
              class="cyber-input" 
              style="padding: 6px 10px; font-size: 0.8rem; width: auto;"
              onchange="window.adminManager.filterEdukasiCategory = this.value; window.adminManager.render();"
            >
              <option value="ALL">Semua Subbab</option>
              <option value="1. PENDAHULUAN">1. PENDAHULUAN</option>
              <option value="2. ANATOMI PENIPUAN">2. ANATOMI PENIPUAN</option>
              <option value="3. KEPUTUSAN AMAN">3. KEPUTUSAN AMAN</option>
              <option value="4. RESPON & DARURAT">4. RESPON & DARURAT</option>
            </select>
          </div>

          <button class="cyber-btn" style="padding: 8px 16px; font-size: 0.82rem;" onclick="window.adminManager.openEdukasiModal()">
            ➕ TAMBAH MATERI & KUIS
          </button>
        </div>

        <!-- Table -->
        <div class="hud-card" style="padding: 0; overflow-x: auto;">
          <table class="cyber-table">
            <thead>
              <tr>
                <th style="width:40px;">NO</th>
                <th>SUBBAB & JUDUL MATERI</th>
                <th>WAKTU BACA</th>
                <th>STATUS</th>
                <th style="width:110px;">KONTROL</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* =====================================================================
   * 3. MENU DETEKTOR (CRUD Log Detektor & Indikator AI)
   * ===================================================================== */
  renderDetectorSection() {
    const logs = window.app?.db?.activity_logs || [];
    
    // Filter detector relevant logs
    let detectorLogs = logs.filter(l => {
      const mod = (l.module || '').toUpperCase();
      return mod.includes('SCANNER') || mod.includes('CHECKER') || mod.includes('DETEKTOR') || mod.includes('LINK');
    });

    if (window.app?.db?.detector_logs && Array.isArray(window.app.db.detector_logs)) {
      detectorLogs = [...window.app.db.detector_logs, ...detectorLogs];
    }

    // Filter Search
    if (this.searchDetectorQuery) {
      const q = this.searchDetectorQuery.toLowerCase();
      detectorLogs = detectorLogs.filter(l => 
        (l.decision || '').toLowerCase().includes(q) ||
        (l.module || '').toLowerCase().includes(q) ||
        (l.user_name || '').toLowerCase().includes(q) ||
        (l.target || '').toLowerCase().includes(q) ||
        (l.id || '').toLowerCase().includes(q)
      );
    }

    // Filter Model
    if (this.filterDetectorModel !== 'ALL') {
      detectorLogs = detectorLogs.filter(l => (l.module || '').includes(this.filterDetectorModel) || (l.ai_model || '') === this.filterDetectorModel);
    }

    // Filter Status
    if (this.filterDetectorStatus !== 'ALL') {
      if (this.filterDetectorStatus === 'THREAT') {
        detectorLogs = detectorLogs.filter(l => l.status === 'THREAT_IDENTIFIED' || l.status === 'COMPROMISED' || (l.vulnerability_score && l.vulnerability_score >= 6.0));
      } else if (this.filterDetectorStatus === 'SAFE') {
        detectorLogs = detectorLogs.filter(l => l.status === 'SECURED' || (l.vulnerability_score && l.vulnerability_score < 6.0));
      }
    }

    const rowsHtml = detectorLogs.map(l => {
      let modelBadge = '<span class="cyber-tag tag-cyan" style="font-size:0.68rem;">Gemini 1.5 Flash</span>';
      if ((l.module || '').includes('DeepSeek') || (l.ai_model || '').includes('DeepSeek')) {
        modelBadge = '<span class="cyber-tag tag-magenta" style="font-size:0.68rem;">DeepSeek R1 Cyber</span>';
      } else if ((l.module || '').includes('Claude') || (l.ai_model || '').includes('Claude')) {
        modelBadge = '<span class="cyber-tag tag-amber" style="font-size:0.68rem;">Claude Sentinel</span>';
      } else if ((l.module || '').includes('Zero-Trust') || (l.ai_model || '').includes('Zero-Trust') || (l.module || '').includes('Heuristic')) {
        modelBadge = '<span class="cyber-tag tag-green" style="font-size:0.68rem;">Zero-Trust Core</span>';
      }

      const isThreat = l.status === 'THREAT_IDENTIFIED' || l.status === 'COMPROMISED' || (l.vulnerability_score && l.vulnerability_score >= 6.0);
      const safeId = (l.id || '').replace(/'/g, '');

      return `
        <tr>
          <td style="color: var(--text-muted); font-size: 0.75rem; white-space: nowrap;">
            ${l.timestamp || '-'}
          </td>
          <td>
            <strong style="color: var(--text-highlight); font-size:0.82rem;">${l.user_name || 'Cadet'}</strong>
          </td>
          <td style="max-width: 260px; font-size: 0.8rem; color: var(--text-main); word-break: break-all;">
            ${l.target || l.decision || '-'}
          </td>
          <td>
            ${modelBadge}
          </td>
          <td>
            <span class="cyber-tag ${l.vulnerability_score >= 6.0 ? 'tag-red' : 'tag-green'}" style="font-size:0.72rem;">
              ${l.vulnerability_score || '4.0'} / 10
            </span>
          </td>
          <td>
            <span class="cyber-tag ${isThreat ? 'tag-red' : 'tag-green'}" style="font-size:0.72rem;">
              ${isThreat ? '⚠️ BAHAYA' : '🛡️ AMAN'}
            </span>
          </td>
          <td>
            <div style="display:flex; gap:6px;">
              <button class="cyber-btn btn-ghost" style="padding: 4px 8px; font-size: 0.72rem;" onclick="window.adminManager.openDetectorDetailModal('${safeId}')" title="Detail Analisis">
                👁️ Detail
              </button>
              <button class="cyber-btn btn-danger" style="padding: 4px 8px; font-size: 0.72rem;" onclick="window.adminManager.deleteDetectorLog('${safeId}')" title="Hapus Log">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('') || `<tr><td colspan="7" style="text-align:center; padding: 22px; color: var(--text-muted);">Tidak ada riwayat deteksi yang sesuai filter.</td></tr>`;

    return `
      <div>
        <!-- Controls Bar -->
        <div class="hud-card" style="padding: 12px 18px; margin-bottom: 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap: 10px;">
          <div style="display:flex; align-items:center; gap: 8px; flex: 1; min-width: 260px; flex-wrap:wrap;">
            <input 
              type="text" 
              class="cyber-input" 
              style="padding: 6px 12px; font-size: 0.82rem; min-width: 200px; flex:1;" 
              placeholder="Cari target URL, teks, atau nama..."
              value="${this.searchDetectorQuery}"
              oninput="window.adminManager.searchDetectorQuery = this.value; window.adminManager.render();"
            />
            <select 
              class="cyber-input" 
              style="padding: 6px 10px; font-size: 0.8rem; width: auto;"
              onchange="window.adminManager.filterDetectorModel = this.value; window.adminManager.render();"
            >
              <option value="ALL">Semua Model AI</option>
              <option value="Gemini">Gemini 1.5 Flash</option>
              <option value="DeepSeek">DeepSeek R1 Cyber</option>
              <option value="Claude">Claude Sentinel</option>
              <option value="Zero-Trust">Zero-Trust Core</option>
            </select>
            <select 
              class="cyber-input" 
              style="padding: 6px 10px; font-size: 0.8rem; width: auto;"
              onchange="window.adminManager.filterDetectorStatus = this.value; window.adminManager.render();"
            >
              <option value="ALL">Semua Vonis</option>
              <option value="THREAT">BAHAYA</option>
              <option value="SAFE">AMAN</option>
            </select>
          </div>

          <div style="display:flex; gap: 6px;">
            <button class="cyber-btn btn-ghost" style="padding: 6px 12px; font-size: 0.78rem;" onclick="window.adminManager.exportDetectorLogs()">
              📥 Ekspor Log
            </button>
            <button class="cyber-btn btn-danger" style="padding: 6px 12px; font-size: 0.78rem;" onclick="window.adminManager.clearDetectorLogs()">
              🗑️ Bersihkan
            </button>
          </div>
        </div>

        <!-- Detector Table -->
        <div class="hud-card" style="padding: 0; overflow-x: auto;">
          <table class="cyber-table">
            <thead>
              <tr>
                <th>WAKTU</th>
                <th>OPERATOR</th>
                <th>TARGET DETEKSI</th>
                <th>MODEL AI DIGUNAKAN</th>
                <th>SKOR RISIKO</th>
                <th>VONIS HASIL</th>
                <th style="width:110px;">KONTROL</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* =====================================================================
   * 4. MENU KELOLA USER & LOGS (CRUD User & Telemetry Logs)
   * ===================================================================== */
  renderUsersAndLogsSection() {
    return `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap: 12px; margin-bottom: 14px;">
          <div style="display:flex; gap: 8px;">
            <button class="cyber-btn ${this.userLogSubTab === 'users' ? '' : 'btn-ghost'}" style="font-size: 0.82rem; padding: 7px 14px;" onclick="window.adminManager.setUserLogSubTab('users')">
              👤 MANAJEMEN AKUN PENGGUNA
            </button>
            <button class="cyber-btn ${this.userLogSubTab === 'logs' ? '' : 'btn-ghost'}" style="font-size: 0.82rem; padding: 7px 14px;" onclick="window.adminManager.setUserLogSubTab('logs')">
              📡 LOG AKTIVITAS KESELURUHAN WEB
            </button>
          </div>
        </div>

        ${this.userLogSubTab === 'users' ? this.renderUsersTable() : this.renderSystemLogsTable()}
      </div>
    `;
  }

  renderUsersTable() {
    const users = window.app?.db?.users || [];
    let filtered = users;

    if (this.searchUserQuery) {
      const q = this.searchUserQuery.toLowerCase();
      filtered = filtered.filter(u => 
        (u.name || '').toLowerCase().includes(q) ||
        (u.username || '').toLowerCase().includes(q) ||
        (u.id || '').toLowerCase().includes(q)
      );
    }

    const rowsHtml = filtered.map(u => {
      const isAdmin = u.role === 'admin';
      return `
        <tr>
          <td style="color:var(--text-muted); font-size:0.75rem; font-family:var(--font-mono);">${u.id || '-'}</td>
          <td>
            <strong style="color:var(--text-highlight); font-size:0.88rem;">${u.name}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">@${u.username}</div>
          </td>
          <td>
            <span class="cyber-tag ${isAdmin ? 'tag-magenta' : 'tag-cyan'}" style="font-size:0.72rem;">
              ${isAdmin ? '👑 ADMIN' : '🛡️ USER'}
            </span>
          </td>
          <td>
            <strong style="color:var(--neon-green);">${u.score || 0} XP</strong>
          </td>
          <td style="font-size:0.78rem; color:var(--text-muted);">
            ${u.rank || 'Cadet'}
          </td>
          <td>
            <div style="display:flex; gap:6px;">
              <button 
                class="cyber-btn btn-ghost" 
                style="padding: 4px 8px; font-size: 0.72rem;" 
                onclick="window.adminManager.toggleUserRole('${u.id}', '${isAdmin ? 'user' : 'admin'}')"
                title="Ganti Peran"
              >
                ${isAdmin ? 'Demote' : 'Promote'}
              </button>
              <button 
                class="cyber-btn btn-ghost" 
                style="padding: 4px 8px; font-size: 0.72rem;" 
                onclick="window.adminManager.openUserEditModal('${u.id}')"
                title="Edit Pengguna"
              >
                ✏️
              </button>
              ${u.id !== 'USR-001' && u.username !== 'admin' ? `
                <button 
                  class="cyber-btn btn-danger" 
                  style="padding: 4px 8px; font-size: 0.72rem;" 
                  onclick="window.adminManager.deleteUser('${u.id}')"
                  title="Hapus Akun"
                >
                  🗑️
                </button>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('') || `<tr><td colspan="6" style="text-align:center; padding:20px; color:var(--text-muted);">Tidak ada pengguna ditemukan.</td></tr>`;

    return `
      <div>
        <div class="hud-card" style="padding: 12px 18px; margin-bottom: 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <input 
            type="text" 
            class="cyber-input" 
            style="padding: 6px 12px; font-size: 0.82rem; max-width: 320px;" 
            placeholder="Cari nama atau username..."
            value="${this.searchUserQuery}"
            oninput="window.adminManager.searchUserQuery = this.value; window.adminManager.render();"
          />
          <button class="cyber-btn" style="padding: 8px 16px; font-size: 0.82rem;" onclick="window.adminManager.openUserEditModal()">
            ➕ TAMBAH PENGGUNA BARU
          </button>
        </div>

        <div class="hud-card" style="padding: 0; overflow-x: auto;">
          <table class="cyber-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>PENGGUNA</th>
                <th>ROLE</th>
                <th>SKOR DEFENSE</th>
                <th>PANGKAT</th>
                <th style="width:140px;">KONTROL</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderSystemLogsTable() {
    const logs = window.app?.db?.activity_logs || [];
    let filtered = logs;

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(l => 
        (l.user_name || '').toLowerCase().includes(q) || 
        (l.module || '').toLowerCase().includes(q) || 
        (l.decision || '').toLowerCase().includes(q) ||
        (l.id || '').toLowerCase().includes(q)
      );
    }

    if (this.filterStatus !== 'ALL') {
      filtered = filtered.filter(l => l.status === this.filterStatus);
    }

    const rowsHtml = filtered.map(log => {
      const isSecured = log.status === 'SECURED' || log.status === 'BREACH_PREVENTED';
      const isCompromised = log.status === 'COMPROMISED' || log.status === 'THREAT_IDENTIFIED';
      const safeId = (log.id || '').replace(/'/g, '');
      return `
        <tr>
          <td style="color: var(--text-muted); font-size: 0.75rem; white-space: nowrap;">
            ${log.timestamp}
          </td>
          <td>
            <strong style="color: var(--text-highlight); font-size:0.82rem;">${log.user_name}</strong>
          </td>
          <td>
            <span class="cyber-tag" style="font-size: 0.68rem;">${log.module}</span>
          </td>
          <td style="max-width: 320px; font-size: 0.8rem; color: var(--text-main);">
            ${log.decision}
          </td>
          <td>
            <span class="cyber-tag ${log.vulnerability_score <= 2.5 ? 'tag-green' : log.vulnerability_score <= 5.5 ? 'tag-amber' : 'tag-red'}" style="font-size:0.7rem;">
              ${log.vulnerability_score}
            </span>
          </td>
          <td>
            <span class="cyber-tag ${isSecured ? 'tag-green' : isCompromised ? 'tag-red' : 'tag-amber'}" style="font-size:0.7rem;">
              ${log.status}
            </span>
          </td>
          <td>
            <button class="cyber-btn btn-danger" style="padding: 3px 8px; font-size: 0.7rem;" onclick="window.adminManager.deleteSystemLog('${safeId}')" title="Hapus Log">
              🗑️
            </button>
          </td>
        </tr>
      `;
    }).join('') || `<tr><td colspan="7" style="text-align:center; padding: 22px; color: var(--text-muted);">Tidak ada log yang cocok dengan filter.</td></tr>`;

    return `
      <div>
        <!-- Controls Bar -->
        <div class="hud-card" style="padding: 12px 18px; margin-bottom: 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap: 10px;">
          <div style="display:flex; align-items:center; gap: 8px; flex: 1; min-width: 260px;">
            <input 
              type="text" 
              class="cyber-input" 
              style="padding: 6px 12px; font-size: 0.82rem; flex:1;" 
              placeholder="Cari user, modul, atau keputusan..."
              value="${this.searchQuery}"
              oninput="window.adminManager.searchQuery = this.value; window.adminManager.render();"
            />
            <select 
              class="cyber-input" 
              style="padding: 6px 10px; font-size: 0.8rem; width: auto;"
              onchange="window.adminManager.filterStatus = this.value; window.adminManager.render();"
            >
              <option value="ALL">Semua Status</option>
              <option value="SECURED">SECURED</option>
              <option value="BREACH_PREVENTED">BREACH_PREVENTED</option>
              <option value="COMPROMISED">COMPROMISED</option>
              <option value="THREAT_IDENTIFIED">THREAT_IDENTIFIED</option>
            </select>
          </div>

          <div style="display:flex; gap: 6px;">
            <button class="cyber-btn btn-ghost" style="padding: 6px 12px; font-size: 0.78rem;" onclick="window.adminManager.exportLogs()">
              📥 Ekspor Log
            </button>
            <button class="cyber-btn btn-danger" style="padding: 6px 12px; font-size: 0.78rem;" onclick="window.adminManager.clearLogs()">
              🗑️ Bersihkan
            </button>
          </div>
        </div>

        <!-- Telemetry Table -->
        <div class="hud-card" style="padding: 0; overflow-x: auto;">
          <table class="cyber-table">
            <thead>
              <tr>
                <th>TIMESTAMP</th>
                <th>OPERATOR</th>
                <th>MODUL</th>
                <th>KEPUTUSAN / TINDAKAN</th>
                <th>SKOR VULN</th>
                <th>STATUS</th>
                <th style="width:60px;">AKSI</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* =====================================================================
   * CASE BUILDER MODAL (Create & Update Case for 4 Games)
   * ===================================================================== */
  openCaseBuilderModal(category, caseId = null) {
    window.cyberAudio?.playClick();
    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');
    if (!modalBox || !modalContent) return;

    const targetKey = 'cases_' + category;
    const existingCase = caseId ? (window.app?.db?.[targetKey] || []).find(c => (c.id || '') == caseId) : null;

    let categoryFields = '';

    if (category === 'kasus') {
      const step1 = existingCase?.story_steps?.[0] || {};
      const choices = step1.choices || [];
      categoryFields = `
        <div style="background: rgba(0, 243, 255, 0.03); border: 1px solid rgba(0, 243, 255, 0.18); border-radius: 8px; padding: 14px; margin-bottom: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div>
              <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--neon-cyan); margin-bottom:6px;">
                <span>🎯</span> TIPE SERANGAN
              </label>
              <select id="cb-kasus-type" class="cyber-input" style="width:100%; padding:9px 12px;">
                <option value="phishing" ${existingCase?.type === 'phishing' ? 'selected' : ''}>🎣 Phishing (Rekayasa Tautan & Hadiah)</option>
                <option value="lovescam" ${existingCase?.type === 'lovescam' ? 'selected' : ''}>💔 Love Scam (Manipulasi Asmara)</option>
                <option value="jobscam" ${existingCase?.type === 'jobscam' ? 'selected' : ''}>💼 Job Scam (Loker Palsu & Fee Deposit)</option>
              </select>
            </div>
            <div>
              <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--neon-cyan); margin-bottom:6px;">
                <span>👤</span> IDENTITAS PENGIRIM
              </label>
              <input type="text" id="cb-kasus-sender" class="cyber-input" value="${step1.sender || ''}" placeholder="contoh: Beasiswa Global <alert@scholarship-id.mock>" style="width:100%; padding:9px 12px;" required>
            </div>
          </div>
          <div style="margin-bottom: 14px;">
            <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--neon-cyan); margin-bottom:6px;">
              <span>💬</span> TRANSMISI PESAN PENYERANG (PAYLOAD)
            </label>
            <textarea id="cb-kasus-message" class="cyber-input" style="width:100%; height:80px; line-height:1.45; font-size:0.88rem; padding:10px 12px;" placeholder="Tuliskan pesan manipulasi psikologis / urgency yang dikirim pelaku..." required>${step1.message || ''}</textarea>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div style="background: rgba(255, 51, 102, 0.05); border: 1px solid rgba(255, 51, 102, 0.3); border-radius: 6px; padding: 12px;">
              <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--neon-red); margin-bottom:6px;">
                <span>⚠️</span> OPSI A (KEPUTUSAN BERISIKO / JEBAKAN)
              </label>
              <input type="text" id="cb-kasus-choice-a" class="cyber-input" value="${choices[0]?.text || ''}" placeholder="contoh: Klik tautan dan verifikasi password akun" style="width:100%; margin-bottom:6px; font-size:0.86rem;" required>
              <input type="text" id="cb-kasus-feedback-a" class="cyber-input" value="${choices[0]?.feedback || ''}" placeholder="Debrief kesalahan: Akun berhasil disusupi hacker!" style="width:100%; font-size:0.82rem; color:var(--text-muted);">
            </div>
            <div style="background: rgba(0, 255, 136, 0.05); border: 1px solid rgba(0, 255, 136, 0.3); border-radius: 6px; padding: 12px;">
              <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--neon-green); margin-bottom:6px;">
                <span>🛡️</span> OPSI B (KEPUTUSAN AMAN / TEPAT)
              </label>
              <input type="text" id="cb-kasus-choice-b" class="cyber-input" value="${choices[1]?.text || ''}" placeholder="contoh: Abaikan pesan dan verifikasi via kanal resmi" style="width:100%; margin-bottom:6px; font-size:0.86rem;" required>
              <input type="text" id="cb-kasus-feedback-b" class="cyber-input" value="${choices[1]?.feedback || ''}" placeholder="Debrief keberhasilan: Pertahanan Zero-Trust berhasil!" style="width:100%; font-size:0.82rem; color:var(--text-muted);">
            </div>
          </div>
        </div>
      `;
    } else if (category === 'diff') {
      const left = existingCase?.left_card || {};
      const right = existingCase?.right_card || {};
      categoryFields = `
        <div style="background: rgba(0, 243, 255, 0.03); border: 1px solid rgba(0, 243, 255, 0.18); border-radius: 8px; padding: 14px; margin-bottom: 16px;">
          <div style="margin-bottom: 14px;">
            <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--neon-cyan); margin-bottom:6px;">
              <span>⚖️</span> DESKRIPSI SKENARIO PERBANDINGAN
            </label>
            <input type="text" id="cb-diff-scenario" class="cyber-input" value="${existingCase?.scenario || ''}" placeholder="contoh: Dua notifikasi konfirmasi perubahan kata sandi perbankan." style="width:100%; padding:9px 12px;" required>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div style="background: rgba(0,243,255,0.06); padding: 12px; border-radius: 6px; border: 1px solid var(--border-cyan);">
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                <strong style="color:var(--neon-cyan); font-size:0.82rem; letter-spacing:0.5px;">DOKUMEN KIRI (A)</strong>
                <span class="cyber-tag tag-cyan" style="font-size:0.65rem;">SISI A</span>
              </div>
              <input type="text" id="cb-diff-left-title" class="cyber-input" value="${left.title || ''}" placeholder="Judul Dokumen A" style="width:100%; margin-bottom: 8px;" required>
              <input type="text" id="cb-diff-left-sender" class="cyber-input" value="${left.sender || ''}" placeholder="Alamat Pengirim / URL A" style="width:100%; margin-bottom: 8px;" required>
              <textarea id="cb-diff-left-content" class="cyber-input" placeholder="Rincian konten atau elemen Skenario A..." style="width:100%; height:65px; font-size:0.84rem;">${left.content || ''}</textarea>
            </div>
            <div style="background: rgba(189,0,255,0.06); padding: 12px; border-radius: 6px; border: 1px solid var(--border-magenta);">
              <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                <strong style="color:var(--neon-magenta); font-size:0.82rem; letter-spacing:0.5px;">DOKUMEN KANAN (B)</strong>
                <span class="cyber-tag tag-magenta" style="font-size:0.65rem;">SISI B</span>
              </div>
              <input type="text" id="cb-diff-right-title" class="cyber-input" value="${right.title || ''}" placeholder="Judul Dokumen B" style="width:100%; margin-bottom: 8px;" required>
              <input type="text" id="cb-diff-right-sender" class="cyber-input" value="${right.sender || ''}" placeholder="Alamat Pengirim / URL B" style="width:100%; margin-bottom: 8px;" required>
              <textarea id="cb-diff-right-content" class="cyber-input" placeholder="Rincian konten atau elemen Skenario B..." style="width:100%; height:65px; font-size:0.84rem;">${right.content || ''}</textarea>
            </div>
          </div>
          <div style="display:grid; grid-template-columns: 1.2fr 1.8fr; gap: 12px;">
            <div>
              <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--neon-amber); margin-bottom:6px;">
                <span>🎯</span> KUNCI JAWABAN BENAR
              </label>
              <select id="cb-diff-correct" class="cyber-input" style="width:100%; padding:9px 12px;">
                <option value="left" ${existingCase?.correct_choice === 'left' ? 'selected' : ''}>Sisi Kiri (A) adalah REAL, Kanan (B) FAKE</option>
                <option value="right" ${existingCase?.correct_choice === 'right' ? 'selected' : ''}>Sisi Kanan (B) adalah REAL, Kiri (A) FAKE</option>
              </select>
            </div>
            <div>
              <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--text-muted); margin-bottom:6px;">
                <span>🔬</span> PENJELASAN FORENSIK PEMBEDA
              </label>
              <input type="text" id="cb-diff-explanation" class="cyber-input" value="${existingCase?.explanation || ''}" placeholder="Alasan taktis mengapa dokumen fake terdeteksi penipuan..." style="width:100%; padding:9px 12px;">
            </div>
          </div>
        </div>
      `;
    } else if (category === 'criminal') {
      const clues = existingCase?.clues || [];
      categoryFields = `
        <div style="background: rgba(0, 243, 255, 0.03); border: 1px solid rgba(0, 243, 255, 0.18); border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <!-- Metadata Operasi -->
          <div style="display:grid; grid-template-columns: 1.4fr 1.2fr 0.9fr; gap: 12px; margin-bottom: 16px;">
            <div>
              <label style="display:flex; align-items:center; gap:5px; font-size:0.75rem; font-weight:700; color:var(--neon-cyan); margin-bottom:6px;">
                <span>🎯</span> TARGET KORBAN
              </label>
              <input type="text" id="cb-crim-victim" class="cyber-input" value="${existingCase?.victim || ''}" placeholder="contoh: PT Orion Logistik Semesta (Finance Dept)" style="width:100%; padding:9px 12px;" required>
            </div>
            <div>
              <label style="display:flex; align-items:center; gap:5px; font-size:0.75rem; font-weight:700; color:var(--neon-red); margin-bottom:6px;">
                <span>💰</span> POTENSI KERUGIAN
              </label>
              <input type="text" id="cb-crim-loss" class="cyber-input" value="${existingCase?.potential_loss || 'Rp 45.000.000'}" placeholder="Rp 45.000.000" style="width:100%; padding:9px 12px; border-color: rgba(255,51,102,0.4);" required>
            </div>
            <div>
              <label style="display:flex; align-items:center; gap:5px; font-size:0.75rem; font-weight:700; color:var(--neon-amber); margin-bottom:6px;">
                <span>⏱️</span> WAKTU (DETIK)
              </label>
              <input type="number" id="cb-crim-timer" class="cyber-input" value="${existingCase?.timer_seconds || 90}" min="30" max="300" style="width:100%; padding:9px 12px; border-color: rgba(255,184,0,0.4);" required>
            </div>
          </div>

          <!-- 4 Kunci Dakwaan Forensik Cards -->
          <div style="margin-top: 14px; border-top: 1px dashed rgba(0, 243, 255, 0.2); padding-top: 14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
              <div style="font-size:0.78rem; color:var(--neon-cyan); font-weight:700; letter-spacing:0.6px; display:flex; align-items:center; gap:6px;">
                <span>🔍</span> 4 KUNCI DAKWAAN FORENSIK (WAJIB LENGKAP)
              </div>
              <span style="font-size:0.7rem; color:var(--text-muted); font-family:var(--font-mono);">4 Elemen Rantai Bukti Digital</span>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 9px;">
              <div style="display:flex; align-items:center; gap: 10px; background: rgba(5,5,10,0.5); padding: 7px 12px; border-radius: 6px; border: 1px solid rgba(0,243,255,0.2);">
                <span class="cyber-tag tag-cyan" style="font-size:0.68rem; min-width: 95px; text-align:center; padding: 4px 6px;">01 // AKTOR</span>
                <input type="text" id="cb-crim-clue-actor" class="cyber-input" value="${clues[0]?.description || ''}" placeholder="Sumber / Aktor (contoh: Log koneksi berasal dari proxy terbuka: 198.51.100.42)" style="width:100%;" required>
              </div>
              <div style="display:flex; align-items:center; gap: 10px; background: rgba(5,5,10,0.5); padding: 7px 12px; border-radius: 6px; border: 1px solid rgba(189,0,255,0.25);">
                <span class="cyber-tag tag-magenta" style="font-size:0.68rem; min-width: 95px; text-align:center; padding: 4px 6px;">02 // VEKTOR</span>
                <input type="text" id="cb-crim-clue-vector" class="cyber-input" value="${clues[1]?.description || ''}" placeholder="Vektor Serangan (contoh: Surel spoofing display name 'Direktur Utama')" style="width:100%;" required>
              </div>
              <div style="display:flex; align-items:center; gap: 10px; background: rgba(5,5,10,0.5); padding: 7px 12px; border-radius: 6px; border: 1px solid rgba(255,51,102,0.25);">
                <span class="cyber-tag tag-red" style="font-size:0.68rem; min-width: 95px; text-align:center; padding: 4px 6px;">03 // ANOMALI</span>
                <input type="text" id="cb-crim-clue-redflag" class="cyber-input" value="${clues[2]?.description || ''}" placeholder="Red Flag Kritis (contoh: Invoice melampirkan rekening baru di Bank Gelap)" style="width:100%;" required>
              </div>
              <div style="display:flex; align-items:center; gap: 10px; background: rgba(5,5,10,0.5); padding: 7px 12px; border-radius: 6px; border: 1px solid rgba(0,255,136,0.25);">
                <span class="cyber-tag tag-green" style="font-size:0.68rem; min-width: 95px; text-align:center; padding: 4px 6px;">04 // MITIGASI</span>
                <input type="text" id="cb-crim-clue-mitigation" class="cyber-input" value="${clues[3]?.description || ''}" placeholder="Tindakan Mitigasi (contoh: Lakukan konfirmasi langsung via telepon terenkripsi)" style="width:100%;" required>
              </div>
            </div>
          </div>

          <!-- Debrief Resmi -->
          <div style="margin-top: 14px;">
            <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--text-muted); margin-bottom:6px;">
              <span>📋</span> DEBRIEF RESMI & ANALISIS TAKTIS
            </label>
            <textarea id="cb-crim-debrief" class="cyber-input" placeholder="Ringkasan ulasan evaluasi setelah dakwaan forensik berhasil dipecahkan..." style="width:100%; height:75px; line-height: 1.45; font-size:0.86rem; padding: 10px 12px;">${existingCase?.debrief || ''}</textarea>
          </div>
        </div>
      `;
    } else if (category === 'deeplearn') {
      categoryFields = `
        <div style="background: rgba(0, 243, 255, 0.03); border: 1px solid rgba(0, 243, 255, 0.18); border-radius: 8px; padding: 14px; margin-bottom: 16px;">
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div>
              <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--neon-magenta); margin-bottom:6px;">
                <span>⚠️</span> TINGKAT ANCAMAN
              </label>
              <select id="cb-deep-threat" class="cyber-input" style="width:100%; padding:9px 12px;">
                <option value="CRITICAL_SCAM" ${existingCase?.threat_level === 'CRITICAL_SCAM' ? 'selected' : ''}>🔴 CRITICAL_SCAM (Penipuan Berbahaya)</option>
                <option value="SUSPICIOUS" ${existingCase?.threat_level === 'SUSPICIOUS' ? 'selected' : ''}>🟡 SUSPICIOUS (Mencurigakan)</option>
                <option value="SAFE" ${existingCase?.threat_level === 'SAFE' ? 'selected' : ''}>🟢 SAFE (Aman / Sah)</option>
              </select>
            </div>
            <div>
              <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--neon-cyan); margin-bottom:6px;">
                <span>🔑</span> KATA KUNCI WAJIB (PISAHKAN KOMA)
              </label>
              <input type="text" id="cb-deep-keywords" class="cyber-input" value="${(existingCase?.min_keywords_required || []).join(', ')}" placeholder="contoh: private key, domain, urgensi" style="width:100%; padding:9px 12px;" required>
            </div>
          </div>
          <div style="margin-bottom: 14px;">
            <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--neon-cyan); margin-bottom:6px;">
              <span>📄</span> DOKUMEN TRANSMISI ANALISIS
            </label>
            <textarea id="cb-deep-text" class="cyber-input" style="width:100%; height:95px; line-height:1.45; font-size:0.86rem; padding:10px 12px;" placeholder="Tuliskan isi email atau pesan siber yang harus dievaluasi oleh Gemini AI..." required>${existingCase?.scenario_text || ''}</textarea>
          </div>
          <div>
            <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--text-muted); margin-bottom:6px;">
              <span>🚩</span> INDIKATOR RED FLAG (PISAHKAN KOMA)
            </label>
            <input type="text" id="cb-deep-indicators" class="cyber-input" value="${(existingCase?.target_indicators || []).join(', ')}" placeholder="contoh: Permintaan kredensial, Batas waktu panik, Domain palsu" style="width:100%; padding:9px 12px;">
          </div>
        </div>
      `;
    }

    // Apply roomy responsive container sizing to modal box
    const modalBoxContainer = modalBox.querySelector('.cyber-modal-box');
    if (modalBoxContainer) {
      modalBoxContainer.style.maxWidth = 'min(860px, 94vw)';
      modalBoxContainer.style.width = '100%';
      modalBoxContainer.style.padding = '24px 28px';
    }

    modalContent.innerHTML = `
      <div style="max-height: 84vh; overflow-y: auto; padding: 2px 4px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-cyan); padding-bottom: 12px; margin-bottom: 16px;">
          <div style="display:flex; align-items:center; gap: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 8px; background: rgba(0,243,255,0.1); border: 1px solid var(--neon-cyan); display:flex; align-items:center; justify-content:center; font-size: 1.35rem; box-shadow: 0 0 15px rgba(0,243,255,0.2);">
              ⚙️
            </div>
            <div>
              <h3 style="font-size: 1.22rem; font-family: var(--font-display); letter-spacing: 0.8px; color: var(--neon-cyan); margin:0;">
                ${existingCase ? 'EDIT SKENARIO KASUS' : 'TAMBAH KASUS BARU'}
              </h3>
              <div style="display:flex; gap:6px; align-items:center; margin-top: 3px;">
                <span class="cyber-tag tag-magenta" style="font-size:0.68rem; font-weight:700;">GIM: ${category.toUpperCase()}</span>
                <span class="cyber-tag" style="font-size:0.68rem; border-color: rgba(255,255,255,0.2); color: var(--text-muted);">${caseId ? 'ID: ' + caseId : 'DRAFT KUSTOM'}</span>
              </div>
            </div>
          </div>
          <button type="button" class="cyber-btn btn-ghost" style="padding: 6px 12px; font-size: 1.1rem; border-radius: 6px;" onclick="document.getElementById('modal-general-box').classList.remove('active')">✕</button>
        </div>

        <form id="form-case-builder" onsubmit="window.adminManager.submitCaseBuilder(event, '${category}', '${caseId || ''}')">
          <div style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div>
              <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--text-highlight); margin-bottom:6px; letter-spacing:0.5px;">
                <span>🏷️</span> JUDUL SKENARIO
              </label>
              <input type="text" id="cb-common-title" class="cyber-input" value="${existingCase?.title || ''}" placeholder="contoh: Operasi Phantom Wire. Pembobolan Transaksi Korporat" style="width:100%; font-size: 0.92rem; padding: 10px 12px;" required>
            </div>
            <div>
              <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--text-highlight); margin-bottom:6px; letter-spacing:0.5px;">
                <span>📊</span> TINGKAT KESULITAN
              </label>
              <select id="cb-common-difficulty" class="cyber-input" style="width:100%; font-size: 0.92rem; padding: 10px 12px;">
                <option value="Mudah" ${existingCase?.difficulty === 'Mudah' ? 'selected' : ''}>🟢 Mudah</option>
                <option value="Sedang" ${!existingCase || existingCase?.difficulty === 'Sedang' ? 'selected' : ''}>🟡 Sedang</option>
                <option value="Sulit" ${existingCase?.difficulty === 'Sulit' ? 'selected' : ''}>🔴 Sulit</option>
              </select>
            </div>
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display:flex; align-items:center; gap:6px; font-size:0.75rem; font-weight:700; color:var(--text-muted); margin-bottom:6px; letter-spacing:0.5px;">
              <span>📝</span> DESKRIPSI RINGKAS SKENARIO
            </label>
            <input type="text" id="cb-common-subtitle" class="cyber-input" value="${existingCase?.subtitle || existingCase?.scenario || ''}" placeholder="contoh: Skenario investigasi taktis oleh Administrator" style="width:100%; padding: 10px 12px;" required>
          </div>

          ${categoryFields}

          <div style="display:flex; justify-content:flex-end; gap: 12px; margin-top: 18px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px; flex-wrap:wrap;">
            <button type="button" class="cyber-btn btn-ghost" style="padding: 10px 20px; font-size: 0.88rem;" onclick="document.getElementById('modal-general-box').classList.remove('active')">
              ✕ Batal
            </button>
            <button type="submit" class="cyber-btn" style="background: var(--neon-cyan); color: #05050A; font-weight: 700; padding: 10px 24px; font-size: 0.88rem; box-shadow: 0 0 20px var(--neon-cyan-dim);">
              💾 ${existingCase ? 'Perbarui Skenario Kasus' : 'Simpan Skenario Kasus'}
            </button>
          </div>
        </form>
      </div>
    `;

    modalBox.classList.add('active');
  }

  async submitCaseBuilder(e, category, caseId) {
    e.preventDefault();
    const commonTitle = document.getElementById('cb-common-title')?.value.trim();
    const commonSubtitle = document.getElementById('cb-common-subtitle')?.value.trim();
    const commonDiff = document.getElementById('cb-common-difficulty')?.value || 'Sedang';

    if (!commonTitle) return;

    const newId = caseId || (category.toUpperCase().substring(0, 4) + '-CUST-' + Math.floor(Math.random() * 899 + 100));
    let newCase = {
      id: newId,
      type: 'custom',
      title: commonTitle,
      subtitle: commonSubtitle,
      difficulty: commonDiff,
      is_custom: true,
      custom_author: 'Administrator',
      created_at: new Date().toISOString()
    };

    if (category === 'kasus') {
      const type = document.getElementById('cb-kasus-type')?.value || 'phishing';
      const sender = document.getElementById('cb-kasus-sender')?.value || 'Sender <alert@custom.mock>';
      const message = document.getElementById('cb-kasus-message')?.value || 'Pesan transmisi kustom.';
      const choiceA = document.getElementById('cb-kasus-choice-a')?.value || 'Percayai pesan';
      const feedbackA = document.getElementById('cb-kasus-feedback-a')?.value || 'Keputusan berisiko!';
      const choiceB = document.getElementById('cb-kasus-choice-b')?.value || 'Verifikasi mandiri';
      const feedbackB = document.getElementById('cb-kasus-feedback-b')?.value || 'Keputusan tepat!';

      newCase.type = type;
      newCase.pov_options = [
        { id: 'victim', label: 'Sudut Pandang Target', avatar: '👤' },
        { id: 'hunter', label: 'Sudut Pandang Investigator', avatar: '🕵️' }
      ];
      newCase.story_steps = [
        {
          step: 1,
          sender: sender,
          message: message,
          context: commonSubtitle,
          clues: ['Indikator domain kustom', 'Manipulasi emosi dan urgensi'],
          choices: [
            { id: 'A', text: choiceA, score: 0, vulnerability_delta: 2.0, feedback: feedbackA, status: 'COMPROMISED' },
            { id: 'B', text: choiceB, score: 100, vulnerability_delta: -1.2, feedback: feedbackB, status: 'SECURED' }
          ]
        }
      ];
    } else if (category === 'diff') {
      const scenario = document.getElementById('cb-diff-scenario')?.value || commonSubtitle;
      const leftTitle = document.getElementById('cb-diff-left-title')?.value || 'Dokumen A';
      const leftSender = document.getElementById('cb-diff-left-sender')?.value || 'resmi@portal.mock';
      const leftContent = document.getElementById('cb-diff-left-content')?.value || 'Isi dokumen A';
      const rightTitle = document.getElementById('cb-diff-right-title')?.value || 'Dokumen B';
      const rightSender = document.getElementById('cb-diff-right-sender')?.value || 'palsu@portal.xyz.mock';
      const rightContent = document.getElementById('cb-diff-right-content')?.value || 'Isi dokumen B';
      const correctChoice = document.getElementById('cb-diff-correct')?.value || 'left';
      const explanation = document.getElementById('cb-diff-explanation')?.value || 'Analisis forensik skenario.';

      const leftIsReal = (correctChoice === 'left');

      newCase.category = commonTitle;
      newCase.scenario = scenario;
      newCase.left_card = {
        title: leftTitle,
        sender: leftSender,
        content: leftContent,
        is_real: leftIsReal,
        indicators: leftIsReal ? ['Domain terverifikasi', 'SSL valid'] : ['Domain typosquatting', 'Urgensi palsu']
      };
      newCase.right_card = {
        title: rightTitle,
        sender: rightSender,
        content: rightContent,
        is_real: !leftIsReal,
        indicators: !leftIsReal ? ['Domain terverifikasi', 'SSL valid'] : ['Domain typosquatting', 'Urgensi palsu']
      };
      newCase.correct_choice = correctChoice;
      newCase.explanation = explanation;
    } else if (category === 'criminal') {
      const victim = document.getElementById('cb-crim-victim')?.value || 'Nasabah Finansial';
      const loss = document.getElementById('cb-crim-loss')?.value || 'Rp 50.000.000';
      const timerSecs = parseInt(document.getElementById('cb-crim-timer')?.value) || 90;
      const actor = document.getElementById('cb-crim-clue-actor')?.value || 'Server Relay 103.xx';
      const vector = document.getElementById('cb-crim-clue-vector')?.value || 'Phishing Form';
      const redflag = document.getElementById('cb-crim-clue-redflag')?.value || 'Permintaan OTP';
      const mitigation = document.getElementById('cb-crim-clue-mitigation')?.value || 'Freeze Akun';
      const debrief = document.getElementById('cb-crim-debrief')?.value || 'Operasi berhasil mengungkap anatomi kejahatan.';

      newCase.victim = victim;
      newCase.potential_loss = loss;
      newCase.timer_seconds = timerSecs;
      newCase.debrief = debrief;
      newCase.clues = [
        { id: 'clue-1', title: 'Sumber Serangan', description: actor },
        { id: 'clue-2', title: 'Vektor Serangan', description: vector },
        { id: 'clue-3', title: 'Red Flag Kritis', description: redflag },
        { id: 'clue-4', title: 'Strategi Mitigasi', description: mitigation },
        { id: 'clue-dist-1', title: 'Distraksi: Log Jaringan', description: 'Informasi distraksi non-relevan' }
      ];
      newCase.required_slots = {
        actor_origin: 'clue-1',
        attack_vector: 'clue-2',
        critical_redflag: 'clue-3',
        intervention_strategy: 'clue-4'
      };
    } else if (category === 'deeplearn') {
      const threat = document.getElementById('cb-deep-threat')?.value || 'CRITICAL_SCAM';
      const kwsRaw = document.getElementById('cb-deep-keywords')?.value || 'domain, urgensi';
      const text = document.getElementById('cb-deep-text')?.value || 'Dokumen transmisi kustom.';
      const indsRaw = document.getElementById('cb-deep-indicators')?.value || 'Indikator transmisi siber';

      newCase.threat_level = threat;
      newCase.scenario_text = text;
      newCase.min_keywords_required = kwsRaw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
      newCase.target_indicators = indsRaw.split(',').map(s => s.trim()).filter(Boolean);
    }

    const targetKey = 'cases_' + category;
    if (window.app?.db && window.app.db[targetKey]) {
      const existingIdx = window.app.db[targetKey].findIndex(c => (c.id || '') == newId);
      if (existingIdx !== -1) {
        window.app.db[targetKey][existingIdx] = newCase;
      } else {
        window.app.db[targetKey].push(newCase);
      }
    }

    if (category === 'kasus' && window.moduleKasus) window.moduleKasus.init(window.app.db.cases_kasus);
    if (category === 'diff' && window.moduleDiff) window.moduleDiff.init(window.app.db.cases_diff);
    if (category === 'criminal' && window.moduleCriminal) window.moduleCriminal.init(window.app.db.cases_criminal);
    if (category === 'deeplearn' && window.moduleDeepLearning) window.moduleDeepLearning.init(window.app.db.cases_deeplearn);

    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
      await fetch('/api/save_case', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
          'Accept': 'application/json'
        },
        body: JSON.stringify({ category, data: newCase })
      });
    } catch (err) {}

    const modalBox = document.getElementById('modal-general-box');
    if (modalBox) modalBox.classList.remove('active');

    window.cyberAudio?.playSuccess();
    window.app?.showToast(`Skenario "${commonTitle}" berhasil disimpan!`, 'magenta');
    this.render();
  }

  deleteCase(category, id) {
    if (!confirm('Yakin ingin menghapus skenario kasus ini?')) return;

    const targetKey = 'cases_' + category;
    if (window.app?.db && window.app.db[targetKey]) {
      window.app.db[targetKey] = window.app.db[targetKey].filter(i => (i.id || '') != id);
    }

    if (category === 'kasus' && window.moduleKasus) window.moduleKasus.init(window.app.db.cases_kasus);
    if (category === 'diff' && window.moduleDiff) window.moduleDiff.init(window.app.db.cases_diff);
    if (category === 'criminal' && window.moduleCriminal) window.moduleCriminal.init(window.app.db.cases_criminal);
    if (category === 'deeplearn' && window.moduleDeepLearning) window.moduleDeepLearning.init(window.app.db.cases_deeplearn);

    const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
    fetch('/api/delete_case', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
      body: JSON.stringify({ category, id })
    }).catch(() => {});

    window.app?.showToast('Kasus berhasil dihapus.', 'magenta');
    this.render();
  }

  /* =====================================================================
   * EDUKASI MODAL & CRUD
   * ===================================================================== */
  openEdukasiModal(topicId = null) {
    window.cyberAudio?.playClick();
    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');
    if (!modalBox || !modalContent) return;

    const topic = topicId ? (window.edukasiManager?.topics || []).find(t => t.id === topicId) : null;

    modalContent.innerHTML = `
      <div style="max-height: 80vh; overflow-y: auto; padding: 4px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-cyan); padding-bottom: 10px; margin-bottom: 14px;">
          <div style="display:flex; align-items:center; gap: 8px;">
            <span style="font-size: 1.4rem;">📚</span>
            <div>
              <h3 style="font-size: 1.15rem; color: var(--neon-cyan); margin:0;">
                ${topic ? 'EDIT MATERI EDUKASI' : 'TAMBAH MATERI EDUKASI & KUIS'}
              </h3>
              <span class="cyber-tag tag-cyan" style="font-size:0.65rem;">MODUL PEMBELAJARAN</span>
            </div>
          </div>
          <button class="cyber-btn btn-ghost" style="padding: 4px 10px;" onclick="document.getElementById('modal-general-box').classList.remove('active')">✕</button>
        </div>

        <form id="form-edukasi" onsubmit="window.adminManager.submitEdukasiForm(event, '${topicId || ''}')">
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px; margin-bottom: 12px;">
            <div>
              <label style="display:block; font-size:0.75rem; color:var(--text-highlight); margin-bottom:4px;">JUDUL MATERI</label>
              <input type="text" id="edu-title" class="cyber-input" value="${topic?.title || ''}" placeholder="contoh: Perlindungan Rekening dari Serangan SIM Swap" style="width:100%;" required>
            </div>
            <div>
              <label style="display:block; font-size:0.75rem; color:var(--text-highlight); margin-bottom:4px;">SUBBAB</label>
              <select id="edu-category" class="cyber-input" style="width:100%;">
                <option value="1. PENDAHULUAN" ${topic?.category === '1. PENDAHULUAN' ? 'selected' : ''}>1. PENDAHULUAN</option>
                <option value="2. ANATOMI PENIPUAN" ${topic?.category === '2. ANATOMI PENIPUAN' ? 'selected' : ''}>2. ANATOMI PENIPUAN</option>
                <option value="3. KEPUTUSAN AMAN" ${topic?.category === '3. KEPUTUSAN AMAN' ? 'selected' : ''}>3. KEPUTUSAN AMAN</option>
                <option value="4. RESPON & DARURAT" ${topic?.category === '4. RESPON & DARURAT' ? 'selected' : ''}>4. RESPON & DARURAT</option>
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
            <div>
              <label style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">WAKTU BACA</label>
              <input type="text" id="edu-read-time" class="cyber-input" value="${topic?.readingTime || '3 menit'}" placeholder="3 menit" style="width:100%;">
            </div>
            <div>
              <label style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">BADGE</label>
              <input type="text" id="edu-badge" class="cyber-input" value="${topic?.badge || 'Penting'}" placeholder="Kritis / Dasar" style="width:100%;">
            </div>
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display:block; font-size:0.75rem; color:var(--neon-cyan); margin-bottom:4px;">RINGKASAN PENGANTAR</label>
            <textarea id="edu-lead" class="cyber-input" style="width:100%; height:55px;" placeholder="Penjelasan ringkas pembuka materi..." required>${topic?.lead || 'Panduan praktis perlindungan data dan pertahanan siber.'}</textarea>
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display:block; font-size:0.75rem; color:var(--neon-cyan); margin-bottom:4px;">POIN MATERI UTAMA</label>
            <textarea id="edu-body" class="cyber-input" style="width:100%; height:80px;" placeholder="Tuliskan poin edukasi utama..." required>${topic?.content || '1. Jangan bagikan OTP kepada siapa pun.\n2. Aktifkan verifikasi dua langkah (2FA).\n3. Verifikasi selalu via kanal resmi.'}</textarea>
          </div>

          <!-- Kuis Mini -->
          <div style="background: rgba(0,243,255,0.04); padding: 10px; border-radius: 4px; border: 1px solid var(--border-cyan); margin-bottom: 12px;">
            <div style="font-size:0.78rem; color:var(--neon-cyan); font-weight:700; margin-bottom: 6px;">PERTANYAAN KUIS KILAT:</div>
            <input type="text" id="edu-quiz-q" class="cyber-input" value="${topic?.quiz?.question || ''}" placeholder="Pertanyaan kuis..." style="width:100%; margin-bottom:5px;" required>
            <input type="text" id="edu-quiz-opt-correct" class="cyber-input" value="${topic?.quiz?.correct || ''}" placeholder="Pilihan Benar (Kunci Jawaban)" style="width:100%; margin-bottom:4px; border-color:var(--neon-green);" required>
            <input type="text" id="edu-quiz-opt-wrong1" class="cyber-input" value="${topic?.quiz?.wrong1 || ''}" placeholder="Pilihan Salah 1" style="width:100%; margin-bottom:4px;" required>
            <input type="text" id="edu-quiz-opt-wrong2" class="cyber-input" value="${topic?.quiz?.wrong2 || ''}" placeholder="Pilihan Salah 2" style="width:100%; margin-bottom:5px;" required>
            <input type="text" id="edu-quiz-feedback" class="cyber-input" value="${topic?.quiz?.feedback || ''}" placeholder="Feedback edukatif..." style="width:100%;">
          </div>

          <div style="display:flex; justify-content:flex-end; gap: 10px; margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
            <button type="button" class="cyber-btn btn-ghost" onclick="document.getElementById('modal-general-box').classList.remove('active')">
              Batal
            </button>
            <button type="submit" class="cyber-btn" style="background: var(--neon-cyan); color: #05050A;">
              💾 Simpan Materi
            </button>
          </div>
        </form>
      </div>
    `;

    modalBox.classList.add('active');
  }

  async submitEdukasiForm(e, topicId) {
    e.preventDefault();
    const title = document.getElementById('edu-title')?.value.trim();
    const category = document.getElementById('edu-category')?.value || '1. PENDAHULUAN';
    const readingTime = document.getElementById('edu-read-time')?.value.trim() || '3 menit';
    const badge = document.getElementById('edu-badge')?.value.trim() || 'Modul';
    const lead = document.getElementById('edu-lead')?.value.trim() || '';
    const bodyText = document.getElementById('edu-body')?.value.trim() || '';

    const quizQ = document.getElementById('edu-quiz-q')?.value.trim();
    const quizCorrect = document.getElementById('edu-quiz-opt-correct')?.value.trim();
    const quizWrong1 = document.getElementById('edu-quiz-opt-wrong1')?.value.trim();
    const quizWrong2 = document.getElementById('edu-quiz-opt-wrong2')?.value.trim();
    const quizFeedback = document.getElementById('edu-quiz-feedback')?.value.trim() || 'Jawaban tepat!';

    if (!title) return;

    const id = topicId || ('edu_' + Date.now().toString(36));
    const paragraphs = bodyText.split('\n').filter(Boolean).map(p => `<p style="margin-bottom:8px;">${p}</p>`).join('');
    
    const articleHtml = `
      <div class="edu-article">
        <div class="edu-header-box">
          <span class="cyber-tag tag-cyan">${category.toUpperCase()}</span>
          <h2>${title}</h2>
          <p class="edu-lead">${lead}</p>
        </div>

        <div class="edu-section">
          <h3>Panduan Utama:</h3>
          <div class="w3-info-box">
            ${paragraphs}
          </div>
        </div>

        <div class="edu-section">
          <div class="w3-quiz-card">
            <div class="quiz-badge">KUIS KILAT INTELIJEN</div>
            <h4>${quizQ || 'Bagaimana langkah pertahanan terbaik?'}</h4>
            <div class="quiz-options">
              <button class="quiz-opt" onclick="window.edukasiManager.answerQuiz(this, true)">A. ${quizCorrect || 'Verifikasi mandiri via kanal resmi'}</button>
              <button class="quiz-opt" onclick="window.edukasiManager.answerQuiz(this, false)">B. ${quizWrong1 || 'Langsung ikuti instruksi pengirim'}</button>
              <button class="quiz-opt" onclick="window.edukasiManager.answerQuiz(this, false)">C. ${quizWrong2 || 'Kirimkan data rahasia'}</button>
            </div>
            <div class="quiz-feedback"></div>
          </div>
        </div>
      </div>
    `;

    const topicObj = {
      id: id,
      category: category,
      title: title,
      readingTime: readingTime,
      badge: badge,
      lead: lead,
      content: bodyText,
      is_custom: true,
      html: articleHtml,
      quiz: {
        question: quizQ,
        correct: quizCorrect,
        wrong1: quizWrong1,
        wrong2: quizWrong2,
        feedback: quizFeedback
      }
    };

    if (window.edukasiManager) {
      const existingIdx = window.edukasiManager.topics.findIndex(t => t.id === id);
      if (existingIdx !== -1) {
        window.edukasiManager.topics[existingIdx] = topicObj;
      } else {
        window.edukasiManager.topics.push(topicObj);
      }
      window.edukasiManager.renderSidebar();
    }

    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
      await fetch('/api/edukasi/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({ topic: topicObj })
      });
    } catch (err) {}

    const modalBox = document.getElementById('modal-general-box');
    if (modalBox) modalBox.classList.remove('active');

    window.cyberAudio?.playSuccess();
    window.app?.showToast(`Materi "${title}" berhasil disimpan!`, 'success');
    this.render();
  }

  async deleteEdukasiTopic(topicId) {
    if (!confirm('Yakin ingin menghapus materi edukasi ini?')) return;

    if (window.edukasiManager) {
      window.edukasiManager.topics = window.edukasiManager.topics.filter(t => t.id !== topicId);
      window.edukasiManager.renderSidebar();
    }

    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
      await fetch('/api/edukasi/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({ id: topicId })
      });
    } catch (err) {}

    window.app?.showToast('Materi edukasi berhasil dihapus.', 'magenta');
    this.render();
  }

  /* =====================================================================
   * DETECTOR LOG INSPECT & DELETE ACTIONS
   * ===================================================================== */
  openDetectorDetailModal(logId) {
    const logs = window.app?.db?.activity_logs || [];
    const log = logs.find(l => (l.id || '') == logId);
    if (!log) return;

    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');
    if (!modalBox || !modalContent) return;

    modalContent.innerHTML = `
      <div style="padding: 6px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-cyan); padding-bottom: 10px; margin-bottom: 14px;">
          <div style="display:flex; align-items:center; gap: 8px;">
            <span style="font-size: 1.4rem;">🔍</span>
            <div>
              <h3 style="font-size: 1.15rem; color: var(--neon-cyan); margin:0;">RINCIAN EVALUASI DETEKTOR</h3>
              <span class="cyber-tag tag-cyan" style="font-size:0.65rem;">LOG ID: ${log.id}</span>
            </div>
          </div>
          <button class="cyber-btn btn-ghost" style="padding: 4px 10px;" onclick="document.getElementById('modal-general-box').classList.remove('active')">✕</button>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom: 12px;">
          <div style="background: rgba(255,255,255,0.03); padding:10px; border-radius:4px;">
            <div style="font-size:0.7rem; color:var(--text-muted);">PENGUJI / CADET:</div>
            <strong style="color:var(--text-highlight); font-size:0.9rem;">${log.user_name || 'Cadet'}</strong>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding:10px; border-radius:4px;">
            <div style="font-size:0.7rem; color:var(--text-muted);">WAKTU PEMINDAIAN:</div>
            <div style="font-size:0.85rem; color:var(--text-main); font-family:var(--font-mono);">${log.timestamp}</div>
          </div>
        </div>

        <div style="margin-bottom: 12px;">
          <div style="font-size:0.72rem; color:var(--neon-cyan); font-weight:700; margin-bottom:4px;">TARGET EVALUASI:</div>
          <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-cyan); border-radius: 4px; padding: 10px; font-family: var(--font-mono); font-size: 0.85rem; word-break: break-all;">
            ${log.target || log.decision}
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom: 12px;">
          <div style="background: rgba(255,255,255,0.03); padding:10px; border-radius:4px;">
            <div style="font-size:0.7rem; color:var(--text-muted);">MODEL AI DIGUNAKAN:</div>
            <strong style="color:var(--neon-magenta); font-size:0.9rem;">${log.ai_model || log.module || 'Google Gemini 1.5 Flash'}</strong>
          </div>
          <div style="background: rgba(255,255,255,0.03); padding:10px; border-radius:4px;">
            <div style="font-size:0.7rem; color:var(--text-muted);">SKOR RISIKO:</div>
            <span class="cyber-tag ${log.vulnerability_score >= 6.0 ? 'tag-red' : 'tag-green'}">
              ${log.vulnerability_score || '4.0'} / 10 (${log.status || 'SECURED'})
            </span>
          </div>
        </div>

        <div style="margin-bottom: 14px;">
          <div style="font-size:0.72rem; color:var(--text-muted); margin-bottom:4px;">RINGKASAN VONIS:</div>
          <div style="font-size:0.85rem; color:var(--text-main); line-height:1.5;">
            ${log.decision || 'Evaluasi selesai diproses sesuai heuristik keamanan.'}
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button class="cyber-btn" style="padding: 6px 16px; font-size:0.82rem;" onclick="document.getElementById('modal-general-box').classList.remove('active')">
            Tutup
          </button>
        </div>
      </div>
    `;

    modalBox.classList.add('active');
  }

  deleteDetectorLog(logId) {
    if (!confirm('Hapus log detektor ini?')) return;

    if (window.app?.db?.activity_logs) {
      window.app.db.activity_logs = window.app.db.activity_logs.filter(l => (l.id || '') != logId);
    }

    const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
    fetch('/api/delete_log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
      body: JSON.stringify({ id: logId })
    }).catch(() => {});

    window.app?.showToast('Log detektor berhasil dihapus.', 'magenta');
    this.render();
  }

  clearDetectorLogs() {
    if (!confirm('Bersihkan seluruh riwayat pemindaian detektor?')) return;
    if (window.app?.db?.activity_logs) {
      window.app.db.activity_logs = window.app.db.activity_logs.filter(l => {
        const mod = (l.module || '').toUpperCase();
        return !mod.includes('SCANNER') && !mod.includes('CHECKER') && !mod.includes('DETEKTOR') && !mod.includes('LINK');
      });
    }
    window.app?.showToast('Riwayat detektor telah dibersihkan.', 'success');
    this.render();
  }

  /* =====================================================================
   * USER MANAGEMENT & EDIT MODAL
   * ===================================================================== */
  openUserEditModal(userId = null) {
    window.cyberAudio?.playClick();
    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');
    if (!modalBox || !modalContent) return;

    const user = userId ? (window.app?.db?.users || []).find(u => u.id === userId) : null;

    modalContent.innerHTML = `
      <div style="padding: 4px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-cyan); padding-bottom: 10px; margin-bottom: 14px;">
          <div style="display:flex; align-items:center; gap: 8px;">
            <span style="font-size: 1.4rem;">👤</span>
            <div>
              <h3 style="font-size: 1.15rem; color: var(--neon-cyan); margin:0;">
                ${user ? 'EDIT PENGGUNA' : 'TAMBAH PENGGUNA BARU'}
              </h3>
              <span class="cyber-tag tag-cyan" style="font-size:0.65rem;">AKUN SIBER</span>
            </div>
          </div>
          <button class="cyber-btn btn-ghost" style="padding: 4px 10px;" onclick="document.getElementById('modal-general-box').classList.remove('active')">✕</button>
        </div>

        <form id="form-user-edit" onsubmit="window.adminManager.submitUserForm(event, '${userId || ''}')">
          <div style="margin-bottom: 12px;">
            <label style="display:block; font-size:0.75rem; color:var(--text-highlight); margin-bottom:4px;">NAMA LENGKAP</label>
            <input type="text" id="usr-name" class="cyber-input" value="${user?.name || ''}" placeholder="contoh: Cadet Bima" style="width:100%;" required>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom: 12px;">
            <div>
              <label style="display:block; font-size:0.75rem; color:var(--text-highlight); margin-bottom:4px;">USERNAME</label>
              <input type="text" id="usr-username" class="cyber-input" value="${user?.username || ''}" placeholder="cadet_bima" style="width:100%;" ${user ? 'readonly' : 'required'}>
            </div>
            <div>
              <label style="display:block; font-size:0.75rem; color:var(--text-highlight); margin-bottom:4px;">PERAN (ROLE)</label>
              <select id="usr-role" class="cyber-input" style="width:100%;">
                <option value="user" ${user?.role === 'user' ? 'selected' : ''}>User (Regular Cadet)</option>
                <option value="admin" ${user?.role === 'admin' ? 'selected' : ''}>Admin (System Commander)</option>
              </select>
            </div>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom: 12px;">
            <div>
              <label style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">SKOR DEFENSE (XP)</label>
              <input type="number" id="usr-score" class="cyber-input" value="${user?.score || 0}" min="0" style="width:100%;">
            </div>
            <div>
              <label style="display:block; font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">PANGKAT</label>
              <input type="text" id="usr-rank" class="cyber-input" value="${user?.rank || 'Cadet Vanguard'}" placeholder="Cadet Vanguard" style="width:100%;">
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap: 10px; margin-top: 14px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
            <button type="button" class="cyber-btn btn-ghost" onclick="document.getElementById('modal-general-box').classList.remove('active')">
              Batal
            </button>
            <button type="submit" class="cyber-btn" style="background: var(--neon-cyan); color: #05050A;">
              💾 Simpan Akun
            </button>
          </div>
        </form>
      </div>
    `;

    modalBox.classList.add('active');
  }

  async submitUserForm(e, userId) {
    e.preventDefault();
    const name = document.getElementById('usr-name')?.value.trim();
    const username = document.getElementById('usr-username')?.value.trim();
    const role = document.getElementById('usr-role')?.value || 'user';
    const score = parseInt(document.getElementById('usr-score')?.value) || 0;
    const rank = document.getElementById('usr-rank')?.value.trim() || 'Cadet Vanguard';

    if (!name || !username) return;

    const id = userId || ('USR-' + Math.floor(Math.random() * 899 + 100));

    if (window.app?.db?.users) {
      const idx = window.app.db.users.findIndex(u => u.id === id || u.username === username);
      if (idx !== -1) {
        window.app.db.users[idx].name = name;
        window.app.db.users[idx].role = role;
        window.app.db.users[idx].score = score;
        window.app.db.users[idx].rank = rank;
      } else {
        window.app.db.users.push({
          id: id,
          username: username,
          name: name,
          role: role,
          score: score,
          rank: rank,
          modules_completed: 0,
          vulnerability: 3.5,
          game_scores: { kasus: 0, diff: 0, criminal: 0, deeplearn: 0 }
        });
      }
    }

    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
      await fetch('/api/users/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({ id, name, username, role, score, rank })
      });
    } catch (err) {}

    const modalBox = document.getElementById('modal-general-box');
    if (modalBox) modalBox.classList.remove('active');

    window.cyberAudio?.playSuccess();
    window.app?.showToast(`Pengguna "${name}" berhasil disimpan.`, 'success');
    this.render();
  }

  async toggleUserRole(userId, newRole) {
    if (userId === 'USR-001' && newRole === 'user') {
      alert('Akun Administrator utama tidak dapat diubah menjadi user.');
      return;
    }

    if (window.app?.db?.users) {
      const user = window.app.db.users.find(u => u.id === userId);
      if (user) user.role = newRole;
    }

    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
      await fetch('/api/users/update_role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({ id: userId, role: newRole })
      });
    } catch (err) {}

    window.cyberAudio?.playSuccess();
    window.app?.showToast(`Peran pengguna diubah menjadi ${newRole.toUpperCase()}.`, 'success');
    this.render();
  }

  async deleteUser(userId) {
    if (userId === 'USR-001' || userId === 'admin') {
      alert('Akun Administrator utama tidak boleh dihapus.');
      return;
    }

    if (!confirm('Yakin ingin menghapus akun pengguna ini?')) return;

    if (window.app?.db?.users) {
      window.app.db.users = window.app.db.users.filter(u => u.id !== userId);
    }

    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
      await fetch('/api/users/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
        body: JSON.stringify({ id: userId })
      });
    } catch (err) {}

    window.app?.showToast('Pengguna berhasil dihapus.', 'magenta');
    this.render();
  }

  deleteSystemLog(logId) {
    if (window.app?.db?.activity_logs) {
      window.app.db.activity_logs = window.app.db.activity_logs.filter(l => (l.id || '') != logId);
    }
    const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
    fetch('/api/delete_log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
      body: JSON.stringify({ id: logId })
    }).catch(() => {});
    window.app?.showToast('Log aktivitas dihapus.', 'magenta');
    this.render();
  }

  clearLogs() {
    if (!confirm('Bersihkan seluruh log aktivitas sistem?')) return;
    if (window.app?.db) {
      window.app.db.activity_logs = [];
    }
    const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
    fetch('/api/clear_logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf }
    }).catch(() => {});
    window.app?.showToast('Log aktivitas berhasil dibersihkan.', 'success');
    this.render();
  }

  exportLogs() {
    const logs = window.app?.db?.activity_logs || [];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `telemetri_sistem_${Date.now()}.json`);
    dlAnchorElem.click();
    window.app?.showToast('Log aktivitas berhasil diekspor.', 'success');
  }

  exportDetectorLogs() {
    const logs = (window.app?.db?.activity_logs || []).filter(l => {
      const mod = (l.module || '').toUpperCase();
      return mod.includes('SCANNER') || mod.includes('CHECKER') || mod.includes('DETEKTOR') || mod.includes('LINK');
    });
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `log_detektor_${Date.now()}.json`);
    dlAnchorElem.click();
    window.app?.showToast('Log detektor berhasil diekspor.', 'success');
  }
}

window.adminManager = new AdminManager();
