<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\FinalResult;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class AcademicHistorySubject extends Model
{
    use HasFactory;

    protected $table = 'academic_history_subjects';

    protected $fillable = [
        'academic_history_id',
        'subject_id',

        'result',
        'workload_hours',
        'final_score',
        'attendance_percentage',
    ];

    protected $casts = [
        'result'                => FinalResult::class,
        'workload_hours'        => 'integer',
        'final_score'           => 'decimal:2',
        'attendance_percentage' => 'decimal:2',
    ];

    // region Relationships
    /** @return BelongsTo<AcademicHistory, $this> */
    public function academicHistory(): BelongsTo
    {
        return $this->belongsTo(AcademicHistory::class);
    }

    /** @return BelongsTo<Subject, $this> */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }
    // endregion

    // region Scopes
    #[Scope]
    protected function forHistory(Builder $query, int $historyId): void
    {
        $query->where('academic_history_id', $historyId);
    }

    #[Scope]
    protected function approved(Builder $query): void
    {
        $query->whereIn('result', FinalResult::approvedResults());
    }

    #[Scope]
    protected function failed(Builder $query): void
    {
        $query->whereIn('result', FinalResult::failedResults());
    }
    // endregion

    // region Business methods
    public function hasMinAttendance(): bool
    {
        $schoolYear = $this->academicHistory->schoolYear;

        return $this->attendance_percentage >= $schoolYear->min_attendance_percentage;
    }

    public function hasPassingGrade(): bool
    {
        $schoolYear = $this->academicHistory->schoolYear;

        return $this->final_score >= $schoolYear->min_passing_score;
    }
    // endregion
}
