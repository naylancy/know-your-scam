/**
 * KNOW YOUR SCAM: ANTI-GRAVITY CYBER DEFENSE
 * Modul Edukasi Interaktif (W3Schools-Style Sidebar Navigation)
 * Panduan komprehensif mengenali penipuan, mengambil keputusan aman, & perlindungan digital
 */

(function() {
  'use strict';

  const topicsData = [
    // ========================================================
    // SUBBAB 1: PENDAHULUAN & PRINSIP SIBER
    // ========================================================
    {
      id: 'intro',
      category: '1. PENDAHULUAN',
      title: 'Lanskap Ancaman Siber Modern',
      readingTime: '3 menit',
      badge: 'Dasar',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-cyan">SUBBAB 1 // PENDAHULUAN: LANSKAP ANCAMAN</span>
            <h2>Lanskap Ancaman Siber & Rekayasa Sosial Modern</h2>
            <p class="edu-lead">Di era transformasi digital saat ini, pintu masuk terbesar peretasan bukan lagi celah teknis server, melainkan celah psikologis manusia (<em>human vulnerability</em>).</p>
          </div>

          <div class="edu-section">
            <h3>Mengapa Penipuan Digital Kian Marak?</h3>
            <p>Sindikat kejahatan siber modern telah bertransformasi dari sekadar peretas individu menjadi organisasi profesional. Mereka menggunakan teknologi mutakhir, kecerdasan buatan (AI generatif), dan riset profil korban (<em>open source intelligence / OSINT</em>) untuk merancang serangan yang sangat meyakinkan.</p>
            
            <div class="w3-info-box">
              <h4>💡 Fakta Keamanan Siber:</h4>
              <p>Lebih dari <strong>88% insiden kebocoran data dan pembobolan rekening</strong> di seluruh dunia bermula dari teknik <em>Social Engineering</em> (rekayasa sosial), di mana korban dimanipulasi agar secara sadar memberikan akses atau mengirimkan uang kepada pelaku.</p>
            </div>
          </div>

          <div class="edu-section">
            <h3>Tiga Sasaran Utama Kejahatan Digital:</h3>
            <div class="edu-grid-cards">
              <div class="edu-card">
                <div class="card-icon">💰</div>
                <h4>Aset Finansial</h4>
                <p>Pengurasan saldo rekening, pinjaman online ilegal atas nama korban, dan pencurian saldo dompet digital (e-wallet).</p>
              </div>
              <div class="edu-card">
                <div class="card-icon">🔑</div>
                <h4>Kredensial & Identitas</h4>
                <p>Pencurian data KTP, PIN ATM, Password akun, dan kode OTP rahasia untuk pengambilalihan akun (<em>account takeover</em>).</p>
              </div>
              <div class="edu-card">
                <div class="card-icon">📱</div>
                <h4>Kendali Perangkat</h4>
                <p>Penyusupan malware spyware untuk menyadap SMS perbankan, riwayat chat, dan memata-matai kamera korban.</p>
              </div>
            </div>
          </div>

          <div class="edu-section">
            <div class="w3-quiz-card">
              <div class="quiz-badge">KUIS KILAT INTELIJEN</div>
              <h4>Apa target manipulasi utama pada teknik Social Engineering?</h4>
              <div class="quiz-options">
                <button class="quiz-opt" onclick="window.edukasiManager.answerQuiz(this, false)">A. Kerusakan fisik kabel fiber optik</button>
                <button class="quiz-opt" onclick="window.edukasiManager.answerQuiz(this, true)">B. Manipulasi emosi dan psikologi manusia (rasa panik/serakah)</button>
                <button class="quiz-opt" onclick="window.edukasiManager.answerQuiz(this, false)">C. Memperbaiki sistem operasi komputer otomatis</button>
              </div>
              <div class="quiz-feedback"></div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 'zero-trust',
      category: '1. PENDAHULUAN',
      title: 'Prinsip Zero-Trust & "3-Second Rule"',
      readingTime: '4 menit',
      badge: 'Mindset',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-cyan">SUBBAB 1 // MINDSET: PRINSIP ZERO-TRUST</span>
            <h2>Prinsip Zero-Trust Digital & "3-Second Rule"</h2>
            <p class="edu-lead">Aturan emas pertahanan siber: <em>"Never Trust, Always Verify"</em> (Jangan Pernah Percaya, Selalu Verifikasi).</p>
          </div>

          <div class="edu-section">
            <h3>Apa itu Paradigma Zero-Trust?</h3>
            <p>Zero-Trust adalah filosofi keamanan di mana Anda tidak langsung mempercayai pesan, telepon, atau tautan apapun—bahkan jika pesan tersebut tampak berasal dari teman akrab, nomor instansi resmi, atau logo bank ternama.</p>
            <p>Di dunia digital, identitas pengirim (Caller ID, foto profil, nama pengirim email) sangat mudah dipalsukan (<em>spoofed</em>).</p>
          </div>

          <div class="edu-section">
            <h3>Metode Pertahanan "3-Second Rule"</h3>
            <p>Penipu siber selalu mengandalkan <strong>keputusan impulsif</strong>. Mereka memicu emosi tinggi: rasa panik (akun diblokir!), rasa takut (surat tilang/polisi!), atau rasa serakah (menang undian 100 juta!).</p>
            
            <div class="w3-danger-box">
              <h4>🛑 Praktikkan 3-Second Rule:</h4>
              <ol style="margin-left: 20px; line-height: 1.8;">
                <li><strong>Detik 1 (Stop):</strong> Lepaskan jari Anda dari tombol klik atau layar ponsel. Jangan langsung bereaksi.</li>
                <li><strong>Detik 2 (Breathe & Analyze):</strong> Sadari emosi Anda. Apakah pesan ini memaksa Anda bertindak cepat dalam hitungan menit? Mengapa meminta data rahasia?</li>
                <li><strong>Detik 3 (Verify Separately):</strong> Tutup pesan tersebut. Buka saluran komunikasi resmi terpisah (Out-of-Band) untuk memastikan kebenarannya.</li>
              </ol>
            </div>
          </div>

          <div class="edu-section">
            <div class="w3-quiz-card">
              <div class="quiz-badge">KUIS KILAT INTELIJEN</div>
              <h4>Apa yang harus dilakukan saat menerima pesan WhatsApp darurat bertuliskan "Rekening Anda akan diblokir dalam 15 menit"?</h4>
              <div class="quiz-options">
                <button class="quiz-opt" onclick="window.edukasiManager.answerQuiz(this, false)">A. Langsung klik tautan di pesan agar rekening tidak diblokir</button>
                <button class="quiz-opt" onclick="window.edukasiManager.answerQuiz(this, true)">B. Terapkan 3-Second Rule, abaikan tautan, dan telepon Call Center resmi bank</button>
                <button class="quiz-opt" onclick="window.edukasiManager.answerQuiz(this, false)">C. Kirimkan foto KTP dan nomor kartu ATM sebagai bukti kepemilikan</button>
              </div>
              <div class="quiz-feedback"></div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 'psychology',
      category: '1. PENDAHULUAN',
      title: 'Psikologi Manipulasi Emosi Korban',
      readingTime: '4 menit',
      badge: 'Psikologi',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-cyan">SUBBAB 1 // PSIKOLOGI: TRIGGER EMOSI KORBAN</span>
            <h2>Psikologi Rekayasa Sosial & Trigger Emosi Korban</h2>
            <p class="edu-lead">Membedah senjata psikologis yang digunakan pelaku: Kepanikan, Otoritas Semu, dan Keserakahan.</p>
          </div>

          <div class="edu-section">
            <h3>Tiga Tuas Emosi Utama (The Psychological Levers):</h3>
            <div class="edu-grid-cards">
              <div class="edu-card">
                <div class="card-icon">⏳</div>
                <h4>Sense of Urgency (Tekanan Waktu)</h4>
                <p>Pelaku memberikan tenggat waktu sempit (contoh: <em>"Harus dalam 10 menit atau akun ditutup permanen"</em>) agar rasionalitas logika Anda padam.</p>
              </div>
              <div class="edu-card">
                <div class="card-icon">👮</div>
                <h4>Appeal to Authority (Otoritas Palsu)</h4>
                <p>Mengaku sebagai polisi, kejaksaan, audit perbankan, atau atasan perusahaan untuk menekan rasa takut melanggar aturan.</p>
              </div>
              <div class="edu-card">
                <div class="card-icon">💎</div>
                <h4>Greed & Excitement (Keserakahan)</h4>
                <p>Menawarkan keuntungan di luar akal sehat (hadiah mobil, deviden 50% per hari) yang memicu hormon dopamin dan mengaburkan risiko.</p>
              </div>
            </div>
          </div>

          <div class="edu-section">
            <div class="w3-info-box">
              <h4>🧠 Tips Nalar Pertahanan Diri:</h4>
              <p>Setiap kali Anda merasakan detak jantung berdegup kencang karena sebuah pesan (baik karena takut atau terlalu gembira), <strong>itu adalah sinyal merah nomor 1</strong> bahwa Anda sedang diarahkan ke skenario penipuan.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 'threat-vectors',
      category: '1. PENDAHULUAN',
      title: 'Anatomi Vektor Serangan & Target Kritis',
      readingTime: '4 menit',
      badge: 'Intelijen',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-cyan">SUBBAB 1 // INTELIJEN: VEKTOR SERANGAN SIBER</span>
            <h2>Anatomi Vektor Serangan & Target Kritis Siber</h2>
            <p class="edu-lead">Memahami pintu masuk serangan digital dari sudut pandang penyerang siber profesional.</p>
          </div>

          <div class="edu-section">
            <h3>4 Pintu Masuk Penetrasi Siber:</h3>
            <ul class="edu-checklist">
              <li><strong>Komunikasi Pesan Instan (WhatsApp / Telegram):</strong> Transmisi dokumen APK berbahaya, tautan tiruan, dan nomor virtual tak terdaftar.</li>
              <li><strong>Email Korporat / Pribadi (Business Email Compromise):</strong> Faktur penipuan, email instruksi transfer dari akun pimpinan yang diretas.</li>
              <li><strong>Jaringan Telepon Suara (Vishing):</strong> Panggilan mengatasnamakan divisi verifikasi bank meminta kode OTP atau aktivasi token.</li>
              <li><strong>Media Sosial & Iklan Berbayar:</strong> Iklan lowongan kerja fiktif dengan gaji fantastis di Instagram/TikTok yang mengarah ke bot scam.</li>
            </ul>
          </div>
        </div>
      `
    },

    // ========================================================
    // SUBBAB 2: ANATOMI PENIPUAN SIBER
    // ========================================================
    {
      id: 'phishing',
      category: '2. ANATOMI PENIPUAN',
      title: 'Phishing & Typosquatting Domain',
      readingTime: '5 menit',
      badge: 'Kritis',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-magenta">SUBBAB 2 // ANATOMI: PHISHING & SPOOFING</span>
            <h2>Phishing & Typosquatting Domain</h2>
            <p class="edu-lead">Mengenali situs web palsu yang didesain 99% mirip aslinya untuk menjebak kredensial login Anda.</p>
          </div>

          <div class="edu-section">
            <h3>Bagaimana Phishing Bekerja?</h3>
            <p>Pelaku menduplikasi antarmuka website perbankan, e-commerce, atau media sosial. Korban yang diarahkan ke situs tiruan ini tanpa sadar mengetikkan username, password, nomor kartu ATM, dan kode OTP. Data tersebut langsung terkirim ke server pelaku.</p>

            <div class="w3-code-box">
              <div class="code-title">🔍 CONTOH PERBANDINGAN DOMAIN TYPOSQUATTING:</div>
              <div style="font-family: var(--font-mono); font-size: 0.88rem; line-height: 1.8;">
                <div style="color: var(--neon-green);">✓ DOMAIN ASLI: &nbsp;&nbsp;https://klikbca.com / https://bca.co.id</div>
                <div style="color: var(--neon-red);">✗ DOMAIN PALSU: &nbsp;https://klikbca-update-tarif.net</div>
                <div style="color: var(--neon-red);">✗ DOMAIN PALSU: &nbsp;https://bca-perubahan-biaya.site/login.php</div>
                <div style="color: var(--neon-red);">✗ DOMAIN PALSU: &nbsp;http://185.220.101.5/klikbca</div>
              </div>
            </div>
          </div>

          <div class="edu-section">
            <h3>Ciri Khas URL Phishing:</h3>
            <ul class="edu-checklist">
              <li><strong>Ekstensi Domain Asing:</strong> Menggunakan domain gratis atau murah seperti <code>.xyz</code>, <code>.top</code>, <code>.site</code>, <code>.tk</code>, bukan domain korporat resmi seperti <code>.co.id</code> atau <code>.go.id</code>.</li>
              <li><strong>Subdomain Menipu:</strong> Menempatkan nama bank di awal, padahal domain utamanya berbeda, contoh: <code>bca.co.id.login-verifikasi.xyz</code> (domain aslinya adalah <em>login-verifikasi.xyz</em>, bukan BCA!).</li>
              <li><strong>Penggunaan Alamat IP Langsung:</strong> Tautan berupa deretan angka seperti <code>http://192.168.1.1/update</code> tanpa nama domain.</li>
              <li><strong>Protokol HTTP Tanpa SSL:</strong> Tidak memiliki sertifikat gembok enkripsi HTTPS.</li>
            </ul>
          </div>

          <div class="edu-section">
            <div class="w3-quiz-card">
              <div class="quiz-badge">KUIS KILAT INTELIJEN</div>
              <h4>Manakah di antara tautan berikut yang merupakan domain resmi perbankan BCA?</h4>
              <div class="quiz-options">
                <button class="quiz-opt" onclick="window.edukasiManager.answerQuiz(this, false)">A. https://klikbca-promo-tarifterbaru.com</button>
                <button class="quiz-opt" onclick="window.edukasiManager.answerQuiz(this, true)">B. https://www.klikbca.com</button>
                <button class="quiz-opt" onclick="window.edukasiManager.answerQuiz(this, false)">C. http://bca-layanan-nasabah.xyz/update</button>
              </div>
              <div class="quiz-feedback"></div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 'apk-malware',
      category: '2. ANATOMI PENIPUAN',
      title: 'Modus APK Malware (Surat Tilang/Undangan)',
      readingTime: '5 menit',
      badge: 'Sangat Berbahaya',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-red">SUBBAB 2 // ANATOMI: MALWARE & SMISHING</span>
            <h2>Modus Berkas APK Malware & Smishing</h2>
            <p class="edu-lead">Bahaya pencurian data dan penyadapan SMS melalui pengiriman file aplikasi Android (.APK) terselubung.</p>
          </div>

          <div class="edu-section">
            <h3>Modus Operandi:</h3>
            <p>Korban menerima pesan WhatsApp dari nomor asing yang mengaku sebagai pihak resmi, kurir paket, atau kepolisian. Pelaku menyertakan file berekstensi <code>.apk</code> dengan nama yang dirancang memancing klik:</p>
            
            <div class="edu-grid-cards">
              <div class="edu-card">
                <div class="card-icon">📬</div>
                <h4>Foto Resi Paket / Kurir</h4>
                <p>Nama file: <code>LIHAT_FOTO_PAKET.apk</code>. Korban mengira sedang melihat resi pengiriman paket belanja.</p>
              </div>
              <div class="edu-card">
                <div class="card-icon">💌</div>
                <h4>Surat Undangan Pernikahan</h4>
                <p>Nama file: <code>Surat_Undangan_Digital.apk</code>. Memanfaatkan rasa penasaran dan etika sosial korban.</p>
              </div>
              <div class="edu-card">
                <div class="card-icon">🚓</div>
                <h4>Konfirmasi Surat Tilang</h4>
                <p>Nama file: <code>Surat_Tilang_ETLE_Polri.apk</code>. Memanfaatkan rasa panik didenda tilang elektronik kepolisian.</p>
              </div>
            </div>
          </div>

          <div class="edu-section">
            <h3>Apa yang Terjadi Jika APK Diinstal?</h3>
            <p>APK tersebut meminta izin sensitif (Permissions):</p>
            <div class="w3-danger-box">
              <p>🔴 <strong>RECEIVE_SMS & READ_SMS:</strong> Aplikasi diam-diam menyadap SMS yang masuk ke ponsel korban.</p>
              <p>🔴 <strong>FORWARD_SMS:</strong> Saat bank mengirimkan kode OTP untuk transfer dana, malware langsung meneruskannya ke bot Telegram pelaku tanpa sepengetahuan korban.</p>
              <p>🔴 <strong>ACCESSIBILITY_SERVICE:</strong> Mengambil alih layar ponsel dan mengeksekusi klik otomatis.</p>
            </div>
          </div>

          <div class="edu-section">
            <h3>Langkah Pencegahan Mutlak:</h3>
            <ul class="edu-checklist">
              <li><strong>JANGAN PERNAH</strong> menginstal file berekstensi <code>.apk</code> yang dikirim melalui WhatsApp atau Telegram.</li>
              <li>Unduh aplikasi HANYA dari toko aplikasi resmi (Google Play Store atau Apple App Store).</li>
              <li>Periksa pengaturan ponsel Anda: Pastikan opsi <em>"Install unknown apps"</em> atau <em>"Sumber Tidak Dikenal"</em> dalam kondisi <strong>NONAKTIF</strong>.</li>
            </ul>
          </div>
        </div>
      `
    },
    {
      id: 'love-scam',
      category: '2. ANATOMI PENIPUAN',
      title: 'Love Scam / Romance Fraud',
      readingTime: '4 menit',
      badge: 'Psikologis',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-magenta">SUBBAB 2 // ANATOMI: ROMANCE SCAM</span>
            <h2>Romance Scam (Penipuan Berkedok Asmara)</h2>
            <p class="edu-lead">Eksploitasi ikatan emosional dan asmara daring yang berujung pada kerugian finansial ratusan juta rupiah.</p>
          </div>

          <div class="edu-section">
            <h3>Pola Serangan (The Playbook):</h3>
            <ol style="margin-left: 20px; line-height: 1.8;">
              <li><strong>Penciptaan Profil Impian:</strong> Pelaku menggunakan foto curian pria/wanita berparas rupawan, berprofesi bergengsi (pilot, dokter militer di luar negeri, pengusaha migas).</li>
              <li><strong>Love Bombing:</strong> Menghujani korban dengan perhatian intens, kasih sayang, dan janji pernikahan dalam waktu singkat.</li>
              <li><strong>Krisis Finansial Palsu:</strong> Setelah korban terpikat, pelaku tiba-tiba mengalami kemalangan palsu: paspor ditahan, kiriman paket emas/hibah tersangkut di bea cukai bandara, atau biaya operasi darurat.</li>
              <li><strong>Permintaan Uang Berkala:</strong> Meminta korban mentransfer uang ke rekening perantara dengan janji akan diganti berlipat ganda.</li>
            </ol>
          </div>

          <div class="edu-section">
            <div class="w3-info-box">
              <h4>🚩 Red Flags Utama Love Scam:</h4>
              <ul style="margin-left: 16px; margin-top: 8px;">
                <li>Menolak panggilan video (video call) dengan berbagai dalih sinyal buruk atau aturan militer.</li>
                <li>Menyatakan cinta sangat cepat padahal belum pernah bertemu langsung.</li>
                <li>Ujung-ujungnya SELALU meminta transfer uang atau investasi mata uang kripto bersama.</li>
              </ul>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 'fake-invest',
      category: '2. ANATOMI PENIPUAN',
      title: 'Investasi Bodong & Pig Butchering',
      readingTime: '5 menit',
      badge: 'Finansial',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-red">SUBBAB 2 // ANATOMI: PIG BUTCHERING</span>
            <h2>Investasi Bodong & Modus "Pig Butchering"</h2>
            <p class="edu-lead">Skema penggemukan dan penyembelihan finansial melalui platform trading atau kripto palsu.</p>
          </div>

          <div class="edu-section">
            <h3>Mengapa Dinamai "Pig Butchering"?</h3>
            <p>Istilah ini berasal dari analogi peternakan: korban "diberi makan" (dibuat untung kecil pada awalnya dan merasa percaya diri) sebelum akhirnya "disembelih" (seluruh modal diserap dan akun dibekukan).</p>
          </div>

          <div class="edu-section">
            <h3>Tahapan Tipuan:</h3>
            <div class="edu-grid-cards">
              <div class="edu-card">
                <h4>1. Umpan Profit Awal</h4>
                <p>Korban diajak mencoba deposit nominal kecil (Rp 500.000). Di aplikasi tampak naik menjadi Rp 800.000 dan berhasil ditarik (<em>withdraw</em>). Korban merasa platform ini terpercaya.</p>
              </div>
              <div class="edu-card">
                <h4>2. Eksploitasi Keserakahan</h4>
                <p>Korban tergiur mendepositkan dana besar: tabungan pensiun atau pinjaman bank senilai puluhan hingga ratusan juta rupiah.</p>
              </div>
              <div class="edu-card">
                <h4>3. Penjebakan Saldo</h4>
                <p>Saat ingin menarik dana, sistem menolak. Pelaku beralasan akun terindikasi pencucian uang dan korban harus membayar "biaya pajak" atau deposit tambahan. Uang korban lenyap total.</p>
              </div>
            </div>
          </div>

          <div class="edu-section">
            <div class="w3-danger-box">
              <h4>Prinsip Keamanan Investasi:</h4>
              <p>1. <strong>Cek Legalitas OJK & Bappebti:</strong> Pastikan entitas terdaftar resmi di situs <a href="https://ojk.go.id" target="_blank" style="color:var(--neon-cyan);">ojk.go.id</a> atau <a href="https://bappebti.go.id" target="_blank" style="color:var(--neon-cyan);">bappebti.go.id</a>.</p>
              <p>2. <strong>Hukum Finansial:</strong> Tidak ada investasi legal di dunia yang dapat menjamin profit pasti di atas 20% per bulan tanpa risiko.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 'vishing',
      category: '2. ANATOMI PENIPUAN',
      title: 'Voice Phishing & Audio AI Deepfake',
      readingTime: '4 menit',
      badge: 'AI Scam',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-magenta">SUBBAB 2 // ANATOMI: VISHING & DEEPFAKE AI</span>
            <h2>Voice Phishing (Vishing) & Rekayasa Audio AI Deepfake</h2>
            <p class="edu-lead">Serangan penipuan suara interaktif menggunakan teknologi kloning suara AI untuk meniru kerabat atau aparat.</p>
          </div>

          <div class="edu-section">
            <h3>Bagaimana Suara Kerabat Bisa Ditiru?</h3>
            <p>Pelaku mengunduh sampel suara calon korban dari video TikTok, Instagram Reels, atau rekaman telepon singkat 3 detik. Menggunakan model AI Voice Cloning mutakhir, pelaku dapat berbicara apa saja dengan suara persis orang yang Anda kenal.</p>
            
            <div class="w3-info-box">
              <h4>🛡️ Protokol Safe Word (Kata Sandi Darurat):</h4>
              <p>Tetapkan satu kata rahasia yang hanya diketahui oleh keluarga inti Anda. Jika menerima telepon darurat minta uang dari anggota keluarga, minta orang tersebut menyebutkan Safe Word keluarga sebelum melakukan tindakan apapun.</p>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 'job-scam',
      category: '2. ANATOMI PENIPUAN',
      title: 'Lowongan Kerja Bodong & Freelance Fiktif',
      readingTime: '4 menit',
      badge: 'Karir',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-amber">SUBBAB 2 // ANATOMI: JOB SCAM & PART-TIME</span>
            <h2>Penipuan Lowongan Kerja & Freelance Fiktif</h2>
            <p class="edu-lead">Modus tugas paruh waktu like & subscribe video YouTube berbayar yang berakhir pada pemerasan deposit.</p>
          </div>

          <div class="edu-section">
            <h3>Pola Modus "Tugas Sederhana":</h3>
            <p>Korban dimasukkan ke grup Telegram dan diminta menyelesaikan tugas sepele (klik like produk e-commerce atau beri bintang 5 di Google Maps) dengan bayaran Rp 20.000 per tugas. Setelah terbukti dibayar, korban diminta menyetor "Deposit Jaminan Misi VIP" senilai jutaan rupiah yang tidak pernah kembali.</p>
            
            <div class="w3-danger-box">
              <h4>Aturan Baku Dunia Kerja:</h4>
              <p>Pemberi kerja yang sah <strong>TIDAK PERNAH</strong> meminta calon karyawan menyetorkan uang untuk jaminan kerja, pembelian seragam fiktif, atau deposit saldo tugas.</p>
            </div>
          </div>
        </div>
      `
    },

    // ========================================================
    // SUBBAB 3: PENGAMBILAN KEPUTUSAN AMAN
    // ========================================================
    {
      id: 'out-of-band',
      category: '3. KEPUTUSAN AMAN',
      title: 'Verifikasi Out-of-Band (Jalur Terpisah)',
      readingTime: '4 menit',
      badge: 'Keahlian Taktis',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-green">SUBBAB 3 // KEPUTUSAN: OUT-OF-BAND VERIFIKASI</span>
            <h2>Verifikasi Out-of-Band (Saluran Terpisah)</h2>
            <p class="edu-lead">Teknik paling ampuh untuk memverifikasi kebenaran informasi tanpa terjebak manipulasi pengirim.</p>
          </div>

          <div class="edu-section">
            <h3>Apa itu Out-of-Band Verification?</h3>
            <p>Verifikasi Out-of-Band berarti melakukan konfirmasi fakta melalui <strong>saluran komunikasi kedua yang sama sekali tidak ada hubungannya</strong> dengan pesan yang Anda terima.</p>
            
            <div class="w3-info-box">
              <h4>Contoh Skenario:</h4>
              <p>Anda menerima WhatsApp dari nomor yang memakai foto profil teman Anda: <em>"Bro, dompet gue ketinggalan, pinjam 1 juta dulu ya darurat banget."</em></p>
              <p><strong>❌ Verifikasi yang SALAH:</strong> Membalas chat WA tersebut dan bertanya: <em>"Beneran ini kamu?"</em> (Tentu saja pelaku yang menjawab akan bilang iya!).</p>
              <p><strong>✅ Verifikasi Out-of-Band yang BENAR:</strong> Ambil ponsel Anda, lakukan panggilan telepon seluler biasa atau hubungi nomor telepon rumah teman tersebut, atau hubungi keluarganya langsung melalui nomor lama yang tersimpan di kontak Anda.</p>
            </div>
          </div>

          <div class="edu-section">
            <h3>Penerapan pada Pesan dari Bank / Perusahaan:</h3>
            <p>Jika Anda menerima email/SMS peringatan dari bank:</p>
            <ol style="margin-left: 20px; line-height: 1.8;">
              <li>JANGAN pernah menekan nomor telepon atau link yang tertera di dalam email tersebut.</li>
              <li>Buka peramban (browser) baru, ketik alamat resmi bank sendiri secara manual, atau balik kartu debit ATM Anda dan hubungi nomor Call Center yang tertera di belakang kartu fisik Anda.</li>
            </ol>
          </div>
        </div>
      `
    },
    {
      id: 'ssl-url',
      category: '3. KEPUTUSAN AMAN',
      title: 'Anatomi URL & Membaca Sertifikat SSL',
      readingTime: '4 menit',
      badge: 'Teknis',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-green">SUBBAB 3 // KEPUTUSAN: ANATOMI URL & SSL</span>
            <h2>Anatomi URL & Membaca Sertifikat SSL</h2>
            <p class="edu-lead">Memahami bagian mana dari tautan web yang menentukan identitas sebenarnya dari sebuah website.</p>
          </div>

          <div class="edu-section">
            <h3>Mitos Sertifikat Gembok (HTTPS):</h3>
            <div class="w3-danger-box">
              <h4>⚠️ PERINGATAN PENTING:</h4>
              <p>Ikon gembok (HTTPS) <strong>TIDAK BERARTI situs tersebut aman dari penipuan</strong>! HTTPS hanya berarti data yang Anda kirimkan terenkripsi antara peramban Anda dan pemilik server. Saat ini, penipu dapat dengan mudah membuat sertifikat SSL gratis untuk situs phishing mereka.</p>
            </div>
          </div>

          <div class="edu-section">
            <h3>Cara Menemukan Domain Utama (The Real Host):</h3>
            <p>Kunci menemukan identitas situs ada di bagian <strong>tepat sebelum garis miring pertama (/)</strong> setelah protokol:</p>
            
            <div class="w3-code-box">
              <div style="font-family: var(--font-mono); font-size: 0.95rem; line-height: 2;">
                https://<span style="color:var(--text-muted);">bca.co.id.layanan-nasabah.</span><span style="color:var(--neon-red); font-weight:bold; font-size:1.1rem;">scamsite.xyz</span>/update/form.html
              </div>
            </div>
            <p>Pada tautan di atas, meskipun terdapat kata <code>bca.co.id</code> di depan, itu hanyalah subdomain penyamaran. Server pemilik sebenarnya adalah <strong>scamsite.xyz</strong>!</p>
          </div>
        </div>
      `
    },
    {
      id: 'passwords-2fa',
      category: '3. KEPUTUSAN AMAN',
      title: 'Proteksi Password & 2FA / MFA',
      readingTime: '4 menit',
      badge: 'Kredensial',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-green">SUBBAB 3 // KEPUTUSAN: PROTEKSI KREDENSIAL</span>
            <h2>Proteksi Password & Multi-Factor Authentication (MFA)</h2>
            <p class="edu-lead">Mengamankan benteng akun digital Anda dari serangan pencurian kredensial dan credential stuffing.</p>
          </div>

          <div class="edu-section">
            <h3>Prinsip Pertahanan Kredensial:</h3>
            <ul class="edu-checklist">
              <li><strong>Jangan Gunakan Password yang Sama:</strong> Jika satu akun bocor di dark web, pelaku akan mencoba kombinasi yang sama ke akun bank dan email Anda.</li>
              <li><strong>Tinggalkan 2FA Berbasis SMS:</strong> SMS rentan terhadap pembajakan SIM Swap dan penyadapan APK malware. Gunakan aplikasi Authenticator (Google Authenticator atau Microsoft Authenticator).</li>
              <li><strong>Kunci Biometrik & Passkeys:</strong> Aktifkan sensor sidik jari atau passkey hardware FIDO2 pada akun penting Anda.</li>
            </ul>
          </div>
        </div>
      `
    },
    {
      id: 'financial-safety',
      category: '3. KEPUTUSAN AMAN',
      title: 'Aturan Emas Transaksi Perbankan & e-Wallet',
      readingTime: '4 menit',
      badge: 'Finansial',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-green">SUBBAB 3 // KEPUTUSAN: TRANSAKSI FINANSIAL</span>
            <h2>Aturan Emas Transaksi Perbankan & Dompet Digital</h2>
            <p class="edu-lead">Panduan praktis menjaga saldo tabungan dan transaksi digital tetap kedap dari serangan peretas.</p>
          </div>

          <div class="edu-section">
            <h3>4 Aturan Tak Tertulis Perbankan:</h3>
            <ol style="margin-left: 20px; line-height: 1.8;">
              <li><strong>Pihak Bank Tidak Pernah Meminta OTP:</strong> Petugas bank resmi memiliki akses sistem langsung dan tidak membutuhkan kode OTP rahasia nasabah.</li>
              <li><strong>Pisahkan Rekening Operasional Harian:</strong> Jangan simpan tabungan utama di rekening yang kartu debitnya sering dipakai untuk transaksi online atau terhubung ke e-wallet.</li>
              <li><strong>Atur Limit Transaksi Harian Rendah:</strong> Batasi transfer harian di m-banking ke angka wajar (misal Rp 5 juta) agar saldo tidak terkuras habis dalam sekejap.</li>
              <li><strong>Aktifkan Notifikasi Transaksi Seketika:</strong> Pastikan setiap mutasi rekening memicu notifikasi push aplikasi bank atau email langsung.</li>
            </ol>
          </div>
        </div>
      `
    },

    // ========================================================
    // SUBBAB 4: RESPON & TINDAKAN DARURAT
    // ========================================================
    {
      id: 'emergency',
      category: '4. RESPON & DARURAT',
      title: 'Protokol Golden 1-Hour: Penyelamatan Rekening',
      readingTime: '5 menit',
      badge: 'Darurat',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-amber">SUBBAB 4 // RESPON: GOLDEN 1-HOUR EMERGENCY</span>
            <h2>Prosedur Tanggap Darurat Siber (Golden 1-Hour)</h2>
            <p class="edu-lead">Apa yang harus segera Anda lakukan dalam 60 menit pertama jika Anda tidak sengaja mengklik tautan, menginstal APK, atau mentransfer uang.</p>
          </div>

          <div class="edu-section">
            <h3>Skenario A: Jika Anda Menginstal APK Berbahaya</h3>
            <ol style="margin-left: 20px; line-height: 2;">
              <li><strong>Aktifkan Airplane Mode (Mode Pesawat) Seketika:</strong> Matikan semua koneksi Wi-Fi dan data seluler untuk memutus transmisi data antara malware dan server pelaku.</li>
              <li><strong>Copot Pemasangan (Uninstall) Aplikasi Terkait:</strong> Buka Pengaturan Ponsel ➔ Aplikasi ➔ Cari aplikasi mencurigakan yang baru saja terpasang ➔ Paksa Berhenti (Force Stop) & Copot Pemasangan (Uninstall).</li>
              <li><strong>Lakukan Factory Reset (Jika Perlu):</strong> Jika aplikasi sulit dihapus atau meminta hak Administrator perangkat, lakukan pencadangan data foto/kontak dan segera lakukan reset ke setelan pabrik.</li>
            </ol>
          </div>

          <div class="edu-section">
            <h3>Skenario B: Jika Anda Mentransfer Uang / Memberikan Kredensial</h3>
            <ol style="margin-left: 20px; line-height: 2;">
              <li><strong>Telepon Call Center Bank Sekarang Juga:</strong> Minta petugas bank untuk segera <strong>memblokir kartu ATM, akun mobile banking, dan nomor rekening penerima</strong> penipu. Semakin cepat Anda melapor, semakin besar kemungkinan dana dibekukan di rekening penampung.</li>
              <li><strong>Ganti Password dan PIN:</strong> Ubah seluruh password email, internet banking, dan akun media sosial dari perangkat lain yang aman.</li>
              <li><strong>Simpan Bukti Tangkapan Layar (Screenshot):</strong> Ambil tangkapan layar percakapan, nomor telepon penipu, nomor rekening tujuan transfer, dan tautan phishing sebagai bukti laporan kepolisian.</li>
            </ol>
          </div>
        </div>
      `
    },
    {
      id: 'reporting',
      category: '4. RESPON & DARURAT',
      title: 'Kanal Resmi Pelaporan Siber di Indonesia',
      readingTime: '4 menit',
      badge: 'Regulasi',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-cyan">SUBBAB 4 // RESPON: KANAL PELAPORAN RESMI</span>
            <h2>Kanal Resmi Pelaporan Kejahatan Siber di Indonesia</h2>
            <p class="edu-lead">Laporkan nomor telepon, nomor rekening, dan tautan penipuan ke lembaga berwenang agar diblokir secara nasional.</p>
          </div>

          <div class="edu-section">
            <div class="edu-grid-cards">
              <div class="edu-card">
                <div class="card-icon">🏦</div>
                <h4>CekRekening.id (Kemenkominfo)</h4>
                <p>Portal resmi untuk memeriksa atau melaporkan nomor rekening bank / e-wallet yang digunakan untuk tindak pidana penipuan agar dibekukan.</p>
                <div style="margin-top:8px;"><a href="https://cekrekening.id" target="_blank" class="cyber-btn" style="padding:6px 12px; font-size:0.75rem;">Buka Portal ➔</a></div>
              </div>
              <div class="edu-card">
                <div class="card-icon">🚓</div>
                <h4>Patroli Siber (Bareskrim Polri)</h4>
                <p>Kanal Direktorat Tindak Pidana Siber Bareskrim Polri untuk pelaporan resmi penipuan online, pemerasan siber, dan pembobolan akun.</p>
                <div style="margin-top:8px;"><a href="https://patrolisiber.id" target="_blank" class="cyber-btn" style="padding:6px 12px; font-size:0.75rem;">Buka Portal ➔</a></div>
              </div>
              <div class="edu-card">
                <div class="card-icon">📢</div>
                <h4>AduanKonten.id (Kemenkominfo)</h4>
                <p>Fasilitas pelaporan situs phishing, link hoax, konten penipuan, dan aplikasi ilegal untuk pemblokiran akses internet secara nasional.</p>
                <div style="margin-top:8px;"><a href="https://aduankonten.id" target="_blank" class="cyber-btn" style="padding:6px 12px; font-size:0.75rem;">Buka Portal ➔</a></div>
              </div>
              <div class="edu-card">
                <div class="card-icon">⚖️</div>
                <h4>Kontak 157 (OJK)</h4>
                <p>Layanan konsumen Otoritas Jasa Keuangan untuk melaporkan investasi bodong, pinjol ilegal, dan pelanggaran sektor jasa keuangan.</p>
                <div style="margin-top:8px;"><a href="https://kontak157.ojk.go.id" target="_blank" class="cyber-btn" style="padding:6px 12px; font-size:0.75rem;">Buka Portal ➔</a></div>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      id: 'family',
      category: '4. RESPON & DARURAT',
      title: 'Melindungi Keluarga, Anak & Lansia dari Scam',
      readingTime: '4 menit',
      badge: 'Edukasi Komunitas',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-cyan">SUBBAB 4 // RESPON: PERLINDUNGAN KELUARGA</span>
            <h2>Melindungi Keluarga, Lansia, dan Orang Terdekat</h2>
            <p class="edu-lead">Orang tua dan lansia adalah target paling rentan karena kesenjangan literasi teknologi dan rasa percaya yang tinggi.</p>
          </div>

          <div class="edu-section">
            <h3>Langkah Pengamanan Praktis untuk Keluarga:</h3>
            <ul class="edu-checklist">
              <li><strong>Pasang Aplikasi Caller-ID (Getcontact / Truecaller):</strong> Bantu pasang aplikasi pelacak nomor spam di ponsel orang tua Anda agar nomor penipu langsung teridentifikasi merah.</li>
              <li><strong>Kunci Pemasangan Aplikasi Luar:</strong> Aktifkan pengaturan keamanan di ponsel keluarga agar tidak bisa menginstal file APK asing tanpa izin kata sandi keluarga.</li>
              <li><strong>Bahas Modus Penipuan di Meja Makan:</strong> Ceritakan modus-modus terbaru secara santai saat berkumpul bersama keluarga. Keterbukaan komunikasi membuat mereka tidak malu bercerita jika menerima pesan mencurigakan.</li>
              <li><strong>Buat Kata Sandi Darurat Keluarga:</strong> Sepakati satu kata rahasia (Safe Word) keluarga. Jika ada telepon mengatasnamakan anak/saudara tertangkap polisi atau kecelakaan dan meminta tebusan, minta orang tersebut menyebutkan Safe Word tersebut.</li>
            </ul>
          </div>
        </div>
      `
    },
    {
      id: 'device-cleanup',
      category: '4. RESPON & DARURAT',
      title: 'Deteksi Penyadapan & Sanitasi Perangkat',
      readingTime: '4 menit',
      badge: 'Forensik',
      html: `
        <div class="edu-article">
          <div class="edu-header-box">
            <span class="cyber-tag tag-cyan">SUBBAB 4 // RESPON: SANITASI PERANGKAT</span>
            <h2>Deteksi Penyadapan & Sanitasi Perangkat Terinfeksi</h2>
            <p class="edu-lead">Indikator teknis bahwa smartphone Anda sedang disadap spyware dan langkah pembersihan total.</p>
          </div>

          <div class="edu-section">
            <h3>Tanda-tanda Ponsel Anda Terinfeksi Spyware:</h3>
            <ul class="edu-checklist">
              <li>Baterai cepat terkuras drastis dan ponsel terasa panas saat tidak digunakan.</li>
              <li>Penggunaan kuota data internet melonjak tidak wajar di latar belakang (background data).</li>
              <li>Layar menyala sendiri secara acak atau muncul notifikasi pengiriman SMS yang tidak pernah Anda kirimkan.</li>
              <li>Muncul izin Accessibility Service yang aktif untuk aplikasi asing.</li>
            </ul>
          </div>

          <div class="edu-section" style="text-align:center; padding: 30px; background: rgba(0,243,255,0.05); border: 1px dashed var(--neon-cyan); border-radius: 8px;">
            <div style="font-size: 2.5rem; margin-bottom: 10px;">🎓</div>
            <h3 style="color: var(--neon-cyan);">Selamat! Anda Telah Menguasai Seluruh Panduan Edukasi Siber</h3>
            <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto 18px;">Pengetahuan Anda adalah benteng pertahanan terbaik melawan rekayasa sosial. Buktikan ketajaman nalar Anda di simulasi permainan taktis sekarang!</p>
            <a href="#games" class="cyber-btn" style="padding: 12px 28px; font-size: 0.95rem;">
              <span>🎮</span> UJI KEMAMPUAN DI MENU GAMES
            </a>
          </div>
        </div>
      `
    }
  ];

  class EdukasiManager {
    constructor() {
      this.topics = topicsData;
      this.currentTopicId = 'intro';
      this.sidebarOpenMobile = false;
      this.activeTopCategory = '1. PENDAHULUAN';
    }

    init() {
      const container = document.getElementById('edukasi-container');
      if (!container) return;

      this.renderLayout(container);
      this.loadTopic(this.currentTopicId);
    }

    renderLayout(container) {
      container.innerHTML = `
        <div class="edu-w3-wrapper">
          <!-- W3Schools Top Category Bar (Like HTML / CSS / JAVASCRIPT in W3Schools) -->
          <div class="w3-top-nav-bar">
            <button class="w3-top-tab active" data-cat="1. PENDAHULUAN" onclick="window.edukasiManager.switchCategory('1. PENDAHULUAN')">
              🛡️ PENDAHULUAN
            </button>
            <button class="w3-top-tab" data-cat="2. ANATOMI PENIPUAN" onclick="window.edukasiManager.switchCategory('2. ANATOMI PENIPUAN')">
              🎯 ANATOMI PENIPUAN
            </button>
            <button class="w3-top-tab" data-cat="3. KEPUTUSAN AMAN" onclick="window.edukasiManager.switchCategory('3. KEPUTUSAN AMAN')">
              ⚖️ KEPUTUSAN AMAN
            </button>
            <button class="w3-top-tab" data-cat="4. RESPON & DARURAT" onclick="window.edukasiManager.switchCategory('4. RESPON & DARURAT')">
              🚨 RESPON & DARURAT
            </button>
          </div>

          <!-- Main Layout Body (Sidebar + Content) -->
          <div class="edu-w3-main-body">
            <!-- Mobile Toggle Bar -->
            <div class="edu-mobile-bar">
              <button class="cyber-btn btn-ghost" onclick="window.edukasiManager.toggleMobileSidebar()">
                <span>☰</span> DAFTAR MATERI
              </button>
              <span id="edu-mobile-current-title" style="font-size: 0.82rem; color: var(--neon-cyan); font-weight: 700;">
                Lanskap Ancaman Siber
              </span>
            </div>

            <!-- W3Schools Styled Sidebar Navigation -->
            <aside class="edu-sidebar" id="edu-sidebar-nav">
              <div class="edu-sidebar-header">
                <div class="w3-sidebar-title">PENDAHULUAN TUTORIAL</div>
              </div>

              <div class="edu-sidebar-list" id="edu-sidebar-links">
                <!-- Dynamically populated categories & items -->
              </div>
            </aside>

            <!-- Main Article Content Area -->
            <main class="edu-main-content">
              <div class="edu-content-top-nav">
                <button class="cyber-btn btn-ghost w3-nav-btn" id="btn-edu-prev" onclick="window.edukasiManager.prevTopic()">
                  ❮ Previous
                </button>
                <div class="edu-progress-tag" id="edu-topic-indicator">
                  Topik 1 dari 4 (1. PENDAHULUAN)
                </div>
                <button class="cyber-btn btn-ghost w3-nav-btn" id="btn-edu-next" onclick="window.edukasiManager.nextTopic()">
                  Next ❯
                </button>
              </div>

              <div id="edu-article-container" class="edu-article-wrapper">
                <!-- Article Content Injected Here -->
              </div>

              <div class="edu-content-bottom-nav">
                <button class="cyber-btn btn-ghost w3-nav-btn" id="btn-edu-prev-bottom" onclick="window.edukasiManager.prevTopic()">
                  ❮ Previous
                </button>
                <button class="cyber-btn w3-nav-btn" style="background:#04AA6D; border-color:#04AA6D; color:#FFFFFF;" id="btn-edu-next-bottom" onclick="window.edukasiManager.nextTopic()">
                  Next ❯
                </button>
              </div>
            </main>
          </div>
        </div>
      `;

      this.renderSidebar();
    }

    renderSidebar() {
      const listContainer = document.getElementById('edu-sidebar-links');
      if (!listContainer) return;

      const activeCat = this.activeTopCategory || '1. PENDAHULUAN';

      // Update sidebar header title to match active subbab (ala W3Schools e.g. "CSS TUTORIAL")
      const sbTitle = document.querySelector('.w3-sidebar-title');
      if (sbTitle) {
        const cleanName = activeCat.replace(/^\d+\.\s*/, '');
        sbTitle.textContent = `${cleanName} TUTORIAL`;
      }

      // Filter topics belonging strictly to this active subbab
      const items = this.topics.filter(t => t.category === activeCat);

      let html = `
        <div style="padding: 10px 18px 8px 18px; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 8px;">
          <div style="font-family: var(--font-display); font-size: 0.74rem; color: var(--neon-cyan); letter-spacing: 1px; font-weight: 700;">
            ${activeCat.toUpperCase()}
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">
            ${items.length} Modul Pembelajaran Tersedia
          </div>
        </div>
        <ul class="edu-cat-items">
          ${items.map((item, idx) => `
            <li>
              <a href="javascript:void(0)" 
                 class="edu-sidebar-item ${item.id === this.currentTopicId ? 'active' : ''}" 
                 data-topic-id="${item.id}"
                 onclick="window.edukasiManager.loadTopic('${item.id}')">
                <span class="item-title">${idx + 1}. ${item.title}</span>
                <span class="item-badge">${item.readingTime}</span>
              </a>
            </li>
          `).join('')}
        </ul>
      `;

      listContainer.innerHTML = html;
    }

    switchCategory(catName) {
      window.cyberAudio?.playClick();
      this.activeTopCategory = catName;

      // Update top tabs active state
      document.querySelectorAll('.w3-top-tab').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-cat') === catName);
      });

      this.renderSidebar();

      // Find first topic in this category and load it
      const targetTopic = this.topics.find(t => t.category === catName);
      if (targetTopic) {
        this.loadTopic(targetTopic.id);
      }
    }

    loadTopic(topicId) {
      const topic = this.topics.find(t => t.id === topicId) || this.topics[0];
      this.currentTopicId = topic.id;

      // If category switched, update activeTopCategory and re-render sidebar with the new subbab's chapters
      if (this.activeTopCategory !== topic.category) {
        this.activeTopCategory = topic.category;
        this.renderSidebar();
      }

      // Update sidebar active state
      document.querySelectorAll('.edu-sidebar-item').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-topic-id') === topic.id);
      });

      // Update mobile title
      const mobTitle = document.getElementById('edu-mobile-current-title');
      if (mobTitle) mobTitle.textContent = topic.title;

      // Update top category tabs to highlight the active category
      document.querySelectorAll('.w3-top-tab').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-cat') === topic.category);
      });

      // Update indicators
      const curIdx = this.topics.findIndex(t => t.id === topic.id);
      const catTopics = this.topics.filter(t => t.category === topic.category);
      const catIdx = catTopics.findIndex(t => t.id === topic.id);
      const indicator = document.getElementById('edu-topic-indicator');
      if (indicator) {
        indicator.textContent = `Topik ${catIdx + 1} dari ${catTopics.length} • Total ${curIdx + 1}/${this.topics.length} (${topic.category})`;
      }

      // Update Prev / Next buttons
      const prevDisabled = curIdx === 0;
      const nextDisabled = curIdx === this.topics.length - 1;

      ['btn-edu-prev', 'btn-edu-prev-bottom'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.disabled = prevDisabled;
      });

      ['btn-edu-next', 'btn-edu-next-bottom'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.disabled = nextDisabled;
      });

      // Inject article HTML
      const articleBox = document.getElementById('edu-article-container');
      if (articleBox) {
        articleBox.innerHTML = topic.html;
      }

      // Smooth scroll viewport to top of article if user is scrolled down
      const eduWrapper = document.querySelector('.edu-w3-wrapper');
      if (eduWrapper) {
        const headerOffset = 76;
        const targetY = eduWrapper.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        if (window.pageYOffset > targetY + 50) {
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }

      // Close mobile sidebar if open
      const sb = document.getElementById('edu-sidebar-nav');
      if (sb && this.sidebarOpenMobile) {
        this.sidebarOpenMobile = false;
        sb.classList.remove('mobile-open');
      }
    }

    prevTopic() {
      const curIdx = this.topics.findIndex(t => t.id === this.currentTopicId);
      if (curIdx > 0) {
        this.loadTopic(this.topics[curIdx - 1].id);
      }
    }

    nextTopic() {
      const curIdx = this.topics.findIndex(t => t.id === this.currentTopicId);
      if (curIdx < this.topics.length - 1) {
        this.loadTopic(this.topics[curIdx + 1].id);
      }
    }

    toggleMobileSidebar() {
      const sb = document.getElementById('edu-sidebar-nav');
      if (sb) {
        this.sidebarOpenMobile = !this.sidebarOpenMobile;
        sb.classList.toggle('mobile-open', this.sidebarOpenMobile);
      }
    }

    answerQuiz(btnEl, isCorrect) {
      const card = btnEl.closest('.w3-quiz-card');
      if (!card) return;

      const feedback = card.querySelector('.quiz-feedback');
      const allBtns = card.querySelectorAll('.quiz-opt');
      allBtns.forEach(b => {
        b.disabled = true;
        b.classList.remove('correct', 'wrong');
      });

      if (isCorrect) {
        btnEl.classList.add('correct');
        feedback.innerHTML = `<span style="color:var(--neon-green); font-weight:bold;">✓ TEPAT SEKALI!</span> Analisis Anda sejalan dengan prinsip perlindungan siber. Terus terapkan kewaspadaan ini.`;
        if (window.soundEngine) window.soundEngine.playSuccess();
      } else {
        btnEl.classList.add('wrong');
        feedback.innerHTML = `<span style="color:var(--neon-red); font-weight:bold;">✗ KURANG TEPAT.</span> Ingat kembali prinsip Zero-Trust: selalu verifikasi melalui jalur terpisah dan jangan pernah bertindak terburu-buru.`;
        if (window.soundEngine) window.soundEngine.playError();
      }
    }
  }

  window.edukasiManager = new EdukasiManager();
})();
