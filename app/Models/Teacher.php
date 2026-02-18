<?php

declare(strict_types=1);

namespace App\Models;

use App\Casts\OnlyNumbers;
use App\Enums\Gender;
use App\Models\Scopes\HasActiveScope;
use App\Models\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;

final class Teacher extends Model
{
    use BelongsToSchool;
    use HasActiveScope;
    use HasFactory;

    protected $table = 'teachers';

    protected $fillable = [
        'name',
        'gender',
        'birth_date',
        'phone',
        'email',
        'address',
        'cpf',
        'rg',
        'qualification',
        'hire_date',

        'bank_data',

        'is_active',
    ];

    protected $casts = [
        'gender' => Gender::class,
        'cpf'    => OnlyNumbers::class,
        'rg'     => OnlyNumbers::class,

        'birth_date' => 'date:Y-m-d',
        'hire_date'  => 'date:Y-m-d',

        'bank_data' => 'array',

        'is_active' => 'boolean',
    ];

    // * Relationships
    /** @return BelongsTo<School, $this> */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /** @return MorphOne<User, $this> */
    public function user(): MorphOne
    {
        return $this->morphOne(User::class, 'profile');
    }

    /** @return HasMany<Classroom, $this> */
    public function mainClasses(): HasMany
    {
        return $this->hasMany(Classroom::class, 'main_teacher_id');
    }

    /** @return HasMany<TeachingAssignment, $this> */
    public function teachingAssignments(): HasMany
    {
        return $this->hasMany(TeachingAssignment::class);
    }

    /** @return HasMany<ClassSchedule, $this> */
    public function classSchedules(): HasMany
    {
        return $this->hasMany(ClassSchedule::class);
    }

    protected function cpf(): Attribute
    {
        return Attribute::set(fn ($value): ?string => preg_replace('/\D/', '', (string) $value));
    }
}
