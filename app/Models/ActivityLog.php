<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'log_code',
        'user_id',
        'user_name',
        'module',
        'decision',
        'vulnerability_score',
        'status',
    ];

    protected $casts = [
        'vulnerability_score' => 'float',
    ];
}

