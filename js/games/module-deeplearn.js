/**
 * KNOW YOUR SCAM: ANTI-GRAVITY CYBER DEFENSE
 * MODUL 4: ANALYZER - DETEKTIF OWL FORENSICS & LIVE GADGET
 * 
 * Fitur:
 * 1. Simulasi "Live Gadget" Interaktif (bukan teks cerita biasa):
 *    - Pesan masuk satu per satu dengan animasi typing indicator (...) dan notifikasi pop.
 *    - Countdown timer palsu berkedip merah memicu kepanikan realistis korban.
 * 2. Fitur "X-Ray / UV Scanner" Detektif Owl:
 *    - Tombol toggle mode UV yang menyorot metadata tersembunyi (nomor asli, domain age, taktik psikologis).
 * 3. Mekanisme "Stamp Verdict" (Stempel Vonis):
 *    - Tombol stempel besar PENIPUAN (SCAM) vs AMAN (SAFE) dengan efek bantingan stempel & screen shake.
 * 4. Animasi Evaluasi LLM ("Owl AI Forensics Lab"):
 *    - Detektif Burung Hantu mengetik cepat di depan radar forensik memindai kata kunci dan memberikan skor 0-100%.
 * 5. Uji Nalar Zero-Paranoia (Kasus Aman Resmi vs Kasus Scam Kritis).
 */

(function() {
  'use strict';

  // ========================================================
  // 1. ANIMATED PIXEL ART SVG GENERATORS
  // ========================================================

  function getPixelDetectiveOwlSVG(size = 72) {
    return `
      <div class="pixel-owl-wrap" title="Detektif Burung Hantu (Owl Detective)">
        <svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
          <!-- Detective Fedora Hat -->
          <rect x="7" y="1" width="14" height="4" fill="#78350F" />
          <rect x="5" y="4" width="18" height="2" fill="#92400E" />
          <rect x="5" y="5" width="18" height="1" fill="#0284C7" />
          <!-- Ear Tufts -->
          <rect x="4" y="6" width="3" height="3" fill="#B45309" />
          <rect x="21" y="6" width="3" height="3" fill="#B45309" />
          <!-- Owl Head & Spectacles -->
          <rect x="6" y="6" width="16" height="10" fill="#D97706" />
          <rect x="7" y="7" width="6" height="6" fill="#FEF3C7" />
          <rect x="15" y="7" width="6" height="6" fill="#FEF3C7" />
          <rect x="8" y="8" width="4" height="4" fill="#F59E0B" />
          <rect x="9" y="9" width="2" height="2" fill="#0F172A" />
          <rect x="10" y="8" width="1" height="1" fill="#FFFFFF" />
          <rect x="16" y="8" width="4" height="4" fill="#F59E0B" />
          <rect x="17" y="9" width="2" height="2" fill="#0F172A" />
          <rect x="18" y="8" width="1" height="1" fill="#FFFFFF" />
          <rect x="13" y="9" width="2" height="1" fill="#78350F" />
          <rect x="13" y="12" width="2" height="3" fill="#EA580C" />
          <!-- Trenchcoat Body -->
          <rect x="6" y="16" width="16" height="9" fill="#92400E" />
          <rect x="12" y="16" width="4" height="9" fill="#FDE68A" />
          <rect x="13" y="17" width="2" height="2" fill="#EF4444" />
          <!-- Magnifying Glass in Wing -->
          <rect x="22" y="15" width="4" height="4" fill="#FBBF24" />
          <rect x="23" y="16" width="2" height="2" fill="#38BDF8" />
          <rect x="24" y="19" width="2" height="4" fill="#78350F" />
          <rect x="9" y="25" width="3" height="2" fill="#EA580C" />
          <rect x="16" y="25" width="3" height="2" fill="#EA580C" />
        </svg>
      </div>
    `;
  }

  function getPixelOwlLabSVG(size = 84) {
    return `
      <div class="owl-typing-avatar" title="Owl AI Forensics Lab">
        <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
          <!-- Retro Radar Computer Screen -->
          <rect x="4" y="2" width="24" height="16" fill="#0F172A" />
          <rect x="5" y="3" width="22" height="14" fill="#020617" />
          <rect x="7" y="5" width="18" height="10" fill="#064E3B" />
          <rect x="9" y="7" width="14" height="6" fill="#10B981" opacity="0.3" />
          <rect x="15" y="6" width="2" height="8" fill="#34D399" />
          <rect x="11" y="9" width="10" height="2" fill="#34D399" />
          <!-- Blinking LED nodes -->
          <rect x="6" y="18" width="2" height="1" fill="#38BDF8" />
          <rect x="9" y="18" width="2" height="1" fill="#F43F5E" />
          <rect x="12" y="18" width="2" height="1" fill="#FBBF24" />
          <!-- Computer Base -->
          <rect x="12" y="18" width="8" height="4" fill="#334155" />
          <rect x="8" y="22" width="16" height="2" fill="#1E293B" />
          <!-- Keyboard -->
          <rect x="6" y="23" width="20" height="4" fill="#475569" />
          <rect x="8" y="24" width="2" height="1" fill="#F8FAFC" />
          <rect x="11" y="24" width="2" height="1" fill="#F8FAFC" />
          <rect x="14" y="24" width="2" height="1" fill="#F8FAFC" />
          <rect x="17" y="24" width="2" height="1" fill="#F8FAFC" />
          <rect x="20" y="24" width="2" height="1" fill="#F8FAFC" />
          <!-- Owl Wings Typing -->
          <rect x="4" y="20" width="4" height="5" fill="#B45309" />
          <rect x="24" y="20" width="4" height="5" fill="#B45309" />
          <rect x="7" y="24" width="2" height="2" fill="#EA580C" />
          <rect x="23" y="24" width="2" height="2" fill="#EA580C" />
        </svg>
      </div>
    `;
  }

  // ========================================================
  // 2. ANALYZER SCENARIOS REPOSITORY
  // ========================================================
  const ANALYZER_CASES = [
    {
      id: 'analyzer_case_01',
      title: 'SMS Edukasi Keamanan Resmi Bank BCA',
      senderDisplay: 'BANK-BCA',
      senderSub: 'Telkomsel Verified Sender ID • 14:15',
      deviceType: 'smartphone_sms',
      hasFakeTimer: false,
      fakeTimerSeconds: 0,
      actualVerdict: 'SAFE', // Aman Resmi (Uji Zero-Paranoia)
      scenarioText: '[PERINGATAN KEAMANAN BCA]\nJangan pernah bagikan kode OTP, PIN, atau Password m-BCA Anda kepada siapa pun termasuk pihak yang mengaku petugas bank. BCA tidak pernah meminta kode rahasia nasabah.\nInfo resmi hubungi HaloBCA 1500888.',
      xrayData: {
        sender: '✅ SENDER RESMI TERVERIFIKASI: Alpha-numeric Sender ID terdaftar resmi di operator seluler (PT Bank Central Asia Tbk). Anti-spoofing signature: VALID.',
        content: '✅ KONTEN EDUKATIF MURNI: Tidak memuat tautan luar (.xyz/.apk), tidak meminta data pribadi, dan tidak ada nomor rekening pihak ketiga.',
        hotline: '✅ HOTLINE RESMI: HaloBCA 1500888 adalah nomor kontak resmi terverifikasi OJK & Bank Indonesia.'
      },
      keywordsRequired: ['resmi', 'tidak ada link', 'tidak minta otp', 'bukan apk', 'edukasi', 'halobca', 'aman', 'tidak minta data'],
      paranoidFeedback: 'Wah, Detektif terlalu curiga nih! Coba perhatikan lagi dengan Mode X-Ray: pesan ini tidak memuat tautan mencurigakan, tidak melampirkan file APK, dan sama sekali tidak meminta data rahasia. Ini murni pesan edukasi resmi dari bank untuk melindungi nasabah!',
      accurateSafeFeedback: 'Analisis brilian! Anda berhasil menerapkan nalar Zero-Paranoia: memverifikasi bahwa pesan edukasi resmi perbankan yang tidak meminta data atau tautan adalah aman dan otentik.'
    },

    {
      id: 'analyzer_case_02',
      title: 'Ancaman Pemblokiran Rekening Bank Mandiri Online',
      senderDisplay: 'MANDIRI-NOTIF',
      senderSub: 'Pesan Sistem Eksternal • 14:22',
      deviceType: 'smartphone_sms',
      hasFakeTimer: true,
      fakeTimerSeconds: 299, // 04:59
      actualVerdict: 'SCAM', // Penipuan Kritis
      scenarioText: '[MANDIRI ALERTA] Rekening Anda terindikasi akses transaksi ilegal dari IP Rusia. Batalkan transaksi & amankan saldo Anda sebelum batas waktu habis di: https://mandiri-security-update.xyz/verify',
      xrayData: {
        sender: '🚨 SENDER DISAMARKAN: Nomor asli transmisi: +7 921 442-1920 (Proxy Luar Negeri) • SPF Verification: FAILED • Display Name dipalsukan.',
        content: '⚠️ DOMAIN FRAUD: Domain Age: 2 hari • Registrar: NameCheap Anon • IP: 194.87.12.8 (Hosting Fiktif) • SSL: Let\'s Encrypt Free Tier.',
        hotline: '🧠 TAKTIK PSIKOLOGIS: Artificial Time Pressure (Batas waktu 5 menit berkedip merah sengaja dibuat untuk mematikan akal sehat korban).'
      },
      keywordsRequired: ['phishing', 'xyz', 'domain', 'urgensi', 'palsu', 'ip', 'rusia', 'link', 'kredensial', 'timer'],
      paranoidFeedback: 'Waspada! Anda menilai ini AMAN, padahal ini adalah serangan phishing berbahaya! Domain .xyz berumur 2 hari sengaja dibuat untuk menguras kredensial rekening nasabah.',
      accurateScamFeedback: 'Analisis forensik sangat tajam! Anda membongkar rekayasa domain .xyz yang baru berumur 2 hari, taktik panik batasan waktu 5 menit, serta nomor pengirim yang sebenarnya berasal dari luar negeri.'
    },

    {
      id: 'analyzer_case_03',
      title: 'Undian Pemenang Poin Berhadiah Telkomsel Grand Prize',
      senderDisplay: 'TELKOMSEL-POIN',
      senderSub: 'Pesan Program Promo • 14:30',
      deviceType: 'smartphone_sms',
      hasFakeTimer: true,
      fakeTimerSeconds: 165, // 02:45
      actualVerdict: 'SCAM', // Penipuan Kritis
      scenarioText: 'Selamat! Nomor Anda terpilih memenangkan Grand Prize Rp 50.000.000 dari Telkomsel Poin. Segera klaim sebelum kuota hangus via portal: https://klaim-poin-telkomsel-2026.net.fake/login dengan memasukkan nomor HP dan 6-digit OTP SMS.',
      xrayData: {
        sender: '⚠️ MODUS SOCIAL ENGINEERING: Pelaku mendompleng nama program loyalitas resmi untuk menjerat korban yang tergiur hadiah instan.',
        content: '🚨 DOMAIN FAKE: Domain berakhiran .net.fake bukan domain resmi telkomsel.com • Server terindikasi sindikat pembajakan OTP.',
        hotline: '⛔ RED FLAG FATAL: Meminta kode rahasia OTP SMS di formulir web! Kode OTP tidak boleh dibagikan kepada siapa pun.'
      },
      keywordsRequired: ['otp', 'net.fake', 'hadiah', 'klaim', 'palsu', 'link', 'bukan resmi', 'kode rahasia'],
      paranoidFeedback: 'Hati-hati! Hadiah uang fantastis tanpa mengikuti undian resmi adalah umpan penipuan klasik untuk mencuri kode OTP Anda.',
      accurateScamFeedback: 'Deteksi akurat, Detektif! Permintaan kode OTP SMS melalui tautan .net.fake adalah indikator mutlak kejahatan siber pencurian akun.'
    }
  ];

  // ========================================================
  // 3. MODULE DEEP LEARNING (ANALYZER) CONTROLLER CLASS
  // ========================================================
  class ModuleDeepLearning {
    constructor() {
      this.cases = ANALYZER_CASES;
      this.currentIndex = 0;
      this.isXRayMode = false;
      this.selectedVerdict = null; // 'SCAM' or 'SAFE'
      this.isEvaluating = false;
      this.fakeTimerInterval = null;
      this.fakeTimeLeft = 299;
      this.displayedMessages = [];
      this.isTypingMessage = false;
    }

    init(casesData) {
      if (casesData && casesData.length >= 3 && casesData[0].xrayData) {
        this.cases = casesData;
      }
      this.currentIndex = 0;
      this.resetScenarioState();
      this.render();
    }

    getStorageKey() {
      const user = window.authManager?.currentUser;
      return user ? `knowyourscam_unlocked_deeplearn_${user.id || user.username}` : 'knowyourscam_unlocked_deeplearn_guest';
    }

    getUnlockedIndex() {
      try {
        const val = localStorage.getItem(this.getStorageKey());
        if (val !== null) {
          const parsed = parseInt(val, 10);
          return isNaN(parsed) ? 0 : Math.max(0, parsed);
        }
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
      return 0; // Case 0 unlocked by default
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

    resetScenarioState() {
      this.stopFakeTimer();
      const current = this.cases[this.currentIndex];
      this.isXRayMode = false;
      this.selectedVerdict = null;
      this.isEvaluating = false;
      this.fakeTimeLeft = current.fakeTimerSeconds || 299;
      this.displayedMessages = [];
      this.isTypingMessage = false;

      // Start sequential message animation
      this.startMessageSequence(current);

      // Start fake timer if scenario has fake timer
      if (current.hasFakeTimer) {
        this.startFakeTimer();
      }
    }

    startMessageSequence(current) {
      this.isTypingMessage = true;
      this.render();

      setTimeout(() => {
        window.cyberAudio?.playClick();
        this.isTypingMessage = false;
        this.displayedMessages.push(current.scenarioText);
        this.render();
      }, 900);
    }

    startFakeTimer() {
      this.stopFakeTimer();
      this.fakeTimerInterval = setInterval(() => {
        if (this.fakeTimeLeft > 0) {
          this.fakeTimeLeft--;
          const timerEl = document.getElementById('scammer-fake-timer-val');
          if (timerEl) {
            timerEl.textContent = this.formatTime(this.fakeTimeLeft);
          }
        }
      }, 1000);
    }

    stopFakeTimer() {
      if (this.fakeTimerInterval) {
        clearInterval(this.fakeTimerInterval);
        this.fakeTimerInterval = null;
      }
    }

    formatTime(seconds) {
      const s = Math.max(0, seconds);
      const mins = String(Math.floor(s / 60)).padStart(2, '0');
      const secs = String(s % 60).padStart(2, '0');
      return `${mins}:${secs}`;
    }

    startScenario(idx) {
      const unlocked = this.getUnlockedIndex();
      if (idx > unlocked) {
        window.cyberAudio?.playError();
        window.app?.showToast('Skenario analisis ini masih terkunci! Selesaikan skenario sebelumnya untuk membukanya.', 'error');
        return;
      }
      this.currentIndex = idx;
      this.resetScenarioState();
      if (window.gameBriefing) {
        window.gameBriefing.startGame('deeplearn');
      }
      this.render();
    }

    setCase(idx) {
      this.startScenario(idx);
    }

    // Toggle X-Ray UV Scanner Mode
    toggleXRayMode() {
      this.isXRayMode = !this.isXRayMode;
      window.cyberAudio?.playWhoosh();
      if (this.isXRayMode) {
        window.app?.showToast('🔎 Mode Analisis Owl (UV Scanner) Aktif! Arahkan kursor ke elemen teks untuk menyorot metadata tersembunyi.', 'info');
      }
      this.render();
    }

    // Stamp Verdict Action with screen shake
    stampVerdict(type) {
      window.cyberAudio?.playSuccess();
      this.selectedVerdict = type;

      // Apply screen shake to gadget
      const gadget = document.querySelector('.live-gadget-wrapper');
      if (gadget) {
        gadget.classList.remove('screen-shake-anim');
        void gadget.offsetWidth; // Trigger reflow
        gadget.classList.add('screen-shake-anim');
      }

      this.render();
    }

    render() {
      const container = document.getElementById('deeplearn-module-container');
      if (!container) return;

      const isPlaying = window.gameBriefing?.isPlaying('deeplearn');
      const startScreenHtml = window.gameBriefing?.renderStartScreenHTML('deeplearn') || '';
      const hudBarHtml = window.gameBriefing?.renderGameHUDBar('deeplearn') || '';

      const current = this.cases[this.currentIndex];

      container.innerHTML = `
        ${startScreenHtml}
        <div id="view-game-deeplearn" class="game-page-arena holo-enter" style="${isPlaying ? 'display:block;' : 'display:none;'}">
          ${hudBarHtml}

          <!-- Header & Controls -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 16px;">
            <div style="display:flex; align-items:center; gap: 10px;">
              ${getPixelDetectiveOwlSVG(44)}
              <div>
                <span class="cyber-tag tag-magenta" style="font-size:0.72rem;">
                  MODUL 4: ANALYZER // FORENSIK COGNITIVE AI
                </span>
                <h2 style="font-size: 1.25rem; color: var(--text-highlight); margin: 2px 0 0 0;">
                  ${current.title}
                </h2>
              </div>
            </div>

            <div style="display:flex; align-items:center; gap: 10px;">
              <!-- Toggle Button X-Ray / UV Scanner -->
              <button 
                class="xray-toggle-btn ${this.isXRayMode ? 'active' : ''}" 
                onclick="window.moduleDeepLearning.toggleXRayMode()"
                title="Aktifkan Mode Analisis Owl untuk menyorot metadata tersembunyi"
              >
                <span>🔎</span>
                <span>${this.isXRayMode ? 'MODE ANALISIS OWL: AKTIF' : 'AKTIFKAN MODE ANALISIS OWL'}</span>
              </button>

              <button class="cyber-btn btn-ghost" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.gameBriefing.returnToBriefing('deeplearn')">
                📂 KATALOG
              </button>
            </div>
          </div>

          <!-- 1. SIMULASI "LIVE GADGET" INTERAKTIF -->
          <div class="live-gadget-wrapper ${this.isXRayMode ? 'uv-mode-active' : ''}">
            
            <!-- Top Status Bar & Fake Scammer Timer -->
            <div class="live-gadget-topbar">
              <div style="display:flex; align-items:center; gap: 8px;">
                <span>📶 5G &bull; 99% 🔋</span>
                <span style="font-size: 0.7rem; color: #64748B;">SMS Gateway</span>
              </div>
              ${current.hasFakeTimer ? `
                <div class="scammer-fake-timer">
                  <span>⚠️ SISA WAKTU BATALKAN:</span>
                  <span id="scammer-fake-timer-val">${this.formatTime(this.fakeTimeLeft)}</span>
                </div>
              ` : `
                <span style="font-size: 0.7rem; color: #10B981;">✓ Transmisi Aman</span>
              `}
            </div>

            <!-- Gadget App Header -->
            <div style="background: rgba(15, 23, 42, 0.95); padding: 12px 18px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); display:flex; align-items:center; justify-content:space-between;">
              <div style="display:flex; align-items:center; gap: 10px;">
                <span style="font-size: 1.4rem;">💬</span>
                <div>
                  <!-- X-Ray Hotspot: Sender Name -->
                  <div class="xray-hotspot">
                    <strong style="color: #F8FAFC; font-size: 0.9rem;">
                      ${current.senderDisplay}
                    </strong>
                    <div class="xray-tooltip">
                      ${current.xrayData.sender}
                    </div>
                  </div>
                  <div style="font-size: 0.7rem; color: #94A3B8;">${current.senderSub}</div>
                </div>
              </div>
              <span class="cyber-tag" style="font-size: 0.65rem;">Layar Korban</span>
            </div>

            <!-- Message Area -->
            <div style="padding: 20px 18px; min-height: 180px; position: relative;">
              ${this.displayedMessages.map(msg => `
                <div class="chat-bubble scammer holo-enter" style="max-width: 100%; margin-bottom: 10px; line-height: 1.6; font-size: 0.88rem; position: relative;">
                  <!-- Render message with X-Ray inspectable spans -->
                  ${this.renderXRayInspectableText(msg, current)}
                  <div class="chat-time">Baru saja</div>
                </div>
              `).join('')}

              ${this.isTypingMessage ? `
                <div class="chat-typing-indicator holo-enter">
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                  <span style="margin-left: 6px; font-size: 0.75rem;">Pengirim sedang mentransmisikan pesan...</span>
                </div>
              ` : ''}

              <!-- Physical Stamp Slammed Mark on Screen -->
              ${this.selectedVerdict ? `
                <div class="slammed-stamp-mark ${this.selectedVerdict === 'SCAM' ? 'stamp-scam' : 'stamp-safe'}">
                  VERDICT: ${this.selectedVerdict === 'SCAM' ? 'PENIPUAN (SCAM)' : 'AMAN (SAFE)'}
                </div>
              ` : ''}
            </div>

          </div>

          <!-- 2. MEKANISME "STAMP VERDICT" (STEMPEL BESAR) -->
          <div style="text-align: center; margin-bottom: 18px;">
            <div style="font-family: var(--font-display); font-size: 0.82rem; color: var(--neon-cyan); letter-spacing: 1px; margin-bottom: 8px;">
              // JATUHKAN STEMPEL VONIS ANDA PADA LAYAR GADGET DI ATAS:
            </div>
            <div class="stamp-verdict-deck">
              <button 
                class="stamp-btn stamp-btn-scam ${this.selectedVerdict === 'SCAM' ? 'selected' : ''}"
                onclick="window.moduleDeepLearning.stampVerdict('SCAM')"
              >
                <span style="font-size: 1.8rem; margin-bottom: 4px;">🚨</span>
                <strong style="font-size: 0.95rem; font-family: var(--font-display);">STEMPEL: PENIPUAN</strong>
                <span style="font-size: 0.68rem; opacity: 0.8; margin-top: 2px;">(REKAYASA / MALICIOUS)</span>
              </button>

              <button 
                class="stamp-btn stamp-btn-safe ${this.selectedVerdict === 'SAFE' ? 'selected' : ''}"
                onclick="window.moduleDeepLearning.stampVerdict('SAFE')"
              >
                <span style="font-size: 1.8rem; margin-bottom: 4px;">🛡️</span>
                <strong style="font-size: 0.95rem; font-family: var(--font-display);">STEMPEL: AMAN</strong>
                <span style="font-size: 0.68rem; opacity: 0.8; margin-top: 2px;">(EDUKASI RESMI / VALID)</span>
              </button>
            </div>
          </div>

          <!-- 3. PENALARAN KRITIS & SUBMISSION KE OWL AI LAB -->
          <div class="hud-card" style="padding: 22px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
              <label style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-cyan); letter-spacing: 1.5px;">
                // EVALUASI PENALARAN KRITIS FORENSIK (MINIMAL 15 KARAKTER)
              </label>
              <span style="font-size: 0.72rem; color: var(--text-muted);">
                Akan diuji oleh Owl AI Forensics Lab
              </span>
            </div>

            <textarea 
              id="deep-reasoning-input" 
              class="deep-reasoning-area" 
              placeholder="Contoh: Saya meneliti melalui Mode X-Ray bahwa pesan ini mencurigakan karena menggunakan domain .xyz berumur 2 hari, taktik panik batasan waktu 5 menit, dan nomor aslinya berasal dari luar negeri..."
            ></textarea>

            <button 
              id="btn-submit-ai" 
              class="cyber-btn" 
              style="padding: 14px 28px; font-size: 1rem; width: 100%; margin-top: 14px; box-shadow: 0 0 25px var(--neon-cyan-dim);" 
              onclick="window.moduleDeepLearning.submitToOwlAILab()"
            >
              <span>🧠</span> KIRIM KE OWL AI FORENSICS LAB ➔
            </button>

            <!-- 4. ANIMASI EVALUASI LLM ("OWL AI FORENSICS LAB") -->
            <div id="owl-forensic-lab-box" class="owl-forensic-lab holo-enter" style="display: none;">
              <div class="owl-radar-screen">
                <div class="owl-radar-sweep"></div>
                <div style="position: absolute; inset:0; display:flex; align-items:center; justify-content:center; font-size: 1.4rem;">
                  🦉
                </div>
              </div>

              ${getPixelOwlLabSVG(78)}

              <h4 style="font-size: 1.15rem; color: var(--neon-cyan); margin: 8px 0 4px 0;">
                OWL AI FORENSICS LAB SEDANG MENGUJI ANALISIS ANDA...
              </h4>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0 0 12px 0;">
                Detektif Burung Hantu sedang memindai kata kunci dan merekonstruksi taktik psikologis siber.
              </p>

              <!-- Dynamic Scanning Stream -->
              <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 8px 14px; display:inline-block; font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-green);">
                SCANNING KEYWORDS // [OTP, Domain Age, Urgensi, SPF Verification, Anti-Spoofing] ...
              </div>
            </div>

          </div>

        </div>
      `;
    }

    // Helper: Wrap inspectable terms in X-Ray hotspots with tooltips
    renderXRayInspectableText(text, current) {
      let formatted = text.replace(/\n/g, '<br>');

      // Highlight link
      formatted = formatted.replace(/(https:\/\/[^\s]+)/g, (match) => `
        <span class="xray-hotspot">
          <strong style="color: #38BDF8; text-decoration: underline;">${match}</strong>
          <span class="xray-tooltip">${current.xrayData.content}</span>
        </span>
      `);

      // Highlight urgency / phone / OTP terms
      formatted = formatted.replace(/(1500888|Rusia|batas waktu|OTP|Password|50\.000\.000)/g, (match) => `
        <span class="xray-hotspot">
          <span style="color: #FBBF24; font-weight:700;">${match}</span>
          <span class="xray-tooltip">${current.xrayData.hotline}</span>
        </span>
      `);

      return formatted;
    }

    // Submit to Owl AI Forensics Lab
    async submitToOwlAILab() {
      const textarea = document.getElementById('deep-reasoning-input');
      const reasoningText = textarea ? textarea.value.trim() : '';

      if (!this.selectedVerdict) {
        window.cyberAudio?.playError();
        window.app?.showToast('Jatuhkan stempel vonis (PENIPUAN atau AMAN) terlebih dahulu!', 'error');
        return;
      }

      if (reasoningText.length < 15) {
        window.cyberAudio?.playError();
        window.app?.showToast('Tuliskan analisis forensik minimal 15 karakter untuk evaluasi akurat!', 'error');
        return;
      }

      const btn = document.getElementById('btn-submit-ai');
      const labBox = document.getElementById('owl-forensic-lab-box');

      if (btn) btn.disabled = true;
      if (labBox) labBox.style.display = 'block';
      window.cyberAudio?.playWhoosh();

      // Scroll smoothly to lab box
      labBox?.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const currentCase = this.cases[this.currentIndex];

      // Simulated Owl AI Forensics Processing (1.8s)
      await new Promise(r => setTimeout(r, 1800));

      const isVerdictCorrect = (this.selectedVerdict === currentCase.actualVerdict);
      const lower = reasoningText.toLowerCase();
      const requiredKeywords = currentCase.keywordsRequired || [];
      const matched = requiredKeywords.filter(k => lower.includes(k.toLowerCase()));
      const keywordCoverage = matched.length / Math.max(1, requiredKeywords.length);

      let score = 0;
      let critiqueText = '';

      if (currentCase.actualVerdict === 'SAFE') {
        if (this.selectedVerdict === 'SCAM') {
          // Paranoid case: User marked safe as scam
          score = Math.max(35, Math.round(keywordCoverage * 40));
          critiqueText = currentCase.paranoidFeedback;
        } else {
          // Correctly identified safe
          score = Math.min(100, Math.round(75 + (keywordCoverage * 25)));
          critiqueText = currentCase.accurateSafeFeedback;
        }
      } else {
        // Actual SCAM case
        if (this.selectedVerdict === 'SCAM') {
          score = Math.min(100, Math.round(70 + (keywordCoverage * 30)));
          critiqueText = currentCase.accurateScamFeedback;
        } else {
          score = Math.max(30, Math.round(keywordCoverage * 35));
          critiqueText = currentCase.paranoidFeedback;
        }
      }

      const vulnDelta = score >= 70 ? -1.5 : (score >= 50 ? -0.5 : 1.5);

      if (btn) btn.disabled = false;
      if (labBox) labBox.style.display = 'none';

      if (score >= 65) {
        window.cyberAudio?.playSuccess();
        this.unlockNextCase();
      } else {
        window.cyberAudio?.playError();
      }

      // Record result
      window.authManager?.recordResult(
        score,
        vulnDelta,
        `ANALYZER [${currentCase.title}]`,
        `Vonis: ${this.selectedVerdict} | Skor Forensik: ${score}/100`,
        score >= 65 ? 'SECURED' : 'VULNERABLE',
        'deeplearn'
      );

      // Show Report Modal
      this.showOwlAIReportModal({
        score: score,
        isCorrect: isVerdictCorrect,
        userVerdict: this.selectedVerdict,
        actualVerdict: currentCase.actualVerdict,
        matchedKeywords: matched,
        critique: critiqueText,
        caseTitle: currentCase.title
      });
    }

    showOwlAIReportModal(report) {
      const modalBox = document.getElementById('modal-general-box');
      const modalContent = document.getElementById('modal-general-content');
      if (!modalBox || !modalContent) return;

      const isSuccess = report.score >= 65;
      const scoreColor = isSuccess ? 'var(--neon-green)' : 'var(--neon-red)';
      const hasNext = this.currentIndex + 1 < this.cases.length;

      modalContent.innerHTML = `
        <div style="padding: 10px; text-align: center;">
          <div style="display:flex; justify-content:center; margin-bottom: 8px;">
            ${getPixelDetectiveOwlSVG(84)}
          </div>

          <span class="cyber-tag ${isSuccess ? 'tag-green' : 'tag-red'}" style="font-size: 0.85rem; padding: 4px 14px; margin-bottom: 10px;">
            ${isSuccess ? 'ANALISIS FORENSIK TERVERIFIKASI' : 'EVALUASI FORENSIK PERLU DIPERBAIKI'}
          </span>

          <h2 style="font-size: 1.5rem; color: ${scoreColor}; margin: 8px 0;">
            Skor Akurasi Forensik: ${report.score} / 100
          </h2>

          <div style="display:flex; justify-content:center; gap: 14px; font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 16px;">
            <span>Vonis Anda: <strong style="color:var(--text-highlight);">${report.userVerdict === 'SCAM' ? 'PENIPUAN (SCAM)' : 'AMAN (SAFE)'}</strong></span>
            <span>Status Sebenarnya: <strong style="color:${report.actualVerdict === 'SCAM' ? 'var(--neon-red)' : 'var(--neon-green)'};">${report.actualVerdict === 'SCAM' ? 'PENIPUAN (SCAM)' : 'AMAN (SAFE)'}</strong></span>
          </div>

          <!-- Detective Owl Feedback Speech Bubble -->
          <div style="background: rgba(0, 243, 255, 0.06); border: 1px solid var(--border-cyan); border-radius: 8px; padding: 16px 20px; text-align: left; margin-bottom: 20px;">
            <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 6px;">
              <span style="font-size: 1.2rem;">🦉</span>
              <strong style="color: var(--neon-cyan); font-family: var(--font-display); font-size: 0.9rem;">
                CATATAN EVALUASI DETEKTIF BURUNG HANTU:
              </strong>
            </div>
            <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.6; margin: 0;">
              "${report.critique}"
            </p>
          </div>

          <!-- Matched Red Flag Keywords Pill Bar -->
          <div style="text-align: left; background: rgba(5,7,15,0.6); padding: 12px 16px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 20px;">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); margin-bottom: 6px;">
              KATA KUNCI ANALISIS TERDETEKSI SISTEM (${report.matchedKeywords.length}):
            </div>
            <div style="display:flex; gap: 6px; flex-wrap: wrap;">
              ${report.matchedKeywords.length > 0 ? report.matchedKeywords.map(k => `
                <span class="cyber-tag tag-green" style="font-size: 0.7rem;">✓ ${k}</span>
              `).join('') : '<span style="font-size: 0.75rem; color: var(--text-muted);">Tidak ada kata kunci kunci yang terdeteksi.</span>'}
            </div>
          </div>

          <!-- Navigation Actions -->
          <div style="display:flex; justify-content:center; gap: 12px; flex-wrap: wrap;">
            <button class="cyber-btn btn-ghost" onclick="document.getElementById('modal-general-box').classList.remove('active'); window.gameBriefing.returnToBriefing('deeplearn');">
              <span>📂</span> KEMBALI KE KATALOG
            </button>
            ${hasNext && isSuccess ? `
              <button class="cyber-btn" onclick="document.getElementById('modal-general-box').classList.remove('active'); window.moduleDeepLearning.startScenario(${this.currentIndex + 1});">
                <span>⚡</span> SKENARIO BERIKUTNYA ➔
              </button>
            ` : `
              <button class="cyber-btn" onclick="document.getElementById('modal-general-box').classList.remove('active'); window.moduleDeepLearning.resetScenarioState(); window.moduleDeepLearning.render();">
                <span>🔄</span> ULANGI SKENARIO INI
              </button>
            `}
          </div>

        </div>
      `;

      modalBox.classList.add('active');
    }
  }

  // Instantiate and bind globally
  window.moduleDeepLearning = new ModuleDeepLearning();
})();
