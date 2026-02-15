<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\Weekday;
use App\Models\Scopes\HasActiveScope;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class ClassSchedule extends Model
{
    use HasActiveScope;
    use HasFactory;

    protected $table = 'class_schedules';

    protected $fillable = [
        'classroom_id',
        'subject_id',
        'teacher_id',

        'weekday',
        'lesson_order',

        'start_date',
        'end_date',

        'start_time',
        'end_time',

        'is_active',
    ];

    protected $casts = [
        'weekday'      => Weekday::class,
        'lesson_order' => 'integer',

        'start_date' => 'date:Y-m-d',
        'end_date'   => 'date:Y-m-d',

        'is_active' => 'boolean',
    ];

    // region Relationships
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

    /** @return BelongsTo<Teacher, $this> */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class);
    }
    // endregion

    // region Scopes
    #[Scope]
    protected function forClassroom(Builder $query, int $classroomId): void
    {
        $query->where('classroom_id', $classroomId);
    }

    #[Scope]
    protected function forWeekday(Builder $query, Weekday $weekday): void
    {
        $query->where('weekday', $weekday);
    }

    #[Scope]
    protected function ordered(Builder $query): void
    {
        $query->orderBy('weekday')->orderBy('lesson_order');
    }
    // endregion
}
