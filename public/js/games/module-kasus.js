/**
 * KNOW YOUR SCAM: ANTI-GRAVITY CYBER DEFENSE
 * SCAM SIMULATOR: MULTI-POV DECEPTION ARENA
 * Fitur:
 * - Dua Role Kontras: Scammer (Si Penipu) & Victim (Calon Korban)
 * - 6 Karakter Hewan Pixel SVG Animasi (Buaya, Singa, Elang vs Kucing, Hamster, Kelinci)
 * - Modal Tutorial Khusus
 * - Smartphone Mockup, Notification Banner, & Animated Chat UI
 * - Simulasi Telepon Masuk untuk Love Scam
 * - Percabangan Naratif (Branching Choices menuju Happy & Bad Ending)
 * - Tantangan Analisis Forensik Interaktif sebelum Ending
 * - Skenario Penipuan (Love Scam, Phishing, Job Scam) & Skenario Resmi (Legitimate)
 * - Dukungan Penuh Dark Mode & Light Mode
 */

(function() {
  'use strict';

  // ========================================================
  // 1. ANIMATED PIXEL ART SVG GENERATORS (CRISP EDGES)
  // ========================================================
  function getPixelAvatarSVG(charId, size = 72) {
    switch (charId) {
      case 'buaya':
        // 🐊 Buaya (Crocodile) - Love Scammer
        return `
          <div class="pixel-avatar-wrap" title="Buaya - Love Scammer">
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Body / Snout -->
              <rect x="3" y="10" width="18" height="8" fill="#10B981" />
              <rect x="5" y="8" width="14" height="2" fill="#059669" />
              <rect x="1" y="12" width="6" height="4" fill="#34D399" />
              <!-- Sharp Teeth -->
              <rect x="2" y="14" width="1" height="2" fill="#FFFFFF" />
              <rect x="4" y="14" width="1" height="2" fill="#FFFFFF" />
              <rect x="6" y="14" width="1" height="2" fill="#FFFFFF" />
              <!-- Charming Heart Sunglasses / Wink -->
              <rect x="8" y="7" width="5" height="4" fill="#F43F5E" />
              <rect x="14" y="7" width="5" height="4" fill="#F43F5E" />
              <rect x="9" y="8" width="1" height="1" fill="#FFFFFF" />
              <rect x="15" y="8" width="1" height="1" fill="#FFFFFF" />
              <rect x="13" y="8" width="1" height="2" fill="#1E293B" />
              <!-- Suit & Tie -->
              <rect x="7" y="18" width="10" height="5" fill="#1E293B" />
              <rect x="11" y="18" width="2" height="5" fill="#EF4444" />
              <rect x="10" y="18" width="1" height="2" fill="#FFFFFF" />
              <rect x="13" y="18" width="1" height="2" fill="#FFFFFF" />
            </svg>
          </div>
        `;

      case 'singa':
        // 🦁 Singa (Lion) - Phishing
        return `
          <div class="pixel-avatar-wrap" title="Singa - Phishing Master">
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Glorious Mane -->
              <rect x="3" y="3" width="18" height="18" fill="#B45309" />
              <rect x="2" y="5" width="20" height="14" fill="#92400E" />
              <!-- Face -->
              <rect x="6" y="6" width="12" height="12" fill="#FBBF24" />
              <rect x="7" y="5" width="3" height="2" fill="#D97706" />
              <rect x="14" y="5" width="3" height="2" fill="#D97706" />
              <!-- Fierce Eyes -->
              <rect x="7" y="8" width="3" height="2" fill="#0F172A" />
              <rect x="8" y="8" width="1" height="1" fill="#38BDF8" />
              <rect x="14" y="8" width="3" height="2" fill="#0F172A" />
              <rect x="15" y="8" width="1" height="1" fill="#38BDF8" />
              <!-- Nose & Snarl -->
              <rect x="11" y="11" width="2" height="2" fill="#78350F" />
              <rect x="9" y="14" width="6" height="1" fill="#78350F" />
              <rect x="9" y="15" width="1" height="1" fill="#FFFFFF" />
              <rect x="14" y="15" width="1" height="1" fill="#FFFFFF" />
              <!-- Hacker Bandana / Eye patch -->
              <rect x="5" y="6" width="14" height="2" fill="#EF4444" />
            </svg>
          </div>
        `;

      case 'elang':
        // 🦅 Elang (Eagle) - Job Scam
        return `
          <div class="pixel-avatar-wrap" title="Elang - Job Scam Hunter">
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Head Feathers -->
              <rect x="6" y="3" width="12" height="11" fill="#F8FAFC" />
              <rect x="5" y="5" width="14" height="8" fill="#FFFFFF" />
              <!-- Navy Feather Body -->
              <rect x="6" y="14" width="12" height="9" fill="#1E293B" />
              <rect x="4" y="15" width="16" height="6" fill="#0F172A" />
              <!-- Monocle / Tech Lens -->
              <rect x="7" y="7" width="4" height="3" fill="#06B6D4" />
              <rect x="8" y="8" width="2" height="1" fill="#FFFFFF" />
              <rect x="14" y="7" width="3" height="2" fill="#0F172A" />
              <!-- Sharp Golden Beak -->
              <rect x="15" y="9" width="6" height="4" fill="#F59E0B" />
              <rect x="17" y="13" width="3" height="1" fill="#D97706" />
              <rect x="10" y="18" width="4" height="3" fill="#FBBF24" />
            </svg>
          </div>
        `;

      case 'kucing':
        // 🐱 Kucing (Cat) - Victim (Curious)
        return `
          <div class="pixel-avatar-wrap" title="Kucing - Korban Inquisitif">
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Pointy Ears -->
              <rect x="4" y="3" width="4" height="5" fill="#F97316" />
              <rect x="5" y="4" width="2" height="3" fill="#F472B6" />
              <rect x="16" y="3" width="4" height="5" fill="#F97316" />
              <rect x="17" y="4" width="2" height="3" fill="#F472B6" />
              <!-- Round Face -->
              <rect x="4" y="7" width="16" height="11" fill="#FB923C" />
              <rect x="6" y="18" width="12" height="4" fill="#F97316" />
              <!-- Big Green Inquisitive Eyes -->
              <rect x="6" y="9" width="4" height="4" fill="#10B981" />
              <rect x="7" y="9" width="2" height="3" fill="#064E3B" />
              <rect x="7" y="9" width="1" height="1" fill="#FFFFFF" />
              <rect x="14" y="9" width="4" height="4" fill="#10B981" />
              <rect x="15" y="9" width="2" height="3" fill="#064E3B" />
              <rect x="15" y="9" width="1" height="1" fill="#FFFFFF" />
              <!-- Cute Nose & Mouth -->
              <rect x="11" y="13" width="2" height="1" fill="#F43F5E" />
              <rect x="10" y="14" width="4" height="1" fill="#7C2D12" />
              <!-- Whiskers -->
              <rect x="2" y="13" width="3" height="1" fill="#FED7AA" />
              <rect x="19" y="13" width="3" height="1" fill="#FED7AA" />
            </svg>
          </div>
        `;

      case 'hamster':
        // 🐹 Hamster - Victim (Hardworker)
        return `
          <div class="pixel-avatar-wrap" title="Hamster - Pekerja Keras">
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Round Ears -->
              <rect x="3" y="4" width="4" height="4" fill="#D97706" />
              <rect x="4" y="5" width="2" height="2" fill="#FDE68A" />
              <rect x="17" y="4" width="4" height="4" fill="#D97706" />
              <rect x="18" y="5" width="2" height="2" fill="#FDE68A" />
              <!-- Chubby Face -->
              <rect x="4" y="7" width="16" height="12" fill="#F59E0B" />
              <rect x="3" y="12" width="18" height="7" fill="#FDE68A" />
              <!-- Rosy Cheeks -->
              <rect x="4" y="13" width="3" height="2" fill="#F472B6" />
              <rect x="17" y="13" width="3" height="2" fill="#F472B6" />
              <!-- Shiny Eyes -->
              <rect x="7" y="10" width="3" height="3" fill="#1E293B" />
              <rect x="8" y="10" width="1" height="1" fill="#FFFFFF" />
              <rect x="14" y="10" width="3" height="3" fill="#1E293B" />
              <rect x="15" y="10" width="1" height="1" fill="#FFFFFF" />
              <!-- Tiny Nose & Paws holding coin -->
              <rect x="11" y="12" width="2" height="1" fill="#D97706" />
              <rect x="10" y="16" width="4" height="4" fill="#FBBF24" />
              <rect x="11" y="17" width="2" height="2" fill="#F59E0B" />
            </svg>
          </div>
        `;

      case 'kelinci':
        // 🐰 Kelinci (Rabbit) - Victim (Gentle)
        return `
          <div class="pixel-avatar-wrap" title="Kelinci - Berhati Lembut">
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Tall Floppy Ears -->
              <rect x="6" y="1" width="3" height="9" fill="#F1F5F9" />
              <rect x="7" y="3" width="1" height="6" fill="#F472B6" />
              <rect x="15" y="1" width="3" height="9" fill="#F1F5F9" />
              <rect x="16" y="3" width="1" height="6" fill="#F472B6" />
              <!-- Soft Face -->
              <rect x="5" y="8" width="14" height="11" fill="#FFFFFF" />
              <rect x="7" y="19" width="10" height="3" fill="#E2E8F0" />
              <!-- Expressive Eyes -->
              <rect x="7" y="11" width="3" height="3" fill="#8B5CF6" />
              <rect x="8" y="11" width="1" height="1" fill="#FFFFFF" />
              <rect x="14" y="11" width="3" height="3" fill="#8B5CF6" />
              <rect x="15" y="11" width="1" height="1" fill="#FFFFFF" />
              <!-- Twitching Nose -->
              <rect x="11" y="14" width="2" height="1" fill="#F43F5E" />
              <rect x="10" y="15" width="4" height="1" fill="#94A3B8" />
            </svg>
          </div>
        `;

      default:
        return `<span style="font-size:2.2rem;">🛡️</span>`;
    }
  }

  // ========================================================
  // 2. SCENARIO REPOSITORY (DEEP BRANCHING LOGIC)
  // ========================================================
  const SCENARIOS = [
    {
      id: 'scam_love',
      type: 'love',
      name: 'Love Scam: Koper Diplomat & Bea Cukai Bandara',
      category: 'Romance Fraud & Social Grooming',
      recommendedScammerChar: 'buaya',
      recommendedVictimChar: 'kucing',
      scammerProfile: {
        name: 'Kapten Adrian (Pilot Cargo Internasional)',
        handle: '+44 7911 123456 (London Relay)',
        charId: 'buaya'
      },
      victimProfile: {
        name: 'Luna / Cadet User',
        charId: 'kucing'
      },
      // SCAMMER PERSPECTIVE BRANCHING
      scammerFlow: {
        targetDesc: 'Bujuk mangsa agar percaya paket koper hadiah emas Anda ditahan di Bandara dan mau mentransfer biaya tebusan Rp 3.500.000.',
        targetScoreRequired: 80,
        initialPersuasion: 30,
        dialogues: [
          {
            stepId: 'scammer_step_1',
            prompt: 'Kirim pesan pertama untuk memancing rasa penasaran dan emosi mangsa:',
            options: [
              {
                text: '💌 "Sayang, koper hadiah perhiasan dan dana hibah sudah kukirim lewat kargo diplomatik ke alamatmu."',
                persuasionDelta: 25,
                victimReply: '"Serius Adrian? Kamu kok repot-repot kirim hadiah semahal itu? Tapi kok gak ada nomor resi resminya ya?"',
                nextStep: 'scammer_step_2'
              },
              {
                text: '⚠️ "Darurat! Aku dalam bahaya, transfer uang 3 juta sekarang atau aku ditangkap polisi!"',
                persuasionDelta: -25,
                victimReply: '"Hah?! Siapa kamu? Jangan asal minta transfer uang ya, aku blokir nih!"',
                nextStep: 'scammer_bad_end'
              }
            ]
          },
          {
            stepId: 'scammer_step_2',
            prompt: 'Mangsa mulai ragu mengenai nomor resi. Apa langkah manipulasi berikutnya?',
            options: [
              {
                text: '📞 Buat panggilan telepon darurat bersuara panik: dalih koper ditahan petugas bea cukai bandara dan butuh biaya clearance segera.',
                persuasionDelta: 35,
                victimReply: '"(Suara telepon cemas) Ya ampun Adrian... aku jadi panik dengar kamu ditahan. Petugasnya minta transfer ke rekening mana?"',
                nextStep: 'scammer_step_3'
              },
              {
                text: '😡 Salahkan mangsa: "Kamu curiga sama aku? Berarti selama ini kamu gak tulus cinta sama aku!"',
                persuasionDelta: -15,
                victimReply: '"Lho kok malah marah? Kalau emang beneran harusnya ada bukti pengiriman resmi dong."',
                nextStep: 'scammer_bad_end'
              }
            ]
          },
          {
            stepId: 'scammer_step_3',
            prompt: 'Mangsa sudah cemas dan siap membantu. Eksekusi permintaan transfer:',
            options: [
              {
                text: '🏦 "Tolong transfer biaya clearance 3.5 juta ke rekening staf lokal: BCA 8820192837 a.n Budi Santoso (Agen Khusus). Cepat sebelum jam 17.00!"',
                persuasionDelta: 30,
                victimReply: '"Oke aku transfer sekarang demi kamu, jangan sampai kamu ditahan ya!"',
                nextStep: 'scammer_happy_end'
              },
              {
                text: '🤔 "Sebenarnya butuh 50 juta sih, kamu punya sertifikat tanah gak?"',
                persuasionDelta: -40,
                victimReply: '"50 JUTA?! Sertifikat tanah?! Wah ini gak beres, kamu penipu ya! Aku lapor polisi!"',
                nextStep: 'scammer_bad_end'
              }
            ]
          }
        ]
      },
      // VICTIM PERSPECTIVE BRANCHING
      victimFlow: {
        introNotification: {
          title: '💬 WhatsApp dari +44 7911 123456 (Kapten Adrian)',
          preview: 'Sayang, koper diplomatik hadiah emas sudah tiba di Soekarno Hatta...',
          sender: 'Kapten Adrian ✈️'
        },
        dialogues: [
          {
            stepId: 'victim_step_1',
            incomingMessage: '"Halo sayangku, koper diplomatik berisi emas batangan dan 50.000 GBP sebagai hadiah pernikahan kita sudah mendarat di Jakarta. Tapi petugas Bea Cukai bandara menahan koper itu dan minta biaya clearance 3.5 juta."',
            hasPhoneCall: true,
            callDialogue: '"Halo? Sayang... sinyal bandara jelek banget. Tolongin aku ya, petugasnya galak banget minta uang tebusan hari ini juga atau koper disita negara!"',
            options: [
              {
                text: 'A. Langsung panik dan tanyakan nomor rekening tujuan transfer agar Adrian tidak ditahan.',
                consequence: 'bad',
                reply: '"Adrian: Terima kasih sayang! Tolong transfer ke rekening pribadi staf bea cukai: BCA 8820192837 a.n Budi Santoso!"',
                nextStep: 'victim_bad_end'
              },
              {
                text: 'B. Terapkan 3-Second Rule: Mengapa koper hadiah ditahan petugas? Minta video call langsung atau hubungi nomor resmi Bea Cukai.',
                consequence: 'safe',
                reply: '"Adrian: Sayang, di sini dilarang video call sama protokol keamanan! Kamu gak percaya sama aku?!"',
                nextStep: 'victim_step_2'
              }
            ]
          },
          {
            stepId: 'victim_step_2',
            incomingMessage: '"Petugasnya bilang kalau dalam 30 menit uang clearance 3.5 juta gak ditransfer ke rekening Budi Santoso, nama kamu akan dilaporkan ke kepolisian atas dugaan penyelundupan barang mewah!"',
            options: [
              {
                text: 'A. Karena takut dilaporkan ke polisi, segera transfer uang 3.5 juta.',
                consequence: 'bad',
                reply: 'Uang Anda hilang seketika, nomor Anda langsung diblokir oleh penipu.',
                nextStep: 'victim_bad_end'
              },
              {
                text: 'B. Sadari pola Love Scam: Tolak transfer, catat nomor rekening penampung, dan konfirmasi ke Call Center resmi Bea Cukai 1500225.',
                consequence: 'safe',
                reply: 'Petugas Bea Cukai resmi memastikan barang tersebut fiktif dan nomor rekening tersebut terindikasi sindikat penipuan.',
                nextStep: 'victim_forensics_challenge'
              }
            ]
          }
        ],
        forensicExpectedKeywords: ['uang', 'transfer', 'bea cukai', 'koper', 'emas', 'video call', 'urgensi', 'polisi', 'rekening']
      }
    },

    {
      id: 'scam_phishing',
      type: 'phishing',
      name: 'Phishing: Ancaman Pemblokiran Rekening Bank NeoArtha',
      category: 'Credential Harvesting & Impersonation',
      recommendedScammerChar: 'singa',
      recommendedVictimChar: 'hamster',
      scammerProfile: {
        name: 'Divisi Siber Bank NeoArtha (Palsu)',
        handle: 'BANK-NOTIF // SMS Gateway',
        charId: 'singa'
      },
      victimProfile: {
        name: 'Bimo / Cadet User',
        charId: 'hamster'
      },
      // SCAMMER PERSPECTIVE
      scammerFlow: {
        targetDesc: 'Kirimkan tautan palsu untuk merebut kode OTP dan nomor kartu ATM dari korban yang sedang panik.',
        targetScoreRequired: 75,
        initialPersuasion: 20,
        dialogues: [
          {
            stepId: 'scammer_phish_1',
            prompt: 'Pilih taktik pesan intimidasi untuk memancing kepanikan mangsa:',
            options: [
              {
                text: '🚨 "[BANK NEOARTHA] Rekening Anda terindikasi transaksi ilegal Rp 12.500.000. Segera batalkan di https://bankneoartha-cancel.xyz/verify dalam 10 menit atau saldo dibekukan!"',
                persuasionDelta: 40,
                victimReply: '"Aduh gawat, saya gak pernah transaksi segitu! Saya klik linknya untuk batalkan!"',
                nextStep: 'scammer_phish_2'
              },
              {
                text: '📢 "Halo, ada survey kepuasan nasabah berhadiah payung cantik."',
                persuasionDelta: -20,
                victimReply: '"Gak minat survey, terima kasih."',
                nextStep: 'scammer_bad_end'
              }
            ]
          },
          {
            stepId: 'scammer_phish_2',
            prompt: 'Korban membuka link phishing dan mengisi formulir nama. Sekarang minta kode OTP-nya:',
            options: [
              {
                text: '🔑 Kirim pop-up: "Ketikkan 6-digit kode OTP yang baru dikirim ke SMS Anda untuk verifikasi pembatalan transaksi."',
                persuasionDelta: 45,
                victimReply: '"Saya sudah masukkan kode OTP 482910 di halaman web tersebut."',
                nextStep: 'scammer_happy_end'
              },
              {
                text: '💳 Kirim pesan WA: "Kirim foto buku tabungan dan foto selfie sambil pegang uang."',
                persuasionDelta: -30,
                victimReply: '"Kok aneh banget minta foto selfie pegang uang? Saya telepon bank resmi aja!"',
                nextStep: 'scammer_bad_end'
              }
            ]
          }
        ]
      },
      // VICTIM PERSPECTIVE
      victimFlow: {
        introNotification: {
          title: '🚨 SMS Peringatan: BANK NEOARTHA SECURITY',
          preview: 'Rekening Anda dibekukan karena transaksi mencurigakan. Segera verifikasi...',
          sender: 'BANK NEOARTHA INFO'
        },
        dialogues: [
          {
            stepId: 'victim_phish_1',
            incomingMessage: '"[PERINGATAN SIBER BANK NEOARTHA] Sistem mendeteksi transaksi anomali Rp 12.500.000 dari IP luar negeri. Rekening Anda akan dinonaktifkan dalam 15 menit. Batalkan transaksi & amankan saldo via tautan verifikasi kami: https://bankneoartha-security.xyz/verify"',
            hasPortalPreview: true,
            options: [
              {
                text: 'A. Langsung klik tautan dan masukkan 6-digit kode OTP SMS di formulir cepat untuk membatalkan transaksi.',
                consequence: 'bad',
                reply: 'Kode OTP SMS diberikan ke sindikat. Scammer seketika membajak akun m-banking Anda dan menguras seluruh saldo tabungan!',
                nextStep: 'victim_bad_end'
              },
              {
                text: 'B. Buka tautan untuk memeriksa formulir verifikasi, di mana Anda diminta mengisi data pribadi (NIK KTP & Rekening).',
                consequence: 'neutral',
                reply: 'Halaman web portal pembatalan terbuka di layar smartphone Anda...',
                action: 'open_phish_browser'
              },
              {
                text: 'C. Waspadai domain .xyz bukan domain resmi perbankan .co.id. Abaikan tautan & langsung hubungi Call Center resmi Bank.',
                consequence: 'safe',
                reply: 'Keputusan tepat! Anda memverifikasi ke pihak bank resmi dan terbukti pesan tersebut adalah serangan phishing.',
                nextStep: 'victim_forensics_challenge'
              }
            ]
          }
        ],
        forensicExpectedKeywords: ['otp', 'rekening', 'link', 'domain', 'xyz', 'bank', 'urgensi', 'blokir', 'palsu', 'telepon', 'ktp']
      }
    },

    {
      id: 'scam_job',
      type: 'job',
      name: 'Job Scam: Misi Freelance Like Video & Deposit Saldo VIP',
      category: 'Advance-Fee Scam & Task Deception',
      recommendedScammerChar: 'elang',
      recommendedVictimChar: 'kelinci',
      scammerProfile: {
        name: 'HRD Quantum Media Global (Fiktif)',
        handle: 'Telegram Recruitment Bot',
        charId: 'elang'
      },
      victimProfile: {
        name: 'Rian / Cadet User',
        charId: 'kelinci'
      },
      scammerFlow: {
        targetDesc: 'Pancing korban dengan komisi kecil awal Rp 50.000, lalu tuntut deposit Misi VIP Rp 1.500.000.',
        targetScoreRequired: 80,
        initialPersuasion: 35,
        dialogues: [
          {
            stepId: 'scammer_job_1',
            prompt: 'Tawarkan lowongan kerja paruh waktu yang sangat mudah dan menjanjikan:',
            options: [
              {
                text: '💼 "Halo! Lowongan kerja remote: Cukup like 3 video YouTube, langsung dibayar komisi Rp 50.000 ke e-wallet Anda."',
                persuasionDelta: 30,
                victimReply: '"Wah beneran langsung ditransfer Rp 50.000? Mantap banget, ada tugas lanjutan?"',
                nextStep: 'scammer_job_2'
              },
              {
                text: '📄 "Kerja keras 14 jam sehari angkut kardus di pelabuhan tanpa gaji."',
                persuasionDelta: -40,
                victimReply: '"Gak mau lah, cari kerja yang bener."',
                nextStep: 'scammer_bad_end'
              }
            ]
          },
          {
            stepId: 'scammer_job_2',
            prompt: 'Mangsa sudah ketagihan untung kilat. Saatnya menjebak dengan Misi Deposit VIP:',
            options: [
              {
                text: '💎 "Selamat! Anda terpilih masuk ke Misi Emas VIP: Setor deposit Rp 1.500.000, komisi kembali Rp 2.250.000 dalam 30 menit!"',
                persuasionDelta: 35,
                victimReply: '"Karena tadi terbukti bayar, saya siap transfer deposit Rp 1.500.000 sekarang."',
                nextStep: 'scammer_happy_end'
              },
              {
                text: '💸 "Bayar 100 juta dulu buat biaya seragam kerja online."',
                persuasionDelta: -30,
                victimReply: '"Masa kerja online suruh beli seragam 100 juta? Ini penipuan ya!"',
                nextStep: 'scammer_bad_end'
              }
            ]
          }
        ]
      },
      victimFlow: {
        introNotification: {
          title: '💼 Pesan Telegram: HRD Quantum Media Partner',
          preview: 'Pekerjaan sampingan mudah dari rumah. Komisi Rp 500rb - 2jt per hari...',
          sender: 'HR Recruitment Quantum'
        },
        dialogues: [
          {
            stepId: 'victim_job_1',
            incomingMessage: '"Halo kak! Kami dari agensi digital marketing internasional. Cukup like & subscribe 3 akun YouTube rekanan kami, kakak langsung dapat honor Rp 50.000 ke akun DANA/OVO."',
            options: [
              {
                text: 'A. Coba ikuti tugas dan kirimkan screenshot bukti like untuk mendapatkan uang Rp 50.000.',
                consequence: 'neutral',
                reply: 'Uang Rp 50.000 memang masuk. Ini adalah taktik "umpan" agar korban percaya!',
                nextStep: 'victim_job_2'
              },
              {
                text: 'B. Sadari bahwa perusahaan bonafit tidak merekrut sembarangan via chat Telegram anonim. Abaikan pesan.',
                consequence: 'safe',
                reply: 'Pilihan bijak! Anda terhindar dari skema jeratan tugas deposit sejak awal.',
                nextStep: 'victim_forensics_challenge'
              }
            ]
          },
          {
            stepId: 'victim_job_2',
            incomingMessage: '"Hebat kak! Untuk pendaftaran kontrak kerja resmi & aktivasi Misi VIP komisi 40%, mohon kirimkan data pribadi: Foto KTP, Selfie pegang KTP, Nomor Rekening, serta deposit awal Rp 1.500.000 ke rekening bendahara misi."',
            options: [
              {
                text: 'A. Karena tergiur komisi besar dan sudah pernah dibayar Rp 50.000, kirimkan foto KTP & transfer deposit Rp 1.500.000.',
                consequence: 'bad',
                reply: 'Data identitas KTP Anda langsung dicuri untuk registrasi pinjaman online ilegal dan uang deposit Rp 1.500.000 raib seketika!',
                nextStep: 'victim_bad_end'
              },
              {
                text: 'B. Aturan mutlak keamanan siber: Lowongan kerja legal tidak pernah meminta foto KTP sembarangan via chat apalagi memungut deposit. Tolak & lapor!',
                consequence: 'safe',
                reply: 'Analisis akurat! Anda melindungi data identitas sensitif Anda dan mengamankan tabungan dari jeratan sindikat job scam.',
                nextStep: 'victim_forensics_challenge'
              }
            ]
          }
        ],
        forensicExpectedKeywords: ['deposit', 'tugas', 'telegram', 'uang', 'like', 'komisi', 'kerja', 'palsu', 'untung', 'ktp', 'data pribadi']
      }
    },

    {
      id: 'scam_legit',
      type: 'legit',
      name: 'Kasus Uji Nyata: Notifikasi Resmi Resi Kurir Logistik',
      category: 'Verifikasi Komunikasi Otentik & Zero Paranoia',
      recommendedScammerChar: 'elang',
      recommendedVictimChar: 'kucing',
      victimProfile: {
        name: 'Dinda / Cadet User',
        charId: 'kucing'
      },
      victimFlow: {
        introNotification: {
          title: '📦 SMS Resmi JNE Logistik: Paket #JNE-882019',
          preview: 'Paket Anda dari Tokopedia telah diterima oleh Satpam Perumahan...',
          sender: 'JNE Official'
        },
        dialogues: [
          {
            stepId: 'victim_legit_1',
            incomingMessage: '"[JNE LOGISTIK] Halo Ibu Dinda, kiriman paket #JNE-882019 dari Tokopedia telah berhasil diantar kurir kami (Bpk. Rudi) ke pos satpam perumahan pada pukul 14:15 WIB. Foto tanda terima fisik telah diarsipkan. Terima kasih telah menggunakan layanan resmi JNE."',
            options: [
              {
                text: 'A. Langsung panik dan mencaci maki pengirim karena menduga ini adalah malware surat tilang/undangan palsu.',
                consequence: 'bad',
                reply: 'Sikap paranoia berlebihan tanpa mengecek fakta. Ini adalah SMS resmi dan tidak berisi tautan ataupun permintaan file .apk apapun.',
                nextStep: 'victim_bad_end'
              },
              {
                text: 'B. Baca dengan teliti: Tidak ada tautan asing, tidak meminta file .apk, dan memang ada pesanan belanja yang ditunggu. Konfirmasi ke pos satpam.',
                consequence: 'safe',
                reply: 'Tepat sekali! Anda memeriksa ke pos satpam dan paket Anda memang telah sampai dengan selamat.',
                nextStep: 'victim_forensics_challenge'
              }
            ]
          }
        ],
        forensicExpectedKeywords: ['resmi', 'bukan apk', 'tidak minta uang', 'satpam', 'paket', 'asli', 'aman', 'tidak ada link']
      }
    }
  ];

  // ========================================================
  // 3. SCAM SIMULATOR CONTROLLER CLASS
  // ========================================================
  class ScamSimulatorManager {
    constructor() {
      this.currentStage = 'start'; // 'start', 'tutorial', 'role_select', 'char_select', 'gameplay'
      this.currentRole = 'victim'; // 'scammer' or 'victim'
      this.selectedCharId = 'kucing';
      this.currentScenarioIndex = 0;

      // Scammer state
      this.scammerStepIndex = 0;
      this.persuasionScore = 30;
      this.scammerTimeLeft = 90;
      this.scammerTimerInterval = null;
      this.timeoutBadEnd = false;

      // Dynamic animation & view states
      this.isTyping = false;
      this.typingSenderName = '';
      this.isThinking = false;
      this.inAppBrowserActive = false;

      // Victim state
      this.victimStepIndex = 0;
      this.phoneCallActive = false;
      this.chatMessages = [];
      this.forensicUserInput = '';
      this.forensicAnalysisResult = null;
      this.endingType = null; // 'happy' or 'bad'

      // Aliases for game briefing & backward compatibility
      this.cases = SCENARIOS;
    }

    init() {
      const container = document.getElementById('kasus-module-container');
      if (!container) return;
      this.render();
    }

    render() {
      const container = document.getElementById('kasus-module-container');
      if (!container) return;

      switch (this.currentStage) {
        case 'start':
          container.innerHTML = this.renderStartScreenHTML();
          break;
        case 'tutorial':
          container.innerHTML = this.renderTutorialScreenHTML();
          break;
        case 'role_select':
          container.innerHTML = this.renderRoleSelectScreenHTML();
          break;
        case 'char_select':
          container.innerHTML = this.renderCharSelectScreenHTML();
          break;
        case 'gameplay':
          container.innerHTML = this.renderGameplayHTML();
          break;
        default:
          container.innerHTML = this.renderStartScreenHTML();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- VIEW 1: START SCREEN ---
    renderStartScreenHTML() {
      const user = window.authManager?.currentUser;
      const score = user?.game_scores?.kasus || 0;

      return `
        <div class="holo-enter" style="max-width: 960px; margin: 0 auto;">
          <div class="hud-card" style="padding: 36px 30px; text-align: center; position: relative;">
            
            <div style="display:flex; justify-content:center; gap:8px; margin-bottom:12px;">
              <span class="cyber-tag tag-magenta">ARENA SIMULASI PSIKOLOGI</span>
              <span class="cyber-tag tag-cyan">MULTI-POV INTERAKTIF</span>
            </div>

            <h1 style="font-size: 2.1rem; color: var(--text-highlight); margin: 6px 0 10px 0; letter-spacing: 1px;">
              🎭 SCAM SIMULATOR
            </h1>
            <p style="font-size: 1rem; color: var(--text-muted); max-width: 680px; margin: 0 auto 26px auto; line-height: 1.6;">
              Jelajahi dinamika penipuan siber dari dua sudut pandang nyata: sebagai <strong>Scammer</strong> yang menyusun strategi rekayasa sosial, atau sebagai <strong>Victim</strong> yang mempertahankan aset digital melalui smartphone pribadi.
            </p>

            <!-- Dual Role Explanatory Cards -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; text-align: left; margin-bottom: 30px;">
              
              <div class="scam-role-card role-scammer" style="cursor: default;">
                <div style="display:flex; align-items:center; gap:12px; margin-bottom: 12px;">
                  <span style="font-size: 2rem;">🐊</span>
                  <div>
                    <h3 style="color: var(--neon-red); margin:0; font-size: 1.15rem;">ROLE: SCAMMER</h3>
                    <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">PERSPEKTIF PENYERANG</span>
                  </div>
                </div>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin:0 0 10px 0;">
                  Pahami pola pikir sindikat siber. Susun pesan manipulatif, ciptakan urgensi palsu, dan pancing korban agar menuruti instruksi Anda sebelum kesempatan habis.
                </p>
                <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-red);">
                  Karakter: Buaya (Love), Singa (Phish), Elang (Job)
                </div>
              </div>

              <div class="scam-role-card role-victim" style="cursor: default;">
                <div style="display:flex; align-items:center; gap:12px; margin-bottom: 12px;">
                  <span style="font-size: 2rem;">🐱</span>
                  <div>
                    <h3 style="color: var(--neon-cyan); margin:0; font-size: 1.15rem;">ROLE: VICTIM</h3>
                    <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">PERSPEKTIF BERTAHAN</span>
                  </div>
                </div>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin:0 0 10px 0;">
                  Hadapi notifikasi pesan masuk pada smartphone realistis. Latih nalar Zero-Trust, identifikasi indikator mencurigakan, dan tuliskan analisis forensik Anda.
                </p>
                <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-cyan);">
                  Karakter: Kucing, Hamster, Kelinci
                </div>
              </div>

            </div>

            <!-- Action Buttons -->
            <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
              <button class="cyber-btn btn-ghost" style="padding: 12px 28px; font-size: 0.95rem;" onclick="window.scamSimulator.openTutorial()">
                <span>📖</span> BUKA PANDUAN TUTORIAL
              </button>
              <button class="cyber-btn" style="padding: 12px 36px; font-size: 1rem; box-shadow: 0 0 25px var(--neon-cyan-dim);" onclick="window.scamSimulator.goToRoleSelect()">
                <span>⚡</span> MULAI / PLAY ➔
              </button>
            </div>

            <div style="margin-top: 24px; font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">
              Skor Terkumpul di Game Ini: <strong style="color: var(--neon-green); font-size: 0.95rem;">${score} XP</strong>
            </div>

          </div>
        </div>
      `;
    }

    // --- VIEW 2: TUTORIAL SCREEN ---
    renderTutorialScreenHTML() {
      return `
        <div class="holo-enter" style="max-width: 900px; margin: 0 auto;">
          <div class="hud-card" style="padding: 32px;">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(0,243,255,0.15); padding-bottom: 14px; margin-bottom: 20px;">
              <div style="display:flex; align-items:center; gap: 10px;">
                <span style="font-size: 1.6rem;">📖</span>
                <h2 style="font-size: 1.4rem; color: var(--text-highlight); margin:0;">
                  PANDUAN TUTORIAL & ATURAN BERMAIN SCAM SIMULATOR
                </h2>
              </div>
              <button class="cyber-btn btn-ghost" style="padding: 6px 14px; font-size: 0.8rem;" onclick="window.scamSimulator.backToStart()">
                ✕ KEMBALI
              </button>
            </div>

            <div class="briefing-lore-box" style="padding: 16px 20px; border-radius: 6px; margin-bottom: 20px;">
              <h4 style="color: var(--neon-cyan); margin: 0 0 6px 0;">🎯 Mengapa Bermain Dua Sudut Pandang?</h4>
              <p style="font-size: 0.9rem; line-height: 1.6; margin: 0; color: var(--text-main);">
                Untuk dapat menolak penipuan secara efektif, Anda harus memahami cara berpikir pelaku kejahatan. Dengan memainkan peran Scammer, Anda mempelajari anatomi rekayasa sosial; dan dengan memainkan peran Victim, Anda menguji ketangguhan nalar Anda dalam situasi bertekanan tinggi.
              </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; margin-bottom: 24px;">
              <div class="briefing-objective-card" style="padding: 18px; border-radius: 8px;">
                <h4 style="color: var(--neon-red); margin: 0 0 8px 0;">🐊 ALUR BERMAIN: ROLE SCAMMER</h4>
                <ol style="margin-left: 18px; line-height: 1.8; font-size: 0.85rem; color: var(--text-muted); padding: 0;">
                  <li>Pilih karakter hewan pixel predator Anda (Buaya, Singa, Elang).</li>
                  <li>Perhatikan Target Misi dan Persuasion Meter di bagian atas terminal.</li>
                  <li>Kirimkan opsi pesan taktis untuk memanipulasi emosi mangsa.</li>
                  <li>Capai 100% Persuasi untuk meraih <strong>Happy Ending (Target Sukses)</strong>.</li>
                </ol>
              </div>

              <div class="briefing-scoring-card" style="padding: 18px; border-radius: 8px;">
                <h4 style="color: var(--neon-cyan); margin: 0 0 8px 0;">🛡️ ALUR BERMAIN: ROLE VICTIM</h4>
                <ol style="margin-left: 18px; line-height: 1.8; font-size: 0.85rem; color: var(--text-muted); padding: 0;">
                  <li>Awali dengan mengeklik notifikasi banner pada homescreen smartphone.</li>
                  <li>Pilih opsi respon terbaik (hati-hati terhadap link palsu dan panggilan darurat).</li>
                  <li>Sebelum melihat ending, <strong>tuliskan indikator bahaya</strong> pada formulir analisis forensik.</li>
                  <li>Raih <strong>Happy Ending (Selamat & Terverifikasi)</strong> serta bonus XP pertahanan!</li>
                </ol>
              </div>
            </div>

            <div style="text-align: center;">
              <button class="cyber-btn" style="padding: 12px 32px; font-size: 0.95rem;" onclick="window.scamSimulator.goToRoleSelect()">
                <span>⚡</span> SAYA MENGERTI, PILIH ROLE ➔
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // --- VIEW 3: ROLE SELECT SCREEN ---
    renderRoleSelectScreenHTML() {
      return `
        <div class="holo-enter" style="max-width: 900px; margin: 0 auto;">
          <div class="hud-card" style="padding: 32px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px; border-bottom: 1px solid rgba(0,243,255,0.15); padding-bottom: 12px;">
              <div>
                <span class="cyber-tag tag-cyan">LANGKAH 1 DARI 2</span>
                <h2 style="font-size: 1.5rem; color: var(--text-highlight); margin: 4px 0 0 0;">
                  PILIH ROLE SIMULASI ANDA
                </h2>
              </div>
              <button class="cyber-btn btn-ghost" style="padding: 4px 12px; font-size: 0.8rem;" onclick="window.scamSimulator.backToStart()">
                ← KEMBALI
              </button>
            </div>

            <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 20px;">
              Pilihlah salah satu peran di bawah ini untuk menentukan alur permainan dan tantangan yang akan Anda hadapi:
            </p>

            <div class="scam-role-grid">
              
              <!-- Card Scammer -->
              <div class="scam-role-card role-scammer" onclick="window.scamSimulator.selectRole('scammer')">
                <div style="font-size: 3rem; margin-bottom: 8px;">🎭</div>
                <h3 style="color: var(--neon-red); font-size: 1.3rem; margin-bottom: 6px;">
                  ROLE SCAMMER (SI PENIPU)
                </h3>
                <div class="cyber-tag tag-red" style="margin-bottom: 14px;">PENYERANG SIBER</div>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px;">
                  Kendalikan terminal manipulasi siber. Tugas Anda adalah meyakinkan target dengan berbagai taktik rekayasa sosial, mengikis keraguan mangsa, dan menuntaskan target skenario.
                </p>
                <button class="cyber-btn btn-danger" style="width: 100%; justify-content: center;">
                  PILIH ROLE SCAMMER ➔
                </button>
              </div>

              <!-- Card Victim -->
              <div class="scam-role-card role-victim" onclick="window.scamSimulator.selectRole('victim')">
                <div style="font-size: 3rem; margin-bottom: 8px;">🛡️</div>
                <h3 style="color: var(--neon-cyan); font-size: 1.3rem; margin-bottom: 6px;">
                  ROLE VICTIM (CALON KORBAN)
                </h3>
                <div class="cyber-tag tag-cyan" style="margin-bottom: 14px;">PERTAHANAN DIRI</div>
                <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 20px;">
                  Pegang kendali smartphone pribadi Anda. Waspadai notifikasi mencurigakan, jangan gegabah mengklik link atau menerima tawaran manis, dan buktikan ketajaman nalar forensik Anda.
                </p>
                <button class="cyber-btn" style="width: 100%; justify-content: center;">
                  PILIH ROLE VICTIM ➔
                </button>
              </div>

            </div>
          </div>
        </div>
      `;
    }

    // --- VIEW 4: CHARACTER SELECT SCREEN (PIXEL ANIMALS) ---
    renderCharSelectScreenHTML() {
      const isScammer = this.currentRole === 'scammer';

      const characters = isScammer ? [
        {
          id: 'buaya',
          animal: 'Buaya (Crocodile)',
          specialty: 'Love Scam & Rayuan Asmara',
          scenarioIndex: 0,
          trait: 'Manis di mulut, manipulatif, pandai merangkai ilusi cinta demi menguras saldo mangsa.',
          badge: 'Manipulasi Emosi'
        },
        {
          id: 'singa',
          animal: 'Singa (Lion)',
          specialty: 'Phishing & Pembajakan OTP',
          scenarioIndex: 1,
          trait: 'Agresif & dominan, memicu rasa takut dan panik dengan batas waktu mendesak.',
          badge: 'Intimidasi Cepat'
        },
        {
          id: 'elang',
          animal: 'Elang (Eagle)',
          specialty: 'Job Scam & Freelance Fiktif',
          scenarioIndex: 2,
          trait: 'Pengintai jeli dari ketinggian, menebar umpan misi freelance mudah berbayar fantastis.',
          badge: 'Keserakahan Target'
        }
      ] : [
        {
          id: 'kucing',
          animal: 'Kucing (Cat)',
          specialty: 'Target Inquisitif & Penasaran',
          scenarioIndex: 0,
          trait: 'Penuh rasa ingin tahu dan lincah, namun mudah tergiur hal menggemaskan dan penawaran instan.',
          badge: 'Sensitif Rasa Ingin Tahu'
        },
        {
          id: 'hamster',
          animal: 'Hamster (Hamster)',
          specialty: 'Target Tabungan & Finansial',
          scenarioIndex: 1,
          trait: 'Pekerja keras dan hemat, rajin menabung, namun rentan panik saat saldo rekening diancam.',
          badge: 'Protektif Aset'
        },
        {
          id: 'kelinci',
          animal: 'Kelinci (Rabbit)',
          specialty: 'Target Lembut & Penurut',
          scenarioIndex: 2,
          trait: 'Berhati lembut, suka menolong dan penurut, cenderung panik saat diancam masalah legalitas.',
          badge: 'Empatik & Cemas'
        }
      ];

      const cardsHtml = characters.map(c => {
        const isSelected = this.selectedCharId === c.id;
        return `
          <div class="scam-char-card ${isSelected ? 'selected' : ''}" onclick="window.scamSimulator.pickChar('${c.id}', ${c.scenarioIndex})">
            <div style="margin-bottom: 10px;">
              ${getPixelAvatarSVG(c.id, 84)}
            </div>
            <div class="cyber-tag ${isScammer ? 'tag-red' : 'tag-cyan'}" style="margin-bottom: 6px; font-size:0.7rem;">
              ${c.badge}
            </div>
            <h4 style="font-size: 1.15rem; color: var(--text-highlight); margin: 4px 0;">
              ${c.animal}
            </h4>
            <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-cyan); margin-bottom: 8px;">
              Fokus: ${c.specialty}
            </div>
            <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 16px;">
              ${c.trait}
            </p>
            <button class="cyber-btn ${isSelected ? '' : 'btn-ghost'}" style="width: 100%; font-size: 0.82rem; padding: 8px;">
              ${isSelected ? '✓ TERPILIH' : 'PILIH KARAKTER'}
            </button>
          </div>
        `;
      }).join('');

      return `
        <div class="holo-enter" style="max-width: 960px; margin: 0 auto;">
          <div class="hud-card" style="padding: 32px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px; border-bottom: 1px solid rgba(0,243,255,0.15); padding-bottom: 12px;">
              <div>
                <span class="cyber-tag ${isScammer ? 'tag-red' : 'tag-cyan'}">
                  ROLE: ${isScammer ? 'SCAMMER (PREDATOR)' : 'VICTIM (CALON KORBAN)'}
                </span>
                <h2 style="font-size: 1.5rem; color: var(--text-highlight); margin: 4px 0 0 0;">
                  PILIH KARAKTER HEWAN PIXEL ANDA
                </h2>
              </div>
              <button class="cyber-btn btn-ghost" style="padding: 4px 12px; font-size: 0.8rem;" onclick="window.scamSimulator.goToRoleSelect()">
                ← GANTI ROLE
              </button>
            </div>

            <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px;">
              Setiap karakter hewan pixel memiliki sifat psikologis unik dan skenario simulasi masing-masing:
            </p>

            <div class="scam-char-grid">
              ${cardsHtml}
            </div>

            <!-- Alternative scenario: Legitimate official message -->
            ${!isScammer ? `
              <div style="margin-top: 18px; text-align: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 14px;">
                <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted);">Uji Skenario Khusus Kasus Resmi: </span>
                <button class="cyber-btn btn-ghost" style="font-size: 0.78rem; padding: 4px 12px; margin-left: 8px;" onclick="window.scamSimulator.pickChar('kucing', 3)">
                  📦 UJI KASUS NOTIFIKASI RESMI KURIR LOGISTIK (LEGITIMATE)
                </button>
              </div>
            ` : ''}

            <div style="text-align: center; margin-top: 24px;">
              <button class="cyber-btn" style="padding: 12px 36px; font-size: 1rem; box-shadow: 0 0 25px var(--neon-cyan-dim);" onclick="window.scamSimulator.launchGameplay()">
                <span>⚡</span> MASUK KE ARENA SIMULASI ➔
              </button>
            </div>

          </div>
        </div>
      `;
    }

    // --- VIEW 5: GAMEPLAY SCREEN ---
    renderGameplayHTML() {
      return this.currentRole === 'scammer' ? this.renderScammerGameplayHTML() : this.renderVictimGameplayHTML();
    }

    // --- 5A: SCAMMER GAMEPLAY UI ---
    renderScammerGameplayHTML() {
      const scenario = SCENARIOS[this.currentScenarioIndex] || SCENARIOS[0];
      const flow = scenario.scammerFlow;
      const currentDialogue = flow.dialogues[this.scammerStepIndex];

      return `
        <div class="holo-enter" style="max-width: 900px; margin: 0 auto;">
          
          <!-- Top Control Header -->
          <div class="hud-card" style="margin-bottom: 16px; padding: 16px 20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div style="display:flex; align-items:center; gap: 10px;">
                ${getPixelAvatarSVG(this.selectedCharId, 44)}
                <div>
                  <div style="font-size: 0.75rem; color: var(--neon-red); font-family: var(--font-mono); font-weight: 700;">
                    MODE SCAMMER // OPERASI SIBER AKTIF
                  </div>
                  <h3 style="margin: 0; font-size: 1.1rem; color: var(--text-highlight);">
                    ${scenario.name}
                  </h3>
                </div>
              </div>
              <button class="cyber-btn btn-ghost" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.scamSimulator.backToStart()">
                ✕ KELUAR
              </button>
            </div>

            <!-- Target & Persuasion Bar & Timer -->
            <div style="margin-top: 14px; background: rgba(5,5,10,0.6); padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-cyan);">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; font-family: var(--font-mono); font-size: 0.75rem; margin-bottom: 6px;">
                <span>🎯 TARGET MISI: <strong style="color:var(--text-main);">${flow.targetDesc}</strong></span>
                <div style="display:flex; align-items:center; gap: 14px;">
                  <span>⏱️ SISA WAKTU: <strong id="scammer-timer-display" style="color: ${this.scammerTimeLeft <= 20 ? 'var(--neon-red)' : 'var(--neon-cyan)'}; font-size: 0.95rem;">${this.formatTime(this.scammerTimeLeft)}</strong></span>
                  <span>TINGKAT PERSUASI: <strong style="color:${this.persuasionScore >= 70 ? 'var(--neon-green)' : 'var(--neon-amber)'}; font-size: 0.95rem;">${this.persuasionScore}%</strong></span>
                </div>
              </div>
              <div class="vuln-bar-wrapper" style="height: 8px;">
                <div class="vuln-bar-fill ${this.persuasionScore >= 70 ? 'safe' : 'vuln'}" style="width: ${Math.min(100, Math.max(0, this.persuasionScore))}%;"></div>
              </div>
            </div>
          </div>

          <!-- Chat Console -->
          <div class="hud-card" style="padding: 0; overflow: hidden; margin-bottom: 18px;">
            <div class="chat-app-header">
              <div style="display:flex; align-items:center; gap: 8px;">
                <span style="font-size: 1.2rem;">📱</span>
                <span style="font-family: var(--font-display); font-size: 0.85rem; color: var(--neon-cyan);">
                  TARGET MANGSA: ${scenario.victimProfile.name}
                </span>
              </div>
              <span class="cyber-tag tag-cyan" style="font-size: 0.68rem;">ONLINE // ACTIVE</span>
            </div>

            <div class="chat-messages-scroll" id="scammer-chat-scroll" style="min-height: 220px;">
              ${this.chatMessages.map(msg => `
                <div class="chat-bubble ${msg.isScammer ? 'victim' : 'scammer'}">
                  <div style="font-weight: 700; font-size: 0.75rem; margin-bottom: 2px; color: ${msg.isScammer ? '#E0F2FE' : 'var(--neon-cyan)'};">
                    ${msg.sender}
                  </div>
                  ${msg.text}
                  <div class="chat-time">${msg.time}</div>
                </div>
              `).join('')}

              ${this.isTyping ? `
                <div class="chat-typing-indicator holo-enter">
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                  <span style="margin-left: 6px; font-size: 0.75rem;">${this.typingSenderName} sedang mengetik...</span>
                </div>
              ` : ''}

              ${this.isThinking ? `
                <div class="chat-thinking-indicator holo-enter">
                  <span>🧠</span>
                  <span>Anda merencanakan strategi manipulasi psikologis berikutnya...</span>
                </div>
              ` : ''}
            </div>

            <!-- Action Prompt & Branching Options -->
            ${currentDialogue ? `
              <div class="chat-response-deck">
                <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-cyan); margin-bottom: 4px;">
                  💬 ${currentDialogue.prompt}
                </div>
                ${currentDialogue.options.map((opt, oIdx) => `
                  <button class="chat-response-btn" onclick="window.scamSimulator.handleScammerChoice(${oIdx})">
                    <span>⚡</span> <span>${opt.text}</span>
                  </button>
                `).join('')}
              </div>
            ` : `
              <div style="padding: 20px; text-align: center;">
                <button class="cyber-btn" onclick="window.scamSimulator.showEndingScreen()">
                  LIHAT HASIL EVALUASI MISI ➔
                </button>
              </div>
            `}
          </div>

        </div>
      `;
    }

    // --- 5B: VICTIM GAMEPLAY UI (REALISTIC SMARTPHONE MOCKUP) ---
    renderVictimGameplayHTML() {
      const scenario = SCENARIOS[this.currentScenarioIndex] || SCENARIOS[0];
      const flow = scenario.victimFlow;
      const currentDialogue = flow.dialogues[this.victimStepIndex];

      return `
        <div class="holo-enter" style="max-width: 600px; margin: 0 auto;">
          
          <!-- Top Bar Actions -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 14px;">
            <div style="display:flex; align-items:center; gap: 8px;">
              ${getPixelAvatarSVG(this.selectedCharId, 36)}
              <span class="cyber-tag tag-cyan" style="font-size: 0.75rem;">ROLE: VICTIM // ZERO-TRUST MODE</span>
            </div>
            <button class="cyber-btn btn-ghost" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.scamSimulator.backToStart()">
              ✕ KELUAR
            </button>
          </div>

          <!-- Smartphone Mockup Wrapper -->
          <div class="phone-mockup-wrapper">
            <div class="phone-screen">
              
              <!-- Notch & Status Bar -->
              <div class="phone-notch"></div>
              <div class="phone-status-bar">
                <span>14:28</span>
                <span>📶 5G &bull; 98% 🔋</span>
              </div>

              <!-- Phase 1: Homescreen Notification Stage -->
              ${this.chatMessages.length === 0 ? `
                <div style="flex:1; display:flex; flex-direction:column; justify-content:space-between; padding: 20px 10px;">
                  <div>
                    <!-- Interactive Notification Banner -->
                    <div class="phone-notification-banner" onclick="window.scamSimulator.openVictimChat()">
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
                        <span style="font-weight: 700; font-size: 0.8rem; color: #0284C7;">${flow.introNotification.sender}</span>
                        <span style="font-size: 0.65rem; color: #64748B;">Sekarang</span>
                      </div>
                      <div style="font-weight: 600; font-size: 0.85rem; margin-bottom: 2px;">
                        ${flow.introNotification.title}
                      </div>
                      <div style="font-size: 0.78rem; color: #475569; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                        ${flow.introNotification.preview}
                      </div>
                    </div>
                  </div>

                  <div style="text-align: center; padding: 20px;">
                    <div class="pulsing-dot" style="margin: 0 auto 10px auto; width:10px; height:10px;"></div>
                    <p style="font-size: 0.82rem; color: #94A3B8; margin: 0;">
                      Ketuk notifikasi pesan di atas untuk membuka ruang percakapan...
                    </p>
                  </div>
                </div>
              ` : `
                <!-- Phase 2: Active Chat Interface -->
                <div style="flex:1; display:flex; flex-direction:column; height: 100%;">
                  
                  <div class="chat-app-header">
                    <div style="display:flex; align-items:center; gap: 8px;">
                      <span style="font-size: 1.1rem;">👤</span>
                      <div>
                        <div style="font-weight: 700; font-size: 0.82rem; color: var(--text-highlight);">
                          ${scenario.scammerProfile ? scenario.scammerProfile.name : 'Pengirim Eksternal'}
                        </div>
                        <div style="font-size: 0.65rem; color: var(--neon-green);">
                          Online
                        </div>
                      </div>
                    </div>
                    <span class="cyber-tag" style="font-size: 0.65rem;">WhatsApp / SMS</span>
                  </div>

                  <div class="chat-messages-scroll" id="victim-chat-scroll">
                    ${this.chatMessages.map(msg => `
                      <div class="chat-bubble ${msg.isScammer ? 'scammer' : 'victim'}">
                        ${msg.text}
                        <div class="chat-time">${msg.time}</div>
                      </div>
                    `).join('')}

                    ${this.isTyping ? `
                      <div class="chat-typing-indicator holo-enter">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <span style="margin-left: 6px; font-size: 0.75rem;">${this.typingSenderName} sedang mengetik...</span>
                      </div>
                    ` : ''}
                  </div>

                  <!-- In-App Web Browser Simulation for Phishing Link -->
                  ${this.inAppBrowserActive ? `
                    <div class="phone-browser-window holo-enter">
                      <div class="browser-top-bar">
                        <button class="cyber-btn btn-ghost" style="padding: 2px 8px; font-size: 0.72rem;" onclick="window.scamSimulator.handlePhishBrowserAction(false)">
                          ✕ TUTUP
                        </button>
                        <div class="browser-url-pill">
                          🔒 https://bankneoartha-security.xyz/verify
                        </div>
                        <span style="font-size: 0.65rem; color: #DC2626;">SSL Palsu</span>
                      </div>

                      <div class="browser-body">
                        <div style="background: rgba(220, 38, 38, 0.1); border: 1px solid #DC2626; border-radius: 6px; padding: 10px; margin-bottom: 12px; text-align: center;">
                          <span style="color: #DC2626; font-weight: 700; font-size: 0.8rem;">⚠️ PORTAL VERIFIKASI IDENTITAS NASABAH</span>
                        </div>

                        <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 12px;">
                          Masukkan data diri dan kode OTP SMS untuk membatalkan transaksi penarikan dana ilegal:
                        </p>

                        <div style="display:flex; flex-direction:column; gap: 8px; margin-bottom: 14px;">
                          <div>
                            <label style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">Nama Lengkap:</label>
                            <input type="text" class="cyber-input" value="Bimo Prasetyo (Nasabah)" disabled style="width: 100%; font-size: 0.78rem; padding: 6px 8px;">
                          </div>
                          <div>
                            <label style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">Nomor Rekening:</label>
                            <input type="text" class="cyber-input" value="8820192837" disabled style="width: 100%; font-size: 0.78rem; padding: 6px 8px;">
                          </div>
                          <div>
                            <label style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">NIK KTP (16 Digit):</label>
                            <input type="text" class="cyber-input" value="3201019283740001" disabled style="width: 100%; font-size: 0.78rem; padding: 6px 8px;">
                          </div>
                          <div>
                            <label style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--neon-red);">Kode Rahasia OTP SMS (6 Digit):</label>
                            <input type="text" class="cyber-input" value="482910" disabled style="width: 100%; font-size: 0.78rem; padding: 6px 8px; border-color: var(--neon-red);">
                          </div>
                        </div>

                        <div style="display:flex; flex-direction:column; gap: 8px;">
                          <button class="cyber-btn btn-danger" style="width: 100%; justify-content: center; font-size: 0.8rem; padding: 8px;" onclick="window.scamSimulator.handlePhishBrowserAction(false)">
                            🛡️ TOLAK & TUTUP (CURIGA DOMAIN .XYZ BUKAN BANK RESMI)
                          </button>
                          <button class="cyber-btn" style="width: 100%; justify-content: center; font-size: 0.8rem; padding: 8px;" onclick="window.scamSimulator.handlePhishBrowserAction(true)">
                            ⚠️ KIRIM DATA PRIBADI & KODE OTP SEKARANG
                          </button>
                        </div>
                      </div>
                    </div>
                  ` : ''}

                  <!-- Simulated Phone Call Overlay (Love Scam special feature) -->
                  ${this.phoneCallActive ? `
                    <div class="phone-call-overlay">
                      <div style="text-align: center;">
                        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #94A3B8; letter-spacing: 1px;">
                          PANGGILAN WHATSAPP MASUK...
                        </span>
                        <h3 style="color: #FFFFFF; font-size: 1.3rem; margin: 8px 0 0 0;">
                          ${scenario.scammerProfile ? scenario.scammerProfile.name : 'Panggilan Suara'}
                        </h3>
                      </div>

                      <div class="call-avatar-pulse">
                        <span style="font-size: 2.5rem;">📞</span>
                      </div>

                      <div style="width: 100%;">
                        <div class="call-ticker-text">
                          "${currentDialogue.callDialogue || 'Panggilan transmisi suara darurat aktif...'}"
                        </div>

                        <div style="display:flex; justify-content:space-around; gap: 20px; margin-top: 14px;">
                          <button class="cyber-btn btn-danger" style="padding: 10px 20px; font-size: 0.85rem;" onclick="window.scamSimulator.dismissPhoneCall(false)">
                            ✕ TOLAK
                          </button>
                          <button class="cyber-btn" style="padding: 10px 20px; font-size: 0.85rem; background:#16A34A; border-color:#16A34A; color:#FFFFFF;" onclick="window.scamSimulator.dismissPhoneCall(true)">
                            ✓ DENGARKAN
                          </button>
                        </div>
                      </div>
                    </div>
                  ` : ''}

                  <!-- Branching Decision Deck -->
                  ${currentDialogue && !this.phoneCallActive ? `
                    <div class="chat-response-deck">
                      <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-cyan); margin-bottom: 4px;">
                        PILIH RESPON TINDAKAN ANDA:
                      </div>
                      ${currentDialogue.options.map((opt, oIdx) => `
                        <button class="chat-response-btn" onclick="window.scamSimulator.handleVictimChoice(${oIdx})">
                          <span>${opt.text}</span>
                        </button>
                      `).join('')}
                    </div>
                  ` : ''}

                </div>
              `}

            </div>
          </div>

          <!-- Phase 3: Forensic Input Panel (Before ending) -->
          ${this.currentStage === 'gameplay' && this.victimStepIndex >= flow.dialogues.length ? `
            <div class="forensic-analysis-panel holo-enter">
              <div style="display:flex; align-items:center; gap: 8px; margin-bottom: 8px;">
                <span style="font-size: 1.4rem;">🔍</span>
                <h4 style="margin: 0; font-size: 1.05rem; color: var(--neon-cyan);">
                  TANTANGAN ANALISIS FORENSIK INTELIJEN SIBER
                </h4>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">
                Sebelum melihat hasil ending simulasi, <strong>tuliskan secara ringkas alasan mengapa pesan/interaksi di atas merupakan penipuan</strong>, atau indikator apa saja yang mencurigakan (minimal 15 karakter):
              </p>
              
              <textarea id="victim-forensic-input" class="forensic-textarea" placeholder="Contoh: Pesan ini terindikasi penipuan karena mendesak transfer uang biaya bea cukai dengan rekening pribadi, menolak video call, dan memicu kepanikan..."></textarea>
              
              <div style="margin-top: 12px; text-align: right;">
                <button class="cyber-btn" style="padding: 10px 24px; font-size: 0.9rem;" onclick="window.scamSimulator.submitForensicAnalysis()">
                  <span>⚖️</span> KIRIM ANALISIS & LIHAT ENDING ➔
                </button>
              </div>
            </div>
          ` : ''}

        </div>
      `;
    }

    // --- VIEW 6: ENDING MODAL / SCREEN ---
    showEndingScreen() {
      this.stopScammerTimer();
      const isHappy = this.endingType === 'happy';
      const isScammer = this.currentRole === 'scammer';
      const scenario = SCENARIOS[this.currentScenarioIndex];

      const modalBox = document.getElementById('modal-general-box');
      const modalContent = document.getElementById('modal-general-content');
      if (!modalBox || !modalContent) return;

      const xpEarned = isHappy ? (isScammer ? 100 : 150) : (this.timeoutBadEnd ? 10 : 25);
      const vulnDelta = isHappy ? (isScammer ? 0 : -1.2) : 1.5;

      // Record result to live state & leaderboard
      window.authManager?.recordResult(
        xpEarned,
        vulnDelta,
        `SCAM SIMULATOR [${this.currentRole.toUpperCase()}]`,
        `${scenario.name}: ${isHappy ? 'HAPPY ENDING' : (this.timeoutBadEnd ? 'TIMEOUT BAD END' : 'BAD ENDING')}`,
        isHappy ? 'SECURED' : 'VULNERABLE',
        'kasus'
      );

      modalContent.innerHTML = `
        <div style="padding: 10px; text-align: center;">
          <div style="display:flex; justify-content:center; margin-bottom: 8px;">
            ${getPixelAvatarSVG(this.selectedCharId, 84)}
          </div>

          <span class="cyber-tag ${isHappy ? 'tag-green' : 'tag-red'}" style="font-size: 0.85rem; padding: 4px 14px; margin-bottom: 10px;">
            ${isHappy ? 'HAPPY ENDING // MISI BERHASIL' : (this.timeoutBadEnd ? 'BAD ENDING // WAKTU OPERASI HABIS' : 'BAD ENDING // KEGAGALAN TAKTIS')}
          </span>

          <h2 style="font-size: 1.5rem; color: ${isHappy ? 'var(--neon-green)' : 'var(--neon-red)'}; margin: 8px 0;">
            ${isHappy 
              ? (isScammer ? 'Misi Manipulasi Berhasil Dilancarkan!' : 'Anda Berhasil Menghindari Jebakan Penipuan!') 
              : (this.timeoutBadEnd 
                  ? 'Waktu Operasi Scammer Telah Habis!' 
                  : (isScammer ? 'Target Sadar & Memblokir Akses Anda!' : 'Anda Terjebak Masuk ke Dalam Skenario Scam!'))}
          </h2>

          <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6; max-width: 580px; margin: 0 auto 18px auto;">
            ${isHappy 
              ? (isScammer 
                  ? 'Victim berhasil Anda yakinkan melalui manipulasi emosional. Ini menunjukkan betapa berbahayanya taktik social engineering bila tidak diwaspadai di dunia nyata.' 
                  : 'Nalar Zero-Trust Anda terbukti kokoh! Anda memverifikasi informasi, menolak transfer sembarangan, dan melindungi data sensitif Anda.')
              : (this.timeoutBadEnd 
                  ? 'Target kehilangan kesabaran atau mencurigai kelambatan transmisi Anda. Misi manipulasi siber gagal diselesaikan tepat waktu.' 
                  : (isScammer 
                      ? 'Target menyadari ketidaksesuaian nomor rekening dan tidak adanya bukti fisik resmi. Mangsa langsung memutus kontak.' 
                      : 'Keputusan impulsif atau penyerahan data rahasia menyebabkan kerugian aset finansial atau kompromi identitas.'))}
          </p>

          ${this.forensicAnalysisResult ? `
            <div style="background: rgba(0,243,255,0.06); border: 1px solid var(--border-cyan); border-radius: 8px; padding: 14px; margin-bottom: 18px; text-align: left;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
                <strong style="color: var(--neon-cyan); font-size: 0.85rem;">HASIL PENILAIAN ANALISIS FORENSIK:</strong>
                <span class="cyber-tag tag-green">${this.forensicAnalysisResult.score}% Akurat</span>
              </div>
              <p style="font-size: 0.82rem; color: var(--text-main); margin: 0;">
                ${this.forensicAnalysisResult.feedback}
              </p>
            </div>
          ` : ''}

          <div style="display: flex; justify-content: center; gap: 12px; margin-top: 20px; flex-wrap: wrap;">
            <button class="cyber-btn btn-ghost" onclick="document.getElementById('modal-general-box').classList.remove('active'); window.scamSimulator.backToStart();">
              <span>🏠</span> KEMBALI KE MENU SCAM SIMULATOR
            </button>
            <button class="cyber-btn" onclick="document.getElementById('modal-general-box').classList.remove('active'); window.scamSimulator.goToCharSelect();">
              <span>🔄</span> COBA KARAKTER / ROLE LAIN
            </button>
          </div>
        </div>
      `;

      modalBox.classList.add('active');
    }

    // --- USER ACTIONS & CONTROLLER METHODS ---
    openTutorial() {
      this.stopScammerTimer();
      window.cyberAudio?.playClick();
      this.currentStage = 'tutorial';
      this.render();
    }

    goToRoleSelect() {
      this.stopScammerTimer();
      window.cyberAudio?.playClick();
      this.currentStage = 'role_select';
      this.render();
    }

    selectRole(role) {
      this.stopScammerTimer();
      window.cyberAudio?.playClick();
      this.currentRole = role;
      this.selectedCharId = role === 'scammer' ? 'buaya' : 'kucing';
      this.currentStage = 'char_select';
      this.render();
    }

    goToCharSelect() {
      this.stopScammerTimer();
      window.cyberAudio?.playClick();
      this.currentStage = 'char_select';
      this.render();
    }

    pickChar(charId, scenarioIdx = 0) {
      window.cyberAudio?.playClick();
      this.selectedCharId = charId;
      this.currentScenarioIndex = scenarioIdx;
      this.render();
    }

    launchGameplay() {
      this.stopScammerTimer();
      window.cyberAudio?.playSuccess();
      this.currentStage = 'gameplay';
      this.scammerStepIndex = 0;
      this.victimStepIndex = 0;
      this.persuasionScore = 30;
      this.chatMessages = [];
      this.phoneCallActive = false;
      this.forensicUserInput = '';
      this.forensicAnalysisResult = null;
      this.endingType = null;
      this.timeoutBadEnd = false;
      this.isTyping = false;
      this.isThinking = false;
      this.inAppBrowserActive = false;

      const scenario = SCENARIOS[this.currentScenarioIndex] || SCENARIOS[0];

      if (this.currentRole === 'scammer') {
        // Initial intro message for Scammer
        this.chatMessages.push({
          sender: 'SISTEM INTELIJEN',
          text: `Target: ${scenario.victimProfile.name}. Mulai kirimkan transmisi umpan pertama untuk membuka percakapan.`,
          time: 'Baru saja',
          isScammer: false
        });
        this.startScammerTimer();
      }

      this.render();
      if (this.currentRole === 'scammer') {
        this.scrollToBottom('scammer-chat-scroll');
      }
    }

    startScammerTimer() {
      this.stopScammerTimer();
      this.scammerTimeLeft = 90;
      this.scammerTimerInterval = setInterval(() => {
        if (this.currentStage !== 'gameplay' || this.currentRole !== 'scammer') {
          this.stopScammerTimer();
          return;
        }
        this.scammerTimeLeft--;
        const timerEl = document.getElementById('scammer-timer-display');
        if (timerEl) {
          timerEl.textContent = this.formatTime(this.scammerTimeLeft);
          if (this.scammerTimeLeft <= 20) {
            timerEl.style.color = 'var(--neon-red)';
            timerEl.style.textShadow = '0 0 8px rgba(239,68,68,0.6)';
          }
        }
        if (this.scammerTimeLeft <= 0) {
          this.stopScammerTimer();
          this.endingType = 'bad';
          this.timeoutBadEnd = true;
          this.showEndingScreen();
        }
      }, 1000);
    }

    stopScammerTimer() {
      if (this.scammerTimerInterval) {
        clearInterval(this.scammerTimerInterval);
        this.scammerTimerInterval = null;
      }
    }

    formatTime(seconds) {
      const s = Math.max(0, seconds);
      const mins = String(Math.floor(s / 60)).padStart(2, '0');
      const secs = String(s % 60).padStart(2, '0');
      return `${mins}:${secs}`;
    }

    scrollToBottom(elementId) {
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollTop = el.scrollHeight;
      }, 80);
    }

    openVictimChat() {
      window.cyberAudio?.playClick();
      const scenario = SCENARIOS[this.currentScenarioIndex] || SCENARIOS[0];
      const flow = scenario.victimFlow;

      this.chatMessages.push({
        sender: scenario.scammerProfile ? scenario.scammerProfile.name : 'Pengirim',
        text: flow.dialogues[0].incomingMessage,
        time: '14:28',
        isScammer: true
      });

      // If scenario has phone call trigger (e.g. Love Scam)
      if (flow.dialogues[0].hasPhoneCall) {
        setTimeout(() => {
          this.phoneCallActive = true;
          window.cyberAudio?.playWhoosh();
          this.render();
        }, 900);
      }

      this.render();
      this.scrollToBottom('victim-chat-scroll');
    }

    dismissPhoneCall(accepted) {
      this.phoneCallActive = false;
      window.cyberAudio?.playClick();
      if (accepted) {
        this.chatMessages.push({
          sender: 'PANGGILAN SELESAI',
          text: 'Panggilan terputus karena sinyal bandara. Pengirim kembali melanjutkan pesan via chat.',
          time: '14:29',
          isScammer: true
        });
      }
      this.render();
      this.scrollToBottom('victim-chat-scroll');
    }

    handleVictimChoice(optionIndex) {
      if (this.isTyping) return;
      const scenario = SCENARIOS[this.currentScenarioIndex];
      const flow = scenario.victimFlow;
      const currentDialogue = flow.dialogues[this.victimStepIndex];
      const selectedOpt = currentDialogue.options[optionIndex];

      window.cyberAudio?.playClick();

      // Push victim message
      this.chatMessages.push({
        sender: 'Anda (Korban)',
        text: selectedOpt.text,
        time: '14:30',
        isScammer: false
      });
      this.render();
      this.scrollToBottom('victim-chat-scroll');

      // If action triggers browser portal
      if (selectedOpt.action === 'open_phish_browser') {
        setTimeout(() => {
          this.inAppBrowserActive = true;
          this.render();
        }, 500);
        return;
      }

      // Scammer is typing reply
      this.isTyping = true;
      this.typingSenderName = scenario.scammerProfile ? scenario.scammerProfile.name : 'Pengirim';
      this.render();
      this.scrollToBottom('victim-chat-scroll');

      // Push scammer response after 1.2s typing animation
      setTimeout(() => {
        this.isTyping = false;
        this.chatMessages.push({
          sender: scenario.scammerProfile ? scenario.scammerProfile.name : 'Pengirim',
          text: selectedOpt.reply,
          time: '14:31',
          isScammer: true
        });
        this.render();
        this.scrollToBottom('victim-chat-scroll');

        if (selectedOpt.nextStep === 'victim_bad_end') {
          this.endingType = 'bad';
          setTimeout(() => this.showEndingScreen(), 900);
        } else if (selectedOpt.nextStep === 'victim_forensics_challenge') {
          this.victimStepIndex = flow.dialogues.length; // Jump to forensic input
          this.render();
        } else {
          this.victimStepIndex++;
          this.render();
        }
      }, 1200);
    }

    handlePhishBrowserAction(submitted) {
      this.inAppBrowserActive = false;
      window.cyberAudio?.playClick();

      if (submitted) {
        this.chatMessages.push({
          sender: 'Anda (Korban)',
          text: 'Mengisi NIK KTP, Nomor Rekening, dan kode OTP SMS ke formulir web verifikasi.',
          time: '14:32',
          isScammer: false
        });
        this.chatMessages.push({
          sender: 'SISTEM KEAMANAN',
          text: 'PERINGATAN KRITIS: Seluruh kredensial rahasia Anda telah dicuri sindikat siber. Saldo rekening terkuras habis!',
          time: '14:32',
          isScammer: true
        });
        this.endingType = 'bad';
        this.render();
        this.scrollToBottom('victim-chat-scroll');
        setTimeout(() => this.showEndingScreen(), 1000);
      } else {
        this.chatMessages.push({
          sender: 'Anda (Korban)',
          text: 'Membatalkan pengisian formulir dan menutup web karena menyadari domain .xyz bukan domain resmi perbankan (.co.id).',
          time: '14:32',
          isScammer: false
        });
        this.chatMessages.push({
          sender: 'SISTEM KEAMANAN',
          text: 'Tindakan Zero-Trust terverifikasi: Anda berhasil melindungi data sensitif Anda dari web penipuan phishing.',
          time: '14:32',
          isScammer: true
        });
        const scenario = SCENARIOS[this.currentScenarioIndex];
        this.victimStepIndex = scenario.victimFlow.dialogues.length; // Jump to forensic challenge
        this.render();
        this.scrollToBottom('victim-chat-scroll');
      }
    }

    handleScammerChoice(optionIndex) {
      if (this.isTyping || this.isThinking) return;
      const scenario = SCENARIOS[this.currentScenarioIndex];
      const flow = scenario.scammerFlow;
      const currentDialogue = flow.dialogues[this.scammerStepIndex];
      const selectedOpt = currentDialogue.options[optionIndex];

      window.cyberAudio?.playClick();

      // Scammer sent message
      this.chatMessages.push({
        sender: 'Anda (Scammer)',
        text: selectedOpt.text,
        time: '14:30',
        isScammer: true
      });

      this.persuasionScore = Math.max(0, Math.min(100, this.persuasionScore + selectedOpt.persuasionDelta));

      // Victim is typing
      this.isTyping = true;
      this.typingSenderName = scenario.victimProfile.name;
      this.render();
      this.scrollToBottom('scammer-chat-scroll');

      // Victim replies after 1.2s typing animation
      setTimeout(() => {
        this.isTyping = false;
        this.chatMessages.push({
          sender: scenario.victimProfile.name,
          text: selectedOpt.victimReply,
          time: '14:31',
          isScammer: false
        });
        this.render();
        this.scrollToBottom('scammer-chat-scroll');

        if (selectedOpt.nextStep === 'scammer_happy_end') {
          this.stopScammerTimer();
          this.endingType = 'happy';
          setTimeout(() => this.showEndingScreen(), 900);
        } else if (selectedOpt.nextStep === 'scammer_bad_end') {
          this.stopScammerTimer();
          this.endingType = 'bad';
          setTimeout(() => this.showEndingScreen(), 900);
        } else {
          // Scammer enters thinking state before next decisions
          this.isThinking = true;
          this.render();
          this.scrollToBottom('scammer-chat-scroll');

          setTimeout(() => {
            this.isThinking = false;
            this.scammerStepIndex++;
            this.render();
            this.scrollToBottom('scammer-chat-scroll');
          }, 1100);
        }
      }, 1200);
    }

    submitForensicAnalysis() {
      const inputEl = document.getElementById('victim-forensic-input');
      const val = inputEl ? inputEl.value.trim() : '';

      if (val.length < 15) {
        window.cyberAudio?.playError();
        window.app?.showToast('Tuliskan analisis minimal 15 karakter untuk menyelesaikan verifikasi forensik!', 'error');
        return;
      }

      window.cyberAudio?.playSuccess();
      const scenario = SCENARIOS[this.currentScenarioIndex];
      const expected = scenario.victimFlow.forensicExpectedKeywords || [];
      const lower = val.toLowerCase();

      let matchCount = 0;
      expected.forEach(kw => {
        if (lower.includes(kw.toLowerCase())) matchCount++;
      });

      const score = Math.min(100, Math.max(65, Math.round((matchCount / Math.max(1, expected.length)) * 100) + 40));
      this.forensicAnalysisResult = {
        score: score,
        feedback: `Analisis Anda berhasil mengidentifikasi ${matchCount} red flag kunci (${expected.slice(0, 3).join(', ')}...). Penalaran siber Anda sangat tajam!`
      };

      this.endingType = 'happy';
      this.showEndingScreen();
    }

    backToStart() {
      this.stopScammerTimer();
      window.cyberAudio?.playClick();
      this.currentStage = 'start';
      this.render();
    }

    // Legacy method forwarders so other components do not break
    startScenario(idx) {
      this.stopScammerTimer();
      this.currentScenarioIndex = idx || 0;
      this.goToRoleSelect();
    }
  }

  // Instantiate and bind globally
  window.scamSimulator = new ScamSimulatorManager();
  window.moduleKasus = window.scamSimulator; // Alias for backward compatibility
})();
