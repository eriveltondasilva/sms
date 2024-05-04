<?php

namespace App\Models;

use App\Models\Scopes\IsActiveScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsToMany, MorphOne};

// ====================================

class Student extends Model
{
    use HasFactory;

    protected $table = 'students';

    protected $fillable = [
        'name',
        'email',
        'cpf',
        'rg',
        'phone',
        'gender',
        'birthday',
        'birthplace',
        'gov_benefits',
        'health_problems',
        'note',
        //
        'address_street',
        'address_city',
        'address_state',
        'address_zip_code',
    ];

    protected $casts = [
        'birthday' => 'datetime:Y-m-d',
        'is_active' => 'boolean',
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

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class);
    }

    public function grades(): BelongsToMany
    {
        return $this->belongsToMany(Grade::class);
    }
}
