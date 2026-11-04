<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GameCase;
use App\Models\ActivityLog;

class ScannerController extends Controller
{
    /**
     * Scan URL or News headline entered in the textbox
     */
    public function scan(Request $request)
    {
        $rawTarget = trim($request->input('target', ''));
        if (empty($rawTarget)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Target URL atau teks berita wajib dimasukkan pada kolom input.'
            ], 400);
        }

        $userId = $request->input('user_id', 'USR-002');
        $userName = $request->input('user_name', 'Cadet Aris');

        // 1. Check if matching preset sample in database
        $preset = null;
        try {
            $preset = GameCase::category('scanner')->get()->first(function($item) use ($rawTarget) {
                $data = $item->scenario_data;
                return isset($data['target']) && strtolower(trim($data['target'])) === strtolower($rawTarget);
            });
        } catch (\Throwable $e) {}

        if ($preset && isset($preset->scenario_data)) {
            $data = $preset->scenario_data;
            $result = [
                'target' => $rawTarget,
                'target_type' => $data['type'] ?? 'url',
                'is_malicious' => $data['is_malicious'],
                'risk_score' => $data['risk_score'],
                'threat_type' => $data['threat_type'],
                'explanation' => $data['explanation'],
                'matched_indicators' => $data['matched_indicators'] ?? ['Tercatat dalam basis data ancaman simulasi'],
                'security_hints' => $data['security_hints'],
            ];
        } else {
            // 2. Dynamic Deep Cyber Forensic Inspection for custom user input
            $result = $this->analyzeCustomTarget($rawTarget);
        }

        // Log to ActivityLog (with catch protection)
        try {
            ActivityLog::create([
                'log_code' => 'LOG-' . rand(1000, 9999),
                'user_id' => $userId,
                'user_name' => $userName,
                'module' => 'NEWS/LINK SCANNER',
                'decision' => 'Memindai: "' . substr($rawTarget, 0, 32) . '..." -> ' . ($result['is_malicious'] ? 'BAHAYA' : 'AMAN') . " (Skor: {$result['risk_score']}/10)",
                'vulnerability_score' => $result['risk_score'],
                'status' => $result['is_malicious'] ? 'THREAT_IDENTIFIED' : 'SECURED',
            ]);
        } catch (\Throwable $logErr) {}

        return response()->json([
            'status' => 'success',
            'data' => $result
        ]);
    }

    /**
     * In-depth heuristic analysis for arbitrary user text or link
     */
    private function analyzeCustomTarget(string $target): array
    {
        $lower = strtolower($target);
        $isUrl = (bool) preg_match('/^(https?:\/\/|[a-z0-9\-\.]+\.[a-z]{2,})/i', $target);
        $matchedFlags = [];
        $hints = [];

        // Whitelisted authentic domains
        $whitelist = [
            'kemkominfo.go.id', 'go.id', 'polri.go.id', 'bca.co.id',
            'bankmandiri.co.id', 'bri.co.id', 'bni.co.id', 'google.com',
            'youtube.com', 'wikipedia.org', 'github.com', 'microsoft.com'
        ];

        $isWhitelisted = false;
        foreach ($whitelist as $wl) {
            if (str_contains($lower, $wl)) {
                $isWhitelisted = true;
                break;
            }
        }

        if ($isWhitelisted) {
            return [
                'target' => $target,
                'target_type' => 'URL Resmi',
                'is_malicious' => false,
                'risk_score' => 0.8,
                'threat_type' => 'Domain Terverifikasi Resmi & Autentik',
                'matched_indicators' => ['Terdaftar pada daftar putih (whitelist) entitas resmi terpercaya'],
                'explanation' => "Target '{$target}' cocok dengan domain institusi/layanan resmi terverifikasi. Tidak ditemukan indikator manipulasi DNS atau penyamaran URL.",
                'security_hints' => [
                    'Pastikan ikon gembok SSL/TLS tetap terkunci hijau pada peramban Anda',
                    'Aktifkan verifikasi 2 langkah (2FA) pada akun layanan terkait'
                ]
            ];
        }

        // 1. Protocol Inspection
        if (str_starts_with($lower, 'http://')) {
            $matchedFlags[] = 'Protokol HTTP Tidak Terenkripsi (Komunikasi teks terbuka / rawan sniffing)';
        }

        // 2. IP Host Check (Direct IP address in URL)
        if (preg_match('/https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/', $lower)) {
            $matchedFlags[] = 'Penggunaan Alamat IP Langsung tanpa Domain Resmi (Indikator server malware/phishing host)';
        }

        // 3. Dangerous / Phishing TLDs
        $suspiciousTlds = ['.xyz', '.top', '.tk', '.ml', '.ga', '.cf', '.gq', '.buzz', '.club', '.fake', '.mock', '.work', '.link', '.ru', '.cc', '.fun'];
        foreach ($suspiciousTlds as $tld) {
            if (str_contains($lower, $tld)) {
                $matchedFlags[] = "Ekstensi Domain Berisiko Tinggi ({$tld}) yang kerap disalahgunakan sindikat";
                break;
            }
        }

        // 4. Financial / Brand Impersonation Tokens
        $brands = [
            'bca' => 'Bank Central Asia',
            'mandiri' => 'Bank Mandiri',
            'bri' => 'Bank Rakyat Indonesia',
            'bni' => 'Bank Negara Indonesia',
            'dana' => 'Dompet Digital DANA',
            'gopay' => 'GoPay',
            'ovo' => 'OVO Wallet',
            'shopee' => 'Shopee / ShopeePay',
            'whatsapp' => 'WhatsApp Messenger',
            'telegram' => 'Telegram'
        ];

        foreach ($brands as $token => $brandName) {
            if (str_contains($lower, $token) && !str_contains($lower, ".co.id")) {
                $matchedFlags[] = "Indikasi Peniruan Brand / Typosquatting ({$brandName}) di luar domain resmi";
                break;
            }
        }

        // 5. Psychological Lures & Phishing Keywords
        $lures = [
            'klaim' => 'Manipulasi Umpan Hadiah / Klaim Dana',
            'hadiah' => 'Umpan Hadiah / Lotere Tidak Masuk Akal',
            'undian' => 'Manipulasi Undian Palsu Berhadiah Besar',
            'bonus' => 'Tawaran Bonus Instan Tanpa Syarat',
            'subsidi' => 'Pemberian Bantuan / Subsidi Palsu',
            'terkunci' => 'Intimidasi Akun Terkunci / Suspensi',
            'blokir' => 'Ancaman Pemblokiran Rekening Darurat',
            'apk' => 'Penyebaran Berkas Malware APK Berbahaya',
            'surat-tilang' => 'Penipuan Modus Surat Tilang / Kurir',
            'login' => 'Upaya Pengumpulan Kredensial Login (Phishing Form)',
            'signin' => 'Halaman Autentikasi Palsu',
            'update-rekening' => 'Eksploitasi Pembaruan Data Finansial Pribadi'
        ];

        foreach ($lures as $token => $label) {
            if (str_contains($lower, $token)) {
                $matchedFlags[] = $label;
            }
        }

        // Decision logic
        $flagCount = count($matchedFlags);
        $isMalicious = ($flagCount > 0);

        if ($isMalicious) {
            $riskScore = min(9.9, +(4.2 + ($flagCount * 1.4)));
            $threatType = $flagCount >= 3 
                ? 'Ancaman Kritis: Sindikat Phishing & Penipuan Siber Terorganisir' 
                : 'Peringatan: Potensi Rekayasa Sosial / Tautan Mencurigakan';

            $explanation = "Analisis mendalam terhadap target '{$target}' menemukan {$flagCount} indikator bahaya siber: " 
                . implode('; ', $matchedFlags) 
                . ". Target ini terindikasi kuat merekayasa urgensi emosional atau menyamarkan identitas asli untuk mencuri data pribadi/finansial korban.";

            $hints = [
                'JANGAN klik tautan ini atau mengunduh lampiran apapun (termasuk berkas .apk/.exe)',
                'JANGAN pernah memasukkan username, password, nomor kartu, atau kode OTP Anda',
                'Selalu akses portal resmi melalui pengetikan alamat URL secara mandiri di browser',
                'Laporkan nomor pengirim atau tautan ini ke kanal aduan resmi siber nasional'
            ];
        } else {
            $riskScore = 1.4;
            $threatType = 'Tautan Terindikasi Netral / Aman Standar';
            $matchedFlags[] = 'Tidak ditemukan kata kunci typosquatting, ekstensi palsu, atau taktik urgensi';
            $explanation = "Pemindaian semantik terhadap '{$target}' tidak menemukan pola rekayasa sosial, manipulasi emosi, atau penyamaran domain yang mencurigakan.";
            $hints = [
                'Tetap berhati-hati saat mengakses tautan baru dari korespondensi yang tidak dikenal',
                'Pastikan alamat situs menggunakan protokol HTTPS dengan sertifikat yang valid'
            ];
        }

        return [
            'target' => $target,
            'target_type' => $isUrl ? 'URL Transmisi Siber' : 'Teks Transmisi / Berita',
            'is_malicious' => $isMalicious,
            'risk_score' => +(round($riskScore, 1)),
            'threat_type' => $threatType,
            'matched_indicators' => $matchedFlags,
            'explanation' => $explanation,
            'security_hints' => $hints
        ];
    }
}
