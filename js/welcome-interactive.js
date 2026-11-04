/**
 * KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
 * Welcome Page Interactive Account Testing & Menu Summary Inspector
 */

class WelcomeInteractive {
  constructor() {
    this.currentTestedRole = null;
    this.menuSummaries = {
      kasus: {
        id: 'kasus',
        title: 'MODUL 1: KASUS (MULTI-POV SIMULATION)',
        icon: '📜',
        category: 'Story-Based Multi-POV Simulation',
        difficulty: 'Menengah (Adaptive)',
        threats: ['Phishing Rekayasa Sosial', 'Love Scam Emosional', 'Advance-Fee Job Scam'],
        description: 'Simulasi percakapan narasi interaktif dengan terminal siber cerdas. Pemain dapat beralih antara Sudut Pandang Korban (merasakan kepanikan dan manipulasi psikologis batas waktu) dan Sudut Pandang Investigator Siber (menganalisis metadata header, domain fiktif, dan indikator anomali).',
        objectives: [
          'Mengenali ciri klasik manipulasi batas waktu tergesa-gesa',
          'Mendeteksi taktik grooming emosional pada penipuan asmara siber',
          'Menerapkan prinsip Zero Trust sebelum membagikan kredensial atau deposit biaya awal'
        ],
        accessRole: 'Tersedia untuk Akun User & Admin'
      },
      diff: {
        id: 'diff',
        title: 'MODUL 2: FINDING DIFF (JUDGE REAL VS FAKE)',
        icon: '⚖️',
        category: 'Side-by-Side Visual & Technical Inspection',
        difficulty: 'Tinggi',
        threats: ['Typosquatting Domain', 'Sertifikat SSL Palsu/Anonim', 'APK Malware Dropper'],
        description: 'Pemain bertindak sebagai Hakim Siber (Cyber Judge) untuk menginspeksi perbandingan dua skenario antarmuka berdampingan (Skenario A vs Skenario B). Dilengkapi fitur hover zoom-in lens untuk memeriksa alamat URL, keaslian sertifikat SSL/TLS, serta dua tombol kontrol neon raksasa ("REAL" vs "FAKE") di bagian bawah layar.',
        objectives: [
          'Membedakan top-level domain resmi (.mock) dengan domain tipuan (.fake/.xyz)',
          'Memeriksa integritas sertifikat keamanan Extended Validation vs sertifikat instan anonim',
          'Menilai anomali tata letak, tombol unduhan berbahaya, dan logo beresolusi rendah'
        ],
        accessRole: 'Tersedia untuk Akun User & Admin'
      },
      criminal: {
        id: 'criminal',
        title: 'MODUL 3: CRIMINAL CASE (FORENSIC PUZZLE)',
        icon: '🕵️',
        category: 'Daily Crime Puzzle & Drag-and-Drop Forensics',
        difficulty: 'Tinggi (Batas Waktu)',
        threats: ['Business Email Compromise (BEC)', 'Pig Butchering Syndicate', 'Fake Escrow Invoice'],
        description: 'Gim investigasi kriminal harian yang menantang pemain memilah bukti forensik digital dari laci bukti menggunakan elemen interaktif drag-and-drop. Pemain harus menyusun dakwaan ke 4 slot: Aktor Serangan, Vektor Serangan, Red Flag Kritis, dan Strategi Intervensi sebelum panic timer korban habis.',
        objectives: [
          'Menghubungkan rantai serangan (Cyber Kill Chain) dari log server relay',
          'Memilah bukti otentik dari kartu pengalih (distractor cards)',
          'Mengeksekusi intervensi mitigasi out-of-band tercepat sebelum korban rugi finansial'
        ],
        accessRole: 'Tersedia untuk Akun User & Admin'
      },
      deeplearn: {
        id: 'deeplearn',
        title: 'MODUL 4: DEEP LEARNING (AI THREAT EVALUATION)',
        icon: '🧠',
        category: 'Cognitive Semantic AI Analysis',
        difficulty: 'Pakar (Expert)',
        threats: ['Zero-Day Private Key Harvesting', 'Unlimited Allowance Web3 Drainer', 'Otorisasi Ilegal'],
        description: 'Evaluasi kasus di mana pengguna menentukan potensi ancaman serta merumuskan argumen analisis tertulis mendalam. Respons dikirim ke sistem Know Your Scam Neural Core yang menampilkan visualisasi animasi gelombang siber (Cyber Wave & AI Thinking Nodes Canvas) dan menghasilkan skor semantik AI.',
        objectives: [
          'Merumuskan penalaran kritis tertulis terhadap serangan Zero-Day canggih',
          'Mengidentifikasi celah kerentanan otorisasi kunci sesi dan smart contract drainer',
          'Memperoleh umpan balik semantik mendalam mengenai indikator yang berhasil terdeteksi'
        ],
        accessRole: 'Tersedia untuk Akun User & Admin'
      },
      scanner: {
        id: 'scanner',
        title: 'MODUL 5: LINK & NEWS SCANNER (UTILITY TOOL)',
        icon: '🔗',
        category: 'Heuristic Threat Scanner & Security Utility',
        difficulty: 'Alat Mandiri (Bantuan AI)',
        threats: ['URL Typosquatting', 'Clickbait Hoax News', 'Subdomain Spoofing'],
        description: 'Utilitas mandiri di luar game untuk memindai keabsahan tautan URL atau teks berita yang dicurigai. Dilengkapi indikator skor kerentanan neon berskala 1–10, banner transparansi AI Zero-PII, serta petunjuk keamanan interaktif dan contoh sampel uji coba siap pakai.',
        objectives: [
          'Memindai tautan mencurigakan secara cepat dengan mesin analisis heuristik siber',
          'Menerima rekomendasi mitigasi dan petunjuk keamanan interaktif',
          'Menguji sampel berita bohong dan URL phishing fiktif secara aman'
        ],
        accessRole: 'Tersedia untuk Semua Akun (User & Admin)'
      },
      leaderboard: {
        id: 'leaderboard',
        title: 'PAPAN PERINGKAT GLOBAL (LEADERBOARD)',
        icon: '🏆',
        category: 'Cyber Defense Rankings & Telemetry',
        difficulty: 'Informasional',
        threats: ['Evaluasi Ketahanan Siber Global'],
        description: 'Papan peringkat real-time yang memeringkat seluruh operator siber berdasarkan akumulasi skor XP pertahanan, jumlah misi yang diselesaikan, dan indeks kerentanan terendah (1–10). Dilengkapi medali emas, perak, dan perunggu serta filter kategori rank.',
        objectives: [
          'Memantau posisi peringkat siber Anda dibanding kadet lainnya',
          'Mengevaluasi tren penurunan skor kerentanan seiring penyelesaian misi',
          'Mencapai predikat Grand Cyber Sentinel melalui ketepatan analisis'
        ],
        accessRole: 'Tersedia untuk Semua Akun'
      },
      admin: {
        id: 'admin',
        title: 'PANEL KONTROL ADMINISTRATOR & TELEMETRI',
        icon: '🛡️',
        category: 'System Control & Real-Time Activity Telemetry',
        difficulty: 'Khusus Pengelola & Pembuat Game',
        threats: ['Manajemen Konten & Audit Keamanan Real-time'],
        description: 'Pusat kendali khusus administrator dan pengelola platform. Menyediakan antarmuka CRUD untuk memodifikasi atau menambah skenario kasus baru pada seluruh modul, serta dashboard tabel telemetri yang mencatat secara real-time jejak keputusan, waktu akses, dan skor kerentanan pemain.',
        objectives: [
          'Mengelola dan menambah skenario ancaman siber baru secara fleksibel',
          'Memantau aliran log aktivitas siber secara langsung (live telemetry stream)',
          'Mengekspor laporan audit telemetri berformat JSON untuk keperluan evaluasi'
        ],
        accessRole: 'Eksklusif Akun Administrator (Commander)'
      }
    };
  }

  // Interactive Account Testing Procedure (Verifies Profile & Sandi)
  async testAccount(role) {
    this.currentTestedRole = role;
    window.cyberAudio?.playAlert();

    const statusText = document.getElementById('test-terminal-status');
    const authBadge = document.getElementById('test-active-badge');
    const launchBtnGroup = document.getElementById('test-unlocked-launchers');

    if (statusText) {
      statusText.innerHTML = `
        <span style="color: var(--neon-cyan); animation: pulseDot 1s infinite;">
          [MEMVERIFIKASI KREDENSIAL & PROFIL ${role.toUpperCase()} (SANDI RESMI)...]
        </span>
      `;
    }

    // Step through interactive verification animation
    setTimeout(async () => {
      window.cyberAudio?.playWhoosh();
      if (statusText) {
        statusText.innerHTML = `
          <span style="color: var(--neon-magenta);">
            [MENCOCOKKAN ENKRIPSI HASH & MEMBUKA NAVIGASI MODUL...]
          </span>
        `;
      }

      setTimeout(async () => {
        const username = role === 'admin' ? 'admin' : 'cadet';
        const password = role === 'admin' ? 'admin123' : 'cadet123';

        await window.authManager?.loginWithCredentials(username, password);
        const user = window.authManager?.currentUser;

        if (user) {
          if (statusText) {
            statusText.innerHTML = `
              <strong style="color: var(--neon-green);">
                ✓ OTENTIKASI BERHASIL: AKSES ${role.toUpperCase()} (${user.name}) TERVERIFIKASI AKTIF! MENU MODUL DI ATAS TELAH TERBUKA.
              </strong>
            `;
          }

          if (authBadge) {
            authBadge.className = 'cyber-tag ' + (role === 'admin' ? 'tag-magenta' : 'tag-green');
            authBadge.textContent = `STATUS UJI: ${user.name} (${role.toUpperCase()}) AKTIF`;
          }

          // Show Unlocked Mission Launchers
          if (launchBtnGroup) {
            launchBtnGroup.style.display = 'flex';
            launchBtnGroup.innerHTML = role === 'admin' ? `
              <a href="#admin" class="cyber-btn btn-magenta" style="padding: 10px 22px; font-size: 0.9rem;">
                <span>🛡️</span> BUKA PANEL KONTROL ADMIN
              </a>
              <a href="#kasus" class="cyber-btn" style="padding: 10px 22px; font-size: 0.9rem;">
                <span>🚀</span> MULAI MISI GIM KASUS
              </a>
            ` : `
              <a href="#kasus" class="cyber-btn" style="padding: 10px 22px; font-size: 0.9rem;">
                <span>🚀</span> MULAI MISI GIM KASUS
              </a>
              <a href="#scanner" class="cyber-btn btn-magenta" style="padding: 10px 22px; font-size: 0.9rem;">
                <span>🔗</span> BUKA SCANNER BERITA & LINK
              </a>
            `;
          }

          this.updateTestedPod(role);
        }
      }, 600);
    }, 500);
  }

  updateTestedPod(role) {
    const podUser = document.getElementById('pod-test-user');
    const podAdmin = document.getElementById('pod-test-admin');
    const authBadge = document.getElementById('test-active-badge');
    const user = window.authManager?.currentUser;

    if (authBadge && user) {
      authBadge.className = 'cyber-tag ' + (user.role === 'admin' ? 'tag-magenta' : 'tag-green');
      authBadge.textContent = `STATUS: ${user.name} (${user.role.toUpperCase()}) AKTIF`;
    }

    if (podUser && podAdmin) {
      if (role === 'user' || user?.role === 'user') {
        podUser.style.borderColor = 'var(--neon-green)';
        podUser.style.boxShadow = '0 0 25px var(--neon-green-glow)';
        podAdmin.style.borderColor = 'rgba(255,255,255,0.15)';
        podAdmin.style.boxShadow = 'none';
      } else {
        podAdmin.style.borderColor = 'var(--neon-magenta)';
        podAdmin.style.boxShadow = '0 0 25px var(--neon-magenta-glow)';
        podUser.style.borderColor = 'rgba(255,255,255,0.15)';
        podUser.style.boxShadow = 'none';
      }
    }
  }

  resetTestedPod() {
    const podUser = document.getElementById('pod-test-user');
    const podAdmin = document.getElementById('pod-test-admin');
    const authBadge = document.getElementById('test-active-badge');
    const statusText = document.getElementById('test-terminal-status');
    const launchBtnGroup = document.getElementById('test-unlocked-launchers');

    if (authBadge) {
      authBadge.className = 'cyber-tag tag-amber';
      authBadge.textContent = 'STATUS: BELUM LOGIN (MODE TAMU)';
    }

    if (statusText) {
      statusText.innerHTML = `
        <span style="color: var(--neon-cyan);">
          ⚡ MODE TAMU: Pilih salah satu akun uji coba di bawah untuk membuka menu navigasi di atas.
        </span>
      `;
    }

    if (launchBtnGroup) {
      launchBtnGroup.innerHTML = `
        <button class="cyber-btn" onclick="window.authManager.openLoginModal()" style="padding: 8px 18px; font-size: 0.85rem;">
          <span>🔑</span> MASUK DENGAN AKUN UJI COBA
        </button>
      `;
    }

    if (podUser) {
      podUser.style.borderColor = 'var(--neon-cyan)';
      podUser.style.boxShadow = '0 0 15px var(--neon-cyan-dim)';
    }
    if (podAdmin) {
      podAdmin.style.borderColor = 'rgba(255,255,255,0.15)';
      podAdmin.style.boxShadow = 'none';
    }
  }

  // Open Protocol Summary Inspector Modal (Cannot play directly from welcome card)
  openMenuSummary(menuKey) {
    const summary = this.menuSummaries[menuKey];
    if (!summary) return;

    window.cyberAudio?.playClick();

    const modalBox = document.getElementById('modal-general-box');
    const modalContent = document.getElementById('modal-general-content');
    if (!modalBox || !modalContent) return;

    const currentUser = window.authManager?.currentUser;
    const isTested = currentUser !== null;
    const canAccessDirectly = isTested && (summary.id !== 'admin' || currentUser.role === 'admin');

    modalContent.innerHTML = `
      <div style="padding: 10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">
          <div style="display:flex; align-items:center; gap: 12px;">
            <div style="font-size: 2.2rem; width: 50px; height: 50px; border-radius: 8px; background: rgba(0,243,255,0.1); border: 1px solid var(--border-cyan); display:flex; align-items:center; justify-content:center;">
              ${summary.icon}
            </div>
            <div>
              <span class="cyber-tag">${summary.category}</span>
              <h3 style="font-size: 1.3rem; color: var(--text-highlight); margin-top: 4px;">
                ${summary.title}
              </h3>
            </div>
          </div>
          <div>
            <span class="cyber-tag tag-magenta">${summary.difficulty}</span>
          </div>
        </div>

        <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.6; margin-bottom: 20px;">
          ${summary.description}
        </p>

        <!-- Threat Vectors Trained -->
        <div style="background: rgba(5,5,10,0.8); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 14px 18px; margin-bottom: 16px;">
          <div style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-cyan); margin-bottom: 8px; font-weight: 700;">
            VEKTOR ANCAMAN YANG DIPELAJARI:
          </div>
          <div style="display:flex; flex-wrap:wrap; gap: 8px;">
            ${summary.threats.map(t => `<span class="cyber-tag tag-magenta">⚡ ${t}</span>`).join('')}
          </div>
        </div>

        <!-- Learning Competencies -->
        <div style="background: rgba(14,18,36,0.8); border-left: 3px solid var(--neon-green); border-radius: 4px; padding: 14px 18px; margin-bottom: 20px;">
          <div style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-green); margin-bottom: 8px; font-weight: 700;">
            TARGET KOMPETENSI PERTAHANAN SIBER:
          </div>
          <ul style="list-style: none; padding-left: 0; font-size: 0.85rem; color: var(--text-main); display: flex; flex-direction: column; gap: 6px;">
            ${summary.objectives.map(o => `<li>✓ ${o}</li>`).join('')}
          </ul>
        </div>

        <!-- Access Status Banner -->
        <div style="background: rgba(5,5,10,0.7); border: 1px dashed rgba(255,255,255,0.2); padding: 10px 16px; border-radius: 4px; margin-bottom: 24px; display:flex; justify-content:space-between; align-items:center;">
          <div style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted);">
            IZIN AKSES: <strong style="color: var(--neon-cyan);">${summary.accessRole}</strong>
          </div>
          <span class="cyber-tag ${canAccessDirectly ? 'tag-green' : isTested ? 'tag-magenta' : 'tag-amber'}">
            ${canAccessDirectly ? '● AKSES TERBUKA' : isTested ? '🔒 EKSKLUSIF ADMIN' : '🔒 MEMBUTUHKAN LOGIN'}
          </span>
        </div>

        <!-- Action Buttons -->
        <div style="display:flex; justify-content:flex-end; gap: 12px; flex-wrap: wrap;">
          <button class="cyber-btn btn-ghost" onclick="window.welcomeInteractive.closeModal()">
            TUTUP RINGKASAN
          </button>

          ${canAccessDirectly ? `
            <button class="cyber-btn" onclick="window.welcomeInteractive.closeModal(); window.app.navigateTo('${summary.id}');">
              MASUK KE MODUL INI ➔
            </button>
          ` : isTested && summary.id === 'admin' ? `
            <button class="cyber-btn btn-magenta" onclick="window.welcomeInteractive.closeModal(); window.authManager.openLoginModal('admin', 'admin123');">
              <span>🛡️</span> GANTI KE AKUN ADMIN (COMMANDER VEKTOR)
            </button>
          ` : `
            <button class="cyber-btn btn-magenta" onclick="window.welcomeInteractive.closeModal(); window.authManager.openLoginModal();">
              <span>🔑</span> MASUK DENGAN AKUN UJI COBA
            </button>
          `}
        </div>
      </div>
    `;

    modalBox.classList.add('active');
  }

  closeModal() {
    const modalBox = document.getElementById('modal-general-box');
    if (modalBox) modalBox.classList.remove('active');
    window.cyberAudio?.playClick();
  }

  scrollToAccountTest() {
    this.closeModal();
    const consoleBox = document.getElementById('account-test-console');
    if (consoleBox) {
      consoleBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      consoleBox.style.animation = 'pulseGlowCyan 1.5s ease-in-out';
      setTimeout(() => {
        consoleBox.style.animation = '';
      }, 1600);
    }
  }
}

window.welcomeInteractive = new WelcomeInteractive();

