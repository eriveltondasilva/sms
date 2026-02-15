<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\SchoolEventType;
use App\Models\Traits\BelongsToSchoolYear;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class SchoolEvent extends Model
{
    use BelongsToSchoolYear;
    use HasFactory;

    protected $table = 'school_events';

    protected $fillable = [
        'classroom_id',
        'subject_id',

        'created_by',

        'title',
        'description',
        'location',

        'start_date',
        'end_date',

        'start_time',
        'end_time',

        'type',

        'blocks_lessons',
        'affects_attendance',
    ];

    protected $casts = [
        'start_date' => 'date:Y-m-d',
        'end_date'   => 'date:Y-m-d',

        'type' => SchoolEventType::class,

        'blocks_lessons'     => 'boolean',
        'affects_attendance' => 'boolean',
    ];

    // * Relationships
    /** @return BelongsTo<SchoolYear, $this> */
    public function schoolYear(): BelongsTo
    {
        return $this->belongsTo(SchoolYear::class);
    }

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
    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // * Scopes
    #[Scope]
    protected function forYear(Builder $query, int $schoolYearId): void
    {
        $query->where('school_year_id', $schoolYearId);
    }

    #[Scope]
    protected function forClassroom(Builder $query, int $classroomId): void
    {
        $query->where('classroom_id', $classroomId);
    }

    #[Scope]
    protected function forType(Builder $query, SchoolEventType $type): void
    {
        $query->where('type', $type);
    }

    #[Scope]
    protected function upcoming(Builder $query): void
    {
        $query->where('start_date', '>=', now()->toDateString())
            ->oldest('start_date');
    }

    // * Business methods
    public function isActive(): bool
    {
        $now = now()->toDateString();
        $endDate = $this->end_date ?? $this->start_date;

        return $now >= $this->start_date->toDateString()
            && $now <= $endDate->toDateString();
    }

    public function affectsDate(string $date): bool
    {
        $endDate = $this->end_date ?? $this->start_date;

        return $date >= $this->start_date->toDateString()
            && $date <= $endDate->toDateString();
    }
}
