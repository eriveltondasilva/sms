<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ClassroomShift;
use App\Models\Scopes\HasActiveScope;
use App\Models\Traits\BelongsToSchoolYear;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Classroom extends Model
{
    use BelongsToSchoolYear;
    use HasActiveScope;
    use HasFactory;

    protected $table = 'classrooms';

    protected $fillable = [
        'offered_grade_level_id',
        'main_teacher_id',

        'name',
        'room',
        'shift',

        'student_max',

        'is_active',
    ];

    protected $casts = [
        'student_max' => 'integer',
        'is_active'   => 'boolean',

        'shift' => ClassroomShift::class,
    ];

    // * Relationships
    /** @return BelongsTo<SchoolYear, $this> */
    public function schoolYear(): BelongsTo
    {
        return $this->belongsTo(SchoolYear::class);
    }

    /** @return BelongsTo<OfferedGradeLevel, $this> */
    public function offeredGradeLevel(): BelongsTo
    {
        return $this->belongsTo(OfferedGradeLevel::class);
    }

    /** @return BelongsTo<Teacher, $this> */
    public function mainTeacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'main_teacher_id');
    }

    /** @return HasMany<Enrollment, $this> */
    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class, 'classroom_id');
    }

    /** @return HasMany<TeachingAssignment, $this> */
    public function teachingAssignments(): HasMany
    {
        return $this->hasMany(TeachingAssignment::class, 'classroom_id');
    }

    /** @return HasMany<ClassSchedule, $this> */
    public function classSchedules(): HasMany
    {
        return $this->hasMany(ClassSchedule::class, 'classroom_id');
    }

    /** @return HasMany<LessonPlan, $this> */
    public function lessonPlans(): HasMany
    {
        return $this->hasMany(LessonPlan::class, 'classroom_id');
    }

    /** @return HasMany<SchoolEvent, $this> */
    public function schoolEvents(): HasMany
    {
        return $this->hasMany(SchoolEvent::class, 'classroom_id');
    }

    // * Scopes
    #[Scope]
    protected function forShift(Builder $query, ClassroomShift $shift): void
    {
        $query->where('shift', $shift);
    }

    #[Scope]
    protected function forYear(Builder $query, int $schoolYearId): void
    {
        $query->where('school_year_id', $schoolYearId);
    }

    // * Accessors
    protected function vacancies(): Attribute
    {
        return Attribute::get(
            fn (): int => max(0, $this->student_max - $this->student_count)
        );
    }

    protected function studentCount(): Attribute
    {
        return Attribute::get(
            fn (): int => $this->enrollments()->count() ?? 0
        )->shouldCache();
    }

    // * Business methods
    public function hasVacancies(): bool
    {
        return $this->student_count < $this->student_max;
    }
}
