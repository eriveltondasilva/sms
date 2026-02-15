<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class FinalRecovery extends Model
{
    use HasFactory;

    protected $table = 'final_recoveries';

    protected $fillable = [
        'enrollment_id',
        'teaching_assignment_id',

        'created_by',

        'year_total_score',
        'final_exam_score',
        'final_score',
    ];

    protected $casts = [
        'year_total_score' => 'decimal:2',
        'final_exam_score' => 'decimal:2',
        'final_score'      => 'decimal:2',
    ];

    // region Relationships
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

    /** @return BelongsTo<User, $this> */
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    // endregion

    // * Scopes
    #[Scope]
    protected function forEnrollment(Builder $query, int $enrollmentId): void
    {
        $query->where('enrollment_id', $enrollmentId);
    }

    // region Business methods
    public function isApproved(): bool
    {
        $schoolYear = $this->enrollment->schoolYear;

        return $this->final_score >= $schoolYear->min_passing_score;
    }

    public function calculateFinalScore(): float
    {
        // Fórmula: (Nota do ano + Nota do exame) / 2
        $yearScore = $this->year_total_score ?? 0;
        $examScore = $this->final_exam_score ?? 0;

        return ($yearScore + $examScore) / 2;
    }
    // endregion
}
