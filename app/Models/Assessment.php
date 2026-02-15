<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\RecoveryType;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Assessment extends Model
{
    use HasFactory;

    protected $table = 'assessments';

    protected $fillable = [
        'teaching_assignment_id',
        'academic_period_id',
        'assessment_type_id',

        'created_by',

        'name',
        'description',

        'max_score',
        'weight',

        'recovery_type',
        'date',
    ];

    protected $casts = [
        'date'          => 'date:Y-m-d',
        'max_score'     => 'decimal:2',
        'weight'        => 'decimal:2',
        'recovery_type' => RecoveryType::class,
    ];

    // * Relationships
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

    /** @return BelongsTo<AssessmentType, $this> */
    public function assessmentType(): BelongsTo
    {
        return $this->belongsTo(AssessmentType::class);
    }

    /** @return BelongsTo<User, $this> */
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /** @return HasMany<StudentScore, $this> */
    public function studentScores(): HasMany
    {
        return $this->hasMany(StudentScore::class);
    }

    // * Scopes
    #[Scope]
    protected function forPeriod(Builder $query, int $periodId): void
    {
        $query->where('academic_period_id', $periodId);
    }

    #[Scope]
    protected function forAssignment(Builder $query, int $assignmentId): void
    {
        $query->where('teaching_assignment_id', $assignmentId);
    }

    #[Scope]
    protected function recent(Builder $query): void
    {
        $query->latest('date');
    }

    // * Business methods
    public function isRecovery(): bool
    {
        return $this->recovery_type !== null;
    }

    public function hasScores(): bool
    {
        return $this->studentScores()->exists();
    }
}
