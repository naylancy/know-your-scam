# 🛡️ KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE
### 🚀 Implementasi Laravel Framework, Integrasi Basis Data, Dual Theme & Konsol Uji Akun

**Know Your Scam** adalah platform simulasi dan edukasi pertahanan siber tingkat tinggi (*Zero-Gravity Cyber Defense Architecture*) berbasis **Laravel Framework (v10.50.3)** dengan arsitektur MVC (*Model-View-Controller*), migrasi tabel relasional terstruktur, model Eloquent ORM, *seeder* otomatis, dan *dual theme engine* (Dark Obsidian & Light Cyber Mode).

Aplikasi ini menggabungkan antarmuka *zero-gravity* partikel melayang secara dinamis, efek audio *synthesized* Web Audio API sci-fi tanpa ketergantungan aset eksternal, dan 5 modul skenario pertahanan siber interaktif.

---

## 🌟 FITUR UTAMA & PEMBARUAN SISTEM

### 1. 🌌 Welcome Page & Dinamika Navigasi Atas (Dynamic Navbar Guard)
- **Menu Navigasi Tersembunyi Sebelum Login**: Pada Welcome Page / status tamu (*Guest*), seluruh tautan menu modul game (`KASUS`, `FINDING DIFF`, `CRIMINAL CASE`, `DEEP LEARNING`, `LINK SCANNER`, `LEADERBOARD`, `ADMIN`) di bagian atas disembunyikan.
- **Navigasi Terbuka Pasca-Otentikasi**: Menu permainan hanya akan muncul di bilah navigasi atas setelah pengguna berhasil login atau memilih akun uji coba.
- **Proteksi Akses Simulasi (Route Guard)**: Jika pengguna tamu mencoba mengetik rute URL langsung (misal `#kasus` atau `#scanner`), sistem otomatis memblokir akses, mengarahkan kembali ke `#welcome`, dan memunculkan jendela dialog otentikasi.
- **Ringkasan Komprehensif**: Kartu modul pada Welcome Page berfungsi sebagai penampil ringkasan intelijen (*Modal Overview Inspector*), bukan tombol uji coba langsung tanpa otentikasi.

### 2. 🧪 Kredensial Akun Uji Coba (Profil, Username & Sandi)
Tersedia kredensial resmi untuk menguji hak akses peran (*Role-Based Access Control*):
- **Akun User (Kadet Siber)**:
  - **Nama Profil**: `Cadet Aris`
  - **Username**: `cadet`
  - **Sandi / Password**: `cadet123`
  - **Peran / Pangkat**: `User` / `Security Cadet (680 XP)`
  - **Hak Akses**: Mengakses 5 Modul Game, Analisis Kerentanan, Leaderboard Global. Akses Panel Admin diblokir otomatis.
- **Akun Admin (Komandan Sistem)**:
  - **Nama Profil**: `Commander Vektor`
  - **Username**: `admin`
  - **Sandi / Password**: `admin123`
  - **Peran / Pangkat**: `Admin` / `Grand Cyber Sentinel (1250 XP)`
  - **Hak Akses**: Seluruh Modul Game + **Panel Manajemen Kasus (CRUD)** + **Live Activity Logs** (Audit telemetri aksi real-time).
- **Fasilitas Login 1-Klik**: Modal Otentikasi dan Konsol di Welcome Page menyediakan kartu klik cepat untuk langsung mengisi username & sandi secara otomatis dan masuk seketika.
- **Tombol Keluar (Logout)**: Bilah navigasi atas menyediakan tombol *Keluar* (`⏻ KELUAR`) yang menghapus sesi dan menyembunyikan kembali menu navigasi.

### 3. 🌓 Mesin Tema Ganda (Dark Obsidian & Light Cyber Theme)
- **Dark Theme (Obsidian Zero-Gravity)**:
  - Latar belakang hitam pekat `#05050A`, partikel neon cyan (`#00F3FF`) dan magenta (`#BD00FF`), hologram HUD bercahaya tinggi.
- **White / Light Theme (Clean Cyber Lab)**:
  - Latar belakang terang futuristik `#F0F4F8` / `#FFFFFF`, kartu beraksen *glassmorphism* bersih, kontras teks optimal (`#0A192F`), partikel siber biru kobalt (`#0066FF`) dan violet gelap (`#8A2BE2`).
- **Peralihan Mulus**:
  - Tombol toggle tema terletak di navigasi atas (`#btn-toggle-theme`).
  - Partikel HTML5 Canvas beradaptasi otomatis terhadap palet warna tema yang aktif.
  - Pilihan tema tersimpan secara persisten di `localStorage`.

---

## 🗄️ INTEGRASI BASIS DATA & ARSITEKTUR LARAVEL

### 1. Migrasi Basis Data (`database/migrations/`)
- `users`: Menyimpan data kadet dan admin, skor XP (`score`), indeks kerentanan (`vulnerability`), pangkat siber (`rank`), jumlah modul tuntas (`modules_completed`), dan peran akun (`role`: *user* / *admin*).
- `game_cases`: Katalog skenario 5 modul game (`case_code`, `category`, `type`, `title`, `subtitle`, `difficulty`, `scenario_data` berformat JSON, dan `is_active`).
- `activity_logs`: Mencatat secara persisten seluruh jejak keputusan, waktu akses, modul yang dimainkan, skor kerentanan, dan status pengamanan siber (*SECURED*, *BREACH_PREVENTED*, *COMPROMISED*).

### 2. Model Eloquent ORM (`app/Models/`)
- `App\Models\User`: Kalkulasi otomatis pangkat siber (`updateRank()`), verifikasi admin (`isAdmin()`), dan *mutator/accessor*.
- `App\Models\GameCase`: Dilengkapi *local scopes* (`scopeActive()`, `scopeCategory($cat)`) dan *casting* otomatis kolom `scenario_data` ke array/JSON.
- `App\Models\ActivityLog`: Menyimpan log telemetri dan riwayat keputusan peserta.

### 3. Pengisi Data Awal (`database/seeders/DatabaseSeeder.php`)
- **Akun Demo**: `admin` (Commander Vektor) dan `cadet` (Cadet Aris).
- **Peserta Leaderboard**: *Sgt. Kira Thorne*, *Specialist Nyx*, *Analyst Zero*.
- **Katalog 5 Modul Game**: Skenario Multi-POV, Kasus Finding Diff (Real vs Fake), Kasus Forensik Drag-and-Drop, Evaluasi Deep Learning, dan Sampel Berita/URL Scanner.
- **Data Fiktif Murni (Strict Zero-PII)**: Tanpa data pribadi asli, tanpa brand/merek nyata, dan tanpa tautan doksli hidup.

### 4. Controller & Routing
- `app/Http/Controllers/GuardianController.php`: Merender *master view* Blade `guardianspace.blade.php` dan menginjeksi *state* awal langsung dari database (`window.__LARAVEL_INITIAL_DATA__`).
- `app/Http/Controllers/Api/GameCaseController.php`: REST API untuk CRUD skenario kasus.
- `app/Http/Controllers/Api/ActivityLogController.php`: REST API untuk pencatatan telemetri real-time, filter, pencarian, dan pembersihan log.
- `app/Http/Controllers/Api/AuthController.php`: REST API untuk autentikasi instan akun demo (`/api/auth/demo/{role}`), login kustom, dan pembaruan skor pengguna.
- `app/Http/Controllers/Api/ScannerController.php`: REST API untuk analisis heuristik keamanan URL & berita.

---

## ⚙️ DUKUNGAN BASIS DATA GANDA: SQLITE & MYSQL

### Opsi A: SQLite (Default Aktif - Siap Pakai Langsung)
Secara bawaan berkas `.env` telah diarahkan ke database SQLite yang telah di-*migrate* dan di-*seed*:
```env
DB_CONNECTION=sqlite
DB_DATABASE=c:\laragon\www\GuardianSpace\database\database.sqlite
```
*Kelebihan: Langsung berfungsi seketika tanpa perlu konfigurasi tambahan.*

### Opsi B: MySQL Laragon
Jika ingin menggunakan MySQL di Laragon:
1. Pastikan tombol **Start All** di Laragon telah ditekan (MySQL aktif di port 3306).
2. Buat database baru bernama `guardianspace` di phpMyAdmin / HeidiSQL.
3. Ubah konfigurasi di file `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=guardianspace
   DB_USERNAME=root
   DB_PASSWORD=
   ```
4. Jalankan migrasi dan seeding:
   ```powershell
   php artisan migrate:fresh --seed
   ```

---

## 🚀 CARA MENJALANKAN APLIKASI LARAVEL

### Metode 1: Melalui `php artisan serve` (Rekomendasi Utama)
Buka terminal di folder proyek dan cukup jalankan:
```powershell
cd C:\laragon\www\GuardianSpace
php artisan serve
```
*(Atau cukup klik dua kali berkas `serve.bat` yang telah disediakan).*

Buka browser dan akses:
👉 **[http://localhost:8000](http://localhost:8000)** (atau **[http://127.0.0.1:8000](http://127.0.0.1:8000)**)

### Metode 2: Melalui Laragon Web Server (Apache/Nginx)
1. Buka Laragon dan klik **Start All**.
2. Akses melalui browser:
   👉 **[http://localhost/GuardianSpace/public](http://localhost/GuardianSpace/public)**
   atau (jika Virtual Host otomatis Laragon aktif):
   👉 **[http://guardianspace.test](http://guardianspace.test)**

---

## 🌌 RERINCIAN 5 MODUL PERMAINAN

1. **KASUS (Multi-POV Story Simulation)**: Skenario naratif interaktif dengan sudut pandang Korban (*Victim POV*) dan Tim Pertahanan (*Hunter POV*) meliputi Phishing Undian Bank NeoArtha, Love Scam Elena Voss, dan Job Scam QuantumTech.
2. **FINDING DIFF (Judge Real vs Fake)**: Membandingkan interface real vs fake secara berdampingan dengan efek *hover zoom-in*, analisis sertifikat SSL, dan 2 tombol neon raksasa di bawah layar: **Tombol "REAL"** (Cyan) & **Tombol "FAKE"** (Magenta).
3. **CRIMINAL CASE (Forensic Drag & Drop)**: Memilah bukti ke 4 slot dakwaan (*Aktor Serangan*, *Vektor Serangan*, *Red Flag Kritis*, *Strategi Intervensi*) sebelum *countdown timer* habis.
4. **DEEP LEARNING (AI Threat Assessment)**: Evaluasi tingkat bahaya dan penyusunan argumen analisis, dilengkapi animasi **Cyber Wave & AI Thinking Nodes Canvas** dan kartu skor semantik AI.
5. **LLM NEWS / LINK SCANNER (External Tool)**: Utilitas mandiri pemindai validitas URL dan berita berbasis AI dengan banner transparansi pemrosesan pihak ketiga / AI dan petunjuk keamanan interaktif (*Hints*).

---

## 🛠️ PERINTAH ARTISAN PENTING

- **Menjalankan Server**:
  ```powershell
  php -d extension=pdo_sqlite -d extension=sqlite3 artisan serve
  ```
- **Reset & Seeding Ulang Basis Data**:
  ```powershell
  php -d extension=pdo_sqlite -d extension=sqlite3 artisan migrate:fresh --seed
  ```
- **Melihat Seluruh Rute API & Web**:
  ```powershell
  php -d extension=pdo_sqlite -d extension=sqlite3 artisan route:list
  ```

---

*Know Your Scam: Zero-Gravity Cyber Defense Platform. Data Fiktif Murni & Zero PII Compliant.*
