<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\AcademicPeriodStatus;
use App\Models\Traits\BelongsToSchoolYear;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class AcademicPeriod extends Model
{
    use BelongsToSchoolYear;
    use HasFactory;

    protected $table = 'academic_periods';

    protected $fillable = [
        'name',
        'order',

        'start_date',
        'end_date',

        'min_passing_score',

        'status',
    ];

    protected $casts = [
        'order'             => 'integer',
        'start_date'        => 'date:Y-m-d',
        'end_date'          => 'date:Y-m-d',
        'min_passing_score' => 'decimal:2',
        'status'            => AcademicPeriodStatus::class,
    ];

    // region Relationships
    /** @return BelongsTo<SchoolYear, $this> */
    public function schoolYear(): BelongsTo
    {
        return $this->belongsTo(SchoolYear::class);
    }

    /** @return HasMany<AssessmentType, $this> */
    public function assessmentTypes(): HasMany
    {
        return $this->hasMany(AssessmentType::class);
    }

    /** @return HasMany<Assessment, $this> */
    public function assessments(): HasMany
    {
        return $this->hasMany(Assessment::class);
    }

    /** @return HasMany<PeriodRecovery, $this> */
    public function periodRecoveries(): HasMany
    {
        return $this->hasMany(PeriodRecovery::class);
    }

    /** @return HasMany<EnrollmentSubjectSummary, $this> */
    public function enrollmentSubjectSummaries(): HasMany
    {
        return $this->hasMany(EnrollmentSubjectSummary::class);
    }
    // endregion

    // * Scopes
    #[Scope]
    protected function open(Builder $query): void
    {
        $query->where('status', AcademicPeriodStatus::OPEN);
    }

    #[Scope]
    protected function closed(Builder $query): void
    {
        $query->where('status', AcademicPeriodStatus::CLOSED);
    }

    // * Business methods
    public function isActive(): bool
    {
        $now = now();

        return
            $now->between($this->start_date, $this->end_date)
            && $this->status === AcademicPeriodStatus::OPEN;
    }

    public function canBeClosed(): bool
    {
        return
            $this->status === AcademicPeriodStatus::OPEN
            && now()->isAfter($this->end_date);
    }
}
