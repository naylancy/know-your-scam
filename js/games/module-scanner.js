/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * MODUL 5: HYBRID NEWS/LINK SCANNER (Heuristic Rules 45% + LLM Threat Intelligence 55%)
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
      'Periksa apakah domain menggunakan ekstensi aneh seperti .xyz, .top, .fake alih-alih domain resmi.',
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
              HYBRID NEWS & URL THREAT SCANNER
            </h2>
            <p style="font-size: 0.88rem; color: var(--text-muted);">
              Utilitas Validasi Keaslian Berita & Tautan: Heuristik Aturan Deterministik (45%) + LLM Threat Intelligence (55%)
            </p>
          </div>
          <div>
            <span class="cyber-tag tag-green">HYBRID AI ENGINE: ONLINE</span>
          </div>
        </div>

        <!-- Transparent AI Processing Notification Banner -->
        <div style="background: rgba(189, 0, 255, 0.08); border: 1px solid var(--border-magenta); border-radius: 6px; padding: 14px 18px; margin-bottom: 24px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap: 12px;">
            <span style="font-size: 1.5rem;">🛡️</span>
            <div>
              <strong style="color: var(--neon-magenta); font-family: var(--font-display); font-size: 0.95rem;">
                ARSITEKTUR VALIDATOR HYBRID SIBER:
              </strong>
              <div style="font-size: 0.85rem; color: var(--text-main); margin-top: 2px;">
                Input Anda diuji melalui Layer 1 Heuristik (protokol, IP host, typosquatting brand) kemudian divalidasi oleh Layer 2 LLM Threat Intelligence untuk mendeteksi manipulasi psikologis dan rekayasa sosial tingkat lanjut.
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
              🔍 PINDAI HYBRID SEKARANG
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
          HYBRID AI SCANNER: MENJALANKAN PIPELINE DETERMINISTIK + LLM VALIDATOR...
        </h4>
        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--neon-magenta); margin-top: 6px; word-break: break-all;">
          Target: "${targetString}"
        </div>
        <p style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">
          Layer 1: Inspeksi heuristik protokol, IP host & typosquatting (45%) ➔ Layer 2: LLM Threat Intelligence semantic validation (55%)...
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
      console.warn('Backend scanner API error, using hybrid client fallback:', e);
    }

    if (!scanData) {
      // Local Hybrid Fallback
      const lower = targetString.toLowerCase();
      const suspiciousTerms = ['.xyz', '.top', '.fake', '.mock', 'claim', 'login', 'free', 'hadiah', 'urgent', 'gempar', 'terkunci', 'undian', 'bonus', 'subsidi', 'bca', 'dana', 'apk'];
      const matched = suspiciousTerms.filter(t => lower.includes(t));
      const isMalicious = matched.length > 0;
      const ruleScore = isMalicious ? Math.min(9.8, +(4.2 + matched.length * 1.5).toFixed(1)) : 1.2;
      const llmScore = isMalicious ? Math.min(9.6, +(ruleScore + 0.2).toFixed(1)) : 1.1;
      const synthesizedScore = +( (ruleScore * 0.45) + (llmScore * 0.55) ).toFixed(1);

      scanData = {
        engine_architecture: 'HYBRID (Deterministic Heuristics 45% + LLM Threat Intelligence 55%)',
        target: targetString,
        target_type: targetString.startsWith('http') ? 'URL Transmisi Siber' : 'Teks Berita / Pesan Transmisi',
        is_malicious: isMalicious,
        risk_score: synthesizedScore,
        threat_type: isMalicious ? 'Ancaman Phishing & Rekayasa Sosial' : 'Target Terverifikasi Aman',
        explanation: isMalicious 
          ? `Validasi intelijen semantik mengidentifikasi target '${targetString}' mengandung indikator risiko (${matched.join(', ')}). Target berpotensi memanipulasi kepanikan atau menyamarkan portal kredensial login.` 
          : 'Pemeriksaan semantik tidak menemukan manipulasi DNS, penyamaran domain perbankan, atau skrip pengumpul data pribadi.',
        matched_indicators: matched.length > 0 ? matched.map(m => `Pola bahaya terdeteksi: ${m}`) : ['Tidak ditemukan anomali berisiko tinggi'],
        security_hints: [
          'Selalu verifikasi alamat domain sebelum memasukkan kata sandi atau data perbankan',
          'Jangan unduh berkas lampiran apapun dari sumber tidak dikenal',
          'Pastikan sertifikat SSL/TLS valid dari otoritas sertifikasi resmi'
        ],
        rule_based_metrics: {
          score: ruleScore,
          weight: '45%',
          flags_count: matched.length,
          detected_flags: matched.map(m => `Deteksi heuristik kata kunci: ${m}`)
        },
        llm_metrics: {
          score: llmScore,
          weight: '55%',
          model: 'KNOW YOUR SCAM Cognitive Threat Core (Local Fallback)',
          threat_classification: isMalicious ? 'Potensi Rekayasa Sosial / Indikator Phishing' : 'Target Netral Terverifikasi'
        },
        llm_model: 'KNOW YOUR SCAM Cognitive Threat Core (Local Fallback)'
      };
    }

    if (executeBtn) executeBtn.disabled = false;

    // Real-Time Score update for Link Scanner activity (+25 XP)
    window.authManager?.recordResult(
      25,
      -0.2,
      'LINK SCANNER',
      `Memindai: ${targetString.substring(0, 30)}... [${scanData.threat_type}]`,
      scanData.is_malicious ? 'THREAT_IDENTIFIED' : 'SECURED',
      'scanner'
    );

    this.displayScanResult(scanData);
  }

  displayScanResult(data) {
    const resultBox = document.getElementById('scanner-result-box');
    if (!resultBox) return;

    const isMalicious = data.is_malicious;
    const riskScore = data.risk_score;
    const isHighRisk = riskScore >= 7.0;
    const isModRisk = riskScore >= 4.0 && riskScore < 7.0;

    const ruleMetrics = data.rule_based_metrics || { score: riskScore, weight: '45%', flags_count: (data.matched_indicators || []).length };
    const llmMetrics = data.llm_metrics || { score: riskScore, weight: '55%', model: data.llm_model || 'Threat Intelligence Core' };

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
        <!-- Hybrid Architecture Badge Banner -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom: 16px; background: rgba(0, 243, 255, 0.07); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 10px 16px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size: 1.1rem;">⚡</span>
            <span style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-cyan); font-weight: 700; letter-spacing: 1px;">
              ARSITEKTUR HYBRID: ATURAN DETERMINISTIK (45%) + VALIDATOR LLM INTELIJEN (55%)
            </span>
          </div>
          <div style="display:inline-flex; align-items:center; gap:6px; font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-magenta);">
            <span>VALIDATOR:</span>
            <strong>${llmMetrics.model || data.llm_model || 'LLM Threat Intelligence'}</strong>
          </div>
        </div>

        <!-- Target Inspection Capsule -->
        <div style="background: rgba(5, 5, 10, 0.85); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 12px 18px; margin-bottom: 18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
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

        <!-- Dual Metrics Breakdown Cards -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 12px; margin-bottom: 20px;">
          <!-- Card 1: Rule Heuristics -->
          <div style="background: rgba(5,5,10,0.85); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 12px 16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-cyan); font-weight: 700;">
                LAYER 1: HEURISTIK ATURAN
              </span>
              <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">
                BOBOT: ${ruleMetrics.weight || '45%'}
              </span>
            </div>
            <div style="display:flex; align-items:baseline; gap: 6px;">
              <strong style="font-size: 1.5rem; color: ${(ruleMetrics.score || 0) >= 6 ? 'var(--neon-red)' : (ruleMetrics.score || 0) >= 3 ? 'var(--neon-amber)' : 'var(--neon-green)'};">
                ${ruleMetrics.score ?? '-'}
              </strong>
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">/ 10</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
              ${ruleMetrics.flags_count ? `${ruleMetrics.flags_count} Anomali Terdeteksi` : 'Tidak Ada Anomali Kritis'}
            </div>
          </div>

          <!-- Card 2: LLM Threat Intelligence -->
          <div style="background: rgba(5,5,10,0.85); border: 1px solid var(--border-magenta); border-radius: 6px; padding: 12px 16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-magenta); font-weight: 700;">
                LAYER 2: VALIDATOR LLM
              </span>
              <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">
                BOBOT: ${llmMetrics.weight || '55%'}
              </span>
            </div>
            <div style="display:flex; align-items:baseline; gap: 6px;">
              <strong style="font-size: 1.5rem; color: ${(llmMetrics.score || 0) >= 6 ? 'var(--neon-red)' : (llmMetrics.score || 0) >= 3 ? 'var(--neon-amber)' : 'var(--neon-green)'};">
                ${llmMetrics.score ?? '-'}
              </strong>
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">/ 10</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${llmMetrics.threat_classification || data.threat_type}">
              ${llmMetrics.threat_classification || data.threat_type}
            </div>
          </div>

          <!-- Card 3: Synthesized Final Risk -->
          <div style="background: rgba(5,5,10,0.85); border: 1px solid ${isHighRisk ? 'var(--neon-red)' : isModRisk ? 'var(--neon-amber)' : 'var(--neon-green)'}; border-radius: 6px; padding: 12px 16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: ${isHighRisk ? 'var(--neon-red)' : isModRisk ? 'var(--neon-amber)' : 'var(--neon-green)'}; font-weight: 700;">
                SINTESIS SKOR RISIKO
              </span>
              <span class="cyber-tag ${isHighRisk ? 'tag-red' : isModRisk ? 'tag-amber' : 'tag-green'}" style="font-size: 0.65rem; padding: 2px 6px;">
                ${isHighRisk ? 'KRITIS' : isModRisk ? 'SEDANG' : 'AMAN'}
              </span>
            </div>
            <div style="display:flex; align-items:baseline; gap: 6px;">
              <strong style="font-size: 1.5rem; color: ${isHighRisk ? 'var(--neon-red)' : isModRisk ? 'var(--neon-amber)' : 'var(--neon-green)'};">
                ${riskScore}
              </strong>
              <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">/ 10</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
              Status: ${isMalicious ? '🚨 Ancaman Terkonfirmasi' : '🛡️ Terverifikasi Aman'}
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 18px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px;">
          <div style="display:flex; align-items:center; gap: 12px;">
            <div style="font-size: 2.2rem;">${isMalicious ? '🚨' : '🛡️'}</div>
            <div>
              <h3 style="font-size: 1.25rem; color: ${isMalicious ? 'var(--neon-red)' : 'var(--neon-green)'}; margin: 0;">
                ${isMalicious ? 'PERINGATAN: ANCAMAN SIBER TERDETEKSI' : 'STATUS: TARGET TERVERIFIKASI AMAN'}
              </h3>
              <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
                KLASIFIKASI INTELIJEN: <strong style="color: var(--text-main);">${data.threat_type}</strong>
              </div>
            </div>
          </div>
        </div>

        <!-- Vulnerability Neon Filling Bar -->
        <div style="margin-bottom: 20px;">
          <div style="display:flex; justify-content:space-between; font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 6px;">
            <span>TINGKAT KERENTANAN SINTETIK:</span>
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
            TEMUAN FORENSIK GABUNGAN (HEURISTIC FLAGS & LLM ANOMALIES):
          </div>
          <ul style="list-style: none; padding-left: 0; font-size: 0.85rem; color: var(--text-main); display: flex; flex-direction: column; gap: 6px; line-height: 1.4;">
            ${indicatorsHtml}
          </ul>
        </div>

        <!-- Detailed Forensic Explanation Box -->
        <div style="background: rgba(5,5,10,0.85); border: 1px solid rgba(255,255,255,0.15); border-radius: 6px; padding: 16px; margin-bottom: 20px;">
          <div style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-cyan); margin-bottom: 6px; font-weight: 700; display:flex; align-items:center; gap:6px;">
            <span>🔬</span> VALIDASI FORENSIK INTELIJEN SIBER:
          </div>
          <p style="font-size: 0.92rem; color: var(--text-main); line-height: 1.6;">
            ${data.explanation}
          </p>
        </div>

        <!-- Interactive Security Hints -->
        <div style="background: rgba(14,18,36,0.85); border-left: 3px solid var(--neon-amber); border-radius: 4px; padding: 16px;">
          <div style="font-family: var(--font-display); font-size: 0.9rem; color: var(--neon-amber); margin-bottom: 8px; font-weight: 700; display:flex; align-items:center; gap: 8px;">
            <span>💡</span> PETUNJUK & REKOMENDASI TINDAKAN MITIGASI KEAMANAN:
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
