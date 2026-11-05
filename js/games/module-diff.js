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

    container.innerHTML = `
      ${startScreenHtml}
      <div id="view-game-diff" class="game-page-arena holo-enter diff-container" style="${isPlaying ? 'display:block;' : 'display:none;'}">
        ${hudBarHtml}

        <!-- Single Selected Scenario Header - NO Tab Switcher -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 16px;">
          <div style="display:flex; gap: 8px; align-items:center; flex-wrap:wrap;">
            <span class="cyber-tag tag-cyan" style="font-size: 0.82rem; letter-spacing: 0.5px;">
              ⚖️ SKENARIO ${this.currentIndex + 1} DARI ${this.diffCases.length}
            </span>
            <span class="cyber-tag tag-magenta" style="font-size: 0.82rem;">
              ${(currentDiff.category || 'KOMPARASI').toUpperCase()}
            </span>
            ${isCustom ? `<span class="cyber-tag" style="border-color: var(--neon-magenta); color: var(--neon-magenta);">⭐ KASUS KUSTOM</span>` : ''}
          </div>
          <div style="display:flex; gap: 8px; align-items: center;">
            <span class="cyber-tag tag-green">MODE JURI SIBER (JUDGE)</span>
          </div>
        </div>

        ${isCustom ? `
          <div style="background: rgba(189, 0, 255, 0.12); border: 1px solid var(--border-magenta); border-radius: 6px; padding: 12px 18px; margin-bottom: 18px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.3rem;">🛡️</span>
              <div>
                <strong style="color: var(--neon-magenta); font-family: var(--font-display); font-size: 0.9rem;">
                  MODUL KUSTOM ADMINISTRATOR (COMMANDER VEKTOR)
                </strong>
                <div style="font-size: 0.82rem; color: var(--text-muted);">
                  Skenario ini dikonfigurasi melalui Admin Case Builder untuk pengujian taktis lanjutan.
                </div>
              </div>
            </div>
            <span class="cyber-tag" style="border-color: var(--neon-magenta); color: var(--neon-magenta);">ADMIN ELEVATED</span>
          </div>
        ` : ''}

        <!-- Scenario Prompt Banner -->
        <div class="hud-card diff-scenario-prompt">
          <div>
            <h2 style="font-size: 1.35rem; color: var(--text-highlight); margin-bottom: 4px;">
              ${currentDiff.title}
            </h2>
            <p style="font-size: 0.92rem; color: var(--text-muted); margin: 0;">
              ${currentDiff.scenario}
            </p>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--neon-cyan); text-align: right;">
            STATUS: <strong style="color: #FFFFFF;">${this.userJudgments.left ? '1/2' : '0/2'} DINILAI</strong>
          </div>
        </div>

        <!-- Instruction Notice -->
        <div style="text-align: center; font-size: 0.95rem; color: var(--text-muted); margin: 14px 0;">
          👉 Klik salah satu kartu di bawah ini untuk menginspeksi, lalu tekan tombol <strong style="color: var(--neon-cyan);">REAL</strong> atau <strong style="color: var(--neon-magenta);">FAKE</strong> di dermaga kontrol bawah!
        </div>

        <!-- Split Grid (Side-by-Side) -->
        <div class="diff-split-grid">
          <!-- Skenario A (Left) -->
          <div 
            class="hud-card diff-inspect-card ${leftActive ? 'selected-card' : ''}" 
            style="${leftActive ? 'border-color: var(--neon-cyan); box-shadow: 0 0 30px var(--neon-cyan-glow);' : 'border-color: rgba(255,255,255,0.15);'}"
            onclick="window.moduleDiff.selectSide('left')"
          >
            <div class="diff-card-header">
              <div style="display:flex; align-items:center; gap: 8px;">
                <span class="cyber-tag ${leftActive ? '' : 'tag-magenta'}">${left.label}</span>
                ${this.userJudgments.left ? `<span class="cyber-tag ${this.userJudgments.left === 'REAL' ? '' : 'tag-magenta'}">VONIS: ${this.userJudgments.left}</span>` : ''}
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-cyan);">
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
            <div style="background: rgba(5,5,10,0.6); padding: 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-family: var(--font-display); font-size: 0.8rem; color: var(--neon-cyan); margin-bottom: 8px;">
                ELEMEN VISUAL TERDETEKSI:
              </div>
              <ul style="list-style: none; padding-left: 0; font-size: 0.85rem; color: var(--text-main); display:flex; flex-direction:column; gap:6px;">
                ${left.visual_elements.map(el => `<li>• ${el}</li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Skenario B (Right) -->
          <div 
            class="hud-card diff-inspect-card ${rightActive ? 'selected-card' : ''}" 
            style="${rightActive ? 'border-color: var(--neon-cyan); box-shadow: 0 0 30px var(--neon-cyan-glow);' : 'border-color: rgba(255,255,255,0.15);'}"
            onclick="window.moduleDiff.selectSide('right')"
          >
            <div class="diff-card-header">
              <div style="display:flex; align-items:center; gap: 8px;">
                <span class="cyber-tag ${rightActive ? '' : 'tag-magenta'}">${right.label}</span>
                ${this.userJudgments.right ? `<span class="cyber-tag ${this.userJudgments.right === 'REAL' ? '' : 'tag-magenta'}">VONIS: ${this.userJudgments.right}</span>` : ''}
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-cyan);">
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
            <div style="background: rgba(5,5,10,0.6); padding: 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06);">
              <div style="font-family: var(--font-display); font-size: 0.8rem; color: var(--neon-cyan); margin-bottom: 8px;">
                ELEMEN VISUAL TERDETEKSI:
              </div>
              <ul style="list-style: none; padding-left: 0; font-size: 0.85rem; color: var(--text-main); display:flex; flex-direction:column; gap:6px;">
                ${right.visual_elements.map(el => `<li>• ${el}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        <!-- Big Decision Dock -->
        <div class="hud-card diff-decision-dock">
          <div style="font-family: var(--font-display); font-size: 1rem; color: var(--text-highlight);">
            JATUHKAN VONIS UNTUK: <span style="color: var(--neon-cyan); text-transform: uppercase;">SKENARIO ${this.selectedSide === 'left' ? 'A (KIRI)' : 'B (KANAN)'}</span>
          </div>

          <div style="display:flex; gap: 20px; align-items:center;">
            <button class="diff-btn-verdict btn-real" onclick="window.moduleDiff.submitVerdict('REAL')">
              <span style="font-size: 1.5rem;">🛡️</span>
              <div>
                <strong>DOKUMEN ASLI (REAL)</strong>
                <div style="font-size: 0.72rem; opacity: 0.8;">Otentikasi Sah</div>
              </div>
            </button>

            <button class="diff-btn-verdict btn-fake" onclick="window.moduleDiff.submitVerdict('FAKE')">
              <span style="font-size: 1.5rem;">⚠️</span>
              <div>
                <strong>TIRUAN / PENIPU (FAKE)</strong>
                <div style="font-size: 0.72rem; opacity: 0.8;">Social Engineering</div>
              </div>
            </button>
          </div>
        </div>
      </div>
      </div>
    `;
  }

  submitVerdict(verdict) {
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
