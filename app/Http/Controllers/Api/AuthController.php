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
        $role = $request->input('role', null);

        if (empty($username)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Username siber wajib diisi.'
            ], 422);
        }

        // Standard test credential mappings
        $validCredentials = [
            'admin' => ['admin123', 'password123'],
            'cadet' => ['cadet123', 'password123'],
            'kira_t' => ['kira123', 'password123'],
        ];

        try {
            // Find user by username
            $user = User::where('username', $username)->first();

            if ($user) {
                $isPasswordValid = false;

                // 1. Check Laravel Hash
                if (!empty($user->password) && Hash::check($password, $user->password)) {
                    $isPasswordValid = true;
                }
                // 2. Check predefined demo passwords
                elseif (isset($validCredentials[$username]) && in_array($password, $validCredentials[$username])) {
                    $isPasswordValid = true;
                }
                // 3. Permissive demo fallback if password empty or generic
                elseif (empty($password) || $password === 'admin123' || $password === 'cadet123' || $password === 'password123') {
                    $isPasswordValid = true;
                }

                if (!$isPasswordValid) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Sandi tidak valid. Gunakan sandi "cadet123" untuk akun Cadet Aris atau "admin123" untuk Commander Vektor.'
                    ], 401);
                }
            } else {
                // Register new on-the-fly cadet if not exists
                $userRole = ($role === 'admin' || $username === 'admin') ? 'admin' : 'user';
                $user = User::create([
                    'user_code' => 'USR-' . rand(100, 999),
                    'name' => ucfirst($username),
                    'username' => $username,
                    'email' => $username . '@guardianspace.mock',
                    'password' => Hash::make($password ?: 'cadet123'),
                    'role' => $userRole,
                    'score' => 500,
                    'vulnerability' => 5.0,
                    'rank' => $userRole === 'admin' ? 'Security Architect' : 'Cyber Trainee',
                    'modules_completed' => 0,
                ]);
            }

            // Record Activity Log
            ActivityLog::create([
                'log_code' => 'LOG-' . rand(1000, 9999),
                'user_id' => $user->user_code ?: 'USR-' . $user->id,
                'user_name' => $user->name,
                'module' => 'SYSTEM AUTH',
                'decision' => "Login berhasil: {$user->name} ({$user->username}) peran " . strtoupper($user->role),
                'vulnerability_score' => $user->vulnerability,
                'status' => 'SECURED',
            ]);

            return response()->json([
                'status' => 'success',
                'message' => "Otentikasi berhasil! Selamat bertugas, {$user->name}.",
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

            if ($found) {
                $isPasswordValid = false;
                if (empty($password) || (isset($validCredentials[$username]) && in_array($password, $validCredentials[$username])) || ($password === ($found['password'] ?? ''))) {
                    $isPasswordValid = true;
                }

                if (!$isPasswordValid) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Sandi tidak valid. Gunakan sandi "cadet123" untuk akun Cadet Aris atau "admin123" untuk Commander Vektor.'
                    ], 401);
                }

                return response()->json([
                    'status' => 'success',
                    'message' => "Otentikasi berhasil! Selamat bertugas, {$found['name']}.",
                    'user' => $found
                ]);
            } else {
                $userRole = ($role === 'admin' || $username === 'admin') ? 'admin' : 'user';
                $newUser = [
                    'id' => 'USR-' . rand(100, 999),
                    'user_code' => 'USR-' . rand(100, 999),
                    'name' => ucfirst($username),
                    'username' => $username,
                    'role' => $userRole,
                    'score' => 500,
                    'vulnerability' => 5.0,
                    'rank' => $userRole === 'admin' ? 'Security Architect' : 'Cyber Trainee',
                    'modules_completed' => 0
                ];
                return response()->json([
                    'status' => 'success',
                    'message' => "Otentikasi berhasil! Selamat bertugas, {$newUser['name']}.",
                    'user' => $newUser
                ]);
            }
        }
    }

    public function updateScore(Request $request)
    {
        $userId = $request->input('user_id');
        $scoreDelta = (int) $request->input('score_delta', 0);
        $vulnDelta = (float) $request->input('vulnerability_delta', 0.0);
        $module = $request->input('module', 'Simulation');

        try {
            $user = User::where('user_code', $userId)->orWhere('username', $userId)->orWhere('id', $userId)->first();

            if (!$user) {
                $user = User::where('role', 'user')->first();
            }

            if ($user) {
                $user->score = max(0, $user->score + $scoreDelta);
                $user->vulnerability = max(1.0, min(10.0, round($user->vulnerability + $vulnDelta, 1)));
                $user->modules_completed += 1;
                $user->updateRank();

                return response()->json([
                    'status' => 'success',
                    'user' => $user
                ]);
            }
        } catch (\Throwable $e) {}

        return response()->json([
            'status' => 'success'
        ]);
    }
}
