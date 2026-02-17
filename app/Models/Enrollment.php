<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\EnrollmentStatus;
use App\Enums\FinalResult;
use App\Models\Traits\BelongsToSchoolYear;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Enrollment extends Model
{
    use BelongsToSchoolYear;
    use HasFactory;

    protected $table = 'enrollments';

    protected $fillable = [
        'student_id',
        'classroom_id',

        'status',
        'final_result',

        'attendance_percentage',
        'final_score',

        'enrolled_at',
        'finalized_at',

        'transfer_reason',
        'dropout_reason',
    ];

    protected $casts = [
        'status'                => EnrollmentStatus::class,
        'final_result'          => FinalResult::class,
        'attendance_percentage' => 'decimal:2',
        'final_score'           => 'decimal:2',
        'enrolled_at'           => 'date:Y-m-d',
        'finalized_at'          => 'date:Y-m-d',
    ];

    // * Relationships

    /** @return BelongsTo<SchoolYear, $this> */
    public function schoolYear(): BelongsTo
    {
        return $this->belongsTo(SchoolYear::class);
    }

    /** @return BelongsTo<Student, $this> */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /** @return BelongsTo<Classroom, $this> */
    public function classroom(): BelongsTo
    {
        return $this->belongsTo(Classroom::class);
    }

    /** @return HasMany<StudentScore, $this> */
    public function studentScores(): HasMany
    {
        return $this->hasMany(StudentScore::class);
    }

    /** @return HasMany<Attendance, $this> */
    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }

    /** @return HasMany<PeriodGrade, $this> */
    public function periodGrades(): HasMany
    {
        return $this->hasMany(PeriodGrade::class);
    }

    /** @return HasMany<PeriodAttendance, $this> */
    public function periodAttendances(): HasMany
    {
        return $this->hasMany(PeriodAttendance::class);
    }

    /** @return HasMany<AnnualSubjectResult, $this> */
    public function annualSubjectResults(): HasMany
    {
        return $this->hasMany(AnnualSubjectResult::class);
    }

    // * Scopes

    #[Scope]
    protected function active(Builder $query): void
    {
        $query->where('status', EnrollmentStatus::ACTIVE);
    }

    #[Scope]
    protected function forStatus(Builder $query, EnrollmentStatus $status): void
    {
        $query->where('status', $status);
    }

    #[Scope]
    protected function forStudent(Builder $query, int $studentId): void
    {
        $query->where('student_id', $studentId);
    }

    #[Scope]
    protected function forClassroom(Builder $query, int $classroomId): void
    {
        $query->where('classroom_id', $classroomId);
    }

    // * Business methods
    // public function finalize(FinalResult $finalResult): void
    // {
    //      $this->update([
    //         'status'       => EnrollmentStatus::FINISHED,
    //         'final_result' => $finalResult,
    //         'finalized_at' => now(),
    //     ]);
    // }

    // public function hasPassedByAttendance(): bool
    // {
    //     return $this->attendance_percentage >= $this->schoolYear->min_attendance_percentage;
    // }

    // public function hasPassedByScore(): bool
    // {
    //     return $this->final_score >= $this->schoolYear->min_passing_score;
    // }
}
