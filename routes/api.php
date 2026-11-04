<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GameCaseController;
use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ScannerController;
use App\Http\Controllers\Api\DeepLearnController;
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
    GameCase::where('case_code', $id)->delete();
    return response()->json(['status' => 'success', 'message' => 'Deleted']);
});

// 4. Activity Logs API
Route::get('/logs', [ActivityLogController::class, 'index']);
Route::get('/activity-logs', [ActivityLogController::class, 'index']);
Route::post('/logs', [ActivityLogController::class, 'store']);
Route::post('/activity-logs', [ActivityLogController::class, 'store']);
Route::post('/log_activity', [ActivityLogController::class, 'store']);
Route::post('/clear_logs', [ActivityLogController::class, 'clear']);

// 5. Auth API
Route::post('/auth/demo/{role}', [AuthController::class, 'loginDemo']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/update_score', [AuthController::class, 'updateScore']);

// 6. Scanner API
Route::post('/scanner/scan', [ScannerController::class, 'scan']);

// 7. Deep Learning LLM Evaluation API
Route::post('/deeplearn/evaluate', [DeepLearnController::class, 'evaluate']);

// 7. Leaderboard API
Route::get('/leaderboard', function() {
    try {
        $users = User::orderBy('score', 'desc')->orderBy('vulnerability', 'asc')->get();
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
