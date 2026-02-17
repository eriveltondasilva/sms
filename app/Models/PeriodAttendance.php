<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\PeriodAttendanceStatus;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class PeriodAttendance extends Model
{
    use HasFactory;

    protected $table = 'period_attendances';

    protected $fillable = [
        'enrollment_id',
        'teaching_assignment_id',
        'academic_period_id',

        'total_classes',
        'attended_classes',
        'justified_absences',
        'unjustified_absences',
        'attendance_percentage',

        'status',

        'is_locked',
        'locked_at',
    ];

    protected $casts = [
        'total_classes'         => 'integer',
        'attended_classes'      => 'integer',
        'justified_absences'    => 'integer',
        'unjustified_absences'  => 'integer',
        'attendance_percentage' => 'decimal:2',

        'status' => PeriodAttendanceStatus::class,

        'is_locked' => 'boolean',
        'locked_at' => 'datetime',
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
    protected function forStatus(Builder $query, PeriodAttendanceStatus $status): void
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
