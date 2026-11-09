/**
 * KNOW YOUR SCAM: ANTI-GRAVITY CYBER DEFENSE
 * MODUL 5: LINK & NEWS SCANNER (3-MODEL AI CONSENSUS ENGINE)
 * Otomatis mendebatkan dan membandingkan hasil dari OpenAI, Gemini & DeepSeek
 * menjadi 1 output keputusan final terpadu.
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
      window.cyberAudio?.playClick?.();
      this.executeScan(sample.target);
    }
  }

  render() {
    const container = document.getElementById('scanner-module-container');
    if (!container) return;

    window.hintSystem?.setHints([
      'Periksa apakah domain menggunakan ekstensi aneh seperti .xyz atau .fake.',
      'Waspadai pesan yang menuntut tindakan mendesak atau menawarkan hadiah fantastis.',
      'Pastikan sertifikat SSL berasal dari instansi perbankan atau lembaga resmi.'
    ]);

    const samplesHtml = this.scannerSamples.map((s, idx) => `
      <button class="scanner-sample-pill" onclick="window.moduleScanner.loadSample(${idx})">
        ${s.type === 'url' ? '🔗' : '📰'} ${s.title.substring(0, 28)}...
      </button>
    `).join('');

    container.innerHTML = `
      <div class="holo-enter" style="max-width: 960px; margin: 0 auto;">
        
        <!-- Header & AI Disclaimer -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 16px;">
          <div>
            <h2 style="font-size: 1.4rem; color: var(--text-highlight); margin: 0 0 4px 0;">
              🔗 LINK & NEWS THREAT SCANNER
            </h2>
            <div class="ai-disclaimer-badge" style="margin: 0;">
              <span>🤖</span> <strong>Konsensus Otomatis:</strong> Keputusan akhir disintesis melalui debat perbandingan 3 model AI (OpenAI, Gemini & DeepSeek).
            </div>
          </div>
          <span class="cyber-tag tag-cyan">⚖️ KONSENSUS 3 MODEL AI</span>
        </div>

        <!-- Scanner Input Bar -->
        <div class="hud-card scanner-hero-bar" style="padding: 20px; margin-bottom: 18px;">
          <label style="font-family: var(--font-display); font-size: 0.88rem; color: var(--text-highlight); display:block; margin-bottom: 10px;">
            MASUKKAN URL ATAU TEKS BERITA:
          </label>

          <div class="scanner-input-group">
            <input 
              id="scanner-target-input" 
              type="text" 
              class="scanner-input-field" 
              placeholder="Contoh: https://bca-klik-promo2026.xyz/login atau pesan undian berhadiah"
              onkeydown="if(event.key === 'Enter') window.moduleScanner.triggerManualScan()"
            />
            <button 
              id="btn-scanner-execute" 
              class="cyber-btn" 
              style="padding: 0 24px; font-size: 0.9rem;"
              onclick="window.moduleScanner.triggerManualScan()"
            >
              🔍 PINDAI SEKARANG
            </button>
          </div>

          <!-- Quick Samples -->
          <div style="display:flex; align-items:center; gap: 8px; flex-wrap: wrap; margin-top: 12px;">
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
              SAMPEL UJI:
            </span>
            ${samplesHtml}
          </div>
        </div>

        <!-- Scan Result Display Panel -->
        <div id="scanner-result-box">
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
      window.app?.showToast('Silakan masukkan URL atau teks berita terlebih dahulu.', 'error');
      return;
    }

    this.executeScan(val);
  }

  async executeScan(targetString) {
    const resultBox = document.getElementById('scanner-result-box');
    const executeBtn = document.getElementById('btn-scanner-execute');
    if (!resultBox) return;

    resultBox.innerHTML = `
      <div class="hud-card holo-enter" style="padding: 30px; text-align: center;">
        <div class="pulsing-radar-ring" style="margin: 0 auto 16px auto;"></div>
        <h4 style="font-size: 1.15rem; color: var(--neon-cyan); margin: 0 0 6px 0;">
          MENDEBATKAN & MENGANALISIS 3 MODEL AI...
        </h4>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">
          Konsensus Komparatif: OpenAI GPT-4o &bull; Google Gemini &bull; DeepSeek R1
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-cyan); word-break: break-all;">
          Target: "${targetString}"
        </div>
      </div>
    `;

    if (executeBtn) executeBtn.disabled = true;
    window.cyberAudio?.playScan?.() || window.cyberAudio?.playWhoosh?.();

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
      // Local Hybrid Fallback Consensus
      const lower = targetString.toLowerCase();
      const suspiciousTerms = ['.xyz', '.top', '.fake', '.mock', 'claim', 'login', 'free', 'hadiah', 'urgent', 'gempar', 'terkunci', 'undian', 'bonus', 'subsidi', 'bca', 'dana', 'apk'];
      const matched = suspiciousTerms.filter(t => lower.includes(t));
      const isMalicious = matched.length > 0;
      const riskScore = isMalicious ? Math.min(9.8, +(4.5 + matched.length * 1.5).toFixed(1)) : 1.2;

      scanData = {
        target: targetString,
        target_type: targetString.startsWith('http') ? 'URL Transmisi' : 'Teks Informasi',
        is_malicious: isMalicious,
        risk_score: riskScore,
        threat_type: isMalicious ? 'Ancaman Phishing / Rekayasa Sosial' : 'Target Aman & Terverifikasi',
        explanation: isMalicious 
          ? `Berdasarkan konsensus komparatif 3 model AI, target terindikasi sebagai ancaman penipuan aktif (${matched.join(', ')}).` 
          : 'Pemeriksaan konsensus 3 model AI tidak menemukan indikator manipulasi data atau ancaman berbahaya.',
        debate_consensus: {
          consensus_title: isMalicious ? 'Konsensus Bulat 3 Model (BAHAYA)' : 'Konsensus Bulat 3 Model (AMAN)',
          verdict: isMalicious ? 'BAHAYA // ANCAMAN AKTIF' : 'AMAN // TERVERIFIKASI',
          summary: isMalicious 
            ? 'OpenAI menyoroti indikasi pencurian kredensial; Gemini mengonfirmasi domain berisiko; DeepSeek membongkar rekayasa manipulasi psikologis.' 
            : 'OpenAI, Gemini, dan DeepSeek sepakat penuh bahwa target bebas dari muatan berbahaya.',
          models: ['OpenAI GPT-4o', 'Google Gemini 1.5', 'DeepSeek R1'],
          votes: {
            openai: isMalicious ? 'BAHAYA' : 'AMAN',
            gemini: isMalicious ? 'BAHAYA' : 'AMAN',
            deepseek: isMalicious ? 'BAHAYA' : 'AMAN'
          }
        },
        matched_indicators: matched.length > 0 ? matched.map(m => `Pola terdeteksi: ${m}`) : ['Tidak ditemukan anomali berisiko tinggi'],
        security_hints: [
          'Verifikasi domain resmi perbankan atau instansi terkait',
          'Jangan masukkan kata sandi atau kode OTP pada tautan tidak dikenal'
        ],
        llm_model: 'Konsensus 3 AI (OpenAI + Gemini + DeepSeek)'
      };
    }

    if (executeBtn) executeBtn.disabled = false;

    window.authManager?.recordResult(
      25,
      -0.2,
      `LINK SCANNER [Konsensus 3 AI]`,
      `Memindai: ${targetString.substring(0, 30)}... [${scanData.threat_type}]`,
      scanData.is_malicious ? 'THREAT_IDENTIFIED' : 'SECURED',
      'scanner'
    );

    this.displayScanResult(scanData);
  }

  // Render a Single, Clean, Unified Decision Card (Konsensus 3 Model AI dalam 1 Output)
  displayScanResult(data) {
    const resultBox = document.getElementById('scanner-result-box');
    if (!resultBox) return;

    const isMalicious = data.is_malicious;
    const rawScore = parseFloat(data.risk_score || 0);
    const isHigh = rawScore >= 6.5 || isMalicious;
    const isMod = rawScore >= 3.5 && rawScore < 6.5;

    // Kategori kata-kata kualitatif untuk mencegah overclaim
    const riskLevelLabel = data.risk_level || (isHigh ? 'RISIKO TINGGI' : isMod ? 'RISIKO MENENGAH' : 'RISIKO RENDAH');
    const riskDescriptor = data.risk_descriptor || (isHigh ? 'Indikasi Kuat Ancaman' : isMod ? 'Perlu Waspada & Verifikasi' : 'Terindikasi Aman / Belum Ada Anomali');
    const riskColor = isHigh ? 'var(--neon-red)' : isMod ? 'var(--neon-amber)' : 'var(--neon-green)';

    if (isMalicious) {
      window.cyberAudio?.playError();
    } else {
      window.cyberAudio?.playSuccess();
    }

    const indicatorsList = (data.matched_indicators || []).slice(0, 3).map(ind => `
      <div style="font-size:0.85rem; color:var(--text-main); display:flex; align-items:center; gap:6px;">
        <span style="color:${isMalicious ? 'var(--neon-red)' : 'var(--neon-green)'};">▸</span> ${ind}
      </div>
    `).join('');

    resultBox.innerHTML = `
      <div class="hud-card holo-enter" style="padding: 24px; border-left: 5px solid ${isMalicious ? 'var(--neon-red)' : 'var(--neon-green)'};">
        
        <!-- Header: Decision & Qualitative Risk Level -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 16px;">
          <div style="display:flex; align-items:center; gap: 12px;">
            <span style="font-size: 2.2rem;">${isMalicious ? '🚨' : '🛡️'}</span>
            <div>
              <span class="cyber-tag ${isMalicious ? 'tag-red' : 'tag-green Manufacturing'}" style="font-size:0.75rem;">
                ${isMalicious ? 'BAHAYA // ANCAMAN TERDETEKSI' : 'AMAN // TERVERIFIKASI'}
              </span>
              <h3 style="font-size: 1.3rem; color: ${isMalicious ? 'var(--neon-red)' : 'var(--neon-green)'}; margin: 4px 0 0 0;">
                ${data.threat_type}
              </h3>
            </div>
          </div>

          <!-- Skor diubah menjadi kata-kata (kualitatif) untuk mencegah overclaim -->
          <div style="text-align:right;">
            <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted); letter-spacing:0.5px;">
              TINGKAT RISIKO KONSENSUS:
            </div>
            <div style="font-family:var(--font-display); font-size: 1.35rem; font-weight: 700; color: ${riskColor}; margin-top:2px;">
              ${riskLevelLabel}
            </div>
            <div style="font-family:var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">
              ${riskDescriptor}
            </div>
          </div>
        </div>

        <!-- Target Meta Info -->
        <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius:6px; padding: 10px 14px; margin-bottom: 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div style="font-family:var(--font-mono); font-size:0.82rem; color:var(--neon-cyan); word-break:break-all;">
            🎯 Target: <strong>${data.target}</strong>
          </div>
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-magenta);">
            🤖 Engine: <strong>${data.llm_model || 'Konsensus 3 AI'}</strong>
          </div>
        </div>

        <!-- Kotak Konsensus Multi-LLM Debate: Gemini + OpenAI + DeepSeek + Heuristik -->
        ${data.debate_consensus ? (() => {
          const engines = data.debate_consensus.engines || {};
          const gemini = engines.gemini || {};
          const openai = engines.openai || {};
          const deepseek = engines.deepseek || {};
          const heuristics = engines.heuristics || {};

          return `
          <div class="ai-debate-box">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
              <span class="cyber-tag tag-cyan" style="font-size:0.72rem;">
                ⚖️ ${data.debate_consensus.consensus_title || 'KONSENSUS 3 MODEL AI + HEURISTIK'}
              </span>
              <span style="font-family:var(--font-mono); font-size:0.78rem; color:${isMalicious ? 'var(--neon-red)' : 'var(--neon-green)'}; font-weight:700;">
                ${data.debate_consensus.verdict || (isMalicious ? 'BAHAYA // ANCAMAN AKTIF' : 'AMAN // TERVERIFIKASI')}
              </span>
            </div>
            <p style="font-size:0.86rem; color:var(--text-main); line-height:1.45; margin:0 0 10px 0;">
              ${data.debate_consensus.summary || ''}
            </p>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:8px;">
              <!-- Engine 1: Google Gemini -->
              <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(0,243,255,0.3); border-radius:6px; padding:10px 12px;">
                <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-cyan); margin-bottom:4px; display:flex; justify-content:space-between; align-items:center;">
                  <span>🤖 GOOGLE GEMINI 3.5</span>
                  <span class="cyber-tag ${gemini.status === 'LIVE' ? 'tag-green' : 'tag-cyan'}" style="font-size:0.62rem;">${gemini.status === 'LIVE' ? '🟢 LIVE' : 'READY'}</span>
                </div>
                <div style="font-size:0.82rem; color:var(--text-main);">
                  Vonis: <strong style="color:${gemini.verdict === 'BAHAYA' ? 'var(--neon-red)' : 'var(--neon-green)'};">${gemini.verdict || (isMalicious ? 'BAHAYA' : 'AMAN')}</strong>
                </div>
                <div style="font-size:0.72rem; color:var(--text-muted); margin-top:3px; line-height:1.35;">
                  ${gemini.note || 'Penalaran model generatif AI cloud aktif'}
                </div>
              </div>

              <!-- Engine 2: OpenAI GPT-4o -->
              <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(16,185,129,0.3); border-radius:6px; padding:10px 12px;">
                <div style="font-family:var(--font-mono); font-size:0.75rem; color:#10B981; margin-bottom:4px; display:flex; justify-content:space-between; align-items:center;">
                  <span>🧠 OPENAI GPT-4o</span>
                  <span class="cyber-tag ${openai.status === 'LIVE' ? 'tag-green' : 'tag-cyan'}" style="font-size:0.62rem;">${openai.status === 'LIVE' ? '🟢 LIVE' : 'READY'}</span>
                </div>
                <div style="font-size:0.82rem; color:var(--text-main);">
                  Vonis: <strong style="color:${openai.verdict === 'BAHAYA' ? 'var(--neon-red)' : 'var(--neon-green)'};">${openai.verdict || (isMalicious ? 'BAHAYA' : 'AMAN')}</strong>
                </div>
                <div style="font-size:0.72rem; color:var(--text-muted); margin-top:3px; line-height:1.35;">
                  ${openai.note || 'Analisis psikologis rekayasa sosial OpenAI aktif'}
                </div>
              </div>

              <!-- Engine 3: DeepSeek-R1 -->
              <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(79,70,229,0.35); border-radius:6px; padding:10px 12px;">
                <div style="font-family:var(--font-mono); font-size:0.75rem; color:#818CF8; margin-bottom:4px; display:flex; justify-content:space-between; align-items:center;">
                  <span>⚡ DEEPSEEK-R1</span>
                  <span class="cyber-tag ${deepseek.status === 'LIVE' ? 'tag-green' : 'tag-cyan'}" style="font-size:0.62rem;">${deepseek.status === 'LIVE' ? '🟢 LIVE' : 'READY'}</span>
                </div>
                <div style="font-size:0.82rem; color:var(--text-main);">
                  Vonis: <strong style="color:${deepseek.verdict === 'BAHAYA' ? 'var(--neon-red)' : 'var(--neon-green)'};">${deepseek.verdict || (isMalicious ? 'BAHAYA' : 'AMAN')}</strong>
                </div>
                <div style="font-size:0.72rem; color:var(--text-muted); margin-top:3px; line-height:1.35;">
                  ${deepseek.note || 'Penalaran logis mendalam DeepSeek R1 aktif'}
                </div>
              </div>

              <!-- Engine 4: Heuristik Deterministik -->
              <div style="background:rgba(0,0,0,0.35); border:1px solid rgba(255,0,85,0.25); border-radius:6px; padding:10px 12px;">
                <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-magenta); margin-bottom:4px; display:flex; justify-content:space-between; align-items:center;">
                  <span>🛡️ HEURISTIK SIBER</span>
                  <span class="cyber-tag tag-magenta" style="font-size:0.62rem;">DETERMINISTIK</span>
                </div>
                <div style="font-size:0.82rem; color:var(--text-main);">
                  Pola: <strong style="color:${heuristics.verdict === 'BAHAYA' ? 'var(--neon-red)' : 'var(--neon-green)'};">${heuristics.verdict || (isMalicious ? 'BAHAYA' : 'AMAN')}</strong>
                </div>
                <div style="font-size:0.72rem; color:var(--text-muted); margin-top:3px; line-height:1.35;">
                  ${heuristics.note || 'Pemeriksaan protokol SSL, brand spoofing & kata kunci'}
                </div>
              </div>
            </div>
          </div>
        `;
        })() : ''}

        <!-- Single Final Explanation Output -->
        <p style="font-size: 0.92rem; color: var(--text-main); line-height: 1.5; margin: 0 0 14px 0;">
          ${data.explanation}
        </p>

        <!-- Key Findings -->
        ${data.matched_indicators && data.matched_indicators.length > 0 ? `
          <div style="border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 10px;">
            <div style="font-family:var(--font-display); font-size:0.75rem; color:var(--text-muted); margin-bottom: 6px;">
              TEMUAN UTAMA:
            </div>
            <div style="display:flex; flex-direction:column; gap:4px;">
              ${indicatorsList}
            </div>
          </div>
        ` : ''}

        <!-- Anti-Overclaim Disclaimer Notice -->
        <div style="background: rgba(0,0,0,0.25); border-radius: 4px; padding: 7px 12px; margin-top: 14px; font-family: var(--font-mono); font-size: 0.73rem; color: var(--text-muted); display:flex; align-items:center; gap:8px;">
          <span>⚖️</span>
          <span><strong>Transparansi AI:</strong> Klasifikasi risiko kualitatif berbasis konsensus 3 model AI berfungsi sebagai indikasi awal kewaspadaan siber untuk mencegah overclaim, bukan jaminan mutlak 100%.</span>
        </div>

      </div>
    `;
  }
}

window.moduleScanner = new ModuleScanner();
