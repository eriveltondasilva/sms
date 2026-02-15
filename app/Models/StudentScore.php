<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class StudentScore extends Model
{
    use HasFactory;

    protected $table = 'student_scores';

    protected $fillable = [
        'assessment_id',
        'enrollment_id',

        'created_by',

        'score',
    ];

    protected $casts = [
        'score' => 'decimal:2',
    ];

    // region Relationships
    /** @return BelongsTo<Assessment, $this> */
    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }

    /** @return BelongsTo<Enrollment, $this> */
    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }

    /** @return BelongsTo<User, $this> */
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    // endregion

    // region Scopes
    #[Scope]
    protected function forEnrollment(Builder $query, int $enrollmentId): void
    {
        $query->where('enrollment_id', $enrollmentId);
    }

    #[Scope]
    protected function forAssessment(Builder $query, int $assessmentId): void
    {
        $query->where('assessment_id', $assessmentId);
    }
    // endregion

    // region Business Method
    protected function percentage(): Attribute
    {
        return Attribute::get(function (): ?float {
            /** @var Assessment $assessment */
            $assessment = $this->assessment;

            if (! $this->score || ! $assessment) {
                return null;
            }

            return ($this->score / $assessment->max_score) * 100;
        });
    }

    // public function isPassing(): bool
    // {
    //     if (! $this->score || ! $this->assessment) {
    //         return false;
    //     }

    //     $passingPercentage = 0.6; // 60%

    //     /** @var Assessment $assessment */
    //     $assessment = $this->assessment;
    //     $minScore = $assessment->max_score * $passingPercentage;

    //     return $this->score >= $minScore;
    // }
    // endregion
}
