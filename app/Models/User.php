<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_code',
        'name',
        'username',
        'email',
        'password',
        'role',
        'score',
        'game_scores',
        'vulnerability',
        'rank',
        'modules_completed',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'score' => 'integer',
        'game_scores' => 'array',
        'vulnerability' => 'float',
        'modules_completed' => 'integer',
    ];

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Accessor for game_scores: guarantee complete map of 4 core game scores
     */
    public function getGameScoresAttribute($value)
    {
        $decoded = is_string($value) ? json_decode($value, true) : $value;
        if (!is_array($decoded) || empty($decoded)) {
            $total = (int) ($this->attributes['score'] ?? 500);
            return [
                'kasus' => (int) round($total * 0.35),
                'diff' => (int) round($total * 0.25),
                'criminal' => (int) round($total * 0.25),
                'deeplearn' => (int) round($total * 0.15),
            ];
        }

        return [
            'kasus' => (int) ($decoded['kasus'] ?? 0),
            'diff' => (int) ($decoded['diff'] ?? 0),
            'criminal' => (int) ($decoded['criminal'] ?? 0),
            'deeplearn' => (int) ($decoded['deeplearn'] ?? 0),
        ];
    }

    /**
     * Update score for a specific game and recalculate total score (4 core games only)
     */
    public function updateGameScore(string $game, int $scoreDelta, float $vulnDelta = 0.0): void
    {
        $scores = $this->game_scores;
        $gameKey = strtolower(trim($game));
        $validMap = [
            'kasus' => 'kasus',
            'case' => 'kasus',
            'diff' => 'diff',
            'finding_diff' => 'diff',
            'finding diff' => 'diff',
            'criminal' => 'criminal',
            'criminal_case' => 'criminal',
            'criminal case' => 'criminal',
            'deeplearn' => 'deeplearn',
            'deep learning' => 'deeplearn',
            'deep_learning' => 'deeplearn',
            'analyzer' => 'deeplearn',
            'ai analyzer' => 'deeplearn'
        ];

        $targetKey = $validMap[$gameKey] ?? null;
        if ($targetKey && isset($scores[$targetKey])) {
            $scores[$targetKey] = max(0, $scores[$targetKey] + $scoreDelta);
        }

        // Keep strictly only the 4 core games
        $cleanScores = [
            'kasus' => (int) ($scores['kasus'] ?? 0),
            'diff' => (int) ($scores['diff'] ?? 0),
            'criminal' => (int) ($scores['criminal'] ?? 0),
            'deeplearn' => (int) ($scores['deeplearn'] ?? 0),
        ];
        $this->game_scores = $cleanScores;

        // Total score is strictly the exact sum of the 4 core game scores
        $this->score = array_sum($cleanScores);

        if ($vulnDelta != 0.0) {
            $this->vulnerability = max(1.0, min(10.0, round($this->vulnerability + $vulnDelta, 1)));
        }

        $this->modules_completed = ($this->modules_completed ?? 0) + 1;
        $this->updateRank();
    }

    /**
     * Recalculate military/cyber defense rank based on score and vulnerability
     */
    public function updateRank(): void
    {
        if ($this->vulnerability <= 2.0 && $this->score >= 1000) {
            $this->rank = 'Grand Cyber Sentinel';
        } elseif ($this->vulnerability <= 3.5 && $this->score >= 800) {
            $this->rank = 'Elite Vanguard';
        } elseif ($this->vulnerability <= 5.5) {
            $this->rank = 'Threat Analyst';
        } else {
            $this->rank = 'Security Cadet';
        }
        $this->save();
    }
}
