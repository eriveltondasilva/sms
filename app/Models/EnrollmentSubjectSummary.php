<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class EnrollmentSubjectSummary extends Model
{
    use HasFactory;

    protected $table = 'enrollment_subject_summaries';

    protected $fillable = [
        'enrollment_id',
        'teaching_assignment_id',
        'academic_period_id',

        'total_classes',
        'classes_attended',

        'attendance_percentage',
        'period_average',

        'needs_recovery',
    ];

    protected $casts = [
        'total_classes'         => 'integer',
        'classes_attended'      => 'integer',
        'attendance_percentage' => 'decimal:2',
        'period_average'        => 'decimal:2',
        'needs_recovery'        => 'boolean',
    ];

    // * Relationships
    /** @return BelongsTo<Enrollment, $this> */
    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }

    /** @return BelongsTo<TeachingAssignment, $this> */
    public function teachingAssignment(): BelongsTo
    {
        return $this->belongsTo(TeachingAssignment::class);
    }

    /** @return BelongsTo<AcademicPeriod, $this> */
    public function academicPeriod(): BelongsTo
    {
        return $this->belongsTo(AcademicPeriod::class);
    }

    // * Scopes
    #[Scope]
    protected function forEnrollment(Builder $query, int $enrollmentId): void
    {
        $query->where('enrollment_id', $enrollmentId);
    }

    #[Scope]
    protected function forPeriod(Builder $query, int $periodId): void
    {
        $query->where('academic_period_id', $periodId);
    }

    #[Scope]
    protected function needingRecovery(Builder $query): void
    {
        $query->where('needs_recovery', true);
    }

    // * Business methods
    public function calculateAttendancePercentage(): float
    {
        if ($this->total_classes === 0) {
            return 0;
        }

        return ($this->classes_attended / $this->total_classes) * 100;
    }

    public function hasMinimumAttendance(): bool
    {
        $schoolYear = $this->enrollment->schoolYear;

        return $this->attendance_percentage >= $schoolYear->min_attendance_percentage;
    }

    public function hasPassingGrade(): bool
    {
        $academicPeriod = $this->academicPeriod;

        return $this->period_average >= $academicPeriod->min_passing_score;
    }

    public function shouldNeedRecovery(): bool
    {
        if (! $this->hasPassingGrade()) {
            return true;
        }

        return ! $this->hasMinimumAttendance();
    }
}
