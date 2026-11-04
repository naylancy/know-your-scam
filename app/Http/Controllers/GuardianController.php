<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GameCase;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\File;

class GuardianController extends Controller
{
    /**
     * Show the main Know Your Scam application.
     * With graceful fallback if database driver (SQLite/MySQL) is not loaded in PHP.
     */
    public function index()
    {
        $casesKasus = collect([]);
        $casesDiff = collect([]);
        $casesCriminal = collect([]);
        $casesDeeplearn = collect([]);
        $casesScanner = collect([]);
        $casesChecker = collect([]);
        $users = collect([]);
        $activityLogs = collect([]);

        $dbLoaded = false;

        // 1. Try Eloquent Database connection
        try {
            $casesKasus = GameCase::category('kasus')->active()->get()->pluck('scenario_data');
            $casesDiff = GameCase::category('diff')->active()->get()->pluck('scenario_data');
            $casesCriminal = GameCase::category('criminal')->active()->get()->pluck('scenario_data');
            $casesDeeplearn = GameCase::category('deeplearn')->active()->get()->pluck('scenario_data');
            $casesScanner = GameCase::category('scanner')->active()->get()->pluck('scenario_data');
            $casesChecker = GameCase::category('checker')->active()->get()->pluck('scenario_data');

            $users = User::orderBy('score', 'desc')->orderBy('vulnerability', 'asc')->get();
            $activityLogs = ActivityLog::latest()->take(60)->get();

            if ($users->isNotEmpty()) {
                $dbLoaded = true;
            }
        } catch (\Throwable $e) {
            $dbLoaded = false;
        }

        // 2. Graceful Fallback to data/database.json if DB driver is unavailable
        if (!$dbLoaded) {
            $jsonPath = base_path('data/database.json');
            if (!File::exists($jsonPath)) {
                $jsonPath = public_path('data/database.json');
            }

            if (File::exists($jsonPath)) {
                $jsonData = json_decode(File::get($jsonPath), true) ?: [];

                $casesKasus = collect($jsonData['cases_kasus'] ?? []);
                $casesDiff = collect($jsonData['cases_diff'] ?? []);
                $casesCriminal = collect($jsonData['cases_criminal'] ?? []);
                $casesDeeplearn = collect($jsonData['cases_deeplearn'] ?? []);
                $casesScanner = collect($jsonData['cases_scanner'] ?? []);
                $casesChecker = collect($jsonData['cases_checker'] ?? []);
                $users = collect($jsonData['users'] ?? []);

                $rawLogs = $jsonData['activity_logs'] ?? [];
                $activityLogs = collect(array_slice($rawLogs, 0, 60))->map(function($l) {
                    return (object) [
                        'log_code' => $l['id'] ?? 'LOG-' . rand(1000, 9999),
                        'created_at' => $l['timestamp'] ?? now()->toDateTimeString(),
                        'user_id' => $l['user_id'] ?? 'USR-002',
                        'user_name' => $l['user_name'] ?? 'Cadet Aris',
                        'module' => $l['module'] ?? 'SYSTEM',
                        'decision' => $l['decision'] ?? 'Inisialisasi',
                        'vulnerability_score' => $l['vulnerability_score'] ?? 4.5,
                        'status' => $l['status'] ?? 'SECURED',
                    ];
                });
            }
        }

        return view('guardianspace', [
            'casesKasus' => $casesKasus,
            'casesDiff' => $casesDiff,
            'casesCriminal' => $casesCriminal,
            'casesDeeplearn' => $casesDeeplearn,
            'casesScanner' => $casesScanner,
            'casesChecker' => $casesChecker,
            'users' => $users,
            'activityLogs' => $activityLogs,
        ]);
    }
}
