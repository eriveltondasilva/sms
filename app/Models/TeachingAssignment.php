<?php

declare(strict_types=1);

namespace App\Models;

use App\Models\Scopes\HasActiveScope;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

final class TeachingAssignment extends Model
{
    use HasActiveScope;
    use HasFactory;

    protected $table = 'teaching_assignments';

    protected $fillable = [
        'classroom_id',
        'subject_id',
        'teacher_id',

        'workload_hours',
        'total_classes_given',

        'start_date',
        'end_date',

        'is_active',
    ];

    protected $casts = [
        'workload_hours'      => 'integer',
        'total_classes_given' => 'integer',

        'start_date' => 'date:Y-m-d',
        'end_date'   => 'date:Y-m-d',

        'is_active' => 'boolean',
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

    /** @return BelongsTo<Teacher, $this> */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class);
    }

    /** @return HasMany<Assessment, $this> */
    public function assessments(): HasMany
    {
        return $this->hasMany(Assessment::class);
    }

    /** @return HasMany<LessonRecord, $this> */
    public function lessonRecords(): HasMany
    {
        return $this->hasMany(LessonRecord::class);
    }

    /** @return HasMany<PeriodRecovery, $this> */
    public function periodRecoveries(): HasMany
    {
        return $this->hasMany(PeriodRecovery::class);
    }

    /** @return HasMany<FinalRecovery, $this> */
    public function finalRecoveries(): HasMany
    {
        return $this->hasMany(FinalRecovery::class);
    }

    /** @return HasMany<EnrollmentSubjectSummary, $this>*/
    public function enrollmentSubjectSummaries(): HasMany
    {
        return $this->hasMany(EnrollmentSubjectSummary::class);
    }

    /** @return HasManyThrough<Attendance, LessonRecord, $this> */
    public function attendances(): HasManyThrough
    {
        return $this->hasManyThrough(
            Attendance::class,
            LessonRecord::class,
            'teaching_assignment_id',
            'lesson_record_id'
        );
    }

    // * Scopes
    #[Scope]
    protected function forTeacher(Builder $query, int $teacherId): void
    {
        $query->where('teacher_id', $teacherId);
    }

    #[Scope]
    protected function forClassroom(Builder $query, int $classroomId): void
    {
        $query->where('classroom_id', $classroomId);
    }
}
