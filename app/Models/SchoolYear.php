<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SchoolYear extends Model
{
    use HasFactory;

    protected $fillable = [
        'year',
        'start_date',
        'end_date',
        'is_active',
    ];

    protected $casts = [
        'is_active'  => 'boolean',
        'start_date' => 'datetime:Y-m-d',
        'end_date'   => 'datetime:Y-m-d',
    ];

    //# SCOPES
    public function scopeIsActive($query)
    {
        return $query->where('is_active', true)->firstOrFail();
    }

    //# RELATIONSHIPS
    public function quarters(): HasMany
    {
        return $this->hasMany(Quarter::class);
    }

    public function groups(): HasMany
    {
        return $this->hasMany(Group::class);
    }

}
