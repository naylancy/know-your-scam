/**
 * KNOW YOUR SCAM: ANTI-GRAVITY CYBER DEFENSE
 * MODUL 3: CRIMINAL CASE - DETEKTIF OWL
 * 
 * Gim edukasi teka-teki investigasi kriminal ala Criminal Case.
 * Pemain berperan sebagai Detektif Owl yang menganalisis TKP Digital,
 * memilah skenario kasus harian, mengumpulkan Red Flags (barang bukti),
 * dan menggagalkan aksi penipu sebelum korban merugi.
 * 
 * 5-Phase Game Flow:
 * 1. Layar Pemilihan Kasus (Case File Desk - Meja Kerja Detektif Pixel Art)
 * 2. Fase 1: Intro & Sinopsis (Briefing Dialog RPG Pixel: Detektif Owl & Korban)
 * 3. Fase 2: Investigasi TKP Digital (Interactive Crime Scene dengan Red Flag Hotspots)
 * 4. Fase 3: Analisis & Keputusan Akhir (Core Web Decision)
 * 5. Fase 4: Penangkapan & Evaluasi (Case Closed Stamp vs Victim Scammed)
 */

(function() {
  'use strict';

  // ========================================================
  // 1. ANIMATED PIXEL ART SVG GENERATORS
  // ========================================================

  function getPixelDetectiveOwlSVG(size = 96) {
    return `
      <div class="pixel-owl-wrap" title="Detektif Owl (Owl Detective)">
        <svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
          <!-- Detective Fedora Hat -->
          <rect x="7" y="1" width="14" height="4" fill="#78350F" />
          <rect x="5" y="4" width="18" height="2" fill="#92400E" />
          <rect x="5" y="5" width="18" height="1" fill="#0284C7" />
          <!-- Feathery Ear Tufts -->
          <rect x="4" y="6" width="3" height="3" fill="#B45309" />
          <rect x="21" y="6" width="3" height="3" fill="#B45309" />
          <!-- Owl Face & Head -->
          <rect x="6" y="6" width="16" height="10" fill="#D97706" />
          <rect x="7" y="7" width="6" height="6" fill="#FEF3C7" />
          <rect x="15" y="7" width="6" height="6" fill="#FEF3C7" />
          <!-- Wise Golden Spectacles / Eyes -->
          <rect x="8" y="8" width="4" height="4" fill="#F59E0B" />
          <rect x="9" y="9" width="2" height="2" fill="#0F172A" />
          <rect x="10" y="8" width="1" height="1" fill="#FFFFFF" />
          <rect x="16" y="8" width="4" height="4" fill="#F59E0B" />
          <rect x="17" y="9" width="2" height="2" fill="#0F172A" />
          <rect x="18" y="8" width="1" height="1" fill="#FFFFFF" />
          <!-- Spectacle Bridge -->
          <rect x="13" y="9" width="2" height="1" fill="#78350F" />
          <!-- Sharp Beak -->
          <rect x="13" y="12" width="2" height="3" fill="#EA580C" />
          <!-- Trenchcoat Body -->
          <rect x="6" y="16" width="16" height="9" fill="#92400E" />
          <rect x="12" y="16" width="4" height="9" fill="#FDE68A" />
          <rect x="13" y="17" width="2" height="2" fill="#EF4444" />
          <!-- Trenchcoat Collar -->
          <rect x="8" y="16" width="3" height="4" fill="#78350F" />
          <rect x="17" y="16" width="3" height="4" fill="#78350F" />
          <!-- Golden Magnifying Glass in Wing -->
          <rect x="22" y="15" width="4" height="4" fill="#FBBF24" />
          <rect x="23" y="16" width="2" height="2" fill="#38BDF8" />
          <rect x="24" y="19" width="2" height="4" fill="#78350F" />
          <!-- Feet Claws -->
          <rect x="9" y="25" width="3" height="2" fill="#EA580C" />
          <rect x="16" y="25" width="3" height="2" fill="#EA580C" />
        </svg>
      </div>
    `;
  }

  function getPixelVictimSVG(victimType, size = 90) {
    switch (victimType) {
      case 'raka':
        // 👦 Raka: 21 Tahun, Mahasiswa Panik
        return `
          <div class="pixel-victim-wrap" title="Raka - Mahasiswa (Korban)">
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
              <!-- Messy Student Hair -->
              <rect x="6" y="2" width="12" height="5" fill="#1E293B" />
              <rect x="4" y="4" width="16" height="3" fill="#0F172A" />
              <!-- Face -->
              <rect x="6" y="6" width="12" height="9" fill="#FED7AA" />
              <!-- Wide Panicked Eyes -->
              <rect x="8" y="8" width="3" height="3" fill="#FFFFFF" />
              <rect x="9" y="9" width="1" height="2" fill="#0F172A" />
              <rect x="13" y="8" width="3" height="3" fill="#FFFFFF" />
              <rect x="14" y="9" width="1" height="2" fill="#0F172A" />
              <!-- Panicked O-shaped Mouth -->
              <rect x="11" y="12" width="2" height="2" fill="#7C2D12" />
              <!-- Cold Sweat Drop on Forehead -->
              <rect x="16" y="5" width="2" height="3" fill="#38BDF8" />
              <!-- Blue College Hoodie -->
              <rect x="5" y="15" width="14" height="8" fill="#2563EB" />
              <rect x="8" y="15" width="8" height="4" fill="#60A5FA" />
            </svg>
          </div>
        `;

      case 'tari':
        // 👧 Tari: 23 Tahun, Fresh Graduate Cemas
        return `
          <div class="pixel-victim-wrap" title="Tari - Fresh Graduate (Korban)">
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
              <!-- Ponytail & Neat Hair -->
              <rect x="7" y="2" width="10" height="5" fill="#451A03" />
              <rect x="4" y="4" width="4" height="7" fill="#78350F" />
              <rect x="16" y="4" width="4" height="5" fill="#78350F" />
              <!-- Face -->
              <rect x="6" y="6" width="12" height="9" fill="#FED7AA" />
              <!-- Eyeglasses & Anxious Eyes -->
              <rect x="7" y="8" width="4" height="3" fill="#DC2626" />
              <rect x="8" y="9" width="2" height="1" fill="#0F172A" />
              <rect x="13" y="8" width="4" height="3" fill="#DC2626" />
              <rect x="14" y="9" width="2" height="1" fill="#0F172A" />
              <rect x="11" y="9" width="2" height="1" fill="#DC2626" />
              <!-- Worried Mouth -->
              <rect x="10" y="13" width="4" height="1" fill="#991B1B" />
              <!-- Professional Cardigan -->
              <rect x="5" y="15" width="14" height="8" fill="#7C3AED" />
              <rect x="8" y="15" width="8" height="8" fill="#F8FAFC" />
            </svg>
          </div>
        `;

      case 'ibusari':
        // 👩 Ibu Sari: 52 Tahun, Ibu Rumah Tangga Menangis
        return `
          <div class="pixel-victim-wrap" title="Ibu Sari - Ibu Rumah Tangga (Korban)">
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
              <!-- Pastel Hijab / Scarf -->
              <rect x="6" y="2" width="12" height="5" fill="#0D9488" />
              <rect x="4" y="5" width="16" height="13" fill="#14B8A6" />
              <!-- Face Inside Hijab -->
              <rect x="7" y="7" width="10" height="8" fill="#FED7AA" />
              <!-- Tearful Distressed Eyes -->
              <rect x="8" y="9" width="3" height="2" fill="#0F172A" />
              <rect x="8" y="11" width="1" height="3" fill="#38BDF8" />
              <rect x="13" y="9" width="3" height="2" fill="#0F172A" />
              <rect x="15" y="11" width="1" height="3" fill="#38BDF8" />
              <!-- Trembling Mouth -->
              <rect x="10" y="13" width="4" height="1" fill="#78350F" />
              <!-- Hijab Chest Drape & Holding Phone -->
              <rect x="5" y="17" width="14" height="6" fill="#0F766E" />
              <rect x="17" y="14" width="3" height="6" fill="#1E293B" />
            </svg>
          </div>
        `;

      default:
        return `<span style="font-size:2.5rem;">👤</span>`;
    }
  }

  function getPixelHackerSVG(size = 96) {
    return `
      <div class="pixel-hacker-wrap" title="Pelaku Sindikat Siber (Hacker)">
        <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
          <!-- Dark Hoodie Silhouette -->
          <rect x="6" y="2" width="12" height="5" fill="#0F172A" />
          <rect x="4" y="5" width="16" height="12" fill="#1E293B" />
          <rect x="2" y="9" width="20" height="9" fill="#0F172A" />
          <!-- Shadow Face -->
          <rect x="7" y="7" width="10" height="8" fill="#020617" />
          <!-- Sinister Glowing Red Eyes -->
          <rect x="8" y="9" width="3" height="2" fill="#EF4444" />
          <rect x="9" y="9" width="1" height="1" fill="#FEF2F2" />
          <rect x="13" y="9" width="3" height="2" fill="#EF4444" />
          <rect x="14" y="9" width="1" height="1" fill="#FEF2F2" />
          <!-- Malicious Smirk / Grin -->
          <rect x="9" y="13" width="6" height="1" fill="#DC2626" />
          <rect x="14" y="12" width="1" height="1" fill="#DC2626" />
          <!-- Shadow Body -->
          <rect x="5" y="17" width="14" height="7" fill="#0F172A" />
        </svg>
      </div>
    `;
  }

  // ========================================================
  // 2. SCENARIO REPOSITORY (3 DETAILED INVESTIGATIONS)
  // ========================================================
  const CRIMINAL_SCENARIOS = [
    {
      id: 'case_01',
      code: 'CASE #01',
      title: 'Jebakan Kurir Paket',
      modus: 'Phishing File APK (Sniffing SMS / OTP)',
      difficulty: 'Mudah',
      difficultyBadge: 'tag-cyan',
      backgroundDesc: 'Kamar kos korban dengan ponsel bergetar di atas meja belajar.',
      victimKey: 'raka',
      victimInfo: {
        name: 'Raka',
        age: '21 Tahun',
        occupation: 'Mahasiswa',
        context: 'Sedang menunggu 3 paket belanjaan online (buku, jaket, charger).',
        potentialLoss: 'Rp 4.200.000 saldo m-banking terkuras via pembajakan SMS OTP.'
      },
      dialogues: [
        {
          speaker: 'owl',
          speakerName: 'Detektif Owl',
          text: 'Laporan masuk dari Sektor Mahasiswa! Raka baru saja menerima pesan WhatsApp dari nomor asing yang mengaku kurir ekspedisi. Karena sedang menunggu barang, Raka hampir saja menekan file yang dikirimkan!'
        },
        {
          speaker: 'victim',
          speakerName: 'Raka (Korban)',
          text: 'Detektif Owl, tolong cek HP saya! Kurirnya bilang alamat saya kurang jelas dan menyuruh saya membuka foto resi itu sekarang juga! Padahal saya lagi nunggu paket datang!'
        },
        {
          speaker: 'owl',
          speakerName: 'Detektif Owl',
          text: 'Tenang Raka, jangan sentuh file itu! Mari kita amankan TKP Digital dan periksa pesan tersebut. Temukan 3 Red Flags mencurigakan di layar ponsel korban!'
        }
      ],
      crimeSceneType: 'phone_whatsapp',
      crimeSceneHeader: {
        senderTitle: 'J&T Express Resmi',
        senderNumber: '+62 813-8829-1092',
        status: 'Online • Akun Bisnis Tidak Terverifikasi'
      },
      crimeSceneText: 'Selamat siang Kak Raka. Paket dengan nomor resi JNT-88291029 alamatnya kurang jelas sehingga tertahan di gudang drop point. Mohon buka file lampiran foto resi paket berikut untuk konfirmasi:',
      clues: [
        {
          id: 'clue_c1_apk',
          hotspotId: 'hotspot-c1-apk',
          title: 'Ekstensi File Berbahaya (.apk)',
          badgeText: 'FILE .APK MALWARE',
          desc: 'File dokumen atau foto seharusnya berakhiran .jpg, .png, atau .pdf. Ekstensi .apk adalah paket aplikasi Android yang dapat mengeksekusi kode berbahaya!'
        },
        {
          id: 'clue_c1_num',
          hotspotId: 'hotspot-c1-num',
          title: 'Nomor Pengirim Pribadi Biasa',
          badgeText: 'NOMOR SELULER PRIBADI',
          desc: 'Akun ekspedisi resmi selalu menggunakan WhatsApp Official Business bertanda centang hijau (verified), bukan nomor seluler biasa (+62 813-...).'
        },
        {
          id: 'clue_c1_avatar',
          hotspotId: 'hotspot-c1-avatar',
          title: 'Foto Profil Buram & Comotan',
          badgeText: 'AVATAR RESOLUSI RENDAH',
          desc: 'Foto profil kurir pecah dan buram hasil comotan internet, digunakan untuk memanipulasi korban yang sedang terburu-buru.'
        }
      ],
      coreQuestion: 'Apa tindakan paling tepat yang harus dilakukan Raka, dan apa bahaya utama jika file .apk tersebut terinstal di ponselnya?',
      decisionOptions: [
        {
          text: 'A. Jangan buka file, hapus pesan seketika, dan lakukan pengecekan nomor resi HANYA melalui aplikasi belanja online atau website resmi ekspedisi. Bahaya utama file .apk adalah mencuri izin baca SMS untuk membajak kode OTP perbankan.',
          isCorrect: true
        },
        {
          text: 'B. Buka file .apk tersebut sebentar untuk memeriksa foto resi, lalu segera hapus aplikasi jika isinya bukan foto paket belanjaan.',
          isCorrect: false
        },
        {
          text: 'C. Balas chat kurir tersebut dengan menanyakan kenapa file berekstensi .apk, lalu kirimkan nomor KTP untuk mempermudah pengecekan alamat.',
          isCorrect: false
        }
      ],
      caseClosedSummary: 'HEBAT, DETEKTIF! Anda berhasil menyelamatkan tabungan mahasiswa Raka dari sindikat Sniffing APK! Modus file .apk palsu (surat tilang, undangan pernikahan, resi kurir) dirancang khusus meminta izin "RECEIVE_SMS" untuk mencuri kode OTP m-banking secara senyap.',
      caseFailedSummary: 'KORBAN TERJEBAK! Mengklik atau menginstal file .apk memberi penipu kontrol penuh terhadap SMS korban. m-Banking Raka langsung dibobol dan saldo Rp 4.200.000 raib dalam 5 menit!'
    },

    {
      id: 'case_02',
      code: 'CASE #02',
      title: 'Komisi Misi Rahasia',
      modus: 'Tawaran Kerja Paruh Waktu Palsu (Task Scam & Deposit)',
      difficulty: 'Sedang',
      difficultyBadge: 'tag-magenta',
      backgroundDesc: 'Meja kafe dengan laptop menyala menampilkan ruang obrolan grup Telegram.',
      victimKey: 'tari',
      victimInfo: {
        name: 'Tari',
        age: '23 Tahun',
        occupation: 'Fresh Graduate',
        context: 'Sedang aktif mencari kerja sampingan untuk menambah tabungan awal karier.',
        potentialLoss: 'Uang deposit jutaan rupiah yang tidak akan pernah bisa ditarik.'
      },
      dialogues: [
        {
          speaker: 'owl',
          speakerName: 'Detektif Owl',
          text: 'Kasus kedua di meja detektif! Tari diundang ke grup Telegram "Mitra E-Commerce Global". Awalnya dia benar-benar dibayar komisi Rp 50.000 hanya dengan memberikan "Like" pada produk toko. Tapi sekarang situasinya berubah berbahaya.'
        },
        {
          speaker: 'victim',
          speakerName: 'Tari (Korban)',
          text: 'Detektif! Untuk mencairkan komisi tahap 3 sebesar Rp 2.500.000, Admin menyuruh saya transfer deposit dulu Rp 1.000.000 ke rekening bendahara mereka. Di grup, anggota lain pada pamer bukti cair. Saya harus transfer sekarang?'
        },
        {
          speaker: 'owl',
          speakerName: 'Detektif Owl',
          text: 'Tahan tanganmu, Tari! Jangan biarkan euforia uang kecil membutakan logika. Mari kita bedah percakapan grup Telegram tersebut di meja forensik kita!'
        }
      ],
      crimeSceneType: 'laptop_telegram',
      crimeSceneHeader: {
        groupTitle: 'Mitra E-Commerce Global (VIP Misi 04)',
        membersCount: '842 anggota • 128 online'
      },
      clues: [
        {
          id: 'clue_c2_deposit',
          hotspotId: 'hotspot-c2-deposit',
          title: 'Tuntutan Uang Deposit di Muka',
          badgeText: 'DEPOSIT DI MUKA (RED FLAG)',
          desc: 'Pekerjaan yang SAH memberikan gaji kepada pekerja, bukan meminta pekerja menyetorkan deposit uang jaminan untuk mencairkan honor!'
        },
        {
          id: 'clue_c2_bots',
          hotspotId: 'hotspot-c2-bots',
          title: 'Pesan Bot / Komplotan Seragam',
          badgeText: 'PESAN BOT IDENTIK',
          desc: 'Anggota grup mengirimkan kalimat testimoni yang sama persis pada menit yang bersamaan (14:02). Ini adalah akun bot rekayasa sindikat untuk menciptakan ilusi kepercayaan!'
        },
        {
          id: 'clue_c2_rekening',
          hotspotId: 'hotspot-c2-rekening',
          title: 'Rekening Pribadi Rekayasa',
          badgeText: 'REKENING PERORANGAN',
          desc: 'Tuntutan transfer diarahkan ke rekening bank atas nama perorangan (Hendra Pratama), bukan rekening korporat atau agensi resmi.'
        }
      ],
      coreQuestion: 'Mengapa penipu memberikan uang Rp 50.000 sungguhan di awal, dan keputusan apa yang harus diambil Tari saat ini?',
      decisionOptions: [
        {
          text: 'A. Uang awal Rp 50.000 adalah umpan psikologis (hook) agar korban percaya dan rela menyetor uang lebih besar. Tari harus menolak transfer deposit, segera keluar dari grup Telegram, dan memblokir kontak pelaku.',
          isCorrect: true
        },
        {
          text: 'B. Tari sebaiknya mentransfer deposit Rp 1.000.000 karena sudah ada bukti komisi masuk sebelumnya, lalu langsung tarik semua modal dan keuntungan.',
          isCorrect: false
        },
        {
          text: 'C. Melobi admin agar uang deposit dipotong langsung dari total komisi Rp 2.500.000 yang belum dicairkan.',
          isCorrect: false
        }
      ],
      caseClosedSummary: 'ANALISIS SEMPURNA, DETEKTIF! Anda membongkar modus Task Scam berjenjang! Penipu sengaja mengorbankan nominal kecil di awal untuk memancing setoran modal jutaan rupiah. Begitu korban menyetor deposit, pelaku akan meminta deposit tambahan lagi hingga korban sadar dan diblokir.',
      caseFailedSummary: 'KORBAN TERJERAT! Tari mentransfer deposit Rp 1.000.000. Admin bukannya mencairkan komisi, malah menuntut "biaya pajak audit" Rp 3.000.000 lagi. Total tabungan Tari Rp 1.000.000 lenyap tanpa jejak!'
    },

    {
      id: 'case_03',
      code: 'CASE #03',
      title: 'Suara Panik di Seberang Telepon',
      modus: 'Social Engineering / Darurat Keluarga (Voice Scam & Vishing)',
      difficulty: 'Sulit',
      difficultyBadge: 'tag-red',
      backgroundDesc: 'Ruang tamu rumah di sore hari, telepon rumah berdering kencang.',
      victimKey: 'ibusari',
      victimInfo: {
        name: 'Ibu Sari',
        age: '52 Tahun',
        occupation: 'Ibu Rumah Tangga',
        context: 'Memiliki anak laki-laki yang sedang merantau kuliah di kota lain.',
        potentialLoss: 'Rp 15.000.000 tabungan keluarga ludes dalam hitungan menit.'
      },
      dialogues: [
        {
          speaker: 'owl',
          speakerName: 'Detektif Owl',
          text: 'Kasus darurat tingkat tinggi! Ibu Sari menerima panggilan telepon dari seseorang yang mengaku pihak Rumah Sakit dan Polisi. Mereka mengklaim anak Ibu Sari mengalami kecelakaan parah dan butuh biaya operasi darurat sekarang juga!'
        },
        {
          speaker: 'victim',
          speakerName: 'Ibu Sari (Korban)',
          text: 'Tadi saya sempat dengar suara anak saya menangis kesakitan di telepon sebentar sebelum diambil alih Bapak itu! Saya gemetar sekali Detektif... mereka minta transfer Rp 15 juta sekarang dan melarang saya menutup telepon!'
        },
        {
          speaker: 'owl',
          speakerName: 'Detektif Owl',
          text: 'Tarik napas dalam-dalam, Ibu Sari. Jangan biarkan teror psikologis mematikan logika. Mari kita bedah bukti panggilan darurat dan pesan intimidasi ini di meja detektif!'
        }
      ],
      crimeSceneType: 'phone_call_emergency',
      clues: [
        {
          id: 'clue_c3_isolation',
          hotspotId: 'hotspot-c3-isolation',
          title: 'Taktik Isolasi Psikologis',
          badgeText: 'LARANGAN TUTUP TELEPON',
          desc: 'Pelaku melarang korban menutup telepon agar korban terus panik dan TIDAK MEMILIKI KESEMPATAN menghubungi anaknya langsung untuk kroscek!'
        },
        {
          id: 'clue_c3_rekening',
          hotspotId: 'hotspot-c3-rekening',
          title: 'Transfer ke Rekening Pribadi Dokter',
          badgeText: 'REKENING PRIBADI DOKTER',
          desc: 'Prosedur rumah sakit dan kepolisian resmi TIDAK PERNAH meminta transfer biaya operasi mendesak ke rekening bank perorangan via telepon.'
        },
        {
          id: 'clue_c3_voice',
          hotspotId: 'hotspot-c3-voice',
          title: 'Manipulasi Suara & AI Voice Cloning',
          badgeText: 'SUARA TANGISAN TIDAK JELAS',
          desc: 'Suara tangisan yang sangat singkat dan tidak jelas adalah rekaman suara palsu atau simulasi AI voice cloning untuk memanipulasi emosional orang tua.'
        }
      ],
      coreQuestion: 'Bagaimana langkah verifikasi silang paling tepat yang harus dilakukan Ibu Sari di tengah kondisi teror panik tersebut?',
      decisionOptions: [
        {
          text: 'A. Segera putuskan panggilan telepon sepihak, tenangkan diri sejenak, lalu hubungi langsung nomor telepon pribadi anak atau teman sekamarnya, serta lakukan kroscek melalui call center resmi Rumah Sakit terkait.',
          isCorrect: true
        },
        {
          text: 'B. Langsung mentransfer Rp 15.000.000 melalui m-banking secepat kilat sambil tetap tersambung di telepon karena takut nyawa anak terancam.',
          isCorrect: false
        },
        {
          text: 'C. Meminta penelpon mengirimkan foto darah dan kondisi anak di ruang UGD sebelum bersedia mentransfer separuh uang tebusan.',
          isCorrect: false
        }
      ],
      caseClosedSummary: 'PENYELAMATAN BRILIAN, DETEKTIF! Ibu Sari memutus panggilan dan segera menelepon anaknya yang ternyata sedang berada di perpustakaan kampus dalam keadaan sehat walafiat! Modus Social Engineering darurat keluarga mengandalkan teror kepanikan agar korban tidak sempat berpikir logis.',
      caseFailedSummary: 'KORBAN TERTIPU! Ibu Sari mentransfer Rp 15.000.000 dalam kondisi panik luar biasa. Beberapa menit kemudian anaknya menelepon santai dari kampus, dan tabungan keluarga Ibu Sari telah lenyap tanpa bisa ditarik kembali!'
    }
  ];

  // ========================================================
  // 3. MODULE CRIMINAL CONTROLLER CLASS
  // ========================================================
  class ModuleCriminal {
    constructor() {
      this.cases = CRIMINAL_SCENARIOS;
      this.currentCaseIndex = 0;
      this.currentStage = 'desk'; // 'desk', 'briefing', 'crime_scene', 'decision', 'verdict'
      this.briefingStep = 0;
      this.foundClueIds = [];
      this.selectedDecisionIndex = null;
      this.isVerdictSuccess = false;
    }

    init(casesData) {
      // Use built-in deep scenarios, fallback to external if matching structure
      if (casesData && casesData.length >= 3 && casesData[0].crimeSceneType) {
        this.cases = casesData;
      }
      this.render();
    }

    getStorageKey() {
      const user = window.authManager?.currentUser;
      return user ? `knowyourscam_unlocked_criminal_${user.id || user.username}` : 'knowyourscam_unlocked_criminal_guest';
    }

    getUnlockedIndex() {
      try {
        const val = localStorage.getItem(this.getStorageKey());
        if (val !== null) {
          const parsed = parseInt(val, 10);
          return isNaN(parsed) ? 0 : Math.max(0, parsed);
        }
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
      return 0; // Case 0 unlocked by default
    }

    unlockNextCase() {
      try {
        const currentUnlocked = this.getUnlockedIndex();
        if (this.currentCaseIndex >= currentUnlocked) {
          const nextIdx = Math.min(this.cases.length - 1, this.currentCaseIndex + 1);
          localStorage.setItem(this.getStorageKey(), String(nextIdx));
        }
      } catch (e) {
        console.warn('LocalStorage save error:', e);
      }
    }

    render() {
      const container = document.getElementById('criminal-module-container');
      if (!container) return;

      const guestBanner = typeof window.renderGuestLeaderboardBanner === 'function'
        ? window.renderGuestLeaderboardBanner({ margin: '0 0 18px 0' })
        : '';

      switch (this.currentStage) {
        case 'desk':
          container.innerHTML = guestBanner + this.renderDeskScreenHTML();
          break;
        case 'briefing':
          container.innerHTML = guestBanner + this.renderBriefingScreenHTML();
          break;
        case 'crime_scene':
          container.innerHTML = guestBanner + this.renderCrimeSceneHTML();
          break;
        case 'decision':
          container.innerHTML = guestBanner + this.renderDecisionScreenHTML();
          break;
        case 'verdict':
          container.innerHTML = guestBanner + this.renderVerdictScreenHTML();
          break;
        default:
          container.innerHTML = guestBanner + this.renderDeskScreenHTML();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- VIEW 1: CASE FILE DESK (MEJA KERJA DETEKTIF) ---
    renderDeskScreenHTML() {
      const unlockedIdx = this.getUnlockedIndex();

      const foldersHtml = this.cases.map((scenario, idx) => {
        const isUnlocked = idx <= unlockedIdx;
        const isSolved = idx < unlockedIdx;

        return `
          <div class="case-folder-card ${isUnlocked ? '' : 'locked'}" onclick="window.moduleCriminal.openCase(${idx})">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
              <span class="case-folder-badge">
                📂 ${scenario.code}
              </span>
              <span class="cyber-tag ${scenario.difficultyBadge}">
                ${scenario.difficulty}
              </span>
            </div>

            <h3 style="font-size: 1.15rem; color: var(--text-highlight); margin: 6px 0 4px 0;">
              ${scenario.title}
            </h3>

            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-cyan); margin-bottom: 12px;">
              Modus: ${scenario.modus}
            </div>

            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 16px;">
              ${scenario.backgroundDesc}
            </p>

            <div style="display:flex; justify-content:space-between; align-items:center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 12px;">
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon-green);">
                ${isSolved ? '✓ CASE CLOSED 🏆' : ''}
              </span>
              <button class="cyber-btn ${isUnlocked ? '' : 'btn-ghost'}" style="padding: 6px 14px; font-size: 0.78rem;">
                ${isUnlocked ? 'BUKA MAP ➔' : 'TERKUNCI'}
              </button>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="holo-enter" style="max-width: 960px; margin: 0 auto;">
          <div class="detective-desk-wrapper">
            
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap: 16px; border-bottom: 1px solid var(--border-cyan); padding-bottom: 18px;">
              <div style="display:flex; align-items:center; gap: 14px;">
                ${getPixelDetectiveOwlSVG(72)}
                <div>
                  <div class="cyber-tag tag-cyan" style="font-size:0.7rem; margin-bottom: 4px;">
                    MEJA KERJA DETEKTIF SIBER // CRIMINAL CASE
                  </div>
                  <h1 style="font-size: 1.6rem; color: var(--text-highlight); margin: 0;">
                    KANTOR INVESTIGASI DETEKTIF OWL
                  </h1>
                </div>
              </div>
              <div style="text-align: right; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">
                Status Berkas: <strong style="color: var(--neon-cyan);">${Math.min(this.cases.length, unlockedIdx + 1)}/${this.cases.length} Terbuka</strong>
              </div>
            </div>

            <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; margin: 18px 0 8px 0;">
              Pilih salah satu berkas kasus untuk memulai investigasi TKP Digital bersama Detektif Owl:
            </p>

            <div class="case-folders-grid">
              ${foldersHtml}
            </div>

          </div>
        </div>
      `;
    }

    // --- VIEW 2: FASE 1 - INTRO & SINOPSIS (ANIMATED BUBBLE CHAT) ---
    renderBriefingScreenHTML() {
      const scenario = this.cases[this.currentCaseIndex];
      const dialoguesSoFar = scenario.dialogues.slice(0, this.briefingStep + 1);
      const isLastStep = this.briefingStep >= scenario.dialogues.length - 1;
      const nextDialogue = !isLastStep ? scenario.dialogues[this.briefingStep + 1] : null;

      const chatRowsHtml = dialoguesSoFar.map((d, i) => {
        const isOwl = d.speaker === 'owl';
        const isLatest = i === dialoguesSoFar.length - 1;
        return `
          <div class="chat-bubble-row ${isOwl ? 'chat-row-owl' : 'chat-row-victim'}" style="${isLatest ? 'animation: bubbleSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;' : ''}">
            <div style="flex-shrink: 0;">
              ${isOwl ? getPixelDetectiveOwlSVG(38) : getPixelVictimSVG(scenario.victimKey, 38)}
            </div>
            <div class="chat-bubble ${isOwl ? 'bubble-owl' : 'bubble-victim'}">
              <div class="chat-bubble-header" style="color: ${isOwl ? 'var(--neon-cyan)' : 'var(--neon-amber)'};">
                <span>${isOwl ? '🦉 Detektif Owl' : `👤 ${d.speakerName}`}</span>
              </div>
              <div style="font-size: 0.92rem; line-height: 1.55;">
                "${d.text}"
              </div>
              <div class="chat-bubble-meta">
                <span>${isOwl ? '10:15 • Terkirim ✓✓' : '10:14 • Diterima'}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Auto-scroll chat thread to bottom after render
      setTimeout(() => {
        const thread = document.getElementById('criminal-chat-thread-container');
        if (thread) thread.scrollTop = thread.scrollHeight;
      }, 50);

      return `
        <div class="holo-enter" style="max-width: 860px; margin: 0 auto;">
          <div class="briefing-dialog-card">
            
            <!-- Top Status Bar -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px; border-bottom: 1px solid rgba(0,243,255,0.15); padding-bottom: 10px; flex-wrap:wrap; gap:8px;">
              <div style="display:flex; align-items:center; gap: 8px;">
                <span class="cyber-tag tag-cyan">FASE 1: BRIEFING KASUS</span>
                <strong style="color: var(--text-highlight); font-size: 0.95rem;">${scenario.code}: ${scenario.title}</strong>
              </div>
              <button class="cyber-btn btn-ghost" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.moduleCriminal.returnToDesk()">
                ✕ KEMBALI KE MEJA
              </button>
            </div>

            <!-- Victim Identity Dossier Strip -->
            <div class="victim-id-card" style="margin-top: 0; margin-bottom: 14px;">
              <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap: 8px;">
                <span>👤 KORBAN: <strong style="color:var(--text-main);">${scenario.victimInfo.name} (${scenario.victimInfo.age}, ${scenario.victimInfo.occupation})</strong></span>
                <span>⚠️ POTENSI KERUGIAN: <strong style="color:var(--neon-red);">${scenario.victimInfo.potentialLoss}</strong></span>
              </div>
              <div style="margin-top: 4px;">
                📌 KASUS: <em>${scenario.victimInfo.context}</em>
              </div>
            </div>

            <!-- Animated Bubble Chat Thread -->
            <div class="criminal-chat-thread" id="criminal-chat-thread-container">
              ${chatRowsHtml}

              ${nextDialogue ? `
                <div class="chat-bubble-row ${nextDialogue.speaker === 'owl' ? 'chat-row-owl' : 'chat-row-victim'}" style="opacity: 0.75;">
                  <div style="flex-shrink: 0;">
                    ${nextDialogue.speaker === 'owl' ? getPixelDetectiveOwlSVG(32) : getPixelVictimSVG(scenario.victimKey, 32)}
                  </div>
                  <div style="font-size: 0.78rem; font-family: var(--font-mono); color: var(--text-muted); display:flex; align-items:center; gap:6px; padding: 6px 12px; background: rgba(0,0,0,0.3); border-radius: 12px;">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span>${nextDialogue.speaker === 'owl' ? 'Detektif Owl' : scenario.victimInfo.name} sedang berbicara...</span>
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Action Progression Bar -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap: 12px; margin-top: 14px;">
              <div style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">
                Percakapan ${this.briefingStep + 1} dari ${scenario.dialogues.length}
              </div>

              <div style="display:flex; gap: 8px;">
                ${!isLastStep ? `
                  <button class="cyber-btn btn-ghost" style="padding: 8px 14px; font-size: 0.8rem;" onclick="window.moduleCriminal.revealAllDialogues()">
                    ⚡ TAMPILKAN SEMUA
                  </button>
                  <button class="cyber-btn" style="padding: 10px 22px; font-size: 0.88rem;" onclick="window.moduleCriminal.nextBriefingDialog()">
                    LANJUT CHAT 💬 ➔
                  </button>
                ` : `
                  <button class="cyber-btn" style="padding: 12px 30px; font-size: 0.95rem; box-shadow: 0 0 25px var(--neon-cyan-dim);" onclick="window.moduleCriminal.startCrimeSceneInvestigation()">
                    <span>🔎</span> MULAI INVESTIGASI TKP DIGITAL ➔
                  </button>
                `}
              </div>
            </div>

          </div>
        </div>
      `;
    }

    // --- VIEW 3: FASE 2 - INVESTIGASI TKP DIGITAL (INTERACTIVE HOTSPOTS) ---
    renderCrimeSceneHTML() {
      const scenario = this.cases[this.currentCaseIndex];
      const foundCount = this.foundClueIds.length;
      const allFound = foundCount >= scenario.clues.length;

      return `
        <div class="holo-enter" style="max-width: 900px; margin: 0 auto;">
          <div class="crime-scene-wrapper">
            
            <!-- Header Status -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px; border-bottom: 1px solid rgba(0,243,255,0.15); padding-bottom: 10px;">
              <div style="display:flex; align-items:center; gap: 10px;">
                ${getPixelDetectiveOwlSVG(40)}
                <div>
                  <span class="cyber-tag tag-cyan" style="font-size:0.7rem;">FASE 2: INVESTIGASI TKP DIGITAL</span>
                  <h3 style="margin: 0; font-size: 1.1rem; color: var(--text-highlight);">
                    ${scenario.code}: ${scenario.title}
                  </h3>
                </div>
              </div>
              <div style="display:flex; align-items:center; gap: 12px;">
                <span style="font-family: var(--font-mono); font-size: 0.85rem; color: ${allFound ? 'var(--neon-green)' : 'var(--neon-amber)'};">
                  Red Flags: <strong>${foundCount}/${scenario.clues.length} Ditemukan</strong>
                </span>
                <button class="cyber-btn btn-ghost" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.moduleCriminal.returnToDesk()">
                  ✕ KELUAR
                </button>
              </div>
            </div>

            <!-- Prompt Instructions -->
            <div style="background: rgba(0,243,255,0.06); border: 1px solid var(--border-cyan); border-radius: 6px; padding: 10px 16px; margin-bottom: 16px;">
              <span style="font-size: 0.85rem; color: var(--neon-cyan);">
                🔎 <strong>INSTRUKSI DETEKTIF:</strong> Klik atau ketuk bagian layar yang mencurigakan (Red Flags) di bawah ini untuk mengumpulkan barang bukti!
              </span>
            </div>

            <!-- Device Mockup Frame (Crime Scene) -->
            <div class="crime-scene-device-frame">
              ${this.renderDeviceCrimeSceneContent(scenario)}
            </div>

            <!-- Clues Discovery Status Bar -->
            <div class="clues-discovery-bar">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <strong style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-cyan);">
                  BARANG BUKTI TERKUMPUL (${foundCount}/${scenario.clues.length})
                </strong>
                ${allFound ? `
                  <span class="cyber-tag tag-green">✓ SEMUA RED FLAGS DITEMUKAN!</span>
                ` : `
                  <span class="cyber-tag tag-amber">CARI BAGIAN MENCURIGAKAN LAINNYA</span>
                `}
              </div>

              <div class="clue-pill-grid">
                ${scenario.clues.map((clue, cIdx) => {
                  const isFound = this.foundClueIds.includes(clue.id);
                  return `
                    <div class="clue-pill-item ${isFound ? 'unlocked' : ''}">
                      <div style="font-size: 1.2rem;">${isFound ? '🔍' : '🔒'}</div>
                      <div>
                        <div style="font-weight: 700; font-size: 0.82rem; color: ${isFound ? 'var(--neon-green)' : 'var(--text-muted)'};">
                          ${isFound ? clue.title : `Red Flag #${cIdx + 1} (Belum Terdeteksi)`}
                        </div>
                        <div style="font-size: 0.75rem; color: ${isFound ? 'var(--text-main)' : 'var(--text-muted)'}; margin-top: 2px;">
                          ${isFound ? clue.desc : 'Klik area yang mencurigakan pada tampilan di atas...'}
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>

              <!-- Unlock Phase 3 Button when all found -->
              ${allFound ? `
                <div style="text-align: center; margin-top: 20px;" class="holo-enter">
                  <button class="cyber-btn" style="padding: 12px 32px; font-size: 1rem; box-shadow: 0 0 25px var(--neon-cyan-dim);" onclick="window.moduleCriminal.proceedToDecision()">
                    <span>⚖️</span> MASUK KE ANALISIS & KEPUTUSAN AKHIR ➔
                  </button>
                </div>
              ` : ''}

            </div>

          </div>
        </div>
      `;
    }

    // Helper: Render crime scene device specifics
    renderDeviceCrimeSceneContent(scenario) {
      const isClue1Found = this.foundClueIds.includes(scenario.clues[0].id);
      const isClue2Found = this.foundClueIds.includes(scenario.clues[1].id);
      const isClue3Found = this.foundClueIds.includes(scenario.clues[2].id);

      switch (scenario.crimeSceneType) {
        case 'phone_whatsapp':
          // Case 1: WhatsApp Chat with APK file
          return `
            <div class="crime-device-topbar">
              <div style="display:flex; align-items:center; gap: 8px;">
                <!-- Hotspot 3: Blurry avatar -->
                <div class="crime-hotspot ${isClue3Found ? 'found' : ''}" style="padding: 2px;" onclick="window.moduleCriminal.clickHotspot('${scenario.clues[2].id}')">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: #94A3B8; display:flex; align-items:center; justify-content:center; font-size: 1.1rem; filter: blur(1px);">
                    📦
                  </div>
                  ${isClue3Found ? '<span class="crime-pin-marker">✓ FOTO BURAM</span>' : ''}
                </div>
                <div>
                  <div style="font-weight: 700; color: #FFFFFF;">${scenario.crimeSceneHeader.senderTitle}</div>
                  <!-- Hotspot 2: Regular telephone number without verified badge -->
                  <div class="crime-hotspot ${isClue2Found ? 'found' : ''}" style="display:inline-block; padding: 2px 4px;" onclick="window.moduleCriminal.clickHotspot('${scenario.clues[1].id}')">
                    <span style="color: #38BDF8; font-size: 0.7rem;">${scenario.crimeSceneHeader.senderNumber}</span>
                    ${isClue2Found ? '<span class="crime-pin-marker">✓ NOMOR BIASA</span>' : ''}
                  </div>
                </div>
              </div>
              <span class="cyber-tag" style="font-size: 0.65rem;">WhatsApp</span>
            </div>

            <div class="crime-screen-content" style="min-height: 280px; display:flex; flex-direction:column; gap: 12px;">
              <div style="background: rgba(255,255,255,0.06); padding: 12px 14px; border-radius: 8px; font-size: 0.85rem; color: #E2E8F0; line-height: 1.5;">
                ${scenario.crimeSceneText}
              </div>

              <!-- Hotspot 1: Malicious APK File -->
              <div class="crime-hotspot ${isClue1Found ? 'found' : ''}" style="padding: 12px; background: rgba(30, 41, 59, 0.9); border-radius: 8px; display:flex; align-items:center; justify-content:space-between;" onclick="window.moduleCriminal.clickHotspot('${scenario.clues[0].id}')">
                <div style="display:flex; align-items:center; gap: 10px;">
                  <span style="font-size: 2rem;">📄</span>
                  <div>
                    <div style="font-weight: 700; color: #F87171; font-family: var(--font-mono); font-size: 0.88rem;">
                      LIHAT-FOTO-PAKET.apk
                    </div>
                    <div style="font-size: 0.72rem; color: #94A3B8;">
                      Ukuran: 4.2 MB • Ekstensi Android Package
                    </div>
                  </div>
                </div>
                ${isClue1Found ? `
                  <span class="crime-pin-marker">✓ EKSTENSI .APK</span>
                ` : `
                  <span style="font-size: 0.75rem; color: #EF4444; font-family: var(--font-mono);">KLIK PERIKSA 🔍</span>
                `}
              </div>

              <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; padding: 8px 12px; font-size: 0.78rem; color: #FCA5A5;">
                ⚠️ "Harap segera diinstal dan dibuka agar paket Anda tidak diretur kembali ke kurir pusat!"
              </div>
            </div>
          `;

        case 'laptop_telegram':
          // Case 2: Telegram Group with Admin asking deposit and bots
          return `
            <div class="crime-device-topbar">
              <div style="display:flex; align-items:center; gap: 8px;">
                <span style="font-size: 1.1rem;">✈️</span>
                <div>
                  <div style="font-weight: 700; color: #FFFFFF;">${scenario.crimeSceneHeader.groupTitle}</div>
                  <div style="font-size: 0.68rem; color: #38BDF8;">${scenario.crimeSceneHeader.membersCount}</div>
                </div>
              </div>
              <span class="cyber-tag tag-cyan" style="font-size: 0.65rem;">Telegram Web</span>
            </div>

            <div class="crime-screen-content" style="min-height: 290px; display:flex; flex-direction:column; gap: 10px;">
              <!-- Hotspot 1: Admin Deposit Demand -->
              <div class="crime-hotspot ${isClue1Found ? 'found' : ''}" style="background: rgba(239,68,68,0.12); border-radius: 8px; padding: 12px;" onclick="window.moduleCriminal.clickHotspot('${scenario.clues[0].id}')">
                <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
                  <strong style="color: #F87171; font-size: 0.8rem;">👑 Admin Hendra Pratama (Penyelia Misi)</strong>
                  <span style="font-size: 0.68rem; color: #94A3B8;">14:01</span>
                </div>
                <p style="font-size: 0.82rem; color: #F1F5F9; line-height: 1.4; margin: 0 0 6px 0;">
                  📢 PERINGATAN TIMER: Sisa 15 menit untuk menyelesaikan Misi VIP! Wajib setor deposit jaminan Rp 1.000.000 untuk mencairkan honor Rp 2.500.000!
                </p>
                <!-- Hotspot 3: Personal Bank Account -->
                <div class="crime-hotspot ${isClue3Found ? 'found' : ''}" style="display:inline-block; background: rgba(0,0,0,0.4); padding: 4px 8px; border-radius: 4px;" onclick="event.stopPropagation(); window.moduleCriminal.clickHotspot('${scenario.clues[2].id}')">
                  <span style="color: #FBBF24; font-family: var(--font-mono); font-size: 0.75rem;">
                    BCA 8820192837 a.n Hendra Pratama
                  </span>
                  ${isClue3Found ? '<span class="crime-pin-marker">✓ REK PRIBADI</span>' : ''}
                </div>
                ${isClue1Found ? '<span class="crime-pin-marker" style="margin-top:6px; display:inline-block;">✓ DEPOSIT DI MUKA</span>' : ''}
              </div>

              <!-- Hotspot 2: Bot Members with identical timestamps and texts -->
              <div class="crime-hotspot ${isClue2Found ? 'found' : ''}" style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 10px;" onclick="window.moduleCriminal.clickHotspot('${scenario.clues[1].id}')">
                <div style="font-size: 0.78rem; color: #E2E8F0; margin-bottom: 6px;">
                  <strong style="color: #38BDF8;">Rina (Member):</strong> "Bukti cair! Baru deposit 1 juta langsung cair 2.5 juta terima kasih admin! 🙏💸" <span style="color:#94A3B8; font-size:0.68rem;">14:02</span>
                </div>
                <div style="font-size: 0.78rem; color: #E2E8F0;">
                  <strong style="color: #38BDF8;">Bayu (Member):</strong> "Bukti cair! Baru deposit 1 juta langsung cair 2.5 juta terima kasih admin! 🙏💸" <span style="color:#94A3B8; font-size:0.68rem;">14:02</span>
                </div>
                ${isClue2Found ? '<span class="crime-pin-marker" style="margin-top:6px; display:inline-block;">✓ PESAN BOT SERAGAM</span>' : ''}
              </div>
            </div>
          `;

        case 'phone_call_emergency':
          // Case 3: Emergency Call Interface & Intimidation message
          return `
            <div class="crime-device-topbar">
              <div style="display:flex; align-items:center; gap: 8px;">
                <span style="font-size: 1.1rem; color: #EF4444;">📞</span>
                <span style="font-weight: 700; color: #F87171;">PANGGILAN AKTIF DARURAT RS (02:41)</span>
              </div>
              <span class="cyber-tag tag-red" style="font-size: 0.65rem;">TELEPON SIBER</span>
            </div>

            <div class="crime-screen-content" style="min-height: 290px; display:flex; flex-direction:column; gap: 12px;">
              <!-- Hotspot 3: Voice ticker and crying audio simulation -->
              <div class="crime-hotspot ${isClue3Found ? 'found' : ''}" style="background: rgba(220, 38, 38, 0.15); border-radius: 8px; padding: 12px; text-align: center;" onclick="window.moduleCriminal.clickHotspot('${scenario.clues[2].id}')">
                <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #FCA5A5; margin-bottom: 4px;">
                  TRANSMISI SUARA PENELPON // RS & KEPOLISIAN:
                </div>
                <p style="font-size: 0.88rem; color: #FFFFFF; font-weight: 600; line-height: 1.4; margin: 0 0 6px 0;">
                  "Ibu Sari! Anak Ibu kecelakaan pendarahan otak di jalan layang! Butuh uang operasi Rp 15 juta sekarang!"
                </p>
                <div style="font-size: 0.75rem; color: #94A3B8; font-style: italic;">
                  (Terdengar suara tangisan singkat tidak jelas di latar belakang)
                </div>
                ${isClue3Found ? '<span class="crime-pin-marker" style="margin-top:6px; display:inline-block;">✓ SUARA REKAYASA</span>' : ''}
              </div>

              <!-- Hotspots 1 & 2: Intimidation & Personal Bank Account -->
              <div style="background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 12px;">
                <div style="font-size: 0.75rem; color: #38BDF8; margin-bottom: 4px;">PESAN WHATSAPP MASUK DARI PENELPON:</div>
                
                <!-- Hotspot 2: Personal doctor bank account -->
                <div class="crime-hotspot ${isClue2Found ? 'found' : ''}" style="padding: 6px; margin-bottom: 8px; background: rgba(0,0,0,0.4); border-radius: 4px;" onclick="window.moduleCriminal.clickHotspot('${scenario.clues[1].id}')">
                  <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #FDE68A;">
                    "Transfer segera ke BCA 7719283719 a.n Dr. Arya Wijaya Sp.B"
                  </span>
                  ${isClue2Found ? '<span class="crime-pin-marker">✓ REKENING DOKTER</span>' : ''}
                </div>

                <!-- Hotspot 1: Do not hang up intimidation -->
                <div class="crime-hotspot ${isClue1Found ? 'found' : ''}" style="padding: 6px; background: rgba(220,38,38,0.2); border-radius: 4px;" onclick="window.moduleCriminal.clickHotspot('${scenario.clues[0].id}')">
                  <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #EF4444; font-weight: 700;">
                    "JANGAN MATIKAN TELEPON ATAU KAMI ANGGAP KELUARGA MENOLAK TINDAKAN PENYELAMATAN!"
                  </span>
                  ${isClue1Found ? '<span class="crime-pin-marker">✓ TAKTIK ISOLASI</span>' : ''}
                </div>
              </div>
            </div>
          `;

        default:
          return `<div style="padding:20px; text-align:center;">Memuat tampilan bukti TKP...</div>`;
      }
    }

    // --- VIEW 4: FASE 3 - ANALISIS & KEPUTUSAN AKHIR ---
    renderDecisionScreenHTML() {
      const scenario = this.cases[this.currentCaseIndex];

      return `
        <div class="holo-enter" style="max-width: 860px; margin: 0 auto;">
          <div class="briefing-dialog-card">
            
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px; border-bottom: 1px solid rgba(0,243,255,0.15); padding-bottom: 10px;">
              <div style="display:flex; align-items:center; gap: 10px;">
                ${getPixelDetectiveOwlSVG(40)}
                <div>
                  <span class="cyber-tag tag-cyan" style="font-size:0.7rem;">FASE 3: ANALISIS KEPUTUSAN</span>
                  <h3 style="margin: 0; font-size: 1.1rem; color: var(--text-highlight);">
                    EVALUASI FORENSIK & KEPUTUSAN AKHIR
                  </h3>
                </div>
              </div>
              <span class="cyber-tag tag-green">3/3 RED FLAGS TERKUMPUL</span>
            </div>

            <!-- Detective Owl Guidance -->
            <div class="dialog-speech-deck" style="margin-bottom: 20px;">
              <div class="dialog-speaker-tag">
                🦉 Detektif Owl:
              </div>
              <p style="font-size: 0.95rem; color: var(--text-main); line-height: 1.5; margin: 0;">
                "Semua bukti terkumpul di berkas perkara! Tentukan keputusan mitigasi terbaik untuk melindungi korban dan menggagalkan penipuan."
              </p>
            </div>

            <!-- Core Question -->
            <div style="background: rgba(0,243,255,0.06); border: 1px solid var(--border-cyan); border-radius: 8px; padding: 16px 20px; margin-bottom: 20px;">
              <h4 style="color: var(--neon-cyan); margin: 0 0 6px 0; font-size: 1.05rem;">
                ⚖️ PERTANYAAN INTI INVESTIGASI:
              </h4>
              <p style="font-size: 0.92rem; color: var(--text-highlight); font-weight: 600; line-height: 1.5; margin: 0;">
                ${scenario.coreQuestion}
              </p>
            </div>

            <!-- Decision Options -->
            <div style="display:flex; flex-direction:column; gap: 12px; margin-bottom: 24px;">
              ${scenario.decisionOptions.map((opt, oIdx) => {
                const isSelected = this.selectedDecisionIndex === oIdx;
                return `
                  <button 
                    class="chat-response-btn ${isSelected ? 'selected' : ''}" 
                    style="text-align: left; padding: 14px 18px; line-height: 1.5; font-size: 0.88rem; ${isSelected ? 'border-color: var(--neon-cyan); background: rgba(0,243,255,0.12);' : ''}"
                    onclick="window.moduleCriminal.selectDecision(${oIdx})"
                  >
                    <span>${isSelected ? '🔘' : '⚪'}</span>
                    <span>${opt.text}</span>
                  </button>
                `;
              }).join('')}
            </div>

            <!-- Submit Decision Button -->
            <div style="text-align: right;">
              <button 
                class="cyber-btn" 
                style="padding: 12px 36px; font-size: 1rem; box-shadow: 0 0 25px var(--neon-cyan-dim);"
                onclick="window.moduleCriminal.submitVerdict()"
              >
                <span>🚨</span> TETAPKAN KEPUTUSAN & VONIS KASUS ➔
              </button>
            </div>

          </div>
        </div>
      `;
    }

    // --- VIEW 5: FASE 4 - PENANGKAPAN & EVALUASI (CASE CLOSED / FAILED) ---
    renderVerdictScreenHTML() {
      const scenario = this.cases[this.currentCaseIndex];
      const isSuccess = this.isVerdictSuccess;

      return `
        <div class="holo-enter" style="max-width: 860px; margin: 0 auto;">
          <div class="briefing-dialog-card" style="text-align: center; padding: 36px 30px;">
            
            <!-- Animated Characters Stage -->
            <div style="display:flex; justify-content:center; align-items:center; gap: 24px; margin-bottom: 20px;">
              ${isSuccess ? `
                ${getPixelDetectiveOwlSVG(110)}
              ` : `
                ${getPixelHackerSVG(110)}
              `}
            </div>

            <!-- Animated Stamp Badge -->
            <div class="verdict-stamp-wrap">
              <div class="stamp-badge ${isSuccess ? 'stamp-success' : 'stamp-failed'}">
                ${isSuccess ? 'CASE CLOSED // SCAM BLOCKED' : 'VICTIM SCAMMED // KASUS GAGAL'}
              </div>
            </div>

            <!-- Result Title -->
            <h2 style="font-size: 1.6rem; color: ${isSuccess ? 'var(--neon-green)' : 'var(--neon-red)'}; margin: 16px 0 10px 0;">
              ${isSuccess ? 'Aksi Penipuan Berhasil Digagalkan!' : 'Korban Masuk ke Dalam Perangkap Penipu!'}
            </h2>

            <!-- Educational Modus Lore -->
            <div style="background: rgba(0,0,0,0.4); border: 1px solid ${isSuccess ? 'var(--border-green)' : 'rgba(239,68,68,0.4)'}; border-radius: 8px; padding: 18px 24px; max-width: 680px; margin: 0 auto 24px auto; text-align: left;">
              <h4 style="color: ${isSuccess ? 'var(--neon-green)' : 'var(--neon-red)'}; margin: 0 0 8px 0; font-size: 0.95rem;">
                📚 KESIMPULAN FORENSIK & EDUKASI SIBER:
              </h4>
              <p style="font-size: 0.9rem; color: var(--text-main); line-height: 1.6; margin: 0;">
                ${isSuccess ? scenario.caseClosedSummary : scenario.caseFailedSummary}
              </p>
            </div>

            <!-- Navigation Actions -->
            <div style="display:flex; justify-content:center; gap: 14px; flex-wrap: wrap;">
              <button class="cyber-btn btn-ghost" onclick="window.moduleCriminal.returnToDesk()">
                <span>📂</span> KEMBALI KE MEJA DETEKTIF
              </button>
              ${!isSuccess ? `
                <button class="cyber-btn" onclick="window.moduleCriminal.retryCurrentCase()">
                  <span>🔄</span> ULANGI INVESTIGASI INI
                </button>
              ` : `
                ${this.currentCaseIndex < this.cases.length - 1 ? `
                  <button class="cyber-btn" onclick="window.moduleCriminal.openCase(${this.currentCaseIndex + 1})">
                    <span>⚡</span> BUKA KASUS BERIKUTNYA ➔
                  </button>
                ` : `
                  <button class="cyber-btn" onclick="window.moduleCriminal.returnToDesk()">
                    <span>🏆</span> SEMUA KASUS TELAH TERSELESAIKAN!
                  </button>
                `}
              `}
            </div>

          </div>
        </div>
      `;
    }

    // ========================================================
    // 4. CONTROLLER ACTIONS & INTERACTIONS
    // ========================================================

    openCase(idx) {
      const unlockedIdx = this.getUnlockedIndex();
      if (idx > unlockedIdx) {
        window.cyberAudio?.playError();
        window.app?.showToast('Berkas kasus ini masih terkunci! Selesaikan kasus sebelumnya terlebih dahulu.', 'error');
        return;
      }

      window.cyberAudio?.playClick();
      this.currentCaseIndex = idx;
      this.currentStage = 'briefing';
      this.briefingStep = 0;
      this.foundClueIds = [];
      this.selectedDecisionIndex = null;
      this.isVerdictSuccess = false;
      this.render();
    }

    nextBriefingDialog() {
      const scenario = this.cases[this.currentCaseIndex];
      if (this.briefingStep < scenario.dialogues.length - 1) {
        this.briefingStep++;
        window.cyberAudio?.playNotification ? window.cyberAudio.playNotification() : window.cyberAudio?.playClick();
        this.render();
      }
    }

    revealAllDialogues() {
      window.cyberAudio?.playClick();
      const scenario = this.cases[this.currentCaseIndex];
      this.briefingStep = scenario.dialogues.length - 1;
      this.render();
    }

    startCrimeSceneInvestigation() {
      window.cyberAudio?.playSuccess();
      this.currentStage = 'crime_scene';
      this.foundClueIds = [];
      this.render();
    }

    clickHotspot(clueId) {
      if (this.foundClueIds.includes(clueId)) return;

      window.cyberAudio?.playSuccess();
      this.foundClueIds.push(clueId);

      const scenario = this.cases[this.currentCaseIndex];
      const clue = scenario.clues.find(c => c.id === clueId);
      if (clue) {
        window.app?.showToast(`🔍 Red Flag Ditemukan: ${clue.title}!`, 'success');
      }

      this.render();
    }

    proceedToDecision() {
      window.cyberAudio?.playClick();
      this.currentStage = 'decision';
      this.selectedDecisionIndex = null;
      this.render();
    }

    selectDecision(idx) {
      window.cyberAudio?.playClick();
      this.selectedDecisionIndex = idx;
      this.render();
    }

    submitVerdict() {
      if (this.selectedDecisionIndex === null) {
        window.cyberAudio?.playError();
        window.app?.showToast('Pilih salah satu opsi keputusan sebelum menetapkan vonis!', 'error');
        return;
      }

      const scenario = this.cases[this.currentCaseIndex];
      const selected = scenario.decisionOptions[this.selectedDecisionIndex];
      this.isVerdictSuccess = !!selected.isCorrect;

      if (this.isVerdictSuccess) {
        window.cyberAudio?.playSuccess();
        this.unlockNextCase();
        // Record reward to live user state & leaderboard
        window.authManager?.recordResult(
          150,
          -1.5,
          `CRIMINAL CASE [${scenario.code}]`,
          `${scenario.title}: CASE CLOSED`,
          'SECURED',
          'criminal'
        );
      } else {
        window.cyberAudio?.playError();
        window.authManager?.recordResult(
          25,
          2.0,
          `CRIMINAL CASE [${scenario.code}]`,
          `${scenario.title}: VICTIM SCAMMED`,
          'COMPROMISED',
          'criminal'
        );
      }

      this.currentStage = 'verdict';
      this.render();
    }

    returnToDesk() {
      window.cyberAudio?.playClick();
      this.currentStage = 'desk';
      this.render();
    }

    retryCurrentCase() {
      window.cyberAudio?.playClick();
      this.currentStage = 'crime_scene';
      this.foundClueIds = [];
      this.selectedDecisionIndex = null;
      this.render();
    }

    // Forwarders for routing & backward compatibility
    startScenario(idx) {
      this.openCase(idx || 0);
    }

    setCase(idx) {
      this.openCase(idx || 0);
    }
  }

  // Instantiate and bind globally
  window.moduleCriminal = new ModuleCriminal();
})();
