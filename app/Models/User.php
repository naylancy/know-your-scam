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
     * Accessor for game_scores: guarantee complete map of per-game scores
     */
    public function getGameScoresAttribute($value)
    {
        $decoded = is_string($value) ? json_decode($value, true) : $value;
        if (!is_array($decoded) || empty($decoded)) {
            $total = (int) ($this->attributes['score'] ?? 500);
            return [
                'kasus' => (int) round($total * 0.30),
                'diff' => (int) round($total * 0.25),
                'criminal' => (int) round($total * 0.25),
                'deeplearn' => (int) round($total * 0.14),
                'scanner' => (int) round($total * 0.03),
                'checker' => (int) round($total * 0.03),
            ];
        }

        return array_merge([
            'kasus' => 0,
            'diff' => 0,
            'criminal' => 0,
            'deeplearn' => 0,
            'scanner' => 0,
            'checker' => 0,
        ], $decoded);
    }

    /**
     * Update score for a specific game and recalculate total score
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
            'scanner' => 'scanner',
            'link scanner' => 'scanner',
            'checker' => 'checker',
            'multi-threat checker' => 'checker',
            'threat checker' => 'checker'
        ];

        $targetKey = $validMap[$gameKey] ?? 'kasus';
        $scores[$targetKey] = max(0, ($scores[$targetKey] ?? 0) + $scoreDelta);
        $this->game_scores = $scores;

        // Total score is the exact sum of all game scores
        $this->score = array_sum($scores);

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
