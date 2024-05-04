<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

// ====================================

class AcademicYear extends Model
{
    use HasFactory;

    protected $table = 'academic_years';

    protected $fillable = [
        'year',
        'start_date',
        'end_date',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'start_date' => 'datetime:Y-m-d',
        'end_date' => 'datetime:Y-m-d',
    ];

    // ------------------------------
    // ### Scopes ###
    // ------------------------------

    public function scopeIsActive($query)
    {
        return $query->where('is_active', true)->first();
    }

    // ------------------------------
    // ### Relationships ###
    // ------------------------------

    public function quarters(): HasMany
    {
        return $this->hasMany(Quarter::class);
    }

    public function groups(): HasMany
    {
        return $this->hasMany(Group::class);
    }

}
