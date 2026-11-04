/**
 * KNOW YOUR SCAM: ANTI-GRAVITY CYBER DEFENSE
 * Game Briefing & Tutorial Overlay Manager
 * Menampilkan deskripsi misi dan tutorial cara bermain di setiap game
 */

(function() {
  'use strict';

  const briefings = {
    kasus: {
      key: 'kasus',
      title: '📜 PROTOKOL KASUS SIBER (MULTI-POV)',
      category: 'Simulasi Naratif Multi Sudut Pandang',
      desc: 'Hadapi simulasi skenario penipuan siber realistis (Phishing Perbankan, Love Scam, Lowongan Kerja Bodong) melalui percakapan terminal. Anda dapat berganti sudut pandang antara KORBAN dan PEMBURU ANCAMAN.',
      objective: 'Mengidentifikasi anomali transmisi dan memilih tindakan mitigasi Zero-Trust yang paling tepat.',
      steps: [
        'Gunakan tombol POV untuk berganti sudut pandang dan membaca riwayat chat dari perspektif berbeda.',
        'Analisis bukti digital: nomor pengirim, nama domain, tautan, dan manipulasi psikologis (urgensi waktu).',
        'Pilih opsi respon terbaik di bagian bawah konsol untuk menuntaskan kasus.',
        'Gunakan tombol "MINTA INTEL / HINT" jika membutuhkan petunjuk analisis dari sistem intelijen.'
      ],
      scoring: '+100 XP per respon tepat & menurunkan indikator kerentanan (VULN).',
      containerId: 'kasus-module-container',
      startBtnText: '⚡ MULAI MISI KASUS'
    },

    diff: {
      key: 'diff',
      title: '⚖️ PROTOKOL FINDING DIFF (REAL VS FAKE)',
      category: 'Hakim Digital: Uji Forensik Komparatif',
      desc: 'Bandingkan dua transmisi digital berdampingan secara visual (Portal Web Asli vs Web Phishing, Email Resmi vs Email Spoofing). Bertindaklah sebagai Hakim Siber untuk menentukan mana yang Asli (REAL) dan Tiruan (FAKE).',
      objective: 'Menemukan anomali forensik visual: perbedaan domain, sertifikat SSL, tata letak, dan ejaan brand.',
      steps: [
        'Arahkan kursor / sentuh layar pada dokumen kiri dan kanan untuk mengaktifkan kaca pembesar (Zoom Lens).',
        'Bandingkan struktur URL di address bar browser virtual dengan domain resmi korporat.',
        'Amati red flags visual: logo resolusi rendah, nomor kontak palsu, form login mencurigakan.',
        'Klik tombol raksasa neon "REAL" atau "FAKE" di bagian bawah untuk menjatuhkan vonis siber.'
      ],
      scoring: '+100 XP per vonis akurat. Penalti jika tertipu portal tiruan.',
      containerId: 'diff-module-container',
      startBtnText: '⚡ MULAI FINDING DIFF'
    },

    criminal: {
      key: 'criminal',
      title: '🕵️ PROTOKOL CRIMINAL CASE (INVESTIGASI FORENSIK)',
      category: 'Papan Teka-Teki Investigasi Sindikat',
      desc: 'Selesaikan kasus investigasi kejahatan siber berantai sebelum batas waktu kritis habis. Bongkar modus operandi Business Email Compromise (BEC), penipuan APK perbankan, dan sindikat investasi palsu.',
      objective: 'Menemukan 4 bukti kunci digital dan mencocokkannya dengan profil tersangka sindikat siber.',
      steps: [
        'Perhatikan sisa waktu pada timer investigasi. Timer hanya berjalan saat Anda berada di menu ini.',
        'Periksa 4 barang bukti di papan investigasi (Log IP, File APK, Rekening Penampung, Alamat C2).',
        'Pilih tersangka utama dari daftar buronan siber berdasarkan kecocokan bukti forensik.',
        'Tekan tombol "EKSEKUSI PENANGKAPAN & SELESAIKAN KASUS" untuk memverifikasi analisa Anda.'
      ],
      scoring: '+150 XP per pemecahan kasus tepat waktu. Kasus berganti setiap sesi.',
      containerId: 'criminal-module-container',
      startBtnText: '⚡ MULAI INVESTIGASI'
    },

    deeplearn: {
      key: 'deeplearn',
      title: '🧠 PROTOKOL ANALYZER (EVALUASI SEMANTIK AI)',
      category: 'Evaluator Kualitatif Penalaran Siber Berbasis Hybrid LLM',
      desc: 'Uji kemampuan penalaran kritis Anda terhadap ancaman Zero-Day. Tuliskan argumen analisis forensik Anda sendiri. AI Evaluator (Google Gemini Cloud + Neural Core) akan membaca dan menilai kedalaman penalaran Anda secara kualitatif.',
      objective: 'Mendiagnosis dokumen transmisi dan mengelaborasi argumen deteksi manipulasi siber.',
      steps: [
        'Baca dokumen transmisi mencurigakan yang masuk pada konsol terminal di sebelah kiri.',
        'Tentukan tingkat bahaya ancaman: AMAN, MENCURIGAKAN, BAHAYA, atau KRITIS.',
        'Tuliskan argumen kritis Anda pada kolom analisis: mengapa transmisi ini berbahaya dan red flag apa yang Anda temukan.',
        'Kirim analisis untuk menerima evaluasi skor kualitatif (0-100) dan ulasan kritik dari evaluator AI senior.'
      ],
      scoring: 'Skor Kualitatif Semantik 0–100 XP berdasarkan kedalaman argumen.',
      containerId: 'deeplearn-module-container',
      startBtnText: '⚡ MULAI ANALYZER'
    }
  };

  class GameBriefingManager {
    constructor() {
      this.seenBriefings = {};
    }

    renderBriefingHTML(gameKey) {
      const b = briefings[gameKey];
      if (!b) return '';

      const user = window.authManager?.currentUser;
      const gameScore = user?.game_scores?.[gameKey] || 0;
      const totalScore = user?.score || 0;

      return `
        <div class="game-briefing-overlay" id="briefing-overlay-${gameKey}">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 14px;">
            <div>
              <span class="cyber-tag tag-cyan" style="font-size:0.75rem;">BRIEFING MISI SIBER</span>
              <h2 class="game-briefing-title" style="margin-top:6px;">${b.title}</h2>
              <div class="game-briefing-subtitle">${b.category}</div>
            </div>
            <div style="text-align:right;">
              <span class="cyber-tag tag-green" style="font-size:0.72rem;">SKOR ANDA: ${gameScore} XP</span>
            </div>
          </div>

          <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6; margin-bottom: 20px;">
            ${b.desc}
          </p>

          <div class="game-briefing-grid">
            <div class="game-briefing-box">
              <h4><span>🎯</span> TUJUAN MISI:</h4>
              <p>${b.objective}</p>
            </div>
            <div class="game-briefing-box">
              <h4><span>⚖️</span> ATURAN SKOR & REPUTASI:</h4>
              <p>${b.scoring}</p>
            </div>
          </div>

          <div class="game-briefing-box" style="margin-bottom: 24px;">
            <h4><span>📖</span> CARA BERMAIN & TUTORIAL:</h4>
            <ol style="margin: 8px 0 0 18px; padding: 0; line-height: 1.8; font-size: 0.85rem; color: var(--text-muted);">
              ${b.steps.map(s => `<li>${s}</li>`).join('')}
            </ol>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted);">
              Status: <span style="color:var(--neon-cyan);">Zero-Trust Protocol Active</span> &bull; Total XP: <span style="color:var(--neon-green);">${totalScore} XP</span>
            </div>
            <button class="cyber-btn" style="padding: 12px 28px; font-size: 1rem; box-shadow: 0 0 20px var(--neon-cyan-dim);" onclick="window.gameBriefing.dismiss('${gameKey}')">
              <span>⚡</span> ${b.startBtnText} ➔
            </button>
          </div>
        </div>
      `;
    }

    renderHUDBar(gameKey) {
      const user = window.authManager?.currentUser;
      const gameScore = user?.game_scores?.[gameKey] || 0;
      const totalScore = user?.score || 0;

      return `
        <div class="game-live-hud-bar" id="game-live-hud-${gameKey}">
          <div style="display:flex; align-items:center; gap: 14px; flex-wrap:wrap;">
            <div class="game-score-badge">
              <span>🎮 SKOR GAME INI:</span>
              <strong id="live-score-${gameKey}">${gameScore} XP</strong>
            </div>
            <div class="game-score-badge badge-total">
              <span>🏆 TOTAL AKUMULASI:</span>
              <strong id="live-total-score-${gameKey}">${totalScore} XP</strong>
            </div>
          </div>
          <div style="display:flex; gap: 8px;">
            <button type="button" class="cyber-btn btn-ghost" style="padding: 5px 12px; font-size: 0.75rem;" onclick="window.gameBriefing.show('${gameKey}')" title="Buka Ulang Tutorial Misi Ini">
              <span>ℹ️</span> TUTORIAL
            </button>
          </div>
        </div>
      `;
    }

    show(gameKey) {
      window.cyberAudio?.playClick();
      const existing = document.getElementById(`briefing-overlay-${gameKey}`);
      if (existing) {
        existing.style.display = 'block';
        const gameContent = document.getElementById(`game-content-${gameKey}`);
        if (gameContent) gameContent.style.display = 'none';
        return;
      }
    }

    dismiss(gameKey) {
      window.cyberAudio?.playSuccess();
      this.seenBriefings[gameKey] = true;
      const overlay = document.getElementById(`briefing-overlay-${gameKey}`);
      if (overlay) overlay.style.display = 'none';

      const gameContent = document.getElementById(`game-content-${gameKey}`);
      if (gameContent) {
        gameContent.style.display = 'block';
      }
    }

    hasSeen(gameKey) {
      return !!this.seenBriefings[gameKey];
    }
  }

  window.gameBriefing = new GameBriefingManager();
})();
