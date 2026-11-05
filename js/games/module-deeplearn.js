/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * MODUL 4: DEEP LEARNING (LLM EVALUATOR & ZERO-DAY ADAPTATION)
 * HYBRID THREAT EVALUATION: RULE HEURISTICS (40%) + LLM SEMANTIC CORE (60%)
 * Features:
 * - Progressive scenario unlocking & catalog support
 * - Single-scenario dedicated forensic workspace
 * - Responsive Threat Level Selector Cards (Aman, Mencurigakan, Scam Kritis)
 * - LLM Cognitive Synthesis & Live Thinking Animation
 */

class ModuleDeepLearning {
  constructor() {
    this.cases = [];
    this.currentIndex = 0;
    this.selectedThreatLevel = null;
    this.aiWaveEngine = null;
  }

  init(casesData) {
    this.cases = casesData || [];
    this.currentIndex = 0;
    this.selectedThreatLevel = null;
    this.render();
  }

  getStorageKey() {
    const user = window.authManager?.currentUser;
    return user ? `knowyourscam_unlocked_deeplearn_${user.id || user.username}` : 'knowyourscam_unlocked_deeplearn_guest';
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
    return 0; // First scenario unlocked by default
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
      alert('Skenario analisis ini masih terkunci! Selesaikan skenario sebelumnya untuk membukanya.');
      return;
    }
    this.currentIndex = idx;
    this.selectedThreatLevel = null;
    if (window.gameBriefing) {
      window.gameBriefing.startGame('deeplearn');
    }
    this.render();
  }

  setCase(idx) {
    this.startScenario(idx);
  }

  selectThreat(level) {
    this.selectedThreatLevel = level;
    window.cyberAudio?.playClick();

    document.querySelectorAll('.deep-threat-card').forEach(card => {
      if (card.dataset.level === level) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
  }

  render() {
    const container = document.getElementById('deeplearn-module-container');
    if (!container) return;

    if (!this.cases || this.cases.length === 0) {
      container.innerHTML = `
        <div class="hud-card" style="text-align:center; padding: 40px;">
          <h3 style="color: var(--neon-cyan);">DATA SKENARIO DEEP LEARNING BELUM TERSEDIA</h3>
          <p style="color: var(--text-muted); margin-top: 10px;">Silakan periksa koneksi atau database aplikasi.</p>
        </div>
      `;
      return;
    }

    const current = this.cases[this.currentIndex];
    this.selectedThreatLevel = null;

    // Two-Page System: Page Start (Briefing & Tutorial) vs Page Game (Arena)
    const isPlaying = window.gameBriefing?.isPlaying('deeplearn');
    const startScreenHtml = window.gameBriefing?.renderStartScreenHTML('deeplearn') || '';
    const hudBarHtml = window.gameBriefing?.renderGameHUDBar('deeplearn') || '';

    // Hint system
    window.hintSystem?.setHints([
      'Identifikasi aset data yang diminta oleh transmisi ini (misal: private key, token, kredensial).',
      'Periksa apakah ada manipulasi psikologis batasan waktu (urgensi 30 menit) untuk memicu kepanikan.',
      'Jelaskan alasan Anda secara objektif dan mendalam agar evaluator LLM memberikan evaluasi maksimal.'
    ]);

    // Red flag indicators HTML
    const indicatorsHtml = (current.target_indicators || []).map(ind => `
      <li style="display:flex; align-items:flex-start; gap:8px;">
        <span style="color: var(--neon-red);">⚠️</span>
        <span>${ind}</span>
      </li>
    `).join('');

    container.innerHTML = `
      ${startScreenHtml}
      <div id="view-game-deeplearn" class="game-page-arena holo-enter" style="${isPlaying ? 'display:block;' : 'display:none;'}">
        ${hudBarHtml}

        <!-- Single Selected Scenario Header - NO Tab Switcher -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 20px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span class="cyber-tag tag-cyan" style="font-size: 0.82rem; letter-spacing: 0.5px;">
                🧠 SKENARIO ${this.currentIndex + 1} DARI ${this.cases.length}
              </span>
              <span class="cyber-tag tag-magenta">
                ENGINE: HYBRID LLM
              </span>
            </div>
            <h2 style="font-size: 1.35rem; color: var(--text-highlight); margin:0;">
              ${current.title}
            </h2>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">
            TINGKAT ANCAMAN TARGET: <strong style="color: var(--neon-cyan);">${current.threat_level || 'CRITICAL'}</strong>
          </div>
        </div>

        <!-- Transparent AI Processing Notification Banner -->
        <div style="background: rgba(0, 243, 255, 0.08); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 14px 18px; margin-bottom: 24px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap: 12px;">
            <span style="font-size: 1.5rem;">🤖</span>
            <div>
              <strong style="color: var(--neon-cyan); font-family: var(--font-display); font-size: 0.95rem;">
                TRANSPARANSI EVALUASI KOGNITIF HYBRID:
              </strong>
              <div style="font-size: 0.85rem; color: var(--text-main); margin-top: 2px;">
                Argumen kritis Anda diuji melalui Layer 1 Heuristik Teknis (40%) dan divalidasi oleh Layer 2 Model Bahasa LLM (60%) untuk mengukur pemahaman Zero-Trust Defense tanpa menyimpan data pribadi (PII).
              </div>
            </div>
          </div>
          <button class="cyber-btn btn-ghost" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.app?.openTransparencyModal()">
            PELAJARI SISTEM ➔
          </button>
        </div>

        <!-- Two Column Forensic Workspace -->
        <div class="deep-grid">
          <!-- Left Column: Scenario Dossier -->
          <div class="hud-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-magenta); letter-spacing: 2px;">
                // TRANSMISSION DOSSIER: ${current.id}
              </span>
              <span class="cyber-tag tag-amber" style="font-size: 0.75rem;">
                DIFFICULTY: HIGH
              </span>
            </div>

            <h3 style="font-size: 1.25rem; color: var(--text-highlight); margin-bottom: 12px;">
              ${current.title}
            </h3>

            <!-- Raw Intercept Box -->
            <div class="code-terminal" style="margin-bottom: 18px; max-height: 260px; overflow-y: auto;">
              <div class="terminal-header" style="color: var(--text-muted); font-size: 0.72rem; margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">
                [RAW INTERCEPTED PAYLOAD TRANSMISSION]
              </div>
              <div style="font-size: 0.85rem; line-height: 1.6; color: var(--text-main); white-space: pre-wrap; font-family: var(--font-mono);">
${current.scenario_text}
              </div>
            </div>

            <!-- Target Indicators to Watch -->
            <div style="background: rgba(5,5,10,0.6); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 14px;">
              <div style="font-family: var(--font-display); font-size: 0.82rem; color: var(--neon-cyan); margin-bottom: 8px; font-weight: 700;">
                INDIKATOR KRITIS DALAM TRANSMISI:
              </div>
              <ul style="list-style: none; padding-left: 0; font-size: 0.82rem; color: var(--text-muted); display:flex; flex-direction:column; gap:6px;">
                ${indicatorsHtml}
              </ul>
            </div>
          </div>

          <!-- Right Column: Interactive Evaluation Workspace -->
          <div class="hud-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-cyan); letter-spacing: 2px; margin-bottom: 10px;">
                // EVALUATION STEP 1: KLASIFIKASI TINGKAT ANCAMAN
              </div>

              <!-- Threat Level Selector Cards (Responsive Grid / Mobile Flow) -->
              <div class="deep-threat-selector">
                <div class="deep-threat-card card-safe" data-level="SAFE" onclick="window.moduleDeepLearning.selectThreat('SAFE')">
                  <div style="font-size: 1.5rem; margin-bottom: 4px;">🛡️</div>
                  <div>
                    <strong style="font-family: var(--font-display); font-size: 0.85rem; display: block;">AMAN / RESMI</strong>
                    <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">Komunikasi Autentik</div>
                  </div>
                </div>

                <div class="deep-threat-card card-suspicious" data-level="SUSPICIOUS" onclick="window.moduleDeepLearning.selectThreat('SUSPICIOUS')">
                  <div style="font-size: 1.5rem; margin-bottom: 4px;">⚠️</div>
                  <div>
                    <strong style="font-family: var(--font-display); font-size: 0.85rem; display: block;">MENCURIGAKAN</strong>
                    <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">Anomali Transmisi</div>
                  </div>
                </div>

                <div class="deep-threat-card card-critical" data-level="CRITICAL_SCAM" onclick="window.moduleDeepLearning.selectThreat('CRITICAL_SCAM')">
                  <div style="font-size: 1.5rem; margin-bottom: 4px;">🚨</div>
                  <div>
                    <strong style="font-family: var(--font-display); font-size: 0.85rem; display: block;">SCAM KRITIS</strong>
                    <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">Rekayasa Kredensial</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Critical Argumentation -->
            <div style="margin-top: 22px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
                <label style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-cyan); letter-spacing: 2px;">
                  // EVALUATION STEP 2: PENALARAN KRITIS FORENSIK
                </label>
                <span style="font-size: 0.72rem; color: var(--text-muted);">
                  Minimal 15 karakter
                </span>
              </div>

              <textarea 
                id="deep-reasoning-input" 
                class="deep-reasoning-area" 
                placeholder="Contoh: Saya mendeteksi bahwa pesan ini mencurigakan karena meminta file private key sertifikat SSL, menggunakan batasan waktu tergesa-gesa 30 menit, dan nama domain bukan milik otoritas korporat resmi..."
              ></textarea>

              <button 
                id="btn-submit-ai" 
                class="cyber-btn" 
                style="padding: 14px 24px; font-size: 1rem; width: 100%; margin-top: 14px;" 
                onclick="window.moduleDeepLearning.submitToAI()"
              >
                🧠 KIRIM KE HYBRID LLM EVALUATOR
              </button>

              <!-- Animated Cyber Wave & Thinking Nodes Canvas -->
              <div id="ai-thinking-box" class="ai-wave-container">
                <div style="position: absolute; top: 10px; left: 16px; font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-cyan); letter-spacing: 2px; z-index: 5;">
                  AI THINKING // HYBRID ENGINE SYNTHESIZING HEURISTICS & LLM SEMANTICS...
                </div>
                <canvas id="canvas-ai-wave"></canvas>
              </div>
            </div>
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
      window.app?.showToast('Tuliskan analisis minimal 15 karakter untuk evaluasi yang akurat!', 'error');
      return;
    }

    const btn = document.getElementById('btn-submit-ai');
    const thinkingBox = document.getElementById('ai-thinking-box');

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span>⏳</span> MENGANALISIS DENGAN HYBRID LLM...`;
    }
    if (thinkingBox) {
      thinkingBox.classList.add('active');
    }
    window.cyberAudio?.playWhoosh();

    const currentCase = this.cases[this.currentIndex];
    const user = window.authManager?.currentUser;

    let evaluationResult = null;

    try {
      const response = await fetch('/api/deeplearn/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          case_id: currentCase.id,
          threat_level: this.selectedThreatLevel,
          reasoning_text: reasoningText,
          user_id: user?.id || 'USR-ANON'
        })
      });

      const resData = await response.json();
      if (resData.status === 'success' && resData.data) {
        evaluationResult = resData.data;
      }
    } catch (e) {
      console.warn('Backend LLM endpoint unavailable, falling back to local Hybrid simulation:', e);
    }

    // Fallback simulation if backend fails
    if (!evaluationResult) {
      await new Promise(r => setTimeout(r, 1600));
      evaluationResult = this.simulateLocalHybridEvaluation(currentCase, this.selectedThreatLevel, reasoningText);
    }

    // Hide thinking animation
    if (thinkingBox) {
      thinkingBox.classList.remove('active');
    }
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `🧠 KIRIM KE HYBRID LLM EVALUATOR`;
    }

    const aiScore = evaluationResult.ai_score || 70;
    const vulnDelta = evaluationResult.vulnerability_impact || -1.0;

    if (aiScore >= 60) {
      window.cyberAudio?.playSuccess();
      // Unlock next scenario
      this.unlockNextCase();
    } else {
      window.cyberAudio?.playError();
    }

    // Update user stats (Live DeepLearn Game Tracking)
    window.authManager?.recordResult(
      aiScore,
      vulnDelta,
      'DEEP LEARNING (Hybrid LLM)',
      `Evaluasi ${currentCase.id}: ${evaluationResult.threat_verdict} | Skor Hybrid: ${aiScore}/100`,
      aiScore >= 65 ? 'SECURED' : 'PARTIAL_EVAL',
      'deeplearn'
    );

    // Show LLM Evaluation Modal
    this.showAIReportModal(evaluationResult, currentCase);
  }

  simulateLocalHybridEvaluation(currentCase, selectedLevel, text) {
    const isThreatLevelCorrect = (selectedLevel === currentCase.threat_level) || 
      (currentCase.threat_level === 'CRITICAL_SCAM' && selectedLevel === 'SUSPICIOUS');

    const lower = text.toLowerCase();
    const keywords = currentCase.min_keywords_required || ['private', 'key', 'urgensi', 'phishing', 'domain'];
    const matched = keywords.filter(k => lower.includes(k.toLowerCase()));
    const coverage = matched.length / keywords.length;

    const ruleScore = Math.min(100, Math.round((coverage * 60) + (text.length > 50 ? 40 : 20)));
    const llmScore = Math.min(100, Math.round((isThreatLevelCorrect ? 50 : 20) + (coverage * 40) + Math.min(10, text.length / 10)));
    const finalScore = Math.round((ruleScore * 0.4) + (llmScore * 0.6));

    const vulnImpact = finalScore >= 75 ? -1.5 : finalScore >= 55 ? -0.5 : 1.2;

    return {
      ai_score: finalScore,
      is_threat_level_correct: isThreatLevelCorrect,
      threat_verdict: isThreatLevelCorrect ? 'Klasifikasi Ancaman Akurat' : 'Klasifikasi Kurang Tepat',
      vulnerability_impact: vulnImpact,
      rule_based_metrics: {
        score: ruleScore,
        weight: '40%',
        matched_keywords: matched,
        keyword_coverage_pct: Math.round(coverage * 100)
      },
      llm_metrics: {
        score: llmScore,
        weight: '60%',
        model: 'Simulated Local LLM Core'
      },
      expert_critique: finalScore >= 70
        ? 'Penalaran kritis Anda mendalam dan komprehensif. Anda berhasil menangkap taktik manipulasi psikologis batas waktu serta upaya ekstraksi kredensial rahasia.'
        : 'Analisis Anda berada di jalur yang benar, namun perlu diperdalam dengan mengidentifikasi vektor pengiriman domain fiktif dan potensi kebocoran kunci enkripsi.',
      detected_strengths: [
        'Mengenali urgensi buatan dalam pesan',
        'Memahami bahaya membagikan data sensitif'
      ],
      missed_redflags: matched.length < keywords.length ? [
        'Pemeriksaan validitas domain pengirim (.net.fake)',
        'Sertifikat tanda tangan digital'
      ] : ['Tidak ada indikator fatal yang terlewat']
    };
  }

  showAIReportModal(evalData, currentCase) {
    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');
    if (!modalBox || !modalContent) return;

    const isCorrect = evalData.is_threat_level_correct;
    const score = evalData.ai_score;
    const scoreColor = score >= 75 ? 'var(--neon-green)' : score >= 50 ? 'var(--neon-amber)' : 'var(--neon-red)';
    const ruleMetrics = evalData.rule_based_metrics || { score: score, weight: '40%', matched_keywords: [] };
    const llmMetrics = evalData.llm_metrics || { score: score, weight: '60%', model: evalData.llm_model || 'LLM Core' };

    const hasNext = this.currentIndex + 1 < this.cases.length;
    const nextIdx = this.currentIndex + 1;

    modalContent.innerHTML = `
      <div style="padding: 10px;">
        <div style="text-align: center; margin-bottom: 16px;">
          <div style="font-size: 2.8rem; margin-bottom: 6px;">🧠</div>
          <h3 style="font-size: 1.35rem; color: var(--neon-cyan); letter-spacing: 1px; margin: 0;">
            LAPORAN EVALUASI HYBRID SIBER
          </h3>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">
            Sintesis Aturan Heuristik (40%) + Evaluator Kognitif LLM (60%)
          </p>
        </div>

        <!-- Hybrid Architecture Badge Banner -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom: 16px; background: rgba(0, 243, 255, 0.07); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 10px 16px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size: 1.1rem;">⚡</span>
            <span style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-cyan); font-weight: 700; letter-spacing: 1px;">
              ARSITEKTUR HYBRID AKTIF
            </span>
          </div>
          <div style="display:inline-flex; align-items:center; gap:6px; font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-magenta);">
            <span>EVALUATOR:</span>
            <strong>${llmMetrics.model || evalData.llm_model}</strong>
          </div>
        </div>

        <!-- 3 Metrics Breakdown Cards -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 18px;">
          <!-- Card 1: Rule-Based Heuristics -->
          <div style="background: rgba(5,5,10,0.85); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 12px 14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon-cyan); font-weight: 700;">
                LAYER 1: ATURAN DETERMINISTIK
              </span>
              <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted);">
                BOBOT 40%
              </span>
            </div>
            <div style="display:flex; align-items:baseline; gap: 4px;">
              <strong style="font-size: 1.5rem; color: ${(ruleMetrics.score || 0) >= 65 ? 'var(--neon-green)' : (ruleMetrics.score || 0) >= 40 ? 'var(--neon-amber)' : 'var(--neon-red)'};">
                ${ruleMetrics.score ?? '-'}
              </strong>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">/ 100</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
              Cakupan Kata Kunci: <strong>${ruleMetrics.keyword_coverage_pct ?? 0}%</strong>
            </div>
          </div>

          <!-- Card 2: LLM Cognitive Evaluator -->
          <div style="background: rgba(5,5,10,0.85); border: 1px solid var(--border-magenta); border-radius: 6px; padding: 12px 14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon-magenta); font-weight: 700;">
                LAYER 2: EVALUATOR LLM
              </span>
              <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted);">
                BOBOT 60%
              </span>
            </div>
            <div style="display:flex; align-items:baseline; gap: 4px;">
              <strong style="font-size: 1.5rem; color: ${(llmMetrics.score || 0) >= 65 ? 'var(--neon-green)' : (llmMetrics.score || 0) >= 40 ? 'var(--neon-amber)' : 'var(--neon-red)'};">
                ${llmMetrics.score ?? '-'}
              </strong>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">/ 100</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: ${isCorrect ? 'var(--neon-green)' : 'var(--neon-red)'}; margin-top: 4px;">
              ${isCorrect ? '✓ ' + evalData.threat_verdict : '✗ ' + evalData.threat_verdict}
            </div>
          </div>

          <!-- Card 3: Synthesized AI Score -->
          <div style="background: rgba(5,5,10,0.85); border: 1px solid ${scoreColor}; border-radius: 6px; padding: 12px 14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: ${scoreColor}; font-weight: 700;">
                SKOR HYBRID AKHIR
              </span>
              <span class="cyber-tag ${score >= 65 ? 'tag-green' : 'tag-amber'}" style="font-size: 0.65rem; padding: 2px 6px;">
                ${score >= 65 ? 'KOMPETEN' : 'PERLU EVALUASI'}
              </span>
            </div>
            <div style="display:flex; align-items:baseline; gap: 4px;">
              <strong style="font-size: 1.5rem; color: ${scoreColor};">
                ${score}
              </strong>
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">/ 100</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">
              Dampak: <strong style="color: ${evalData.vulnerability_impact <= 0 ? 'var(--neon-green)' : 'var(--neon-red)'};">${evalData.vulnerability_impact > 0 ? '+' : ''}${evalData.vulnerability_impact} VULN</strong>
            </div>
          </div>
        </div>

        <!-- Forensic Expert Critique Box -->
        <div style="background: rgba(14,18,36,0.9); border-left: 3px solid var(--neon-cyan); border-radius: 6px; padding: 16px; margin-bottom: 16px;">
          <div style="font-family: var(--font-display); font-size: 0.88rem; color: var(--neon-cyan); margin-bottom: 6px; font-weight: 700; display:flex; align-items:center; gap: 6px;">
            <span>🔬</span> ULASAN AHLI FORENSIK SIBER (LLM CRITIQUE):
          </div>
          <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.6; margin: 0;">
            ${evalData.expert_critique}
          </p>
        </div>

        <!-- Strengths & Missed Flags Grid -->
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <div style="background: rgba(5,5,10,0.7); border: 1px solid rgba(0,255,157,0.3); border-radius: 6px; padding: 12px;">
            <div style="font-size: 0.8rem; font-weight:700; color: var(--neon-green); margin-bottom: 6px;">
              ✓ KEKUATAN ANALISIS:
            </div>
            <ul style="list-style:none; padding:0; font-size:0.8rem; color: var(--text-muted); display:flex; flex-direction:column; gap:4px; margin: 0;">
              ${(evalData.detected_strengths || []).map(s => `<li>• ${s}</li>`).join('')}
            </ul>
          </div>

          <div style="background: rgba(5,5,10,0.7); border: 1px solid rgba(255,0,85,0.3); border-radius: 6px; padding: 12px;">
            <div style="font-size: 0.8rem; font-weight:700; color: var(--neon-red); margin-bottom: 6px;">
              ⚠️ INDIKATOR TERLEWAT / WASPADA:
            </div>
            <ul style="list-style:none; padding:0; font-size:0.8rem; color: var(--text-muted); display:flex; flex-direction:column; gap:4px; margin: 0;">
              ${(evalData.missed_redflags || []).map(m => `<li>• ${m}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div style="display:flex; justify-content:center; gap: 14px; flex-wrap: wrap;">
          ${hasNext ? `
            <button class="cyber-btn" onclick="window.moduleDeepLearning.finishCase(); window.moduleDeepLearning.startScenario(${nextIdx});">
              ⚡ LANJUT KE SKENARIO ${nextIdx + 1} ➔
            </button>
            <button class="cyber-btn btn-ghost" onclick="window.moduleDeepLearning.finishCase(); window.gameBriefing.returnToBriefing('deeplearn');">
              📂 KATALOG SKENARIO
            </button>
          ` : `
            <button class="cyber-btn" onclick="window.moduleDeepLearning.finishCase()">
              LANJUTKAN KE SKOR KERENTANAN ➔
            </button>
            <button class="cyber-btn btn-ghost" onclick="window.moduleDeepLearning.finishCase(); window.gameBriefing.returnToBriefing('deeplearn');">
              📂 KATALOG SKENARIO
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
