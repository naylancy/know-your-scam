<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GameCaseController;
use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ScannerController;
use App\Http\Controllers\Api\DeepLearnController;
use App\Http\Controllers\Api\CheckerController;
use App\Models\User;
use App\Models\GameCase;
use App\Models\ActivityLog;

// 1. Health Ping
Route::get('/ping', function() {
    return response()->json([
        'status' => 'online',
        'framework' => 'Laravel ' . app()->version(),
        'database' => config('database.default'),
        'timestamp' => now()->toDateTimeString()
    ]);
});

// 2. All Data (Cases, Users, Logs) - Backward Compatible with Frontend
Route::get('/get_all', function() {
    $sysInfo = [
        'project' => 'KNOW YOUR SCAM: ANTI-GRAVITY DEFENSE',
        'event' => 'KNOW YOUR SCAM CYBER DEFENSE INITIATIVE',
        'framework' => 'Laravel ' . app()->version(),
        'database' => config('database.default'),
    ];

    try {
        return response()->json([
            'status' => 'success',
            'data' => [
                'system_info' => $sysInfo,
                'users' => User::orderBy('score', 'desc')->orderBy('vulnerability', 'asc')->get(),
                'cases_kasus' => GameCase::category('kasus')->active()->get()->pluck('scenario_data'),
                'cases_diff' => GameCase::category('diff')->active()->get()->pluck('scenario_data'),
                'cases_criminal' => GameCase::category('criminal')->active()->get()->pluck('scenario_data'),
                'cases_deeplearn' => GameCase::category('deeplearn')->active()->get()->pluck('scenario_data'),
                'cases_scanner' => GameCase::category('scanner')->active()->get()->pluck('scenario_data'),
                'cases_checker' => GameCase::category('checker')->active()->get()->pluck('scenario_data'),
                'activity_logs' => ActivityLog::latest()->take(60)->get()->map(function($l) {
                    $ts = now()->toDateTimeString();
                    if (!empty($l->created_at)) {
                        $ts = ($l->created_at instanceof \DateTimeInterface) ? $l->created_at->format('Y-m-d H:i:s') : (string) $l->created_at;
                    }
                    return [
                        'id' => $l->log_code ?: 'LOG-' . $l->id,
                        'timestamp' => $ts,
                        'user_id' => $l->user_id,
                        'user_name' => $l->user_name,
                        'module' => $l->module,
                        'decision' => $l->decision,
                        'vulnerability_score' => $l->vulnerability_score,
                        'status' => $l->status,
                    ];
                })
            ]
        ]);
    } catch (\Throwable $e) {
        $jsonPath = base_path('data/database.json');
        if (!\Illuminate\Support\Facades\File::exists($jsonPath)) {
            $jsonPath = public_path('data/database.json');
        }
        $data = \Illuminate\Support\Facades\File::exists($jsonPath) ? json_decode(\Illuminate\Support\Facades\File::get($jsonPath), true) : [];
        return response()->json([
            'status' => 'success',
            'data' => $data
        ]);
    }
});

// 3. Game Cases API
Route::get('/cases', [GameCaseController::class, 'index']);
Route::get('/cases/{category}', [GameCaseController::class, 'byCategory']);
Route::post('/cases', [GameCaseController::class, 'store']);
Route::post('/save_case', [GameCaseController::class, 'store']);
Route::delete('/cases/{id}', [GameCaseController::class, 'destroy']);
Route::post('/delete_case', function(\Illuminate\Http\Request $req) {
    $id = $req->input('id');
    $category = $req->input('category');
    try {
        GameCase::where('case_code', $id)->delete();
    } catch (\Throwable $e) {}

    $jsonPath = base_path('data/database.json');
    if (\Illuminate\Support\Facades\File::exists($jsonPath)) {
        $db = json_decode(\Illuminate\Support\Facades\File::get($jsonPath), true) ?: [];
        $key = 'cases_' . $category;
        if (isset($db[$key])) {
            $db[$key] = array_values(array_filter($db[$key], function($c) use ($id) {
                return ($c['id'] ?? '') != $id;
            }));
            \Illuminate\Support\Facades\File::put($jsonPath, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        }
    }
    return response()->json(['status' => 'success', 'message' => 'Deleted']);
});

// 4. Activity Logs API
Route::get('/logs', [ActivityLogController::class, 'index']);
Route::get('/activity-logs', [ActivityLogController::class, 'index']);
Route::post('/logs', [ActivityLogController::class, 'store']);
Route::post('/activity-logs', [ActivityLogController::class, 'store']);
Route::post('/log_activity', [ActivityLogController::class, 'store']);
Route::post('/clear_logs', [ActivityLogController::class, 'clear']);
Route::post('/delete_log', function(\Illuminate\Http\Request $req) {
    $logId = $req->input('id');
    try {
        \App\Models\ActivityLog::where('log_code', $logId)->orWhere('id', $logId)->delete();
    } catch (\Throwable $e) {}

    $jsonPath = base_path('data/database.json');
    if (\Illuminate\Support\Facades\File::exists($jsonPath)) {
        $db = json_decode(\Illuminate\Support\Facades\File::get($jsonPath), true) ?: [];
        if (isset($db['activity_logs'])) {
            $db['activity_logs'] = array_values(array_filter($db['activity_logs'], function($l) use ($logId) {
                return ($l['id'] ?? '') != $logId;
            }));
            \Illuminate\Support\Facades\File::put($jsonPath, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        }
    }
    return response()->json(['status' => 'success', 'message' => 'Log deleted']);
});

// 5. Auth API
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/update_score', [AuthController::class, 'updateScore']);

// 6. Scanner API
Route::post('/scanner/scan', [ScannerController::class, 'scan']);

// 7. Deep Learning LLM Evaluation API
Route::post('/deeplearn/evaluate', [DeepLearnController::class, 'evaluate']);

// 8. Multi-Threat & Authenticity Checker API
Route::post('/checker/check', [CheckerController::class, 'check']);
Route::post('/checker/transcribe-media', [CheckerController::class, 'transcribeMedia']);

// 7. Leaderboard API (Excluding Admin Users)
Route::get('/leaderboard', function() {
    try {
        $users = User::where('role', '!=', 'admin')->orderBy('score', 'desc')->orderBy('vulnerability', 'asc')->get();
        return response()->json(['status' => 'success', 'data' => $users]);
    } catch (\Throwable $e) {
        $jsonPath = base_path('data/database.json');
        if (!\Illuminate\Support\Facades\File::exists($jsonPath)) {
            $jsonPath = public_path('data/database.json');
        }
        $data = \Illuminate\Support\Facades\File::exists($jsonPath) ? json_decode(\Illuminate\Support\Facades\File::get($jsonPath), true) : [];
        $regularUsers = array_values(array_filter($data['users'] ?? [], function($u) {
            return ($u['role'] ?? '') !== 'admin';
        }));
        return response()->json(['status' => 'success', 'data' => $regularUsers]);
    }
});

// 8. Admin Users Management API
Route::get('/users', function() {
    try {
        $users = User::orderBy('score', 'desc')->get();
        return response()->json(['status' => 'success', 'data' => $users]);
    } catch (\Throwable $e) {
        $jsonPath = base_path('data/database.json');
        if (!\Illuminate\Support\Facades\File::exists($jsonPath)) {
            $jsonPath = public_path('data/database.json');
        }
        $data = \Illuminate\Support\Facades\File::exists($jsonPath) ? json_decode(\Illuminate\Support\Facades\File::get($jsonPath), true) : [];
        return response()->json(['status' => 'success', 'data' => $data['users'] ?? []]);
    }
});

Route::post('/users/update_role', function(\Illuminate\Http\Request $req) {
    $userId = $req->input('id');
    $newRole = $req->input('role', 'user');

    try {
        $user = User::where('id', $userId)->orWhere('user_code', $userId)->orWhere('username', $userId)->first();
        if ($user) {
            $user->role = $newRole;
            $user->save();
        }
    } catch (\Throwable $e) {}

    // Update in database.json
    $jsonPath = base_path('data/database.json');
    if (\Illuminate\Support\Facades\File::exists($jsonPath)) {
        $db = json_decode(\Illuminate\Support\Facades\File::get($jsonPath), true) ?: [];
        foreach ($db['users'] as &$u) {
            if (($u['id'] ?? '') == $userId || ($u['user_code'] ?? '') == $userId || ($u['username'] ?? '') == $userId) {
                $u['role'] = $newRole;
                break;
            }
        }
        \Illuminate\Support\Facades\File::put($jsonPath, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $pubPath = public_path('data/database.json');
        if (\Illuminate\Support\Facades\File::exists($pubPath)) {
            \Illuminate\Support\Facades\File::put($pubPath, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        }
    }

    return response()->json(['status' => 'success', 'message' => "Peran pengguna berhasil diperbarui menjadi {$newRole}"]);
});

Route::post('/users/save', function(\Illuminate\Http\Request $req) {
    $userId = $req->input('id');
    $name = $req->input('name');
    $email = $req->input('email');
    $role = $req->input('role', 'user');
    $rank = $req->input('rank');
    $score = intval($req->input('score', 0));

    try {
        $user = User::where('id', $userId)->orWhere('user_code', $userId)->orWhere('username', $userId)->first();
        if ($user) {
            if ($name) $user->name = $name;
            if ($email) $user->email = $email;
            if ($role) $user->role = $role;
            if ($rank) $user->rank = $rank;
            $user->score = $score;
            $user->save();
        }
    } catch (\Throwable $e) {}

    $jsonPath = base_path('data/database.json');
    if (\Illuminate\Support\Facades\File::exists($jsonPath)) {
        $db = json_decode(\Illuminate\Support\Facades\File::get($jsonPath), true) ?: [];
        foreach ($db['users'] as &$u) {
            if (($u['id'] ?? '') == $userId || ($u['user_code'] ?? '') == $userId || ($u['username'] ?? '') == $userId) {
                if ($name) $u['name'] = $name;
                if ($email) $u['email'] = $email;
                if ($role) $u['role'] = $role;
                if ($rank) $u['rank'] = $rank;
                $u['score'] = $score;
                break;
            }
        }
        \Illuminate\Support\Facades\File::put($jsonPath, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $pubPath = public_path('data/database.json');
        if (\Illuminate\Support\Facades\File::exists($pubPath)) {
            \Illuminate\Support\Facades\File::put($pubPath, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        }
    }

    return response()->json(['status' => 'success', 'message' => 'Data pengguna berhasil disimpan']);
});

Route::post('/users/delete', function(\Illuminate\Http\Request $req) {
    $userId = $req->input('id');
    if ($userId === 'USR-001' || strtolower($userId) === 'admin') {
        return response()->json(['status' => 'error', 'message' => 'Akun Administrator utama tidak boleh dihapus'], 400);
    }

    try {
        User::where('id', $userId)->orWhere('user_code', $userId)->orWhere('username', $userId)->delete();
    } catch (\Throwable $e) {}

    $jsonPath = base_path('data/database.json');
    if (\Illuminate\Support\Facades\File::exists($jsonPath)) {
        $db = json_decode(\Illuminate\Support\Facades\File::get($jsonPath), true) ?: [];
        $db['users'] = array_values(array_filter($db['users'] ?? [], function($u) use ($userId) {
            return ($u['id'] ?? '') != $userId && ($u['user_code'] ?? '') != $userId && ($u['username'] ?? '') != $userId;
        }));
        \Illuminate\Support\Facades\File::put($jsonPath, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $pubPath = public_path('data/database.json');
        if (\Illuminate\Support\Facades\File::exists($pubPath)) {
            \Illuminate\Support\Facades\File::put($pubPath, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        }
    }

    return response()->json(['status' => 'success', 'message' => 'Akun pengguna berhasil dihapus']);
});

// 9. Admin Edukasi CRUD API
Route::get('/edukasi', function() {
    $jsonPath = base_path('data/database.json');
    $db = \Illuminate\Support\Facades\File::exists($jsonPath) ? json_decode(\Illuminate\Support\Facades\File::get($jsonPath), true) : [];
    return response()->json(['status' => 'success', 'data' => $db['edukasi_topics'] ?? []]);
});

Route::post('/edukasi/save', function(\Illuminate\Http\Request $req) {
    $topic = $req->input('topic');
    if (!$topic || empty($topic['title'])) {
        return response()->json(['status' => 'error', 'message' => 'Judul materi wajib diisi'], 400);
    }

    $id = $topic['id'] ?? ('topic_' . time());
    $topic['id'] = $id;

    $jsonPath = base_path('data/database.json');
    $db = \Illuminate\Support\Facades\File::exists($jsonPath) ? json_decode(\Illuminate\Support\Facades\File::get($jsonPath), true) : [];
    if (!isset($db['edukasi_topics'])) {
        $db['edukasi_topics'] = [];
    }

    $foundIndex = -1;
    foreach ($db['edukasi_topics'] as $i => $t) {
        if (($t['id'] ?? '') === $id) {
            $foundIndex = $i;
            break;
        }
    }

    if ($foundIndex !== -1) {
        $db['edukasi_topics'][$foundIndex] = $topic;
    } else {
        $db['edukasi_topics'][] = $topic;
    }

    \Illuminate\Support\Facades\File::put($jsonPath, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    $pubPath = public_path('data/database.json');
    if (\Illuminate\Support\Facades\File::exists($pubPath)) {
        \Illuminate\Support\Facades\File::put($pubPath, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }

    return response()->json(['status' => 'success', 'message' => 'Materi edukasi berhasil disimpan', 'data' => $topic]);
});

Route::post('/edukasi/delete', function(\Illuminate\Http\Request $req) {
    $id = $req->input('id');
    $jsonPath = base_path('data/database.json');
    $db = \Illuminate\Support\Facades\File::exists($jsonPath) ? json_decode(\Illuminate\Support\Facades\File::get($jsonPath), true) : [];
    if (isset($db['edukasi_topics'])) {
        $db['edukasi_topics'] = array_values(array_filter($db['edukasi_topics'], fn($t) => ($t['id'] ?? '') !== $id));
        \Illuminate\Support\Facades\File::put($jsonPath, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        $pubPath = public_path('data/database.json');
        if (\Illuminate\Support\Facades\File::exists($pubPath)) {
            \Illuminate\Support\Facades\File::put($pubPath, json_encode($db, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        }
    }
    return response()->json(['status' => 'success', 'message' => 'Materi edukasi berhasil dihapus']);
});
