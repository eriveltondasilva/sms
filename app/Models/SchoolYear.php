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

final class SchoolYear extends Model
{
    use BelongsToSchool;
    use HasFactory;

    protected $table = 'school_years';

    protected $fillable = [
        'year',
        'status',

        'min_passing_score',
        'min_attendance_percentage',

        'total_school_days',
        'total_school_hours',
    ];

    protected $casts = [
        'year'   => 'integer',
        'status' => SchoolYearStatus::class,

        'min_passing_score'         => 'decimal:2',
        'min_attendance_percentage' => 'decimal:2',

        'total_school_days'  => 'integer',
        'total_school_hours' => 'integer',
    ];

    // region Relationships
    /** @return BelongsTo<School, $this> */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
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

    /** @return HasMany<AcademicHistory, $this> */
    public function academicHistories(): HasMany
    {
        return $this->hasMany(AcademicHistory::class);
    }
    // endregion

    // region Scopes
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
    // endregion

    // region Business methods
    public function canBeClosed(): bool
    {
        return $this->status === SchoolYearStatus::IN_PROGRESS
            && $this->academicPeriods()->closed()->count() === 0;
    }
    // endregion
}
