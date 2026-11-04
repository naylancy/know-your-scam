/**
 * KNOW YOUR SCAM: ANTI-GRAVITY CYBER DEFENSE
 * Game Briefing & Two-Page View Manager (Page Start vs Page Game)
 * Features:
 * - Clear separation: Page Start (Briefing & Tutorial) & Page Game (Arena)
 * - Live real-time scoring HUD in Page Game
 * - "Kembali ke Briefing" navigation
 * - Synchronized timer control for Criminal Case
 */

(function() {
  'use strict';

  const briefings = {
    kasus: {
      key: 'kasus',
      badge: 'MODUL 1 // MULTI-POV',
      title: '📜 PROTOKOL KASUS SIBER (MULTI-POV SIMULATION)',
      category: 'Simulasi Naratif Multi Sudut Pandang',
      desc: 'Hadapi skenario serangan siber realistis (Phishing Bank NeoArtha, Love Scam Helios, dan Lowongan Kerja Bodong QuantumTech). Anda dapat berganti sudut pandang antara KORBAN dan PEMBURU ANCAMAN untuk menelusuri pesan terminal siber sebelum mengambil keputusan mitigasi.',
      objective: 'Mengidentifikasi anomali transmisi siber, menganalisis red flags emosional/teknis, dan mengeksekusi mitigasi Zero-Trust terbaik.',
      scoring: '+100 XP untuk setiap respon tepat dan penurunan indeks kerentanan (VULN). Penalti VULN jika memilih tindakan ceroboh.',
      steps: [
        'Pilih skenario kasus yang ingin diselesaikan pada bilah tab kasus.',
        'Gunakan tombol switch POV untuk berpindah perspektif antara KORBAN (merasakan urgensi psikologis) dan INVESTIGATOR (menganalisis bukti objektif).',
        'Analisis riwayat chat, nomor pengirim, nama domain fiktif, dan urgensi manipulasi.',
        'Pilih opsi tindakan mitigasi terbaik di bagian bawah terminal untuk menyelesaikan investigasi.',
        'Gunakan tombol "MINTA INTEL / HINT" jika membutuhkan petunjuk analisis dari intelijen siber.'
      ],
      startBtnText: '⚡ MULAI MISI KASUS'
    },

    diff: {
      key: 'diff',
      badge: 'MODUL 2 // FORENSIC COMPARISON',
      title: '⚖️ PROTOKOL FINDING DIFF (REAL VS FAKE)',
      category: 'Hakim Digital: Uji Forensik Komparatif Visual',
      desc: 'Bandingkan dua transmisi digital berdampingan secara visual (Portal Web Asli vs Web Phishing, Email Resmi vs Email Spoofing). Bertindaklah sebagai Hakim Siber untuk menentukan mana transmisi ASLI (REAL) dan mana tiruan PENIPU (FAKE).',
      objective: 'Menemukan anomali visual mikroskopis: perbedaan URL typo-squatting, sertifikat SSL, penataan layout, dan ejaan brand.',
      scoring: '+100 XP per vonis akurat. Penalti indeks kerentanan jika tertipu portal tiruan atau salah menetapkan status dokumen.',
      steps: [
        'Arahkan kursor atau sentuh layar pada dokumen kiri dan kanan untuk mengaktifkan kaca pembesar (Zoom Lens).',
        'Periksa bar alamat URL browser virtual dengan domain resmi korporat.',
        'Amati red flags visual: logo resolusi rendah, nomor kontak palsu, form login mencurigakan, dan ejaan nama instansi.',
        'Klik tombol raksasa neon "REAL" atau "FAKE" di bagian bawah untuk menjatuhkan vonis siber definitif.'
      ],
      startBtnText: '⚡ MULAI FINDING DIFF'
    },

    criminal: {
      key: 'criminal',
      badge: 'MODUL 3 // FORENSIC PUZZLE',
      title: '🕵️ PROTOKOL CRIMINAL CASE (INVESTIGASI SINDIKAT SIBER)',
      category: 'Papan Teka-Teki Investigasi Drag-and-Drop',
      desc: 'Pecahkan kasus investigasi sindikat kejahatan siber berantai sebelum batas waktu kritis habis. Bongkar anatomi serangan Business Email Compromise (BEC), penyebaran file malware APK perbankan, dan jaringan rekening penampung.',
      objective: 'Memetakan 4 bukti kunci digital (Aktor Asal, Vektor Serangan, Red Flag Kunci, dan Strategi Intervensi) serta mencocokkan dengan profil buronan siber.',
      scoring: '+150 XP per pemecahan kasus tepat waktu. Timer panik hanya berjalan saat Anda berada di dalam Arena Permainan.',
      steps: [
        'Perhatikan sisa waktu pada timer investigasi di bagian atas arena permainan.',
        'Tarik dan letakkan (Drag & Drop) atau klik kartu bukti digital ke 4 slot anatomi investigasi yang sesuai.',
        'Pilih tersangka utama dari daftar buronan siber berdasarkan kecocokan bukti log IP dan rekening penampung.',
        'Tekan tombol "EKSEKUSI PENANGKAPAN & SELESAIKAN KASUS" untuk menguji keabsahan hipotesis forensik Anda.'
      ],
      startBtnText: '⚡ MULAI INVESTIGASI'
    },

    deeplearn: {
      key: 'deeplearn',
      badge: 'MODUL 4 // HYBRID AI EVALUATOR',
      title: '🧠 PROTOKOL ANALYZER (EVALUASI SEMANTIK AI)',
      category: 'Evaluator Kualitatif Penalaran Siber Berbasis Hybrid LLM',
      desc: 'Uji kemampuan penalaran kritis Anda terhadap ancaman Zero-Day tanpa jawaban pilihan ganda sederhana. Tuliskan argumen forensik Anda sendiri. AI Evaluator (Google Gemini Cloud + Neural Core) akan membaca dan mengulas kedalaman penalaran Anda secara kualitatif.',
      objective: 'Mendiagnosis dokumen transmisi dan mengelaborasi argumen deteksi manipulasi siber dalam bahasa bebas.',
      scoring: 'Skor Semantik 0–100 XP per analisis berdasarkan kedalaman argumen, identifikasi vektor bahaya, dan rekomendasi mitigasi.',
      steps: [
        'Baca dokumen transmisi mencurigakan yang masuk pada konsol terminal di sebelah kiri.',
        'Pilih tingkat bahaya ancaman: AMAN, MENCURIGAKAN, BAHAYA, atau KRITIS.',
        'Tuliskan argumen kritis Anda pada kolom analisis: mengapa transmisi ini berbahaya dan red flag apa yang Anda temukan.',
        'Kirim analisis untuk menerima evaluasi skor kualitatif (0-100 XP) dan catatan ulasan kritik dari AI Evaluator Senior.'
      ],
      startBtnText: '⚡ MULAI ANALYZER'
    }
  };

  class GameBriefingManager {
    constructor() {
      // Game view state: 'start' (Page Start) or 'game' (Page Game)
      this.gameState = {
        kasus: 'start',
        diff: 'start',
        criminal: 'start',
        deeplearn: 'start'
      };
    }

    getState(gameKey) {
      return this.gameState[gameKey] || 'start';
    }

    isPlaying(gameKey) {
      return this.gameState[gameKey] === 'game';
    }

    startGame(gameKey) {
      window.cyberAudio?.playSuccess();
      this.gameState[gameKey] = 'game';

      const startEl = document.getElementById(`view-start-${gameKey}`);
      const gameEl = document.getElementById(`view-game-${gameKey}`);

      if (startEl) startEl.style.display = 'none';
      if (gameEl) {
        gameEl.style.display = 'block';
        gameEl.classList.add('holo-enter');
      }

      // Start criminal countdown timer if entering criminal game
      if (gameKey === 'criminal' && window.moduleCriminal) {
        window.moduleCriminal.startTimer();
      }

      // Scroll smoothly to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    returnToBriefing(gameKey) {
      window.cyberAudio?.playClick();
      this.gameState[gameKey] = 'start';

      const startEl = document.getElementById(`view-start-${gameKey}`);
      const gameEl = document.getElementById(`view-game-${gameKey}`);

      if (gameEl) gameEl.style.display = 'none';
      if (startEl) {
        startEl.style.display = 'block';
        startEl.classList.add('holo-enter');
      }

      // Stop criminal countdown timer while on briefing
      if (gameKey === 'criminal' && window.moduleCriminal) {
        window.moduleCriminal.stopTimer();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Renders the dedicated Page Start view HTML
    renderStartScreenHTML(gameKey) {
      const b = briefings[gameKey];
      if (!b) return '';

      const user = window.authManager?.currentUser;
      const gameScore = user?.game_scores?.[gameKey] || 0;
      const totalScore = user?.score || 0;
      const vuln = parseFloat(user?.vulnerability || 5.0).toFixed(1);

      return `
        <div id="view-start-${gameKey}" class="game-page-start holo-enter" style="display: ${this.isPlaying(gameKey) ? 'none' : 'block'};">
          <div class="hud-card" style="border-color: var(--border-cyan); padding: 32px; max-width: 1080px; margin: 0 auto; box-shadow: 0 0 50px rgba(0, 243, 255, 0.08);">
            
            <!-- Top Header & Badges -->
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom: 22px; border-bottom:1px solid rgba(0,243,255,0.15); padding-bottom:18px;">
              <div>
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                  <span class="cyber-tag tag-cyan" style="font-size:0.75rem; letter-spacing:1px;">${b.badge}</span>
                  <span class="cyber-tag tag-magenta" style="font-size:0.75rem;">ZERO-TRUST PROTOCOL</span>
                </div>
                <h1 style="font-size: 1.75rem; color: var(--text-highlight); margin: 6px 0 4px 0; letter-spacing: 0.5px;">
                  ${b.title}
                </h1>
                <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--neon-cyan);">
                  ${b.category}
                </div>
              </div>

              <!-- Operator Live Stats Pill -->
              <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
                <div class="cyber-tag tag-green" style="font-size:0.85rem; padding:6px 14px;">
                  SKOR GAME INI: <strong style="font-size:1.05rem; margin-left:4px;">${gameScore} XP</strong>
                </div>
                <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
                  Total Pertahanan: <span style="color:var(--neon-cyan);">${totalScore} XP</span> &bull; Kerentanan: <span style="color:var(--neon-magenta);">${vuln}/10</span>
                </div>
              </div>
            </div>

            <!-- Narrative Lore / Mission Context -->
            <div style="background: rgba(0, 243, 255, 0.04); border-left: 3px solid var(--neon-cyan); padding: 16px 20px; border-radius: 6px; margin-bottom: 24px;">
              <h4 style="color: var(--neon-cyan); margin: 0 0 6px 0; font-size: 0.92rem; letter-spacing: 0.8px;">
                LATAR BELAKANG OPERASI SIBER:
              </h4>
              <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6; margin: 0;">
                ${b.desc}
              </p>
            </div>

            <!-- 2-Column Info Grid: Objectives & Scoring Rules -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px; margin-bottom: 24px;">
              <!-- Mission Objectives -->
              <div style="background: rgba(5, 5, 10, 0.6); border: 1px solid var(--border-cyan); border-radius: 8px; padding: 18px;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                  <span style="font-size: 1.3rem;">🎯</span>
                  <h4 style="color: var(--neon-cyan); margin:0; font-size: 1rem;">TUJUAN UTAMA MISI:</h4>
                </div>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin:0;">
                  ${b.objective}
                </p>
              </div>

              <!-- Scoring Rulebook -->
              <div style="background: rgba(5, 5, 10, 0.6); border: 1px solid rgba(0, 255, 157, 0.3); border-radius: 8px; padding: 18px;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                  <span style="font-size: 1.3rem;">⚖️</span>
                  <h4 style="color: var(--neon-green); margin:0; font-size: 1rem;">SISTEM SKOR & PENILAIAN:</h4>
                </div>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin:0;">
                  ${b.scoring}
                </p>
              </div>
            </div>

            <!-- Tutorial & Step-by-Step Guide -->
            <div style="background: rgba(5, 5, 10, 0.8); border: 1px solid rgba(189, 0, 255, 0.3); border-radius: 8px; padding: 20px; margin-bottom: 30px;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
                <span style="font-size: 1.3rem;">📖</span>
                <h4 style="color: var(--neon-magenta); margin:0; font-size: 1.05rem;">TATA CARA BERMAIN & PANDUAN KONTROL:</h4>
              </div>
              <ol style="margin: 0 0 0 20px; padding: 0; line-height: 1.85; font-size: 0.9rem; color: var(--text-main);">
                ${b.steps.map(s => `<li>${s}</li>`).join('')}
              </ol>
            </div>

            <!-- Footer Action CTA Bar -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; border-top:1px solid rgba(0,243,255,0.15); padding-top:20px;">
              <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">
                Status: <span style="color:var(--neon-green);">Sistem Siap Diuji</span> &bull; Mode: <span style="color:var(--neon-cyan);">Simulasi Interaktif</span>
              </div>
              
              <button class="cyber-btn" style="padding: 14px 36px; font-size: 1.05rem; box-shadow: 0 0 25px var(--neon-cyan-dim); letter-spacing: 1px;" onclick="window.gameBriefing.startGame('${gameKey}')">
                <span>⚡</span> ${b.startBtnText} ➔
              </button>
            </div>

          </div>
        </div>
      `;
    }

    // Renders the dedicated In-Game HUD Bar for Page Game
    renderGameHUDBar(gameKey) {
      const b = briefings[gameKey];
      const user = window.authManager?.currentUser;
      const gameScore = user?.game_scores?.[gameKey] || 0;
      const totalScore = user?.score || 0;

      return `
        <div class="game-live-hud-bar" id="game-live-hud-${gameKey}" style="margin-bottom: 20px;">
          <!-- Left: Return to Briefing Button -->
          <div style="display:flex; align-items:center; gap: 12px;">
            <button type="button" class="cyber-btn btn-ghost" style="padding: 6px 14px; font-size: 0.8rem; border-color: var(--border-cyan); color: var(--neon-cyan);" onclick="window.gameBriefing.returnToBriefing('${gameKey}')" title="Kembali ke Layar Briefing dan Tutorial">
              <span>←</span> BRIEFING & TUTORIAL
            </button>
            <span class="cyber-tag" style="font-size:0.75rem;">${b ? b.badge : 'GAME ACTIVE'}</span>
          </div>

          <!-- Center/Right: Live Score Badges -->
          <div style="display:flex; align-items:center; gap: 12px; flex-wrap:wrap;">
            <div class="game-score-badge">
              <span>🎮 SKOR GAME INI:</span>
              <strong id="live-score-${gameKey}">${gameScore} XP</strong>
            </div>
            <div class="game-score-badge badge-total">
              <span>🏆 TOTAL AKUMULASI:</span>
              <strong id="live-total-score-${gameKey}">${totalScore} XP</strong>
            </div>
            <button class="btn-intel-hint" onclick="window.hintSystem?.openHintModal()" title="Minta petunjuk intelijen pertahanan">
              <span>💡</span> HINT
            </button>
          </div>
        </div>
      `;
    }

    hasSeen(gameKey) {
      return this.isPlaying(gameKey);
    }
  }

  window.gameBriefing = new GameBriefingManager();
})();
