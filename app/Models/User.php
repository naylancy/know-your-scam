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
        'vulnerability' => 'float',
        'modules_completed' => 'integer',
    ];

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
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
