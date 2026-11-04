/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * MODUL 3: CRIMINAL CASE (Investigation Drag-and-Drop Puzzle)
 */

class ModuleCriminal {
  constructor() {
    this.cases = [];
    this.currentIndex = 0;
    this.assignedSlots = {
      actor_origin: null,
      attack_vector: null,
      critical_redflag: null,
      intervention_strategy: null
    };
    this.timerInterval = null;
    this.secondsLeft = 90;
    this.isTimerRunning = false;
    this.isTimedOut = false;
    this.draggedClueId = null;
  }

  init(criminalData) {
    this.stopTimer();
    this.cases = criminalData || [];
    this.currentIndex = 0;
    this.assignedSlots = {
      actor_origin: null,
      attack_vector: null,
      critical_redflag: null,
      intervention_strategy: null
    };
    const currentCase = this.cases[this.currentIndex];
    this.secondsLeft = currentCase ? (currentCase.timer_seconds || 90) : 90;
    this.isTimedOut = false;
    // Do NOT start timer here - only when on route 'criminal'
    this.render();
  }

  onEnterRoute() {
    // Only run if user is logged in and route is criminal
    if (!window.authManager?.isLoggedIn()) return;
    if (window.app?.currentRoute !== 'criminal') return;

    const hasSeenBriefing = window.gameBriefing?.hasSeen('criminal');
    if (hasSeenBriefing && !this.isTimerRunning && !this.isTimedOut) {
      this.startTimer();
    }
    this.render();
  }

  onLeaveRoute() {
    this.stopTimer();
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.isTimerRunning = false;
  }

  resetState() {
    this.stopTimer();
    this.assignedSlots = {
      actor_origin: null,
      attack_vector: null,
      critical_redflag: null,
      intervention_strategy: null
    };
    const currentCase = this.cases[this.currentIndex];
    this.secondsLeft = currentCase ? (currentCase.timer_seconds || 90) : 90;
    this.isTimedOut = false;

    if (window.app?.currentRoute === 'criminal') {
      this.startTimer();
    }
  }

  startTimer() {
    this.stopTimer();
    if (window.app?.currentRoute !== 'criminal') return;

    this.isTimerRunning = true;
    this.isTimedOut = false;

    this.timerInterval = setInterval(() => {
      // Guard: Ensure timer stops immediately if user left criminal route
      if (window.app?.currentRoute !== 'criminal') {
        this.stopTimer();
        return;
      }

      this.secondsLeft--;
      const timerEl = document.getElementById('crim-timer-display');
      const panicBar = document.getElementById('crim-panic-fill');

      const safeSeconds = Math.max(0, this.secondsLeft);
      const mins = Math.floor(safeSeconds / 60);
      const secs = safeSeconds % 60;
      const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      if (timerEl) {
        timerEl.textContent = formatted;
        if (safeSeconds <= 20) {
          timerEl.style.color = 'var(--neon-red)';
        } else if (safeSeconds <= 45) {
          timerEl.style.color = 'var(--neon-amber)';
        } else {
          timerEl.style.color = 'var(--neon-cyan)';
        }
      }

      if (panicBar) {
        const maxSecs = this.cases[this.currentIndex]?.timer_seconds || 90;
        const pct = Math.max(0, (safeSeconds / maxSecs) * 100);
        panicBar.style.width = `${pct}%`;
        if (pct < 30) {
          panicBar.className = 'vuln-bar-fill high-risk';
        } else if (pct < 60) {
          panicBar.className = 'vuln-bar-fill moderate';
        } else {
          panicBar.className = 'vuln-bar-fill safe';
        }
      }

      if (this.secondsLeft <= 0) {
        this.stopTimer();
        this.handleTimeOut();
      }
    }, 1000);
  }

  handleTimeOut() {
    if (window.app?.currentRoute !== 'criminal') return;
    this.isTimedOut = true;
    this.stopTimer();

    window.cyberAudio?.playError();
    window.authManager?.recordResult(
      0, 
      2.0, 
      'CRIMINAL CASE', 
      'Waktu investigasi habis! Korban mengalami kerugian finansial akibat transfer sindikat.', 
      'COMPROMISED',
      'criminal'
    );

    // Show in-card game over banner instead of intrusive window.alert()
    window.app?.showToast('🚨 WAKTU HABIS! Sindikat pelaku berhasil membobol aset sebelum dakwaan diterbitkan.', 'error');
    this.render();
  }

  retryAfterTimeout() {
    window.cyberAudio?.playClick();
    this.resetState();
    this.render();
  }

  setCase(idx) {
    this.stopTimer();
    this.currentIndex = idx;
    this.resetState();
    this.render();
  }

  render() {
    const container = document.getElementById('criminal-module-container');
    if (!container) return;

    if (!this.cases || this.cases.length === 0) {
      container.innerHTML = `<div class="hud-card" style="padding: 30px; text-align: center;">Memuat berkas perkara kriminal siber...</div>`;
      return;
    }

    const currentCase = this.cases[this.currentIndex];

    // Calculate dynamic time display based on current this.secondsLeft
    const safeSeconds = Math.max(0, this.secondsLeft);
    const mins = Math.floor(safeSeconds / 60);
    const secs = safeSeconds % 60;
    const dynamicTimeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    const maxSecs = currentCase.timer_seconds || 90;
    const pct = Math.max(0, Math.min(100, (safeSeconds / maxSecs) * 100));
    const panicClass = pct < 30 ? 'high-risk' : pct < 60 ? 'moderate' : 'safe';
    const timerColor = safeSeconds <= 20 ? 'var(--neon-red)' : safeSeconds <= 45 ? 'var(--neon-amber)' : 'var(--neon-cyan)';

    // Clues hints
    window.hintSystem?.setHints([
      'Identifikasi sumber relay IP penyerang untuk slot Sumber Serangan.',
      'Perhatikan taktik rekayasa sosial utama untuk Vektor Serangan.',
      'Cari kejanggalan dokumen transaksi pada Red Flag Kritis.',
      'Pilih tindakan verifikasi jalur ganda untuk Intervensi.'
    ]);

    // Available unassigned clues
    const assignedIds = Object.values(this.assignedSlots).filter(Boolean).map(c => c.id);
    const availableClues = (currentCase.clues || []).filter(c => !assignedIds.includes(c.id));

    // Case Selector Tabs
    const tabsHtml = this.cases.map((c, idx) => `
      <button class="cyber-btn ${this.currentIndex === idx ? '' : 'btn-ghost'}" style="font-size: 0.8rem; padding: 7px 14px;" onclick="window.moduleCriminal.setCase(${idx})">
        BERKAS #${c.id} ${c.is_custom ? '⭐' : ''}
      </button>
    `).join('');

    const cluesHtml = availableClues.map(clue => `
      <div 
        id="${clue.id}" 
        class="clue-card-draggable" 
        draggable="true" 
        ondragstart="window.moduleCriminal.handleDragStart(event, '${clue.id}')"
        onclick="window.moduleCriminal.quickAssignClue('${clue.id}')"
      >
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
          <strong style="color: var(--neon-cyan); font-size: 0.85rem; font-family: var(--font-display);">${clue.title}</strong>
          <span style="font-size: 0.7rem; color: var(--text-muted); font-family: var(--font-mono);">DRAG / KLIK</span>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-main); line-height: 1.4;">${clue.description}</p>
      </div>
    `).join('') || `<div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding: 20px;">Semua bukti telah ditempatkan di papan dakwaan.</div>`;

    // Render Slots
    const renderSlot = (slotKey, slotName, slotDesc) => {
      const assigned = this.assignedSlots[slotKey];
      return `
        <div 
          class="crim-target-slot ${assigned ? 'slot-filled' : ''}"
          ondragover="window.moduleCriminal.handleDragOver(event)"
          ondragleave="window.moduleCriminal.handleDragLeave(event)"
          ondrop="window.moduleCriminal.handleDrop(event, '${slotKey}')"
        >
          <div>
            <div class="slot-label">${slotName}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${slotDesc}</div>
            ${assigned ? `
              <div style="margin-top: 8px; background: rgba(0,243,255,0.12); border: 1px solid var(--border-cyan); padding: 8px 12px; border-radius: 4px;">
                <strong style="color: var(--neon-cyan);">${assigned.title}:</strong>
                <span style="color: var(--text-highlight); font-size: 0.85rem;"> ${assigned.description}</span>
              </div>
            ` : `
              <div style="font-style: italic; color: rgba(255,255,255,0.3); font-size: 0.82rem; margin-top: 6px;">[ Tarik atau klik bukti ke slot ini ]</div>
            `}
          </div>
          ${assigned ? `
            <button class="cyber-btn btn-ghost" style="padding: 4px 8px; font-size: 0.75rem;" onclick="window.moduleCriminal.unassignSlot('${slotKey}')">
              ✕ HAPUS
            </button>
          ` : ''}
        </div>
      `;
    };

    const isCustomCase = currentCase.is_custom;

    // Two-Page System: Page Start (Briefing & Tutorial) vs Page Game (Arena)
    const isPlaying = window.gameBriefing?.isPlaying('criminal');
    const startScreenHtml = window.gameBriefing?.renderStartScreenHTML('criminal') || '';
    const hudBarHtml = window.gameBriefing?.renderGameHUDBar('criminal') || '';

    // If on Page Game, route is active, and timer is not running, start timer
    if (isPlaying && !this.isTimerRunning && !this.isTimedOut && window.app?.currentRoute === 'criminal') {
      this.startTimer();
    } else if (!isPlaying && this.isTimerRunning) {
      this.stopTimer();
    }

    container.innerHTML = `
      ${startScreenHtml}
      <div id="view-game-criminal" class="game-page-arena holo-enter" style="${isPlaying ? 'display:block;' : 'display:none;'}">
        ${hudBarHtml}

        <!-- Sub Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 20px;">
          <div style="display:flex; gap: 8px; flex-wrap: wrap;">
            ${tabsHtml}
          </div>
          <div style="display:flex; gap: 8px; align-items: center;">
            ${isCustomCase ? `<span class="cyber-tag tag-magenta">⭐ KASUS KUSTOM ADMIN</span>` : ''}
            <span class="cyber-tag tag-amber">INVESTIGASI FORENSIK DRAG-AND-DROP</span>
          </div>
        </div>

        ${isCustomCase ? `
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

        ${this.isTimedOut ? `
          <div class="hud-card" style="padding: 24px; margin-bottom: 24px; border-color: var(--neon-red); background: rgba(255, 0, 85, 0.12); text-align: center;">
            <div style="font-size: 2.5rem; margin-bottom: 8px;">🚨</div>
            <h3 style="font-size: 1.4rem; color: var(--neon-red); margin-bottom: 6px;">
              WAKTU INVESTIGASI HABIS — MISI GAGAL
            </h3>
            <p style="font-size: 0.95rem; color: var(--text-main); max-width: 650px; margin: 0 auto 18px auto; line-height: 1.5;">
              Waktu reaksi terlampaui! Dana korban telah berhasil ditransfer oleh sindikat kriminal ke jaringan pencucian uang luar negeri.
            </p>
            <button class="cyber-btn" style="padding: 10px 24px;" onclick="window.moduleCriminal.retryAfterTimeout()">
              🔄 COBA LAGI INVESTIGASI
            </button>
          </div>
        ` : ''}

        <!-- Case Metadata & Panic Timer -->
        <div class="hud-card" style="padding: 20px 24px; margin-bottom: 20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap: 16px;">
            <div>
              <span class="cyber-tag tag-magenta">${currentCase.id}</span>
              <h2 style="font-size: 1.4rem; color: var(--text-highlight); margin: 6px 0 2px 0;">
                ${currentCase.title}
              </h2>
              <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">
                TARGET KORBAN: <span style="color: var(--neon-cyan);">${currentCase.victim || 'Nasabah Finansial'}</span> | 
                POTENSI KERUGIAN: <span style="color: var(--neon-red);">${currentCase.potential_loss || 'Rp 50.000.000'}</span>
              </div>
            </div>

            <!-- Timer & Panic Bar -->
            <div style="min-width: 240px; text-align: right;">
              <div style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-amber); margin-bottom: 4px;">
                WAKTU SEBELUM KERUGIAN TOTAL:
              </div>
              <div id="crim-timer-display" style="font-family: var(--font-mono); font-size: 2rem; font-weight: 700; color: ${timerColor}; line-height: 1;">
                ${dynamicTimeStr}
              </div>
              <div class="vuln-bar-wrapper" style="height: 8px; margin-top: 6px;">
                <div id="crim-panic-fill" class="vuln-bar-fill ${panicClass}" style="width: ${pct}%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Board Grid -->
        <div class="crim-board-grid">
          <!-- Left: Clues Drawer -->
          <div class="hud-card crim-clues-drawer">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
              <h4 style="font-size: 1rem; color: var(--neon-cyan);">LACI BUKTI FORENSIK</h4>
              <span class="cyber-tag">${availableClues.length} TERSISA</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
              Tarik atau klik bukti ke slot dakwaan yang bersesuaian di sebelah kanan:
            </div>
            <div id="crim-clues-list">
              ${cluesHtml}
            </div>
          </div>

          <!-- Right: 4 Target Slots -->
          <div class="hud-card crim-investigation-slots">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
              <h3 style="font-size: 1.2rem; color: var(--text-highlight);">PAPAN DAKWAAN & ANATOMI KEJAHATAN</h3>
              <button class="cyber-btn" style="padding: 8px 18px; font-size: 0.85rem;" onclick="window.moduleCriminal.submitIndictment()">
                ⚖️ TERBITKAN SURAT DAKWAAN
              </button>
            </div>

            ${renderSlot('actor_origin', '1. AKTOR / SUMBER SERANGAN', 'Identifikasi asal infrastruktur, IP server, atau sindikat pelaku')}
            ${renderSlot('attack_vector', '2. VEKTOR SERANGAN UTAMA', 'Modus operandi atau teknik rekayasa sosial yang dilancarkan')}
            ${renderSlot('critical_redflag', '3. RED FLAG KRITIS (INDIKATOR BAHAYA)', 'Kejanggalan dokumen, rekening, atau permintaan abnormal')}
            ${renderSlot('intervention_strategy', '4. STRATEGI INTERVENSI & MITIGASI', 'Tindakan mitigasi tercepat untuk menyelamatkan dana korban')}
          </div>
        </div>
      </div>
      </div>
    `;
  }

  handleDragStart(e, clueId) {
    this.draggedClueId = clueId;
    e.dataTransfer.setData('text/plain', clueId);
    window.cyberAudio?.playWhoosh();
  }

  handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  }

  handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
  }

  handleDrop(e, slotKey) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const clueId = e.dataTransfer.getData('text/plain') || this.draggedClueId;
    this.assignClueToSlot(clueId, slotKey);
  }

  quickAssignClue(clueId) {
    // Find first empty slot
    const emptySlot = Object.keys(this.assignedSlots).find(k => !this.assignedSlots[k]);
    if (emptySlot) {
      this.assignClueToSlot(clueId, emptySlot);
    } else {
      window.app?.showToast('Semua slot telah terisi. Kosongkan slot terlebih dahulu untuk mengganti bukti.', 'magenta');
    }
  }

  assignClueToSlot(clueId, slotKey) {
    const currentCase = this.cases[this.currentIndex];
    const clue = (currentCase.clues || []).find(c => c.id === clueId);
    if (!clue) return;

    this.assignedSlots[slotKey] = clue;
    window.cyberAudio?.playClick();
    this.render();
  }

  unassignSlot(slotKey) {
    this.assignedSlots[slotKey] = null;
    window.cyberAudio?.playWhoosh();
    this.render();
  }

  submitIndictment() {
    const currentCase = this.cases[this.currentIndex];
    const required = currentCase.required_slots || {};

    // Check if all filled
    const unfilled = Object.keys(this.assignedSlots).filter(k => !this.assignedSlots[k]);
    if (unfilled.length > 0) {
      window.cyberAudio?.playError();
      window.app?.showToast('Lengkapi keempat slot dakwaan sebelum menerbitkan tuntutan hukum siber!', 'error');
      return;
    }

    // Check correctness
    let correctCount = 0;
    for (const [key, expectedId] of Object.entries(required)) {
      if (this.assignedSlots[key]?.id === expectedId) {
        correctCount++;
      }
    }

    this.stopTimer();

    const isAllCorrect = correctCount === 4;
    const scoreEarned = correctCount * 35;
    const vulnDelta = isAllCorrect ? -1.5 : (4 - correctCount) * 0.8;

    if (isAllCorrect) {
      window.cyberAudio?.playSuccess();
    } else {
      window.cyberAudio?.playError();
    }

    // Log activity
    window.authManager?.recordResult(
      scoreEarned,
      vulnDelta,
      'CRIMINAL CASE (Forensics)',
      `Dakwaan berkas ${currentCase.id}: ${correctCount}/4 bukti tepat`,
      isAllCorrect ? 'BREACH_PREVENTED' : 'INVESTIGATION_INCOMPLETE',
      'criminal'
    );

    // Show debrief modal
    this.showDebrief(isAllCorrect, correctCount, currentCase);
  }

  showDebrief(isAllCorrect, correctCount, currentCase) {
    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');
    if (!modalBox || !modalContent) return;

    modalContent.innerHTML = `
      <div style="text-align: center; padding: 10px;">
        <div style="font-size: 3.2rem; margin-bottom: 12px;">
          ${isAllCorrect ? '🏆' : '⚖️'}
        </div>
        <h3 style="font-size: 1.4rem; color: ${isAllCorrect ? 'var(--neon-green)' : 'var(--neon-amber)'}; margin-bottom: 12px;">
          ${isAllCorrect ? 'SURAT DAKWAAN SAH & PELAKU TERTANGKAP!' : `EVALUASI PENYUSUNAN BUKTI: ${correctCount}/4 TEPAT`}
        </h3>
        <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-main); margin-bottom: 20px;">
          ${isAllCorrect ? 'Operasi intervensi siber berhasil membekukan rekening pelarian tepat pada waktunya!' : 'Beberapa elemen bukti tertukar atau melibatkan kartu pengalih (distractor).'}
        </p>

        <div style="background: rgba(5,5,10,0.8); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 16px; text-align: left; margin-bottom: 20px;">
          <div style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-cyan); margin-bottom: 6px; font-weight: 700;">
            DEBRIEF INVESTIGASI RESMI:
          </div>
          <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.5;">
            ${currentCase.debrief || 'Investigasi membuktikan pentingnya pengenalan taktik rekayasa sosial dan verifikasi out-of-band.'}
          </p>
        </div>

        <div style="display:flex; justify-content:center; gap: 14px;">
          <button class="cyber-btn" onclick="window.moduleCriminal.finishCase()">
            LANJUT KE EVALUASI KERENTANAN
          </button>
        </div>
      </div>
    `;

    modalBox.classList.add('active');
  }

  finishCase() {
    const modalBox = document.getElementById('modal-general-box');
    if (modalBox) modalBox.classList.remove('active');

    window.app?.showVulnerabilityScreen({
      moduleTitle: 'CRIMINAL CASE: Investigasi Forensik Harian',
      scoreTitle: 'Indeks Ketajaman Analisis Forensik & Respon Cepat',
      scoreValue: window.authManager?.currentUser?.vulnerability || 2.1,
      analysis: 'Evaluasi kecepatan menghubungkan rantai serangan (Kill Chain), memilah bukti distraksi, dan mengeksekusi strategi mitigasi.',
      metrics: [
        { label: 'Ketepatan Rekonstruksi Bukti', score: '92%' },
        { label: 'Kecepatan Reaksi Krisis', score: '85%' },
        { label: 'Deteksi Bukti Pengalih (Distractor)', score: '90%' }
      ]
    });
  }
}

window.moduleCriminal = new ModuleCriminal();
