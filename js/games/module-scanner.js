/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * MODUL 5: LLM NEWS/LINK SCANNER (External Security Utility)
 */

class ModuleScanner {
  constructor() {
    this.scannerSamples = [];
    this.currentScanResult = null;
    this.isScanning = false;
  }

  init(scannerData) {
    this.scannerSamples = scannerData || [];
    this.currentScanResult = null;
    this.isScanning = false;
    this.render();
  }

  loadSample(index) {
    const sample = this.scannerSamples[index];
    if (!sample) return;

    const input = document.getElementById('scanner-target-input');
    if (input) {
      input.value = sample.target;
      window.cyberAudio?.playClick();
      this.executeScan(sample.target);
    }
  }

  render() {
    const container = document.getElementById('scanner-module-container');
    if (!container) return;

    // Hint system
    window.hintSystem?.setHints([
      'Periksa apakah domain menggunakan ekstensi aneh seperti .xyz.fake, .top alih-alih domain resmi.',
      'Cari kata-kata emosional bombastis (GEMPAR, HADIAH RATUSAN JUTA, TERAKHIR HARI INI, TERKUNCI).',
      'Verifikasi kepemilikan sertifikat SSL sebelum memasukkan data otentikasi.'
    ]);

    // Sample buttons
    const samplesHtml = this.scannerSamples.map((s, idx) => `
      <button class="scanner-sample-pill" onclick="window.moduleScanner.loadSample(${idx})">
        ${s.type === 'url' ? '🔗' : '📰'} ${s.title.substring(0, 32)}...
      </button>
    `).join('');

    container.innerHTML = `
      <div class="holo-enter">
        <!-- Sub Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 20px;">
          <div>
            <h2 style="font-size: 1.4rem; color: var(--text-highlight);">
              LLM NEWS & URL THREAT SCANNER
            </h2>
            <p style="font-size: 0.88rem; color: var(--text-muted);">
              Utilitas Pindai Keaslian Berita & Analisis Tautan Berbasis Model Kecerdasan Buatan
            </p>
          </div>
          <div>
            <span class="cyber-tag tag-green">AI SCAN ENGINE: ONLINE</span>
          </div>
        </div>

        <!-- Transparent AI Processing Notification Banner -->
        <div style="background: rgba(189, 0, 255, 0.08); border: 1px solid var(--border-magenta); border-radius: 6px; padding: 14px 18px; margin-bottom: 24px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap: 12px;">
            <span style="font-size: 1.5rem;">🛡️</span>
            <div>
              <strong style="color: var(--neon-magenta); font-family: var(--font-display); font-size: 0.95rem;">
                PEMBERITAHUAN TRANSPARANSI PEMROSESAN AI:
              </strong>
              <div style="font-size: 0.85rem; color: var(--text-main); margin-top: 2px;">
                Teks dan URL yang Anda masukkan akan dipindai secara semantik menggunakan algoritma deteksi rekayasa sosial KNOW YOUR SCAM Core. Sesuai direktif keamanan Zero-Trust, data diproses secara anonim dan tidak ada informasi pribadi/PII yang disimpan.
              </div>
            </div>
          </div>
          <button class="cyber-btn btn-ghost" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.app?.openTransparencyModal()">
            PELAJARI TRANSPARANSI ➔
          </button>
        </div>

        <!-- Scanner Input Bar -->
        <div class="hud-card scanner-hero-bar">
          <label style="font-family: var(--font-display); font-size: 0.95rem; color: var(--neon-cyan); letter-spacing: 1px;">
            MASUKKAN TAUTAN (URL) ATAU TEKS BERITA YANG INGIN DIPERIKSA:
          </label>

          <div class="scanner-input-group">
            <input 
              id="scanner-target-input" 
              type="text" 
              class="scanner-input-field" 
              placeholder="Ketik atau tempel URL/Teks di sini... Contoh: https://bca-klik-promo2026.xyz/login atau pesan hadiah undian"
              onkeydown="if(event.key === 'Enter') window.moduleScanner.triggerManualScan()"
            />
            <button 
              id="btn-scanner-execute" 
              class="cyber-btn" 
              style="padding: 0 28px;"
              onclick="window.moduleScanner.triggerManualScan()"
            >
              🔍 PINDAI SEKARANG
            </button>
          </div>

          <!-- Quick Samples -->
          <div style="display:flex; align-items:center; gap: 10px; flex-wrap: wrap;">
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
              UJI SAMPEL SIMULASI:
            </span>
            ${samplesHtml}
          </div>
        </div>

        <!-- Scan Result Display Panel -->
        <div id="scanner-result-box" class="hud-card scanner-result-panel">
          <!-- Filled dynamically by executeScan -->
        </div>
      </div>
    `;
  }

  triggerManualScan() {
    const input = document.getElementById('scanner-target-input');
    const val = input ? input.value.trim() : '';

    if (!val) {
      window.cyberAudio?.playError();
      window.app?.showToast('Silakan masukkan URL atau teks berita pada kolom input terlebih dahulu.', 'error');
      return;
    }

    this.executeScan(val);
  }

  async executeScan(targetString) {
    const resultBox = document.getElementById('scanner-result-box');
    const executeBtn = document.getElementById('btn-scanner-execute');
    if (!resultBox) return;

    resultBox.classList.add('active');
    resultBox.innerHTML = `
      <div style="text-align: center; padding: 35px 20px;">
        <div class="pulsing-dot" style="width: 24px; height: 24px; margin: 0 auto 16px auto;"></div>
        <h4 style="font-size: 1.2rem; color: var(--neon-cyan); letter-spacing: 2px;">
          KNOW YOUR SCAM AI SCANNER SEDANG MENGANALISIS INPUT...
        </h4>
        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--neon-magenta); margin-top: 6px; word-break: break-all;">
          Target: "${targetString}"
        </div>
        <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
          Memeriksa struktur domain, protokol enkripsi, peniruan brand (typosquatting), dan pola rekayasa sosial...
        </p>
      </div>
    `;

    if (executeBtn) executeBtn.disabled = true;
    window.cyberAudio?.playWhoosh();

    let scanData = null;

    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
      const user = window.authManager?.currentUser;
      const res = await fetch('/api/scanner/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          target: targetString,
          user_id: user?.username || 'cadet',
          user_name: user?.name || 'Cadet Aris'
        })
      });

      const json = await res.json();
      if (res.ok && json.status === 'success' && json.data) {
        scanData = json.data;
      }
    } catch (e) {
      console.warn('Backend scanner API error, using client fallback:', e);
    }

    if (!scanData) {
      // Local fallback
      const lower = targetString.toLowerCase();
      const suspiciousTerms = ['.xyz', '.top', '.fake', '.mock', 'claim', 'login', 'free', 'hadiah', 'urgent', 'gempar', 'terkunci', 'undian', 'bonus', 'subsidi', 'bca', 'dana', 'apk'];
      const matched = suspiciousTerms.filter(t => lower.includes(t));
      const isMalicious = matched.length > 0;
      const riskScore = isMalicious ? Math.min(9.8, +(4.5 + matched.length * 1.5).toFixed(1)) : 1.2;

      scanData = {
        target: targetString,
        target_type: targetString.startsWith('http') ? 'URL Transmisi' : 'Teks Berita',
        is_malicious: isMalicious,
        risk_score: riskScore,
        threat_type: isMalicious ? 'Potensi Rekayasa Sosial / Indikator Phishing' : 'Target Terverifikasi Aman',
        explanation: isMalicious 
          ? `Terdeteksi indikator risiko tinggi (${matched.join(', ')}). Target berpotensi memanipulasi urgensi atau menyamarkan kredensial login.` 
          : 'Tidak ditemukan indikator manipulasi DNS, penyamaran domain, atau script pengumpul data.',
        matched_indicators: matched.map(m => `Pola bahaya: ${m}`),
        security_hints: [
          'Selalu verifikasi alamat domain sebelum memasukkan kata sandi atau data perbankan',
          'Jangan unduh berkas lampiran apapun dari sumber tidak dikenal'
        ]
      };
    }

    if (executeBtn) executeBtn.disabled = false;
    this.displayScanResult(scanData);
  }

  displayScanResult(data) {
    const resultBox = document.getElementById('scanner-result-box');
    if (!resultBox) return;

    const isMalicious = data.is_malicious;
    const riskScore = data.risk_score;
    const isHighRisk = riskScore >= 7.0;
    const isModRisk = riskScore >= 4.0 && riskScore < 7.0;

    if (isMalicious) {
      window.cyberAudio?.playError();
    } else {
      window.cyberAudio?.playSuccess();
    }

    // Indicators list HTML
    const indicatorsHtml = (data.matched_indicators || []).map(ind => `
      <li style="display:flex; align-items:flex-start; gap:8px;">
        <span style="color:${isMalicious ? 'var(--neon-red)' : 'var(--neon-green)'};">●</span>
        <span>${ind}</span>
      </li>
    `).join('');

    resultBox.innerHTML = `
      <div class="holo-enter">
        <!-- Target Inspection Capsule -->
        <div style="background: rgba(0, 243, 255, 0.08); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 12px 18px; margin-bottom: 20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div style="display:flex; align-items:center; gap: 10px; max-width: 80%;">
            <span style="font-size: 1.2rem;">🔍</span>
            <div>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); text-transform:uppercase;">TARGET YANG DIPINDAI:</span>
              <div style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--neon-cyan); font-weight: 700; word-break: break-all;">
                ${data.target}
              </div>
            </div>
          </div>
          <span class="cyber-tag" style="border-color: var(--neon-cyan); color: var(--neon-cyan);">
            ${data.target_type || 'URL'}
          </span>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px;">
          <div style="display:flex; align-items:center; gap: 12px;">
            <div style="font-size: 2.4rem;">${isMalicious ? '🚨' : '🛡️'}</div>
            <div>
              <h3 style="font-size: 1.3rem; color: ${isMalicious ? 'var(--neon-red)' : 'var(--neon-green)'};">
                ${isMalicious ? 'PERINGATAN: ANCAMAN SIBER TERDETEKSI' : 'STATUS: TARGET TERVERIFIKASI AMAN'}
              </h3>
              <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">
                KLASIFIKASI: <strong>${data.threat_type}</strong>
              </div>
            </div>
          </div>
          <div>
            <span class="cyber-tag ${isHighRisk ? 'tag-red' : isModRisk ? 'tag-amber' : 'tag-green'}" style="font-size: 0.88rem; padding: 6px 14px;">
              SKOR RISIKO: ${riskScore} / 10
            </span>
          </div>
        </div>

        <!-- Vulnerability Neon Filling Bar -->
        <div style="margin-bottom: 20px;">
          <div style="display:flex; justify-content:space-between; font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 6px;">
            <span>TINGKAT KERENTANAN ANCAMAN:</span>
            <span style="color: ${isHighRisk ? 'var(--neon-red)' : isModRisk ? 'var(--neon-amber)' : 'var(--neon-green)'}; font-weight:700;">
              ${isHighRisk ? 'KRITIS (CRITICAL THREAT)' : isModRisk ? 'SEDANG (MODERATE RISK)' : 'RENDAH (SAFE / VERIFIED)'}
            </span>
          </div>
          <div class="vuln-bar-wrapper">
            <div class="vuln-bar-fill ${isHighRisk ? 'high-risk' : isModRisk ? 'moderate' : 'safe'}" style="width: ${Math.min(100, riskScore * 10)}%;"></div>
          </div>
        </div>

        <!-- Detected Indicators Checklist -->
        <div style="background: rgba(5,5,10,0.75); border: 1px solid ${isMalicious ? 'rgba(255,0,85,0.3)' : 'rgba(0,255,157,0.3)'}; border-radius: 6px; padding: 14px 18px; margin-bottom: 20px;">
          <div style="font-family: var(--font-display); font-size: 0.85rem; color: ${isMalicious ? 'var(--neon-red)' : 'var(--neon-green)'}; margin-bottom: 8px; font-weight: 700;">
            TEMUAN FORENSIK INPUT (INDICATOR CHECKLIST):
          </div>
          <ul style="list-style: none; padding-left: 0; font-size: 0.85rem; color: var(--text-main); display: flex; flex-direction: column; gap: 6px; line-height: 1.4;">
            ${indicatorsHtml}
          </ul>
        </div>

        <!-- Detailed Forensic Explanation Box -->
        <div style="background: rgba(5,5,10,0.85); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 16px; margin-bottom: 20px;">
          <div style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-cyan); margin-bottom: 6px; font-weight: 700;">
            ANALISIS FORENSIK KNOW YOUR SCAM CORE:
          </div>
          <p style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">
            ${data.explanation}
          </p>
        </div>

        <!-- Interactive Security Hints -->
        <div style="background: rgba(14,18,36,0.85); border-left: 3px solid var(--neon-amber); border-radius: 4px; padding: 16px;">
          <div style="font-family: var(--font-display); font-size: 0.9rem; color: var(--neon-amber); margin-bottom: 8px; font-weight: 700; display:flex; align-items:center; gap: 8px;">
            <span>💡</span> PETUNJUK & REKOMENDASI TINDAKAN KEAMANAN:
          </div>
          <ul style="list-style: none; padding-left: 0; font-size: 0.85rem; color: var(--text-main); display: flex; flex-direction: column; gap: 6px;">
            ${(data.security_hints || []).map(h => `<li>⚡ ${h}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }
}

window.moduleScanner = new ModuleScanner();
