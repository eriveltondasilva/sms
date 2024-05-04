<?php

namespace App\Models;

use App\Models\Scopes\IsActiveScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsToMany, MorphOne};

// ====================================

class Teacher extends Model
{
    use HasFactory;

    protected $table = 'teachers';

    protected $fillable = [
        'name',
        'gender',
        'cpf',
        'rg',
        'birthday',
        'email',
        'phone',
        'is_active',
        // Address
        'address_street',
        'address_city',
        'address_state',
        'address_zip_code',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'birthday' => 'datetime:Y-m-d',
    ];

    // ------------------------------
    // ### Scope ###
    // ------------------------------

    protected static function booted(): void
    {
        static::addGlobalScope(new IsActiveScope());
    }

    // ------------------------------
    // ### Relationships ###
    // ------------------------------

    public function user(): MorphOne
    {
        return $this->morphOne(User::class, 'profile');
    }

    public function subjects(): BelongsToMany
    {
        return $this->belongsToMany(Subject::class);
    }

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class);
    }
}
