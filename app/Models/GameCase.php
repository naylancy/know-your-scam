<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameCase extends Model
{
    use HasFactory;

    protected $fillable = [
        'case_code',
        'category',
        'type',
        'title',
        'subtitle',
        'difficulty',
        'scenario_data',
        'is_active',
    ];

    protected $casts = [
        'scenario_data' => 'array',
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeCategory($query, $cat)
    {
        return $query->where('category', $cat);
    }
}

