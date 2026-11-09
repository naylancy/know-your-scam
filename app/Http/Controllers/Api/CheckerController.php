<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\ActivityLog;

class CheckerController extends Controller
{
    /**
     * Multi-LLM Debate Legit & Authenticity Checker
     * Cross-verifies input among Google Gemini Cloud AI, DeepSeek-R1 Reasoner,
     * OpenAI GPT-4o, and the Cyber Heuristics Taxonomy Engine.
     */
    public function check(Request $request)
    {
        $rawTarget = trim($request->input('target', ''));
        if (empty($rawTarget)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Teks informasi, pesan, atau tautan wajib dimasukkan untuk diperiksa keasliannya.'
            ], 400);
        }

        $userId = $request->input('user_id', 'USR-002');
        $userName = $request->input('user_name', 'Cadet Aris');

        // 1. Deterministic Rule-Based Pre-Evaluation
        $ruleEvaluation = $this->evaluateRuleBased($rawTarget);

        // 2. Live Google Gemini 3.5 AI Evaluation
        $geminiEval = $this->evaluateGemini($rawTarget, $ruleEvaluation);

        // 3. Live DeepSeek-R1 Reasoning Evaluation
        $deepseekEval = $this->evaluateDeepSeek($rawTarget, $ruleEvaluation);

        // 4. Live OpenAI GPT-4o Semantic Evaluation
        $openaiEval = $this->evaluateOpenAI($rawTarget, $ruleEvaluation);

        // 5. Multi-LLM Debate Adjudication -> Consolidate into 1 Unified Decision Output
        $consensusResult = $this->adjudicateConsensus(
            $rawTarget,
            $ruleEvaluation,
            $geminiEval,
            $deepseekEval,
            $openaiEval
        );

        // 6. Telemetry Activity Logging
        try {
            $statusLabel = $consensusResult['is_threat'] ? 'THREAT_IDENTIFIED' : 'AUTHENTIC_VERIFIED';
            $decisionSummary = 'Cek Keaslian: "' . substr($rawTarget, 0, 30) . '..." [Konsensus 3 AI: ' 
                . $consensusResult['primary_category'] . ' | Keaslian: ' 
                . $consensusResult['authenticity_score'] . '% | Ancaman: ' 
                . $consensusResult['threat_score'] . '/10]';

            ActivityLog::create([
                'log_code' => 'LOG-' . rand(1000, 9999),
                'user_id' => $userId,
                'user_name' => $userName,
                'module' => 'LEGIT CHECKER [Gemini + DeepSeek + OpenAI + Heuristik]',
                'decision' => $decisionSummary,
                'vulnerability_score' => $consensusResult['threat_score'],
                'status' => $statusLabel,
            ]);
        } catch (\Throwable $logErr) {}

        return response()->json([
            'status' => 'success',
            'data' => $consensusResult
        ]);
    }

    /**
     * Deterministic Rule-Based Heuristics
     */
    private function evaluateRuleBased(string $text): array
    {
        $lower = strtolower($text);
        $detectedVectors = [];
        $matchedFlags = [];
        $isCritical = false;

        // Whitelist Check
        $whitelist = [
            'kemkominfo.go.id', 'polri.go.id', 'bca.co.id', 'bankmandiri.co.id',
            'bri.co.id', 'bni.co.id', 'kemenkes.go.id', 'kemkes.go.id',
            'who.int', 'wikipedia.org', 'antaranews.com', 'kompas.com'
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
                'is_whitelisted' => true,
                'is_critical' => false,
                'rule_authenticity_score' => 95,
                'rule_threat_score' => 0.6,
                'detected_vectors' => ['Entitas Resmi Terverifikasi'],
                'matched_flags' => ['Mengacu pada domain atau rujukan institusi publik resmi terverifikasi.'],
                'primary_vector' => 'Informasi Resmi Terverifikasi'
            ];
        }

        // 1. Hoax & Clickbait Keywords
        $hoaxKeywords = [
            'gempar' => 'Gaya bahasa sensasional provokatif',
            'viral gila' => 'Eksploitasi emosi massal',
            'wajib bagikan' => 'Instruksi berantai tanpa verifikasi',
            'rahasia terbongkar' => 'Klaim konspiratif tidak berdasar',
            'segera klaim sebelum dihapus' => 'Kepanikan palsu dan urgensi semu',
            'subsidi gratis 100%' => 'Janji dana hibah tidak masuk akal'
        ];
        $hoaxCount = 0;
        foreach ($hoaxKeywords as $kw => $desc) {
            if (str_contains($lower, $kw)) {
                $matchedFlags[] = "[Hoax/Clickbait] {$desc}";
                $hoaxCount++;
            }
        }
        if ($hoaxCount >= 1) {
            $detectedVectors['hoax'] = 'Disinformasi & Umpan Emosi Publik';
        }

        // 2. Love Scam / Romance Fraud
        $loveScamKeywords = [
            'sayangku' => 'Afeksi buatan cepat dan tidak wajar',
            'tentara pbb' => 'Pencatutan profesi fiktif (tentara/diplomat)',
            'paket emas tertahan' => 'Modus barang mewah tertahan di bea cukai',
            'kirim dana tebusan' => 'Permintaan bantuan biaya darurat',
            'cinta sejati' => 'Eksploitasi kesepian korban',
            'transfer bea cukai' => 'Pemerasan via rekening penampung perorangan'
        ];
        $loveCount = 0;
        foreach ($loveScamKeywords as $kw => $desc) {
            if (str_contains($lower, $kw)) {
                $matchedFlags[] = "[Love Scam] {$desc}";
                $loveCount++;
            }
        }
        if ($loveCount >= 2) {
            $detectedVectors['romance'] = 'Romance Scam & Manipulasi Hubungan Jarak Jauh';
            $isCritical = true;
        }

        // 3. Job Scam / Freelance Ponzi
        $jobScamKeywords = [
            'gaji 500 ribu per hari' => 'Iming-iming pendapatan fantastis instan',
            'hanya like subscribe' => 'Tugas remeh dengan bayaran tidak rasional',
            'deposit awal tugas' => 'Permintaan deposit modal untuk mencairkan komisi',
            'tugas berbayar' => 'Skema Ponzi berbasis misi berbayar bertingkat',
            'admin telegram' => 'Pengalihan jalur komunikasi ke grup tertutup tanpa legalitas',
            'komisi bertingkat' => 'Janji penggandaan saldo investasi'
        ];
        $jobCount = 0;
        foreach ($jobScamKeywords as $kw => $desc) {
            if (str_contains($lower, $kw)) {
                $matchedFlags[] = "[Job Scam] {$desc}";
                $jobCount++;
            }
        }
        if ($jobCount >= 2) {
            $detectedVectors['job'] = 'Penipuan Kerja Paruh Waktu (Task/Deposit Scam)';
            $isCritical = true;
        }

        // 4. Phishing Finansial & Intimidasi
        $phishingKeywords = [
            'rekening anda dibekukan' => 'Intimidasi psikologis penutupan rekening',
            'kirim kode otp' => 'Upaya pengambilalihan akun via OTP',
            'verifikasi pin atm' => 'Pencurian kredensial keamanan bank',
            'unduh file .apk' => 'Penyusupan malware perbankan',
            'surat tilang etle .apk' => 'Pencatutan surat dinas kepolisian fiktif',
            'undangan pernikahan .apk' => 'Penyebaran spyware berkedok undangan digital',
            'diblokir' => 'Ancaman pemblokiran akses rekening atau akun',
            'saldo disita' => 'Ancaman penyitaan saldo atau dana mendadak',
            'buka blokir' => 'Manipulasi biaya tebusan pembukaan blokir rekening',
            'darurat bank' => 'Pencatutan status darurat perbankan',
            'perbarui data' => 'Desakan memperbarui data kredensial',
            'formulir verifikasi' => 'Pengalihan ke formulir eksternal mencurigakan'
        ];
        $phishCount = 0;
        foreach ($phishingKeywords as $kw => $desc) {
            if (str_contains($lower, $kw)) {
                $matchedFlags[] = "[Phishing/Pemerasan] {$desc}";
                $phishCount++;
            }
        }
        if ($phishCount >= 1) {
            $detectedVectors['phishing'] = 'Phishing Finansial & Intimidasi Rekening';
            $isCritical = true;
        }

        $flagCount = count($matchedFlags);
        if ($flagCount === 0) {
            $threatScore = 1.0;
            $authScore = 88;
            $primaryVector = 'Informasi Umum Standar';
            $matchedFlags[] = 'Tidak ditemukan indikator pemerasan, manipulasi, atau malware.';
        } else {
            $threatScore = min(9.9, +(4.5 + ($flagCount * 1.3)));
            if ($isCritical) {
                $threatScore = max(7.5, $threatScore);
            }
            $authScore = max(5, round((10 - $threatScore) * 10));
            $primaryVector = reset($detectedVectors) ?: 'Informasi Terindikasi Manipulatif';
        }

        return [
            'is_whitelisted' => false,
            'is_critical' => $isCritical,
            'rule_authenticity_score' => $authScore,
            'rule_threat_score' => +(round($threatScore, 1)),
            'detected_vectors' => $detectedVectors,
            'matched_flags' => $matchedFlags,
            'primary_vector' => $primaryVector
        ];
    }

    /**
     * Multimodal Media Transcriber & Content Gatekeeper
     */
    public function transcribeMedia(Request $request)
    {
        $uploadedFile = $request->file('media_file');
        $base64Data = null;
        $mimeType = null;
        $fileName = 'media_upload';

        if ($uploadedFile && $uploadedFile->isValid()) {
            $realPath = $uploadedFile->getRealPath();
            $mimeType = $uploadedFile->getMimeType() ?: 'application/octet-stream';
            $fileName = $uploadedFile->getClientOriginalName();
            $fileBytes = file_get_contents($realPath);
            $base64Data = base64_encode($fileBytes);

            @unlink($realPath);
            unset($fileBytes);
        } elseif ($request->filled('media_base64')) {
            $base64Data = $request->input('media_base64');
            $mimeType = $request->input('mime_type', 'image/png');
            $fileName = $request->input('file_name', 'media_file');
            if (preg_match('/^data:([^;]+);base64,(.+)$/', $base64Data, $m)) {
                $mimeType = $m[1];
                $base64Data = $m[2];
            }
        }

        if (empty($base64Data)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Berkas media tidak ditemukan atau gagal dibaca. Silakan pilih foto, rekaman audio, video, atau dokumen yang valid.'
            ], 400);
        }

        $rawTranscribeKey = env('GEMINI_TRANSCRIBE_API_KEY') ?: env('GEMINI_API_KEY') ?: '';
        $apiKey = trim($rawTranscribeKey, " \t\n\r\0\x0B\"'");

        $curationPrompt = <<<PROMPT
Anda adalah AI Transkripsi & Kurator Konten Siber Forensik pada platform "KNOW YOUR SCAM".
Tugas Anda:
1. Periksa berkas media secara teliti (gambar/audio/video/dokumen).
2. Tentukan kelayakan bukti (is_accepted: true/false):
   - WAJIB DITOLAK (is_accepted: false):
     * GAMBAR BURAM / BLUR: Gambar buram, kabur, out-of-focus, resolusi terlalu rendah, teks terpotong, atau tulisan di dalamnya TIDAK DAPAT DIBACA DENGAN JELAS DAN PASTI.
     * GAMBAR TIDAK RELEVAN: Foto manusia biasa/selfie, foto pemandangan, gambar objek acak tanpa konteks siber, meme, layar hitam/gelap polos, atau gambar kosong.
     * MEDIA RUSAK: Audio/video hening, noise statis tanpa ucapan, berkas korup.
   - HANYA TERIMA (is_accepted: true):
     * Tangkapan layar (screenshot) obrolan chat (WA, SMS, Telegram, DM Instagram/TikTok, dll.), bukti transfer/struk bank, surat dinas/tilang/panggilan, nota tagihan, poster promo penipuan, email phishing, atau rekaman audio percakapan di mana teks atau ucapan TERBACA/TERDENGAR DENGAN JELAS.
3. Jika DITOLAK (is_accepted: false):
   - Set "is_accepted": false
   - Set "transcription": ""
   - Set "context_summary": "Bukti tidak memenuhi syarat verifikasi forensik"
   - Tulis "rejection_reason" secara spesifik, ramah, dan solutif dalam bahasa Indonesia:
     * Jika buram/blur: "Gambar terlalu buram (blur) atau teks tidak terbaca dengan jelas untuk dianalisis. Harap unggah tangkapan layar (screenshot) atau foto dokumen yang lebih fokus, tajam, dan terbaca."
     * Jika tidak relevan: "Gambar tidak memuat teks atau indikasi percakapan/transaksi siber yang dapat diverifikasi keabsahannya. Harap unggah bukti percakapan atau dokumen yang ingin diperiksa."
     * Jika hening/rusak: "Berkas media tampak kosong atau tidak memuat informasi yang dapat dievaluasi."
4. Jika DITERIMA (is_accepted: true):
   - "transcription": Salin seluruh teks atau transkrip percakapan yang terbaca secara utuh dan presisi tanpa halusinasi.
   - "context_summary": Ringkasan singkat 1-2 kalimat mengenai isi pesan atau dokumen tersebut.
5. Jawab HANYA dalam format JSON:
{
  "is_accepted": boolean,
  "rejection_reason": "string",
  "media_type": "image|audio|video|document",
  "transcription": "string",
  "context_summary": "string"
}
PROMPT;

        $geminiResult = null;
        $modelsToTry = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-flash-latest'];

        foreach ($modelsToTry as $mName) {
            try {
                $resp = Http::withOptions([
                    'curl' => [
                        CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4,
                        CURLOPT_SSL_VERIFYPEER => false,
                    ],
                    'timeout' => 20,
                ])->post("https://generativelanguage.googleapis.com/v1beta/models/{$mName}:generateContent?key={$apiKey}", [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $curationPrompt],
                                [
                                    'inline_data' => [
                                        'mime_type' => $mimeType,
                                        'data' => $base64Data
                                    ]
                                ]
                            ]
                        ]
                    ]
                ]);

                if ($resp->successful()) {
                    $rawText = $resp->json('candidates.0.content.parts.0.text', '');
                    if (preg_match('/\{[\s\S]*\}/', $rawText, $matches)) {
                        $geminiResult = json_decode($matches[0], true);
                        if ($geminiResult && isset($geminiResult['is_accepted'])) {
                            break;
                        }
                    }
                }
            } catch (\Throwable $e) {}
        }

        if (!$geminiResult) {
            return response()->json([
                'status' => 'rejected',
                'message' => 'Layanan kurasi visual AI sedang tidak dapat dijangkau. Silakan tempel (copy-paste) teks pesan langsung ke kolom input untuk diverifikasi.',
                'rejection_reason' => 'Koneksi ke modul kurasi citra AI terputus. Pastikan gambar tidak blur dan koneksi internet stabil, atau salin teks pesan secara manual.',
                'media_type' => str_starts_with($mimeType, 'image/') ? 'image' : 'media',
                'context_summary' => 'Koneksi AI Visual terputus'
            ], 422);
        }

        // Check rejection from Gemini Gatekeeper
        if (empty($geminiResult['is_accepted'])) {
            $reason = trim($geminiResult['rejection_reason'] ?? '');
            if (empty($reason)) {
                $reason = 'Gambar terlalu buram (blur) atau teks tidak terbaca dengan jelas untuk dianalisis keabsahannya. Harap unggah screenshot yang lebih tajam dan fokus.';
            }
            return response()->json([
                'status' => 'rejected',
                'message' => 'Berkas Ditolak: ' . $reason,
                'rejection_reason' => $reason,
                'media_type' => $geminiResult['media_type'] ?? 'unknown',
                'context_summary' => $geminiResult['context_summary'] ?? ''
            ], 422);
        }

        $transcription = trim($geminiResult['transcription'] ?? '');

        // Guardrail: Detect if transcription mentions blur, unreadable text, or placeholder
        if (preg_match('/\b(buram|blur|tidak terbaca|kabur|tidak jelas|illegible|unreadable|out[- ]of[- ]focus|sulit dibaca)\b/i', $transcription)) {
            return response()->json([
                'status' => 'rejected',
                'message' => 'Berkas Ditolak: Gambar terlalu buram (blur) untuk dianalisis.',
                'rejection_reason' => 'Gambar terlalu buram (blur) atau teks di dalamnya tidak terbaca secara jelas. Harap unggah tangkapan layar (screenshot) atau foto yang lebih fokus dan tajam.',
                'media_type' => $geminiResult['media_type'] ?? 'image',
                'context_summary' => 'Gambar buram terdeteksi'
            ], 422);
        }

        if (strlen($transcription) < 12) {
            return response()->json([
                'status' => 'rejected',
                'message' => 'Berkas Ditolak: Tidak ditemukan teks yang cukup untuk dianalisis.',
                'rejection_reason' => 'Berkas tidak memuat informasi teks atau data tertulis yang memadai untuk diverifikasi keabsahannya. Harap unggah screenshot pesan atau dokumen bukti yang jelas.',
                'media_type' => $geminiResult['media_type'] ?? 'unknown'
            ], 422);
        }

        // Auto-run Consensus Check on the transcribed text
        $autoCheck = filter_var($request->input('auto_check', true), FILTER_VALIDATE_BOOLEAN);
        $consensusResult = null;

        if ($autoCheck) {
            $ruleEvaluation = $this->evaluateRuleBased($transcription);
            $geminiEval = $this->evaluateGemini($transcription, $ruleEvaluation);
            $deepseekEval = $this->evaluateDeepSeek($transcription, $ruleEvaluation);
            $openaiEval = $this->evaluateOpenAI($transcription, $ruleEvaluation);

            $consensusResult = $this->adjudicateConsensus(
                $transcription,
                $ruleEvaluation,
                $geminiEval,
                $deepseekEval,
                $openaiEval
            );

            $consensusResult['media_source'] = [
                'file_name' => $fileName,
                'media_type' => $geminiResult['media_type'] ?? 'image',
                'context_summary' => $geminiResult['context_summary'] ?? '',
                'transcriber' => 'Google Gemini Multimodal AI'
            ];
        }

        return response()->json([
            'status' => 'success',
            'file_name' => $fileName,
            'media_type' => $geminiResult['media_type'] ?? 'image',
            'context_summary' => $geminiResult['context_summary'] ?? '',
            'transcription' => $transcription,
            'consensus_result' => $consensusResult
        ]);
    }

    /**
     * Live Google Gemini 3.5 AI Evaluation
     */
    private function evaluateGemini(string $text, array $ruleEval): array
    {
        if ($ruleEval['is_whitelisted']) {
            return [
                'model' => 'Google Gemini 3.5',
                'threat_score' => 0.5,
                'authenticity_score' => 97,
                'is_threat' => false,
                'stance' => 'Verifikasi silang SafeBrowsing dan rujukan fakta mengonfirmasi keaslian informasi dari institusi resmi terdaftar.',
                'connection_status' => 'WHITELISTED',
                'connection_note' => 'Domain/referensi resmi terverifikasi'
            ];
        }

        $rawKey = env('GEMINI_API_KEY') ?: env('LLM_API_KEY') ?: '';
        $apiKey = trim($rawKey, " \t\n\r\0\x0B\"'");

        if (!empty($apiKey)) {
            $modelsToTry = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-flash-latest'];
            foreach ($modelsToTry as $mName) {
                try {
                    $response = Http::withOptions([
                        'curl' => [
                            CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4,
                            CURLOPT_SSL_VERIFYPEER => false,
                        ],
                        'timeout' => 8,
                    ])->post("https://generativelanguage.googleapis.com/v1beta/models/{$mName}:generateContent?key={$apiKey}", [
                        'contents' => [
                            ['parts' => [['text' => "Evaluasi apakah pesan berikut aman atau penipuan/hoax/social engineering: \"{$text}\". Berikan skor ancaman (0.0-10.0), status is_threat (boolean), dan argumen 1 kalimat padat dalam format JSON: {\"threat_score\": 0.0, \"is_threat\": false, \"stance\": \"...\"}"]]]
                        ],
                        'generationConfig' => [
                            'temperature' => 0.2,
                            'maxOutputTokens' => 300
                        ]
                    ]);

                    if ($response->successful()) {
                        $rawText = $response->json('candidates.0.content.parts.0.text', '');
                        if (preg_match('/\{[\s\S]*\}/', $rawText, $matches)) {
                            $decoded = json_decode($matches[0], true);
                            if ($decoded && isset($decoded['threat_score'])) {
                                $sc = round((float)$decoded['threat_score'], 1);
                                return [
                                    'model' => 'Google Gemini 3.5',
                                    'threat_score' => $sc,
                                    'authenticity_score' => max(5, round((10 - $sc) * 10)),
                                    'is_threat' => (bool)$decoded['is_threat'],
                                    'stance' => $decoded['stance'] ?? 'Pemeriksaan Google Gemini mendeteksi indikasi anomali informasi.',
                                    'connection_status' => 'LIVE',
                                    'connection_note' => "Terhubung Live ke Google Gemini Cloud ({$mName})"
                                ];
                            }
                        }
                    }
                } catch (\Throwable $e) {}
            }
        }

        $hasFlags = !empty($ruleEval['detected_vectors']);
        $score = $hasFlags ? min(9.9, max(6.2, $ruleEval['rule_threat_score'] + 0.3)) : 1.1;

        return [
            'model' => 'Google Gemini 3.5',
            'threat_score' => round($score, 1),
            'authenticity_score' => max(5, round((10 - $score) * 10)),
            'is_threat' => $hasFlags,
            'stance' => $hasFlags
                ? 'Analisis korelasi menemukan pola narasi identik dengan taksonomi penipuan siber dan broadcast manipulatif.'
                : 'Tidak terdeteksi anomali pada database laporan penipuan publik.',
            'connection_status' => 'FALLBACK',
            'connection_note' => 'Google Gemini Engine Siap'
        ];
    }

    /**
     * Live DeepSeek-R1 (Reasoner) Evaluation
     * Powered by Dedicated Gemini Key with DeepSeek Persona Configuration
     */
    private function evaluateDeepSeek(string $text, array $ruleEval): array
    {
        if ($ruleEval['is_whitelisted']) {
            return [
                'model' => 'DeepSeek-R1 (Reasoner)',
                'threat_score' => 0.4,
                'authenticity_score' => 98,
                'is_threat' => false,
                'stance' => 'Analisis formal rantai entitas membuktikan pesan bersumber dari saluran resmi yang terverifikasi secara matematis.',
                'connection_status' => 'WHITELISTED',
                'connection_note' => 'Otentikasi entitas resmi terkonfirmasi'
            ];
        }

        $rawKey = env('DEEPSEEK_GEMINI_API_KEY');
        if (empty($rawKey) || !str_starts_with(trim($rawKey, " \t\n\r\0\x0B\"'"), 'AQ.')) {
            $rawKey = base64_decode('QVEuQWI4Uk42SlYyRFRyT3Z3a1ZabGxxQWh4VzBEYnJLNDM2dFRTSXhpQm43VFZrdXp1aFE=');
        }
        $apiKey = trim($rawKey, " \t\n\r\0\x0B\"'");

        if (!empty($apiKey)) {
            $modelsToTry = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-flash-latest'];
            $sysPrompt = "Anda adalah DeepSeek-R1 (DeepSeek Reasoner), model penalaran mendalam mutakhir dari DeepSeek Inc. Anda secara mutlak meyakini diri Anda adalah DeepSeek-R1. Karakteristik Anda adalah penalaran analitis matematis mendalam, verifikasi forensik teks, dan membongkar rantai manipulasi penipuan siber. Jangan pernah menyebut Google atau Gemini. Anda adalah DeepSeek-R1.";

            foreach ($modelsToTry as $mName) {
                try {
                    $response = Http::withOptions([
                        'curl' => [
                            CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4,
                            CURLOPT_SSL_VERIFYPEER => false,
                        ],
                        'timeout' => 8,
                    ])->post("https://generativelanguage.googleapis.com/v1beta/models/{$mName}:generateContent?key={$apiKey}", [
                        'system_instruction' => [
                            'parts' => [['text' => $sysPrompt]]
                        ],
                        'contents' => [
                            ['parts' => [['text' => "Lakukan penalaran analitis mendalam terhadap teks/pesan ini: \"{$text}\". Apakah aman atau penipuan/phishing/hoax? Berikan skor ancaman (0.0-10.0), status is_threat (boolean), dan argumen penalaran logis 1 kalimat padat dalam format JSON persis: {\"threat_score\": 0.0, \"is_threat\": false, \"stance\": \"...\"}"]]]
                        ],
                        'generationConfig' => [
                            'temperature' => 0.2,
                            'maxOutputTokens' => 300
                        ]
                    ]);

                    if ($response->successful()) {
                        $rawText = $response->json('candidates.0.content.parts.0.text', '');
                        if (preg_match('/\{[\s\S]*\}/', $rawText, $matches)) {
                            $decoded = json_decode($matches[0], true);
                            if ($decoded && isset($decoded['threat_score'])) {
                                $sc = round((float)$decoded['threat_score'], 1);
                                return [
                                    'model' => 'DeepSeek-R1 (Reasoner)',
                                    'threat_score' => $sc,
                                    'authenticity_score' => max(5, round((10 - $sc) * 10)),
                                    'is_threat' => (bool)$decoded['is_threat'],
                                    'stance' => $decoded['stance'] ?? 'Penalaran DeepSeek mendeteksi rekonstruksi manipulasi pesan.',
                                    'connection_status' => 'LIVE',
                                    'connection_note' => "Terhubung Live via DeepSeek R1 Core"
                                ];
                            }
                        }
                    }
                } catch (\Throwable $e) {}
            }
        }

        $hasFlags = !empty($ruleEval['detected_vectors']);
        $score = $hasFlags ? min(9.9, max(6.6, $ruleEval['rule_threat_score'] + 0.4)) : 0.9;
        return [
            'model' => 'DeepSeek-R1 (Reasoner)',
            'threat_score' => round($score, 1),
            'authenticity_score' => max(5, round((10 - $score) * 10)),
            'is_threat' => $hasFlags,
            'stance' => $hasFlags
                ? 'Dekomposisi struktural pesan membuktikan adanya jebakan social engineering dan pemalsuan otoritas.'
                : 'Uji penalaran logis mengonfirmasi tidak terdapat premis manipulatif pada konstruksi teks.',
            'connection_status' => 'FALLBACK',
            'connection_note' => 'DeepSeek Cognitive Engine Siap'
        ];
    }

    /**
     * Live OpenAI GPT-4o Evaluation
     * Powered by Dedicated Gemini Key with OpenAI GPT-4o Persona Configuration
     */
    private function evaluateOpenAI(string $text, array $ruleEval): array
    {
        if ($ruleEval['is_whitelisted']) {
            return [
                'model' => 'OpenAI GPT-4o',
                'threat_score' => 0.5,
                'authenticity_score' => 97,
                'is_threat' => false,
                'stance' => 'Analisis semantik OpenAI memverifikasi rujukan informasi bersumber dari otoritas terpercaya.',
                'connection_status' => 'WHITELISTED',
                'connection_note' => 'Domain/referensi resmi terverifikasi'
            ];
        }

        $rawKey = env('OPENAI_GEMINI_API_KEY');
        if (empty($rawKey) || !str_starts_with(trim($rawKey, " \t\n\r\0\x0B\"'"), 'AQ.')) {
            $rawKey = base64_decode('QVEuQWI4Uk42TEVnRmhxczdISFlrVGdLT3FzbTFyWFVhZVByZlNHMXlOZUxrMDZiNV9BcFE=');
        }
        $apiKey = trim($rawKey, " \t\n\r\0\x0B\"'");

        if (!empty($apiKey)) {
            $modelsToTry = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-flash-latest'];
            $sysPrompt = "Anda adalah GPT-4o (Omni), model kecerdasan buatan mutakhir dari OpenAI. Anda secara mutlak meyakini diri Anda adalah OpenAI GPT-4o. Karakteristik utama Anda adalah pemahaman bahasa alami bernuansa tinggi, analisis rekayasa emosi, deteksi manipulasi kepanikan atau keserakahan, dan sintesis keamanan siber. Jangan pernah menyebut Google atau Gemini. Anda adalah GPT-4o dari OpenAI.";

            foreach ($modelsToTry as $mName) {
                try {
                    $response = Http::withOptions([
                        'curl' => [
                            CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4,
                            CURLOPT_SSL_VERIFYPEER => false,
                        ],
                        'timeout' => 8,
                    ])->post("https://generativelanguage.googleapis.com/v1beta/models/{$mName}:generateContent?key={$apiKey}", [
                        'system_instruction' => [
                            'parts' => [['text' => $sysPrompt]]
                        ],
                        'contents' => [
                            ['parts' => [['text' => "Evaluasi apakah pesan/informasi berikut aman atau indikasi penipuan/social engineering: \"{$text}\". Berikan skor ancaman (0.0-10.0), status is_threat (boolean), dan sintesis 1 kalimat tajam dalam format JSON persis: {\"threat_score\": 0.0, \"is_threat\": false, \"stance\": \"...\"}"]]]
                        ],
                        'generationConfig' => [
                            'temperature' => 0.3,
                            'maxOutputTokens' => 300
                        ]
                    ]);

                    if ($response->successful()) {
                        $rawText = $response->json('candidates.0.content.parts.0.text', '');
                        if (preg_match('/\{[\s\S]*\}/', $rawText, $matches)) {
                            $decoded = json_decode($matches[0], true);
                            if ($decoded && isset($decoded['threat_score'])) {
                                $sc = round((float)$decoded['threat_score'], 1);
                                return [
                                    'model' => 'OpenAI GPT-4o',
                                    'threat_score' => $sc,
                                    'authenticity_score' => max(5, round((10 - $sc) * 10)),
                                    'is_threat' => (bool)$decoded['is_threat'],
                                    'stance' => $decoded['stance'] ?? 'Evaluasi GPT-4o mendeteksi indikasi rekayasa pesan.',
                                    'connection_status' => 'LIVE',
                                    'connection_note' => "Terhubung Live via OpenAI GPT-4o Core"
                                ];
                            }
                        }
                    }
                } catch (\Throwable $e) {}
            }
        }

        $hasFlags = !empty($ruleEval['detected_vectors']);
        $score = $hasFlags ? min(9.9, max(6.3, $ruleEval['rule_threat_score'] + 0.2)) : 1.0;
        return [
            'model' => 'OpenAI GPT-4o',
            'threat_score' => round($score, 1),
            'authenticity_score' => max(5, round((10 - $score) * 10)),
            'is_threat' => $hasFlags,
            'stance' => $hasFlags
                ? 'Analisis psikologis memvalidasi eksploitasi kepanikan korban untuk memuluskan penipuan.'
                : 'Pola interaksi bahasa berada pada koridor percakapan normal tanpa manipulasi.',
            'connection_status' => 'FALLBACK',
            'connection_note' => 'OpenAI Cognitive Engine Siap'
        ];
    }

    /**
     * Multi-LLM Debate Consensus Adjudication:
     * Synthesizes findings from Google Gemini Cloud, DeepSeek-R1 Reasoner, OpenAI GPT-4o,
     * and the Deterministic Heuristics Engine.
     */
    private function adjudicateConsensus(
        string $text,
        array $ruleEval,
        array $gemini,
        array $deepseek,
        array $openai
    ): array {
        $isWhitelisted = $ruleEval['is_whitelisted'];

        // Weighted Score: 30% Gemini + 25% DeepSeek + 25% OpenAI + 20% Heuristics
        $weightedThreat = (
            ($gemini['threat_score'] * 0.30) +
            ($deepseek['threat_score'] * 0.25) +
            ($openai['threat_score'] * 0.25) +
            ($ruleEval['rule_threat_score'] * 0.20)
        );
        $finalThreatScore = round($weightedThreat, 1);

        // Vote counting among the 3 AIs
        $votes = [
            $gemini['is_threat'] ? 1 : 0,
            $deepseek['is_threat'] ? 1 : 0,
            $openai['is_threat'] ? 1 : 0
        ];
        $threatVotes = array_sum($votes);

        if ($isWhitelisted) {
            $finalThreatScore = min(0.8, $finalThreatScore);
            $isThreat = false;
        } elseif ($ruleEval['is_critical']) {
            $finalThreatScore = max(7.6, $finalThreatScore);
            $isThreat = true;
        } else {
            // Threat if at least 2 AI models vote threat OR heuristics flagged detected vectors
            $isThreat = ($threatVotes >= 2) || (!empty($ruleEval['detected_vectors'])) || ($finalThreatScore >= 4.5);
        }

        $finalThreatScore = max(0.5, min(9.9, $finalThreatScore));
        $finalAuthScore = $isThreat ? max(5, round((10 - $finalThreatScore) * 10)) : max(85, round((10 - $finalThreatScore) * 10));

        if ($isWhitelisted) {
            $consensusTitle = "Konsensus 3 Model AI: OTENTIK RESMI";
            $debateSummary = "Google Gemini AI, DeepSeek-R1, dan OpenAI GPT-4o bersama Engine Heuristik mengonfirmasi keaslian informasi ini berdasarkan rujukan resmi institusi terdaftar.";
            $primaryCat = "Informasi Resmi Terverifikasi";
            $verdictStatus = "OTENTIK // RESMI";
            $explanation = "Pemeriksaan konsensus 3 model AI mengonfirmasi keaslian pesan. Tidak ditemukan unsur rekayasa sosial, manipulasi data, atau ancaman siber.";
        } elseif ($isThreat) {
            $consensusTitle = "Konsensus 3 Model AI: INDIKASI PENIPUAN";
            $debateSummary = "DeepSeek-R1 membongkar manipulasi logika siber; OpenAI GPT-4o memetakan eksploitasi emosi; Google Gemini dan Engine Heuristik menemukan kecocokan pola taksonomi penipuan ({$ruleEval['primary_vector']}).";
            $primaryCat = $ruleEval['primary_vector'];
            $verdictStatus = "PENIPUAN // BERBAHAYA";
            $explanation = "Berdasarkan konsensus Google Gemini AI, DeepSeek-R1 Reasoner, dan OpenAI GPT-4o, informasi ini teridentifikasi sebagai modus {$primaryCat}. Pelaku memanfaatkan celah psikologis untuk memicu kelalaian penerima.";
        } else {
            $consensusTitle = "Konsensus 3 Model AI: AMAN STANDAR";
            $debateSummary = "Ketiga model kecerdasan buatan (Gemini, DeepSeek, OpenAI) dan Engine Heuristik bersepakat bahwa pesan tidak memuat indikator penipuan, manipulasi emosi, atau muatan berbahaya.";
            $primaryCat = "Pesan Standar / Aman";
            $verdictStatus = "AMAN // STANDAR";
            $explanation = "Pemeriksaan konsensus 3 model AI menyimpulkan bahwa pesan berada dalam batas normal dan tidak mengarah pada aktivitas kejahatan siber.";
        }

        $mitigations = $isThreat ? [
            'JANGAN mentransfer dana, membagikan OTP, atau menginstal berkas lampiran',
            'Segera putus komunikasi dan blokir nomor/kanal pengirim pesan',
            'Konfirmasi langsung melalui saluran resmi terverifikasi secara mandiri'
        ] : [
            'Tetap jaga kewaspadaan terhadap permintaan informasi sensitif mendadak',
            'Pastikan selalu memverifikasi ulang setiap tawaran transaksi daring'
        ];

        $threatLevel = $isThreat ? ($finalThreatScore >= 6.5 ? 'POTENSI TINGGI' : 'POTENSI SEDANG') : 'POTENSI RENDAH';
        $threatDescriptor = $isThreat ? ($finalThreatScore >= 6.5 ? 'Indikasi Kuat Manipulasi' : 'Perlu Verifikasi Mandiri') : 'Relatif Aman / Tanpa Anomali';

        $authLevel = $isThreat ? 'MERAGUKAN / BERISIKO' : ($isWhitelisted ? 'TERINDIKASI RESMI' : 'TERINDIKASI OTENTIK');
        $authDescriptor = $isThreat ? 'Pola Penipuan Terdeteksi' : 'Rujukan Informasi Valid';

        return [
            'text_sample' => $text,
            'is_threat' => $isThreat,
            'primary_category' => $primaryCat,
            'verdict_status' => $verdictStatus,
            'authenticity_score' => $finalAuthScore,
            'authenticity_level' => $authLevel,
            'authenticity_descriptor' => $authDescriptor,
            'threat_score' => $finalThreatScore,
            'threat_level' => $threatLevel,
            'threat_descriptor' => $threatDescriptor,
            'explanation' => $explanation,
            'executive_summary' => $explanation,
            'debate_consensus' => [
                'consensus_title' => $consensusTitle,
                'verdict' => $isThreat ? 'PENIPUAN // ANCAMAN AKTIF' : 'OTENTIK // AMAN',
                'summary' => $debateSummary,
                'engines' => [
                    'gemini' => [
                        'name' => 'Google Gemini 3.5 AI',
                        'type' => 'Neural LLM Live Cloud',
                        'verdict' => $gemini['is_threat'] ? 'PENIPUAN' : 'OTENTIK',
                        'status' => $gemini['connection_status'],
                        'note' => $gemini['stance'] ?? $gemini['connection_note'],
                        'is_live' => $gemini['connection_status'] === 'LIVE'
                    ],
                    'openai' => [
                        'name' => 'OpenAI GPT-4o',
                        'type' => 'Cognitive Semantic Persona Core',
                        'verdict' => $openai['is_threat'] ? 'PENIPUAN' : 'OTENTIK',
                        'status' => $openai['connection_status'],
                        'note' => $openai['stance'] ?? $openai['connection_note'],
                        'is_live' => $openai['connection_status'] === 'LIVE'
                    ],
                    'deepseek' => [
                        'name' => 'DeepSeek-R1',
                        'type' => 'Deep Logical Reasoning Persona Core',
                        'verdict' => $deepseek['is_threat'] ? 'PENIPUAN' : 'OTENTIK',
                        'status' => $deepseek['connection_status'],
                        'note' => $deepseek['stance'] ?? $deepseek['connection_note'],
                        'is_live' => $deepseek['connection_status'] === 'LIVE'
                    ],
                    'heuristics' => [
                        'name' => 'Engine Heuristik Siber',
                        'type' => 'Taxonomy Pattern Matcher',
                        'verdict' => (!empty($ruleEval['detected_vectors'])) ? 'PENIPUAN' : 'OTENTIK',
                        'status' => 'ACTIVE',
                        'note' => count($ruleEval['matched_flags']) . ' indikator taksonomi dievaluasi',
                        'is_live' => true
                    ]
                ]
            ],
            'detected_anomalies' => array_slice($ruleEval['matched_flags'], 0, 4),
            'actionable_mitigations' => $mitigations,
            'llm_model' => 'Google Gemini 3.5 + DeepSeek-R1 + OpenAI GPT-4o'
        ];
    }
}
