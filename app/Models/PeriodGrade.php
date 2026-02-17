<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\PeriodGradeStatus;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class PeriodGrade extends Model
{
    use HasFactory;

    protected $table = 'period_grades';

    protected $fillable = [
        'enrollment_id',
        'teaching_assignment_id',
        'academic_period_id',

        'calculated_grade',
        'recovery_grade',
        'final_grade',

        'status',

        'is_locked',
        'locked_at',

        'calculation_snapshot',
    ];

    protected $casts = [
        'calculated_grade' => 'decimal:2',
        'recovery_grade'   => 'decimal:2',
        'final_grade'      => 'decimal:2',

        'status' => PeriodGradeStatus::class,

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

    /** @return BelongsTo<AcademicPeriod, $this> */
    public function academicPeriod(): BelongsTo
    {
        return $this->belongsTo(AcademicPeriod::class);
    }

    // * Scopes

    #[Scope]
    protected function forStatus(Builder $query, PeriodGradeStatus $status): void
    {
        $query->where('status', $status);
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
