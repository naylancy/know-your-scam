<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\GameCase;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database with complete Know Your Scam Cyber Defense scenarios.
     */
    public function run(): void
    {
        $jsonPath = base_path('data/database.json');
        if (!File::exists($jsonPath)) {
            $jsonPath = public_path('data/database.json');
        }

        if (!File::exists($jsonPath)) {
            $this->command->warn("Database JSON file not found at {$jsonPath}");
            return;
        }

        $data = json_decode(File::get($jsonPath), true);
        if (!$data) return;

        // 1. Seed Users & Demo Accounts
        if (!empty($data['users'])) {
            foreach ($data['users'] as $u) {
                $rawPass = 'password123';
                if ($u['username'] === 'admin') $rawPass = 'admin123';
                elseif ($u['username'] === 'cadet') $rawPass = 'cadet123';
                elseif ($u['username'] === 'kira_t') $rawPass = 'kira123';

                User::updateOrCreate(
                    ['username' => $u['username']],
                    [
                        'user_code' => $u['id'],
                        'name' => $u['name'],
                        'email' => $u['username'] . '@guardianspace.mock',
                        'password' => Hash::make($rawPass),
                        'role' => ($u['username'] === 'cadet') ? 'user' : $u['role'],
                        'score' => $u['score'],
                        'game_scores' => $u['game_scores'] ?? null,
                        'vulnerability' => $u['vulnerability'],
                        'rank' => $u['rank'] ?? 'Security Cadet',
                        'modules_completed' => $u['modules_completed'] ?? 0,
                    ]
                );
            }
        }

        // 2. Seed Module 1: KASUS (Story Multi-POV)
        if (!empty($data['cases_kasus'])) {
            foreach ($data['cases_kasus'] as $c) {
                GameCase::updateOrCreate(
                    ['case_code' => $c['id']],
                    [
                        'category' => 'kasus',
                        'type' => $c['type'],
                        'title' => $c['title'],
                        'subtitle' => $c['subtitle'] ?? null,
                        'difficulty' => $c['difficulty'] ?? 'Sedang',
                        'scenario_data' => $c,
                        'is_active' => true,
                    ]
                );
            }
        }

        // 3. Seed Module 2: FINDING DIFF
        if (!empty($data['cases_diff'])) {
            foreach ($data['cases_diff'] as $c) {
                GameCase::updateOrCreate(
                    ['case_code' => $c['id']],
                    [
                        'category' => 'diff',
                        'type' => 'judge',
                        'title' => $c['title'],
                        'subtitle' => $c['category'] ?? null,
                        'difficulty' => 'Sedang',
                        'scenario_data' => $c,
                        'is_active' => true,
                    ]
                );
            }
        }

        // 4. Seed Module 3: CRIMINAL CASE
        if (!empty($data['cases_criminal'])) {
            foreach ($data['cases_criminal'] as $c) {
                GameCase::updateOrCreate(
                    ['case_code' => $c['id']],
                    [
                        'category' => 'criminal',
                        'type' => 'forensic',
                        'title' => $c['title'],
                        'subtitle' => $c['victim'] ?? null,
                        'difficulty' => 'Tinggi',
                        'scenario_data' => $c,
                        'is_active' => true,
                    ]
                );
            }
        }

        // 5. Seed Module 4: DEEP LEARNING
        if (!empty($data['cases_deeplearn'])) {
            foreach ($data['cases_deeplearn'] as $c) {
                GameCase::updateOrCreate(
                    ['case_code' => $c['id']],
                    [
                        'category' => 'deeplearn',
                        'type' => 'ai_eval',
                        'title' => $c['title'],
                        'subtitle' => 'Evaluasi Semantik AI',
                        'difficulty' => 'Tinggi',
                        'scenario_data' => $c,
                        'is_active' => true,
                    ]
                );
            }
        }

        // 6. Seed Module 5: SCANNER SAMPLES
        if (!empty($data['cases_scanner'])) {
            foreach ($data['cases_scanner'] as $idx => $c) {
                GameCase::updateOrCreate(
                    ['case_code' => 'SCAN-' . ($idx + 1)],
                    [
                        'category' => 'scanner',
                        'type' => $c['type'],
                        'title' => $c['title'],
                        'subtitle' => $c['threat_type'] ?? null,
                        'difficulty' => 'Info',
                        'scenario_data' => $c,
                        'is_active' => true,
                    ]
                );
            }
        }

        // 7. Seed Module 6: CHECKER SAMPLES
        if (!empty($data['cases_checker'])) {
            foreach ($data['cases_checker'] as $idx => $c) {
                GameCase::updateOrCreate(
                    ['case_code' => 'CHECK-' . ($idx + 1)],
                    [
                        'category' => 'checker',
                        'type' => $c['type'],
                        'title' => $c['title'],
                        'subtitle' => $c['type'] ?? null,
                        'difficulty' => 'Info',
                        'scenario_data' => $c,
                        'is_active' => true,
                    ]
                );
            }
        }

        // 8. Seed Initial Activity Logs
        if (!empty($data['activity_logs'])) {
            foreach ($data['activity_logs'] as $log) {
                ActivityLog::updateOrCreate(
                    ['log_code' => $log['id']],
                    [
                        'user_id' => $log['user_id'],
                        'user_name' => $log['user_name'],
                        'module' => $log['module'],
                        'decision' => $log['decision'],
                        'vulnerability_score' => $log['vulnerability_score'],
                        'status' => $log['status'],
                        'created_at' => $log['timestamp'] ?? now(),
                        'updated_at' => $log['timestamp'] ?? now(),
                    ]
                );
            }
        }
    }
}
