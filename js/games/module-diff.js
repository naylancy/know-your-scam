/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * MODUL 2: FINDING DIFF (Judge / Juri: Real vs Fake)
 * Features:
 * - Progressive scenario unlocking & catalog support
 * - Dedicated single-scenario gameplay arena (No tab switcher)
 * - Side-by-side zoom forensic comparative inspection
 */

class ModuleDiff {
  constructor() {
    this.diffCases = [];
    this.currentIndex = 0;
    this.selectedSide = 'left'; // 'left' or 'right'
    this.userJudgments = { left: null, right: null };
  }

  init(diffData) {
    this.diffCases = diffData || [];
    this.currentIndex = 0;
    this.selectedSide = 'left';
    this.userJudgments = { left: null, right: null };
    this.render();
  }

  getStorageKey() {
    const user = window.authManager?.currentUser;
    return user ? `knowyourscam_unlocked_diff_${user.id || user.username}` : 'knowyourscam_unlocked_diff_guest';
  }

  getUnlockedIndex() {
    try {
      const key = this.getStorageKey();
      const val = localStorage.getItem(key);
      if (val !== null) {
        const parsed = parseInt(val, 10);
        return isNaN(parsed) ? 0 : Math.max(0, parsed);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return 0; // First scenario unlocked by default
  }

  unlockNextCase() {
    try {
      const currentUnlocked = this.getUnlockedIndex();
      if (this.currentIndex >= currentUnlocked) {
        const nextIdx = Math.min(this.diffCases.length - 1, this.currentIndex + 1);
        localStorage.setItem(this.getStorageKey(), String(nextIdx));
      }
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  startScenario(idx) {
    const unlocked = this.getUnlockedIndex();
    if (idx > unlocked) {
      window.cyberAudio?.playError();
      alert('Skenario ini masih terkunci! Selesaikan skenario sebelumnya untuk membukanya.');
      return;
    }
    this.currentIndex = idx;
    this.selectedSide = 'left';
    this.userJudgments = { left: null, right: null };
    if (window.gameBriefing) {
      window.gameBriefing.startGame('diff');
    }
    this.render();
  }

  setCase(idx) {
    this.startScenario(idx);
  }

  selectSide(side) {
    this.selectedSide = side;
    window.cyberAudio?.playWhoosh();
    this.render();
  }

  render() {
    const container = document.getElementById('diff-module-container');
    if (!container) return;

    if (!this.diffCases || this.diffCases.length === 0) {
      container.innerHTML = `<div class="hud-card" style="padding: 30px; text-align: center;">Memuat basis data perbandingan keaslian...</div>`;
      return;
    }

    const currentDiff = this.diffCases[this.currentIndex];

    // Set hint
    window.hintSystem?.setHints([currentDiff.hint, currentDiff.analysis]);

    const isCustom = currentDiff.is_custom;
    const left = currentDiff.left_card;
    const right = currentDiff.right_card;

    const leftActive = this.selectedSide === 'left';
    const rightActive = this.selectedSide === 'right';

    // Two-Page System: Page Start (Briefing & Tutorial) vs Page Game (Arena)
    const isPlaying = window.gameBriefing?.isPlaying('diff');
    const startScreenHtml = window.gameBriefing?.renderStartScreenHTML('diff') || '';
    const hudBarHtml = window.gameBriefing?.renderGameHUDBar('diff') || '';
    const guestBanner = typeof window.renderGuestLeaderboardBanner === 'function'
      ? window.renderGuestLeaderboardBanner({ margin: '0 0 16px 0' })
      : '';

    container.innerHTML = `
      ${guestBanner}
      ${startScreenHtml}
      <div id="view-game-diff" class="game-page-arena holo-enter diff-container" style="${isPlaying ? 'display:block;' : 'display:none;'}">
        ${hudBarHtml}

        <!-- Single Selected Scenario Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 14px;">
          <div style="display:flex; gap: 8px; align-items:center; flex-wrap:wrap;">
            <span class="cyber-tag tag-cyan" style="font-size: 0.82rem; letter-spacing: 0.5px;">
              ⚖️ SKENARIO ${this.currentIndex + 1} DARI ${this.diffCases.length}
            </span>
            <span class="cyber-tag tag-magenta" style="font-size: 0.82rem;">
              ${(currentDiff.category || 'KOMPARASI').toUpperCase()}
            </span>
            ${isCustom ? `<span class="cyber-tag" style="border-color: var(--neon-magenta); color: var(--neon-magenta);">⭐ KASUS KUSTOM</span>` : ''}
          </div>
        </div>

        ${isCustom ? `
          <div style="background: rgba(189, 0, 255, 0.12); border: 1px solid var(--border-magenta); border-radius: 6px; padding: 12px 18px; margin-bottom: 18px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.3rem;">🛡️</span>
              <div>
                <strong style="color: var(--neon-magenta); font-family: var(--font-display); font-size: 0.9rem;">
                  MODUL KUSTOM ADMINISTRATOR
                </strong>
                <div style="font-size: 0.82rem; color: var(--text-muted);">
                  Skenario pengujian taktis lanjutan.
                </div>
              </div>
            </div>
            <span class="cyber-tag" style="border-color: var(--neon-magenta); color: var(--neon-magenta);">ADMIN ELEVATED</span>
          </div>
        ` : ''}

        <!-- Scenario Prompt Banner (Focused Clean Case Description) -->
        <div class="hud-card diff-scenario-prompt" style="padding: 16px 20px; margin-bottom: 16px;">
          <h2 style="font-size: 1.25rem; color: var(--text-highlight); margin-bottom: 6px;">
            ${currentDiff.title}
          </h2>
          <p style="font-size: 0.95rem; color: var(--text-main); margin: 0; line-height: 1.5;">
            ${currentDiff.scenario}
          </p>
        </div>

        <!-- Split Grid (Side-by-Side) -->
        <div class="diff-split-grid">
          <!-- Skenario A (Left) -->
          <div 
            class="diff-inspect-card ${leftActive ? 'selected-card' : ''}" 
            onclick="window.moduleDiff.selectSide('left')"
          >
            <!-- Browser Top Window Bar -->
            <div class="diff-browser-window-bar">
              <span class="browser-dot red"></span>
              <span class="browser-dot yellow"></span>
              <span class="browser-dot green"></span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); margin-left: 8px;">
                INSPECTION VIEW // ${left.label}
              </span>
            </div>

            <div class="diff-card-header">
              <div style="display:flex; align-items:center; gap: 8px; flex-wrap: wrap;">
                <span class="cyber-tag ${leftActive ? '' : 'tag-magenta'}">${left.label}</span>
                ${this.userJudgments.left ? `
                  <span class="verdict-stamp ${this.userJudgments.left === 'REAL' ? 'real' : 'fake'}">
                    ${this.userJudgments.left === 'REAL' ? '🛡️ REAL' : '⚠️ FAKE'}
                  </span>
                ` : ''}
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: ${leftActive ? 'var(--neon-cyan)' : 'var(--text-muted)'}; font-weight: 600;">
                ${leftActive ? '● AKTIF DIPERIKSA' : 'Klik untuk Pilih'}
              </div>
            </div>

            <!-- Browser URL Inspection Bar -->
            <div class="diff-browser-bar">
              <span class="diff-browser-lock ${left.is_real ? 'lock-secure' : 'lock-warn'}">
                ${left.is_real ? '🔒 EV SSL' : '⚠️ UNTRUSTED'}
              </span>
              <div class="diff-browser-url">${left.url}</div>
            </div>

            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px; font-family: var(--font-mono);">
              Sertifikat Keamanan: <strong style="color: ${left.is_real ? 'var(--neon-green)' : 'var(--neon-amber)'};">${left.ssl}</strong>
            </div>

            <!-- Visual Elements List -->
            <div class="diff-elements-box">
              <div style="font-family: var(--font-display); font-size: 0.75rem; letter-spacing: 0.8px; color: var(--neon-cyan); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <span>🔍</span> ELEMEN VISUAL & TEKNIS TERDETEKSI:
              </div>
              <div style="display:flex; flex-direction:column; gap:6px;">
                ${left.visual_elements.map(el => `
                  <div class="diff-element-item">
                    <span style="color: var(--neon-cyan); font-size: 0.75rem;">▸</span>
                    <span>${el}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Skenario B (Right) -->
          <div 
            class="diff-inspect-card ${rightActive ? 'selected-card' : ''}" 
            onclick="window.moduleDiff.selectSide('right')"
          >
            <!-- Browser Top Window Bar -->
            <div class="diff-browser-window-bar">
              <span class="browser-dot red"></span>
              <span class="browser-dot yellow"></span>
              <span class="browser-dot green"></span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); margin-left: 8px;">
                INSPECTION VIEW // ${right.label}
              </span>
            </div>

            <div class="diff-card-header">
              <div style="display:flex; align-items:center; gap: 8px; flex-wrap: wrap;">
                <span class="cyber-tag ${rightActive ? '' : 'tag-magenta'}">${right.label}</span>
                ${this.userJudgments.right ? `
                  <span class="verdict-stamp ${this.userJudgments.right === 'REAL' ? 'real' : 'fake'}">
                    ${this.userJudgments.right === 'REAL' ? '🛡️ REAL' : '⚠️ FAKE'}
                  </span>
                ` : ''}
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: ${rightActive ? 'var(--neon-cyan)' : 'var(--text-muted)'}; font-weight: 600;">
                ${rightActive ? '● AKTIF DIPERIKSA' : 'Klik untuk Pilih'}
              </div>
            </div>

            <!-- Browser URL Inspection Bar -->
            <div class="diff-browser-bar">
              <span class="diff-browser-lock ${right.is_real ? 'lock-secure' : 'lock-warn'}">
                ${right.is_real ? '🔒 EV SSL' : '⚠️ UNTRUSTED'}
              </span>
              <div class="diff-browser-url">${right.url}</div>
            </div>

            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px; font-family: var(--font-mono);">
              Sertifikat Keamanan: <strong style="color: ${right.is_real ? 'var(--neon-green)' : 'var(--neon-amber)'};">${right.ssl}</strong>
            </div>

            <!-- Visual Elements List -->
            <div class="diff-elements-box">
              <div style="font-family: var(--font-display); font-size: 0.75rem; letter-spacing: 0.8px; color: var(--neon-cyan); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <span>🔍</span> ELEMEN VISUAL & TEKNIS TERDETEKSI:
              </div>
              <div style="display:flex; flex-direction:column; gap:6px;">
                ${right.visual_elements.map(el => `
                  <div class="diff-element-item">
                    <span style="color: var(--neon-cyan); font-size: 0.75rem;">▸</span>
                    <span>${el}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Clean Decision Dock: REAL vs FAKE Buttons -->
        <div class="diff-decision-dock" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:14px; margin-top:16px;">
          <div style="font-family: var(--font-display); font-size: 0.92rem; color: var(--text-highlight);">
            PILIHAN: <span style="color: var(--neon-cyan); font-weight: 700; text-transform: uppercase;">SKENARIO ${this.selectedSide === 'left' ? 'A (KIRI)' : 'B (KANAN)'}</span>
          </div>

          <div style="display:flex; gap: 14px; align-items:center;">
            <button class="diff-btn-verdict btn-real" style="padding: 12px 28px; font-size: 1.05rem; font-weight: 800; letter-spacing: 1px;" onclick="window.moduleDiff.submitVerdict('REAL')">
              🛡️ REAL
            </button>

            <button class="diff-btn-verdict btn-fake" style="padding: 12px 28px; font-size: 1.05rem; font-weight: 800; letter-spacing: 1px;" onclick="window.moduleDiff.submitVerdict('FAKE')">
              ⚠️ FAKE
            </button>
          </div>
        </div>
      </div>
    `;
  }

  submitVerdict(verdict) {
    window.cyberAudio?.playVerdict?.() || window.cyberAudio?.playClick?.();
    this.userJudgments[this.selectedSide] = verdict;
    this.evaluateVerdict(verdict);
  }

  evaluateVerdict(verdict) {
    const currentDiff = this.diffCases[this.currentIndex];
    const isTargetSide = this.selectedSide; // 'left' or 'right'
    const targetCard = isTargetSide === 'left' ? currentDiff.left_card : currentDiff.right_card;

    const isCorrect = (verdict === 'REAL' && targetCard.is_real) || (verdict === 'FAKE' && !targetCard.is_real);

    const userScore = isCorrect ? 100 : 0;
    const vulnDelta = isCorrect ? -1.0 : 2.5;

    if (isCorrect) {
      window.cyberAudio?.playSuccess();
      // Unlock next scenario
      this.unlockNextCase();
    } else {
      window.cyberAudio?.playError();
    }

    // Record user action (Live Diff Game Tracking)
    window.authManager?.recordResult(
      userScore,
      vulnDelta,
      `FINDING DIFF (${currentDiff.category})`,
      `Vonis [${this.selectedSide.toUpperCase()}]: ${verdict} (Hasil: ${isCorrect ? 'AKURAT' : 'SALAH'})`,
      isCorrect ? 'SECURED' : 'COMPROMISED',
      'diff'
    );

    // Show debrief modal
    this.showVerdictDebrief(verdict, isCorrect, currentDiff);
  }

  showVerdictDebrief(verdict, isCorrect, currentDiff) {
    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');

    if (!modalBox || !modalContent) return;

    const hasNext = this.currentIndex + 1 < this.diffCases.length;
    const nextIdx = this.currentIndex + 1;

    modalContent.innerHTML = `
      <div style="text-align: center; padding: 10px;">
        <div style="font-size: 3.2rem; margin-bottom: 12px;">
          ${isCorrect ? '🎯' : '❌'}
        </div>
        <h3 style="font-size: 1.4rem; color: ${isCorrect ? 'var(--neon-green)' : 'var(--neon-red)'}; margin-bottom: 12px;">
          ${isCorrect ? 'ANALISIS JURI TEPAT!' : 'VONIS KELIRU / INDIKATOR TERLEWATKAN!'}
        </h3>
        <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-main); margin-bottom: 18px;">
          Anda memvonis <strong>${this.selectedSide === 'left' ? 'Skenario A' : 'Skenario B'}</strong> sebagai <strong>${verdict}</strong>.
        </p>

        <!-- Anomaly Analysis Breakdown -->
        <div style="background: rgba(5,5,10,0.8); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 16px; text-align: left; margin-bottom: 20px;">
          <div style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-cyan); margin-bottom: 6px; font-weight: 700;">
            DEBRIEF FORENSIK DIGITAL:
          </div>
          <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.5;">
            ${currentDiff.analysis}
          </p>
        </div>

        <div style="display:flex; justify-content:center; gap: 14px; flex-wrap: wrap;">
          ${hasNext ? `
            <button class="cyber-btn" onclick="window.moduleDiff.finishVerdict(); window.moduleDiff.startScenario(${nextIdx});">
              ⚡ LANJUT KE SKENARIO ${nextIdx + 1} ➔
            </button>
            <button class="cyber-btn btn-ghost" onclick="window.moduleDiff.finishVerdict(); window.gameBriefing.returnToBriefing('diff');">
              📂 KATALOG SKENARIO
            </button>
          ` : `
            <button class="cyber-btn" onclick="window.moduleDiff.finishVerdict();">
              LANJUTKAN EVALUASI KERENTANAN
            </button>
            <button class="cyber-btn btn-ghost" onclick="window.moduleDiff.finishVerdict(); window.gameBriefing.returnToBriefing('diff');">
              📂 KATALOG SKENARIO
            </button>
          `}
        </div>
      </div>
    `;

    modalBox.classList.add('active');
  }

  finishVerdict() {
    const modalBox = document.getElementById('modal-general-box');
    if (modalBox) modalBox.classList.remove('active');

    // Trigger Vulnerability Score Screen
    window.app?.showVulnerabilityScreen({
      moduleTitle: 'FINDING DIFF: Evaluasi Juri Real vs Fake',
      scoreTitle: 'Indeks Ketajaman Persepsi Anomali Siber',
      scoreValue: window.authManager?.currentUser?.vulnerability || 2.4,
      analysis: 'Pengamatan terhadap detail domain typosquatting, validitas sertifikat enkripsi TLS, serta perbedaan visual antarmuka asli vs tiruan.',
      metrics: [
        { label: 'Inspeksi Domain & SSL/TLS', score: '95%' },
        { label: 'Ketelitian Tipografi & Visual', score: '90%' },
        { label: 'Deteksi Rekayasa Psikologis', score: '88%' }
      ]
    });
  }
}

window.moduleDiff = new ModuleDiff();
