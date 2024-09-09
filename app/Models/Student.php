<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\{Builder, Model};
use Illuminate\Database\Eloquent\Relations\{ BelongsToMany, MorphOne };
use Illuminate\Database\Eloquent\SoftDeletes;
//
use App\Traits\Scopes\FilterBySearchTrait;
use App\Enums\PaginationEnum;

class Student extends Model
{
    use HasFactory;
    use SoftDeletes;
    use FilterBySearchTrait;

    protected $fillable = [
        'name',
        'email',
        'cpf',
        'rg',
        'phone',
        'gender',
        'birthday',
        //
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
    ];

    protected $perPage = PaginationEnum::DEFAULT->value;

    //# SCOPES
    public function scopeFilterByGender(Builder $query, ?string $gender): void
    {
        $query->when($gender, fn ($query) => $query->where('gender', $gender));
    }

    //# RELATIONSHIPS
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
