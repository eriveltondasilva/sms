<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\SubjectFinalResult;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class AnnualSubjectResult extends Model
{
    use HasFactory;

    protected $table = 'annual_subject_results';

    protected $fillable = [
        'enrollment_id',
        'teaching_assignment_id',
        'school_year_id',

        'period_grades_snapshot',

        'periods_count',

        'calculated_total',
        'calculated_average',

        'final_exam_grade',

        'final_total',
        'final_average',

        'total_classes',
        'attended_classes',
        'justified_absences',
        'unjustified_absences',
        'attendance_percentage',

        'final_result',

        'is_locked',
        'locked_at',

        'calculation_snapshot',
    ];

    protected $casts = [
        'period_grades_snapshot' => 'array',

        'periods_count' => 'integer',

        'calculated_total'   => 'decimal:2',
        'calculated_average' => 'decimal:2',

        'final_exam_grade' => 'decimal:2',

        'final_total'   => 'decimal:2',
        'final_average' => 'decimal:2',

        'total_classes'         => 'integer',
        'attended_classes'      => 'integer',
        'justified_absences'    => 'integer',
        'unjustified_absences'  => 'integer',
        'attendance_percentage' => 'decimal:2',

        'final_result' => SubjectFinalResult::class,

        'is_locked' => 'boolean',
        'locked_at' => 'datetime',

        'calculation_snapshot' => 'array',
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

    /** @return BelongsTo<SchoolYear, $this> */
    public function schoolYear(): BelongsTo
    {
        return $this->belongsTo(SchoolYear::class);
    }

    // * Scopes

    #[Scope]
    protected function forResult(Builder $query, SubjectFinalResult $result): void
    {
        $query->where('final_result', $result);
    }

    #[Scope]
    protected function approved(Builder $query): void
    {
        $query->where('final_result', SubjectFinalResult::APPROVED);
    }

    #[Scope]
    protected function locked(Builder $query): void
    {
        $query->where('is_locked', true);
    }

    #[Scope]
    protected function unlocked(Builder $query): void
    {
        $query->where('is_locked', false);
    }
}
