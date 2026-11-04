/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * Cyber Defense Leaderboard Controller
 */

class LeaderboardManager {
  constructor() {
    this.users = [];
    this.currentFilter = 'all';
  }

  init(usersData) {
    this.users = usersData || [];
    this.render();
  }

  setFilter(filter) {
    this.currentFilter = filter;
    window.cyberAudio?.playClick();
    this.render();
  }

  render() {
    const container = document.getElementById('leaderboard-container');
    if (!container) return;

    // Sort by score descending, vulnerability ascending
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

    const rowsHtml = sorted.map((u, idx) => {
      const isMe = u.id === currentUserId || u.username === window.authManager?.currentUser?.username;
      const rankNum = idx + 1;
      const medal = rankNum === 1 ? '<span class="rank-medal-1">🥇</span>' : rankNum === 2 ? '<span class="rank-medal-2">🥈</span>' : rankNum === 3 ? '<span class="rank-medal-3">🥉</span>' : `#${rankNum}`;
      const v = parseFloat(u.vulnerability).toFixed(1);

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
          <td style="color: var(--neon-cyan); font-weight: 700; font-size: 1rem;">
            ${u.score} XP
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
      `;
    }).join('');

    container.innerHTML = `
      <div class="holo-enter">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 24px;">
          <div>
            <h2 style="font-size: 1.5rem; color: var(--text-highlight);">
              PAPAN PERINGKAT DEFENSE SIBER GLOBAL
            </h2>
            <p style="font-size: 0.88rem; color: var(--text-muted);">
              Rangking ketahanan, kecepatan deteksi, dan skor kerentanan peserta simulasi Know Your Scam
            </p>
          </div>
          <div style="display:flex; gap: 8px;">
            <button class="cyber-btn ${this.currentFilter === 'all' ? '' : 'btn-ghost'}" style="font-size: 0.8rem; padding: 6px 14px;" onclick="window.leaderboardManager.setFilter('all')">
              SEMUA
            </button>
            <button class="cyber-btn ${this.currentFilter === 'sentinel' ? '' : 'btn-ghost'}" style="font-size: 0.8rem; padding: 6px 14px;" onclick="window.leaderboardManager.setFilter('sentinel')">
              SENTINEL (VULN &le; 2.5)
            </button>
            <button class="cyber-btn ${this.currentFilter === 'cadet' ? '' : 'btn-ghost'}" style="font-size: 0.8rem; padding: 6px 14px;" onclick="window.leaderboardManager.setFilter('cadet')">
              CADET / MAHASISWA
            </button>
          </div>
        </div>

        <div class="hud-card" style="padding: 0; overflow-x: auto;">
          <table class="cyber-table">
            <thead>
              <tr>
                <th style="width: 70px; text-align: center;">POSISI</th>
                <th>OPERATOR SIBER</th>
                <th>ROLE</th>
                <th>DEFENSE SCORE</th>
                <th style="text-align: center;">MISI SELESAI</th>
                <th>INDEKS KERENTANAN</th>
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
}

window.leaderboardManager = new LeaderboardManager();

