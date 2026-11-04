<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <title>Know Your Scam: Anti-Gravity Defense Protocol</title>
  <meta name="description" content="KNOW YOUR SCAM - Platform edukasi dan simulasi pertahanan siber multi-level bertenaga Laravel dan AI Cognitive Core.">

  <!-- Core Cyber CSS Files -->
  <link rel="stylesheet" href="{{ asset('css/cyber-theme.css') }}">
  <link rel="stylesheet" href="{{ asset('css/hud-layout.css') }}">
  <link rel="stylesheet" href="{{ asset('css/games.css') }}">
  <link rel="stylesheet" href="{{ asset('css/edukasi.css') }}">
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
            
            <!-- Combined GAMES Menu with Dropdown -->
            <li class="nav-item-game dropdown-nav-item">
              <a href="#games" class="nav-link dropdown-toggle" id="nav-games-link"><span>🎮</span> GAMES ▾</a>
              <ul class="dropdown-menu">
                <li><a href="#kasus" class="dropdown-link"><span>📜</span> KASUS SIMULASI</a></li>
                <li><a href="#diff" class="dropdown-link"><span>⚖️</span> FINDING DIFF</a></li>
                <li><a href="#criminal" class="dropdown-link"><span>🕵️</span> CRIMINAL CASE</a></li>
                <li><a href="#deeplearn" class="dropdown-link"><span>🧠</span> ANALYZER</a></li>
              </ul>
            </li>

            <!-- Combined DETEKTOR Menu (Link Scanner & Legit Checker) -->
            <li class="nav-item-game dropdown-nav-item">
              <a href="#scanner" class="nav-link dropdown-toggle" id="nav-detector-link"><span>🛡️</span> DETEKTOR ▾</a>
              <ul class="dropdown-menu">
                <li><a href="#scanner" class="dropdown-link"><span>🔗</span> LINK SCANNER</a></li>
                <li><a href="#checker" class="dropdown-link"><span>🛡️</span> LEGIT CHECKER</a></li>
              </ul>
            </li>

            <!-- W3Schools-Style Edukasi Menu -->
            <li class="nav-item-game"><a href="#edukasi" class="nav-link" id="nav-edukasi-link"><span>📚</span> EDUKASI</a></li>

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

          <!-- GUEST VIEW: MASUK / DAFTAR AKUN BUTTON -->
          <div id="hud-guest-actions" class="hud-guest-actions">
            <button id="btn-header-login" class="cyber-btn" onclick="window.authManager.openLoginModal()" style="padding: 7px 16px; font-size: 0.8rem; box-shadow: 0 0 15px var(--neon-cyan-dim);">
              <span>🔑</span> MASUK / DAFTAR
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
            Pusat simulasi dan edukasi taktis pertahanan siber generasi baru bertenaga Laravel dan Artificial Intelligence. Lindungi diri Anda dari ancaman manipulasi psikologis, deteksi keaslian informasi digital, dan uji ketangguhan nalar Anda melalui skenario interaktif.
          </p>

          <!-- Hero Actions: Authentication & Navigation -->
          <div class="hero-cta-group">
            <button class="cyber-btn hero-cta-btn" onclick="window.authManager.openLoginModal()">
              <span>🔑</span> MASUK / DAFTAR AKUN
            </button>
            <button class="cyber-btn btn-ghost" style="font-size: 1.05rem; padding: 16px 28px;" onclick="window.app.navigateTo('edukasi')">
              <span>📚</span> JELAJAHI MATERI EDUKASI
            </button>
            <button class="cyber-btn btn-ghost" style="font-size: 1.05rem; padding: 16px 28px;" onclick="document.getElementById('menu-summary-section').scrollIntoView({behavior:'smooth'})">
              <span>📜</span> RINGKASAN MENU MISI
            </button>
          </div>

          <!-- ========================================================
               KAPABILITAS SISTEM PERTAHANAN SIBER (PROFESSIONAL SHOWCASE)
               ======================================================== -->
          <div class="account-test-console" style="border-color: var(--border-cyan); margin-top: 36px;">
            <div class="account-test-header">
              <div style="display:flex; align-items:center; gap: 10px;">
                <span style="font-size: 1.5rem;">🛡️</span>
                <div>
                  <h3 style="font-size: 1.25rem; color: var(--text-highlight); letter-spacing: 1px;">
                    ARSITEKTUR PERTAHANAN ZERO-TRUST
                  </h3>
                  <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-cyan);">
                    STANDAR EDUKASI & SIMULASI REKAYASA SOSIAL INDONESIA
                  </div>
                </div>
              </div>
              <div class="cyber-tag tag-green">
                SISTEM SIAP DIGUNAKAN
              </div>
            </div>

            <div class="edu-grid-cards" style="margin: 10px 0;">
              <div class="edu-card">
                <div class="card-icon">🎮</div>
                <h4 style="color:var(--neon-cyan);">4 Modul Simulasi (Games)</h4>
                <p>Kasus Multi-POV, Finding Diff, Criminal Case, dan AI Analyzer untuk melatih ketajaman deteksi penipuan siber.</p>
              </div>
              <div class="edu-card">
                <div class="card-icon">🛡️</div>
                <h4 style="color:var(--neon-magenta);">Detektor Cerdas Hibrida</h4>
                <p>Link Scanner dan Legit Checker bertenaga Rule Heuristics + Google Gemini AI Cloud untuk validasi multi-ancaman.</p>
              </div>
              <div class="edu-card">
                <div class="card-icon">📚</div>
                <h4 style="color:var(--neon-green);">Pusat Edukasi Interaktif</h4>
                <p>Panduan lengkap mitigasi rekayasa sosial, etika digital, dan langkah respon darurat dengan antarmuka navigasi sidebar.</p>
              </div>
              <div class="edu-card">
                <div class="card-icon">🏆</div>
                <h4 style="color:var(--neon-amber);">Live Leaderboard</h4>
                <p>Pemantauan skor per game dan total XP secara real-time tanpa refresh untuk kompetisi kompetensi siber sehat.</p>
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

            <!-- 4. ANALYZER -->
            <div class="menu-summary-card" onclick="window.welcomeInteractive.openMenuSummary('deeplearn')">
              <div>
                <div class="menu-summary-badge-bar">
                  <span class="cyber-tag">MODUL 4</span>
                  <span class="cyber-tag tag-green">HYBRID AI EVALUATION</span>
                </div>
                <div class="menu-summary-icon">🧠</div>
                <h4 style="font-size: 1.15rem; color: var(--text-highlight); margin-bottom: 6px;">ANALYZER (AI EVALUATOR)</h4>
                <p class="menu-summary-teaser">
                  Evaluasi kritis ancaman Zero-Day di mana penalaran tertulis Anda dievaluasi secara mendalam oleh Google Gemini AI dan Neural Matrix Know Your Scam.
                </p>
              </div>
              <div class="menu-summary-inspect-link">
                <span>🔍</span> BACA RINGKASAN PROTOKOL ➔
              </div>
            </div>

            <!-- 5. LINK SCANNER -->
            <div class="menu-summary-card" onclick="window.welcomeInteractive.openMenuSummary('scanner')">
              <div>
                <div class="menu-summary-badge-bar">
                  <span class="cyber-tag">DETEKTOR 1</span>
                  <span class="cyber-tag">SECURITY UTILITY</span>
                </div>
                <div class="menu-summary-icon">🔗</div>
                <h4 style="font-size: 1.15rem; color: var(--text-highlight); margin-bottom: 6px;">NEWS & LINK SCANNER</h4>
                <p class="menu-summary-teaser">
                  Utilitas pemindaian keabsahan URL dan teks berita dengan skor kerentanan neon 1–10, transparansi pemrosesan AI, dan petunjuk keamanan interaktif.
                </p>
              </div>
              <div class="menu-summary-inspect-link">
                <span>🔍</span> BACA RINGKASAN PROTOKOL ➔
              </div>
            </div>

            <!-- 6. LEGIT CHECKER -->
            <div class="menu-summary-card" onclick="window.welcomeInteractive.openMenuSummary('checker')">
              <div>
                <div class="menu-summary-badge-bar">
                  <span class="cyber-tag">DETEKTOR 2</span>
                  <span class="cyber-tag tag-magenta">OMNI-THREAT AI</span>
                </div>
                <div class="menu-summary-icon">🛡️</div>
                <h4 style="font-size: 1.15rem; color: var(--text-highlight); margin-bottom: 6px;">LEGIT CHECKER</h4>
                <p class="menu-summary-teaser">
                  Pusat validasi keaslian multi-vektor untuk menguji chat love scam, hoax viral, tawaran kerja bodong, investasi palsu, hingga malware APK dengan arsitektur hybrid.
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

      <!-- ========================================================
           PAGE: GAMES HUB (PUSAT SIMULASI GIM TAKTIS)
           ======================================================== -->
      <section id="page-games" class="page-view">
        <div class="holo-enter">
          <div style="text-align: center; margin-bottom: 24px;">
            <span class="cyber-tag tag-cyan" style="font-size: 0.82rem; padding: 6px 16px;">
              PUSAT MISI PERTAHANAN SIBER
            </span>
            <h2 style="font-size: 1.85rem; color: var(--text-highlight); margin: 8px 0;">
              PILIH MODUL SIMULASI TAKTIS (GAMES)
            </h2>
            <p style="font-size: 0.95rem; color: var(--text-muted); max-width: 700px; margin: 0 auto;">
              Pilih salah satu arena simulasi di bawah untuk mengasah naluri deteksi penipuan siber Anda. Skor dari setiap permainan dihitung secara real-time dan terakumulasi ke Leaderboard Global.
            </p>
          </div>

          <div class="games-hub-grid">
            <!-- Game 1: Kasus -->
            <div class="game-hub-card">
              <div>
                <div class="game-hub-badge">MODUL 1 // MULTI-POV</div>
                <h3 class="game-hub-title">📜 Kasus Simulasi</h3>
                <p class="game-hub-desc">
                  Simulasi interaktif berganti sudut pandang antara Korban dan Pemburu Ancaman. Pecahkan kasus phishing, love scam, dan job scam dengan pilihan respon mitigasi taktis.
                </p>
              </div>
              <div>
                <button class="cyber-btn" style="width:100%; font-size:0.92rem; padding:12px;" onclick="window.app.navigateTo('kasus')">
                  <span>⚡</span> MAINKAN KASUS ➔
                </button>
              </div>
            </div>

            <!-- Game 2: Finding Diff -->
            <div class="game-hub-card">
              <div>
                <div class="game-hub-badge">MODUL 2 // JUDGE REAL VS FAKE</div>
                <h3 class="game-hub-title">⚖️ Finding Diff</h3>
                <p class="game-hub-desc">
                  Uji ketelitian visual Anda sebagai Hakim Siber membandingkan dua dokumen/situs web berdampingan dengan lensa pembesar (Zoom Lens) untuk menentukan Real vs Fake.
                </p>
              </div>
              <div>
                <button class="cyber-btn" style="width:100%; font-size:0.92rem; padding:12px;" onclick="window.app.navigateTo('diff')">
                  <span>⚡</span> MAINKAN FINDING DIFF ➔
                </button>
              </div>
            </div>

            <!-- Game 3: Criminal Case -->
            <div class="game-hub-card card-magenta">
              <div>
                <div class="game-hub-badge" style="color:var(--neon-magenta); background:rgba(189,0,255,0.1);">MODUL 3 // FORENSIC PUZZLE</div>
                <h3 class="game-hub-title">🕵️ Criminal Case</h3>
                <p class="game-hub-desc">
                  Teka-teki investigasi sindikat siber drag-and-drop. Analisis log server, rekening penampung, dan taktik penipuan sebelum batas waktu panik habis.
                </p>
              </div>
              <div>
                <button class="cyber-btn btn-magenta" style="width:100%; font-size:0.92rem; padding:12px;" onclick="window.app.navigateTo('criminal')">
                  <span>⚡</span> MULAI INVESTIGASI ➔
                </button>
              </div>
            </div>

            <!-- Game 4: Analyzer -->
            <div class="game-hub-card">
              <div>
                <div class="game-hub-badge" style="color:var(--neon-green); background:rgba(0,255,136,0.1);">MODUL 4 // HYBRID AI EVALUATOR</div>
                <h3 class="game-hub-title">🧠 AI Analyzer</h3>
                <p class="game-hub-desc">
                  Tuliskan penalaran kritis Anda terhadap ancaman Zero-Day. Evaluator AI (Google Gemini Cloud + Neural Core) akan membaca dan mengulas kualitas analisis Anda.
                </p>
              </div>
              <div>
                <button class="cyber-btn" style="width:100%; font-size:0.92rem; padding:12px;" onclick="window.app.navigateTo('deeplearn')">
                  <span>⚡</span> BUKA ANALYZER ➔
                </button>
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

      <!-- PAGE 5: MODUL 4 - ANALYZER -->
      <section id="page-deeplearn" class="page-view">
        <div class="sub-hud-bar">
          <div class="sub-hud-left">
            <span style="font-size: 1.5rem;">🧠</span>
            <div class="sub-hud-title">PROTOKOL ANALYZER: EVALUASI SEMANTIK AI</div>
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
        <!-- Unified Detector Sub-Navigation Tabs -->
        <div class="detector-tab-bar" style="display:flex; gap:10px; margin-bottom:18px; border-bottom:1px solid var(--border-cyan); padding-bottom:12px;">
          <a href="#scanner" class="cyber-btn" id="det-tab-scanner" style="padding: 8px 20px; font-size: 0.85rem;"><span>🔗</span> LINK SCANNER</a>
          <a href="#checker" class="cyber-btn btn-ghost" id="det-tab-checker" style="padding: 8px 20px; font-size: 0.85rem;"><span>🛡️</span> LEGIT CHECKER</a>
        </div>

        <div class="sub-hud-bar">
          <div class="sub-hud-left">
            <span style="font-size: 1.5rem;">🔗</span>
            <div class="sub-hud-title">LINK & NEWS SCANNER (HYBRID DETECTOR)</div>
          </div>
          <div class="sub-hud-right">
            <button class="btn-intel-hint" onclick="window.hintSystem.openHintModal()">
              <span>💡</span> MINTA INTEL / HINT
            </button>
          </div>
        </div>
        <div id="scanner-module-container"></div>
      </section>

      <!-- PAGE 7: MODUL 6 - LEGIT CHECKER -->
      <section id="page-checker" class="page-view">
        <!-- Unified Detector Sub-Navigation Tabs -->
        <div class="detector-tab-bar" style="display:flex; gap:10px; margin-bottom:18px; border-bottom:1px solid var(--border-cyan); padding-bottom:12px;">
          <a href="#scanner" class="cyber-btn btn-ghost" id="det-tab-scanner-alt" style="padding: 8px 20px; font-size: 0.85rem;"><span>🔗</span> LINK SCANNER</a>
          <a href="#checker" class="cyber-btn" id="det-tab-checker-alt" style="padding: 8px 20px; font-size: 0.85rem;"><span>🛡️</span> LEGIT CHECKER</a>
        </div>

        <div class="sub-hud-bar">
          <div class="sub-hud-left">
            <span style="font-size: 1.5rem;">🛡️</span>
            <div class="sub-hud-title">LEGIT CHECKER: VALIDASI KEASLIAN MULTI-ANCAMAN</div>
          </div>
          <div class="sub-hud-right">
            <button class="btn-intel-hint" onclick="window.hintSystem.openHintModal()">
              <span>💡</span> MINTA INTEL / HINT
            </button>
          </div>
        </div>
        <div id="checker-module-container"></div>
      </section>

      <!-- PAGE: EDUKASI (W3SCHOOLS STYLE SIDEBAR HUB) -->
      <section id="page-edukasi" class="page-view">
        <div id="edukasi-container"></div>
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
      <!-- Modal Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 18px; border-bottom: 1px solid rgba(0,243,255,0.2); padding-bottom: 12px;">
        <div style="display:flex; align-items:center; gap: 12px;">
          <div style="font-size: 2rem;">🛡️</div>
          <div>
            <span class="cyber-tag tag-cyan">GATEWAY OTENTIKASI SIBER</span>
            <h3 style="font-size: 1.35rem; color: var(--text-highlight); margin-top: 4px;">KNOW YOUR SCAM DEFENSE</h3>
          </div>
        </div>
        <button class="modal-close-btn" onclick="window.authManager.closeLoginModal()" style="background:none; border:none; color:var(--text-muted); font-size:1.6rem; cursor:pointer; line-height:1;">&times;</button>
      </div>

      <!-- Professional Cyber Tabs: MASUK (LOGIN) vs DAFTAR AKUN (REGISTER) -->
      <div style="display:flex; gap: 10px; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px;">
        <button type="button" id="tab-btn-login" class="cyber-btn active" style="flex:1; padding: 10px; font-size: 0.9rem;" onclick="window.authManager.switchTab('login')">
          <span>🔑</span> MASUK (LOGIN)
        </button>
        <button type="button" id="tab-btn-register" class="cyber-btn btn-ghost" style="flex:1; padding: 10px; font-size: 0.9rem;" onclick="window.authManager.switchTab('register')">
          <span>⚡</span> DAFTAR AKUN BARU
        </button>
      </div>

      <!-- Feedback Alerts -->
      <div id="auth-form-success" style="display:none; background:rgba(0,255,136,0.15); border:1px solid var(--neon-green); border-radius:4px; padding:10px 14px; margin-bottom:14px; font-size:0.85rem; color:var(--neon-green);"></div>
      <div id="auth-form-error" style="display:none; background:rgba(255,0,85,0.15); border:1px solid var(--neon-red); border-radius:4px; padding:10px 14px; margin-bottom:14px; font-size:0.85rem; color:var(--neon-red);"></div>

      <!-- FORM 1: MASUK (LOGIN) -->
      <form id="auth-manual-form" onsubmit="window.authManager.handleFormSubmit(event)">
        <div style="margin-bottom: 14px;">
          <label style="display:block; font-family:var(--font-display); font-size:0.8rem; color:var(--text-muted); margin-bottom:6px;">USERNAME SIBER</label>
          <input type="text" id="auth-input-username" class="cyber-input" placeholder="Masukkan username Anda" style="width:100%; padding:10px 14px; font-family:var(--font-mono); font-size:0.9rem;" required autocomplete="username">
        </div>

        <div style="margin-bottom: 20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label style="font-family:var(--font-display); font-size:0.8rem; color:var(--text-muted);">SANDI / PASSWORD</label>
            <span style="font-size:0.72rem; color:var(--neon-cyan); cursor:pointer;" onclick="window.authManager.togglePasswordVisibility('auth-input-password')">👁️ Tampilkan Sandi</span>
          </div>
          <input type="password" id="auth-input-password" class="cyber-input" placeholder="Masukkan sandi Anda" style="width:100%; padding:10px 14px; font-family:var(--font-mono); font-size:0.9rem;" required autocomplete="current-password">
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button type="button" class="cyber-btn btn-ghost" onclick="window.authManager.switchTab('register')" style="font-size:0.8rem; padding:8px 14px;">
            Belum punya akun? Daftar
          </button>
          <div style="display:flex; gap:10px;">
            <button type="button" class="cyber-btn btn-ghost" onclick="window.authManager.closeLoginModal()">
              BATAL
            </button>
            <button type="submit" id="btn-submit-login" class="cyber-btn" style="padding:10px 24px; font-size:0.95rem;">
              <span>⚡</span> OTENTIKASI & MASUK MISI
            </button>
          </div>
        </div>
      </form>

      <!-- FORM 2: DAFTAR AKUN BARU (REGISTER) -->
      <form id="auth-register-form" style="display:none;" onsubmit="window.authManager.handleRegisterSubmit(event)">
        <div style="margin-bottom: 14px;">
          <label style="display:block; font-family:var(--font-display); font-size:0.8rem; color:var(--text-muted); margin-bottom:6px;">NAMA LENGKAP PROFIL</label>
          <input type="text" id="reg-input-name" class="cyber-input" placeholder="Contoh: Aris Setiawan" style="width:100%; padding:10px 14px; font-family:var(--font-mono); font-size:0.9rem;" required>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
          <div>
            <label style="display:block; font-family:var(--font-display); font-size:0.8rem; color:var(--text-muted); margin-bottom:6px;">USERNAME SIBER</label>
            <input type="text" id="reg-input-username" class="cyber-input" placeholder="contoh: aris_cyber" style="width:100%; padding:10px 14px; font-family:var(--font-mono); font-size:0.9rem;" required autocomplete="username">
          </div>
          <div>
            <label style="display:block; font-family:var(--font-display); font-size:0.8rem; color:var(--text-muted); margin-bottom:6px;">EMAIL (OPSIONAL)</label>
            <input type="email" id="reg-input-email" class="cyber-input" placeholder="contoh: aris@email.com" style="width:100%; padding:10px 14px; font-family:var(--font-mono); font-size:0.9rem;">
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <label style="font-family:var(--font-display); font-size:0.8rem; color:var(--text-muted);">SANDI BARU</label>
              <span style="font-size:0.7rem; color:var(--neon-cyan); cursor:pointer;" onclick="window.authManager.togglePasswordVisibility('reg-input-password')">👁️</span>
            </div>
            <input type="password" id="reg-input-password" class="cyber-input" placeholder="Minimal 6 karakter" style="width:100%; padding:10px 14px; font-family:var(--font-mono); font-size:0.9rem;" required autocomplete="new-password">
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <label style="font-family:var(--font-display); font-size:0.8rem; color:var(--text-muted);">KONFIRMASI SANDI</label>
              <span style="font-size:0.7rem; color:var(--neon-cyan); cursor:pointer;" onclick="window.authManager.togglePasswordVisibility('reg-input-password-confirm')">👁️</span>
            </div>
            <input type="password" id="reg-input-password-confirm" class="cyber-input" placeholder="Ulangi sandi" style="width:100%; padding:10px 14px; font-family:var(--font-mono); font-size:0.9rem;" required autocomplete="new-password">
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button type="button" class="cyber-btn btn-ghost" onclick="window.authManager.switchTab('login')" style="font-size:0.8rem; padding:8px 14px;">
            Sudah punya akun? Masuk
          </button>
          <div style="display:flex; gap:10px;">
            <button type="button" class="cyber-btn btn-ghost" onclick="window.authManager.closeLoginModal()">
              BATAL
            </button>
            <button type="submit" id="btn-submit-register" class="cyber-btn btn-green" style="padding:10px 24px; font-size:0.95rem;">
              <span>⚡</span> DAFTAR & AKTIFKAN AKUN
            </button>
          </div>
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
      cases_checker: {!! json_encode($casesChecker) !!},
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
  <script src="{{ asset('js/game-briefing.js') }}"></script>
  <script src="{{ asset('js/auth.js') }}"></script>
  <script src="{{ asset('js/welcome-interactive.js') }}"></script>
  <script src="{{ asset('js/module-edukasi.js') }}"></script>
  <script src="{{ asset('js/leaderboard.js') }}"></script>
  <script src="{{ asset('js/admin.js') }}"></script>

  <!-- Game Modules -->
  <script src="{{ asset('js/games/module-kasus.js') }}"></script>
  <script src="{{ asset('js/games/module-diff.js') }}"></script>
  <script src="{{ asset('js/games/module-criminal.js') }}"></script>
  <script src="{{ asset('js/games/module-deeplearn.js') }}"></script>
  <script src="{{ asset('js/games/module-scanner.js') }}"></script>
  <script src="{{ asset('js/games/module-checker.js') }}"></script>

  <!-- Application Main Controller -->
  <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
