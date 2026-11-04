# 🛡️ KNOW YOUR SCAM: ANTI-GRAVITY CYBER DEFENSE
### 🚀 Platform Edukasi & Simulasi Taktis Rekayasa Sosial Siber Berbasis Laravel & Hybrid AI

**KNOW YOUR SCAM** adalah platform edukasi dan simulasi pertahanan siber multi-level bertenaga **Laravel Framework (v10)** dengan arsitektur MVC, integrasi basis data relasional (SQLite, MySQL, dan Neon PostgreSQL), serta mesin kecerdasan buatan hibrida (**Google Gemini Cloud AI + Local Cognitive Core**).

Platform ini dirancang untuk melatih nalar kritis mahasiswa dan masyarakat umum dalam mengenali ragam penipuan digital, menganalisis manipulasi psikologis, mengambil keputusan aman, dan melakukan tindakan perlindungan diri secara terstruktur.

---

## 👥 DAFTAR AKUN PENGGUNA TERDAFTAR (EXISTING SEED USERS)

Berikut adalah daftar akun yang telah terdaftar dalam sistem basis data untuk keperluan pengujian dan demonstrasi:

| ID | Nama Profil | Username | Sandi Pengujian | Peran (Role) | Pangkat (Rank) | Total XP | Indeks Kerentanan | Rincian Skor Game |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| **USR-001** | **Commander Vektor** | `admin` | `admin123` | **Administrator** | Grand Cyber Sentinel | **1250 XP** | 1.2 / 10 | Kasus: 380, Diff: 320, Crim: 300, Analyzer: 170, Scan: 40, Check: 40 |
| **USR-002** | **Cadet Aris** | `cadet` | `cadet123` | **User** | Security Cadet | **680 XP** | 4.5 / 10 | Kasus: 220, Diff: 180, Crim: 150, Analyzer: 80, Scan: 25, Check: 25 |
| **USR-003** | **Sgt. Kira Thorne** | `kira_t` | `kira123` | **User** | Elite Vanguard | **1120 XP** | 1.8 / 10 | Kasus: 350, Diff: 290, Crim: 270, Analyzer: 150, Scan: 30, Check: 30 |
| **USR-004** | **Specialist Nyx** | `nyx_shadow` | `password123` | **User** | Threat Hunter | **940 XP** | 2.4 / 10 | Kasus: 300, Diff: 250, Crim: 220, Analyzer: 120, Scan: 25, Check: 25 |
| **USR-005** | **Analyst Zero** | `cipher_zero` | `password123` | **User** | Incident Responder | **810 XP** | 3.1 / 10 | Kasus: 260, Diff: 220, Crim: 190, Analyzer: 100, Scan: 20, Check: 20 |

> [!NOTE]
> Pengguna baru juga dapat melakukan pendaftaran mandiri melalui tombol **"DAFTAR AKUN BARU"** pada modal otentikasi. Akun baru akan otomatis mendapatkan peran `user`, inisialisasi skor 0 XP di semua permainan, dan langsung diarahkan ke layar login dengan username yang otomatis terisi.

---

## 🌟 FITUR UTAMA & STRUKTUR APLIKASI

### 1. 🔐 Sistem Autentikasi Profesional & Registrasi Mandiri
* **Modal Otentikasi Terpadu**: Dilengkapi tab **MASUK (LOGIN)** dan **DAFTAR (REGISTER)** yang bersih tanpa membocorkan kredensial atau sandi akun di layar.
* **Auto-Redirect ke Login**: Setelah mengisi data pendaftaran (Nama, Username, Email, Password), akun langsung dibuat ke database, notifikasi keberhasilan ditampilkan, form otomatis beralih ke tab Login, dan username langsung terisi.
* **Keamanan Sandi**: Enkripsi password menggunakan `bcrypt` (`Hash::make()`) standar industri Laravel.

### 2. 🎮 Penggabungan Menu "GAMES"
Seluruh modul permainan kini dikonsolidasikan ke dalam menu utama **GAMES** dengan navigasi dropdown dan halaman Games Hub interaktif:
1. 📜 **Kasus Simulasi (Multi-POV)**: Simulasi percakapan naratif berganti sudut pandang Korban (*Victim*) dan Tim Keamanan (*Hunter*).
2. ⚖️ **Finding Diff (Judge Real vs Fake)**: Uji ketelitian visual membandingkan dua portal/email berdampingan dengan *hover zoom lens*.
3. 🕵️ **Criminal Case (Forensic Puzzle)**: Teka-teki drag-and-drop barang bukti ke slot dakwaan dengan penghitung waktu panik investigasi.
4. 🧠 **AI Analyzer (Evaluasi Semantik AI)**: Analisis kualitatif dokumen transmisi di mana penalaran Anda dievaluasi oleh Google Gemini Cloud AI.

### 3. 🛡️ Penggabungan Menu "DETEKTOR" (Scanner & Legit Checker)
Menu **DETEKTOR** menggabungkan dua perkakas intelijen siber dengan bilah tab navigasi instan:
1. 🔗 **Link Scanner**: Pemindaian URL dan teks berita untuk mendeteksi domain phishing, typosquatting, dan protokol tak aman.
2. 🛡️ **Legit Checker** *(sebelumnya Checker)*: Validasi keaslian multi-ancaman untuk memeriksa percakapan Love Scam, Hoax viral, tawaran kerja bodong, investasi palsu, dan malware APK.

### 4. 📚 Modul Edukasi Siber Bergaya W3Schools
Pusat pembelajaran komprehensif dengan **Sidebar Navigation** mirip W3Schools:
* **Materi Terstruktur**:
  * 📌 *Pendahuluan & Prinsip Dasar*: Lanskap Ancaman Modern, Zero-Trust Paradigm, 3-Second Rule.
  * 🔍 *Mengenali Jenis Penipuan*: Phishing, APK Malware (Surat Tilang/Undangan), Love Scam, Investasi Bodong / Pig Butchering.
  * 🧠 *Pengambilan Keputusan Aman*: Verifikasi Out-of-Band (Saluran Terpisah), Anatomi URL & Membaca Sertifikat SSL.
  * 🛡️ *Respon & Perlindungan Diri*: Prosedur Darurat 1 Jam Pertama, Kanal Resmi Pelaporan (CekRekening, Patroli Siber, AduanKonten, Kontak 157 OJK), dan Melindungi Keluarga/Lansia.
* **Fitur Interaktif**: Tombol *Sebelumnya / Selanjutnya*, Kuis Kilat berumpan balik instan, kotak peringatan bahaya (*Red Flags*), dan sidebar yang otomatis diciutkan menjadi menu laci pada perangkat ponsel.

### 5. 🎯 Layar Awal (Briefing & Tutorial) di Setiap Permainan
* Sebelum memasuki arena pertanyaan/kasus, setiap game menampilkan layar **Misi, Deskripsi & Tutorial Cara Bermain** yang merinci langkah penyelesaian dan aturan perolehan poin XP.
* Pemain dapat mengulang membaca briefing kapan saja melalui tombol **`ℹ️ TUTORIAL`** pada bilah HUD atas permainan.

### 6. 📊 Tampilan Skor Real-Time di Setiap Game & Live Leaderboard
* **HUD Game Real-Time**: Setiap game menampilkan badge **Skor Game Ini** dan **Total Akumulasi XP** yang langsung berdenyut (*pulse animation*) dan bertambah seketika saat jawaban benar dipilih.
* **Leaderboard Auto-Stream**: Leaderboard otomatis memperbarui peringkat secara live tanpa refresh halaman.
* **Toggle Tampilan Detail Skor**: Opsi beralih antara mode **TOTAL SKOR** (peringkat umum dengan tombol rincian kartu) dan mode **DETAIL SKOR PER GAME** (matrix view kolom terpisah untuk seluruh 6 cabang game).

### 7. 📱 Desain Responsif Berdasarkan Piksel (All-Device Breakpoints)
Antarmuka beradaptasi secara presisi pada berbagai resolusi layar:
* **320px - 480px (Ponsel Kecil)**: Header teroptimasi, navigasi bergulir horizontal, tombol 100% lebar, kartu teradaptasi.
* **481px - 768px (Ponsel Besar & Tablet Potret)**: Dock kendali vertikal, split-grid responsif.
* **769px - 1024px (Tablet Lanskap & Netbook)**: Grid 2 kolom, sidebar edukasi adaptif.
* **1025px - 1440px (Desktop / Laptop)**: Tampilan visual penuh dengan aksen neon holografis.
* **1440px+ (Ultra-Wide)**: Pembatasan lebar kontainer 1600px dengan bayangan tengah seimbang.

---

## 🤖 INTEGRASI GOOGLE GEMINI CLOUD AI
Aplikasi menggunakan model resmi aktif **`gemini-3.5-flash-lite`** (v1beta endpoint) melalui arsitektur hibrida:
* **Layer 1 (40%)**: Heuristik aturan deterministik lokal (Zero-Trust checks, keywords, pattern analysis).
* **Layer 2 (60%)**: Google Gemini Cloud AI Evaluator untuk mengukur kedalaman semantik dan penalaran kualitatif.
* **Fallback Otomatis**: Jika jaringan offline atau kuota habis, *Local Cognitive Intelligence Core* langsung memberikan evaluasi dengan format skema yang sama persis.
* **Resolusi IPv4 Windows**: Dilengkapi opsi `CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4` pada Guzzle PHP cURL untuk mencegah kendala timeout IPv6 pada lingkungan Windows/Laragon.

---

## 🐘 PERSIAPAN BASIS DATA NEON (POSTGRESQL)

Proyek ini telah dikonfigurasi untuk integrasi cloud database **Neon PostgreSQL**:
1. File spesifikasi layanan `neon.ts` telah dibuat dengan konfigurasi:
   * **Project ID**: `weathered-credit-32606561`
   * **Org ID**: `org-quiet-smoke-47459069`
   * **Branch**: `production`
   * **Service**: `postgres`
2. Konfigurasi driver PostgreSQL telah siap pada `config/database.php` (`DB_CONNECTION=pgsql`).
3. Seluruh tabel migrasi (`users`, `game_cases`, `activity_logs`) dan seeder data awal siap dijalankan ke Neon menggunakan perintah standar:
   ```powershell
   php artisan migrate --seed
   ```

---

## 🚀 PANDUAN MENJALANKAN APLIKASI SECARA LOKAL

### Langkah 1: Clone atau Buka Folder Proyek
```powershell
cd C:\laragon\www\GuardianSpace
```

### Langkah 2: Jalankan Laravel Server
```powershell
php artisan serve
```
Buka browser Anda dan akses:
👉 **[http://localhost:8000](http://localhost:8000)** (atau melalui Laragon: **[http://guardianspace.test](http://guardianspace.test)**)

---

*Know Your Scam: Anti-Gravity Cyber Defense Platform. 100% Data Fiktif Edukasi & Zero-PII Standard.*
