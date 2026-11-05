/**
 * KNOW YOUR SCAM: ANTI-GRAVITY CYBER DEFENSE
 * Game Briefing & Two-Page View Manager (Page Start vs Page Game)
 * Features:
 * - Clear separation: Page Start (Briefing, Tutorial & Scenario Catalog) & Page Game (Arena)
 * - Progressive unlocking catalog across all 4 game modules (Kasus, Diff, Criminal, Analyzer)
 * - Single-scenario dedicated gameplay arena (No switching tabs inside arena)
 * - Live real-time scoring HUD in Page Game
 * - "Kembali ke Briefing & Katalog" navigation with live state refresh
 * - Synchronized timer control for Criminal Case
 */

(function() {
  'use strict';

  const briefings = {
    kasus: {
      key: 'kasus',
      badge: 'MODUL 1 // MULTI-POV',
      title: '🎭 PROTOKOL SCAM SIMULATOR (ROLEPLAY ARENA)',
      category: 'Simulasi Psikologis Multi-POV: Scammer vs Victim',
      desc: 'Simulasi interaktif rekayasa sosial dari dua sudut pandang kontras: bertindak sebagai Scammer (memanipulasi mangsa) atau Victim (menghindari jeratan penipuan melalui smartphone) dengan karakter hewan pixel unik.',
      objective: 'Kuasai pola pikir pelaku rekayasa sosial dan latih insting pertahanan digital untuk membongkar manipulasi psikologis.',
      scoring: '+100-150 XP per keberhasilan skenario (Happy Ending) dan penurunan indeks kerentanan VULN.',
      steps: [
        'Pilih Role Anda: "Scammer" (Si Penipu) atau "Victim" (Calon Korban).',
        'Pilih Karakter Hewan Pixel: Buaya, Singa, Elang (Scammer) / Kucing, Hamster, Kelinci (Victim).',
        'Jalani simulasi chat interaktif (tersedia simulasi panggilan telepon untuk Love Scam dan portal link untuk Phishing).',
        'Untuk role Victim: Tuliskan argumen forensik mengapa pesan tersebut merupakan penipuan sebelum melihat hasil ending!'
      ],
      startBtnText: '⚡ MULAI SCAM SIMULATOR'
    },

    diff: {
      key: 'diff',
      badge: 'MODUL 2 // FORENSIC COMPARISON',
      title: '⚖️ PROTOKOL FINDING DIFF (REAL VS FAKE)',
      category: 'Hakim Digital: Uji Forensik Komparatif Visual',
      desc: 'Bandingkan dua antarmuka web berdampingan secara visual. Bertindaklah sebagai Hakim Siber untuk memutuskan dokumen ASLI (REAL) vs TIRUAN (FAKE).',
      objective: 'Temukan anomali domain, keabsahan SSL, dan ketidaksesuaian elemen visual antarmuka.',
      scoring: '+100 XP per vonis akurat. Penalti indeks kerentanan jika salah menetapkan status dokumen.',
      steps: [
        'Pilih skenario terbuka pada katalog misi (skenario lanjutan terbuka bertahap).',
        'Klik salah satu jendela browser virtual (Skenario A atau B) untuk menginspeksi.',
        'Periksa keabsahan URL bar, sertifikat SSL, dan daftar elemen visual terdeteksi.',
        'Jatuhkan vonis dengan menekan tombol REAL atau FAKE pada dermaga kontrol bawah.'
      ],
      startBtnText: '⚡ MULAI FINDING DIFF'
    },

    criminal: {
      key: 'criminal',
      badge: 'MODUL 3 // CRIMINAL CASE',
      title: '🦉 PROTOKOL CRIMINAL CASE: DETEKTIF BURUNG HANTU',
      category: 'Investigasi TKP Digital & Pemburu Red Flags Ala Criminal Case',
      desc: 'Gim edukasi berbasis teka-teki investigasi kriminal ala Criminal Case. Pemain berperan sebagai Detektif Burung Hantu yang harus menganalisis TKP Digital, memilah berbagai skenario kasus harian (phishing, tawaran palsu, social engineering), mengumpulkan Red Flags (barang bukti), dan menggagalkan aksi penipu sebelum korban merugi.',
      objective: 'Analisis TKP digital interaktif, temukan 3 Red Flags tersembunyi, dan jatuhkan keputusan mitigasi tepat untuk menyematkan stempel CASE CLOSED.',
      scoring: '+150 XP per pemecahan kasus tepat sasaran (Case Closed) dan penurunan indeks kerentanan VULN.',
      steps: [
        'Buka map berkas kasus (CASE #01, CASE #02, CASE #03) di Meja Kerja Detektif.',
        'Pelajari briefing dialog sinopsis bersama Korban (Raka, Tari, Ibu Sari) dan pahami identitas korban.',
        'Inspeksi TKP Digital: Klik 3 titik Red Flags mencurigakan pada layar perangkat digital korban.',
        'Rumuskan keputusan mitigasi terbaik dan tangkap pelaku untuk menyematkan stempel CASE CLOSED!'
      ],
      startBtnText: '🔎 BUKA MEJA KERJA DETEKTIF'
    },

    deeplearn: {
      key: 'deeplearn',
      badge: 'MODUL 4 // OWL AI ANALYZER',
      title: '🧠 PROTOKOL ANALYZER: LIVE GADGET & OWL FORENSICS',
      category: 'Simulasi Live Gadget, X-Ray Scanner & Stempel Vonis',
      desc: 'Analisis pesan mencurigakan pada Live Gadget interaktif dengan animasi notifikasi masuk dan timer palsu. Gunakan Mode X-Ray Detektif Owl untuk menyingkap metadata tersembunyi, jatuhkan Stempel Vonis (PENIPUAN vs AMAN), dan uji nalar Anda di Owl AI Forensics Lab.',
      objective: 'Bongkar manipulasi psikologis penipu dengan Mode X-Ray, jatuhkan stempel vonis akurat, dan dapatkan evaluasi forensik Detektif Owl.',
      scoring: 'Skor Akurasi Forensik 0–100 XP per analisis berdasarkan ketepatan vonis dan deteksi red flags.',
      steps: [
        'Buka skenario terbuka pada katalog (tersedia uji kasus edukasi aman vs phishing).',
        'Amati pesan masuk satu per satu di Live Gadget dan rasakan kepanikan timer palsu penipu.',
        'Aktifkan "Mode Analisis Owl" untuk menyorot metadata tersembunyi (nomor asli, umur domain, taktik panik).',
        'Jatuhkan Stempel Vonis (PENIPUAN atau AMAN) dan kirimkan penalaran kritis ke Owl AI Forensics Lab!'
      ],
      startBtnText: '⚡ BUKA LIVE GADGET ANALYZER'
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

      // Rerender game module to refresh briefing catalog
      if (gameKey === 'kasus' && window.moduleKasus) {
        window.moduleKasus.render();
      } else if (gameKey === 'diff' && window.moduleDiff) {
        window.moduleDiff.render();
      } else if (gameKey === 'criminal' && window.moduleCriminal) {
        window.moduleCriminal.stopTimer();
        window.moduleCriminal.render();
      } else if (gameKey === 'deeplearn' && window.moduleDeepLearning) {
        window.moduleDeepLearning.render();
      } else {
        const startEl = document.getElementById(`view-start-${gameKey}`);
        const gameEl = document.getElementById(`view-game-${gameKey}`);
        if (gameEl) gameEl.style.display = 'none';
        if (startEl) {
          startEl.style.display = 'block';
          startEl.classList.add('holo-enter');
        }
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Helper to get case items for any game key
    getCasesForGame(gameKey) {
      if (gameKey === 'kasus') {
        return window.moduleKasus?.cases || window.__LARAVEL_INITIAL_DATA__?.cases_kasus || [];
      }
      if (gameKey === 'diff') {
        return window.moduleDiff?.diffCases || window.__LARAVEL_INITIAL_DATA__?.cases_diff || [];
      }
      if (gameKey === 'criminal') {
        return window.moduleCriminal?.cases || window.__LARAVEL_INITIAL_DATA__?.cases_criminal || [];
      }
      if (gameKey === 'deeplearn') {
        return window.moduleDeepLearning?.cases || window.__LARAVEL_INITIAL_DATA__?.cases_deeplearn || [];
      }
      return [];
    }

    // Helper to get module instance for any game key
    getModuleInstance(gameKey) {
      if (gameKey === 'kasus') return window.moduleKasus;
      if (gameKey === 'diff') return window.moduleDiff;
      if (gameKey === 'criminal') return window.moduleCriminal;
      if (gameKey === 'deeplearn') return window.moduleDeepLearning;
      return null;
    }

    // Helper to render interactive scenario catalog with locked/unlocked states for ANY game
    renderScenariosCatalog(gameKey, unlockedIndex) {
      const cases = this.getCasesForGame(gameKey);
      if (!cases || cases.length === 0) return '';

      const moduleObjName = 
        gameKey === 'kasus' ? 'window.moduleKasus' :
        gameKey === 'diff' ? 'window.moduleDiff' :
        gameKey === 'criminal' ? 'window.moduleCriminal' :
        'window.moduleDeepLearning';

      const cardsHtml = cases.map((c, idx) => {
        const isUnlocked = idx <= unlockedIndex;
        const isCompleted = idx < unlockedIndex;
        const isCurrentActive = idx === unlockedIndex;
        const isCustom = !!c.is_custom;

        // Metadata extraction based on module type
        let title = c.title || `Skenario #${idx + 1}`;
        let subtitle = c.subtitle || c.scenario || c.description || 'Simulasi keputusan investigasi ancaman siber.';
        let category = c.category || c.type || (gameKey === 'criminal' ? 'SIND_INVESTIGATION' : 'CYBER_THREAT');
        let typeIcon = '🛡️';
        let metaLabel = '';

        if (gameKey === 'kasus') {
          typeIcon = c.type === 'phishing' ? '📧' : c.type === 'lovescam' ? '💖' : '💼';
          metaLabel = `📝 ${(c.story_steps || []).length} Tahapan Misi • 👥 Dual POV`;
        } else if (gameKey === 'diff') {
          typeIcon = '⚖️';
          metaLabel = `🔍 Komparasi Portal Asli vs Tiruan • EV/SSL Inspection`;
        } else if (gameKey === 'criminal') {
          typeIcon = '🕵️';
          metaLabel = `⏱️ ${c.timer_seconds || 90} Detik • Potensi Rugi: ${c.potential_loss || 'Kritis'}`;
        } else if (gameKey === 'deeplearn') {
          typeIcon = '🧠';
          metaLabel = `🤖 Evaluasi Semantik Hybrid LLM • Penalaran Kritis`;
        }

        return `
          <div class="scenario-catalog-card ${isUnlocked ? 'unlocked' : 'locked'}" 
               style="background: rgba(8, 12, 26, 0.85); 
                      border: 1px solid ${isCurrentActive ? 'var(--neon-cyan)' : isUnlocked ? 'rgba(0, 243, 255, 0.35)' : 'rgba(255, 255, 255, 0.1)'}; 
                      border-radius: 8px; 
                      padding: 22px; 
                      display: flex; 
                      flex-direction: column; 
                      justify-content: space-between; 
                      position: relative;
                      box-shadow: ${isCurrentActive ? '0 0 20px rgba(0, 243, 255, 0.15)' : 'none'};
                      ${isUnlocked ? '' : 'filter: grayscale(40%); opacity: 0.65;'}">
            
            <div>
              <!-- Top Badges -->
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; gap: 8px; flex-wrap: wrap;">
                <div>
                  <span class="cyber-tag ${isCompleted ? 'tag-green' : isCurrentActive ? 'tag-cyan' : ''}" 
                        style="${isUnlocked ? '' : 'border-color: rgba(255,255,255,0.2); color: var(--text-muted);'}">
                    ${isCompleted ? '✅ SELESAI' : isCurrentActive ? '⚡ AKTIF DIBUKA' : '🔒 TERKUNCI'}
                  </span>
                  ${isCustom ? `<span class="cyber-tag" style="border-color: var(--neon-magenta); color: var(--neon-magenta); margin-left: 4px;">⭐ KUSTOM</span>` : ''}
                </div>
                <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
                  SKENARIO ${idx + 1} &bull; <strong style="color: var(--neon-cyan);">${c.difficulty || 'Sedang'}</strong>
                </div>
              </div>

              <!-- Title & Category -->
              <div style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px;">
                <span style="font-size: 1.3rem; line-height: 1;">${typeIcon}</span>
                <div>
                  <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon-cyan); text-transform: uppercase; letter-spacing: 0.8px;">
                    ${category.toUpperCase()}
                  </div>
                  <h3 style="font-size: 1.06rem; color: ${isUnlocked ? 'var(--text-highlight)' : 'var(--text-muted)'}; margin: 2px 0 0 0; line-height: 1.4;">
                    ${title}
                  </h3>
                </div>
              </div>

              <!-- Subtitle / Context -->
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin: 10px 0 16px 0;">
                ${subtitle}
              </p>

              <!-- Meta info -->
              <div style="display: flex; gap: 12px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 20px; border-top: 1px dashed rgba(255,255,255,0.08); padding-top: 10px;">
                <span>${metaLabel}</span>
              </div>
            </div>

            <!-- Action Button -->
            <div>
              ${isUnlocked ? `
                <button class="cyber-btn ${isCompleted ? 'btn-ghost' : ''}" 
                        style="width: 100%; justify-content: center; padding: 11px 18px; font-size: 0.9rem;" 
                        onclick="${moduleObjName}.startScenario(${idx})">
                  <span>⚡</span> ${isCompleted ? 'MAINKAN ULANG SKENARIO' : 'MASUK KE SKENARIO INI'} ➔
                </button>
              ` : `
                <button class="cyber-btn btn-ghost" 
                        disabled 
                        style="width: 100%; justify-content: center; padding: 11px 18px; font-size: 0.85rem; opacity: 0.5; cursor: not-allowed; border-color: rgba(255,255,255,0.2); color: var(--text-muted);">
                  <span>🔒</span> Terkunci (Selesaikan Skenario ${idx} Dahulu)
                </button>
              `}
            </div>

          </div>
        `;
      }).join('');

      return `
        <!-- Scenario Catalog with Progressive Unlocking -->
        <div style="margin-bottom: 30px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 12px; border-bottom: 1px solid rgba(0,243,255,0.15); padding-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.3rem;">📂</span>
              <h3 style="color: var(--neon-cyan); margin: 0; font-size: 1.15rem; letter-spacing: 0.5px;">
                KATALOG SKENARIO MISI (TAHAPAN BERTINGKAT):
              </h3>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">
              Progress: <strong style="color: var(--neon-green); font-size: 0.95rem;">${Math.min(unlockedIndex + 1, cases.length)}/${cases.length} Skenario Terbuka</strong>
            </div>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0 0 18px 0; line-height: 1.5;">
            Selesaikan skenario secara berurutan untuk membuka protokol investigasi berikutnya. Skenario yang telah diselesaikan dapat dimainkan ulang sewaktu-waktu.
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px;">
            ${cardsHtml}
          </div>
        </div>
      `;
    }

    // Legacy method forwarder
    renderKasusScenariosCatalog(unlockedIndex) {
      return this.renderScenariosCatalog('kasus', unlockedIndex);
    }

    // Renders the dedicated Page Start view HTML
    renderStartScreenHTML(gameKey) {
      const b = briefings[gameKey];
      if (!b) return '';

      const user = window.authManager?.currentUser;
      const gameScore = user?.game_scores?.[gameKey] || 0;
      const totalScore = user?.score || 0;
      const vuln = parseFloat(user?.vulnerability || 5.0).toFixed(1);

      // Progressive scenario catalog across all games
      const modInstance = this.getModuleInstance(gameKey);
      const activeCaseIndex = modInstance?.getUnlockedIndex ? modInstance.getUnlockedIndex() : 0;
      const scenarioCatalogHtml = this.renderScenariosCatalog(gameKey, activeCaseIndex);

      const moduleObjName = 
        gameKey === 'kasus' ? 'window.moduleKasus' :
        gameKey === 'diff' ? 'window.moduleDiff' :
        gameKey === 'criminal' ? 'window.moduleCriminal' :
        'window.moduleDeepLearning';

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
            <div class="briefing-lore-box" style="padding: 16px 20px; border-radius: 6px; margin-bottom: 24px;">
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
              <div class="briefing-objective-card" style="border-radius: 8px; padding: 18px;">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                  <span style="font-size: 1.3rem;">🎯</span>
                  <h4 style="color: var(--neon-cyan); margin:0; font-size: 1rem;">TUJUAN UTAMA MISI:</h4>
                </div>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; margin:0;">
                  ${b.objective}
                </p>
              </div>

              <!-- Scoring Rulebook -->
              <div class="briefing-scoring-card" style="border-radius: 8px; padding: 18px;">
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
            <div class="briefing-tutorial-card" style="border-radius: 8px; padding: 20px; margin-bottom: 28px;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
                <span style="font-size: 1.3rem;">📖</span>
                <h4 style="color: var(--neon-magenta); margin:0; font-size: 1.05rem;">TATA CARA BERMAIN & PANDUAN KONTROL:</h4>
              </div>
              <ol style="margin: 0 0 0 20px; padding: 0; line-height: 1.85; font-size: 0.9rem; color: var(--text-main);">
                ${b.steps.map(s => `<li>${s}</li>`).join('')}
              </ol>
            </div>

            <!-- Scenario Catalog with Progressive Unlocking -->
            ${scenarioCatalogHtml}

            <!-- Footer Action CTA Bar -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; border-top:1px solid rgba(0,243,255,0.15); padding-top:20px;">
              <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">
                Status: <span style="color:var(--neon-green);">Sistem Siap Diuji</span> &bull; Mode: <span style="color:var(--neon-cyan);">Simulasi Interaktif</span>
              </div>
              
              <button class="cyber-btn" style="padding: 14px 36px; font-size: 1.05rem; box-shadow: 0 0 25px var(--neon-cyan-dim); letter-spacing: 1px;" onclick="${moduleObjName}.startScenario(${activeCaseIndex})">
                <span>⚡</span> MAINKAN SKENARIO ${activeCaseIndex + 1} ➔
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
              <span>←</span> BRIEFING & KATALOG
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
