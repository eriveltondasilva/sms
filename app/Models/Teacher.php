<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\{BelongsToMany, MorphOne};
use Illuminate\Database\Eloquent\SoftDeletes;
//
use App\Traits\Scopes\FilterBySearchTrait;
use App\Enums\PaginationEnum;

class Teacher extends Model
{
    use HasFactory;
    use SoftDeletes;
    use FilterBySearchTrait;

    protected $fillable = [
        'name',
        'email',
        'rg',
        'cpf',
        'gender',
        'phone',
        'birthday',
        // Address
        'address_street',
        'address_city',
        'address_state',
        'address_zip_code',
    ];

    protected $casts = [
        'birthday' => 'datetime:Y-m-d',
    ];

    protected $perPage = PaginationEnum::DEFAULT->value;

    //# RELATIONSHIPS
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
