<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory;
    use Notifiable;
    use HasRoles;

    protected $fillable = [
        'email',
        'username',
        'password',
        'is_active',
        'avatar_url',
        'provider_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_active'         => 'boolean',
        'password'          => 'hashed',
        'email_verified_at' => 'datetime',
    ];


    public function updatedWithinDay(): bool
    {
        return $this->updated_at->isAfter(now()->subDay());
    }

    //# ATTRIBUTES
    public function role(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->getRoleNames()->first(),
        );
    }

    //# SCOPES
    public function scopeIsActive(Builder $query)
    {
        return $query->where('is_active', true);
    }

    public function scopeIsNotActive(Builder $query)
    {
        return $query->where('is_active', false);
    }

    // # RELATIONS
    public function profile(): MorphTo
    {
        return $this->morphTo();
    }

}
