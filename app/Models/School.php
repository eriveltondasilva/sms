<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Scopes\HasActiveScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class School extends Model
{
    use HasActiveScope;
    use HasFactory;

    protected $table = 'schools';

    protected $fillable = [
        'full_name',
        'short_name',

        'motto',

        'inep_code',
        'cnpj',

        'phone',
        'email',
        'address',

        'social_medias',

        'is_active',
    ];

    protected $casts = [
        'social_medias' => 'array',
        'is_active'     => 'boolean',
    ];

    // * Relationships
    /** @return HasMany<User, $this> */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /** @return HasMany<Student, $this> */
    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    /** @return HasMany<Teacher, $this> */
    public function teachers(): HasMany
    {
        return $this->hasMany(Teacher::class);
    }

    /** @return HasMany<SchoolYear, $this> */
    public function schoolYears(): HasMany
    {
        return $this->hasMany(SchoolYear::class);
    }

    /** @return HasMany<OfferedGradeLevel, $this> */
    public function offeredGradeLevels(): HasMany
    {
        return $this->hasMany(OfferedGradeLevel::class);
    }

    /** @return HasMany<Subject, $this> */
    public function subjects(): HasMany
    {
        return $this->hasMany(Subject::class);
    }

    /** @return HasMany<AssessmentType, $this> */
    public function assessmentTypes(): HasMany
    {
        return $this->hasMany(AssessmentType::class);
    }
}
