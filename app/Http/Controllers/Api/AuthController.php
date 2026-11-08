<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    private function getJsonData()
    {
        $path = base_path('data/database.json');
        if (!File::exists($path)) {
            $path = public_path('data/database.json');
        }
        return File::exists($path) ? json_decode(File::get($path), true) : [];
    }

    public function loginDemo($role)
    {
        $username = $role === 'admin' ? 'admin' : 'cadet';

        try {
            $user = User::where('username', $username)->first();

            if (!$user) {
                $user = User::create([
                    'user_code' => $role === 'admin' ? 'USR-001' : 'USR-002',
                    'name' => $role === 'admin' ? 'Commander Vektor' : 'Cadet Aris',
                    'username' => $username,
                    'email' => $username . '@guardianspace.mock',
                    'password' => Hash::make($role === 'admin' ? 'admin123' : 'cadet123'),
                    'role' => $role === 'admin' ? 'admin' : 'user',
                    'score' => $role === 'admin' ? 1250 : 680,
                    'vulnerability' => $role === 'admin' ? 1.2 : 4.5,
                    'rank' => $role === 'admin' ? 'Grand Cyber Sentinel' : 'Security Cadet',
                    'modules_completed' => $role === 'admin' ? 15 : 5,
                ]);
            }

            // Record log
            ActivityLog::create([
                'log_code' => 'LOG-' . rand(1000, 9999),
                'user_id' => $user->user_code ?: 'USR-' . $user->id,
                'user_name' => $user->name,
                'module' => 'SYSTEM AUTH',
                'decision' => "Login demo sebagai " . strtoupper($user->role) . " ({$user->name})",
                'vulnerability_score' => $user->vulnerability,
                'status' => 'SECURED',
            ]);

            return response()->json([
                'status' => 'success',
                'user' => $user
            ]);
        } catch (\Throwable $e) {
            // Graceful fallback to JSON database if driver is missing
            $data = $this->getJsonData();
            $users = $data['users'] ?? [];
            $found = null;
            foreach ($users as $u) {
                if (strtolower($u['username']) === $username) {
                    $found = $u;
                    break;
                }
            }

            if (!$found) {
                $found = [
                    'id' => $role === 'admin' ? 'USR-001' : 'USR-002',
                    'user_code' => $role === 'admin' ? 'USR-001' : 'USR-002',
                    'name' => $role === 'admin' ? 'Commander Vektor' : 'Cadet Aris',
                    'username' => $username,
                    'role' => $role === 'admin' ? 'admin' : 'user',
                    'score' => $role === 'admin' ? 1250 : 680,
                    'vulnerability' => $role === 'admin' ? 1.2 : 4.5,
                    'rank' => $role === 'admin' ? 'Grand Cyber Sentinel' : 'Security Cadet',
                    'modules_completed' => $role === 'admin' ? 15 : 5,
                ];
            }

            return response()->json([
                'status' => 'success',
                'user' => $found
            ]);
        }
    }

    public function login(Request $request)
    {
        $username = strtolower(trim($request->input('username', '')));
        $password = trim($request->input('password', ''));

        if (empty($username)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Username siber wajib diisi.'
            ], 422);
        }

        if (empty($password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Sandi siber wajib diisi.'
            ], 422);
        }

        try {
            // Find user in database by username
            $user = User::where('username', $username)->first();

            if (!$user) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Username atau password salah! Otentikasi gagal.'
                ], 401);
            }

            // Verify password safely (support both plain & bcrypt hashes without throwing RuntimeException)
            $isPasswordValid = false;
            if (!empty($user->password)) {
                if ($password === $user->password) {
                    $isPasswordValid = true;
                } else {
                    try {
                        if (Hash::check($password, $user->password)) {
                            $isPasswordValid = true;
                        }
                    } catch (\Throwable $hashEx) {}
                }
            }

            if (!$isPasswordValid) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Username atau password salah! Otentikasi gagal.'
                ], 401);
            }

            // Record Activity Log
            try {
                ActivityLog::create([
                    'log_code' => 'LOG-' . rand(1000, 9999),
                    'user_id' => $user->user_code ?: 'USR-' . $user->id,
                    'user_name' => $user->name,
                    'module' => 'SYSTEM AUTH',
                    'decision' => "Login berhasil: {$user->name} ({$user->username}) peran " . strtoupper($user->role),
                    'vulnerability_score' => $user->vulnerability,
                    'status' => 'SECURED',
                ]);
            } catch (\Throwable $logErr) {}

            return response()->json([
                'status' => 'success',
                'message' => "Otentikasi berhasil! Selamat bertugas, {$user->name}.",
                'user' => $user
            ]);
        } catch (\Throwable $e) {
            // Graceful fallback to JSON database if database driver is disconnected
            $data = $this->getJsonData();
            $users = $data['users'] ?? [];
            $found = null;
            foreach ($users as $u) {
                if (strtolower($u['username']) === $username) {
                    $found = $u;
                    break;
                }
            }

            if (!$found) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Username atau password salah! Otentikasi gagal.'
                ], 401);
            }

            $userPass = $found['password'] ?? '';
            $isPasswordValid = false;
            if (!empty($userPass)) {
                if ($password === $userPass) {
                    $isPasswordValid = true;
                } else {
                    try {
                        if (Hash::check($password, $userPass)) {
                            $isPasswordValid = true;
                        }
                    } catch (\Throwable $hashEx) {}
                }
            }

            if (!$isPasswordValid) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Username atau password salah! Otentikasi gagal.'
                ], 401);
            }

            return response()->json([
                'status' => 'success',
                'message' => "Otentikasi berhasil! Selamat bertugas, {$found['name']}.",
                'user' => $found
            ]);
        }
    }

    /**
     * User Self-Registration
     */
    public function register(Request $request)
    {
        $name = trim($request->input('name', ''));
        $username = strtolower(trim($request->input('username', '')));
        $email = strtolower(trim($request->input('email', '')));
        $password = trim($request->input('password', ''));
        $role = 'user'; // Standard self-registration always assigns user role

        if (empty($name)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nama lengkap profil siber wajib diisi.'
            ], 422);
        }

        if (empty($username) || strlen($username) < 3 || !preg_match('/^[a-z0-9_]+$/i', $username)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Username harus terdiri dari minimal 3 karakter (huruf, angka, atau garis bawah).'
            ], 422);
        }

        if (empty($password) || strlen($password) < 6) {
            return response()->json([
                'status' => 'error',
                'message' => 'Sandi minimal harus terdiri dari 6 karakter.'
            ], 422);
        }

        if (empty($email)) {
            $email = $username . '@knowyourscam.test';
        }

        try {
            // Check uniqueness in database
            $exists = User::where('username', $username)->orWhere('email', $email)->exists();
            if ($exists) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Username atau email tersebut sudah terdaftar. Silakan gunakan yang lain.'
                ], 422);
            }

            $userCode = 'USR-' . rand(200, 999);
            $initialGameScores = [
                'kasus' => 0,
                'diff' => 0,
                'criminal' => 0,
                'deeplearn' => 0,
                'scanner' => 0,
                'checker' => 0
            ];

            $user = User::create([
                'user_code' => $userCode,
                'name' => $name,
                'username' => $username,
                'email' => $email,
                'password' => Hash::make($password),
                'role' => $role,
                'score' => 0,
                'vulnerability' => 5.0,
                'rank' => 'Cyber Trainee',
                'modules_completed' => 0,
                'game_scores' => $initialGameScores
            ]);

            // Sync to JSON files for offline/fallback redundancy
            $this->syncUserToJson([
                'id' => $userCode,
                'user_code' => $userCode,
                'name' => $name,
                'username' => $username,
                'email' => $email,
                'password' => Hash::make($password),
                'role' => $role,
                'score' => 0,
                'vulnerability' => 5.0,
                'rank' => 'Cyber Trainee',
                'modules_completed' => 0,
                'game_scores' => $initialGameScores
            ]);

            // Activity Log
            try {
                ActivityLog::create([
                    'log_code' => 'LOG-' . rand(1000, 9999),
                    'user_id' => $userCode,
                    'user_name' => $name,
                    'module' => 'USER REGISTRATION',
                    'decision' => "Pendaftaran kadet siber baru: {$name} (@{$username})",
                    'vulnerability_score' => 5.0,
                    'status' => 'SECURED',
                ]);
            } catch (\Throwable $logErr) {}

            return response()->json([
                'status' => 'success',
                'message' => 'Pendaftaran akun siber berhasil! Mengarahkan Anda ke menu login...',
                'username' => $username
            ]);
        } catch (\Throwable $e) {
            // Fallback for JSON DB if database table not ready
            $data = $this->getJsonData();
            $users = $data['users'] ?? [];

            foreach ($users as $u) {
                if (strtolower($u['username']) === $username) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Username siber sudah terdaftar. Silakan pilih username lain.'
                    ], 422);
                }
            }

            $userCode = 'USR-' . rand(200, 999);
            $initialGameScores = [
                'kasus' => 0,
                'diff' => 0,
                'criminal' => 0,
                'deeplearn' => 0,
                'scanner' => 0,
                'checker' => 0
            ];

            $newUser = [
                'id' => $userCode,
                'user_code' => $userCode,
                'name' => $name,
                'username' => $username,
                'email' => $email,
                'password' => Hash::make($password),
                'role' => $role,
                'score' => 0,
                'vulnerability' => 5.0,
                'rank' => 'Cyber Trainee',
                'modules_completed' => 0,
                'game_scores' => $initialGameScores
            ];

            $this->syncUserToJson($newUser);

            return response()->json([
                'status' => 'success',
                'message' => 'Pendaftaran akun siber berhasil! Mengarahkan Anda ke menu login...',
                'username' => $username
            ]);
        }
    }

    private function syncUserToJson(array $newUser): void
    {
        $paths = [base_path('data/database.json'), public_path('data/database.json')];
        foreach ($paths as $path) {
            if (File::exists($path)) {
                try {
                    $json = json_decode(File::get($path), true);
                    if ($json && isset($json['users'])) {
                        $json['users'][] = $newUser;
                        File::put($path, json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                    }
                } catch (\Throwable $err) {}
            }
        }
    }

    public function updateScore(Request $request)
    {
        $userId = $request->input('user_id');
        $scoreDelta = (int) $request->input('score_delta', 0);
        $vulnDelta = (float) $request->input('vulnerability_delta', 0.0);
        $game = $request->input('game') ?: $request->input('module', 'kasus');

        try {
            $user = User::where('user_code', $userId)->orWhere('username', $userId)->orWhere('id', $userId)->first();

            if (!$user) {
                $user = User::where('role', 'user')->first();
            }

            if ($user) {
                $user->updateGameScore($game, $scoreDelta, $vulnDelta);

                return response()->json([
                    'status' => 'success',
                    'user' => $user,
                    'total_score' => $user->score,
                    'game_scores' => $user->game_scores
                ]);
            }
        } catch (\Throwable $e) {}

        // JSON file storage fallback
        $paths = [base_path('data/database.json'), public_path('data/database.json')];
        foreach ($paths as $path) {
            if (File::exists($path)) {
                try {
                    $json = json_decode(File::get($path), true);
                    if ($json && isset($json['users'])) {
                        foreach ($json['users'] as &$u) {
                            if (($u['id'] ?? '') === $userId || ($u['username'] ?? '') === $userId || ($u['user_code'] ?? '') === $userId) {
                                $gs = $u['game_scores'] ?? [];
                                $gk = strtolower(trim($game));
                                if (str_contains($gk, 'kasus') || str_contains($gk, 'case')) $key = 'kasus';
                                elseif (str_contains($gk, 'diff')) $key = 'diff';
                                elseif (str_contains($gk, 'criminal')) $key = 'criminal';
                                elseif (str_contains($gk, 'deep') || str_contains($gk, 'analyz')) $key = 'deeplearn';
                                else $key = null;

                                if ($key) {
                                    $gs[$key] = max(0, ($gs[$key] ?? 0) + $scoreDelta);
                                }
                                $u['game_scores'] = [
                                    'kasus' => (int)($gs['kasus'] ?? 0),
                                    'diff' => (int)($gs['diff'] ?? 0),
                                    'criminal' => (int)($gs['criminal'] ?? 0),
                                    'deeplearn' => (int)($gs['deeplearn'] ?? 0)
                                ];
                                $u['score'] = $u['game_scores']['kasus'] + $u['game_scores']['diff'] + $u['game_scores']['criminal'] + $u['game_scores']['deeplearn'];
                                if ($vulnDelta != 0.0) {
                                    $u['vulnerability'] = max(1.0, min(10.0, round(($u['vulnerability'] ?? 5.0) + $vulnDelta, 1)));
                                }
                                $u['modules_completed'] = ($u['modules_completed'] ?? 0) + 1;
                                break;
                            }
                        }
                        File::put($path, json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                    }
                } catch (\Throwable $err) {}
            }
        }

        return response()->json([
            'status' => 'success'
        ]);
    }
}
