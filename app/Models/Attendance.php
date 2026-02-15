<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\AttendanceStatus;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

final class Attendance extends Model
{
    use HasFactory;

    protected $table = 'attendances';

    protected $fillable = [
        'lesson_record_id',
        'enrollment_id',

        'recorded_by',

        'status',
        'justification',
    ];

    protected $casts = [
        'status' => AttendanceStatus::class,
    ];

    // * Relationships
    /** @return BelongsTo<LessonRecord, $this> */
    public function lessonRecord(): BelongsTo
    {
        return $this->belongsTo(LessonRecord::class);
    }

    /** @return BelongsTo<Enrollment, $this> */
    public function enrollment(): BelongsTo
    {
        return $this->belongsTo(Enrollment::class);
    }

    /** @return BelongsTo<User, $this> */
    public function recordedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }

    // * Scopes
    #[Scope]
    protected function forStatus(Builder $query, AttendanceStatus $status): void
    {
        $query->where('status', $status);
    }

    #[Scope]
    protected function forEnrollment(Builder $query, int $enrollmentId): void
    {
        $query->where('enrollment_id', $enrollmentId);
    }

    // * Business methods
    public function isPresent(): bool
    {
        return $this->status === AttendanceStatus::PRESENT;
    }

    public function isAbsent(): bool
    {
        return $this->status === AttendanceStatus::ABSENT;
    }

    public function isJustified(): bool
    {
        return $this->status === AttendanceStatus::JUSTIFIED;
    }

    public function countsAsPresence(): bool
    {
        return in_array($this->status, [
            AttendanceStatus::PRESENT,
            AttendanceStatus::JUSTIFIED,
        ], true);
    }
}
