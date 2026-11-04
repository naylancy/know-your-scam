/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * Admin Panel & Real-Time Activity Telemetry Manager
 * Interactive Case Builder for Kasus, Diff, Criminal, Deep Learning, and Scanner
 */

class AdminManager {
  constructor() {
    this.activeTab = 'logs'; // 'logs' or 'content'
    this.selectedCategory = 'kasus';
    this.searchQuery = '';
    this.filterStatus = 'ALL';
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

  setCategory(cat) {
    this.selectedCategory = cat;
    window.cyberAudio?.playClick();
    this.render();
  }

  startRealtimeSimulation() {
    // Generate occasional simulated cadet telemetry in the background
    if (this.realtimeTimer) clearInterval(this.realtimeTimer);
    this.realtimeTimer = setInterval(() => {
      if (!window.app?.db?.activity_logs) return;
      if (Math.random() > 0.65) {
        const dummyUsers = ['Cadet Maya', 'Cadet Danial', 'Analyst Echo', 'Vanguard Ryan'];
        const dummyModules = ['KASUS (Phishing)', 'FINDING DIFF', 'CRIMINAL CASE', 'DEEP LEARNING'];
        const dummyDecisions = [
            'Memverifikasi integritas sertifikat SSL NeoArtha',
            'Mendeteksi domain palsu .xyz.fake',
            'Menerbitkan surat dakwaan dalam 52 detik',
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
        if (window.app.db.activity_logs.length > 80) {
          window.app.db.activity_logs.pop();
        }

        // If currently viewing logs tab, re-render rows smoothly
        if (this.activeTab === 'logs' && document.getElementById('admin-container')) {
          this.render();
        }
      }
    }, 9000);
  }

  render() {
    const container = document.getElementById('admin-container');
    if (!container) return;

    const isAdmin = window.authManager?.isAdmin();

    if (!isAdmin) {
      container.innerHTML = `
        <div class="hud-card" style="padding: 40px; text-align: center; max-width: 600px; margin: 40px auto;">
          <div style="font-size: 3.5rem; margin-bottom: 16px;">🔒</div>
          <h2 style="font-size: 1.5rem; color: var(--neon-magenta); margin-bottom: 10px;">
            AKSES DIBATASI: HAK KHUSUS ADMINISTRATOR
          </h2>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 24px;">
            Halaman ini khusus untuk Pengelola Website dan Pembuat Game guna mengelola kasus dan memantau log aktivitas siber mahasiswa secara real-time.
          </p>
          <div style="display:flex; justify-content:center; gap: 14px;">
            <button class="cyber-btn btn-magenta" onclick="window.authManager.loginDemoAdmin(); window.adminManager.render();">
              🛡️ MASUK SEBAGAI ADMIN (INSTAN)
            </button>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="holo-enter">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 20px;">
          <div>
            <h2 style="font-size: 1.5rem; color: var(--text-highlight);">
              KONSOL KONTROL ADMINISTRATOR & TELEMETRI SIBER
            </h2>
            <p style="font-size: 0.88rem; color: var(--text-muted);">
              Manajemen skenario game kustom, inspeksi log aktivitas peserta, dan pemantauan ancaman real-time
            </p>
          </div>
          <div>
            <span class="cyber-tag tag-magenta">LEVEL: SYSTEM COMMANDER</span>
          </div>
        </div>

        <!-- Admin Tab Buttons -->
        <div class="admin-tab-bar">
          <button class="admin-tab-btn ${this.activeTab === 'logs' ? 'active' : ''}" onclick="window.adminManager.setTab('logs')">
            📡 LOG AKTIVITAS REAL-TIME (${window.app?.db?.activity_logs?.length || 0})
          </button>
          <button class="admin-tab-btn ${this.activeTab === 'content' ? 'active' : ''}" onclick="window.adminManager.setTab('content')">
            ⚙️ MANAJEMEN KONTEN GAME & CASE BUILDER
          </button>
        </div>

        <!-- Tab Content -->
        ${this.activeTab === 'logs' ? this.renderLogsSection() : this.renderContentSection()}
      </div>
    `;
  }

  renderLogsSection() {
    const logs = window.app?.db?.activity_logs || [];
    let filtered = logs;

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(l => 
        (l.user_name || '').toLowerCase().includes(q) || 
        (l.module || '').toLowerCase().includes(q) || 
        (l.decision || '').toLowerCase().includes(q)
      );
    }

    if (this.filterStatus !== 'ALL') {
      filtered = filtered.filter(l => l.status === this.filterStatus);
    }

    const rowsHtml = filtered.map(log => {
      const isSecured = log.status === 'SECURED' || log.status === 'BREACH_PREVENTED';
      const isCompromised = log.status === 'COMPROMISED';
      return `
        <tr>
          <td style="color: var(--text-muted); font-size: 0.8rem; white-space: nowrap;">
            ${log.timestamp}
          </td>
          <td>
            <strong style="color: var(--text-highlight);">${log.user_name}</strong>
          </td>
          <td>
            <span class="cyber-tag" style="font-size: 0.72rem;">${log.module}</span>
          </td>
          <td style="max-width: 320px; font-size: 0.85rem; color: var(--text-main);">
            ${log.decision}
          </td>
          <td>
            <span class="cyber-tag ${log.vulnerability_score <= 2.5 ? 'tag-green' : log.vulnerability_score <= 5.5 ? 'tag-amber' : 'tag-red'}">
              ${log.vulnerability_score}
            </span>
          </td>
          <td>
            <span class="cyber-tag ${isSecured ? 'tag-green' : isCompromised ? 'tag-red' : 'tag-amber'}">
              ${log.status}
            </span>
          </td>
        </tr>
      `;
    }).join('') || `<tr><td colspan="6" style="text-align:center; padding: 25px; color: var(--text-muted);">Tidak ada log yang cocok dengan kriteria filter.</td></tr>`;

    return `
      <div>
        <!-- Controls Bar -->
        <div class="hud-card" style="padding: 14px 20px; margin-bottom: 20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap: 12px;">
          <div style="display:flex; align-items:center; gap: 12px; flex: 1; min-width: 280px;">
            <input 
              type="text" 
              class="scanner-input-field" 
              style="padding: 8px 14px; font-size: 0.85rem;" 
              placeholder="Cari user, modul, atau keputusan..."
              value="${this.searchQuery}"
              oninput="window.adminManager.searchQuery = this.value; window.adminManager.render();"
            />
            <select 
              class="scanner-input-field" 
              style="padding: 8px 12px; font-size: 0.85rem; width: auto;"
              onchange="window.adminManager.filterStatus = this.value; window.adminManager.render();"
            >
              <option value="ALL">Semua Status</option>
              <option value="SECURED">SECURED</option>
              <option value="BREACH_PREVENTED">BREACH_PREVENTED</option>
              <option value="COMPROMISED">COMPROMISED</option>
            </select>
          </div>

          <div style="display:flex; gap: 8px;">
            <button class="cyber-btn btn-ghost" style="padding: 8px 14px; font-size: 0.8rem;" onclick="window.adminManager.exportLogs()">
              📥 EKSPOR LOG
            </button>
            <button class="cyber-btn btn-danger" style="padding: 8px 14px; font-size: 0.8rem;" onclick="window.adminManager.clearLogs()">
              🗑️ BERSIHKAN
            </button>
          </div>
        </div>

        <!-- Live Telemetry Table -->
        <div class="hud-card" style="padding: 0; overflow-x: auto;">
          <table class="cyber-table">
            <thead>
              <tr>
                <th>TIMESTAMP</th>
                <th>OPERATOR / USER</th>
                <th>MODUL GIM</th>
                <th>KEPUTUSAN / TINDAKAN</th>
                <th>SKOR VULN</th>
                <th>STATUS HASIL</th>
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

  renderContentSection() {
    const db = window.app?.db || {};
    const categories = [
      { id: 'kasus', label: '1. KASUS MULTI-POV', items: db.cases_kasus || [] },
      { id: 'diff', label: '2. FINDING DIFF', items: db.cases_diff || [] },
      { id: 'criminal', label: '3. CRIMINAL CASE', items: db.cases_criminal || [] },
      { id: 'deeplearn', label: '4. DEEP LEARNING', items: db.cases_deeplearn || [] },
      { id: 'scanner', label: '5. LINK/NEWS SCANNER', items: db.cases_scanner || [] }
    ];

    const currentCatObj = categories.find(c => c.id === this.selectedCategory) || categories[0];
    const items = currentCatObj.items;

    const catButtons = categories.map(c => `
      <button class="cyber-btn ${this.selectedCategory === c.id ? '' : 'btn-ghost'}" style="font-size: 0.8rem; padding: 7px 14px;" onclick="window.adminManager.setCategory('${c.id}')">
        ${c.label} (${c.items.length})
      </button>
    `).join('');

    const itemsHtml = items.map((item, idx) => `
      <div class="hud-card" style="padding: 16px 20px; margin-bottom: 12px; display:flex; justify-content:space-between; align-items:center; gap: 16px; border-left: 3px solid ${item.is_custom ? 'var(--neon-magenta)' : 'var(--neon-cyan)'};">
        <div>
          <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 4px;">
            <span class="cyber-tag ${item.is_custom ? 'tag-magenta' : ''}">${item.id || item.type || '#' + (idx + 1)}</span>
            ${item.is_custom ? '<span class="cyber-tag tag-magenta" style="font-size:0.65rem;">⭐ KASUS KUSTOM ADMIN</span>' : ''}
            <strong style="color: var(--text-highlight); font-size: 1rem;">${item.title || item.target || 'Item Skenario'}</strong>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-muted);">
            ${item.subtitle || item.scenario || item.victim || item.scenario_text?.substring(0, 80) || item.explanation?.substring(0, 80) || ''}...
          </div>
        </div>
        <div style="display:flex; gap: 8px; flex-shrink: 0;">
          <button class="cyber-btn btn-danger" style="padding: 6px 12px; font-size: 0.8rem;" onclick="window.adminManager.deleteCase('${this.selectedCategory}', '${item.id || idx}')" title="Hapus Skenario">
            🗑️ HAPUS
          </button>
        </div>
      </div>
    `).join('') || `<div class="hud-card" style="padding: 30px; text-align: center; color: var(--text-muted);">Belum ada skenario pada kategori ini.</div>`;

    return `
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap: 12px; margin-bottom: 18px;">
          <div style="display:flex; gap: 8px; flex-wrap: wrap;">
            ${catButtons}
          </div>
          <button class="cyber-btn" onclick="window.adminManager.openCaseBuilderModal('${this.selectedCategory}')">
            ➕ TAMBAH KASUS BARU DENGAN CASE BUILDER
          </button>
        </div>

        <div>
          ${itemsHtml}
        </div>
      </div>
    `;
  }

  // Open the interactive Cyber Case Builder Modal tailored to category
  openCaseBuilderModal(category) {
    window.cyberAudio?.playClick();
    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');
    if (!modalBox || !modalContent) return;

    let categoryFields = '';

    if (category === 'kasus') {
      categoryFields = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-cyan); margin-bottom:4px;">TIPE ALUR CERITA</label>
            <select id="cb-kasus-type" class="cyber-input" style="width:100%;">
              <option value="phishing">Phishing (Undian / Beasiswa)</option>
              <option value="lovescam">Love Scam (Manipulasi Romansa)</option>
              <option value="jobscam">Job Scam (Loker Palsu & Biaya Awal)</option>
            </select>
          </div>
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-cyan); margin-bottom:4px;">PENGIRIM TRANSMISI</label>
            <input type="text" id="cb-kasus-sender" class="cyber-input" placeholder="contoh: Beasiswa Global <scholarship@global-edu.mock>" style="width:100%;" required>
          </div>
        </div>
        <div style="margin-bottom: 14px;">
          <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-cyan); margin-bottom:4px;">ISI PESAN TRANSMISI SIBER</label>
          <textarea id="cb-kasus-message" class="cyber-input" style="width:100%; height:80px;" placeholder="Tuliskan pesan manipulasi rekayasa sosial penyerang..." required></textarea>
        </div>
        <div style="margin-bottom: 14px;">
          <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-magenta); margin-bottom:4px;">OPSI A (PILIHAN KOMPROMI / SALAH)</label>
          <input type="text" id="cb-kasus-choice-a" class="cyber-input" placeholder="contoh: Buka tautan dan verifikasi kata sandi akun" style="width:100%; margin-bottom:6px;" required>
          <input type="text" id="cb-kasus-feedback-a" class="cyber-input" placeholder="Feedback kesalahan untuk pemain..." style="width:100%;">
        </div>
        <div style="margin-bottom: 14px;">
          <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-green); margin-bottom:4px;">OPSI B (PILIHAN AMAN / TEPAT)</label>
          <input type="text" id="cb-kasus-choice-b" class="cyber-input" placeholder="contoh: Laporkan transmisi dan verifikasi lewat kanal resmi institusi" style="width:100%; margin-bottom:6px;" required>
          <input type="text" id="cb-kasus-feedback-b" class="cyber-input" placeholder="Feedback keberhasilan pertahanan..." style="width:100%;">
        </div>
      `;
    } else if (category === 'diff') {
      categoryFields = `
        <div style="margin-bottom: 14px;">
          <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-cyan); margin-bottom:4px;">DESKRIPSI SKENARIO PERBANDINGAN</label>
          <input type="text" id="cb-diff-scenario" class="cyber-input" placeholder="contoh: Dua notifikasi konfirmasi perubahan kata sandi perbankan digital." style="width:100%;" required>
        </div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
          <div style="background: rgba(0,243,255,0.06); padding: 10px; border-radius: 4px; border: 1px solid var(--border-cyan);">
            <strong style="color:var(--neon-cyan); font-size:0.85rem;">SKENARIO KIRI (A)</strong>
            <input type="text" id="cb-diff-left-title" class="cyber-input" placeholder="Judul Dokumen A" style="width:100%; margin: 6px 0;" required>
            <input type="text" id="cb-diff-left-sender" class="cyber-input" placeholder="Pengirim A" style="width:100%; margin-bottom: 6px;" required>
            <textarea id="cb-diff-left-content" class="cyber-input" placeholder="Isi pesan Skenario A..." style="width:100%; height:60px;"></textarea>
          </div>
          <div style="background: rgba(189,0,255,0.06); padding: 10px; border-radius: 4px; border: 1px solid var(--border-magenta);">
            <strong style="color:var(--neon-magenta); font-size:0.85rem;">SKENARIO KANAN (B)</strong>
            <input type="text" id="cb-diff-right-title" class="cyber-input" placeholder="Judul Dokumen B" style="width:100%; margin: 6px 0;" required>
            <input type="text" id="cb-diff-right-sender" class="cyber-input" placeholder="Pengirim B" style="width:100%; margin-bottom: 6px;" required>
            <textarea id="cb-diff-right-content" class="cyber-input" placeholder="Isi pesan Skenario B..." style="width:100%; height:60px;"></textarea>
          </div>
        </div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-amber); margin-bottom:4px;">MANA YANG MERUPAKAN SKENARIO REAL (ASLI)?</label>
            <select id="cb-diff-correct" class="cyber-input" style="width:100%;">
              <option value="left">Sisi Kiri (A) adalah REAL, Sisi Kanan (B) adalah FAKE</option>
              <option value="right">Sisi Kanan (B) adalah REAL, Sisi Kiri (A) adalah FAKE</option>
            </select>
          </div>
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">PENJELASAN FORENSIK</label>
            <input type="text" id="cb-diff-explanation" class="cyber-input" placeholder="Alasan mengapa dokumen fake terdeteksi penipuan..." style="width:100%;">
          </div>
        </div>
      `;
    } else if (category === 'criminal') {
      categoryFields = `
        <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 14px;">
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-cyan); margin-bottom:4px;">TARGET KORBAN</label>
            <input type="text" id="cb-crim-victim" class="cyber-input" placeholder="contoh: Mahasiswa Penerima Beasiswa" style="width:100%;" required>
          </div>
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-red); margin-bottom:4px;">POTENSI KERUGIAN</label>
            <input type="text" id="cb-crim-loss" class="cyber-input" placeholder="contoh: Rp 45.000.000" style="width:100%;" required>
          </div>
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-amber); margin-bottom:4px;">WAKTU INVESTIGASI (DETIK)</label>
            <input type="number" id="cb-crim-timer" class="cyber-input" value="90" min="30" max="300" style="width:100%;" required>
          </div>
        </div>
        <div style="background: rgba(5,5,10,0.6); padding: 12px; border-radius: 4px; border: 1px solid var(--border-cyan); margin-bottom: 14px;">
          <div style="font-size:0.82rem; color:var(--neon-cyan); font-weight:700; margin-bottom: 8px;">4 KUNCI JAWABAN DAKWAAN FORENSIK:</div>
          <input type="text" id="cb-crim-clue-actor" class="cyber-input" placeholder="Bukti 1 (Sumber/Aktor): contoh: IP Relay Server 103.45.xx.xx Luar Negeri" style="width:100%; margin-bottom:6px;" required>
          <input type="text" id="cb-crim-clue-vector" class="cyber-input" placeholder="Bukti 2 (Vektor Serangan): contoh: Modus Phishing Token Perbankan" style="width:100%; margin-bottom:6px;" required>
          <input type="text" id="cb-crim-clue-redflag" class="cyber-input" placeholder="Bukti 3 (Red Flag Kritis): contoh: Permintaan Verifikasi Kode OTP Instan" style="width:100%; margin-bottom:6px;" required>
          <input type="text" id="cb-crim-clue-mitigation" class="cyber-input" placeholder="Bukti 4 (Intervensi/Mitigasi): contoh: Freeze Rekening Tujuan & Lapor Bank" style="width:100%;" required>
        </div>
        <div style="margin-bottom: 14px;">
          <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">DEBRIEF KASUS RESMI</label>
          <textarea id="cb-crim-debrief" class="cyber-input" placeholder="Ulasan ringkasan setelah dakwaan berhasil diterbitkan..." style="width:100%; height:60px;"></textarea>
        </div>
      `;
    } else if (category === 'deeplearn') {
      categoryFields = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-magenta); margin-bottom:4px;">TINGKAT BAHAYA SESUNGGUHNYA</label>
            <select id="cb-deep-threat" class="cyber-input" style="width:100%;">
              <option value="CRITICAL_SCAM">CRITICAL_SCAM (Penipuan Kritis)</option>
              <option value="SUSPICIOUS">SUSPICIOUS (Mencurigakan)</option>
              <option value="SAFE">SAFE (Aman / Sah)</option>
            </select>
          </div>
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-cyan); margin-bottom:4px;">KATA KUNCI WAJIB (PISAHKAN KOMA)</label>
            <input type="text" id="cb-deep-keywords" class="cyber-input" placeholder="contoh: private key, domain, urgensi, otorisasi" style="width:100%;" required>
          </div>
        </div>
        <div style="margin-bottom: 14px;">
          <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-cyan); margin-bottom:4px;">DOKUMEN TRANSMISI SKENARIO YANG DIANALISIS</label>
          <textarea id="cb-deep-text" class="cyber-input" style="width:100%; height:110px;" placeholder="Tuliskan isi email atau pesan siber lengkap yang harus dievaluasi mahasiswa..." required></textarea>
        </div>
        <div style="margin-bottom: 14px;">
          <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">INDIKATOR RED FLAG TARGET (PISAHKAN KOMA)</label>
          <input type="text" id="cb-deep-indicators" class="cyber-input" placeholder="contoh: Permintaan kredensial, Batas waktu panik 30 menit, Domain palsu" style="width:100%;">
        </div>
      `;
    } else if (category === 'scanner') {
      categoryFields = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-cyan); margin-bottom:4px;">TIPE SAMPEL</label>
            <select id="cb-scan-type" class="cyber-input" style="width:100%;">
              <option value="url">Tautan / URL Web</option>
              <option value="news">Teks Berita / Transmisi Pesan</option>
            </select>
          </div>
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-amber); margin-bottom:4px;">STATUS KEASLIAN</label>
            <select id="cb-scan-malicious" class="cyber-input" style="width:100%;">
              <option value="true">BAHAYA / MALICIOUS (Phishing/Scam)</option>
              <option value="false">AMAN / LEGIT (Resmi & Terverifikasi)</option>
            </select>
          </div>
        </div>
        <div style="margin-bottom: 14px;">
          <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-cyan); margin-bottom:4px;">TARGET URL / TEKS TRANSMISI</label>
          <input type="text" id="cb-scan-target" class="cyber-input" placeholder="contoh: https://portal-hadiah-beasiswa.xyz.fake/login" style="width:100%;" required>
        </div>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">SKOR RISIKO (1.0 - 10.0)</label>
            <input type="number" id="cb-scan-score" class="cyber-input" value="8.5" step="0.1" min="1.0" max="10.0" style="width:100%;" required>
          </div>
          <div>
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">KLASIFIKASI ANCAMAN</label>
            <input type="text" id="cb-scan-threat" class="cyber-input" placeholder="contoh: Peniruan Domain Phishing Perbankan" style="width:100%;" required>
          </div>
        </div>
        <div style="margin-bottom: 14px;">
          <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">PENJELASAN FORENSIK</label>
          <textarea id="cb-scan-explanation" class="cyber-input" placeholder="Rincian mengapa URL/Berita ini berbahaya atau aman..." style="width:100%; height:60px;"></textarea>
        </div>
      `;
    }

    modalContent.innerHTML = `
      <div style="max-height: 80vh; overflow-y: auto; padding: 10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-cyan); padding-bottom: 12px; margin-bottom: 18px;">
          <div style="display:flex; align-items:center; gap: 10px;">
            <span style="font-size: 1.8rem;">⚙️</span>
            <div>
              <h3 style="font-size: 1.25rem; color: var(--neon-cyan);">CASE BUILDER: TAMBAH KASUS BARU</h3>
              <span class="cyber-tag tag-magenta" style="font-size:0.7rem;">KATEGORI: ${category.toUpperCase()}</span>
            </div>
          </div>
          <button class="cyber-btn btn-ghost" style="padding: 4px 10px;" onclick="document.getElementById('modal-general-box').classList.remove('active')">✕</button>
        </div>

        <form id="form-case-builder" onsubmit="window.adminManager.submitCaseBuilder(event, '${category}')">
          <!-- Common Fields -->
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div>
              <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-highlight); margin-bottom:4px;">JUDUL SKENARIO KASUS</label>
              <input type="text" id="cb-common-title" class="cyber-input" placeholder="contoh: Serangan Phishing Berkedok Bantuan Operasional" style="width:100%;" required>
            </div>
            <div>
              <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-highlight); margin-bottom:4px;">TINGKAT KESULITAN</label>
              <select id="cb-common-difficulty" class="cyber-input" style="width:100%;">
                <option value="Mudah">Mudah</option>
                <option value="Sedang" selected>Sedang</option>
                <option value="Sulit">Sulit</option>
              </select>
            </div>
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display:block; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); margin-bottom:4px;">SUBTITLE / DESKRIPSI SINGKAT</label>
            <input type="text" id="cb-common-subtitle" class="cyber-input" placeholder="contoh: Skenario investigasi taktis dibuat oleh Administrator" style="width:100%;" required>
          </div>

          <!-- Category-Specific Fields -->
          ${categoryFields}

          <div style="display:flex; justify-content:flex-end; gap: 12px; margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px;">
            <button type="button" class="cyber-btn btn-ghost" onclick="document.getElementById('modal-general-box').classList.remove('active')">
              BATAL
            </button>
            <button type="submit" class="cyber-btn" style="background: var(--neon-cyan); color: #05050A;">
              💾 TERBITKAN SKENARIO KUSTOM
            </button>
          </div>
        </form>
      </div>
    `;

    modalBox.classList.add('active');
  }

  // Handle Case Builder Form Submission
  async submitCaseBuilder(e, category) {
    e.preventDefault();
    const commonTitle = document.getElementById('cb-common-title')?.value.trim();
    const commonSubtitle = document.getElementById('cb-common-subtitle')?.value.trim();
    const commonDiff = document.getElementById('cb-common-difficulty')?.value || 'Sedang';

    if (!commonTitle) return;

    const newId = category.toUpperCase().substring(0, 4) + '-CUST-' + Math.floor(Math.random() * 899 + 100);
    let newCase = {
      id: newId,
      type: 'custom',
      title: commonTitle,
      subtitle: commonSubtitle,
      difficulty: commonDiff,
      is_custom: true,
      custom_author: 'Administrator (Commander Vektor)',
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
      const explanation = document.getElementById('cb-diff-explanation')?.value || 'Analisis forensik skenario kustom.';

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
        { id: 'clue-dist-1', title: 'Pengalih: Laporan Cuaca', description: 'Informasi distraksi non-relevan' }
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
    } else if (category === 'scanner') {
      const type = document.getElementById('cb-scan-type')?.value || 'url';
      const isMalicious = (document.getElementById('cb-scan-malicious')?.value === 'true');
      const target = document.getElementById('cb-scan-target')?.value || 'https://sample.xyz.fake';
      const score = parseFloat(document.getElementById('cb-scan-score')?.value) || 8.0;
      const threatType = document.getElementById('cb-scan-threat')?.value || 'Phishing Impersonation';
      const explanation = document.getElementById('cb-scan-explanation')?.value || 'Target kustom disimulasikan.';

      newCase.type = type;
      newCase.target = target;
      newCase.is_malicious = isMalicious;
      newCase.risk_score = score;
      newCase.threat_type = threatType;
      newCase.explanation = explanation;
      newCase.security_hints = ['Periksa domain sebelum otentikasi', 'Gunakan aplikasi 2FA resmi'];
    }

    // Save to in-memory database
    const targetKey = 'cases_' + category;
    if (window.app?.db && window.app.db[targetKey]) {
      window.app.db[targetKey].push(newCase);
    }

    // Propagate to corresponding game module
    if (category === 'kasus' && window.moduleKasus) {
      window.moduleKasus.init(window.app.db.cases_kasus);
    } else if (category === 'diff' && window.moduleDiff) {
      window.moduleDiff.init(window.app.db.cases_diff);
    } else if (category === 'criminal' && window.moduleCriminal) {
      window.moduleCriminal.init(window.app.db.cases_criminal);
    } else if (category === 'deeplearn' && window.moduleDeepLearning) {
      window.moduleDeepLearning.init(window.app.db.cases_deeplearn);
    } else if (category === 'scanner' && window.moduleScanner) {
      window.moduleScanner.init(window.app.db.cases_scanner);
    }

    // Send to backend API
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
    } catch (e) {
      console.warn('Backend save case fallback:', e);
    }

    // Close modal and notify
    const modalBox = document.getElementById('modal-general-box');
    if (modalBox) modalBox.classList.remove('active');

    window.cyberAudio?.playSuccess();
    window.app?.showToast(`⭐ Kasus Kustom "${commonTitle}" berhasil diterbitkan oleh Administrator!`, 'magenta');
    this.render();
  }

  deleteCase(category, id) {
    if (!confirm('Yakin ingin menghapus skenario kasus ini?')) return;

    const targetKey = 'cases_' + category;
    if (window.app?.db && window.app.db[targetKey]) {
      window.app.db[targetKey] = window.app.db[targetKey].filter(i => (i.id || '') != id);
    }

    // Propagate removal
    if (category === 'kasus' && window.moduleKasus) window.moduleKasus.init(window.app.db.cases_kasus);
    if (category === 'diff' && window.moduleDiff) window.moduleDiff.init(window.app.db.cases_diff);
    if (category === 'criminal' && window.moduleCriminal) window.moduleCriminal.init(window.app.db.cases_criminal);
    if (category === 'deeplearn' && window.moduleDeepLearning) window.moduleDeepLearning.init(window.app.db.cases_deeplearn);
    if (category === 'scanner' && window.moduleScanner) window.moduleScanner.init(window.app.db.cases_scanner);

    const deleteEndpoint = window.__LARAVEL_INITIAL_DATA__ ? '/api/delete_case' : 'api.php?action=delete_case';
    const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
    fetch(deleteEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf },
      body: JSON.stringify({ category, id })
    }).catch(() => {});

    window.app?.showToast('Skenario berhasil dihapus.', 'magenta');
    this.render();
  }

  clearLogs() {
    if (!confirm('Yakin ingin membersihkan seluruh log aktivitas?')) return;
    if (window.app?.db) {
      window.app.db.activity_logs = [];
    }
    const clearEndpoint = window.__LARAVEL_INITIAL_DATA__ ? '/api/clear_logs' : 'api.php?action=clear_logs';
    const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
    fetch(clearEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrf }
    }).catch(() => {});
    window.app?.showToast('Seluruh riwayat log aktivitas telah dibersihkan.', 'success');
    this.render();
  }

  exportLogs() {
    const logs = window.app?.db?.activity_logs || [];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `knowyourscam_logs_${Date.now()}.json`);
    dlAnchorElem.click();
    window.app?.showToast('Berkas telemetri log berhasil diekspor.', 'success');
  }
}

window.adminManager = new AdminManager();
