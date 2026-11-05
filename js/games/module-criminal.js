/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * MODUL 3: CRIMINAL CASE (Investigation Drag-and-Drop Puzzle)
 * Features:
 * - Progressive scenario unlocking & catalog support
 * - Single-scenario dedicated gameplay arena (No tab switcher)
 * - Drag-and-drop & Click-to-assign digital evidence slots
 * - Real-time countdown timer & stress mitigation
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
    this.render();
  }

  getStorageKey() {
    const user = window.authManager?.currentUser;
    return user ? `knowyourscam_unlocked_criminal_${user.id || user.username}` : 'knowyourscam_unlocked_criminal_guest';
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
    return 0; // First case unlocked by default
  }

  unlockNextCase() {
    try {
      const currentUnlocked = this.getUnlockedIndex();
      if (this.currentIndex >= currentUnlocked) {
        const nextIdx = Math.min(this.cases.length - 1, this.currentIndex + 1);
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
      alert('Berkas investigasi ini masih terkunci! Selesaikan berkas sebelumnya untuk membukanya.');
      return;
    }
    this.currentIndex = idx;
    this.resetState();
    if (window.gameBriefing) {
      window.gameBriefing.startGame('criminal');
    }
    this.render();
  }

  setCase(idx) {
    this.startScenario(idx);
  }

  onEnterRoute() {
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

    if (window.app?.currentRoute === 'criminal' && window.gameBriefing?.isPlaying('criminal')) {
      this.startTimer();
    }
  }

  startTimer() {
    this.stopTimer();
    if (window.app?.currentRoute !== 'criminal') return;

    this.isTimerRunning = true;
    this.isTimedOut = false;

    this.timerInterval = setInterval(() => {
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
      3.0,
      'CRIMINAL CASE (Time Out)',
      `Waktu investigasi ${this.cases[this.currentIndex]?.id} habis`,
      'COMPROMISED',
      'criminal'
    );

    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');
    if (!modalBox || !modalContent) return;

    modalContent.innerHTML = `
      <div style="text-align: center; padding: 10px;">
        <div style="font-size: 3.5rem; margin-bottom: 12px;">⏰</div>
        <h3 style="font-size: 1.4rem; color: var(--neon-red); margin-bottom: 12px;">
          WAKTU OPERASI INVESTIGASI HABIS!
        </h3>
        <p style="font-size: 0.95rem; line-height: 1.6; color: var(--text-main); margin-bottom: 20px;">
          Sindikat penipuan berhasil melarikan dana transaksi sebelum berkas dakwaan forensik diterbitkan.
        </p>
        <div style="display:flex; justify-content:center; gap: 14px; flex-wrap: wrap;">
          <button class="cyber-btn" onclick="window.moduleCriminal.resetAndRetry()">
            🔄 ULANGI INVESTIGASI BERKAS
          </button>
          <button class="cyber-btn btn-ghost" onclick="window.moduleCriminal.closeModal(); window.gameBriefing.returnToBriefing('criminal');">
            📂 KATALOG BERKAS
          </button>
        </div>
      </div>
    `;

    modalBox.classList.add('active');
  }

  closeModal() {
    const modalBox = document.getElementById('modal-general-box');
    if (modalBox) modalBox.classList.remove('active');
  }

  resetAndRetry() {
    this.closeModal();
    this.resetState();
    this.render();
  }

  render() {
    const container = document.getElementById('criminal-module-container');
    if (!container) return;

    if (!this.cases || this.cases.length === 0) {
      container.innerHTML = `<div class="hud-card" style="padding: 30px; text-align: center;">Memuat berkas sindikat kejahatan siber...</div>`;
      return;
    }

    const currentCase = this.cases[this.currentIndex];

    // Two-Page System: Page Start (Briefing & Tutorial) vs Page Game (Arena)
    const isPlaying = window.gameBriefing?.isPlaying('criminal');
    const startScreenHtml = window.gameBriefing?.renderStartScreenHTML('criminal') || '';
    const hudBarHtml = window.gameBriefing?.renderGameHUDBar('criminal') || '';

    const isCustom = currentCase.is_custom;

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
                <button class="cyber-btn btn-ghost" style="padding: 2px 8px; font-size: 0.7rem; margin-top: 6px; display:block;" onclick="window.moduleCriminal.unassignSlot('${slotKey}')">
                  ✕ Lepaskan Bukti
                </button>
              </div>
            ` : `
              <div style="margin-top: 8px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); border: 1px dashed rgba(255,255,255,0.1); padding: 10px; border-radius: 4px; text-align: center;">
                Tarik atau klik kartu bukti untuk mengisi slot ini
              </div>
            `}
          </div>
        </div>
      `;
    };

    container.innerHTML = `
      ${startScreenHtml}
      <div id="view-game-criminal" class="game-page-arena holo-enter crim-workspace" style="${isPlaying ? 'display:block;' : 'display:none;'}">
        ${hudBarHtml}

        <!-- Single Selected Scenario Header - NO Tab Switcher -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 16px;">
          <div style="display:flex; gap: 8px; align-items:center; flex-wrap:wrap;">
            <span class="cyber-tag tag-cyan" style="font-size: 0.82rem; letter-spacing: 0.5px;">
              🕵️ BERKAS ${this.currentIndex + 1} DARI ${this.cases.length}
            </span>
            <span class="cyber-tag tag-magenta" style="font-size: 0.82rem;">
              BERKAS #${currentCase.id}
            </span>
            ${isCustom ? `<span class="cyber-tag" style="border-color: var(--neon-magenta); color: var(--neon-magenta);">⭐ KASUS KUSTOM</span>` : ''}
          </div>

          <!-- Live Panic Timer -->
          <div style="display:flex; align-items:center; gap: 12px; background: rgba(5,5,10,0.85); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 6px 14px;">
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">SISA WAKTU INVESTIGASI:</span>
            <strong id="crim-timer-display" class="timer-countdown" style="font-size: 1.25rem; font-family: var(--font-display); color: ${timerColor};">
              ${dynamicTimeStr}
            </strong>
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

        <!-- Case Overview Banner -->
        <div class="hud-card" style="margin-bottom: 20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
            <h2 style="font-size: 1.35rem; color: var(--text-highlight); margin:0;">
              ${currentCase.title}
            </h2>
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-red);">
              POTENSI KERUGIAN: <strong>${currentCase.potential_loss}</strong>
            </div>
          </div>
          <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">
            ${currentCase.description}
          </p>

          <!-- Panic Fill Bar -->
          <div class="vuln-bar-wrapper" style="height: 6px;">
            <div id="crim-panic-fill" class="vuln-bar-fill ${panicClass}" style="width: ${pct}%;"></div>
          </div>
        </div>

        <!-- Investigation Two Columns: Clues Docket vs Indictment Board -->
        <div class="crim-columns">
          <!-- Left: Clues Available -->
          <div class="hud-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
              <div style="font-family: var(--font-display); font-size: 0.9rem; color: var(--neon-cyan);">
                KARTU BUKTI DIGITAL (${availableClues.length} TERSEDIA)
              </div>
              <span style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">KLIK / DRAG KE KANAN</span>
            </div>
            <div class="crim-clues-pool">
              ${cluesHtml}
            </div>
          </div>

          <!-- Right: 4 Slot Indictment Board -->
          <div class="hud-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px;">
              <div style="font-family: var(--font-display); font-size: 0.9rem; color: var(--neon-magenta);">
                PAPAN DAKWAAN FORENSIK RESMI
              </div>
              <button class="cyber-btn btn-ghost" style="padding: 2px 10px; font-size: 0.75rem;" onclick="window.moduleCriminal.resetSlots()">
                KOSONGKAN PAPAN
              </button>
            </div>

            <div class="crim-slots-grid">
              ${renderSlot('actor_origin', '1. AKTOR & SUMBER ANCAMAN', 'IP address relay, server proxy, atau lokasi sindikat')}
              ${renderSlot('attack_vector', '2. VEKTOR SERANGAN', 'Taktik manipulasi (Email Spoofing, Vishing, BEC)')}
              ${renderSlot('critical_redflag', '3. RED FLAG KRITIS', 'Kejanggalan utama dalam dokumen/transaksi')}
              ${renderSlot('intervention_strategy', '4. STRATEGI INTERVENSI', 'Langkah mitigasi terverifikasi untuk memutus kerugian')}
            </div>

            <button class="cyber-btn" style="width: 100%; margin-top: 20px; padding: 14px; font-size: 1rem;" onclick="window.moduleCriminal.submitIndictment()">
              ⚖️ TERBITKAN SURAT DAKWAAN & BEKUKAN REKENING ➔
            </button>
          </div>
        </div>
      </div>
      </div>
    `;
  }

  handleDragStart(e, clueId) {
    this.draggedClueId = clueId;
    e.dataTransfer.setData('text/plain', clueId);
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDragLeave(e) {
    e.preventDefault();
  }

  handleDrop(e, slotKey) {
    e.preventDefault();
    const clueId = e.dataTransfer.getData('text/plain') || this.draggedClueId;
    this.assignClueToSlot(clueId, slotKey);
  }

  quickAssignClue(clueId) {
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

  resetSlots() {
    this.assignedSlots = {
      actor_origin: null,
      attack_vector: null,
      critical_redflag: null,
      intervention_strategy: null
    };
    window.cyberAudio?.playWhoosh();
    this.render();
  }

  submitIndictment() {
    const currentCase = this.cases[this.currentIndex];
    const required = currentCase.required_slots || {};

    const unfilled = Object.keys(this.assignedSlots).filter(k => !this.assignedSlots[k]);
    if (unfilled.length > 0) {
      window.cyberAudio?.playError();
      window.app?.showToast('Lengkapi keempat slot dakwaan sebelum menerbitkan tuntutan hukum siber!', 'error');
      return;
    }

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
      // Unlock next scenario
      this.unlockNextCase();
    } else {
      window.cyberAudio?.playError();
    }

    window.authManager?.recordResult(
      scoreEarned,
      vulnDelta,
      'CRIMINAL CASE (Forensics)',
      `Dakwaan berkas ${currentCase.id}: ${correctCount}/4 bukti tepat`,
      isAllCorrect ? 'BREACH_PREVENTED' : 'INVESTIGATION_INCOMPLETE',
      'criminal'
    );

    this.showDebrief(isAllCorrect, correctCount, currentCase);
  }

  showDebrief(isAllCorrect, correctCount, currentCase) {
    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');
    if (!modalBox || !modalContent) return;

    const hasNext = this.currentIndex + 1 < this.cases.length;
    const nextIdx = this.currentIndex + 1;

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
          <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.5; margin: 0;">
            ${currentCase.debrief || 'Investigasi membuktikan pentingnya pengenalan taktik rekayasa sosial dan verifikasi out-of-band.'}
          </p>
        </div>

        <div style="display:flex; justify-content:center; gap: 14px; flex-wrap: wrap;">
          ${isAllCorrect && hasNext ? `
            <button class="cyber-btn" onclick="window.moduleCriminal.finishCase(); window.moduleCriminal.startScenario(${nextIdx});">
              ⚡ LANJUT KE BERKAS ${nextIdx + 1} ➔
            </button>
            <button class="cyber-btn btn-ghost" onclick="window.moduleCriminal.finishCase(); window.gameBriefing.returnToBriefing('criminal');">
              📂 KATALOG BERKAS
            </button>
          ` : `
            <button class="cyber-btn" onclick="window.moduleCriminal.finishCase()">
              LANJUT KE EVALUASI KERENTANAN
            </button>
            <button class="cyber-btn btn-ghost" onclick="window.moduleCriminal.finishCase(); window.gameBriefing.returnToBriefing('criminal');">
              📂 KATALOG BERKAS
            </button>
          `}
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
