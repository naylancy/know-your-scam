/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * Live Cyber Defense Leaderboard Controller
 * Features:
 * - Real-Time Live Sync (No page reload required)
 * - Per-Game Score Tracking & Total Score Aggregation
 * - Interactive View Toggle (Total Score vs Detail Skor Per Game)
 * - Row Expandable Game Breakdown Mini-Card
 * - Live Polling Stream with Status Indicator
 */

class LeaderboardManager {
  constructor() {
    this.users = [];
    this.currentFilter = 'all'; // 'all', 'sentinel', 'cadet'
    this.viewMode = 'total';    // 'total' or 'detail'
    this.expandedUserId = null; // row expanded for detailed breakdown
    this.pollingTimer = null;
    this.isFetching = false;
    this.lastUpdated = new Date();

    // Listen for real-time score updates from game modules
    window.addEventListener('cyber:score-updated', (e) => {
      if (e.detail?.user) {
        this.updateLiveScore(e.detail.user);
      }
    });

    // Handle route changes to start/stop polling
    window.addEventListener('hashchange', () => {
      this.checkPollingState();
    });
  }

  init(usersData) {
    this.users = (usersData || []).map(u => this.normalizeUser(u));
    this.render();
    this.checkPollingState();
  }

  normalizeUser(u) {
    const rawScores = u.game_scores || {};
    const total = parseInt(u.score) || 0;

    let gameScores = typeof rawScores === 'object' && rawScores !== null ? rawScores : {};
    if (Object.keys(gameScores).length === 0 && total > 0) {
      gameScores = {
        kasus: Math.round(total * 0.30),
        diff: Math.round(total * 0.25),
        criminal: Math.round(total * 0.25),
        deeplearn: Math.round(total * 0.14),
        scanner: Math.round(total * 0.03),
        checker: Math.round(total * 0.03)
      };
    }

    const normalizedScores = {
      kasus: parseInt(gameScores.kasus) || 0,
      diff: parseInt(gameScores.diff) || 0,
      criminal: parseInt(gameScores.criminal) || 0,
      deeplearn: parseInt(gameScores.deeplearn) || 0,
      scanner: parseInt(gameScores.scanner) || 0,
      checker: parseInt(gameScores.checker) || 0
    };

    // Total score is strictly the sum of all game scores
    const computedTotal = Object.values(normalizedScores).reduce((a, b) => a + b, 0);

    return {
      ...u,
      id: u.id || u.user_code || u.username,
      score: computedTotal > 0 ? computedTotal : total,
      game_scores: normalizedScores,
      vulnerability: parseFloat(u.vulnerability || 5.0)
    };
  }

  setFilter(filter) {
    this.currentFilter = filter;
    window.cyberAudio?.playClick();
    this.render();
  }

  setViewMode(mode) {
    this.viewMode = mode;
    window.cyberAudio?.playClick();
    this.render();
  }

  toggleRowExpand(userId) {
    this.expandedUserId = this.expandedUserId === userId ? null : userId;
    window.cyberAudio?.playClick();
    this.render();
  }

  checkPollingState() {
    const isLeaderboardActive = window.location.hash === '#leaderboard';
    if (isLeaderboardActive) {
      this.startLivePolling();
    } else {
      this.stopLivePolling();
    }
  }

  startLivePolling() {
    if (this.pollingTimer) return;
    this.fetchLive();
    this.pollingTimer = setInterval(() => {
      if (window.location.hash === '#leaderboard') {
        this.fetchLive(true);
      }
    }, 3500);
  }

  stopLivePolling() {
    if (this.pollingTimer) {
      clearInterval(this.pollingTimer);
      this.pollingTimer = null;
    }
  }

  async fetchLive(silent = false) {
    if (this.isFetching) return;
    this.isFetching = true;

    try {
      const res = await fetch('/api/leaderboard');
      const json = await res.json();
      if (res.ok && json.status === 'success' && Array.isArray(json.data)) {
        this.users = json.data.map(u => this.normalizeUser(u));
        this.lastUpdated = new Date();
        this.render(silent);
      }
    } catch (e) {
      // Fallback: update from current user session if network fails
      const me = window.authManager?.currentUser;
      if (me) {
        this.updateLiveScore(me);
      }
    } finally {
      this.isFetching = false;
    }
  }

  updateLiveScore(updatedUser) {
    if (!updatedUser) return;
    const normalized = this.normalizeUser(updatedUser);

    const idx = this.users.findIndex(u => (u.id === normalized.id || u.username === normalized.username));
    if (idx !== -1) {
      this.users[idx] = { ...this.users[idx], ...normalized };
    } else {
      this.users.push(normalized);
    }

    this.lastUpdated = new Date();
    this.render(true);
  }

  render(isSilent = false) {
    const container = document.getElementById('leaderboard-container');
    if (!container) return;

    // Sort by Total Score descending, then Vulnerability ascending
    let sorted = [...this.users].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.vulnerability - b.vulnerability;
    });

    if (this.currentFilter === 'sentinel') {
      sorted = sorted.filter(u => u.vulnerability <= 2.5);
    } else if (this.currentFilter === 'cadet') {
      sorted = sorted.filter(u => u.role === 'user');
    }

    const currentUserId = window.authManager?.currentUser?.id;
    const currentUsername = window.authManager?.currentUser?.username;
    const isDetailView = this.viewMode === 'detail';

    const timeStr = this.lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Table rows generation
    const rowsHtml = sorted.map((u, idx) => {
      const isMe = (u.id === currentUserId || u.username === currentUsername);
      const rankNum = idx + 1;
      const medal = rankNum === 1 ? '<span class="rank-medal-1">🥇</span>' : 
                    rankNum === 2 ? '<span class="rank-medal-2">🥈</span>' : 
                    rankNum === 3 ? '<span class="rank-medal-3">🥉</span>' : 
                    `#${rankNum}`;

      const v = parseFloat(u.vulnerability).toFixed(1);
      const gs = u.game_scores || { kasus: 0, diff: 0, criminal: 0, deeplearn: 0, scanner: 0, checker: 0 };
      const isExpanded = this.expandedUserId === u.id;

      if (isDetailView) {
        // Detailed Columns View
        return `
          <tr style="${isMe ? 'background: rgba(0, 243, 255, 0.12); border-left: 3px solid var(--neon-cyan);' : ''}">
            <td style="font-weight: 700; width: 55px; text-align: center;">${medal}</td>
            <td>
              <div style="display:flex; align-items:center; gap: 8px;">
                <span style="font-size: 1.15rem;">${u.role === 'admin' ? '🛡️' : '👤'}</span>
                <div>
                  <strong style="color: ${isMe ? 'var(--neon-cyan)' : 'var(--text-highlight)'}; font-size: 0.92rem;">
                    ${u.name} ${isMe ? '<span class="cyber-tag" style="margin-left:4px; font-size:0.6rem; padding:1px 5px;">ANDA</span>' : ''}
                  </strong>
                  <div style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">
                    ${u.rank || 'Cyber Cadet'}
                  </div>
                </div>
              </div>
            </td>
            <!-- TOTAL SCORE (Sum of All Games) -->
            <td style="color: var(--neon-cyan); font-weight: 800; font-size: 1.05rem; white-space: nowrap; text-align: right; padding-right: 18px;">
              ${u.score.toLocaleString()} XP
            </td>
            <!-- Individual Game Breakdown Columns -->
            <td style="text-align: center; color: var(--text-main); font-family: var(--font-mono); font-size: 0.85rem;">
              <span class="cyber-tag" style="padding:2px 8px; font-size:0.75rem; border-color:rgba(255,184,0,0.4);">${gs.kasus}</span>
            </td>
            <td style="text-align: center; color: var(--text-main); font-family: var(--font-mono); font-size: 0.85rem;">
              <span class="cyber-tag" style="padding:2px 8px; font-size:0.75rem; border-color:rgba(189,0,255,0.4);">${gs.diff}</span>
            </td>
            <td style="text-align: center; color: var(--text-main); font-family: var(--font-mono); font-size: 0.85rem;">
              <span class="cyber-tag" style="padding:2px 8px; font-size:0.75rem; border-color:rgba(255,0,85,0.4);">${gs.criminal}</span>
            </td>
            <td style="text-align: center; color: var(--text-main); font-family: var(--font-mono); font-size: 0.85rem;">
              <span class="cyber-tag" style="padding:2px 8px; font-size:0.75rem; border-color:rgba(0,255,157,0.4);">${gs.deeplearn}</span>
            </td>
            <td style="text-align: center; color: var(--text-main); font-family: var(--font-mono); font-size: 0.85rem;">
              <span class="cyber-tag" style="padding:2px 8px; font-size:0.75rem; border-color:rgba(0,243,255,0.4);">${gs.scanner}</span>
            </td>
            <td style="text-align: center; color: var(--text-main); font-family: var(--font-mono); font-size: 0.85rem;">
              <span class="cyber-tag" style="padding:2px 8px; font-size:0.75rem; border-color:rgba(255,184,0,0.4);">${gs.checker}</span>
            </td>
            <td style="text-align: center;">
              <span class="cyber-tag ${v <= 2.5 ? 'tag-green' : v <= 5.5 ? 'tag-amber' : 'tag-red'}" style="font-size:0.75rem;">
                ${v} / 10
              </span>
            </td>
          </tr>
        `;
      } else {
        // Standard View with expandable row for Game Breakdown
        return `
          <tr style="${isMe ? 'background: rgba(0, 243, 255, 0.12); border-left: 3px solid var(--neon-cyan);' : ''}">
            <td style="font-weight: 700; width: 60px; text-align: center;">${medal}</td>
            <td>
              <div style="display:flex; align-items:center; gap: 10px;">
                <span style="font-size: 1.2rem;">${u.role === 'admin' ? '🛡️' : '👤'}</span>
                <div>
                  <strong style="color: ${isMe ? 'var(--neon-cyan)' : 'var(--text-highlight)'}; font-size: 0.95rem;">
                    ${u.name} ${isMe ? '<span class="cyber-tag" style="margin-left:6px; font-size:0.65rem;">ANDA</span>' : ''}
                  </strong>
                  <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">
                    ${u.rank || 'Cyber Cadet'}
                  </div>
                </div>
              </div>
            </td>
            <td>
              <span class="cyber-tag ${u.role === 'admin' ? 'tag-magenta' : ''}">
                ${u.role.toUpperCase()}
              </span>
            </td>
            <!-- TOTAL SCORE DISPLAY -->
            <td style="color: var(--neon-cyan); font-weight: 800; font-size: 1.05rem;">
              <div>${u.score.toLocaleString()} XP</div>
              <div style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono); font-weight: normal;">
                TOTAL SEMUA GAME
              </div>
            </td>
            <td style="text-align: center;">
              <button 
                class="cyber-btn btn-ghost" 
                style="padding: 4px 10px; font-size: 0.72rem; border-color: ${isExpanded ? 'var(--neon-magenta)' : 'var(--border-cyan)'}; color: ${isExpanded ? 'var(--neon-magenta)' : 'var(--neon-cyan)'};"
                onclick="window.leaderboardManager.toggleRowExpand('${u.id}')"
                title="Lihat rincian skor per game"
              >
                ${isExpanded ? '▲ TUTUP' : '🔍 LIHAT SKOR PER GAME'}
              </button>
            </td>
            <td style="text-align: center;">
              ${u.modules_completed || 0}
            </td>
            <td>
              <span class="cyber-tag ${v <= 2.5 ? 'tag-green' : v <= 5.5 ? 'tag-amber' : 'tag-red'}">
                ${v} / 10
              </span>
            </td>
          </tr>

          <!-- Expandable Row: Per-Game Score Breakdown Card -->
          ${isExpanded ? `
            <tr style="background: rgba(14, 18, 36, 0.95); border-bottom: 2px solid var(--border-cyan);">
              <td colspan="7" style="padding: 16px 22px;">
                <div class="holo-enter" style="display:flex; flex-direction:column; gap:10px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                    <div style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-cyan); font-weight:700;">
                      📊 DISTRIBUSI SKOR PER GAME UNTUK: <span style="color:var(--text-highlight);">${u.name.toUpperCase()}</span>
                    </div>
                    <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted);">
                      TOTAL AKUMULASI: <strong style="color:var(--neon-cyan); font-size:0.95rem;">${u.score} XP</strong>
                    </div>
                  </div>

                  <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-top: 4px;">
                    <div style="background:rgba(5,5,10,0.7); border:1px solid rgba(255,184,0,0.3); border-radius:6px; padding:10px; text-align:center;">
                      <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:2px;">📜 KASUS MULTI-POV</div>
                      <strong style="color:var(--neon-amber); font-size:1.15rem;">${gs.kasus} XP</strong>
                    </div>
                    <div style="background:rgba(5,5,10,0.7); border:1px solid rgba(189,0,255,0.3); border-radius:6px; padding:10px; text-align:center;">
                      <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:2px;">⚖️ FINDING DIFF</div>
                      <strong style="color:var(--neon-magenta); font-size:1.15rem;">${gs.diff} XP</strong>
                    </div>
                    <div style="background:rgba(5,5,10,0.7); border:1px solid rgba(255,0,85,0.3); border-radius:6px; padding:10px; text-align:center;">
                      <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:2px;">🕵️ CRIMINAL CASE</div>
                      <strong style="color:var(--neon-red); font-size:1.15rem;">${gs.criminal} XP</strong>
                    </div>
                    <div style="background:rgba(5,5,10,0.7); border:1px solid rgba(0,255,157,0.3); border-radius:6px; padding:10px; text-align:center;">
                      <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:2px;">🧠 DEEP LEARNING</div>
                      <strong style="color:var(--neon-green); font-size:1.15rem;">${gs.deeplearn} XP</strong>
                    </div>
                    <div style="background:rgba(5,5,10,0.7); border:1px solid rgba(0,243,255,0.3); border-radius:6px; padding:10px; text-align:center;">
                      <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:2px;">🔗 LINK SCANNER</div>
                      <strong style="color:var(--neon-cyan); font-size:1.15rem;">${gs.scanner} XP</strong>
                    </div>
                    <div style="background:rgba(5,5,10,0.7); border:1px solid rgba(255,184,0,0.3); border-radius:6px; padding:10px; text-align:center;">
                      <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:2px;">🛡️ THREAT CHECKER</div>
                      <strong style="color:var(--neon-amber); font-size:1.15rem;">${gs.checker} XP</strong>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ` : ''}
        `;
      }
    }).join('');

    container.innerHTML = `
      <div class="${isSilent ? '' : 'holo-enter'}">
        <!-- Header & Live Polling Status Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px; margin-bottom: 20px;">
          <div>
            <div style="display:flex; align-items:center; gap: 10px; margin-bottom: 4px;">
              <h2 style="font-size: 1.45rem; color: var(--text-highlight); margin:0;">
                PAPAN PERINGKAT DEFENSE SIBER GLOBAL
              </h2>
              <span class="cyber-tag tag-green" style="display:inline-flex; align-items:center; gap:6px; padding:3px 8px; font-size:0.72rem;">
                <span class="pulsing-dot" style="width:7px; height:7px; margin:0; background:var(--neon-green); box-shadow:0 0 8px var(--neon-green);"></span>
                LIVE STREAMING
              </span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin:0;">
              Skor terakumulasi real-time dari setiap game • Sinkronisasi terakhir: <span style="color:var(--neon-cyan); font-family:var(--font-mono);">${timeStr}</span>
            </p>
          </div>

          <!-- Controls: Mode Tampilan & Filter -->
          <div style="display:flex; align-items:center; gap: 10px; flex-wrap:wrap;">
            <!-- View Mode Toggle: Total Score vs Detail Per Game -->
            <div style="display:inline-flex; background:rgba(5,5,10,0.8); border:1px solid var(--border-cyan); border-radius:6px; padding:2px;">
              <button 
                class="cyber-btn ${!isDetailView ? '' : 'btn-ghost'}" 
                style="font-size: 0.75rem; padding: 5px 12px; border:none;" 
                onclick="window.leaderboardManager.setViewMode('total')"
              >
                📋 TOTAL SKOR
              </button>
              <button 
                class="cyber-btn ${isDetailView ? '' : 'btn-ghost'}" 
                style="font-size: 0.75rem; padding: 5px 12px; border:none;" 
                onclick="window.leaderboardManager.setViewMode('detail')"
              >
                📊 DETAIL SKOR PER GAME
              </button>
            </div>

            <!-- Force Refresh Button -->
            <button class="cyber-btn btn-ghost" style="font-size: 0.78rem; padding: 6px 12px;" onclick="window.leaderboardManager.fetchLive()" title="Muat ulang data terkini">
              🔄 UPDATE
            </button>
          </div>
        </div>

        <!-- Filter Pills Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom: 16px; background:rgba(0,243,255,0.04); border:1px solid rgba(0,243,255,0.15); border-radius:6px; padding:8px 14px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted);">FILTER OPERATOR:</span>
            <button class="cyber-btn ${this.currentFilter === 'all' ? '' : 'btn-ghost'}" style="font-size: 0.72rem; padding: 3px 10px;" onclick="window.leaderboardManager.setFilter('all')">
              SEMUA (${this.users.length})
            </button>
            <button class="cyber-btn ${this.currentFilter === 'sentinel' ? '' : 'btn-ghost'}" style="font-size: 0.72rem; padding: 3px 10px;" onclick="window.leaderboardManager.setFilter('sentinel')">
              SENTINEL (VULN &le; 2.5)
            </button>
            <button class="cyber-btn ${this.currentFilter === 'cadet' ? '' : 'btn-ghost'}" style="font-size: 0.72rem; padding: 3px 10px;" onclick="window.leaderboardManager.setFilter('cadet')">
              CADET / MAHASISWA
            </button>
          </div>

          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-magenta);">
            ⚡ Mode: ${isDetailView ? 'Matriks Rincian Komponen Game' : 'Peringkat Total Akumulasi XP'}
          </div>
        </div>

        <!-- Leaderboard Table -->
        <div class="hud-card" style="padding: 0; overflow-x: auto;">
          <table class="cyber-table">
            <thead>
              ${isDetailView ? `
                <tr>
                  <th style="width: 55px; text-align: center;">POSISI</th>
                  <th>OPERATOR SIBER</th>
                  <th style="text-align: right; padding-right: 18px; color:var(--neon-cyan);">TOTAL XP</th>
                  <th style="text-align: center; color:var(--neon-amber);">📜 KASUS</th>
                  <th style="text-align: center; color:var(--neon-magenta);">⚖️ DIFF</th>
                  <th style="text-align: center; color:var(--neon-red);">🕵️ CRIM</th>
                  <th style="text-align: center; color:var(--neon-green);">🧠 DEEP</th>
                  <th style="text-align: center; color:var(--neon-cyan);">🔗 SCAN</th>
                  <th style="text-align: center; color:var(--neon-amber);">🛡️ CHECK</th>
                  <th style="text-align: center;">VULNERABILITY</th>
                </tr>
              ` : `
                <tr>
                  <th style="width: 60px; text-align: center;">POSISI</th>
                  <th>OPERATOR SIBER</th>
                  <th>ROLE</th>
                  <th style="color:var(--neon-cyan);">TOTAL DEFENSE SCORE</th>
                  <th style="text-align: center;">DETAIL SKOR</th>
                  <th style="text-align: center;">MISI SELESAI</th>
                  <th>INDEKS KERENTANAN</th>
                </tr>
              `}
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

window.leaderboardManager = new LeaderboardManager();
