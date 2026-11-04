/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * MODUL 4: DEEP LEARNING (LLM Cybersecurity Threat Evaluation Engine)
 */

class ModuleDeepLearning {
  constructor() {
    this.cases = [];
    this.currentIndex = 0;
    this.selectedThreatLevel = null;
    this.aiWaveEngine = null;
    this.isEvaluating = false;
  }

  init(deepData) {
    this.cases = deepData || [];
    this.currentIndex = 0;
    this.selectedThreatLevel = null;
    this.isEvaluating = false;
    this.render();
  }

  setCase(idx) {
    this.currentIndex = idx;
    this.selectedThreatLevel = null;
    this.isEvaluating = false;
    this.render();
  }

  selectThreat(level) {
    this.selectedThreatLevel = level;
    window.cyberAudio?.playClick();
    this.render();
  }

  render() {
    const container = document.getElementById('deeplearn-module-container');
    if (!container) return;

    if (!this.cases || this.cases.length === 0) {
      container.innerHTML = `<div class="hud-card" style="padding: 30px; text-align: center;">Memuat materi evaluasi Deep Learning...</div>`;
      return;
    }

    const currentCase = this.cases[this.currentIndex];
    const isCustomCase = currentCase.is_custom;

    // Clues hints
    window.hintSystem?.setHints([
      'Identifikasi permintaan data privat yang tidak wajar (misalnya: file private key, izin token tak terbatas).',
      'Perhatikan taktik intimidasi batas waktu singkat atau penalti pemutusan akses.',
      'Sebutkan kata kunci teknis dalam argumen analisis Anda untuk memperoleh skor semantik AI maksimal.'
    ]);

    // Case Tabs
    const tabsHtml = this.cases.map((c, idx) => `
      <button class="cyber-btn ${this.currentIndex === idx ? '' : 'btn-ghost'}" style="font-size: 0.8rem; padding: 7px 14px;" onclick="window.moduleDeepLearning.setCase(${idx})">
        MATRIKS #${idx + 1} ${c.is_custom ? '⭐' : ''}
      </button>
    `).join('');

    container.innerHTML = `
      <div class="holo-enter">
        <!-- Sub Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 20px;">
          <div style="display:flex; gap: 8px; flex-wrap: wrap;">
            ${tabsHtml}
          </div>
          <div style="display:flex; gap: 8px; align-items: center;">
            ${isCustomCase ? `<span class="cyber-tag tag-magenta">⭐ KASUS KUSTOM ADMIN</span>` : ''}
            <span class="cyber-tag tag-magenta">EVALUASI SEMANTIK BERBASIS LLM</span>
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

        <!-- AI Transparency Notice Banner -->
        <div style="background: rgba(0, 243, 255, 0.08); border-left: 3px solid var(--neon-cyan); padding: 12px 18px; margin-bottom: 20px; border-radius: 4px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap: 10px;">
          <div style="display:flex; align-items:center; gap: 10px;">
            <span style="font-size: 1.3rem;">🧠</span>
            <span style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-highlight);">
              <strong>INTEGRASI LLM AKTIF:</strong> Argumen analisis Anda dievaluasi oleh Large Language Model (Gemini / Cognitive Neural Core) dengan verifikasi penalaran semantik mendalam.
            </span>
          </div>
          <span class="cyber-tag tag-green">AI CORE ONLINE</span>
        </div>

        <div class="deep-eval-grid">
          <!-- Left: Scenario Document Viewer -->
          <div class="hud-card deep-scenario-viewer">
            <span class="cyber-tag">${currentCase.id}</span>
            <h3 style="font-size: 1.3rem; color: var(--text-highlight); margin: 8px 0 16px 0;">
              ${currentCase.title}
            </h3>

            <div style="background: rgba(5,5,10,0.85); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 18px; font-family: var(--font-mono); font-size: 0.88rem; line-height: 1.7; color: var(--text-main); white-space: pre-wrap; margin-bottom: 16px;">${currentCase.scenario_text}</div>

            <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
              ℹ️ <em>Baca transmisi di atas secara teliti. Tentukan tingkat bahaya dan tuliskan analisis kritis Anda mengenai anomali yang ditemukan.</em>
            </div>
          </div>

          <!-- Right: User Assessment Workbench -->
          <div class="hud-card deep-ai-workbench">
            <h4 style="font-size: 1.05rem; color: var(--neon-cyan); letter-spacing: 1px;">
              LANGKAH 1: TENTUKAN TINGKAT BAHAYA ANCAMAN
            </h4>

            <div class="threat-rating-group">
              <div 
                class="threat-radio-card ${this.selectedThreatLevel === 'SAFE' ? 'active-safe' : ''}" 
                onclick="window.moduleDeepLearning.selectThreat('SAFE')"
              >
                <div style="font-size: 1.3rem;">🛡️</div>
                AMAN (LEGIT)
              </div>
              <div 
                class="threat-radio-card ${this.selectedThreatLevel === 'SUSPICIOUS' ? 'active-suspicious' : ''}" 
                onclick="window.moduleDeepLearning.selectThreat('SUSPICIOUS')"
              >
                <div style="font-size: 1.3rem;">⚠️</div>
                MENCURIGAKAN
              </div>
              <div 
                class="threat-radio-card ${this.selectedThreatLevel === 'CRITICAL_SCAM' ? 'active-critical' : ''}" 
                onclick="window.moduleDeepLearning.selectThreat('CRITICAL_SCAM')"
              >
                <div style="font-size: 1.3rem;">🚨</div>
                PENIPUAN KRITIS
              </div>
            </div>

            <h4 style="font-size: 1.05rem; color: var(--neon-magenta); letter-spacing: 1px; margin-top: 6px;">
              LANGKAH 2: TULISKAN ALASAN & ANALISIS KRITIS ANDA
            </h4>

            <textarea 
              id="deep-reasoning-input" 
              class="deep-reasoning-area" 
              placeholder="Contoh: Saya mendeteksi bahwa pesan ini mencurigakan karena meminta file private key sertifikat SSL, menggunakan batasan waktu tergesa-gesa 30 menit, dan nama domain bukan milik otoritas korporat resmi..."
            ></textarea>

            <button 
              id="btn-submit-ai" 
              class="cyber-btn" 
              style="padding: 14px 24px; font-size: 1rem;" 
              onclick="window.moduleDeepLearning.submitToAI()"
            >
              🧠 KIRIM KE LLM COGNITIVE EVALUATOR
            </button>

            <!-- Animated Cyber Wave & Thinking Nodes Canvas -->
            <div id="ai-thinking-box" class="ai-wave-container">
              <div style="position: absolute; top: 10px; left: 16px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-cyan); letter-spacing: 2px; z-index: 5;">
                AI THINKING // LLM NEURAL MATRIX EVALUATING REASONING...
              </div>
              <canvas id="canvas-ai-wave"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;

    // Rebind canvas engine if canvas exists
    setTimeout(() => {
      if (document.getElementById('canvas-ai-wave')) {
        this.aiWaveEngine = new window.AIWaveEngine('canvas-ai-wave');
      }
    }, 100);
  }

  async submitToAI() {
    const textarea = document.getElementById('deep-reasoning-input');
    const reasoningText = textarea ? textarea.value.trim() : '';

    if (!this.selectedThreatLevel) {
      window.cyberAudio?.playError();
      window.app?.showToast('Pilih tingkat bahaya ancaman terlebih dahulu pada Langkah 1!', 'error');
      return;
    }

    if (reasoningText.length < 15) {
      window.cyberAudio?.playError();
      window.app?.showToast('Tuliskan analisis alasan Anda secara lebih mendalam (minimal 15 karakter).', 'magenta');
      return;
    }

    // Activate thinking wave animation
    const thinkingBox = document.getElementById('ai-thinking-box');
    const submitBtn = document.getElementById('btn-submit-ai');
    if (thinkingBox) thinkingBox.classList.add('active');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '⏳ MENGHUBUNGI LLM COGNITIVE CORE...';
    }

    if (this.aiWaveEngine) {
      this.aiWaveEngine.start();
    }
    window.cyberAudio?.playWhoosh();

    const currentCase = this.cases[this.currentIndex];
    const user = window.authManager?.currentUser;

    let evaluationResult = null;

    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
      const response = await fetch('/api/deeplearn/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrf,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          scenario_id: currentCase.id,
          scenario_title: currentCase.title,
          scenario_text: currentCase.scenario_text,
          threat_level: this.selectedThreatLevel,
          user_reasoning: reasoningText,
          user_id: user?.username || 'cadet',
          user_name: user?.name || 'Cadet Aris'
        })
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success' && resJson.data) {
        evaluationResult = resJson.data;
      }
    } catch (e) {
      console.warn('API LLM evaluation fallback:', e);
    }

    // Fallback if network/API failed
    if (!evaluationResult) {
      const isCorrect = this.selectedThreatLevel === currentCase.threat_level;
      const lower = reasoningText.toLowerCase();
      const minKws = currentCase.min_keywords_required || ['private key', 'domain', 'urgensi'];
      const matched = minKws.filter(kw => lower.includes(kw));
      const score = Math.min(96, (isCorrect ? 50 : 20) + (matched.length * 15) + Math.min(15, Math.floor(reasoningText.length / 20)));

      evaluationResult = {
        ai_score: score,
        is_threat_level_correct: isCorrect,
        threat_verdict: isCorrect ? 'Klasifikasi Tepat' : 'Klasifikasi Kurang Tepat',
        expert_critique: isCorrect 
          ? 'Analisis Anda sangat tajam. Anda berhasil mengidentifikasi bahwa transmisi ini mengeksploitasi urgensi batas waktu dan menargetkan aset kredensial paling privat.' 
          : 'Tingkat ancaman yang Anda pilih kurang akurat. Skenario ini melibatkan red flag kritis yang berisiko tinggi terhadap keamanan sistem.',
        detected_strengths: [
          isCorrect ? 'Klasifikasi tingkat ancaman tepat' : 'Upaya identifikasi indikator',
          `Menemukan ${matched.length} kata kunci teknis`
        ],
        missed_redflags: currentCase.target_indicators ? currentCase.target_indicators.slice(0, 2) : ['Verifikasi integritas sertifikat'],
        vulnerability_impact: score >= 70 ? -1.4 : score >= 45 ? 0.3 : 1.8,
        llm_model: 'KNOW YOUR SCAM Cognitive LLM Core (Local Core)'
      };
    }

    // Stop thinking animation
    if (this.aiWaveEngine) this.aiWaveEngine.stop();
    if (thinkingBox) thinkingBox.classList.remove('active');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = '🧠 KIRIM KE LLM COGNITIVE EVALUATOR';
    }

    const aiScore = evaluationResult.ai_score || 70;
    const vulnDelta = evaluationResult.vulnerability_impact || -1.0;

    if (aiScore >= 60) {
      window.cyberAudio?.playSuccess();
    } else {
      window.cyberAudio?.playError();
    }

    // Update user stats
    window.authManager?.recordResult(
      aiScore,
      vulnDelta,
      'DEEP LEARNING (LLM Eval)',
      `Evaluasi ${currentCase.id}: ${evaluationResult.threat_verdict} | Skor AI: ${aiScore}/100`,
      aiScore >= 65 ? 'SECURED' : 'PARTIAL_EVAL'
    );

    // Show LLM Evaluation Modal
    this.showAIReportModal(evaluationResult, currentCase);
  }

  showAIReportModal(evalData, currentCase) {
    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');
    if (!modalBox || !modalContent) return;

    const isCorrect = evalData.is_threat_level_correct;
    const score = evalData.ai_score;
    const scoreColor = score >= 75 ? 'var(--neon-green)' : score >= 50 ? 'var(--neon-amber)' : 'var(--neon-red)';

    modalContent.innerHTML = `
      <div style="padding: 10px;">
        <div style="text-align: center; margin-bottom: 16px;">
          <div style="font-size: 3rem; margin-bottom: 8px;">🧠</div>
          <h3 style="font-size: 1.4rem; color: var(--neon-cyan); letter-spacing: 1px;">
            LAPORAN EVALUASI FORENSIK LLM COGNITIVE AI
          </h3>
          <div style="display: inline-flex; align-items:center; gap: 8px; margin-top: 6px; padding: 4px 12px; border-radius: 14px; background: rgba(0,243,255,0.1); border: 1px solid var(--border-cyan); font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-cyan);">
            <span>⚡ MODEL:</span>
            <strong>${evalData.llm_model}</strong>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px; font-family: var(--font-mono); font-size: 0.85rem;">
          <div style="background: rgba(5,5,10,0.8); border: 1px solid var(--border-cyan); padding: 14px; border-radius: 6px; text-align: center;">
            <div style="color: var(--text-muted); font-size: 0.75rem; margin-bottom: 4px;">SKOR ANALISIS KRITIS:</div>
            <strong style="color: ${scoreColor}; font-size: 1.8rem; line-height: 1;">
              ${score} / 100
            </strong>
          </div>
          <div style="background: rgba(5,5,10,0.8); border: 1px solid var(--border-magenta); padding: 14px; border-radius: 6px; text-align: center;">
            <div style="color: var(--text-muted); font-size: 0.75rem; margin-bottom: 4px;">VERIFIKASI TINGKAT ANCAMAN:</div>
            <strong style="color: ${isCorrect ? 'var(--neon-green)' : 'var(--neon-red)'}; font-size: 1.05rem; display: block; margin-top: 4px;">
              ${isCorrect ? '✓ ' + evalData.threat_verdict : '✗ ' + evalData.threat_verdict}
            </strong>
          </div>
        </div>

        <!-- Forensic Expert Critique Box -->
        <div style="background: rgba(14,18,36,0.9); border-left: 3px solid var(--neon-cyan); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
          <div style="font-family: var(--font-display); font-size: 0.88rem; color: var(--neon-cyan); margin-bottom: 6px; font-weight: 700; display:flex; align-items:center; gap: 6px;">
            <span>🔬</span> ULASAN AHLI FORENSIK SIBER (LLM CRITIQUE):
          </div>
          <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.6;">
            ${evalData.expert_critique}
          </p>
        </div>

        <!-- Strengths & Missed Flags Grid -->
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <div style="background: rgba(5,5,10,0.7); border: 1px solid rgba(0,255,157,0.3); border-radius: 6px; padding: 12px;">
            <div style="font-size: 0.8rem; font-weight:700; color: var(--neon-green); margin-bottom: 6px;">
              ✓ KEKUATAN ANALISIS:
            </div>
            <ul style="list-style:none; padding:0; font-size:0.8rem; color: var(--text-muted); display:flex; flex-direction:column; gap:4px;">
              ${(evalData.detected_strengths || []).map(s => `<li>• ${s}</li>`).join('')}
            </ul>
          </div>

          <div style="background: rgba(5,5,10,0.7); border: 1px solid rgba(255,0,85,0.3); border-radius: 6px; padding: 12px;">
            <div style="font-size: 0.8rem; font-weight:700; color: var(--neon-red); margin-bottom: 6px;">
              ⚠️ INDIKATOR TERLEWAT / WASPADA:
            </div>
            <ul style="list-style:none; padding:0; font-size:0.8rem; color: var(--text-muted); display:flex; flex-direction:column; gap:4px;">
              ${(evalData.missed_redflags || []).map(m => `<li>• ${m}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap: 14px;">
          <button class="cyber-btn" onclick="window.moduleDeepLearning.finishCase()">
            LANJUTKAN KE SKOR KERENTANAN ➔
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
      moduleTitle: 'DEEP LEARNING: Evaluasi Semantik LLM',
      scoreTitle: 'Tingkat Kerentanan Berdasarkan Penalaran Kritis',
      scoreValue: window.authManager?.currentUser?.vulnerability || 3.0,
      analysis: 'Pengukuran kecerdasan kognitif dalam menimbang red flag teknis, manipulasi batas waktu, dan ancaman kebocoran kredensial siber.',
      metrics: [
        { label: 'Ketepatan Deteksi Indikator Teknis', score: '88%' },
        { label: 'Resistensi Manipulasi Psikologis', score: '91%' },
        { label: 'Kedalaman Pemahaman Zero-Trust', score: '85%' }
      ]
    });
  }
}

window.moduleDeepLearning = new ModuleDeepLearning();
