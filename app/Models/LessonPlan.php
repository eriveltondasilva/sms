<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\LessonPlanStatus;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class LessonPlan extends Model
{
    use HasFactory;

    protected $table = 'lesson_plans';

    protected $fillable = [
        'classroom_id',
        'subject_id',

        'approved_by',
        'created_by',

        'week_start_date',
        'week_end_date',

        'content',
        'objectives',
        'methodology',
        'resources',
        'notes',
        'bncc_codes',

        'status',

        'approved_at',
    ];

    protected $casts = [
        'week_start_date' => 'date:Y-m-d',
        'week_end_date'   => 'date:Y-m-d',

        'status'     => LessonPlanStatus::class,
        'bncc_codes' => 'array',

        'approved_at' => 'datetime',
    ];

    // * Relationships
    /** @return BelongsTo<Classroom, $this> */
    public function classroom(): BelongsTo
    {
        return $this->belongsTo(Classroom::class, 'classroom_id');
    }

    /** @return BelongsTo<Subject, $this> */
    public function subject(): BelongsTo
    {
        return $this->belongsTo(Subject::class);
    }

    /** @return BelongsTo<User, $this> */
    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /** @return BelongsTo<User, $this> */
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // * Scopes
    #[Scope]
    protected function forStatus(Builder $query, LessonPlanStatus $status): void
    {
        $query->where('status', $status);
    }

    #[Scope]
    protected function forWeek(Builder $query, string $startDate): void
    {
        $query->where('week_start_date', $startDate);
    }

    // * Business methods
    public function canBeApproved(): bool
    {
        return $this->status === LessonPlanStatus::SUBMITTED;
    }

    public function canBeEdited(): bool
    {
        return in_array($this->status, [
            LessonPlanStatus::DRAFT,
            LessonPlanStatus::SUBMITTED,
        ], true);
    }
}
