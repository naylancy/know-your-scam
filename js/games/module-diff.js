/**
 * GUARDIANSPACE: ANTI-GRAVITY DEFENSE
 * MODUL 2: FINDING DIFF (Judge / Juri: Real vs Fake)
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

  setCase(idx) {
    this.currentIndex = idx;
    this.selectedSide = 'left';
    this.userJudgments = { left: null, right: null };
    this.render();
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

    // Tabs for available diff scenarios
    const isCustom = currentDiff.is_custom;
    const tabsHtml = this.diffCases.map((d, idx) => `
      <button class="cyber-btn ${this.currentIndex === idx ? '' : 'btn-ghost'}" style="font-size: 0.8rem; padding: 7px 14px;" onclick="window.moduleDiff.setCase(${idx})">
        ${d.is_custom ? '⭐ ' : ''}KASUS #${idx + 1}: ${d.category}
      </button>
    `).join('');

    const left = currentDiff.left_card;
    const right = currentDiff.right_card;

    const leftActive = this.selectedSide === 'left';
    const rightActive = this.selectedSide === 'right';

    container.innerHTML = `
      <div class="holo-enter diff-container">
        <!-- Sub Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; gap: 8px; flex-wrap: wrap;">
            ${tabsHtml}
          </div>
          <div style="display:flex; gap: 8px; align-items: center;">
            ${isCustom ? `<span class="cyber-tag tag-magenta">⭐ KASUS KUSTOM ADMIN</span>` : ''}
            <span class="cyber-tag tag-magenta">MODE JURI SIBER (JUDGE)</span>
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
            <p style="font-size: 0.92rem; color: var(--text-muted);">
              ${currentDiff.scenario}
            </p>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--neon-cyan); text-align: right;">
            STATUS: <strong style="color: #FFFFFF;">${this.userJudgments.left ? '1/2' : '0/2'} DINILAI</strong>
          </div>
        </div>

        <!-- Instruction Notice -->
        <div style="text-align: center; font-size: 0.95rem; color: var(--text-muted);">
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
              <span class="ssl-badge ${left.ssl.includes('Valid') || left.ssl.includes('Enterprise') || left.ssl.includes('Pass') ? 'valid' : 'invalid'}">
                🔒 ${left.ssl}
              </span>
              <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--text-highlight);">
                ${left.url}
              </span>
            </div>

            <h4 style="font-size: 1.05rem; margin-bottom: 12px; color: var(--text-highlight);">Komponen Antarmuka Terdeteksi:</h4>
            <ul class="diff-elements-list">
              ${left.visual_elements.map(elem => `
                <li class="diff-element-item">
                  <span style="color: var(--neon-cyan);">🔍</span>
                  <span>${elem}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Skenario B (Right) -->
          <div 
            class="hud-card diff-inspect-card ${rightActive ? 'selected-card' : ''}" 
            style="${rightActive ? 'border-color: var(--neon-magenta); box-shadow: 0 0 30px var(--neon-magenta-glow);' : 'border-color: rgba(255,255,255,0.15);'}"
            onclick="window.moduleDiff.selectSide('right')"
          >
            <div class="diff-card-header">
              <div style="display:flex; align-items:center; gap: 8px;">
                <span class="cyber-tag ${rightActive ? 'tag-magenta' : ''}">${right.label}</span>
                ${this.userJudgments.right ? `<span class="cyber-tag ${this.userJudgments.right === 'REAL' ? '' : 'tag-magenta'}">VONIS: ${this.userJudgments.right}</span>` : ''}
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-magenta);">
                ${rightActive ? '● AKTIF DIPERIKSA' : 'Klik untuk Pilih'}
              </div>
            </div>

            <!-- Browser URL Inspection Bar -->
            <div class="diff-browser-bar">
              <span class="ssl-badge ${right.ssl.includes('Valid') || right.ssl.includes('Enterprise') || right.ssl.includes('Pass') ? 'valid' : 'invalid'}">
                🔒 ${right.ssl}
              </span>
              <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--text-highlight);">
                ${right.url}
              </span>
            </div>

            <h4 style="font-size: 1.05rem; margin-bottom: 12px; color: var(--text-highlight);">Komponen Antarmuka Terdeteksi:</h4>
            <ul class="diff-elements-list">
              ${right.visual_elements.map(elem => `
                <li class="diff-element-item">
                  <span style="color: var(--neon-magenta);">🔍</span>
                  <span>${elem}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- DOCK KONTROL BAWAH LAYAR DENGAN 2 TOMBOL NEON RAKSASA -->
        <div class="diff-bottom-dock">
          <div style="font-family: var(--font-display); font-size: 1rem; color: var(--text-muted); text-transform: uppercase;">
            VONIS UNTUK: <strong style="color: ${this.selectedSide === 'left' ? 'var(--neon-cyan)' : 'var(--neon-magenta)'}; font-size: 1.15rem;">
              ${this.selectedSide === 'left' ? 'SKENARIO A' : 'SKENARIO B'}
            </strong>
          </div>

          <div style="display:flex; gap: 30px; align-items:center; flex-wrap:wrap; justify-content:center;">
            <!-- Tombol REAL (Biru / Cyan) -->
            <button 
              id="btn-diff-real" 
              class="btn-large-decision btn-large-real"
              onclick="window.moduleDiff.submitVerdict('REAL')"
            >
              <span>🛡️</span> REAL (ASLI)
            </button>

            <!-- Tombol FAKE (Ungu / Magenta) -->
            <button 
              id="btn-diff-fake" 
              class="btn-large-decision btn-large-fake"
              onclick="window.moduleDiff.submitVerdict('FAKE')"
            >
              <span>⚠️</span> FAKE (PALSU)
            </button>
          </div>
        </div>
      </div>
    `;
  }

  submitVerdict(verdict) {
    const btn = verdict === 'REAL' ? document.getElementById('btn-diff-real') : document.getElementById('btn-diff-fake');
    if (btn) {
      btn.classList.remove('ripple-pulse');
      void btn.offsetWidth; // trigger reflow
      btn.classList.add('ripple-pulse');
    }

    if (verdict === 'REAL') {
      window.cyberAudio?.playClick();
    } else {
      window.cyberAudio?.playWhoosh();
    }

    // Save verdict for selected side
    this.userJudgments[this.selectedSide] = verdict;

    const currentDiff = this.diffCases[this.currentIndex];

    // If both sides judged or after making a choice on the active card
    const targetCard = this.selectedSide === 'left' ? currentDiff.left_card : currentDiff.right_card;
    const isCorrect = (verdict === 'REAL' && targetCard.is_real) || (verdict === 'FAKE' && !targetCard.is_real);

    if (isCorrect) {
      window.cyberAudio?.playSuccess();
    } else {
      window.cyberAudio?.playError();
    }

    // Record activity & score
    const scoreDelta = isCorrect ? 80 : 0;
    const vulnDelta = isCorrect ? -0.8 : 1.5;

    window.authManager?.recordResult(
      scoreDelta,
      vulnDelta,
      'FINDING DIFF (Judge)',
      `Vonis Skenario ${this.selectedSide.toUpperCase()} sebagai ${verdict} (${isCorrect ? 'BENAR' : 'SALAH'})`,
      isCorrect ? 'SECURED' : 'BREACH_DETECTED'
    );

    // Show debrief modal
    this.showVerdictDebrief(verdict, isCorrect, currentDiff);
  }

  showVerdictDebrief(verdict, isCorrect, currentDiff) {
    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');

    if (!modalBox || !modalContent) return;

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

        <div style="display:flex; justify-content:center; gap: 14px;">
          <button class="cyber-btn" onclick="window.moduleDiff.finishVerdict()">
            LANJUTKAN EVALUASI KERENTANAN
          </button>
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

