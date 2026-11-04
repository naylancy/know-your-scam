<?php
/**
 * GUARDIANSPACE: ANTI-GRAVITY DEFENSE
 * Backend API & Persistence Handler
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dbFile = __DIR__ . '/data/database.json';

function getDatabase($path) {
    if (!file_exists($path)) {
        http_response_code(500);
        echo json_encode(['error' => 'Database file not found']);
        exit;
    }
    $raw = file_get_contents($path);
    $data = json_decode($raw, true);
    if ($data === null) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to parse database JSON']);
        exit;
    }
    return $data;
}

function saveDatabase($path, $data) {
    $encoded = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    return file_put_contents($path, $encoded, LOCK_EX);
}

$action = isset($_GET['action']) ? trim($_GET['action']) : '';
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true) ?: [];

switch ($action) {
    case 'ping':
        echo json_encode([
            'status' => 'online',
            'system' => 'KNOW YOUR SCAM Defense Node',
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        break;

    case 'get_all':
        $db = getDatabase($dbFile);
        echo json_encode([
            'status' => 'success',
            'data' => $db
        ]);
        break;

    case 'login':
        $db = getDatabase($dbFile);
        $username = isset($input['username']) ? strtolower(trim($input['username'])) : '';
        $password = isset($input['password']) ? trim($input['password']) : '';
        $role = isset($input['role']) ? trim($input['role']) : 'user';

        if (empty($username)) {
            http_response_code(422);
            echo json_encode(['status' => 'error', 'message' => 'Username siber wajib diisi.']);
            break;
        }

        $validPasswords = [
            'admin' => ['admin123', 'password123'],
            'cadet' => ['cadet123', 'password123'],
            'kira_t' => ['kira123', 'password123']
        ];

        // Check if demo or existing user
        $foundUser = null;
        foreach ($db['users'] as $user) {
            if (strtolower($user['username']) === $username) {
                $foundUser = $user;
                break;
            }
        }

        if ($foundUser) {
            if (!empty($password) && isset($validPasswords[$username]) && !in_array($password, $validPasswords[$username])) {
                http_response_code(401);
                echo json_encode(['status' => 'error', 'message' => 'Sandi tidak valid. Gunakan "cadet123" untuk cadet atau "admin123" untuk admin.']);
                break;
            }
        } else {
            // Register auto for demo / quick play
            $foundUser = [
                'id' => 'USR-' . strtoupper(substr(md5(uniqid()), 0, 6)),
                'username' => $username,
                'name' => isset($input['name']) && $input['name'] ? trim($input['name']) : 'Cadet ' . ucfirst($username),
                'role' => ($role === 'admin' || $username === 'admin') ? 'admin' : 'user',
                'score' => 500,
                'vulnerability' => 5.0,
                'rank' => ($role === 'admin' || $username === 'admin') ? 'Security Architect' : 'Cyber Trainee',
                'modules_completed' => 0
            ];
            $db['users'][] = $foundUser;
            saveDatabase($dbFile, $db);
        }

        // Add login log
        $newLog = [
            'id' => 'LOG-' . rand(1000, 9999),
            'timestamp' => date('Y-m-d H:i:s'),
            'user_id' => $foundUser['id'],
            'user_name' => $foundUser['name'],
            'module' => 'SYSTEM AUTH',
            'decision' => 'Login protokol otentikasi (' . strtoupper($foundUser['role']) . ')',
            'vulnerability_score' => $foundUser['vulnerability'],
            'status' => 'SECURED'
        ];
        array_unshift($db['activity_logs'], $newLog);
        $db['activity_logs'] = array_slice($db['activity_logs'], 0, 60);
        saveDatabase($dbFile, $db);

        echo json_encode([
            'status' => 'success',
            'user' => $foundUser
        ]);
        break;

    case 'log_activity':
        $db = getDatabase($dbFile);
        $log = [
            'id' => 'LOG-' . rand(1000, 9999),
            'timestamp' => date('Y-m-d H:i:s'),
            'user_id' => isset($input['user_id']) ? $input['user_id'] : 'ANON',
            'user_name' => isset($input['user_name']) ? $input['user_name'] : 'Cadet Anonymous',
            'module' => isset($input['module']) ? $input['module'] : 'UNKNOWN PROTOCOL',
            'decision' => isset($input['decision']) ? $input['decision'] : 'Keputusan tidak dicatat',
            'vulnerability_score' => isset($input['vulnerability_score']) ? floatval($input['vulnerability_score']) : 5.0,
            'status' => isset($input['status']) ? $input['status'] : 'INFO'
        ];
        array_unshift($db['activity_logs'], $log);
        $db['activity_logs'] = array_slice($db['activity_logs'], 0, 80);
        saveDatabase($dbFile, $db);

        echo json_encode([
            'status' => 'success',
            'log' => $log
        ]);
        break;

    case 'update_score':
        $db = getDatabase($dbFile);
        $userId = isset($input['user_id']) ? $input['user_id'] : '';
        $scoreDelta = isset($input['score_delta']) ? intval($input['score_delta']) : 0;
        $vulnDelta = isset($input['vulnerability_delta']) ? floatval($input['vulnerability_delta']) : 0.0;
        $module = isset($input['module']) ? $input['module'] : 'Simulation';

        $updatedUser = null;
        foreach ($db['users'] as &$user) {
            if ($user['id'] === $userId) {
                $user['score'] = max(0, $user['score'] + $scoreDelta);
                $user['vulnerability'] = round(max(1.0, min(10.0, $user['vulnerability'] + $vulnDelta)), 1);
                $user['modules_completed'] = ($user['modules_completed'] ?? 0) + 1;

                if ($user['vulnerability'] <= 2.0 && $user['score'] >= 1000) {
                    $user['rank'] = 'Grand Cyber Sentinel';
                } elseif ($user['vulnerability'] <= 3.5 && $user['score'] >= 800) {
                    $user['rank'] = 'Elite Vanguard';
                } elseif ($user['vulnerability'] <= 5.0) {
                    $user['rank'] = 'Threat Analyst';
                } else {
                    $user['rank'] = 'Security Cadet';
                }
                $updatedUser = $user;
                break;
            }
        }
        unset($user);

        if ($updatedUser) {
            saveDatabase($dbFile, $db);
            echo json_encode([
                'status' => 'success',
                'user' => $updatedUser
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'User not found'
            ]);
        }
        break;

    case 'save_case':
        $db = getDatabase($dbFile);
        $category = isset($input['category']) ? $input['category'] : '';
        $caseData = isset($input['data']) ? $input['data'] : null;

        if (!$caseData || !$category) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid case data']);
            exit;
        }

        $targetKey = 'cases_' . $category;
        if (!isset($db[$targetKey])) {
            http_response_code(400);
            echo json_encode(['error' => 'Unknown case category: ' . $category]);
            exit;
        }

        $existingIndex = -1;
        foreach ($db[$targetKey] as $idx => $item) {
            if ($item['id'] === $caseData['id']) {
                $existingIndex = $idx;
                break;
            }
        }

        if ($existingIndex >= 0) {
            $db[$targetKey][$existingIndex] = $caseData;
        } else {
            $db[$targetKey][] = $caseData;
        }

        saveDatabase($dbFile, $db);
        echo json_encode([
            'status' => 'success',
            'message' => 'Case saved successfully',
            'id' => $caseData['id']
        ]);
        break;

    case 'delete_case':
        $db = getDatabase($dbFile);
        $category = isset($input['category']) ? $input['category'] : '';
        $caseId = isset($input['id']) ? $input['id'] : '';

        $targetKey = 'cases_' . $category;
        if (!isset($db[$targetKey])) {
            http_response_code(400);
            echo json_encode(['error' => 'Unknown case category']);
            exit;
        }

        $db[$targetKey] = array_values(array_filter($db[$targetKey], function($item) use ($caseId) {
            return $item['id'] !== $caseId;
        }));

        saveDatabase($dbFile, $db);
        echo json_encode([
            'status' => 'success',
            'message' => 'Case deleted successfully'
        ]);
        break;

    case 'clear_logs':
        $db = getDatabase($dbFile);
        $db['activity_logs'] = [];
        saveDatabase($dbFile, $db);
        echo json_encode([
            'status' => 'success',
            'message' => 'Logs cleared'
        ]);
        break;

    default:
        echo json_encode([
            'error' => 'Invalid action',
            'available_actions' => ['ping', 'get_all', 'login', 'log_activity', 'update_score', 'save_case', 'delete_case', 'clear_logs']
        ]);
        break;
}
