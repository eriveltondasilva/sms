<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
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
        'username',
        'is_active',
        'avatar_url',
        'provider_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'is_active'         => 'boolean',
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    //# SCOPES
    public function scopeIsActive(Build $query)
    {
        return $query->where('is_active', true);
    }

    public function scopeUpdatedWithinDay(Builder $query)
    {
        return $query->where('updated_at', '>=', now()->subDay())->exists();
    }


    //# RELATIONS
    public function profile(): MorphTo
    {
        return $this->morphTo();
    }

}
