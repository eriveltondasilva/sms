<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class PeriodRecovery extends Model
{
    use HasFactory;

    protected $table = 'period_recoveries';

    protected $fillable = [
        'enrollment_id',
        'teaching_assignment_id',
        'academic_period_id',

        'created_by',

        'original_score',
        'recovery_score',
    ];

    protected $casts = [
        'original_score' => 'decimal:2',
        'recovery_score' => 'decimal:2',
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

    /** @return BelongsTo<User, $this> */
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
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

    // * Business methods

    protected function finalScore(): Attribute
    {
        return Attribute::get(
            fn (): float => max($this->original_score ?? 0, $this->recovery_score)
        );
    }

    public function hasImproved(): bool
    {
        return $this->recovery_score > ($this->original_score ?? 0);
    }
}
