<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class LessonRecord extends Model
{
    use HasFactory;

    protected $table = 'lesson_records';

    protected $fillable = [
        'teaching_assignment_id',
        'recorded_by',

        'lesson_date',
        'lessons_given',

        'recorded_at',
    ];

    protected $casts = [
        'lesson_date'   => 'date:Y-m-d',
        'lessons_given' => 'integer',
        'recorded_at'   => 'datetime',
    ];

    // * Relationships
    /** @return BelongsTo<TeachingAssignment, $this> */
    public function teachingAssignment(): BelongsTo
    {
        return $this->belongsTo(TeachingAssignment::class);
    }

    /** @return BelongsTo<User, $this> */
    public function recordedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }

    /** @return HasMany<Attendance, $this> */
    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }

    // * Scopes
    #[Scope]
    protected function forDate(Builder $query, string $date): void
    {
        $query->where('lesson_date', $date);
    }

    #[Scope]
    protected function forAssignment(Builder $query, int $assignmentId): void
    {
        $query->where('teaching_assignment_id', $assignmentId);
    }

    #[Scope]
    protected function recent(Builder $query): void
    {
        $query->latest('lesson_date');
    }

    // * Business methods
    public function hasAttendances(): bool
    {
        return $this->attendances()->exists();
    }
}
