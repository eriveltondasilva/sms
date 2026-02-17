<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\SchoolYearStatus;
use App\Models\Traits\BelongsToSchool;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

final class SchoolYear extends Model
{
    use BelongsToSchool;
    use HasFactory;

    protected $table = 'school_years';

    protected $fillable = [
        'year',
        'status',

        'total_school_days',
        'total_school_hours',
    ];

    protected $casts = [
        'year'   => 'integer',
        'status' => SchoolYearStatus::class,

        'total_school_days'  => 'integer',
        'total_school_hours' => 'integer',
    ];

    // * Relationships

    /** @return BelongsTo<School, $this> */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /** @return HasOne<SchoolYearConfig, $this> */
    public function config(): HasOne
    {
        return $this->hasOne(SchoolYearConfig::class);
    }

    /** @return HasMany<AcademicPeriod, $this> */
    public function academicPeriods(): HasMany
    {
        return $this->hasMany(AcademicPeriod::class)->orderBy('order');
    }

    /** @return HasMany<Classroom, $this> */
    public function classrooms(): HasMany
    {
        return $this->hasMany(Classroom::class);
    }

    /** @return HasMany<SchoolEvent, $this> */
    public function schoolEvents(): HasMany
    {
        return $this->hasMany(SchoolEvent::class);
    }

    /** @return HasMany<AnnualSubjectResult, $this> */
    public function annualSubjectResults(): HasMany
    {
        return $this->hasMany(AnnualSubjectResult::class);
    }

    // * Scopes

    #[Scope]
    protected function forYear(Builder $query, int $year): void
    {
        $query->where('year', $year);
    }

    #[Scope]
    protected function forStatus(Builder $query, SchoolYearStatus $status): void
    {
        $query->where('status', $status);
    }

    #[Scope]
    protected function current(Builder $query): void
    {
        $query->where('status', SchoolYearStatus::IN_PROGRESS);
    }

    #[Scope]
    protected function forSchool(Builder $query, int $schoolId): void
    {
        $query->where('school_id', $schoolId);
    }

    // * Business methods

    public function canBeClosed(): bool
    {
        return $this->status === SchoolYearStatus::IN_PROGRESS
            && $this->academicPeriods()->closed()->count() === 0;
    }
}
