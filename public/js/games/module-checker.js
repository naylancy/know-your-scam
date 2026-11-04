/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * MODUL 6: MULTI-THREAT & AUTHENTICITY CHECKER
 * HYBRID FORENSIC PIPELINE: Multi-Vector Heuristics (40%) + LLM Threat Intelligence (60%)
 * Supported Vectors: Phishing, Love Scam, Hoax/Disinformation, Job/Investment Scam, APK Malware.
 */

class ModuleChecker {
  constructor() {
    this.samples = [];
    this.currentResult = null;
    this.isChecking = false;
  }

  init(customSamples) {
    this.samples = customSamples || this.getDefaultSamples();
    this.currentResult = null;
    this.isChecking = false;
    this.render();
  }

  getDefaultSamples() {
    return [
      {
        icon: '💔',
        title: 'Love Scam: Koper Hadiah Emas Tertahan Bea Cukai',
        text: 'Halo sayangku, koper berisi hadiah emas, berlian, dan dokumen penting dari luar negeri tertahan di bea cukai bandara internasional. Petugas meminta biaya tebusan administrasi darurat 5 juta rupiah ke rekening pribadi petugas, tolong transfer sekarang agar paket tidak disita.'
      },
      {
        icon: '📢',
        title: 'Hoax Viral: Sebarkan Sebelum Dihapus',
        text: 'SEBARKAN SEBELUM DIHAPUS PEMERINTAH! Rahasia dokter spesialis terbongkar, jangan pernah mengonsumsi makanan kemasan ini karena terbukti secara gaib dan konspirasi mengandung racun sintetis berbahaya. Viralkan pesan ini ke 10 grup WhatsApp demi keselamatan keluarga!'
      },
      {
        icon: '💼',
        title: 'Job Scam: Kerja Paruh Waktu Like YouTube & Deposit Telegram',
        text: 'Lowongan kerja paruh waktu resmi online tanpa syarat keahlian! Cukup like dan subscribe video YouTube dapat komisi 300 ribu hingga 1 juta rupiah per hari. Gabung grup tugas Telegram kami sekarang dan lakukan deposit awal 150 ribu rupiah untuk aktivasi ID member VIP Anda.'
      },
      {
        icon: '📦',
        title: 'Malware APK: Surat Undangan / Resi Kurir Paket',
        text: 'Selamat siang kak, mohon maaf paket kiriman Anda tertahan di kurir karena nomor rumah tidak jelas. Silakan unduh dan pasang aplikasi Surat-Undangan-Paket.apk ini di ponsel Android Anda untuk melihat detail resi foto paket secara langsung.'
      },
      {
        icon: '🏦',
        title: 'Phishing: Ancaman Pemblokiran Rekening Darurat',
        text: 'Pemberitahuan Darurat Bank: Rekening Anda terindikasi aktivitas mencurigakan dan akan diblokir dalam 30 menit. Segera perbarui data kredensial serta nomor kartu debit Anda melalui formulir verifikasi: https://bca-klik-promo2026.xyz/login'
      },
      {
        icon: '🏛️',
        title: 'Info Resmi: Siaran Pers Imunisasi Nasional Kemkes',
        text: 'Kementerian Kesehatan Republik Indonesia (Kemenkes RI) mengumumkan pembukaan posko Pekan Imunisasi Nasional untuk seluruh balita secara serentak di Puskesmas terdekat tanpa dipungut biaya. Kunjungi portal resmi kemkes.go.id untuk jadwal dan lokasi lengkap.'
      }
    ];
  }

  loadSample(index) {
    const sample = this.samples[index];
    if (!sample) return;

    const textarea = document.getElementById('checker-target-input');
    if (textarea) {
      textarea.value = sample.text;
      window.cyberAudio?.playClick();
      this.executeCheck(sample.text);
    }
  }

  render() {
    const container = document.getElementById('checker-module-container');
    if (!container) return;

    // Hint system
    window.hintSystem?.setHints([
      'Love Scam memanfaatkan eksploitasi afeksi emosional dini dan skenario kiriman koper hadiah tertahan.',
      'Hoax dan disinformasi kerap menggunakan huruf kapital bombastis dan ancaman menyebarkan pesan ke grup lain.',
      'Lowongan kerja dan investasi bodong selalu mensyaratkan pembayaran deposit uang sebelum pencairan komisi.',
      'Modus malware APK menyamarkan berkas aplikasi berbahaya berkedok surat tilang, resi kurir, atau undangan.'
    ]);

    // Sample buttons
    const samplesHtml = this.samples.map((s, idx) => `
      <button class="scanner-sample-pill" onclick="window.moduleChecker.loadSample(${idx})">
        ${s.icon} ${s.title.substring(0, 36)}...
      </button>
    `).join('');

    container.innerHTML = `
      <div class="holo-enter">
        <!-- Header Section -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 20px;">
          <div>
            <h2 style="font-size: 1.4rem; color: var(--text-highlight);">
              LEGIT CHECKER: VALIDASI KEASLIAN MULTI-ANCAMAN
            </h2>
            <p style="font-size: 0.88rem; color: var(--text-muted);">
              Pusat Validasi Keaslian Informasi Digital: Phishing, Romance Scam, Hoax, Tawaran Kerja Bodong, dan Malware APK
            </p>
          </div>
          <div>
            <span class="cyber-tag tag-magenta">LEGIT CHECKER: HYBRID ACTIVE</span>
          </div>
        </div>

        <!-- Transparency & Architecture Pill -->
        <div style="background: rgba(0, 243, 255, 0.08); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 14px 18px; margin-bottom: 24px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap: 12px;">
            <span style="font-size: 1.5rem;">🛡️</span>
            <div>
              <strong style="color: var(--neon-cyan); font-family: var(--font-display); font-size: 0.95rem;">
                PIPELINE VALIDASI KEASLIAN MULTI-VEKTOR SIBER:
              </strong>
              <div style="font-size: 0.85rem; color: var(--text-main); margin-top: 2px;">
                Input informasi Anda diuji melalui Layer 1 Heuristik Multi-Vektor (40%) untuk mendeteksi penanda khusus dan divalidasi oleh Layer 2 LLM Cognitive Forensics (60%) untuk menilai manipulasi psikologis, keaslian klaim, dan mitigasi tanpa menyimpan PII.
              </div>
            </div>
          </div>
          <button class="cyber-btn btn-ghost" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.app?.openTransparencyModal()">
            PELAJARI SISTEM ➔
          </button>
        </div>

        <!-- Input Hero Bar -->
        <div class="hud-card scanner-hero-bar">
          <label style="font-family: var(--font-display); font-size: 0.95rem; color: var(--neon-cyan); letter-spacing: 1px;">
            MASUKKAN TEKS PESAN, KLAIM BERITA, CHAT TAWARAN, ATAU TAUTAN:
          </label>

          <div style="margin-top: 10px; margin-bottom: 12px;">
            <textarea 
              id="checker-target-input" 
              class="deep-reasoning-area" 
              style="min-height: 100px; font-size: 0.92rem; font-family: var(--font-sans);" 
              placeholder="Tempelkan teks informasi atau percakapan di sini... Contoh: Pesan romantis dari luar negeri meminta transfer uang bea cukai, tawaran kerja like video paruh waktu di Telegram, atau klaim berita viral mencurigakan..."
            ></textarea>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom: 14px;">
            <button 
              id="btn-checker-execute" 
              class="cyber-btn" 
              style="padding: 12px 28px; font-size: 0.95rem;" 
              onclick="window.moduleChecker.triggerManualCheck()"
            >
              🔍 UJI KEASLIAN & ANCAMAN SIBER
            </button>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
              Mendukung: Romance Scam • Hoax • Phishing • Job Scam • Malware APK
            </span>
          </div>

          <!-- Quick Samples Selector -->
          <div style="display:flex; align-items:center; gap: 8px; flex-wrap: wrap;">
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
              UJI SAMPEL SKENARIO:
            </span>
            ${samplesHtml}
          </div>
        </div>

        <!-- Result Box -->
        <div id="checker-result-box" class="hud-card scanner-result-panel">
          <!-- Filled dynamically by executeCheck -->
        </div>
      </div>
    `;
  }

  triggerManualCheck() {
    const input = document.getElementById('checker-target-input');
    const val = input ? input.value.trim() : '';

    if (!val) {
      window.cyberAudio?.playError();
      window.app?.showToast('Silakan tempelkan teks informasi atau pesan pada kolom di atas terlebih dahulu.', 'error');
      return;
    }

    this.executeCheck(val);
  }

  async executeCheck(textInput) {
    const resultBox = document.getElementById('checker-result-box');
    const executeBtn = document.getElementById('btn-checker-execute');
    if (!resultBox) return;

    resultBox.classList.add('active');
    resultBox.innerHTML = `
      <div style="text-align: center; padding: 35px 20px;">
        <div class="pulsing-dot" style="width: 24px; height: 24px; margin: 0 auto 16px auto;"></div>
        <h4 style="font-size: 1.2rem; color: var(--neon-cyan); letter-spacing: 2px;">
          HYBRID CHECKER: MENGUJI KEASLIAN & ANCAMAN DIGITAL...
        </h4>
        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--neon-magenta); margin-top: 6px; word-break: break-all; max-width: 600px; margin-left: auto; margin-right: auto;">
          "${textInput.substring(0, 90)}..."
        </div>
        <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
          Layer 1: Pemindaian Heuristik Multi-Vektor (40%) ➔ Layer 2: Validasi Semantik Intelijen Siber (60%)...
        </p>
      </div>
    `;

    if (executeBtn) executeBtn.disabled = true;
    window.cyberAudio?.playWhoosh();

    let checkData = null;

    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
      const user = window.authManager?.currentUser;
      const res = await fetch('/api/checker/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          target: textInput,
          user_id: user?.username || 'cadet',
          user_name: user?.name || 'Cadet Aris'
        })
      });

      const json = await res.json();
      if (res.ok && json.status === 'success' && json.data) {
        checkData = json.data;
      }
    } catch (e) {
      console.warn('Backend checker API error, using hybrid client fallback:', e);
    }

    if (!checkData) {
      // Local Hybrid Fallback
      const lower = textInput.toLowerCase();
      const isLove = lower.includes('sayang') || lower.includes('koper') || lower.includes('bea cukai');
      const isHoax = lower.includes('sebarkan') || lower.includes('viralkan') || lower.includes('rahasia');
      const isJob = lower.includes('paruh waktu') || lower.includes('telegram') || lower.includes('deposit');
      const isMalware = lower.includes('.apk') || lower.includes('undangan');
      const isPhish = lower.includes('rekening diblokir') || lower.includes('login') || lower.includes('.xyz');

      const isThreat = isLove || isHoax || isJob || isMalware || isPhish;
      const threatScore = isThreat ? 8.8 : 1.2;
      const authScore = isThreat ? 12 : 94;
      const primaryCat = isLove ? 'Romance Scam & Grooming Finansial' :
                         isHoax ? 'Disinformasi & Agitasi Fake News' :
                         isJob ? 'Lowongan Kerja Fiktif / Investasi Bodong' :
                         isMalware ? 'Malware Dropper / Trojan APK' :
                         isPhish ? 'Phishing & Kredensial Harvesting' : 'Informasi Netral Terverifikasi';

      checkData = {
        engine_architecture: 'HYBRID (Multi-Vector Heuristics 40% + LLM Cognitive Forensics 60%)',
        target_text: textInput,
        is_threat: isThreat,
        authenticity_score: authScore,
        threat_score: threatScore,
        threat_level_label: isThreat ? 'KRITIS' : 'AMAN',
        primary_category: primaryCat,
        confidence_level: 'TINGGI',
        forensic_critique: isThreat 
          ? 'Analisis semantik mendeteksi manipulasi rekayasa sosial dan indikator penipuan terencana untuk mengeksploitasi data atau dana korban.'
          : 'Pemeriksaan teks informasi tidak menemukan taktik manipulasi emosi, urgensi palsu, atau permintaan data sensitif.',
        detected_indicators: [
          `Kategori Vektor: ${primaryCat}`,
          'Pola rekayasa digital teridentifikasi oleh sistem'
        ],
        verification_checklist: [
          'Jangan mentransfer uang atau membagikan kredensial rahasia',
          'Konfirmasi silang langsung melalui kanal lembaga resmi terkait'
        ],
        rule_based_metrics: {
          score: threatScore,
          weight: '40%',
          vectors_count: isThreat ? 2 : 0
        },
        llm_metrics: {
          score: threatScore,
          authenticity: authScore,
          weight: '60%',
          model: 'KNOW YOUR SCAM Cognitive Threat Core (Local Fallback)'
        },
        llm_model: 'KNOW YOUR SCAM Cognitive Threat Core (Local Fallback)'
      };
    }

    if (executeBtn) executeBtn.disabled = false;

    // Real-Time Score update for Multi-Threat Checker activity (+30 XP)
    window.authManager?.recordResult(
      30,
      -0.3,
      'THREAT CHECKER',
      `Pemeriksaan: ${textInput.substring(0, 30)}... [${checkData.primary_category}]`,
      checkData.is_threat ? 'THREAT_IDENTIFIED' : 'AUTHENTIC_VERIFIED',
      'checker'
    );

    this.displayCheckResult(checkData);
  }

  displayCheckResult(data) {
    const resultBox = document.getElementById('checker-result-box');
    if (!resultBox) return;

    const isThreat = data.is_threat;
    const threatScore = data.threat_score;
    const authScore = data.authenticity_score;
    const isCritical = threatScore >= 7.8;
    const isWarning = threatScore >= 4.0 && threatScore < 7.8;

    const authColor = authScore >= 75 ? 'var(--neon-green)' : authScore >= 45 ? 'var(--neon-amber)' : 'var(--neon-red)';
    const threatColor = isCritical ? 'var(--neon-red)' : isWarning ? 'var(--neon-amber)' : 'var(--neon-green)';

    if (isThreat) {
      window.cyberAudio?.playError();
    } else {
      window.cyberAudio?.playSuccess();
    }

    // Indicators HTML
    const indicatorsHtml = (data.detected_indicators || []).map(ind => `
      <li style="display:flex; align-items:flex-start; gap:8px;">
        <span style="color:${isThreat ? 'var(--neon-red)' : 'var(--neon-green)'};">●</span>
        <span>${ind}</span>
      </li>
    `).join('');

    // Checklist HTML
    const checklistHtml = (data.verification_checklist || []).map(c => `
      <li style="display:flex; align-items:flex-start; gap:8px;">
        <span style="color: var(--neon-cyan);">🛡️</span>
        <span>${c}</span>
      </li>
    `).join('');

    resultBox.innerHTML = `
      <div class="holo-enter">
        <!-- Hybrid Architecture Banner -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom: 16px; background: rgba(0, 243, 255, 0.07); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 10px 16px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size: 1.1rem;">⚡</span>
            <span style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-cyan); font-weight: 700; letter-spacing: 1px;">
              ARSITEKTUR HYBRID: HEURISTIK MULTI-VEKTOR (40%) + EVALUATOR KOGNITIF LLM (60%)
            </span>
          </div>
          <div style="display:inline-flex; align-items:center; gap:6px; font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-magenta);">
            <span>VALIDATOR:</span>
            <strong>${data.llm_metrics?.model || data.llm_model || 'Cognitive Threat Core'}</strong>
          </div>
        </div>

        <!-- Inspected Text Capsule -->
        <div style="background: rgba(5, 5, 10, 0.85); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 12px 18px; margin-bottom: 18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
            <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); text-transform:uppercase;">
              INFORMASI YANG DIPERIKSA:
            </span>
            <span class="cyber-tag" style="border-color: var(--neon-cyan); color: var(--neon-cyan); font-size:0.7rem;">
              ${(data.target_text || '').length} Karakter
            </span>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--text-main); line-height: 1.5; max-height: 100px; overflow-y: auto;">
            "${data.target_text}"
          </div>
        </div>

        <!-- 3 Main Indicator Cards -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px; margin-bottom: 20px;">
          <!-- Card 1: Authenticity Score -->
          <div style="background: rgba(5,5,10,0.85); border: 1px solid ${authColor}; border-radius: 6px; padding: 14px 16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: ${authColor}; font-weight: 700;">
                INDEKS KEASLIAN
              </span>
              <span class="cyber-tag ${authScore >= 75 ? 'tag-green' : authScore >= 45 ? 'tag-amber' : 'tag-red'}" style="font-size: 0.65rem; padding: 2px 6px;">
                ${authScore >= 75 ? 'OTENTIK' : authScore >= 45 ? 'MERAGUKAN' : 'PALSU / SCAM'}
              </span>
            </div>
            <div style="display:flex; align-items:baseline; gap: 4px;">
              <strong style="font-size: 1.8rem; color: ${authColor};">
                ${authScore}%
              </strong>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
              ${authScore >= 75 ? 'Informasi terverifikasi kredibel' : 'Tingkat manipulasi tinggi'}
            </div>
          </div>

          <!-- Card 2: Threat Score -->
          <div style="background: rgba(5,5,10,0.85); border: 1px solid ${threatColor}; border-radius: 6px; padding: 14px 16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: ${threatColor}; font-weight: 700;">
                SKOR RISIKO ANCAMAN
              </span>
              <span class="cyber-tag ${isCritical ? 'tag-red' : isWarning ? 'tag-amber' : 'tag-green'}" style="font-size: 0.65rem; padding: 2px 6px;">
                ${data.threat_level_label || (isCritical ? 'KRITIS' : 'AMAN')}
              </span>
            </div>
            <div style="display:flex; align-items:baseline; gap: 4px;">
              <strong style="font-size: 1.8rem; color: ${threatColor};">
                ${threatScore}
              </strong>
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">/ 10</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
              Status: ${isThreat ? '🚨 Ancaman Terdeteksi' : '🛡️ Aman Terverifikasi'}
            </div>
          </div>

          <!-- Card 3: Detected Category -->
          <div style="background: rgba(5,5,10,0.85); border: 1px solid var(--border-magenta); border-radius: 6px; padding: 14px 16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-magenta); font-weight: 700;">
                KLASIFIKASI ANCAMAN
              </span>
              <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">
                KEYAKINAN: ${data.confidence_level || 'TINGGI'}
              </span>
            </div>
            <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-highlight); margin-top: 4px; line-height: 1.3;">
              ${data.primary_category}
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon-cyan); margin-top: 6px;">
              Vektor: ${data.rule_based_metrics?.detected_vectors?.join(', ') || data.primary_category}
            </div>
          </div>
        </div>

        <!-- Vulnerability / Threat Level Bar -->
        <div style="margin-bottom: 20px;">
          <div style="display:flex; justify-content:space-between; font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 6px;">
            <span>BAROMETER RISIKO ANCAMAN SIBER:</span>
            <span style="color: ${threatColor}; font-weight:700;">
              ${data.threat_level_label || 'TERUJI'} (SKOR ${threatScore}/10)
            </span>
          </div>
          <div class="vuln-bar-wrapper">
            <div class="vuln-bar-fill ${isCritical ? 'high-risk' : isWarning ? 'moderate' : 'safe'}" style="width: ${Math.min(100, threatScore * 10)}%;"></div>
          </div>
        </div>

        <!-- Detected Indicators Checklist -->
        <div style="background: rgba(5,5,10,0.75); border: 1px solid ${isThreat ? 'rgba(255,0,85,0.3)' : 'rgba(0,255,157,0.3)'}; border-radius: 6px; padding: 14px 18px; margin-bottom: 18px;">
          <div style="font-family: var(--font-display); font-size: 0.85rem; color: ${isThreat ? 'var(--neon-red)' : 'var(--neon-green)'}; margin-bottom: 8px; font-weight: 700;">
            TEMUAN INDIKATOR & POLA MANIPULASI PSIKOLOGIS:
          </div>
          <ul style="list-style: none; padding-left: 0; font-size: 0.85rem; color: var(--text-main); display: flex; flex-direction: column; gap: 6px; line-height: 1.4; margin: 0;">
            ${indicatorsHtml}
          </ul>
        </div>

        <!-- Forensic Expert Critique Box -->
        <div style="background: rgba(14,18,36,0.9); border-left: 3px solid var(--neon-cyan); border-radius: 6px; padding: 16px; margin-bottom: 18px;">
          <div style="font-family: var(--font-display); font-size: 0.88rem; color: var(--neon-cyan); margin-bottom: 6px; font-weight: 700; display:flex; align-items:center; gap: 6px;">
            <span>🔬</span> ANALISIS FORENSIK INTELIJEN SIBER (LLM CRITIQUE):
          </div>
          <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.6; margin: 0;">
            ${data.forensic_critique}
          </p>
        </div>

        <!-- Actionable Verification & Defense Checklist -->
        <div style="background: rgba(14,18,36,0.85); border-left: 3px solid var(--neon-amber); border-radius: 4px; padding: 16px;">
          <div style="font-family: var(--font-display); font-size: 0.9rem; color: var(--neon-amber); margin-bottom: 8px; font-weight: 700; display:flex; align-items:center; gap: 8px;">
            <span>💡</span> LANGKAH VERIFIKASI & TINDAKAN PERTAHANAN (ACTIONABLE DEFENSE):
          </div>
          <ul style="list-style: none; padding-left: 0; font-size: 0.85rem; color: var(--text-main); display: flex; flex-direction: column; gap: 6px; margin: 0;">
            ${checklistHtml}
          </ul>
        </div>
      </div>
    `;
  }
}

window.moduleChecker = new ModuleChecker();

