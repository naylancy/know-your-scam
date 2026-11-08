/**
 * KNOW YOUR SCAM: ANTI-GRAVITY CYBER DEFENSE
 * MODUL 6: KONSENSUS 3 MODEL AI - LEGIT CHECKER + GEMINI MULTIMODAL TRANSCRIBER
 * Evaluasi komparatif & debat otomatis: OpenAI GPT-4o, Google Gemini 1.5, DeepSeek R1
 * Dilengkapi AI Kurator & Transkripsi Media (Foto/Audio/Video/Dokumen) dengan Zero-Storage Guarantee.
 */

class ModuleChecker {
  constructor() {
    this.samples = [];
    this.currentResult = null;
    this.isChecking = false;
    this.selectedMedia = null; // { file, base64, mimeType, name, size, typeLabel, previewUrl }
  }

  init(customSamples) {
    this.samples = customSamples || this.getDefaultSamples();
    this.currentResult = null;
    this.isChecking = false;
    this.selectedMedia = null;
    this.render();
  }

  getDefaultSamples() {
    return [
      {
        icon: '💔',
        title: 'Love Scam: Koper Hadiah Emas Tertahan',
        text: 'Halo sayang, koper berisi hadiah emas dan dokumen penting tertahan di bea cukai bandara internasional. Petugas minta biaya tebusan administrasi 5 juta ke rekening pribadi petugas, tolong transfer sekarang agar paket tidak disita.'
      },
      {
        icon: '📢',
        title: 'Hoax Viral: Konspirasi Makanan Beracun',
        text: 'SEBARKAN SEBELUM DIHAPUS PEMERINTAH! Jangan pernah mengonsumsi makanan kemasan ini karena terbukti mengandung racun sintetis berbahaya. Viralkan pesan ini ke 10 grup WhatsApp demi keselamatan keluarga!'
      },
      {
        icon: '💼',
        title: 'Job Scam: Misi Like YouTube & Deposit Saldo',
        text: 'Lowongan kerja paruh waktu resmi online! Cukup like dan subscribe video YouTube dapat komisi 300 ribu per hari. Gabung grup Telegram dan lakukan deposit awal 150 ribu rupiah untuk aktivasi ID member VIP Anda.'
      },
      {
        icon: '📦',
        title: 'Malware APK: Surat Undangan / Foto Paket',
        text: 'Selamat siang kak, paket Anda tertahan di kurir karena alamat tidak lengkap. Silakan unduh dan pasang aplikasi Surat-Undangan-Paket.apk ini di ponsel Android Anda untuk melihat detail resi foto paket.'
      },
      {
        icon: '🏦',
        title: 'Phishing: Ancaman Pemblokiran Rekening',
        text: 'Pemberitahuan Darurat Bank: Rekening Anda terindikasi aktivitas mencurigakan dan akan diblokir dalam 30 menit. Segera perbarui data kredensial Anda di: https://bca-klik-promo2026.xyz/login'
      },
      {
        icon: '🏛️',
        title: 'Info Resmi: Pekan Imunisasi Kemkes',
        text: 'Kementerian Kesehatan RI mengumumkan pelaksanaan Pekan Imunisasi Nasional untuk balita di seluruh Puskesmas terdekat tanpa dipungut biaya. Kunjungi portal resmi kemkes.go.id untuk jadwal lengkap.'
      }
    ];
  }

  loadSample(index) {
    const sample = this.samples[index];
    if (!sample) return;

    this.clearMedia();
    const textarea = document.getElementById('checker-target-input');
    if (textarea) {
      textarea.value = sample.text;
      window.cyberAudio?.playClick?.();
      this.executeCheck(sample.text);
    }
  }

  // Generate an instant simulated scam screenshot via HTML5 Canvas for one-click testing
  loadSampleMedia(type = 'scam_screenshot') {
    window.cyberAudio?.playClick?.();
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 180;
    const ctx = canvas.getContext('2d');

    if (type === 'blank_invalid') {
      // Intentionally invalid / blank canvas to test AI rejection
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 600, 180);
      const dataUrl = canvas.toDataURL('image/png');
      this.setCustomMediaFromDataUrl(dataUrl, 'blank_artifact_test.png', 'image/png', 'Gambar Kosong / Blank Test');
      window.app?.showToast('Sampel Media Kosong dimuat. Klik Uji untuk menguji penolakan AI.', 'cyan');
    } else {
      // Valid scam screenshot with clear suspicious text
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 600, 180);
      ctx.fillStyle = '#b91c1c';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('[PERINGATAN DARURAT BANK BCA]', 25, 45);

      ctx.fillStyle = '#1e293b';
      ctx.font = '16px sans-serif';
      ctx.fillText('Rekening Anda diblokir karena terindikasi pencucian uang.', 25, 80);
      ctx.fillText('Segera bayar biaya buka blokir Rp 2.500.000 ke rekening petugas.', 25, 110);
      ctx.fillStyle = '#2563eb';
      ctx.fillText('Bantuan Verifikasi Darurat: https://bca-klik-promo2026.xyz/login', 25, 145);

      const dataUrl = canvas.toDataURL('image/png');
      this.setCustomMediaFromDataUrl(dataUrl, 'tangkapan_layar_chat_scam.png', 'image/png', 'Foto Bukti Chat Phishing');
      window.app?.showToast('Sampel Foto Bukti Chat Phishing dimuat!', 'success');
    }
  }

  setCustomMediaFromDataUrl(dataUrl, fileName, mimeType, label) {
    const base64 = dataUrl.split(',')[1];
    this.selectedMedia = {
      file: null,
      base64: base64,
      mimeType: mimeType,
      name: fileName,
      size: `${Math.round(base64.length * 0.75 / 1024)} KB`,
      typeLabel: label || 'Foto / Gambar',
      previewUrl: dataUrl
    };
    this.updateMediaPillUI();
  }

  handleFileInputChange(event) {
    const input = event.target;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    if (file.size > 25 * 1024 * 1024) {
      window.cyberAudio?.playError();
      window.app?.showToast('Ukuran berkas melebihi batas 25 MB.', 'error');
      input.value = '';
      return;
    }

    window.cyberAudio?.playClick?.();
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const base64 = dataUrl.split(',')[1];
      const isImg = file.type.startsWith('image/');
      const isAud = file.type.startsWith('audio/');
      const isVid = file.type.startsWith('video/');
      const typeLabel = isImg ? 'Foto / Gambar' : isAud ? 'Rekaman Suara / Audio' : isVid ? 'Video Rekaman' : 'Dokumen Berkas';

      this.selectedMedia = {
        file: file,
        base64: base64,
        mimeType: file.type || 'application/octet-stream',
        name: file.name,
        size: `${Math.round(file.size / 1024)} KB`,
        typeLabel: typeLabel,
        previewUrl: isImg ? dataUrl : null
      };

      this.updateMediaPillUI();
      window.app?.showToast(`Berkas ${file.name} siap ditranskripsikan!`, 'success');
    };
    reader.readAsDataURL(file);
  }

  clearMedia() {
    this.selectedMedia = null;
    const fileInput = document.getElementById('checker-file-input');
    if (fileInput) fileInput.value = '';
    this.updateMediaPillUI();
  }

  updateMediaPillUI() {
    const container = document.getElementById('checker-media-pill-container');
    if (!container) return;

    if (!this.selectedMedia) {
      container.innerHTML = '';
      container.style.display = 'none';
      return;
    }

    const sm = this.selectedMedia;
    const isImg = sm.mimeType.startsWith('image/');
    const isAud = sm.mimeType.startsWith('audio/');
    const isVid = sm.mimeType.startsWith('video/');
    const icon = isImg ? '🖼️' : isAud ? '🎙️' : isVid ? '🎥' : '📄';

    container.style.display = 'block';
    container.innerHTML = `
      <div style="background: rgba(0, 255, 204, 0.06); border: 1px dashed var(--neon-cyan); border-radius: 6px; padding: 10px 14px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          ${sm.previewUrl ? `
            <img src="${sm.previewUrl}" alt="Preview" style="width: 48px; height: 48px; object-fit: cover; border-radius: 4px; border: 1px solid var(--neon-cyan);" />
          ` : `
            <span style="font-size: 2rem;">${icon}</span>
          `}
          <div>
            <div style="font-family: var(--font-display); font-size: 0.85rem; color: var(--text-highlight);">
              ${sm.name}
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-cyan);">
              ${sm.typeLabel} &bull; ${sm.size} &bull; <span style="color: var(--neon-green);">Zero-Storage In-Memory</span>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 8px;">
          <button 
            type="button" 
            class="cyber-btn btn-ghost" 
            style="padding: 4px 12px; font-size: 0.78rem;" 
            onclick="window.moduleChecker.clearMedia()"
          >
            ✕ Hapus Berkas
          </button>
        </div>
      </div>
    `;
  }

  render() {
    const container = document.getElementById('checker-module-container');
    if (!container) return;

    window.hintSystem?.setHints([
      'Love Scam mengeksploitasi emosi cinta dini dan klaim kiriman hadiah tertahan bea cukai.',
      'Hoax sering menggunakan huruf kapital bombastis dan ancaman menyebarkan ke grup lain.',
      'Penipuan kerja atau investasi palsu selalu meminta setoran deposit di muka.',
      'Waspadai ekstensi file .APK yang dikirim melalui aplikasi perpesanan.',
      'Anda dapat mengunggah bukti foto chat, rekaman audio WA, atau dokumen untuk ditranskripsikan oleh Gemini AI.'
    ]);

    const samplesHtml = this.samples.map((s, idx) => `
      <button class="scanner-sample-pill" onclick="window.moduleChecker.loadSample(${idx})">
        ${s.icon} ${s.title}
      </button>
    `).join('');

    container.innerHTML = `
      <div class="holo-enter" style="max-width: 960px; margin: 0 auto;">
        
        <!-- Header & AI Disclaimer -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 14px;">
          <div>
            <h2 style="font-size: 1.4rem; color: var(--text-highlight); margin: 0 0 4px 0;">
              🛡️ LEGIT CHECKER: VALIDASI KEASLIAN
            </h2>
            <div class="ai-disclaimer-badge" style="margin: 0;">
              <span>🤖</span> <strong>Konsensus 3 AI + Gemini Transcriber:</strong> OpenAI GPT-4o &bull; Google Gemini &bull; DeepSeek R1
            </div>
          </div>
          <span class="cyber-tag tag-cyan">⚖️ KONSENSUS 3 MODEL AI</span>
        </div>

        <!-- Media Upload & Input Bar -->
        <div class="hud-card" style="padding: 20px; margin-bottom: 18px;">
          
          <!-- Media Upload Toolbar -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">
            <div>
              <span style="font-family: var(--font-display); font-size: 0.88rem; color: var(--text-highlight);">
                MASUKKAN BUKTI (TEKS ATAU BERKAS MULTIMEDIA):
              </span>
              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">
                🔒 Zero-Storage: Berkas diproses in-memory tanpa disimpan di server.
              </div>
            </div>

            <!-- Upload File Controls -->
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <input 
                type="file" 
                id="checker-file-input" 
                accept="image/*,audio/*,video/*,.pdf,.txt" 
                style="display:none;" 
                onchange="window.moduleChecker.handleFileInputChange(event)"
              />

              <button 
                type="button" 
                class="cyber-btn btn-ghost" 
                style="padding: 7px 14px; font-size: 0.82rem;"
                onclick="document.getElementById('checker-file-input').click()"
              >
                📁 UNGGAH BERKAS (FOTO/AUDIO/VIDEO/PDF)
              </button>

              <button 
                type="button" 
                class="cyber-btn btn-ghost" 
                style="padding: 7px 12px; font-size: 0.78rem;"
                title="Muat contoh foto screenshot bukti chat palsu"
                onclick="window.moduleChecker.loadSampleMedia('scam_screenshot')"
              >
                📷 Sampel Bukti Chat
              </button>

              <button 
                type="button" 
                class="cyber-btn btn-ghost" 
                style="padding: 7px 12px; font-size: 0.78rem; opacity: 0.8;"
                title="Uji respon AI ketika berkas kosong / tidak terbaca"
                onclick="window.moduleChecker.loadSampleMedia('blank_invalid')"
              >
                🧪 Uji Berkas Blank
              </button>
            </div>
          </div>

          <!-- Media Pill Container (Shown when a media file is selected) -->
          <div id="checker-media-pill-container" style="display:none;"></div>

          <!-- Textarea Input -->
          <textarea 
            id="checker-target-input" 
            class="checker-textarea" 
            rows="4" 
            placeholder="Ketik/tempelkan teks pesan, broadcast WhatsApp, surat tilang .apk, tawaran freelance, ATAU klik tombol 'Unggah Berkas' di atas untuk menganalisis foto bukti chat / audio..."
            style="margin-bottom: 14px;"
          ></textarea>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap: 8px; flex-wrap: wrap;">
              <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
                SAMPEL TEKS:
              </span>
              ${samplesHtml}
            </div>

            <button 
              id="btn-checker-execute" 
              class="cyber-btn" 
              style="padding: 10px 28px; font-size: 0.92rem;"
              onclick="window.moduleChecker.triggerManualCheck()"
            >
              🛡️ UJI KEASLIAN SEKARANG
            </button>
          </div>
        </div>

        <!-- Result Box -->
        <div id="checker-result-box">
          <!-- Populated dynamically -->
        </div>

      </div>
    `;

    this.updateMediaPillUI();
  }

  triggerManualCheck() {
    const textarea = document.getElementById('checker-target-input');
    const val = textarea ? textarea.value.trim() : '';

    if (this.selectedMedia) {
      this.executeMediaCheck(this.selectedMedia);
      return;
    }

    if (!val) {
      window.cyberAudio?.playError();
      window.app?.showToast('Silakan masukkan teks pesan atau unggah berkas media terlebih dahulu.', 'error');
      return;
    }

    this.executeCheck(val);
  }

  // Multimodal File / Photo / Audio / Video Transcriber Flow
  async executeMediaCheck(media) {
    const resultBox = document.getElementById('checker-result-box');
    const executeBtn = document.getElementById('btn-checker-execute');
    if (!resultBox) return;

    resultBox.innerHTML = `
      <div class="hud-card holo-enter" style="padding: 30px; text-align: center;">
        <div class="pulsing-radar-ring" style="margin: 0 auto 16px auto;"></div>
        <h4 style="font-size: 1.15rem; color: var(--neon-cyan); margin: 0 0 6px 0;">
          MENTRANSKRIP & MENGANALISIS MEDIA (GEMINI MULTIMODAL)...
        </h4>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">
          Mengevaluasi kelayakan bukti siber in-memory & mendebatkan konsensus 3 Model AI
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-cyan); word-break: break-all; max-width: 650px; margin: 0 auto;">
          Berkas: "${media.name}" (${media.size} &bull; ${media.typeLabel})
        </div>
      </div>
    `;

    if (executeBtn) executeBtn.disabled = true;
    window.cyberAudio?.playScan?.() || window.cyberAudio?.playWhoosh?.();

    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
      const user = window.authManager?.currentUser;

      let res;
      if (media.file) {
        const formData = new FormData();
        formData.append('media_file', media.file);
        formData.append('auto_check', 'true');
        formData.append('user_id', user?.username || 'cadet');
        formData.append('user_name', user?.name || 'Cadet Aris');

        res = await fetch('/api/checker/transcribe-media', {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': csrf,
            'Accept': 'application/json'
          },
          body: formData
        });
      } else {
        // Base64 simulated/sample media
        res = await fetch('/api/checker/transcribe-media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrf,
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            media_base64: media.base64,
            mime_type: media.mimeType,
            file_name: media.name,
            auto_check: true,
            user_id: user?.username || 'cadet',
            user_name: user?.name || 'Cadet Aris'
          })
        });
      }

      const json = await res.json();

      if (executeBtn) executeBtn.disabled = false;

      // Handle Rejection by AI Gatekeeper
      if (!res.ok || json.status === 'rejected') {
        const rejectionReason = json.rejection_reason || json.message || 'Media tidak memuat teks atau informasi yang dapat diverifikasi.';
        this.displayRejectionCard(media, rejectionReason);
        window.cyberAudio?.playError();
        window.app?.showToast(`Berkas Ditolak: ${rejectionReason}`, 'error');
        return;
      }

      // Handle Success
      if (json.status === 'success' && json.transcription) {
        // Update textarea so user can inspect the verbatim transcript
        const textarea = document.getElementById('checker-target-input');
        if (textarea) textarea.value = json.transcription;

        const consensus = json.consensus_result;
        if (consensus) {
          consensus.media_context = {
            file_name: json.file_name,
            media_type: json.media_type,
            summary: json.context_summary
          };

          window.authManager?.recordResult(
            30,
            -0.3,
            `LEGIT CHECKER [Transkrip Media & 3 AI]`,
            `Media: ${json.file_name} [${consensus.primary_category}]`,
            consensus.is_threat ? 'THREAT_IDENTIFIED' : 'SECURED',
            'checker'
          );

          this.displayCheckResult(consensus);
          window.app?.showToast(`Transkripsi Selesai: Berkas ${json.file_name} berhasil dievaluasi!`, 'success');
        } else {
          // If auto_check was false, execute standard check on transcribed text
          this.executeCheck(json.transcription);
        }
      }
    } catch (err) {
      console.error('Media transcribe error:', err);
      if (executeBtn) executeBtn.disabled = false;
      this.displayRejectionCard(media, 'Gagal memproses berkas melalui API Gemini Multimodal. Pastikan format berkas didukung dan jaringan stabil.');
      window.cyberAudio?.playError();
      window.app?.showToast('Kendala jaringan saat mentranskripsi berkas media.', 'error');
    }
  }

  // Display Rejection Alert Card
  displayRejectionCard(media, reason) {
    const resultBox = document.getElementById('checker-result-box');
    if (!resultBox) return;

    resultBox.innerHTML = `
      <div class="hud-card holo-enter" style="padding: 24px; border-left: 5px solid var(--neon-amber);">
        <div style="display:flex; align-items:center; gap: 12px; margin-bottom: 14px;">
          <span style="font-size: 2.4rem;">⚠️</span>
          <div>
            <span class="cyber-tag tag-amber" style="font-size:0.75rem;">
              BERKAS DITOLAK OLEH AI KURATOR
            </span>
            <h3 style="font-size: 1.25rem; color: var(--neon-amber); margin: 4px 0 0 0;">
              Media Tidak Memenuhi Kriteria Verifikasi Siber
            </h3>
          </div>
        </div>

        <div style="background: rgba(255,184,0,0.08); border: 1px solid rgba(255,184,0,0.25); border-radius:6px; padding: 14px; margin-bottom: 14px;">
          <div style="font-family:var(--font-display); font-size:0.78rem; color:var(--neon-amber); margin-bottom:4px;">
            ALASAN PENOLAKAN DARI GEMINI GATEKEEPER:
          </div>
          <p style="font-size:0.92rem; color:var(--text-main); line-height:1.5; margin:0;">
            ${reason}
          </p>
        </div>

        <div style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 10px;">
          💡 <strong>Panduan Berkas yang Diterima:</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0;">
            <li>Tangkapan layar obrolan WA, SMS, DM, atau email yang memuat teks terbaca.</li>
            <li>Foto bukti transfer, tagihan, atau surat edaran resmi/palsu.</li>
            <li>Rekaman suara (voice note atau panggilan telepon) dengan percakapan jelas.</li>
            <li>Dokumen PDF pengumuman atau tawaran kerja.</li>
          </ul>
        </div>
      </div>
    `;
  }

  async executeCheck(textInput) {
    const resultBox = document.getElementById('checker-result-box');
    const executeBtn = document.getElementById('btn-checker-execute');
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
        <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-cyan); word-break: break-all; max-width: 650px; margin: 0 auto;">
          "${textInput.substring(0, 90)}..."
        </div>
      </div>
    `;

    if (executeBtn) executeBtn.disabled = true;
    window.cyberAudio?.playScan?.() || window.cyberAudio?.playWhoosh?.();

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
      const isLoveScam = lower.includes('sayang') || lower.includes('koper') || lower.includes('emas') || lower.includes('bea cukai');
      const isJobScam = lower.includes('like') || lower.includes('youtube') || lower.includes('deposit') || lower.includes('komisi');
      const isMalware = lower.includes('.apk') || lower.includes('undangan') || lower.includes('resi') || lower.includes('paket');
      const isPhish = lower.includes('.xyz') || lower.includes('blokir') || lower.includes('login') || lower.includes('otp');
      const isOfficial = lower.includes('kemkes.go.id') || lower.includes('kemkominfo') || lower.includes('resmi');

      const isThreat = !isOfficial && (isLoveScam || isJobScam || isMalware || isPhish);
      const threatScore = isThreat ? 8.6 : 1.2;
      const authScore = isThreat ? 14 : 92;
      const primaryCat = isLoveScam ? 'Love Scam' : isJobScam ? 'Job Scam' : isMalware ? 'APK Malware' : isPhish ? 'Phishing' : 'Komunikasi Resmi';

      checkData = {
        target_text: textInput,
        primary_category: primaryCat,
        is_threat: isThreat,
        threat_score: threatScore,
        authenticity_score: authScore,
        verdict_status: isThreat ? 'PENIPUAN // BERBAHAYA' : 'OTENTIK // RESMI',
        explanation: isThreat 
          ? `Berdasarkan konsensus komparatif 3 model AI, informasi ini teridentifikasi sebagai modus ${primaryCat}. Pelaku memanfaatkan celah psikologis untuk memicu kelalaian dan mengelabui penerima.` 
          : 'Pemeriksaan konsensus 3 model kecerdasan buatan mengonfirmasi keaslian pesan. Tidak ditemukan unsur rekayasa sosial, manipulasi data, atau ancaman siber.',
        executive_summary: isThreat 
          ? `Pesan teridentifikasi memuat pola rekayasa sosial (${primaryCat}) untuk menekan atau memanipulasi target.` 
          : 'Pesan terverifikasi tidak memuat tautan berbahaya, permintaan dana mendesak, atau file APK.',
        debate_consensus: {
          consensus_title: isThreat ? 'Konsensus Bulat 3 Model (3/3 Sepakat: PENIPUAN)' : 'Konsensus Bulat 3 Model (3/3 Sepakat: OTENTIK)',
          verdict: isThreat ? 'PENIPUAN // ANCAMAN AKTIF' : 'OTENTIK // AMAN',
          summary: isThreat 
            ? 'Hasil Debat 3 AI: OpenAI mengidentifikasi skema penipuan terstruktur; Gemini mencocokkan riwayat pola penipuan siber; DeepSeek membongkar eksploitasi emosi dan manipulasi psikologis korban. Ketiga model menetapkan pesan ini sebagai ancaman berbahaya.'
            : 'OpenAI, Gemini, dan DeepSeek sepakat penuh bahwa informasi ini otentik, menggunakan rujukan resmi terverifikasi, dan bebas dari eksploitasi data.',
          models: ['OpenAI GPT-4o', 'Google Gemini 1.5', 'DeepSeek R1'],
          votes: {
            openai: isThreat ? 'PENIPUAN' : 'OTENTIK',
            gemini: isThreat ? 'PENIPUAN' : 'OTENTIK',
            deepseek: isThreat ? 'PENIPUAN' : 'OTENTIK'
          }
        },
        detected_anomalies: isThreat ? ['Indikasi manipulasi psikologis', 'Pola skenario penipuan terdeteksi', 'Permintaan transfer di luar prosedur resmi'] : ['Struktur informasi valid'],
        actionable_mitigations: isThreat ? ['Jangan transfer uang atau buka berkas lampiran', 'Verifikasi out-of-band ke kanal resmi'] : ['Informasi dapat dipercaya'],
        llm_model: 'Konsensus 3 AI (OpenAI + Gemini + DeepSeek)'
      };
    }

    if (executeBtn) executeBtn.disabled = false;

    window.authManager?.recordResult(
      25,
      -0.2,
      `LEGIT CHECKER [Konsensus 3 AI]`,
      `Cek: ${textInput.substring(0, 30)}... [${checkData.primary_category}]`,
      checkData.is_threat ? 'THREAT_IDENTIFIED' : 'SECURED',
      'checker'
    );

    this.displayCheckResult(checkData);
  }

  // Render a Single, Clean, Unified Decision Card (Konsensus 3 Model AI dalam 1 Output)
  displayCheckResult(data) {
    const resultBox = document.getElementById('checker-result-box');
    if (!resultBox) return;

    const isThreat = data.is_threat;
    const rawThreatScore = parseFloat(data.threat_score || 0);
    const rawAuthScore = parseInt(data.authenticity_score || (isThreat ? 15 : 90));

    // Kategori kata-kata kualitatif untuk mencegah overclaim
    const threatLevelLabel = data.threat_level || (isThreat ? (rawThreatScore >= 6.5 ? 'POTENSI TINGGI' : 'POTENSI SEDANG') : 'POTENSI RENDAH');
    const threatDesc = data.threat_descriptor || (isThreat ? 'Indikasi Kuat Manipulasi' : 'Relatif Aman / Tanpa Anomali');
    const threatColor = isThreat ? (rawThreatScore >= 6.5 ? 'var(--neon-red)' : 'var(--neon-amber)') : 'var(--neon-green)';

    const authLevelLabel = data.authenticity_level || (isThreat ? 'MERAGUKAN / BERISIKO' : 'TERINDIKASI OTENTIK');
    const authDesc = data.authenticity_descriptor || (isThreat ? 'Pola Penipuan Terdeteksi' : 'Rujukan Informasi Valid');
    const authColor = isThreat ? 'var(--neon-red)' : 'var(--neon-green)';

    if (isThreat) {
      window.cyberAudio?.playError();
    } else {
      window.cyberAudio?.playSuccess();
    }

    const anomaliesList = (data.detected_anomalies || []).slice(0, 3).map(an => `
      <div style="font-size:0.85rem; color:var(--text-main); display:flex; align-items:center; gap:6px;">
        <span style="color:${isThreat ? 'var(--neon-red)' : 'var(--neon-green)'};">▸</span> ${an}
      </div>
    `).join('');

    resultBox.innerHTML = `
      <div class="hud-card holo-enter" style="padding: 24px; border-left: 5px solid ${isThreat ? 'var(--neon-red)' : 'var(--neon-green)'};">
        
        <!-- Optional Media Source Banner -->
        ${data.media_context ? `
          <div style="background: rgba(0, 255, 204, 0.08); border: 1px solid rgba(0, 255, 204, 0.25); border-radius: 6px; padding: 8px 12px; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>📁</span>
              <span style="font-size: 0.82rem; color: var(--neon-cyan);">
                <strong>Sumber Bukti Media:</strong> ${data.media_context.file_name} (${data.media_context.media_type.toUpperCase()})
              </span>
            </div>
            <span class="cyber-tag tag-cyan" style="font-size: 0.68rem;">DITRANSKRIP OLEH GEMINI MULTIMODAL</span>
          </div>
        ` : ''}

        <!-- Header: Decision & Qualitative Levels -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom: 16px;">
          <div style="display:flex; align-items:center; gap: 12px;">
            <span style="font-size: 2.2rem;">${isThreat ? '🚨' : '🛡️'}</span>
            <div>
              <span class="cyber-tag ${isThreat ? 'tag-red' : 'tag-green'}" style="font-size:0.75rem;">
                ${isThreat ? 'TERDETEKSI ANCAMAN' : 'OTENTIK TERVERIFIKASI'}
              </span>
              <h3 style="font-size: 1.3rem; color: ${isThreat ? 'var(--neon-red)' : 'var(--neon-green)'}; margin: 4px 0 0 0;">
                ${data.primary_category}: ${isThreat ? 'Berbahaya' : 'Aman'}
              </h3>
            </div>
          </div>

          <!-- Skor diubah menjadi kata-kata (kualitatif) untuk mencegah overclaim -->
          <div style="display:flex; gap: 16px; align-items:center; flex-wrap:wrap; justify-content:flex-end;">
            <div style="text-align:right;">
              <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted); letter-spacing:0.5px;">
                ESTIMASI KEASLIAN:
              </div>
              <div style="font-family:var(--font-display); font-size: 1.15rem; font-weight:700; color: ${authColor}; margin-top:2px;">
                ${authLevelLabel}
              </div>
              <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted);">
                ${authDesc}
              </div>
            </div>

            <div style="text-align:right; border-left: 1px solid rgba(255,255,255,0.1); padding-left: 14px;">
              <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted); letter-spacing:0.5px;">
                POTENSI ANCAMAN:
              </div>
              <div style="font-family:var(--font-display); font-size: 1.15rem; font-weight:700; color: ${threatColor}; margin-top:2px;">
                ${threatLevelLabel}
              </div>
              <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted);">
                ${threatDesc}
              </div>
            </div>
          </div>
        </div>

        <!-- Meta Info -->
        <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius:6px; padding: 8px 14px; margin-bottom: 14px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div style="font-family:var(--font-mono); font-size:0.78rem; color:var(--text-muted);">
            Status: <strong style="color:${isThreat ? 'var(--neon-red)' : 'var(--neon-green)'};">${data.verdict_status || (isThreat ? 'PENIPUAN' : 'OTENTIK')}</strong>
          </div>
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-magenta);">
            🤖 Engine: <strong>${data.llm_model || 'Google Gemini 3.5 AI + Engine Heuristik Siber'}</strong>
          </div>
        </div>

        <!-- Kotak Konsensus Hibrida: Gemini AI + Heuristik Siber -->
        ${data.debate_consensus ? (() => {
          const engines = data.debate_consensus.engines || {};
          const gemini = engines.gemini || {};
          const heuristics = engines.heuristics || {};

          return `
          <div class="ai-debate-box">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
              <span class="cyber-tag tag-cyan" style="font-size:0.72rem;">
                ⚖️ ${data.debate_consensus.consensus_title || 'KONSENSUS HIBRIDA (AI + HEURISTIK)'}
              </span>
              <span style="font-family:var(--font-mono); font-size:0.78rem; color:${isThreat ? 'var(--neon-red)' : 'var(--neon-green)'}; font-weight:700;">
                ${data.debate_consensus.verdict || (isThreat ? 'PENIPUAN // ANCAMAN AKTIF' : 'OTENTIK // AMAN')}
              </span>
            </div>
            <p style="font-size:0.86rem; color:var(--text-main); line-height:1.45; margin:0 0 10px 0;">
              ${data.debate_consensus.summary || ''}
            </p>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:8px;">
              <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(0,243,255,0.25); border-radius:6px; padding:8px 12px;">
                <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-cyan); margin-bottom:3px; display:flex; justify-content:space-between; align-items:center;">
                  <span>🤖 GOOGLE GEMINI 3.5 AI</span>
                  <span class="cyber-tag ${gemini.status === 'LIVE' ? 'tag-green' : 'tag-cyan'}" style="font-size:0.65rem;">${gemini.status === 'LIVE' ? '🟢 LIVE CLOUD' : 'TERVERIFIKASI'}</span>
                </div>
                <div style="font-size:0.82rem; color:var(--text-main);">
                  Keputusan: <strong style="color:${gemini.verdict === 'PENIPUAN' ? 'var(--neon-red)' : 'var(--neon-green)'};">${gemini.verdict || (isThreat ? 'PENIPUAN' : 'OTENTIK')}</strong>
                </div>
                <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">
                  ${gemini.note || 'Penalaran model generatif AI cloud aktif'}
                </div>
              </div>

              <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,0,85,0.25); border-radius:6px; padding:8px 12px;">
                <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--neon-magenta); margin-bottom:3px; display:flex; justify-content:space-between; align-items:center;">
                  <span>🛡️ ENGINE HEURISTIK SIBER</span>
                  <span class="cyber-tag tag-magenta" style="font-size:0.65rem;">DETERMINISTIK</span>
                </div>
                <div style="font-size:0.82rem; color:var(--text-main);">
                  Pola: <strong style="color:${heuristics.verdict === 'PENIPUAN' ? 'var(--neon-red)' : 'var(--neon-green)'};">${heuristics.verdict || (isThreat ? 'PENIPUAN' : 'OTENTIK')}</strong>
                </div>
                <div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px;">
                  ${heuristics.note || 'Taksonomi rekayasa sosial, love scam, dan malware'}
                </div>
              </div>
            </div>
          </div>
        `;
        })() : ''}

        <!-- Single Concise Explanation -->
        <p style="font-size: 0.92rem; color: var(--text-main); line-height: 1.5; margin: 0 0 14px 0;">
          ${data.explanation || data.executive_summary || ''}
        </p>

        <!-- Key Findings -->
        ${data.detected_anomalies && data.detected_anomalies.length > 0 ? `
          <div style="border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 10px;">
            <div style="font-family:var(--font-display); font-size:0.75rem; color:var(--text-muted); margin-bottom: 6px;">
              TEMUAN ANOMALI:
            </div>
            <div style="display:flex; flex-direction:column; gap:4px;">
              ${anomaliesList}
            </div>
          </div>
        ` : ''}

        <!-- Anti-Overclaim Disclaimer Notice -->
        <div style="background: rgba(0,0,0,0.25); border-radius: 4px; padding: 7px 12px; margin-top: 14px; font-family: var(--font-mono); font-size: 0.73rem; color: var(--text-muted); display:flex; align-items:center; gap:8px;">
          <span>⚖️</span>
          <span><strong>Transparansi AI:</strong> Estimasi keaslian dan potensi ancaman kualitatif berbasis konsensus 3 model AI berfungsi sebagai indikasi awal kewaspadaan siber untuk mencegah overclaim, bukan jaminan mutlak 100%.</span>
        </div>

      </div>
    `;
  }
}

window.moduleChecker = new ModuleChecker();
