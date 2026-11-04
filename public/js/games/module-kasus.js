/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * MODUL 1: KASUS (Story-Based Simulation / Multi-POV)
 */

class ModuleKasus {
  constructor() {
    this.currentCaseIndex = 0;
    this.currentStepIndex = 0;
    this.currentPOV = 'victim'; // 'victim' or 'hunter'
    this.cases = [];
  }

  init(casesData) {
    this.cases = casesData || [];
    this.currentCaseIndex = 0;
    this.currentStepIndex = 0;
    this.currentPOV = 'victim';
    this.render();
  }

  setCase(index) {
    this.currentCaseIndex = index;
    this.currentStepIndex = 0;
    this.render();
  }

  setPOV(pov) {
    this.currentPOV = pov;
    window.cyberAudio?.playClick();
    this.render();
  }

  render() {
    const container = document.getElementById('kasus-module-container');
    if (!container) return;

    if (!this.cases || this.cases.length === 0) {
      container.innerHTML = `<div class="hud-card" style="padding: 30px; text-align: center;">Memuat basis data skenario naratif...</div>`;
      return;
    }

    const currentCase = this.cases[this.currentCaseIndex] || this.cases[0];
    const currentStep = currentCase.story_steps[this.currentStepIndex] || currentCase.story_steps[0];

    // Two-Page System: Page Start (Briefing & Tutorial) vs Page Game (Arena)
    const isPlaying = window.gameBriefing?.isPlaying('kasus');
    const startScreenHtml = window.gameBriefing?.renderStartScreenHTML('kasus') || '';
    const hudBarHtml = window.gameBriefing?.renderGameHUDBar('kasus') || '';

    // Set hints for hint system
    window.hintSystem?.setHints(currentStep.clues || []);

    // Case Selector Tabs
    const isCustom = currentCase.is_custom;
    const caseTabsHtml = this.cases.map((c, idx) => `
      <button class="cyber-btn ${this.currentCaseIndex === idx ? '' : 'btn-ghost'}" style="font-size: 0.8rem; padding: 7px 14px;" onclick="window.moduleKasus.setCase(${idx})">
        ${c.is_custom ? '⭐ ' : ''}${c.type.toUpperCase()}: ${c.title.split(':')[0]}
      </button>
    `).join('');

    // POV Switcher
    const povHtml = currentCase.pov_options.map(pov => `
      <button class="pov-pill-btn ${this.currentPOV === pov.id ? 'active' : ''}" onclick="window.moduleKasus.setPOV('${pov.id}')">
        <span>${pov.avatar}</span> ${pov.label}
      </button>
    `).join('');

    // POV Context Note
    const povNotice = this.currentPOV === 'hunter'
      ? `<div class="story-context-note" style="color: var(--neon-cyan);">
           <span>🕵️ MODE INVESTIGATOR SIBER AKTIF:</span> Anda menganalisis anomali teknis, headers, dan vektor rekayasa sosial secara objektif.
         </div>`
      : `<div class="story-context-note" style="color: var(--neon-magenta);">
           <span>👤 SUDUT PANDANG KORBAN AKTIF:</span> Anda merasakan tekanan psikologis, urgensi sempit, dan tawaran yang tampak menggiurkan.
         </div>`;

    // Clues Box (especially illuminated in Hunter POV)
    const cluesHtml = (this.currentPOV === 'hunter' || this.currentStepIndex > 0)
      ? `
        <div style="background: rgba(0, 243, 255, 0.05); border: 1px dashed var(--border-cyan); border-radius: 6px; padding: 12px 16px; margin-bottom: 20px;">
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-cyan); margin-bottom: 6px; font-weight: 700;">
            🔍 INDIKATOR ANCAMAN TERDETEKSI SISTEM:
          </div>
          <ul style="list-style: none; padding-left: 0; font-size: 0.85rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 4px;">
            ${currentStep.clues.map(clue => `<li>⚡ ${clue}</li>`).join('')}
          </ul>
        </div>
      ` : '';

    // Choice Buttons
    const choicesHtml = currentStep.choices.map((choice, idx) => `
      <button class="choice-option-btn hover-lift" onclick="window.moduleKasus.handleChoice('${choice.id}')">
        <div class="choice-key">${choice.id}</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 2px;">${choice.text}</div>
        </div>
      </button>
    `).join('');

    container.innerHTML = `
      ${startScreenHtml}
      <div id="view-game-kasus" class="game-page-arena holo-enter" style="display: ${isPlaying ? 'block' : 'none'};">
        ${hudBarHtml}

        <!-- Sub Header & Case Nav -->
        <div class="story-case-header">
          <div style="display:flex; gap: 8px; flex-wrap: wrap;">
            ${caseTabsHtml}
          </div>
          <div style="display:flex; gap: 8px; align-items: center;">
            ${isCustom ? `<span class="cyber-tag tag-magenta">⭐ KASUS KUSTOM ADMIN</span>` : ''}
            <div class="pov-selector-group">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">POV:</span>
              ${povHtml}
            </div>
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

        <!-- Terminal Window -->
        <div class="hud-card story-terminal-window">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
            <div>
              <span class="cyber-tag">${currentCase.type.toUpperCase()} PROTOCOL</span>
              <span class="cyber-tag tag-magenta" style="margin-left: 6px;">LANGKAH ${this.currentStepIndex + 1} DARI ${currentCase.story_steps.length}</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">
              TINGKAT KESULITAN: <strong style="color: var(--neon-cyan);">${currentCase.difficulty}</strong>
            </div>
          </div>

          <h2 style="font-size: 1.5rem; color: var(--text-highlight); margin-bottom: 4px;">
            ${currentCase.title}
          </h2>
          <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 20px;">
            ${currentCase.subtitle}
          </p>

          ${povNotice}

          <!-- Message Dialog Box -->
          <div class="story-sender-banner">
            <div class="story-sender-avatar">
              ${currentCase.type === 'phishing' ? '📧' : currentCase.type === 'lovescam' ? '💖' : '💼'}
            </div>
            <div class="story-sender-meta">
              <h4>${currentStep.sender}</h4>
              <p>TRANSMISI ENKRIPSI JALUR EKSTERNAL // KONTEKS: ${currentStep.context}</p>
            </div>
          </div>

          <div class="story-message-box">
            <div style="color: var(--neon-cyan); margin-bottom: 8px; font-size: 0.75rem; letter-spacing: 1px;">
              [PESAN MASUK TERMINAL]
            </div>
            "${currentStep.message}"
          </div>

          ${cluesHtml}

          <!-- Choices Section -->
          <div class="story-choices-title">
            BAGAIMANA ANDA MENANGGAPI SITUASI INI?
          </div>
          <div class="story-choices-list">
            ${choicesHtml}
          </div>
        </div>
      </div>
      </div>
    `;
  }

  handleChoice(choiceId) {
    const currentCase = this.cases[this.currentCaseIndex];
    const currentStep = currentCase.story_steps[this.currentStepIndex];
    const choice = currentStep.choices.find(c => c.id === choiceId);

    if (!choice) return;

    if (choice.status === 'SECURED') {
      window.cyberAudio?.playSuccess();
    } else {
      window.cyberAudio?.playError();
    }

    // Record user action & score (Live Game Tracking)
    window.authManager?.recordResult(
      choice.score,
      choice.vulnerability_delta,
      `KASUS (${currentCase.type.toUpperCase()})`,
      `Pilihan [${choice.id}]: ${choice.text.substring(0, 40)}...`,
      choice.status,
      'kasus'
    );

    // Show debrief modal with result and next step
    const isLastStep = this.currentStepIndex >= currentCase.story_steps.length - 1;
    this.showFeedbackModal(choice, isLastStep);
  }

  showFeedbackModal(choice, isLastStep) {
    const isCompromised = choice.status === 'COMPROMISED';
    const isSecured = choice.status === 'SECURED';

    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');

    if (!modalBox || !modalContent) return;

    modalContent.innerHTML = `
      <div style="text-align: center; padding: 10px;">
        <div style="font-size: 3rem; margin-bottom: 12px;">
          ${isSecured ? '🛡️' : isCompromised ? '🚨' : '⚠️'}
        </div>
        <h3 style="font-size: 1.4rem; color: ${isSecured ? 'var(--neon-green)' : isCompromised ? 'var(--neon-red)' : 'var(--neon-amber)'}; margin-bottom: 12px;">
          ${isSecured ? 'KEPUTUSAN TEPAT & AMAN!' : isCompromised ? 'SISTEM TERKOMPROMI / PENIPUAN BERHASIL!' : 'PERINGATAN RISIKO TERDETEKSI'}
        </h3>
        <p style="font-size: 1rem; line-height: 1.6; color: var(--text-main); margin-bottom: 20px;">
          ${choice.feedback}
        </p>

        <div style="display:flex; justify-content:center; gap: 20px; margin-bottom: 24px; font-family: var(--font-mono); font-size: 0.9rem;">
          <div style="background: rgba(0,243,255,0.1); padding: 8px 16px; border-radius: 4px; border: 1px solid var(--border-cyan);">
            SKOR DEFENSE: <strong style="color: var(--neon-cyan);">+${choice.score} XP</strong>
          </div>
          <div style="background: rgba(255,0,85,0.1); padding: 8px 16px; border-radius: 4px; border: 1px solid var(--neon-red);">
            DELTA KERENTANAN: <strong style="color: ${choice.vulnerability_delta <= 0 ? 'var(--neon-green)' : 'var(--neon-red)'};">${choice.vulnerability_delta > 0 ? '+' : ''}${choice.vulnerability_delta}</strong>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap: 14px;">
          ${isLastStep ? `
            <button class="cyber-btn" onclick="window.moduleKasus.finishCase()">
              SELESAIKAN MISI & EVALUASI
            </button>
          ` : `
            <button class="cyber-btn" onclick="window.moduleKasus.nextStep()">
              LANJUT KE TAHAP BERIKUTNYA ➔
            </button>
          `}
        </div>
      </div>
    `;

    modalBox.classList.add('active');
  }

  nextStep() {
    const modalBox = document.getElementById('modal-general-box');
    if (modalBox) modalBox.classList.remove('active');
    this.currentStepIndex++;
    this.render();
  }

  finishCase() {
    const modalBox = document.getElementById('modal-general-box');
    if (modalBox) modalBox.classList.remove('active');

    // Trigger Vulnerability Indicator Screen
    const currentCase = this.cases[this.currentCaseIndex];
    window.app?.showVulnerabilityScreen({
      moduleTitle: `KASUS: ${currentCase.title}`,
      scoreTitle: 'Indeks Kerentanan Rekayasa Sosial (Social Engineering)',
      scoreValue: window.authManager?.currentUser?.vulnerability || 3.2,
      analysis: 'Pengambilan keputusan naratif Anda mengevaluasi tingkat ketahanan terhadap manipulasi kepanikan batas waktu, janji keuntungan fiktif, dan eksploitasi emosional.',
      metrics: [
        { label: 'Deteksi Phishing & Urgensi', score: '88%' },
        { label: 'Ketahanan Manipulasi Emosional', score: '82%' },
        { label: 'Penerapan Prinsip Zero Trust', score: '94%' }
      ]
    });
  }
}

window.moduleKasus = new ModuleKasus();

