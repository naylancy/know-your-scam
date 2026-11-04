<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>KNOW YOUR SCAM: Anti-Gravity Defense Protocol</title>
  <meta name="description" content="KNOW YOUR SCAM - Platform edukasi dan simulasi pertahanan siber multi-level bertenaga Laravel dan AI Cognitive Core.">

  <!-- Core Cyber CSS Files -->
  <link rel="stylesheet" href="{{ asset('css/cyber-theme.css') }}">
  <link rel="stylesheet" href="{{ asset('css/hud-layout.css') }}">
  <link rel="stylesheet" href="{{ asset('css/games.css') }}">
  <link rel="stylesheet" href="{{ asset('css/responsive.css') }}">

  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🛡️</text></svg>">
</head>
<body>

  <!-- Dynamic Background: Holographic Grid Floor & Zero-Gravity Particles -->
  <div class="holo-grid-bg"></div>
  <div class="holo-grid-floor"></div>
  <canvas id="canvas-particles"></canvas>
  <div class="scanlines-overlay"></div>

  <div class="app-wrapper">

    <!-- TOP HUD HEADER -->
    <header class="hud-header guest-mode">
      <div class="hud-header-inner">
        <!-- Brand & Pulsing Logo -->
        <a href="#welcome" class="brand-container" title="KNOW YOUR SCAM - Beranda">
          <div class="brand-icon">🛡️</div>
          <div class="brand-text">
            <h1>KNOW YOUR SCAM</h1>
            <div class="subtext">ZERO-TRUST CYBER DEFENSE</div>
          </div>
        </a>

        <!-- Navigation Links (Game modules hidden when guest, displayed when logged in) -->
        <nav>
          <ul class="hud-nav" id="hud-nav-links">
            <li><a href="#welcome" class="nav-link active"><span>🚀</span> BERANDA</a></li>
            <li class="nav-item-game"><a href="#kasus" class="nav-link"><span>📜</span> KASUS</a></li>
            <li class="nav-item-game"><a href="#diff" class="nav-link"><span>⚖️</span> FINDING DIFF</a></li>
            <li class="nav-item-game"><a href="#criminal" class="nav-link"><span>🕵️</span> CRIMINAL CASE</a></li>
            <li class="nav-item-game"><a href="#deeplearn" class="nav-link"><span>🧠</span> DEEP LEARNING</a></li>
            <li class="nav-item-game"><a href="#scanner" class="nav-link"><span>🔗</span> LINK SCANNER</a></li>
            <li class="nav-item-game"><a href="#leaderboard" class="nav-link"><span>🏆</span> LEADERBOARD</a></li>
            <li class="nav-item-game"><a href="#admin" id="nav-admin-link" class="nav-link"><span>🛡️</span> ADMIN</a></li>
          </ul>
        </nav>

        <!-- Right Side: Theme Toggle, Audio Controls, Guest Login Button & User Profile Capsule -->
        <div class="hud-right-controls" style="display:flex; align-items:center; gap: 8px; flex-shrink: 0;">
          <!-- Theme Toggle Switcher (Dark / White Mode) -->
          <button id="btn-toggle-theme" class="theme-toggle-btn" title="Ganti Tema Tampilan (Dark / White Cyber)">
            🌙 <span>DARK</span>
          </button>

          <!-- Sci-Fi Audio Synthesizer Controls -->
          <div class="audio-ctrl-capsule">
            <button id="btn-toggle-sfx" class="audio-btn active" title="Aktif/Nonaktif Efek Suara Sci-Fi (Beep/Chime)">
              🔊
            </button>
            <button id="btn-toggle-drone" class="audio-btn" title="Aktif/Nonaktif Ambient Cyber Drone (Sub-Bass Space Ambient)">
              📻
            </button>
            <input id="audio-volume-slider" type="range" class="audio-vol-slider" min="0" max="1" step="0.05" value="0.5" title="Volume Suara">
          </div>

          <!-- GUEST VIEW: MASUK / UJI LOGIN BUTTON -->
          <div id="hud-guest-actions" class="hud-guest-actions">
            <button id="btn-header-login" class="cyber-btn" onclick="window.authManager.openLoginModal()" style="padding: 7px 16px; font-size: 0.8rem; box-shadow: 0 0 15px var(--neon-cyan-dim);">
              <span>🔑</span> MASUK / UJI LOGIN
            </button>
          </div>

          <!-- AUTHENTICATED VIEW: USER PROFILE CAPSULE & LOGOUT -->
          <div id="hud-auth-actions" class="hud-auth-actions" style="display:none; align-items:center; gap: 10px;">
            <div class="user-capsule">
              <div id="hud-user-avatar" class="user-avatar">⚡</div>
              <div class="user-info">
                <span id="hud-user-name" class="user-name">Cadet Aris</span>
                <div class="user-stats-mini">
                  <span id="hud-user-score">680 XP</span>
                  <span id="hud-user-vuln" class="vuln-badge-mini safe">VULN: 4.5/10</span>
                </div>
              </div>
            </div>

            <!-- Logout Button -->
            <button id="btn-header-logout" class="cyber-btn btn-ghost" style="padding: 6px 12px; font-size: 0.75rem; border-color: rgba(255,0,85,0.4); color: var(--neon-red);" onclick="window.authManager.logout()" title="Keluar dari Akun">
              <span>⏻</span> KELUAR
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- MAIN VIEWPORT -->
    <main class="main-viewport">

      <!-- ========================================================
           PAGE 1: WELCOME HERO (HALAMAN PEMBUKA & UJI AKUN)
           ======================================================== -->
      <section id="page-welcome" class="page-view active">
        <div class="welcome-hero">
          <!-- Floating Shield Emblem -->
          <div class="hero-shield-emblem">
            <div class="hero-core-icon">🛡️</div>
          </div>

          <h1 class="hero-title">KNOW YOUR SCAM</h1>
          <div class="hero-subtitle">ANTI-GRAVITY CYBER DEFENSE // REKAYASA SOSIAL & DETEKSI PENIPUAN</div>

          <p class="hero-desc">
            Pusat simulasi dan edukasi taktis pertahanan siber generasi baru bertenaga Laravel Eloquent ORM. Lakukan uji coba peran akun (User atau Admin) pada konsol di bawah dan telusuri ringkasan spesifikasi protokol misi pertahanan siber.
          </p>

          <!-- Hero Actions: Account Testing & Menu Summaries (No direct game trial) -->
          <div class="hero-cta-group">
            <button class="cyber-btn hero-cta-btn" onclick="window.authManager.openLoginModal()">
              <span>🔑</span> MASUK / UJI LOGIN
            </button>
            <button class="cyber-btn btn-ghost" style="font-size: 1.05rem; padding: 16px 28px;" onclick="window.welcomeInteractive.scrollToAccountTest()">
              <span>⚡</span> KONSOL PROFIL & SANDI
            </button>
            <button class="cyber-btn btn-ghost" style="font-size: 1.05rem; padding: 16px 28px;" onclick="document.getElementById('menu-summary-section').scrollIntoView({behavior:'smooth'})">
              <span>📜</span> RINGKASAN MENU MODUL
            </button>
          </div>

          <!-- ========================================================
               KONSOL UJI COBA AKUN SIBER (INTERACTIVE ACCOUNT TESTING)
               ======================================================== -->
          <div id="account-test-console" class="account-test-console">
            <div class="account-test-header">
              <div style="display:flex; align-items:center; gap: 10px;">
                <span style="font-size: 1.5rem;">⚡</span>
                <div>
                  <h3 style="font-size: 1.25rem; color: var(--text-highlight); letter-spacing: 1px;">
                    KONSOL UJI COBA AKUN SIBER (ACCOUNT TESTING CONSOLE)
                  </h3>
                  <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-cyan);">
                    GUNAKAN KREDENSIAL PROFIL & SANDI RESMI DI BAWAH UNTUK MEMBUKA AKSES MODUL
                  </div>
                </div>
              </div>
              <div id="test-active-badge" class="cyber-tag tag-amber">
                STATUS: BELUM LOGIN (MODE TAMU)
              </div>
            </div>

            <!-- Side-by-Side Pods: User Pod vs Admin Pod -->
            <div class="account-test-grid">
              <!-- POD A: USER (KADET SIBER) -->
              <div id="pod-test-user" class="account-test-pod" style="border-color: var(--neon-cyan); box-shadow: 0 0 15px var(--neon-cyan-dim);">
                <div>
                  <div class="pod-title-bar">
                    <div style="display:flex; align-items:center; gap: 8px;">
                      <span style="font-size: 1.6rem;">👤</span>
                      <div>
                        <h4 style="font-size: 1.1rem; color: var(--neon-cyan);">KADET SIBER (USER / MAHASISWA)</h4>
                        <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">PERAN: PESERTA EDUKASI & SIMULASI</div>
                      </div>
                    </div>
                    <span class="cyber-tag">ROLE: USER</span>
                  </div>

                  <div class="pod-credentials-box">
                    <span>NAMA PROFIL: <strong>Cadet Aris</strong></span>
                    <span>USERNAME: <code>cadet</code></span>
                    <span>SANDI / PASSWORD: <code style="color: var(--neon-green); font-weight: bold;">cadet123</code></span>
                    <span style="color: var(--text-muted); font-size: 0.72rem;">STATISTIK: 680 XP | VULN: 4.5/10 (Security Cadet)</span>
                  </div>

                  <ul class="pod-permissions-list">
                    <li style="color: var(--text-main);"><span style="color: var(--neon-green);">✓</span> Mengakses 5 Modul Game & Skenario Simulasi</li>
                    <li style="color: var(--text-main);"><span style="color: var(--neon-green);">✓</span> Menerima Evaluasi Indikator Skor Kerentanan (1–10)</li>
                    <li style="color: var(--text-main);"><span style="color: var(--neon-green);">✓</span> Memperoleh Poin XP & Tercatat di Leaderboard Global</li>
                    <li style="color: var(--text-muted);"><span style="color: var(--neon-red);">✗</span> Akses Panel Kontrol & Log Telemetri Terbatas</li>
                  </ul>
                </div>

                <button class="cyber-btn" style="width: 100%; font-size: 0.92rem; padding: 12px 16px;" onclick="window.welcomeInteractive.testAccount('user')">
                  ⚡ LOGIN SEBAGAI CADET ARIS (USER)
                </button>
              </div>

              <!-- POD B: ADMIN (PUSAT KOMANDO SIBER) -->
              <div id="pod-test-admin" class="account-test-pod pod-admin" style="border-color: rgba(255,255,255,0.15);">
                <div>
                  <div class="pod-title-bar">
                    <div style="display:flex; align-items:center; gap: 8px;">
                      <span style="font-size: 1.6rem;">🛡️</span>
                      <div>
                        <h4 style="font-size: 1.1rem; color: var(--neon-magenta);">KOMANDAN SISTEM (ADMINISTRATOR)</h4>
                        <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">PERAN: PENGELOLA WEBSITE & PEMBUAT GIM</div>
                      </div>
                    </div>
                    <span class="cyber-tag tag-magenta">ROLE: ADMIN</span>
                  </div>

                  <div class="pod-credentials-box" style="border-color: rgba(189,0,255,0.3);">
                    <span>NAMA PROFIL: <strong>Commander Vektor</strong></span>
                    <span>USERNAME: <code>admin</code></span>
                    <span>SANDI / PASSWORD: <code style="color: var(--neon-magenta); font-weight: bold;">admin123</code></span>
                    <span style="color: var(--text-muted); font-size: 0.72rem;">STATISTIK: 1250 XP | VULN: 1.2/10 (Grand Sentinel)</span>
                  </div>

                  <ul class="pod-permissions-list">
                    <li style="color: var(--text-main);"><span style="color: var(--neon-green);">✓</span> Hak Penuh Panel Kontrol & Manajemen Kasus (CRUD)</li>
                    <li style="color: var(--text-main);"><span style="color: var(--neon-green);">✓</span> Dashboard Telemetri Log Aktivitas Real-time</li>
                    <li style="color: var(--text-main);"><span style="color: var(--neon-green);">✓</span> Fasilitas Ekspor Laporan Audit & Pembersihan Log</li>
                    <li style="color: var(--text-main);"><span style="color: var(--neon-green);">✓</span> Menguji Seluruh Skenario Modul dengan Elevasi Penuh</li>
                  </ul>
                </div>

                <button class="cyber-btn btn-magenta" style="width: 100%; font-size: 0.92rem; padding: 12px 16px;" onclick="window.welcomeInteractive.testAccount('admin')">
                  🛡️ LOGIN SEBAGAI COMMANDER VEKTOR (ADMIN)
                </button>
              </div>
            </div>

            <!-- Real-time Test Feedback Status Bar -->
            <div class="account-test-feedback-bar">
              <div id="test-terminal-status">
                <span style="color: var(--neon-cyan);">⚡ MODE TAMU: Pilih salah satu akun uji coba di atas untuk membuka navigasi modul pertahanan.</span>
              </div>
              <div id="test-unlocked-launchers" style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="cyber-btn" onclick="window.authManager.openLoginModal()" style="padding: 8px 18px; font-size: 0.85rem;">
                  <span>🔑</span> MASUK DENGAN AKUN UJI COBA
                </button>
              </div>
            </div>
          </div>

          <!-- ========================================================
               RINGKASAN MENU & SPESIFIKASI MISI (HANYA RINGKASAN)
               ======================================================== -->
          <div id="menu-summary-section" style="text-align: center; margin-bottom: 24px; max-width: 800px;">
            <span class="cyber-tag tag-magenta" style="font-size: 0.85rem; padding: 6px 16px; margin-bottom: 8px;">
              KATALOG SPESIFIKASI MENU
            </span>
            <h2 style="font-size: 1.8rem; color: var(--text-highlight); margin: 6px 0;">
              RINGKASAN PROTOKOL & MATERI EDUKASI
            </h2>
            <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.5;">
              Berikut adalah ringkasan kurikulum dan kapabilitas teknis dari seluruh modul yang tersedia. Klik kartu di bawah untuk membuka dokumen ringkasan & intelijen modul tanpa langsung memulai permainan.
            </p>
          </div>

          <!-- 7 Menu Summary Cards (Informational / Briefing Only) -->
          <div class="menu-summary-grid">
            <!-- 1. KASUS -->
            <div class="menu-summary-card" onclick="window.welcomeInteractive.openMenuSummary('kasus')">
              <div>
                <div class="menu-summary-badge-bar">
                  <span class="cyber-tag">MODUL 1</span>
                  <span class="cyber-tag tag-amber">MULTI-POV STORY</span>
                </div>
                <div class="menu-summary-icon">📜</div>
                <h4 style="font-size: 1.15rem; color: var(--text-highlight); margin-bottom: 6px;">KASUS (MULTI-POV)</h4>
                <p class="menu-summary-teaser">
                  Simulasi narasi percakapan terminal siber dengan alur Phishing Bank NeoArtha, Love Scam Helios, dan Job Scam QuantumTech dari sudut pandang Korban & Pemburu Ancaman.
                </p>
              </div>
              <div class="menu-summary-inspect-link">
                <span>🔍</span> BACA RINGKASAN PROTOKOL ➔
              </div>
            </div>

            <!-- 2. FINDING DIFF -->
            <div class="menu-summary-card" onclick="window.welcomeInteractive.openMenuSummary('diff')">
              <div>
                <div class="menu-summary-badge-bar">
                  <span class="cyber-tag">MODUL 2</span>
                  <span class="cyber-tag tag-magenta">JUDGE REAL VS FAKE</span>
                </div>
                <div class="menu-summary-icon">⚖️</div>
                <h4 style="font-size: 1.15rem; color: var(--text-highlight); margin-bottom: 6px;">FINDING DIFF</h4>
                <p class="menu-summary-teaser">
                  Uji ketelitian visual bertindak sebagai Hakim Siber membandingkan skenario berdampingan dengan hover zoom-in lens dan 2 tombol raksasa neon REAL vs FAKE.
                </p>
              </div>
              <div class="menu-summary-inspect-link">
                <span>🔍</span> BACA RINGKASAN PROTOKOL ➔
              </div>
            </div>

            <!-- 3. CRIMINAL CASE -->
            <div class="menu-summary-card" onclick="window.welcomeInteractive.openMenuSummary('criminal')">
              <div>
                <div class="menu-summary-badge-bar">
                  <span class="cyber-tag">MODUL 3</span>
                  <span class="cyber-tag tag-red">FORENSIC PUZZLE</span>
                </div>
                <div class="menu-summary-icon">🕵️</div>
                <h4 style="font-size: 1.15rem; color: var(--text-highlight); margin-bottom: 6px;">CRIMINAL CASE</h4>
                <p class="menu-summary-teaser">
                  Teka-teki investigasi kriminal harian drag-and-drop memetakan anatomi penipuan korporat BEC dan investasi palsu sebelum batas waktu panik habis.
                </p>
              </div>
              <div class="menu-summary-inspect-link">
                <span>🔍</span> BACA RINGKASAN PROTOKOL ➔
              </div>
            </div>

            <!-- 4. DEEP LEARNING -->
            <div class="menu-summary-card" onclick="window.welcomeInteractive.openMenuSummary('deeplearn')">
              <div>
                <div class="menu-summary-badge-bar">
                  <span class="cyber-tag">MODUL 4</span>
                  <span class="cyber-tag tag-green">AI EVALUATION</span>
                </div>
                <div class="menu-summary-icon">🧠</div>
                <h4 style="font-size: 1.15rem; color: var(--text-highlight); margin-bottom: 6px;">DEEP LEARNING</h4>
                <p class="menu-summary-teaser">
                  Evaluasi kritis ancaman Zero-Day di mana penalaran tertulis Anda dievaluasi secara mendalam oleh AI Guardian dengan animasi gelombang siber neural matrix.
                </p>
              </div>
              <div class="menu-summary-inspect-link">
                <span>🔍</span> BACA RINGKASAN PROTOKOL ➔
              </div>
            </div>

            <!-- 5. LINK & NEWS SCANNER -->
            <div class="menu-summary-card" onclick="window.welcomeInteractive.openMenuSummary('scanner')">
              <div>
                <div class="menu-summary-badge-bar">
                  <span class="cyber-tag">MODUL 5</span>
                  <span class="cyber-tag">SECURITY UTILITY</span>
                </div>
                <div class="menu-summary-icon">🔗</div>
                <h4 style="font-size: 1.15rem; color: var(--text-highlight); margin-bottom: 6px;">NEWS & LINK SCANNER</h4>
                <p class="menu-summary-teaser">
                  Utilitas mandiri untuk memindai keabsahan URL dan teks berita dengan skor kerentanan neon 1–10, transparansi pemrosesan AI, dan petunjuk keamanan interaktif.
                </p>
              </div>
              <div class="menu-summary-inspect-link">
                <span>🔍</span> BACA RINGKASAN PROTOKOL ➔
              </div>
            </div>

            <!-- 6. LEADERBOARD -->
            <div class="menu-summary-card" onclick="window.welcomeInteractive.openMenuSummary('leaderboard')">
              <div>
                <div class="menu-summary-badge-bar">
                  <span class="cyber-tag">PERINGKAT</span>
                  <span class="cyber-tag tag-amber">GLOBAL TELEMETRY</span>
                </div>
                <div class="menu-summary-icon">🏆</div>
                <h4 style="font-size: 1.15rem; color: var(--text-highlight); margin-bottom: 6px;">LEADERBOARD GLOBAL</h4>
                <p class="menu-summary-teaser">
                  Papan peringkat real-time yang memeringkat operator siber berdasarkan skor XP pertahanan, konsistensi misi, dan skor kerentanan terendah dengan medali kejuaraan.
                </p>
              </div>
              <div class="menu-summary-inspect-link">
                <span>🔍</span> BACA RINGKASAN PROTOKOL ➔
              </div>
            </div>

            <!-- 7. PANEL ADMIN -->
            <div class="menu-summary-card" onclick="window.welcomeInteractive.openMenuSummary('admin')">
              <div>
                <div class="menu-summary-badge-bar">
                  <span class="cyber-tag tag-magenta">KONTROL SISTEM</span>
                  <span class="cyber-tag">CRUD & AUDIT</span>
                </div>
                <div class="menu-summary-icon">🛡️</div>
                <h4 style="font-size: 1.15rem; color: var(--text-highlight); margin-bottom: 6px;">PANEL KONTROL ADMIN</h4>
                <p class="menu-summary-teaser">
                  Konsol manajemen khusus pengelola platform untuk memodifikasi atau menambah skenario kasus, memantau log aktivitas peserta secara real-time, dan mengekspor telemetri.
                </p>
              </div>
              <div class="menu-summary-inspect-link">
                <span>🔍</span> BACA RINGKASAN PROTOKOL ➔
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PAGE 2: MODUL 1 - KASUS -->
      <section id="page-kasus" class="page-view">
        <div class="sub-hud-bar">
          <div class="sub-hud-left">
            <span style="font-size: 1.5rem;">📜</span>
            <div class="sub-hud-title">PROTOKOL KASUS: MULTI-POV SIMULATION</div>
          </div>
          <div class="sub-hud-right">
            <button class="btn-intel-hint" onclick="window.hintSystem.openHintModal()">
              <span>💡</span> MINTA INTEL / HINT
            </button>
          </div>
        </div>
        <div id="kasus-module-container"></div>
      </section>

      <!-- PAGE 3: MODUL 2 - FINDING DIFF -->
      <section id="page-diff" class="page-view">
        <div class="sub-hud-bar">
          <div class="sub-hud-left">
            <span style="font-size: 1.5rem;">⚖️</span>
            <div class="sub-hud-title">PROTOKOL FINDING DIFF: JUDGE REAL VS FAKE</div>
          </div>
          <div class="sub-hud-right">
            <button class="btn-intel-hint" onclick="window.hintSystem.openHintModal()">
              <span>💡</span> MINTA INTEL / HINT
            </button>
          </div>
        </div>
        <div id="diff-module-container"></div>
      </section>

      <!-- PAGE 4: MODUL 3 - CRIMINAL CASE -->
      <section id="page-criminal" class="page-view">
        <div class="sub-hud-bar">
          <div class="sub-hud-left">
            <span style="font-size: 1.5rem;">🕵️</span>
            <div class="sub-hud-title">PROTOKOL CRIMINAL CASE: INVESTIGASI FORENSIK</div>
          </div>
          <div class="sub-hud-right">
            <button class="btn-intel-hint" onclick="window.hintSystem.openHintModal()">
              <span>💡</span> MINTA INTEL / HINT
            </button>
          </div>
        </div>
        <div id="criminal-module-container"></div>
      </section>

      <!-- PAGE 5: MODUL 4 - DEEP LEARNING -->
      <section id="page-deeplearn" class="page-view">
        <div class="sub-hud-bar">
          <div class="sub-hud-left">
            <span style="font-size: 1.5rem;">🧠</span>
            <div class="sub-hud-title">PROTOKOL DEEP LEARNING: EVALUASI SEMANTIK AI</div>
          </div>
          <div class="sub-hud-right">
            <button class="btn-intel-hint" onclick="window.hintSystem.openHintModal()">
              <span>💡</span> MINTA INTEL / HINT
            </button>
          </div>
        </div>
        <div id="deeplearn-module-container"></div>
      </section>

      <!-- PAGE 6: MODUL 5 - LLM NEWS / LINK SCANNER -->
      <section id="page-scanner" class="page-view">
        <div class="sub-hud-bar">
          <div class="sub-hud-left">
            <span style="font-size: 1.5rem;">🔗</span>
            <div class="sub-hud-title">LLM NEWS & URL SCANNER TOOL</div>
          </div>
          <div class="sub-hud-right">
            <button class="btn-intel-hint" onclick="window.hintSystem.openHintModal()">
              <span>💡</span> MINTA INTEL / HINT
            </button>
          </div>
        </div>
        <div id="scanner-module-container"></div>
      </section>

      <!-- PAGE 7: LEADERBOARD -->
      <section id="page-leaderboard" class="page-view">
        <div id="leaderboard-container"></div>
      </section>

      <!-- PAGE 8: ADMIN PANEL -->
      <section id="page-admin" class="page-view">
        <div id="admin-container"></div>
      </section>

    </main>

    <!-- FOOTER HUD STATUS -->
    <footer class="hud-footer">
      <div class="hud-footer-inner">
        <div style="display:flex; align-items:center; gap: 12px;">
          <span style="color: var(--neon-cyan); font-weight: 700;">KNOW YOUR SCAM</span>
          <span>//</span>
          <span>DATABASE: {{ config('database.default') }} &bull; ZERO-TRUST ARCHITECTURE</span>
        </div>

        <div style="display:flex; align-items:center; gap: 16px;">
          <div class="ai-transparency-pill" onclick="window.app.openTransparencyModal()">
            <span class="pulsing-dot"></span>
            <span>AI TRANSPARENCY: VERIFIED // ZERO-PII</span>
          </div>

          <div style="color: var(--text-muted); font-size: 0.72rem;">
            DATA FIKTIF MURNI &bull; TANPA DOKSLI &bull; LISENSI EDUKASI
          </div>
        </div>
      </div>
    </footer>

  </div>

  <!-- MODALS -->
  <!-- MODAL: CYBER LOGIN & TEST ACCOUNTS -->
  <div id="modal-auth-box" class="cyber-modal-backdrop">
    <div class="cyber-modal-box" style="max-width: 650px; border-color: var(--neon-cyan); box-shadow: 0 0 50px var(--neon-cyan-dim);">
      <!-- Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 18px; border-bottom: 1px solid rgba(0,243,255,0.2); padding-bottom: 12px;">
        <div style="display:flex; align-items:center; gap: 12px;">
          <div style="font-size: 2rem;">🛡️</div>
          <div>
            <span class="cyber-tag tag-cyan">GATEWAY OTENTIKASI SIBER</span>
            <h3 style="font-size: 1.35rem; color: var(--text-highlight); margin-top: 4px;">MASUK KE KNOW YOUR SCAM</h3>
          </div>
        </div>
        <button class="modal-close-btn" onclick="window.authManager.closeLoginModal()" style="background:none; border:none; color:var(--text-muted); font-size:1.6rem; cursor:pointer; line-height:1;">&times;</button>
      </div>

      <!-- Quick Test Accounts Cheat Sheet (Cards with Profiles & Sandi) -->
      <div style="margin-bottom: 20px;">
        <div style="font-family: var(--font-display); font-size: 0.82rem; color: var(--neon-cyan); letter-spacing: 1px; margin-bottom: 10px; display:flex; align-items:center; gap:6px;">
          <span>⚡</span> PILIH AKUN UJI COBA (KLIK UNTUK ISI PROFIL & SANDI OTOMATIS):
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <!-- User Test Card -->
          <div class="auth-test-card" onclick="window.authManager.quickFillAndLogin('cadet', 'cadet123')" style="background: rgba(14,18,36,0.85); border: 1px solid var(--border-cyan); border-radius: 8px; padding: 12px; cursor: pointer;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
              <div style="font-weight:700; color:var(--neon-cyan); font-size:0.92rem;">👤 Cadet Aris</div>
              <span class="cyber-tag" style="font-size:0.65rem;">ROLE: USER</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-main); display:flex; flex-direction:column; gap:3px;">
              <div>Username: <strong style="color:var(--text-highlight);">cadet</strong></div>
              <div>Sandi: <strong style="color:var(--neon-green);">cadet123</strong></div>
              <div style="color: var(--text-muted); font-size: 0.7rem;">Pangkat: Security Cadet (680 XP)</div>
            </div>
            <div style="margin-top: 10px; font-size: 0.72rem; color: var(--neon-cyan); font-family: var(--font-display); font-weight: 700; display:flex; align-items:center; gap:4px;">
              <span>⚡</span> KLIK UNTUK MASUK SEBAGAI CADET ➔
            </div>
          </div>

          <!-- Admin Test Card -->
          <div class="auth-test-card" onclick="window.authManager.quickFillAndLogin('admin', 'admin123')" style="background: rgba(25,12,36,0.85); border: 1px solid rgba(189,0,255,0.4); border-radius: 8px; padding: 12px; cursor: pointer;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
              <div style="font-weight:700; color:var(--neon-magenta); font-size:0.92rem;">🛡️ Commander Vektor</div>
              <span class="cyber-tag tag-magenta" style="font-size:0.65rem;">ROLE: ADMIN</span>
            </div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-main); display:flex; flex-direction:column; gap:3px;">
              <div>Username: <strong style="color:var(--text-highlight);">admin</strong></div>
              <div>Sandi: <strong style="color:var(--neon-magenta);">admin123</strong></div>
              <div style="color: var(--text-muted); font-size: 0.7rem;">Pangkat: Sentinel (1250 XP)</div>
            </div>
            <div style="margin-top: 10px; font-size: 0.72rem; color: var(--neon-magenta); font-family: var(--font-display); font-weight: 700; display:flex; align-items:center; gap:4px;">
              <span>🛡️</span> KLIK UNTUK MASUK SEBAGAI ADMIN ➔
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div style="text-align:center; position:relative; margin: 18px 0;">
        <span style="background: var(--bg-surface); padding: 0 12px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); position:relative; z-index:1;">
          ATAU MASUKKAN USERNAME & SANDI MANUAL
        </span>
        <div style="position:absolute; top:50%; left:0; right:0; height:1px; background:rgba(255,255,255,0.1); z-index:0;"></div>
      </div>

      <!-- Manual Input Form -->
      <form id="auth-manual-form" onsubmit="window.authManager.handleFormSubmit(event)">
        <!-- Error Alert Container -->
        <div id="auth-form-error" style="display:none; background:rgba(255,0,85,0.15); border:1px solid var(--neon-red); border-radius:4px; padding:10px 14px; margin-bottom:14px; font-size:0.82rem; color:var(--neon-red);"></div>

        <div style="margin-bottom: 14px;">
          <label style="display:block; font-family:var(--font-display); font-size:0.8rem; color:var(--text-muted); margin-bottom:6px;">USERNAME SIBER</label>
          <input type="text" id="auth-input-username" class="cyber-input" placeholder="contoh: cadet atau admin" style="width:100%; padding:10px 14px; font-family:var(--font-mono); font-size:0.9rem;" required autocomplete="username">
        </div>

        <div style="margin-bottom: 20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label style="font-family:var(--font-display); font-size:0.8rem; color:var(--text-muted);">SANDI / PASSWORD</label>
            <span style="font-size:0.72rem; color:var(--neon-cyan); cursor:pointer;" onclick="window.authManager.togglePasswordVisibility()">👁️ Tampilkan Sandi</span>
          </div>
          <input type="password" id="auth-input-password" class="cyber-input" placeholder="contoh: cadet123 atau admin123" style="width:100%; padding:10px 14px; font-family:var(--font-mono); font-size:0.9rem;" required autocomplete="current-password">
        </div>

        <div style="display:flex; justify-content:flex-end; gap:12px;">
          <button type="button" class="cyber-btn btn-ghost" onclick="window.authManager.closeLoginModal()">
            BATAL
          </button>
          <button type="submit" id="btn-submit-login" class="cyber-btn" style="padding:10px 24px; font-size:0.95rem;">
            <span>⚡</span> OTENTIKASI & MASUK MISI
          </button>
        </div>
      </form>
    </div>
  </div>

  <div id="modal-general-box" class="cyber-modal-backdrop">
    <div class="cyber-modal-box">
      <div id="modal-general-content"></div>
    </div>
  </div>

  <div id="modal-vuln-box" class="cyber-modal-backdrop">
    <div class="cyber-modal-box" style="border-color: var(--neon-magenta); box-shadow: 0 0 50px rgba(189,0,255,0.3);">
      <div id="modal-vuln-content"></div>
    </div>
  </div>

  <div id="modal-hint-box" class="cyber-modal-backdrop">
    <div class="cyber-modal-box" style="border-color: var(--neon-amber); box-shadow: 0 0 40px rgba(255,184,0,0.3);">
      <div id="modal-hint-content"></div>
      <div style="text-align: right; margin-top: 18px;">
        <button class="cyber-btn btn-ghost" onclick="window.hintSystem.closeHintModal()">
          TUTUP INTEL
        </button>
      </div>
    </div>
  </div>

  <div id="modal-transparency-box" class="cyber-modal-backdrop">
    <div class="cyber-modal-box" style="max-width: 600px;">
      <div style="text-align: center; margin-bottom: 16px;">
        <div style="font-size: 2.8rem; margin-bottom: 6px;">🛡️</div>
        <h3 style="font-size: 1.3rem; color: var(--neon-cyan); letter-spacing: 1px;">
          DEKLARASI TRANSPARANSI AI & PRIVASI PENGGUNA
        </h3>
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
          PROTOKOL PERLINDUNGAN DATA SIBER KNOW YOUR SCAM
        </div>
      </div>
      <div style="font-size: 0.9rem; color: var(--text-main); line-height: 1.6; display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        <div style="background: rgba(5,5,10,0.7); border-left: 3px solid var(--neon-green); padding: 10px 14px; border-radius: 4px;">
          <strong>1. Data Fiktif Murni (Pure Fictional Data):</strong> Seluruh nama entitas ("Bank NeoArtha", "Elena Voss", "QuantumTech"), tautan domain (.mock/.fake), dan nomor kontak dalam simulasi ini 100% fiktif demi keselamatan edukasi.
        </div>
        <div style="background: rgba(5,5,10,0.7); border-left: 3px solid var(--neon-cyan); padding: 10px 14px; border-radius: 4px;">
          <strong>2. Notifikasi Pemrosesan AI Pihak Ketiga:</strong> Fitur Deep Learning dan Scanner memproses argumen Anda semata-mata untuk mengukur ketepatan deteksi pola rekayasa sosial. Tidak ada data pribadi (PII) yang disimpan atau diteruskan ke model komersial eksternal.
        </div>
        <div style="background: rgba(5,5,10,0.7); border-left: 3px solid var(--neon-magenta); padding: 10px 14px; border-radius: 4px;">
          <strong>3. Metrik Skor Kerentanan:</strong> Indikator 1–10 merupakan sarana pembelajaran reflektif untuk meningkatkan kesadaran siber pengguna dalam mengenali manipulasi psikologis.
        </div>
      </div>
      <div style="text-align: center;">
        <button class="cyber-btn" onclick="window.app.closeTransparencyModal()">
          SAYA MENGERTI & LANJUTKAN
        </button>
      </div>
    </div>
  </div>

  <div id="cyber-toast-container"></div>

  <!-- Injected Initial Database State from Laravel -->
  <script>
    window.__LARAVEL_INITIAL_DATA__ = {
      system_info: {
        project: "KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE",
        event: "GLOBAL CYBER SENTINEL DEFENSE",
        framework: "Laravel 10",
        database: "{{ config('database.default') }}"
      },
      cases_kasus: {!! json_encode($casesKasus) !!},
      cases_diff: {!! json_encode($casesDiff) !!},
      cases_criminal: {!! json_encode($casesCriminal) !!},
      cases_deeplearn: {!! json_encode($casesDeeplearn) !!},
      cases_scanner: {!! json_encode($casesScanner) !!},
      users: {!! json_encode($users) !!},
      activity_logs: {!! json_encode($activityLogs->map(function($l) {
        $l = (object) $l;
        $ts = now()->toDateTimeString();
        if (!empty($l->created_at)) {
          $ts = ($l->created_at instanceof \DateTimeInterface) ? $l->created_at->format('Y-m-d H:i:s') : (string) $l->created_at;
        } elseif (!empty($l->timestamp)) {
          $ts = (string) $l->timestamp;
        }
        return [
          'id' => $l->log_code ?? $l->id ?? ('LOG-' . rand(1000, 9999)),
          'timestamp' => $ts,
          'user_id' => $l->user_id ?? 'USR-002',
          'user_name' => $l->user_name ?? 'Cadet Aris',
          'module' => $l->module ?? 'SYSTEM',
          'decision' => $l->decision ?? 'Aksi Pertahanan',
          'vulnerability_score' => $l->vulnerability_score ?? 4.5,
          'status' => $l->status ?? 'SECURED',
        ];
      })) !!}
    };
  </script>

  <!-- Core Scripts -->
  <script src="{{ asset('js/audio-engine.js') }}"></script>
  <script src="{{ asset('js/particle-canvas.js') }}"></script>
  <script src="{{ asset('js/ai-wave-canvas.js') }}"></script>
  <script src="{{ asset('js/hint-system.js') }}"></script>
  <script src="{{ asset('js/auth.js') }}"></script>
  <script src="{{ asset('js/welcome-interactive.js') }}"></script>
  <script src="{{ asset('js/leaderboard.js') }}"></script>
  <script src="{{ asset('js/admin.js') }}"></script>

  <!-- Game Modules -->
  <script src="{{ asset('js/games/module-kasus.js') }}"></script>
  <script src="{{ asset('js/games/module-diff.js') }}"></script>
  <script src="{{ asset('js/games/module-criminal.js') }}"></script>
  <script src="{{ asset('js/games/module-deeplearn.js') }}"></script>
  <script src="{{ asset('js/games/module-scanner.js') }}"></script>

  <!-- Application Main Controller -->
  <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
